import React from "react";

function WeatherCard({ weather }) {
  if (!weather) {
    return <p className="placeholder">Search for a city to see the weather.</p>;
  }
  const {
    name,
    sys,
    main,
    weather: weatherArray,
    wind,
  } = weather;
  const weatherInfo = weatherArray && weatherArray[0];
  const iconCode = weatherInfo?.icon;
  const iconUrl = iconCode
    ? `http://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null;
  const toCelsius = (k) => (k - 273.15).toFixed(1);

  return (
    <div className="weather-card">
      <div className="header">
        <h2>
          {name}, {sys?.country}
        </h2>
        {iconUrl && (
          <img className="weather-icon" src={iconUrl} alt={weatherInfo?.description} />
        )}
      </div>
      <div className="temp">
        <span className="temp-main">{toCelsius(main.temp)}°C</span>
        <span className="temp-feels">
          Feels like: {toCelsius(main.feels_like)}°C
        </span>
      </div>
      <div className="details">
        <p>{weatherInfo?.main} – {weatherInfo?.description}</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind?.speed} m/s</p>
        <p>
          Min: {toCelsius(main.temp_min)}°C | Max: {toCelsius(main.temp_max)}°C
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;