function updateWeather(response) {
    let tempElement = document.querySelector("#weather-current-temp");
    let temp = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-city");
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(temp);
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

let searchElement = document.querySelector("#search");
searchElement.addEventListener("submit", handleSubmit)

searchCity("Lisbon");