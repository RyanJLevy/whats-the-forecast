import React, { useState } from "react";
import { LocationMarkerIcon, BookmarkIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/solid";
import { GetDate } from "../helpers/api.helpers";

function LocationWidget(props) {
  const [weather] = props.data.weather;
  const temperature = Math.floor(parseInt(props.data.main.temp));
  const date = GetDate();
  const [locationSaved, setLocationSaved] = useState(props.isSaved ?? false);

  // Updates state and LocalStorage.
  const handleSaveButtonClick = (event) => {
    event.stopPropagation();
    setLocationSaved(!locationSaved);
    let localStorageLocations =
      JSON.parse(localStorage.getItem("locations")) ?? [];
    // Find and remove entry in LS with given lat/lon data.
    const removeFromLocalStorage = () => {
      const locations = localStorageLocations.filter((location) => {
        return location.id !== props.data.id;
      });
      console.log(props.data.id);
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
              id: props.data.id,
              lat: parseFloat(props.data.coord.lat).toFixed(4),
              lon: parseFloat(props.data.coord.lon).toFixed(4),
              state: props.data.state,
            },
          ])
        )
      : removeFromLocalStorage();
  };

  return (
    <div
      className="weather-card clear-weather cursor-pointer"
      onClick={props.onClick}
    >
      <div className="flex flex-col items-start justify-center border-r-[1px] border-r-white pr-2">
        <h2 className="text-white font-thin text-base">{weather.main}</h2>
        <h1 className="text-white font-bold text-4xl">{temperature}°</h1>
      </div>
      <div className="flex flex-col items-start justify-center pl-2 lg:pl-8">
        <h2 className="text-white">{date}</h2>
        <div className="flex items-center justify-start">
          <LocationMarkerIcon className="text-white w-[25px] h-[25px] pr-2" />
          <h1 className="text-white ">
            {props.data.name}, {props.data.state}
          </h1>
        </div>
      </div>

      <button
        title={locationSaved ? "Unsave this location" : "Save this location"}
        onClick={handleSaveButtonClick}
      >
        {locationSaved ? (
          <BookmarkIconSolid className="text-white absolute w-[25px] top-2 right-2" />
        ) : (
          <BookmarkIcon className="text-white absolute w-[25px] top-2 right-2" />
        )}
      </button>
    </div>
  );
}

export default LocationWidget;
