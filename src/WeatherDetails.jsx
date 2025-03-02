import React from 'react';
import './WeatherDetails.css';

export default function WeatherDetails({ weather, error }) {
  if (error) {
    return <div className="error mt-3">{error}</div>;
  }

  if (!weather) {
    return <div className="mt-3">Enter a zip code to get the weather details.</div>;
  }

  return (
    <div className="weather-container mt-4">
      <h3>Weather in {weather.location}</h3>
      <img id="icon" src={weather.icon} alt="Weather Icon" />
      <p>{weather.temperature}°F - {weather.description}</p>
    </div>
  );
}
