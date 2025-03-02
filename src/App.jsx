import { useState } from 'react';
import './App.css';
import WeatherDetails from './WeatherDetails';

export default function App() {
  const [zip, setZip] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async (zip) => {
    const apiKey = '4d940566413cbb48ddbe156f2b502364';
    if (!zip) return; // Prevent empty requests

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${apiKey}&units=imperial`
      );

      const weatherData = await response.json();
      if (!response.ok) throw new Error(weatherData.message || 'Failed to fetch weather data');

      setWeather({
        location: weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      });

      setError('');
    } catch (e) {
      setWeather(null);
      setError(e.message);
    }
  };

  const handleZipChange = (e) => setZip(e.target.value);

  const handleSearch = () => getWeather(zip);

  return (
    <div className="container text-center mt-4">
      <h2>Weather App 🌤️</h2>
      <div className="row justify-content-center">
        <div className="col-6 col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter US Zip Code"
            value={zip}
            onChange={handleZipChange}
          />
          <button className="btn btn-primary mt-2 w-100" onClick={handleSearch}>
            Get Weather
          </button>
        </div>
      </div>
      <WeatherDetails weather={weather} error={error} />
    </div>
  );
}
