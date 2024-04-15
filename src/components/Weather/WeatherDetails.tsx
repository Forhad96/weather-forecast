import Image from "next/image";
import React from "react";
interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface WeatherDetailsProps {
  weatherData: WeatherData;
}
const WeatherDetails:React.FC<WeatherDetailsProps> = ({   weatherData }) => {
  console.log(weatherData);
  return (
    <div className="relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10">
      {/* Top */}
      <div className="relative flex justify-between pt-12">
        <div className="flex flex-col items-center">
          <Image
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="/"
            width="100"
            height="100"
          />
          <p className="text-2xl">{weatherData.weather[0].main}</p>
        </div>
        <p className="text-9xl">{weatherData.main.temp.toFixed(0)}&#176;</p>
      </div>
      {/* Bottom */}

      <div className="bg-black/50 relative p-8 rounded-md">
        <p className="text-2xl text-center pb-6">Weather in {weatherData.name}</p>
        <div className="flex justify-between text-center">
          <div>
            <p className="font-bold text-2xl">
              {weatherData.main.feels_like.toFixed(0)}&#176;
            </p>
            <p className="text-xl">Feels Like</p>
          </div>
          <div>
            <p className="font-bold text-2xl">{weatherData.main.humidity}%</p>
            <p className="text-xl">Humidity</p>
          </div>
          <div>
            <p className="font-bold text-2xl">
              {weatherData.wind.speed.toFixed(0)} MPH
            </p>
            <p className="text-xl">Winds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
