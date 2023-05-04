import React, { useState, useEffect } from "react";
import WeatherIcon from "./weatherIcon";

const MultipleWeather = () => {
  const [multipleWeatherData, setMultipleWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=44.4323&lon=26.1063&appid=9ed4d0eab80ab31d905bafb34edf87da"
      );

      const data = await response.json();

      console.log(data);
      setMultipleWeatherData(data);
    };
    fetchData();
  }, []);

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

  return (
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
        <p>{temperatureCelsius(multipleWeatherData.list[15].main.temp)}</p>
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
        <p>{temperatureCelsius(multipleWeatherData.list[23].main.temp)}</p>
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
        <p>{temperatureCelsius(multipleWeatherData.list[31].main.temp)}</p>
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
        <p>{temperatureCelsius(multipleWeatherData.list[39].main.temp)}</p>
      </div>
    </div>
  );
};

export default MultipleWeather;
