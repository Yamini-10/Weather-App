import axios from "axios";
import type { WeatherResponse } from "../types/weather";

const BASE_URL = "http://localhost:5000/api/weather";

export const getWeatherByCity = async (
  city: string
): Promise<WeatherResponse> => {
  const response = await axios.get<WeatherResponse>(BASE_URL, {
    params: { city },
  });

  return response.data;
};

export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  const response = await axios.get<WeatherResponse>(BASE_URL, {
    params: { lat, lon },
  });

  return response.data;
};

export const getForecastByCity = async (city: string) => {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: { city },
  });
    console.log(res.data, 'forecast')

  return res.data;
};