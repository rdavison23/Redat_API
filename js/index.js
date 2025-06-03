// Base URL for fetching weather data
const baseUrl =
  'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=sunrise,sunset&hourly=temperature_2m,wind_speed_10m&current=is_day&temperature_unit=fahrenheit';

// Function to fetch and update weather data
function fetchWeatherData() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response (Weather):', JSON.stringify(data, null, 2)); // Debugging step

      if (!data.hourly || !data.daily) {
        console.error('Unexpected API response structure:', data);
        return;
      }

      // Extract data safely
      const temperature =
        Array.isArray(data.hourly.temperature_2m) &&
        data.hourly.temperature_2m.length > 0
          ? data.hourly.temperature_2m[0]
          : 'N/A';
      const sunriseRaw =
        Array.isArray(data.daily.sunrise) && data.daily.sunrise.length > 0
          ? data.daily.sunrise[0]
          : 'N/A';
      const sunsetRaw =
        Array.isArray(data.daily.sunset) && data.daily.sunset.length > 0
          ? data.daily.sunset[0]
          : 'N/A';

      // Convert timestamps to readable local time
      const sunrise =
        sunriseRaw !== 'N/A'
          ? new Date(sunriseRaw).toLocaleTimeString()
          : 'N/A';
      const sunset =
        sunsetRaw !== 'N/A' ? new Date(sunsetRaw).toLocaleTimeString() : 'N/A';

      // Update HTML elements if they exist
      updateElementText('temperature', temperature);
      updateElementText('sunrise', sunrise);
      updateElementText('sunset', sunset);

      // Show relevant section
      showSection('weather');
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

// Function to fetch and update extra data (humidity & wind speed)
function fetchExtraData() {
  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response (Extra Data):', JSON.stringify(data, null, 2)); // Debugging step

      if (!data.hourly) {
        console.error('Unexpected API response structure:', data);
        return;
      }

      // Extract additional data safely
      const humidity =
        Array.isArray(data.hourly.humidity_2m) &&
        data.hourly.humidity_2m.length > 0
          ? data.hourly.humidity_2m[0]
          : 'N/A';
      const windSpeed =
        Array.isArray(data.hourly.wind_speed_10m) &&
        data.hourly.wind_speed_10m.length > 0
          ? data.hourly.wind_speed_10m[0]
          : 'N/A';

      // Update HTML elements if they exist
      updateElementText('humidity', humidity);
      updateElementText('wind-speed', windSpeed);

      // Show relevant section
      showSection('extra-data');
    })
    .catch((error) => {
      console.error('Error fetching extra data:', error);
    });
}

// Function to update an element’s text content safely
function updateElementText(elementId, value) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = value;
  }
}

// Function to toggle section visibility
function showSection(sectionId) {
  document.getElementById('weather').style.display =
    sectionId === 'weather' ? 'block' : 'none';
  document.getElementById('extra-data').style.display =
    sectionId === 'extra-data' ? 'block' : 'none';
}

// Attach event listeners to buttons
document
  .getElementById('weather-btn')
  .addEventListener('click', fetchWeatherData);
document
  .getElementById('extra-data-btn')
  .addEventListener('click', fetchExtraData);

// Fetch initial weather data on page load
fetchWeatherData();
