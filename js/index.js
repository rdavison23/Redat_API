fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=sunrise,sunset&hourly=temperature_2m&current=is_day&temperature_unit=fahrenheit")
  .then(response => response.json())
  .then(data => {
    console.log("API Response:", JSON.stringify(data, null, 2));

    // Extract data safely
    const temperature = data.hourly?.temperature_2m?.[0] ?? "N/A";
    const sunrise = data.daily?.sunrise?.[0] ?? "N/A";
    const sunset = data.daily?.sunset?.[0] ?? "N/A";

    // Update HTML elements
    document.getElementById("temperature").textContent = temperature;
    document.getElementById("sunrise").textContent = sunrise;
    document.getElementById("sunset").textContent = sunset;
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
  });
