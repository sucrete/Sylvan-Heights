//
//* This script will be most effective for courses inside the Eastern Time Zone

// Rainbow "Open-Meteo" console branding
const _omText = "Open-Meteo";
const _omColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00CC00", "#0000FF", "#4B0082", "#9400D3"];
console.log(
  _omText.split("").map((c) => `%c${c}`).join(""),
  ..._omText.split("").map((_, i) => `color:${_omColors[i % _omColors.length]};font-weight:bold;font-size:16px;`)
);

//~ Standard Variables
const apiUrl =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=40.968&longitude=-80.304" +
  "&current=temperature_2m,weather_code" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
  "&temperature_unit=fahrenheit" +
  "&timezone=America%2FNew_York";

// Days of the week
const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

var weatherData;

//~ Fetch Open-Meteo API
async function getWeather() {
  await fetch(apiUrl, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      weatherData = data;
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//~ Begin DOM manipulation - fired when fetch to API is finished
async function populateDOM() {
  await getWeather();

  //~ grab all DOM elements
  // today
  const weatherIcon = document.getElementsByClassName("today-icon")[0];
  const theTemp = document.getElementsByClassName("today-temp")[0];
  const weather = document.getElementsByClassName("today-weather")[0];

  // tomorrow
  const tomorrowDay = document.getElementsByClassName("tomorrow-day")[0];
  const tomorrowWeatherIcon = document.getElementsByClassName("tomorrow-icon")[0];
  const tomorrowHiLo = document.getElementsByClassName("tomorrow-hi-lo")[0];

  // day after tomorrow
  const dayAfterTomorrowDay = document.getElementsByClassName("DAT-day")[0];
  const dayAfterTomorrowIcon = document.getElementsByClassName("DAT-icon")[0];
  const dayAfterTomorrowHiLo = document.getElementsByClassName("DAT-hi-lo")[0];

  // three days from today
  const threeDaysFromTodayDay = document.getElementsByClassName("TDFT-day")[0];
  const threeDaysFromTodayIcon = document.getElementsByClassName("TDFT-icon")[0];
  const threeDaysFromTodayHiLo = document.getElementsByClassName("TDFT-hi-lo")[0];

  //~ Set Today's Weather
  const currentTemp = Math.ceil(weatherData.current.temperature_2m);
  const currentCode = weatherData.current.weather_code;
  const iconPath = assignIcon(currentCode);

  weatherIcon.src = `./assets/images/icons/weather/${iconPath}-line.svg`;
  theTemp.innerHTML = currentTemp;
  weather.innerHTML = weatherSummary(currentCode);

  //* check for existence of .banner-temp and add to DOM
  const bannerTemp = document.getElementsByClassName("banner-temp")[0];
  if (bannerTemp) {
    bannerTemp.innerHTML = currentTemp;
  }

  //~ set tomorrow's Weather (daily index 1)
  tomorrowDay.innerHTML = days[new Date(weatherData.daily.time[1]).getUTCDay()];
  tomorrowWeatherIcon.src = `./assets/images/icons/weather/${assignIcon(weatherData.daily.weather_code[1])}.svg`;
  tomorrowHiLo.innerHTML = `${Math.ceil(weatherData.daily.temperature_2m_max[1])}°/${Math.ceil(weatherData.daily.temperature_2m_min[1])}°`;

  //~ set day after tomorrow's Weather (daily index 2)
  dayAfterTomorrowDay.innerHTML = days[new Date(weatherData.daily.time[2]).getUTCDay()];
  dayAfterTomorrowIcon.src = `./assets/images/icons/weather/${assignIcon(weatherData.daily.weather_code[2])}.svg`;
  dayAfterTomorrowHiLo.innerHTML = `${Math.ceil(weatherData.daily.temperature_2m_max[2])}°/${Math.ceil(weatherData.daily.temperature_2m_min[2])}°`;

  //~ set three days from today's Weather (daily index 3)
  threeDaysFromTodayDay.innerHTML = days[new Date(weatherData.daily.time[3]).getUTCDay()];
  threeDaysFromTodayIcon.src = `./assets/images/icons/weather/${assignIcon(weatherData.daily.weather_code[3])}.svg`;
  threeDaysFromTodayHiLo.innerHTML = `${Math.ceil(weatherData.daily.temperature_2m_max[3])}°/${Math.ceil(weatherData.daily.temperature_2m_min[3])}°`;
}

populateDOM();

// Maps WMO weather codes to local icon filenames
const assignIcon = function (code) {
  if (code === 0 || code === 1) return "sun";
  if (code === 2) return "part-cloud";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "foggy";
  if (code >= 51 && code <= 67) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain";
  if (code === 85 || code === 86) return "snow";
  if (code >= 95) return "rain";
  return "cloudy";
};

// Maps WMO weather codes to human-readable summaries
const weatherSummary = function (code) {
  if (code === 0) return "Clear Sky";
  if (code === 1) return "Mainly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code === 45) return "Foggy";
  if (code === 48) return "Icy Fog";
  if (code === 51) return "Light Drizzle";
  if (code === 53) return "Drizzle";
  if (code === 55) return "Heavy Drizzle";
  if (code === 61) return "Light Rain";
  if (code === 63) return "Rain";
  if (code === 65) return "Heavy Rain";
  if (code === 71) return "Light Snow";
  if (code === 73) return "Snow";
  if (code === 75) return "Heavy Snow";
  if (code === 77) return "Snow Grains";
  if (code === 80) return "Light Showers";
  if (code === 81) return "Showers";
  if (code === 82) return "Heavy Showers";
  if (code === 85) return "Snow Showers";
  if (code === 86) return "Heavy Snow Showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm with Hail";
  return "Unknown";
};
