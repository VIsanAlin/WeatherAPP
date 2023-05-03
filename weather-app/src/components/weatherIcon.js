import SunIcon from "./../img/sun.png";
// import SunnyDay from "./../img/sunnyday.jpg";
import CloudyIcon from "./../img/cloudy.png";
import RainyIcon from "./../img/storm.png";
import { useState } from "react";

const WeatherIcon = function (props) {
  const { weather } = props;

  let weatherImage;
  // let weatherBackground;

  if (weather === "Clear") {
    weatherImage = SunIcon;
    // weatherBackground = SunnyDay;
  } else if (weather === "cloudy") {
    weatherImage = CloudyIcon;
  } else if (weather === "rainy") {
    weatherImage = RainyIcon;
  }

  return (
    <div>
      <h1>{weather}</h1>
      <img src={weatherImage} alt={weather} />
    </div>
  );
};
export default WeatherIcon;
