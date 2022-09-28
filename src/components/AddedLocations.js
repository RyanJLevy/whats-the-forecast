import React, { useState } from "react";
import { useEffect } from "react";
import { GetWeatherDataFromStorage } from "../helpers/localStorage.helpers";
import LocationWidget from "./LocationWidget";

function AddedLocations({ openModal, setData }) {
  const [savedLocations, setSavedLocations] = useState([]);
  // TODO: Display saved locations; accessed in LS.
  useEffect(() => {
    const getLocationData = async () => {
      const locationData = await GetWeatherDataFromStorage();
      setSavedLocations(locationData);
    };
    getLocationData();
  }, []);

  const HandleWidgetClick = (data) => {
    openModal();
    setData([data.id, data.coord.lat, data.coord.lon, data.state]);
  };
  return (
    <div className="flex flex-col w-[400px] lg:w-[800px] max-h-[462px] overflow-scroll items-center my-8 pb-4 bg-gray-100 rounded-md">
      {savedLocations.length ? (
        savedLocations.map((location) => (
          <LocationWidget
            key={location.id}
            data={location}
            isSaved={true}
            onClick={() => HandleWidgetClick(location)}
          />
        ))
      ) : (
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="p-6 italic text-gray-600 text-sm text-center">
            You haven't saved any locations yet, champ. Give a bookmark icon a
            wee click.
          </h1>
          <p className="pb-6 italic text-gray-400 text-[10px] lg:text-xs">
            * You may need to refresh the page to see your newly saved
            locations!
          </p>
        </div>
      )}
    </div>
  );
}

export default AddedLocations;
