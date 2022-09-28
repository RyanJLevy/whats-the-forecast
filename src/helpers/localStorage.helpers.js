import { GetWeatherData } from "./api.helpers";

// Gets weather data of all locations stored in LS.
// @params {none}
// @return {array} - array of weather information JSON objects.
async function GetWeatherDataFromStorage() {
  let weatherData = [];
  if (!localStorage.getItem("locations")) return weatherData;
  const localStorageValues = await JSON.parse(
    localStorage.getItem("locations")
  );
  // Get weather data for each location.
  for (const location of localStorageValues) {
    const data = await GetWeatherData(
      location.lat,
      location.lon,
      location.state
    );
    weatherData.push(data);
  }
  return weatherData;
}

// Returns whether or not location is currently saved to user Local Storage.
// @param {object} - location latitude, longitude, and state.
// @return {boolean} - returns true if in LS, false if not.
export default async function IsLocationInStorage(locationID) {
  if (!localStorage.getItem("locations")) return false;
  const localStorageValues = await JSON.parse(
    localStorage.getItem("locations")
  );
  for (const value of localStorageValues) {
    if (value.id === locationID) {
      return true;
    }
  }
  return false;
}

export { GetWeatherDataFromStorage };
