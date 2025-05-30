fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=sunrise,sunset&hourly=temperature_2m&current=is_day&temperature_unit=fahrenheit")
  .then(response => response.json())
  .then(data => {
    // Extract data from API response
    const temperature = data.hourly.temperature_2m[0]; // First hour's temperature
    const sunrise = data.daily.sunrise[0]; // Sunrise time
    const sunset = data.daily.sunset[0]; // Sunset time

    // Update HTML elements with API data
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("sunrise").textContent = sunrise;
    document.getElementById("sunset").textContent = sunset;
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
  });
