//initilize city display
let city = "St Louis";
let unit = "imperial";
let apiKey = "87b9752c714fbde6317ef3900b3d8fb6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

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

/**
 * This function translates weather id codes from openweather to asset paths
 * for their icons because I think the icons from the site are ugly.
 *
 * @param id {int} - the weather id code from openweather
 *
 * @returns str - the icon filename associated with the weather id code
 */
function replaceIcon(id) {}

//format time for correct display
function formatZeroPrefix(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

/**data transformation of timestamp for date and time display
 * Grabbing the timestamp from javascript to transform it for current date
 * @returns str - this keeps code single responsibility, transform that timestamp to string and displays
 */
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dayinMonth = date.getDate();
  let dayofWeek = days[date.getDay()];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${formatZeroPrefix(hours)}:${formatZeroPrefix(
    minutes
  )} <br/> ${dayofWeek} ${month} ${dayinMonth} `;
}

//display of weather overview
function displayWeatherOverview(response) {
  console.log(response);

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
  )} mph`;

  document.querySelector("#current-time-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `Weatherly - Original render copy$/${replaceIcon(
        response.data.weather[0].id
      )}`
    );
}

//initializer function
axios.get(apiUrl).then(displayWeatherOverview);
