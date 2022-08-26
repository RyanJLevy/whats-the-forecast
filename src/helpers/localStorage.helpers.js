import { GetWeatherData } from "./api.helpers";

async function GetWeatherDataFromStorage() {
    const localStorageValues = await JSON.parse(localStorage.getItem('locations'));
    let weatherData = [];
    // Get weather data for each location.
    for (const location of localStorageValues) {
        const data = await GetWeatherData(location.lat, location.lon, location.state);
        weatherData.push(data);
    }
    return weatherData;
    
}

// Updates state and LocalStorage.
const SaveLocationToStorage = (latitude, longitude, state, saveState, saveStateCallback) => {
    saveStateCallback(!saveState);
    let localStorageLocations = JSON.parse(localStorage.getItem('locations')) ?? [];
    // Find and remove entry in LS with given lat/lon data.
    const removeFromLocalStorage = () => {
        const locations = localStorageLocations.filter(location => {
            return location.lat !== latitude && location.lon !== longitude;
        });
        !locations.length ? localStorage.removeItem('locations') : localStorage.setItem('locations', JSON.stringify(locations));
    }
    !saveState ? localStorage.setItem('locations', JSON.stringify([...localStorageLocations, {lat: latitude, lon: longitude, state: state}])) : removeFromLocalStorage();
}

export { GetWeatherDataFromStorage, SaveLocationToStorage };