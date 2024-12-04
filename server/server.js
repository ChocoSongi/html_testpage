const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

const OPENWEATHER_API_KEY = '34ca17f9b51486bfaeaf8d66c7fde8fd';

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// API Endpoint Example
app.post('/weather', async (req, res) => {
    console.log("Incoming request body:", req.body); // 로그 추가
    const { ip } = req.body;

    if (!ip) {
        return res.status(400).json({ error: "IP address is required" });
    }

    try {
        // IP API 호출
        const ipResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
        console.log("IP API Response:", ipResponse.data); // 로그 추가
        const { latitude, longitude } = ipResponse.data;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Failed to fetch latitude/longitude" });
        }

        // OpenWeatherMap API 호출
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        console.log("Weather API Response:", weatherResponse.data); // 로그 추가

        const { temp, humidity } = weatherResponse.data.main;

        res.json({
            location: `${ipResponse.data.city}, ${ipResponse.data.country_name}`,
            temperature: `${temp} °C`,
            humidity: `${humidity} %`,
        });
    } catch (error) {
        console.error("Error in fetching weather data:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Serve React static files
const buildPath = path.join(__dirname, '../client/build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
