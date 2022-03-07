let apiKey = "87b9752c714fbde6317ef3900b3d8fb6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=imperial&appid=${apiKey}`;
console.log(apiUrl);

function formatZeroPrefix(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

function formatDate(timestamp) {
  //calculate the date
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
}
axios.get(apiUrl).then(displayWeatherOverview);
