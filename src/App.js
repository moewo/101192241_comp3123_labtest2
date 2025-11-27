import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
if (!API_KEY) {
  console.warn("REACT_APP_WEATHER_API_KEY is not set.");
}

function App() {
  const [city, setCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>
      <SearchBar
        city={city}
        onCityChange={setCity}
        onSearch={fetchWeather}
      />
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      <WeatherCard weather={weatherData} />
    </div>
  );
}

export default App;