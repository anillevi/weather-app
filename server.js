const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const DATA_FILE = path.join(__dirname, 'cities.json');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Ensure cities.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

// Read cities data
const getCities = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE));
  } catch (e) {
    return [];
  }
};

// Save cities data
const saveCities = (cities) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(cities, null, 2));
};

// Weather API configuration
const API_KEY = process.env.WEATHER_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get weather for a city
app.get('/api/weather/:city', async (req, res) => {
  try {
    // Use dynamic import for node-fetch (ES module compatibility)
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(
      `${BASE_URL}?q=${req.params.city},us&units=imperial&appid=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get all cities
app.get('/api/cities', (req, res) => {
  res.json(getCities());
});

// Add a city
app.post('/api/cities', (req, res) => {
  const cities = getCities();
  if (!cities.includes(req.body.city)) {
    cities.push(req.body.city);
    saveCities(cities);
  }
  res.json(cities);
});

// Delete a city
app.delete('/api/cities/:city', (req, res) => {
  let cities = getCities();
  cities = cities.filter(c => c !== req.params.city);
  saveCities(cities);
  res.json(cities);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});