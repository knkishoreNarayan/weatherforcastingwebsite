const apiKey = "cf024055160ac577e3ea4ab9a26d9180";
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherCondition = document.getElementById("weather-condition");

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        alert("Error fetching weather data. Please try again later.");
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
    weatherResult.classList.remove("hidden");
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                alert("Error fetching weather data. Please try again later.");
            }
        }, () => {
            alert("Unable to retrieve location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

locationBtn.addEventListener("click", getUserLocation);