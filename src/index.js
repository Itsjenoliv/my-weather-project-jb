function updateWeather(response) {
    let tempElement = document.querySelector("#weather-current-temp");
    let temp = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-city");
    let descriptionElement = document.querySelector ("#weatherDescription");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let icon = document.querySelector("#weather-icon");


    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    speedElement.innerHTML = `${response.data.wind.speed}km/h`;
    tempElement.innerHTML = Math.round(temp);
    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-temp" />`;

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity (city) {
    let apiKey = "65a24eoe6e271bf94a4a755eb31f805t";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
}

function handleSubmit (event) { 
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "65a24eoe6e271bf94a4a755eb31f805t";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast (response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml = forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecaste-date">${formatDay(day.time)}</div>
            <div><img src="${day.condition.icon_url}" class="weather-forecast-icon"/></div>
            <div class="weather-forecast-temps">
                <div class="weather-forecast-temp"><strong>${Math.round(day.temperature.maximum)}º</strong></div>
                <div class="weather-forecast-temp">${Math.round(day.temperature.minimum)}º</div>
            </div>
        </div>`;
    }
    });

    let forecasteElement = document.querySelector("#forecast");
    forecasteElement.innerHTML = forecastHtml;
}

let searchElement = document.querySelector("#search");
searchElement.addEventListener("submit", handleSubmit)

searchCity("Lisbon");
