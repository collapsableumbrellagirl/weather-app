//initilize city display
let city = "Austin";
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

/**
 * This function translates weather id codes from openweather to asset paths
 * for their icons because I think the icons from the site are ugly.
 *
 * @param id {int} - the weather id code from openweather
 *
 * @returns str - the icon filename associated with the weather id code
 */
function replaceIcon(id) {
  return newWeatherDayIcon[id];
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
      `Weatherly - Original render copy/${replaceIcon(
        response.data.weather[0].id
      )}`
    );
}

//initializer function
axios.get(apiUrl).then(displayWeatherOverview);

console.log(apiUrl);
