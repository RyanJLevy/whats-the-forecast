import locationData from "../data/city.list.json";

// Fetch weather data for given latitude and longitude.
// @params {int, int}
// @return {obj}
async function GetWeatherData(lat, lon, state) {
  try {
    let returnedData = null;
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
    )
      .then((res) => res.json())
      .then((result) => {
        returnedData = result;
      });
    return { ...returnedData, state: state };
  } catch (error) {
    console.warn(error);
  }
}

// This function parses through the JSON array of city data.
// @param {string} - partial/complete string of (City, State, Country)
// Checks for comma delimiter.
// @returns list of location objects.
async function GetPossibleLocations(currentString) {
  const [cityName, stateName, countryName] = currentString.split(",");
  // Search for match(es) within the US.
  let matches = locationData.filter((item) => {
    const condition = stateName
      ? cityName.trim().toLowerCase() === item.name.toLowerCase() &&
        item.state.toLowerCase().startsWith(stateName?.trim().toLowerCase())
      : item.name.toLowerCase().startsWith(cityName.trim().toLowerCase());
    return condition && item.country === "US";
  });
  // Limit return array to 10 entries.
  if (matches.length > 10) {
    matches = matches.slice(0, 10);
  }

  return matches;
}

// Get the current date.
// @return {string} in '{Weekday}, {Month} {Day}' format.
function GetDate() {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const weekday = weekdays[date.getDay()];
  let day = date.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];

  return weekday + ", " + month + " " + day;
}

export { GetWeatherData, GetPossibleLocations, GetDate };
