import React from "react";

const Weather = ({
  coord,
  weather,
  base,
  main,
  visibility,
  wind,
  clouds,
  dt,
  sys,
  timezone,
  name,
  cod,
}) => {
  const { lon, lat } = coord;
  const { temp, feels_like, temp_min, temp_max, pressure, humidity } = main;
  const { speed, deg, gust } = wind;
  const { all } = clouds;
  const { type, id, country, sunrise, sunset } = sys;

  const weatherDescription = weather[0].description;
  const iconUrl = `https://openweathermap.org/img/w/${weather[0].icon}.png`;

  return (
    <div>
      <h2>{name}</h2>
      <p>
        Coordinates: {lon}, {lat}
      </p>
      <p>Weather: {weatherDescription}</p>
      <img src={iconUrl} alt="Weather Icon" />
      <p>Temperature: {temp.toFixed(1)}°C</p>
      <p>Feels Like: {feels_like.toFixed(1)}°C</p>
      <p>Min Temperature: {temp_min.toFixed(1)}°C</p>
      <p>Max Temperature: {temp_max.toFixed(1)}°C</p>
      <p>Pressure: {pressure} hPa</p>
      <p>Humidity: {humidity}%</p>
      <p>Visibility: {visibility / 1000} km</p>
      <p>Wind Speed: {speed.toFixed(1)} m/s</p>
      <p>Wind Direction: {deg}°</p>
      <p>Wind Gust: {gust.toFixed(1)} m/s</p>
      <p>Cloud Cover: {all}%</p>
      <p>Sunrise: {new Date(sunrise * 1000).toLocaleTimeString()}</p>
      <p>Sunset: {new Date(sunset * 1000).toLocaleTimeString()}</p>
      <p>Country: {country}</p>
    </div>
  );
};

export default Weather;
const [city, setCity] = useState("");
const [weather, setWeather] = useState({});
const [loading, setLoading] = useState(false);

const url = "https://api.openweathermap.org/data/2.5/weather?q=dubai";

const fetchWeather = (e) => {
  e.preventDefault();
  setLoading(true);
  axios.get(url).then((response) => {
    setWeather(response.data);
    console.log(response.data);
    setCity("");
    setLoading(false);
  });
};
