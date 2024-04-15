'use client'
import React, { useEffect, useState } from "react";
import CityTable from "./CityTable";
import CityRow from "./CityRow";
import Image from "next/image";


async function getAllData() {
  const response = await fetch("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20"
  );
  return response.json();
}

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("bangladesh");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "2bda421c0b2cecd4f2dca115bd935d06";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

useEffect(() => {
(async ()=>{
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
})()

}, [url]);
  console.log(weatherData);
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">{"weatherData?.cityName"}</h2>
      <>
        {/* component */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
            <div className="font-bold text-xl">{weatherData?.name}</div>
            <div className="text-sm text-gray-500">Thursday 10 May 2020</div>
            <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
              {/* <svg
                className="w-32 h-32"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg> */}
              <Image
                src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}.png`}
                alt="weather"
                width='100'
                height='100'
              />
            </div>
            <div className="flex flex-row items-center justify-center mt-6">
              <div className="font-medium text-6xl">24°</div>
              <div className="flex flex-col items-center ml-6">
                <>{weatherData?.weather[0]?.description}</>
                <div className="mt-1">
                  <span className="text-sm">
                    <i className="far fa-long-arrow-up" />
                  </span>
                  <span className="text-sm font-light text-gray-500">28°C</span>
                </div>
                <div>
                  <span className="text-sm">
                    <i className="far fa-long-arrow-down" />
                  </span>
                  <span className="text-sm font-light text-gray-500">20°C</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Wind</div>
                <div className="text-sm text-gray-500">9k/h</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Humidity</div>
                <div className="text-sm text-gray-500">
                  {weatherData?.main?.humidity}%
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="font-medium text-sm">Visibility</div>
                <div className="text-sm text-gray-500">
                  {weatherData?.main?.visibility}km
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default WeatherPage;
