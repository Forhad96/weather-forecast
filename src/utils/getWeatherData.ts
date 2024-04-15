import axios from "axios";
import { WeatherData } from "./interface";

export async function fetchWeatherData(
  city: string,
): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  try {
    const response = await axios.get<WeatherData>(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
}
