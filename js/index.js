// API URLs for separate queries
const currentWeatherUrl =
  'https://api.open-meteo.com/v1/forecast?latitude=47.6062&longitude=-122.3321&current=temperature_2m,relative_humidity_2m&temperature_unit=fahrenheit';
const forecastUrl =
  'https://api.open-meteo.com/v1/forecast?latitude=47.6062&longitude=-122.3321&daily=sunrise,sunset&temperature_unit=fahrenheit';

// Function to format temperature & humidity properly
function formatTemperature(temp) {
  return temp.toString().endsWith('°F') ? temp : temp + '°F';
}

function formatHumidity(humidity) {
  return humidity.toString().endsWith('%') ? humidity : humidity + '%';
}

// Function to fetch and update current weather (temperature & humidity)
function fetchCurrentWeather() {
  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(
        'API Response (Current Weather):',
        JSON.stringify(data, null, 2)
      );

      if (!data.current) {
        console.error('Unexpected API response structure:', data);
        alert('Could not fetch weather data - check your internet connection.');
        return;
      }

      // Extract temperature & humidity
      const temperatureRaw = data.current?.temperature_2m ?? 'N/A';
      const humidityRaw = data.current?.relative_humidity_2m ?? 'N/A';

      // Ensure units are added only if missing
      const temperature = formatTemperature(temperatureRaw);
      const humidity = formatHumidity(humidityRaw);

      // Update HTML elements
      updateElementText('temperature', temperature);
      updateElementText('humidity', humidity);

      showSection('weather');
    })
    .catch((error) => {
      console.error('Error fetching current weather data:', error);
      alert('Could not fetch weather data - check your internet connection.');
    });
}

// Function to fetch and update forecast data (sunrise & sunset)
function fetchForecast() {
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response (Forecast):', JSON.stringify(data, null, 2));

      if (!data.daily) {
        console.error('Unexpected API response structure:', data);
        alert(
          'Could not fetch forecast data - check your internet connection.'
        );
        return;
      }

      // Extract sunrise & sunset times
      const sunriseRaw = data.daily?.sunrise?.[0] ?? 'N/A';
      const sunsetRaw = data.daily?.sunset?.[0] ?? 'N/A';

      // Convert timestamps to local time
      const sunrise =
        sunriseRaw !== 'N/A'
          ? new Date(sunriseRaw).toLocaleTimeString() + ' UTC'
          : 'N/A';
      const sunset =
        sunsetRaw !== 'N/A'
          ? new Date(sunsetRaw).toLocaleTimeString() + ' UTC'
          : 'N/A';
      updateElementText('sunrise', sunrise);
      updateElementText('sunset', sunset);

      showSection('forecast');
    })
    .catch((error) => {
      console.error('Error fetching forecast data:', error);
      alert('Could not fetch forecast data - check your internet connection.');
    });
}

// Function to update an element’s text content
function updateElementText(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value;
  }
}

// Function to toggle section visibility
function showSection(sectionId) {
  const weatherSection = document.getElementById('weather');
  const forecastSection = document.getElementById('forecast');

  if (weatherSection && forecastSection) {
    weatherSection.style.display = sectionId === 'weather' ? 'block' : 'none';
    forecastSection.style.display = sectionId === 'forecast' ? 'block' : 'none';
  } else {
    console.error('Sections not found in DOM');
  }
}

// Ensure buttons exist before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  const weatherBtn = document.getElementById('weather-btn');
  const forecastBtn = document.getElementById('forecast-btn');

  if (weatherBtn && forecastBtn) {
    weatherBtn.addEventListener('click', fetchCurrentWeather);
    forecastBtn.addEventListener('click', fetchForecast);

    // Fetch initial weather
    fetchCurrentWeather();
  } else {
    console.error('Buttons not found in DOM');
  }
});
