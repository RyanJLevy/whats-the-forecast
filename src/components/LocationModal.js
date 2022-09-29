import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import Button from "./Button";
import { GetWeatherData } from "../helpers/api.helpers";
import ClearSky from "../images/clear.svg";
import Clouds from "../images/clouds.svg";
import { LocationMarkerIcon, BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/solid";
import IsLocationInStorage from "../helpers/localStorage.helpers";

function LocationModal({ locationData, closeModal }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [locationSaved, setLocationSaved] = useState(false);

  // Get weather data for searched location.
  useEffect(() => {
    const [, lat, lon, state] = locationData;
    const getWeatherData = async () => {
      const returnedData = await GetWeatherData(lat, lon, state);
      setWeatherData(returnedData);
      setHasLoaded(true);
    };

    getWeatherData();
  }, [weatherData?.id, hasLoaded, locationData]);

  // // Check whether or not location is currently saved.
  useEffect(() => {
    const [id] = locationData;
    const checkForLocalStorage = async () => {
      const locationInLS = await IsLocationInStorage(id);
      setLocationSaved(locationInLS);
    };
    checkForLocalStorage();
  }, [locationData]);

  // Save or remove current location from Local Storage.
  const HandleSaveClick = () => {
    const [id, lat, lon, state] = locationData;
    setLocationSaved(!locationSaved);
    let localStorageLocations =
      JSON.parse(localStorage.getItem("locations")) ?? [];
    // Find and remove entry in LS with given lat/lon data.
    const removeFromLocalStorage = () => {
      const locations = localStorageLocations.filter((location) => {
        return id !== location.id;
      });
      !locations.length
        ? localStorage.removeItem("locations")
        : localStorage.setItem("locations", JSON.stringify(locations));
    };
    !locationSaved
      ? localStorage.setItem(
          "locations",
          JSON.stringify([
            ...localStorageLocations,
            {
              id: id,
              lat: parseFloat(lat).toFixed(4),
              lon: parseFloat(lon).toFixed(4),
              state: state,
            },
          ])
        )
      : removeFromLocalStorage();
  };

  // Get the appropriate weather image for the given weather conditions.
  // @param {string} - weather description; eg 'Clouds'
  // @return {element} - svg element.
  const getWeatherImage = (weatherDescription) => {
    let weatherImage = null;
    switch (weatherDescription.toLowerCase()) {
      case "clouds":
        weatherImage = Clouds;
        break;
      default:
        weatherImage = ClearSky;
        break;
    }
    return weatherImage;
  };

  return (
    <div
      className="flex flex-col items-center p-16 absolute top-0 left-0 w-full h-full bg-[#00000020] z-[99]"
      onClick={() => closeModal()}
    >
      <dialog
        className="w-[300px] lg:w-[400px] flex items-center justify-center bg-gray-50 rounded-md shadow-md z-[99] p-0 h-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {hasLoaded ? (
          <div className="w-full h-full flex flex-col items-center py-8">
            <Button
              className="hover:bg-gray-100 absolute left-6 top-3 rounded-sm"
              iconClass="w-[18px] h-[18px] text-purple-primary"
              Icon={XIcon}
              title="Close location window."
              onClick={closeModal}
            />
            <Button
              className="hover:bg-gray-100 absolute right-6 top-3 rounded-sm"
              iconClass="w-[18px] h-[18px] text-purple-primary"
              Icon={locationSaved ? BookmarkIconSolid : BookmarkIcon}
              title="Save location."
              onClick={HandleSaveClick}
            />
            <div className="text-lg w-50 lg:w-60 flex flex-col lg:flex-row items-center justify-center border-b-[1px] border-b-purple-primary">
              <LocationMarkerIcon className=" hidden lg:block w-6 text-purple-primary pr-2" />
              <h1 className="text-purple-secondary font-semibold">
                {weatherData?.name}, {weatherData?.state}
              </h1>
            </div>

            <img
              className="my-4"
              src={getWeatherImage(weatherData?.weather[0].main ?? "")}
              alt={`Weather condition is: ${weatherData?.weather[0].main}`}
            />
            <div className="py-1 px-4 rounded-sm bg-gray-100 shadow-sm flex justify-between items-center my-2">
              <p className="text-purple-primary font-light">conditions:</p>
              <p className="text-purple-primary font-semibold pl-1">
                {weatherData?.weather[0].main?.toLowerCase()}
              </p>
            </div>

            <h1 className="text-purple-secondary font-bold text-5xl">
              {Math.floor(weatherData?.main.temp)}°
            </h1>

            <div className="py-1 px-4 rounded-sm bg-gray-100 shadow-sm flex justify-between items-center my-2">
              <div className="flex justify-center items-center px-1">
                <p className="text-purple-primary font-light">high:</p>
                <p className="text-purple-primary font-semibold pl-1">
                  {Math.floor(weatherData?.main.temp_max)}°
                </p>
              </div>
              <div className="flex justify-center items-center px-1">
                <p className="text-purple-primary font-light">low:</p>
                <p className="text-purple-primary font-semibold pl-1">
                  {Math.floor(weatherData?.main.temp_min)}°
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-purple-primary font-light py-8">Loading ...</h1>
        )}
      </dialog>
    </div>
  );
}

export default LocationModal;
