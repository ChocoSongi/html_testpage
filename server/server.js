const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

const OPENWEATHER_API_KEY = '34ca17f9b51486bfaeaf8d66c7fde8fd';

// Middleware
app.use(cors());
app.use(express.json());

// Weather API Endpoint
app.post('/weather', async (req, res) => {
  console.log("Incoming request body:", req.body);

  const { ip } = req.body;
  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  try {
    // Fetch location data using IP
    const ipResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
    console.log("IP API Response:", ipResponse.data);

    const { latitude, longitude, city, country_name } = ipResponse.data;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Failed to fetch latitude/longitude" });
    }

    // Fetch weather data using coordinates
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    console.log("Weather API Response:", weatherResponse.data);

    const { temp, humidity } = weatherResponse.data.main;

    res.json({
      location: `${city}, ${country_name}`,
      temperature: `${temp} °C`,
      humidity: `${humidity} %`,
    });

  } catch (error) {
    console.error("Error in fetching weather data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve React static files
const buildPath = path.join(__dirname, '../client/public');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
