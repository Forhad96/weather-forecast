"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import WeatherDetails from "./WeatherDetails";
import { useSearchParams } from "next/navigation";

import { WeatherData } from "@/utils/interface";
import BackgroundImage from "./BackgroundImage";
import { fetchWeatherData } from "@/utils/getWeatherData";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData>({} as WeatherData);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const search = searchParams.get("city");

  const handleSearch = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
    const weatherData = await fetchWeatherData(
      city,
    );
    setWeather(weatherData);
    } catch (error) {
      console.error(error);
    } finally {
      setCity("");
      setLoading(false);
    }
  };

  useEffect(() => {
    (async() => {
      
    if (search) {
      const weatherData = await fetchWeatherData(search);
      setWeather(weatherData);
    }
    })();

  }, [search,]);
  if (loading) {
    return <h1>Loading....</h1>;
  } else {
    return (
      <>
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[1]" />
        {/* Background image */}
        <BackgroundImage />

        {/* Search */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
          <form
            onSubmit={handleSearch}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <input
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none text-2xl"
              type="text"
              placeholder="Search city"
            />

            <button onClick={handleSearch}>
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
