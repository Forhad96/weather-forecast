import React, { useEffect, useState } from "react";
import { FaTemperatureHigh } from "react-icons/fa";
import toast from "react-hot-toast";

import {
  getFarenhiteToCelcius,
  millisecondsToTime,
} from "@/actions/getdata/getData";

const LiveWeather = () => {
  const [temp, setTemp] = useState(null);
  const [userLocation, setUserLocation] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [error, setError] = useState("");

  const getUsersCurrentLocation = async (lat, long) => {
    const query = `${lat},${long}`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      setTemp(getFarenhiteToCelcius(data.main.temp));
      setUserLocation(`${data.name}, ${data.sys.country}`);
      setSunrise(millisecondsToTime(data.sys.sunrise * 1000));
    } catch (error) {
      setError("Invalid API request");
      toast(`${error} Invalid API request`, {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    // Get user's current location coordinates
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getUsersCurrentLocation(latitude, longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      {temp && (
        <div className="flex gap-5 w-full justify-end items-center">
          <span className="text-black text-sm md:text-base font-bold">
            {userLocation}
          </span>
          <div className="text-black text-sm md:text-base font-bold flex items-center gap-1">
            <FaTemperatureHigh color="#4bd" /> {temp}{" "}
            <span>
              <sup>0</sup>C
            </span>
          </div>
          <div className="items-center gap-1 hidden sm:flex capitalize">
            <span className="hidden sm:block">sunrise:</span> {sunrise}
          </div>
        </div>
      )}
    </>
  );
};

export default LiveWeather;
