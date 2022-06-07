function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
             <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <div>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/48/rain_light.png"
                  alt="forecast-icon"
                  class="weather-forecast-icon"
                  width="36"
                />
              </div>
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">18˚</span>
                <span class="weather-forecast-temperature-min">12˚</span>
              </div>
            </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#shown-city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#shown-weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let temperatureElement = document.querySelector("#shown-temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#shown-humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let windElement = document.querySelector("#shown-wind");
  let wind = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${wind} km/hr`;

  celciusTemperature = response.data.main.temp;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute(
    "alt",
    `${response.data.weather[0].description}`
  );
}

function search(city) {
  let apiKey = "abc1ee724ce94bd135a062b94b61de5a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#shown-temperature");
  // add the active farhenheit link to make it inactive
  // remove the inactive celcius link to make it active
  celciusLink.classList.remove("active");
  farhenheitLink.classList.add("active");
  let farhenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(`${farhenheitTemperature}`);
  // alert(farhenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#shown-temperature");
  celciusLink.classList.add("active");
  farhenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
  // alert(farhenheitTemperature);
}
let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farhenheitLink = document.querySelector("#farhenheit-link");
farhenheitLink.addEventListener("click", displayFarenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelsiusTemperature);

search("Calgary");
displayForecast();
