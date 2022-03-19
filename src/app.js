//initilize city display

let unit = "imperial";
let city = "Austin";
let apiKey = "87b9752c714fbde6317ef3900b3d8fb6";

//refer to index of month and day of week to make prettier
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const newWeatherDayIcon = {
  200: "Cloud angled rain zap.png",
  201: "Cloud angled rain zap.png",
  202: "Cloud angled rain zap.png",
  210: "Sun cloud Zap.png",
  211: "Sun cloud Zap.png",
  212: "Cloud 3 Zap.png",
  221: "Fast winds zaps.png",
  230: "Cloud angled rain zap.png",
  231: "Cloud angled rain zap.png",
  232: "Cloud angled rain zap.png",
  300: "Sun cloud little rain.png",
  301: "Sun cloud little rain.png",
  302: "Sun cloud angled rain.png",
  310: "Sun cloud angled rain.png",
  311: "Sun cloud angled rain.png",
  312: "Sun cloud angled rain.png",
  313: "Sun cloud angled rain.png",
  314: "Sun cloud angled rain.png",
  321: "Sun cloud angled rain.png",
  500: "Sun cloud little rain.png",
  501: "Sun cloud mid rain.png",
  502: "Sun cloud angled rain.png",
  503: "Sun cloud big rain.png",
  504: "Sun cloud angled rain.png",
  511: "Sun cloud hailstone",
  520: "Cloud angled rain.png",
  521: "Cloud angled rain.png",
  522: "Cloud angled rain.png",
  531: "Cloud angled rain.png",
  600: "Sun cloud little snow.png",
  601: "Sun cloud mid snow.png",
  602: "Big snow little snow.png",
  611: "Cloud hailstone.png",
  612: "Sun cloud hailstone.png",
  613: "Cloud hailstone.png",
  615: "Sun cloud hailstone.png",
  616: "Big snow little snow.png",
  620: "Sun cloud little snow.png",
  621: "Sun cloud mid snow.png",
  622: "Mid snow fast winds.png",
  701: "Sun slow wind.png",
  711: "Sun fast wind.png",
  721: "Sun cloud slow wind.png",
  731: "Sun fast wind.png",
  741: "Cloud slow wind.png",
  751: "Sun fast wind.png",
  761: "Sun cloud fast wind.png",
  762: "Cloud fast wind.png",
  771: "Fast winds zaps.png",
  781: "Tornado.png",
  800: "Sun.png",
  801: "Sun cloud.png",
  802: "Cloud.png",
  803: "Cloud.png",
  804: "Cloud.png",
};

const newWeatherNightIcon = {
  200: "Cloud angled rain zap.png",
  201: "Cloud angled rain zap.png",
  202: "Cloud angled rain zap.png",
  210: "Moon cloud zap.png",
  211: "Moon cloud zap.png",
  212: "Cloud 3 Zap.png",
  221: "Fast winds zaps.png",
  230: "Cloud angled rain zap.png",
  231: "Cloud angled rain zap.png",
  232: "Cloud angled rain zap.png",
  300: "Moon cloud little rain.png",
  301: "Moon cloud little rain.png",
  302: "Moon cloud angled rain.png",
  310: "Moon cloud angled rain.png",
  311: "Moon cloud angled rain.png",
  312: "Moon cloud angled rain.png",
  313: "Moon cloud angled rain.png",
  314: "Moon cloud angled rain.png",
  321: "Moon cloud angled rain.png",
  500: "Moon cloud little rain.png",
  501: "Moon cloud mid rain.png",
  502: "Moon coud angled rain.png",
  503: "Moon cloud big rain.png",
  504: "Moon coud angled rain.png",
  511: "Moon cloud hailstone.png",
  520: "Cloud angled rain.png",
  521: "Cloud angled rain.png",
  522: "Cloud angled rain.png",
  531: "Cloud angled rain.png",
  600: "Moon cloud little snow.png",
  601: "Moon cloud mid snow.png",
  602: "Big snow little snow.png",
  611: "Cloud hailstone.png",
  612: "Moon cloud hailstone.png",
  613: "Cloud hailstone.png",
  615: "Moon cloud hailstone.png",
  616: "Big snow little snow.png",
  620: "Moon cloud little snow.png",
  621: "Moon cloud mid snow.png",
  622: "Mid snow fast winds.png",
  701: "Moon slow wind.png",
  711: "Moon fast wind.png",
  721: "Moon cloud slow wind.png",
  731: "Moon fast wind.png",
  741: "Cloud slow wind.png",
  751: "Moon fast wind.png",
  761: "Moon cloud fast wind.png",
  762: "Cloud fast wind.png",
  771: "Fast winds zaps.png",
  781: "Tornado.png",
  800: "Moon stars.png",
  801: "Moon cloud.png",
  802: "Cloud.png",
  803: "Cloud.png",
  804: "Cloud.png",
};

/**
 *
 * @param {str} city - - this is the name of the city (wether input in search bar or current location) that will be injected into apiUrl for the @displayWeatherOverview function to display information at ui level
 *
 * @searchCity - This is the function that will create the apiURL to run against @displayWeatherOverivew
 */
function searchCity(city) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;

  const params = new URLSearchParams();
  params.append("q", city);
  params.append("units", unit);
  params.append("appid", apiKey);
  let apiUrl = `${apiEndPoint}?${params.toString()}`;
  axios.get(apiUrl).then(displayWeatherOverview);
}

/**
 *
 * @param {Number} currentTime - In Epoch seconds
 * @param {Number} sunriseTime - In Epoch seconds
 * @param {Number} sunsetTime  - In Epoch seconds
 *
 * @returns {Boolean} - True if current time falls between sunrise and sunset
 */
function isDayTime(currentTime, sunriseTime, sunsetTime) {
  return currentTime > sunriseTime && currentTime < sunsetTime;
}

/**
 * This function translates weather id codes from openweather to asset paths
 * for their icons because I think the icons from the site are ugly.
 *
 * @param data {Object} - the weather app response (See https://openweathermap.org/current#current_JSON)
 *
 * @returns str - the icon filename associated with the weather id code
 */
function replaceIcon(data) {
  let id = data.weather[0].id;
  if (isDayTime(data.dt, data.sys.sunrise, data.sys.sunset)) {
    return newWeatherDayIcon[id];
  } else {
    return newWeatherNightIcon[id];
  }
}

function updateForecastIcon(dayObj) {
  let id = dayObj.weather[0].id;
  if (isDayTime(dayObj.dt, dayObj.sunrise, dayObj.sunset)) {
    return newWeatherDayIcon[id];
  } else {
    return newWeatherNightIcon[id];
  }
}

//format time for correct display
function formatZeroPrefix(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

/**data transformation of timestamp for date and time display
 * Grabbing the timestamp from javascript to transform it for current date
 * @return str - this keeps code single responsibility, transform that timestamp to string and displays
 */
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dayinMonth = date.getDate();
  let dayofWeek = days[date.getDay()];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `Last Updated: ${formatZeroPrefix(hours)}:${formatZeroPrefix(
    minutes
  )} <br/> ${dayofWeek} ${month} ${dayinMonth} `;
}

/**
 *
 * @param {unit} windspeedUnit - this takes the unit based of the main apiurl
 *
 * @if - this statement says that if the current unit in the apiURL is imperial, to denote the windspeed in MPH
 * @else - this statement says that otherwise it should default to m/s for metric
 *
 * @returns  -
 */
function windspeedUnit(unit) {
  if (unit === "imperial") {
    return `mph`;
  } else {
    return `m/s`;
  }
}

function getForecast(coordinates) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/onecall?`;
  const params = new URLSearchParams();

  params.append("lat", coordinates.lat);
  params.append("lon", coordinates.lon);
  params.append("units", unit);
  params.append("appid", apiKey);
  let apiUrl = `${apiEndPoint}${params.toString()}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function convertTimestampToDayOfWeek(timestamp) {
  let date = new Date(timestamp);
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastRow = document.querySelector("#forecast");

  let forecastHTML = `<div class="row align-items-center mt-5">`;

  response.data.daily.slice(1, 5).forEach(function (dayObj) {
    let dayOfWeek = convertTimestampToDayOfWeek(dayObj.dt * 1000).slice(0, 3);
    let tempMax = Math.round(dayObj.temp.max);
    let tempMin = Math.round(dayObj.temp.min);

    forecastHTML =
      forecastHTML +
      ` 
        <div class="col-3 text-center">
          <div class="weather-forecast-date">${dayOfWeek}</div>
          <img
            src="Weatherly - Original render copy/${updateForecastIcon(dayObj)}"
            class="p-0 ms-0"
            width="50%"
            alt=""
          />
          <div class="weather-forecast-temperature p-2">
            <span class="weather-forecast-max">${tempMax}°</span>
            <span class="text-muted weather-forecast-min">${tempMin}°</span>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastRow.innerHTML = forecastHTML;
}

//display of weather overview
function displayWeatherOverview(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#main-degree-number").innerHTML = ` ${Math.round(
    response.data.main.temp
  )}°`;

  document.querySelector(
    "#weather-word-descriptor"
  ).innerHTML = `${response.data.weather[0].description}`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}% `;

  document.querySelector("#windspeed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} ${windspeedUnit(unit)}`;

  document.querySelector("#current-time-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `Weatherly - Original render copy/${replaceIcon(response.data)}`
    );

  getForecast(response.data.coord);
}

/**
 *
 * @param {Response} updateMyCityDisplay - This pulls the object from the apiURL. The object contains data on current location, including current 'name' of location
 *
 * @city response.data.name - This reassigns the value of city to the 'name' of location that is based off current lat & long of device
 *
 * @searchCity - It then uses that newly reassined value of city to run against this function
 */
function updateMyCityDisplay(response) {
  city = response.data.name;
  searchCity(city);
}

/**
 *
 * @param {Lat} updateCurrentLocation - This takes the lat data that was pulled from the @findMyLocation function
 * @param {Long} updateCurrentLocation - This takes the lat data that was pulled from the @findMyLocation function
 *
 * @updateCurrentLocation (lat,long) takess the above information to inject into a newly created apiURL
 */
function updateCurrentLocation(lat, long) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather`;
  const params = new URLSearchParams();
  params.append("lat", lat);
  params.append("lon", long);
  params.append("units", unit);
  params.append("appid", apiKey);
  let apiUrl = `${apiEndPoint}?${params.toString()}`;

  axios.get(apiUrl).then(updateMyCityDisplay);
}

/**
 *
 * @param {Postion} findMyLocation - This takes the location data of current device pulled from javascript and pulls the lat and long data
 *
 * It then takes that lat and long data to run against the @updateCurrentLocation function
 */
function findMyLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  updateCurrentLocation(lat, long);
}

/**
 *
 * @param {Event} getCurrentLocation - This uses javascript to pull the location data of the current device.
 *
 * It takes this location data of current devices and runs it against the @findMyLocationFunction
 */
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findMyLocation);
}

/**
 *
 * @param {Event}  handleSubmit - This reassigns city (from global city = "Austin") to str value of the search form input
 * @function searchCity {city}  - This takes the reassigned value of city to run against the searchCity function;
 */
function handleSubmit(event) {
  event.preventDefault();
  city = document.querySelector("#city-input").value;
  searchCity(city);
}

/**
 *
 * @param {Event} updateTempToCelsius - This updates the param value of unit in the url to the corresponding temp unit of "metric";
 */
function updateTempToCelsius(event) {
  unit = "metric";
  searchCity(city);
}

/**
 *
 * @param {Event} updateTempToFahrenheit - This updates the param value of "unit" in the url to the corresponding temp unit of "imperial";
 */
function updateTempToFahrenheit(event) {
  unit = "imperial";
  searchCity(city);
}

document
  .querySelector("#btn-celsius")
  .addEventListener("click", updateTempToCelsius);

document
  .querySelector("#btn-fahrenheit")
  .addEventListener("click", updateTempToFahrenheit);

document
  .querySelector("#current-search-click-button")
  .addEventListener("click", getCurrentLocation);

//initializer function
document.querySelector("#search-form").addEventListener("submit", handleSubmit);
//Initiaizing display city
searchCity(city);
