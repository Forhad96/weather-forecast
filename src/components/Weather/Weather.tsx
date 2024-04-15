'use client'
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import WeatherDetails from "./WeatherDetails";

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
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

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData>({}as WeatherData);
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

const fetchWeather = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  } catch (error) {
    console.error(error);
    alert(
      "Sorry, there was an issue getting the weather data. Please try again."
    );
  } finally {
    setCity("");
    setLoading(false);
  }
};
console.log(weather);
  if (loading) {
    return <h1>Loading....</h1>;
  } else {
      console.log(weather);
    return (
      <>
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[1]" />
        {/* Background image */}
        <Image
          src="https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          layout="fill"
          alt="background Image"
          className="object-cover"
        />

        {/* Search */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <input
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none text-2xl"
              type="text"
              placeholder="Search city"
            />

            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>

        {/* Weather */}
        {weather.main && <WeatherDetails weatherData={weather} />}
      </>
    );
  }
}
