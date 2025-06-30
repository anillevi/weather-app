# Weather Dashboard Application

A simple weather dashboard that displays city weather information in cards. Users can add and delete cities, with data persisted across server restarts. Features dark/light theme support and uses Fahrenheit/US metrics.

![Weather App Screenshot](screenshot.png)

## Features
- Add cities to track weather
- Delete cities from dashboard
- Dark/light theme toggle
- Responsive design
- Weather data persistence
- Real-time weather updates from OpenWeatherMap API

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key (free tier)

## Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

2. **Install dependencies**
```bash
npm install express node-fetch dotenv
```

3. **Set up environment variables**
Create a `.env` file in the project root:
```env
WEATHER_API_KEY=your_openweathermap_api_key
```

4. **Run the server**
```bash
node server.js
```

5. **Access the application**
Open `http://localhost:3000` in your browser
## Troubleshooting
- If you see "WEATHER_API_KEY environment variable is not set":
  1. Confirm your `.env` file exists in the project root
  2. Verify it contains `WEATHER_API_KEY=your_api_key`
  3. Restart the server after making changes

## Using the Application
1. Enter a city name in the input field and click "Add City"
2. Weather information will appear in a card format
3. Click the delete button on a card to remove it
4. Use the theme toggle to switch between dark and light modes

## API Configuration
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Add it to your `.env` file as `WEATHER_API_KEY`

## File Structure
- `server.js` - Backend server (Node.js/Express)
- `public/` - Frontend files
  - `index.html` - Main HTML structure
  - `style.css` - Styling and themes
  - `app.js` - Frontend functionality
- `cities.json` - Auto-generated city storage
- `README.md` - This documentation

## Dependencies
- [Express](https://expressjs.com/) - Web framework
- [node-fetch](https://www.npmjs.com/package/node-fetch) - HTTP requests

## The Roo Code Prompt

Create a weather application that lists cities as cards. We need the ablility to add and delete cards. Each card displays weather details for a city by querying an open source free weather api. Create comprehensive documentation for this, including a readme on how to run this. The app needs to handle themes, dark and light modes. Use Fahrenheit as the unit of temperature. Use US metrics everywhere. We also need the cards to persist across server restarts.
