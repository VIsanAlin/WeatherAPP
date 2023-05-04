import SunIcon from "./../img/sun.png";
// import SunnyDay from "./../img/sunnyday.jpg";
import CloudyIcon from "./../img/cloudy.png";
import RainyIcon from "./../img/storm.png";

const WeatherIcon = function (props) {
  const { weather } = props;

  let weatherImage;
  // let weatherBackground;

  if (weather === "Clear") {
    weatherImage = SunIcon;
  } else if (weather === "Clouds") {
    weatherImage = CloudyIcon;
  } else if (weather === "Rain") {
    weatherImage = RainyIcon;
  }

  return (
    <div>
      <img className="w-12 h-12" src={weatherImage} alt={weather} />
    </div>
  );
};
export default WeatherIcon;
