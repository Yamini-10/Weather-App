import { useState } from "react";
import {
  getWeatherByCity,
  getWeatherByCoords,
} from "../api/weatherApi";
import type { WeatherResponse } from "../types/weather";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (city: string): Promise<void> => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = (): void => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch {
          setError("Unable to fetch location weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Location permission denied");
      }
    );
  };

  return {
    weather,
    loading,
    error,
    fetchWeather,
    fetchWeatherByLocation,
  };
}
