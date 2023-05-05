import React, { useState, useEffect } from "react";
import SunnySky from "./img/sunnySky2400x1600.jpg";
import CloudySky from "./img/cloudySky2400x1600.jpg";
import RainySky from "./img/rainySky2400x1600.jpg.jpg";

import SearchBar from "./components/searchBar";
import WeatherIcon from "./components/weatherIcon";
// import MultipleWeather from "./components/weatherAPI";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [tempCelsius, setTempCelsius] = useState(0);
  const [feelsCelsius, setFeelsCelsius] = useState(0);
  const [weatherBackground, setWeatherBackground] = useState("");

  //
  const [name, setName] = useState("Bucharest");
  const [country, setCountry] = useState("ro");

  //
  const [multipleWeatherData, setMultipleWeatherData] = useState(null);

  //
  const [lat, setLat] = useState("44.4323");
  const [lon, setLon] = useState("26.1063");

  const handleWeatherData = (name, country) => {
    setName(name);
    setCountry(country);
    console.log(name, country);
  };

  // Principal data

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name},${country}&APPID=9ed4d0eab80ab31d905bafb34edf87da`
      );

      const data = await response.json();

      setWeatherData(data);

      setLat(data.coord.lat);
      setLon(data.coord.lon);

      if (data.main.temp) {
        setTempCelsius(data.main.temp - 273.15);
      }

      if (data.main.feels_like) {
        setFeelsCelsius(data.main.feels_like - 273.15);
      }
      new Promise((resolve) => {
        if (data.weather[0].main === "Clear") {
          setWeatherBackground(SunnySky);
          resolve();
        } else if (data.weather[0].main === "Clouds") {
          setWeatherBackground(CloudySky);
          resolve();
        } else if (data.weather[0].main === "Rain") {
          setWeatherBackground(RainySky);
          resolve();
        }
      }).then(() => console.log(weatherBackground));

      console.log(data);
    };

    fetchData();
  }, [name, country, weatherBackground]);

  // Next 5 days

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9ed4d0eab80ab31d905bafb34edf87da`
      );

      const data = await response.json();

      console.log(data);
      setMultipleWeatherData(data);
    };
    fetchData();
  }, [lat, lon]);

  if (!multipleWeatherData) return console.log("No data");

  const nextDate = (data) => {
    const date = new Date();
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + data);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return nextDay.toLocaleDateString("en-US", options);
  };

  const temperatureCelsius = (temp) => {
    return `${(temp - 273.15).toFixed(1)}°C`;
  };

  if (!weatherData) return <div>Loading...</div>;

  return (
    <div
      className="bg-cover"
      style={{ backgroundImage: `url(${weatherBackground})` }}
    >
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <div className="p-4  bg-gray-200 bg-opacity-80 shadow-lg rounded-md">
          <SearchBar handleWeatherData={handleWeatherData}> </SearchBar>
          <div className="flex justify-center md:justify-center pt-6 pb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Weather in {weatherData.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 border border-gray-400 border-opacity-50 p-4 rounded-lg m-2">
            <div className="flex items-center justify-center md:justify-center">
              <WeatherIcon weather={weatherData.weather[0].main} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="text-gray-600">Temperature:</div>
              <div className="text-gray-800 font-bold">
                {tempCelsius.toFixed(1)}C
              </div>
              <div className="text-gray-600">Feels like:</div>
              <div className="text-gray-800 font-bold">
                {feelsCelsius.toFixed(1)}°C
              </div>
              <div className="text-gray-600">Wind:</div>
              <div className="text-gray-800 font-bold">
                {weatherData.wind.speed} m/s
              </div>
              <div className="text-gray-600">Pressure:</div>
              <div className="text-gray-800 font-bold">
                {weatherData.main.pressure} hPa
              </div>
              <div className="text-gray-600">Humidity:</div>
              <div className="text-gray-800 font-bold">
                {weatherData.main.humidity} %
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className=" border border-gray-600 border-opacity-50 p-4 rounded-lg m-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>{nextDate(1)}</p>
              <WeatherIcon
                weather={multipleWeatherData.list[7].weather[0].main}
              ></WeatherIcon>
              <p>{temperatureCelsius(multipleWeatherData.list[7].main.temp)}</p>
            </div>
            <div
              className="border border-gray-600 border-opacity-50 p-4 rounded-lg m-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>{nextDate(2)}</p>
              <WeatherIcon
                weather={multipleWeatherData.list[15].weather[0].main}
              ></WeatherIcon>
              <p>
                {temperatureCelsius(multipleWeatherData.list[15].main.temp)}
              </p>
            </div>
            <div
              className="border border-gray-600 border-opacity-50 p-4 rounded-lg m-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>{nextDate(3)}</p>
              <WeatherIcon
                weather={multipleWeatherData.list[23].weather[0].main}
              ></WeatherIcon>
              <p>
                {temperatureCelsius(multipleWeatherData.list[23].main.temp)}
              </p>
            </div>
            <div
              className="border border-gray-600 border-opacity-50 p-4 rounded-lg m-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>{nextDate(4)}</p>
              <WeatherIcon
                weather={multipleWeatherData.list[31].weather[0].main}
              ></WeatherIcon>
              <p>
                {temperatureCelsius(multipleWeatherData.list[31].main.temp)}
              </p>
            </div>
            <div
              className="border border-gray-600 border-opacity-50 p-4 rounded-lg m-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>{nextDate(5)}</p>
              <WeatherIcon
                weather={multipleWeatherData.list[39].weather[0].main}
              ></WeatherIcon>
              <p>
                {temperatureCelsius(multipleWeatherData.list[39].main.temp)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
