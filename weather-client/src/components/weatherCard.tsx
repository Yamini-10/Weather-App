import type { WeatherResponse } from "../types/weather";

interface WeatherCardProps {
  weather: WeatherResponse;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].main}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}
