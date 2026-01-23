import { useEffect, useState } from "react";
import weatherService from "../services/weather.js";

const Weather = ({ location }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    weatherService.getWeather({ location }).then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <div>
      <div>
        Temperature: {data?.main.temp} ºC
        <br />
        <img
          src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
          alt="Weather icon"
        />
        <br />
        {data?.weather[0].description}
      </div>
      <p>
        Wind: {data?.wind.speed} m/s - Direction: {data?.wind.deg} degrees
      </p>
    </div>
  );
};

export default Weather;
