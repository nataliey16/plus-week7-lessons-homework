function displayTemperature(response) {
  console.log(response.data);
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
}

let apiKey = "abc1ee724ce94bd135a062b94b61de5a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Calgary&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
