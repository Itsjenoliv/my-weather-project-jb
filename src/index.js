function handleSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let cityElement = document.querySelector("#weather-city");
    cityElement.innerHTML = searchInput.value;
}

let searchElement = document.querySelector("#search");
searchElement.addEventListener("submit", handleSubmit)