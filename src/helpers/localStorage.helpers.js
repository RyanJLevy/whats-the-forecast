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

export { GetWeatherDataFromStorage };