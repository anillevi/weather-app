document.addEventListener('DOMContentLoaded', () => {
  const cityForm = document.getElementById('city-form');
  const cityInput = document.getElementById('city-input');
  const weatherCards = document.getElementById('weather-cards');
  const themeToggle = document.getElementById('theme-toggle');
  
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Load cities on page load
  loadCities();
  
  // Form submission handler
  cityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
      await addCity(city);
      cityInput.value = '';
    }
  });
  
  // Theme toggle handler
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Load cities from backend
  async function loadCities() {
    try {
      const response = await fetch('/api/cities');
      const cities = await response.json();
      weatherCards.innerHTML = '';
      for (const city of cities) {
        await fetchWeather(city);
      }
    } catch (error) {
      console.error('Error loading cities:', error);
    }
  }
  
  // Add new city
  async function addCity(city) {
    try {
      const response = await fetch('/api/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
      });
      
      if (response.ok) {
        await fetchWeather(city);
      } else {
        alert('Failed to add city');
      }
    } catch (error) {
      console.error('Error adding city:', error);
    }
  }
  
  // Fetch weather data and create card
  async function fetchWeather(city) {
    try {
      const response = await fetch(`/api/weather/${city}`);
      const data = await response.json();
      
      if (data.cod === 200) {
        createWeatherCard(data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  }
  
  // Create weather card element
  function createWeatherCard(weatherData) {
    const card = document.createElement('div');
    card.className = 'weather-card';
    
    const date = new Date(weatherData.dt * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    card.innerHTML = `
      <h2>${weatherData.name}</h2>
      <div class="date">${formattedDate}</div>
      <div class="weather-details">
        <div>Temperature: ${weatherData.main.temp}°F</div>
        <div>Feels like: ${weatherData.main.feels_like}°F</div>
        <div>Humidity: ${weatherData.main.humidity}%</div>
        <div>Wind: ${weatherData.wind.speed} mph</div>
        <div>Conditions: ${weatherData.weather[0].description}</div>
      </div>
      <button class="delete-btn" data-city="${weatherData.name}">Delete</button>
    `;
    
    weatherCards.appendChild(card);
    
    // Add event listener to delete button
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', async () => {
      try {
        const response = await fetch(`/api/cities/${weatherData.name}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          card.remove();
        } else {
          alert('Failed to delete city');
        }
      } catch (error) {
        console.error('Error deleting city:', error);
      }
    });
  }
});