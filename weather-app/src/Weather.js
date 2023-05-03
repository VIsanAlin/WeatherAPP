import React, { useState, useEffect } from "react";
import SunnyDay from "./img/sunnyday.jpg";

import WeatherIcon from "./components/weatherIcon";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [tempCelsius, setTempCelsius] = useState(0);
  const [weatherBackground, setWeatherBackground] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Bucharest,ro&APPID=9ed4d0eab80ab31d905bafb34edf87da"
      );

      const data = await response.json();

      setWeatherData(data);
      setTempCelsius(weatherData.main.temp - 273.15);

      if (data.weather[0].main === "Clear") {
        setWeatherBackground(SunnyDay);
      }
      console.log(data);
      console.log(weatherBackground);
    };

    fetchData();
  }, []);

  if (!weatherData) return <div>Loading...</div>;

  return (
    <div style={{ backgroundImage: `url(${weatherBackground})` }}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
        <div className="p-4 bg-white shadow-lg rounded-md">
          <h2 className="text-xl font-bold text-gray-800">
            Weather in {weatherData.name}
          </h2>
          <p className="text-gray-600 mb-4">
            The coords are long :{weatherData.coord.lon} and lat :{" "}
            {weatherData.coord.lat}
          </p>

          <div className="flex items-center">
            <WeatherIcon weather={weatherData.weather[0].main} />
            <p className="text-xl font-bold text-gray-800 ml-4">
              {tempCelsius.toFixed(1)}C - {weatherData.weather[0].description}
            </p>
          </div>

          <div className="mt-8">
            <label className="text-gray-600">Temperature:</label>
            <p className="text-gray-800 font-bold">{tempCelsius.toFixed(1)}C</p>
            <input
              className="border rounded-md px-2 py-1 w-24 mt-2"
              type="number"
              value={tempCelsius}
            />
          </div>

          <div className="mt-8">
            <label className="text-gray-600">Feels like:</label>
            <p className="text-gray-800 font-bold">
              {weatherData.main.feels_like}°F
            </p>
          </div>

          <div className="mt-8">
            <label className="text-gray-600">Wind:</label>
            <p className="text-gray-800 font-bold">
              {weatherData.wind.speed} m/s
            </p>
          </div>
        </div>

        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>
            The coords are long :{weatherData.coord.lon} and lat :{" "}
            {weatherData.coord.lat}
          </p>

          <div>
            <h1>Weather</h1>
            {/* Based on weather data */}
            <WeatherIcon weather={weatherData.weather[0].main} />
            <p>Description: {weatherData.weather[0].description}</p>
          </div>

          <p>Temperature: {tempCelsius}C</p>

          <p>
            Temperature : <input type="number" value={tempCelsius} /> {""}C
          </p>
          <p>Feels like : {weatherData.main.feels_like}°F</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Wind : {weatherData.wind.speed}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
