const API_KEY = '540aaa7b8e819e609036f91c47086c38';

const LAT   = 14.73;
const LON   = 120.97;
const UNITS = 'metric';

const weatherNowEl      = document.getElementById('weather-now');
const weatherForecastEl = document.getElementById('weather-forecast');

function getEmoji(iconCode) {
  const map = {
    '01d':'☀️','01n':'🌙',
    '02d':'⛅','02n':'☁️',
    '03d':'☁️','03n':'☁️',
    '04d':'☁️','04n':'☁️',
    '09d':'🌧️','09n':'🌧️',
    '10d':'🌦️','10n':'🌧️',
    '11d':'⛈️','11n':'⛈️',
    '13d':'❄️','13n':'❄️',
    '50d':'🌫️','50n':'🌫️',
  };
  return map[iconCode] || '🌡️';
}

function shortDay(unixTs) {
  return new Date(unixTs * 1000)
    .toLocaleDateString('en-US', { weekday: 'short' });
}

function renderCurrent(data) {
  const temp    = Math.round(data.main.temp);
  const feels   = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const wind    = Math.round(data.wind.speed * 3.6);
  const desc    = data.weather[0].description;
  const emoji   = getEmoji(data.weather[0].icon);

  weatherNowEl.innerHTML = `
    <div class="weather-icon" aria-hidden="true">${emoji}</div>
    <div class="weather-temp-block">
      <span class="weather-temp">${temp}</span>
      <span class="weather-unit">°C</span>
    </div>
    <div class="weather-details">
      <p class="weather-desc">${desc}</p>
      <p class="weather-meta">Feels like ${feels}°C</p>
      <p class="weather-meta">Humidity: ${humidity}%</p>
      <p class="weather-meta">Wind: ${wind} km/h</p>
    </div>
  `;
}


function renderForecast(data) {
  const todayDate = new Date().toDateString();
  const dayMap    = {};

  for (const item of data.list) {
    const d       = new Date(item.dt * 1000);
    const dateKey = d.toDateString();

    if (dateKey === todayDate) continue; 

    if (!dayMap[dateKey]) {
      dayMap[dateKey] = item; 
    }
    if (d.getHours() === 12) {
      dayMap[dateKey] = item; 
    }

    if (Object.keys(dayMap).length === 3) break;
  }

  const days = Object.values(dayMap).slice(0, 3);

  if (!days.length) {
    weatherForecastEl.innerHTML = '<p class="weather-error">Forecast unavailable.</p>';
    return;
  }

  weatherForecastEl.innerHTML = days.map(item => {
    const temp  = Math.round(item.main.temp);
    const desc  = item.weather[0].description;
    const emoji = getEmoji(item.weather[0].icon);
    const day   = shortDay(item.dt);

    return `
      <div class="forecast-day">
        <p class="day-name">${day}</p>
        <div class="day-icon" aria-hidden="true">${emoji}</div>
        <p class="day-temp">${temp}<sup>°C</sup></p>
        <p class="day-desc">${desc}</p>
      </div>`;
  }).join('');
}

function showError(msg) {
  if (weatherNowEl)
    weatherNowEl.innerHTML = `<p class="weather-error">${msg}</p>`;
  if (weatherForecastEl)
    weatherForecastEl.innerHTML = '';
}

function renderDemo() {
  weatherNowEl.innerHTML = `
    <div class="weather-icon" aria-hidden="true">⛅</div>
    <div class="weather-temp-block">
      <span class="weather-temp">31</span>
      <span class="weather-unit">°C</span>
    </div>
    <div class="weather-details">
      <p class="weather-desc">partly cloudy</p>
      <p class="weather-meta">Feels like 36°C</p>
      <p class="weather-meta">Humidity: 74%</p>
      <p class="weather-meta">Wind: 18 km/h</p>
    </div>
    <p class="weather-error" style="grid-column:1/-1;margin-top:0.5rem;font-size:0.75rem">
      ⚠️ Demo data — paste your API key in <code>scripts/weather.js</code>
    </p>
  `;

  const demos = [
    { day: 'Tmrw', emoji: '🌦️', temp: 29, desc: 'light rain' },
    { day: 'Day 2', emoji: '⛅',  temp: 30, desc: 'partly cloudy' },
    { day: 'Day 3', emoji: '☀️',  temp: 32, desc: 'clear sky' },
  ];

  weatherForecastEl.innerHTML = demos.map(d => `
    <div class="forecast-day">
      <p class="day-name">${d.day}</p>
      <div class="day-icon" aria-hidden="true">${d.emoji}</div>
      <p class="day-temp">${d.temp}<sup>°C</sup></p>
      <p class="day-desc">${d.desc}</p>
    </div>
  `).join('');
}

async function loadWeather() {
  if (!weatherNowEl) return; 

  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    renderDemo();
    return;
  }

  const BASE = 'https://api.openweathermap.org/data/2.5';

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE}/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`),
      fetch(`${BASE}/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`)
    ]);

    if (currentRes.status === 401) {
      showError('⚠️ Invalid API key. Check your key in weather.js and make sure it has been activated (can take ~10 min after signup).');
      return;
    }
    if (currentRes.status === 429) {
      showError('⚠️ API rate limit reached. Try again in a moment.');
      return;
    }
    if (!currentRes.ok) {
      showError(`⚠️ Weather unavailable (error ${currentRes.status}).`);
      return;
    }

    const currentData  = await currentRes.json();
    const forecastData = await forecastRes.json();

    renderCurrent(currentData);
    renderForecast(forecastData);

  } catch (err) {
    console.error('Weather fetch failed:', err);
    showError('⚠️ Could not load weather. Check your internet connection.');
  }
}

document.addEventListener('DOMContentLoaded', loadWeather);