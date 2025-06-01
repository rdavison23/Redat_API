fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=sunrise,sunset&hourly=temperature_2m&current=is_day&temperature_unit=fahrenheit")
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    console.log("API Response:", data); // Logs API data to check response

    // Extract temperature, sunrise, and sunset data
    const temperature = data.hourly.temperature_2m[0]; // First hour's temperature
    const sunrise = data.daily.sunrise[0]; // First day's sunrise
    const sunset = data.daily.sunset[0]; // First day's sunset

    // Update HTML with API data
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("sunrise").textContent = sunrise;
    document.getElementById("sunset").textContent = sunset;
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
  });
