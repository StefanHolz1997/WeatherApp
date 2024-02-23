function getWeather() {
  // API Key & Input
  const apiKey = "574e491c9f125ca1a5bb6d8c2122f31b";
  const city = document.querySelector("#city").value;

  //   Error Handling
  if (!city) {
    alert("Please enter a City");
    return;
  }
  // API URL
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Fetch currentWeather
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Fehler beim fetchen von current weather data:", error);
      alert(
        "Fehler beim fetchen von den aktuellen Wetterdaten. Bitte versuchen Sie es erneut."
      );
    });

  // Fetch forecastUrl
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Fehler beim fetchen der stündlichen Wetterdaten:", error);
      alert(
        "Fehler beim fetchen der stündlichen Wetterdaten. Bitte versuchen Sie es erneut."
      );
    });
}

// Funktion für aktuelle Wetterdaten
function displayWeather(data) {
  // variablen vordefinieren
  const tempDivInfo = document.querySelector("#temp-div");
  const weatherInfoDiv = document.querySelector("#weather-info");
  const weatherIcon = document.querySelector("#weather-icon");
  const hourlyForecastDiv = document.querySelector("#hourly-forecast");

  // clear voherigen content
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

    const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

// Funktion für stündliche Wetterdaten
function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.querySelector("#hourly-forecast");
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = ` 
    <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}°C</span>
    </div>
`;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.style.display = "block"; // Make the image visible once it's loaded
}
