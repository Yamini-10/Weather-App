import { useState } from "react";
import toast from "react-hot-toast";
import SearchBar from "../components/searchBar";
import Forecast from "../components/foreCast";
import styles from "./Home.module.css";
import { getWeatherByCity, getForecastByCity } from "../api/weatherApi";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      toast.error("Enter a city name");
      return;
    }

    setWeather(null);
    setForecast([]);

    try {
      setLoading(true);
      const weatherData = await getWeatherByCity(city);
      const forecastData = await getForecastByCity(city);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch {
      toast.error("City not found or API error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* App Title */}
      <h1 className={styles.title}>Weather App</h1>

      <SearchBar
        city={city}
        onCityChange={setCity}
        onSearch={handleSearch}
        disabled={loading}
      />

      {weather && (
        <div className={styles.card}>
          <p className={styles.city}>{weather.name}</p>
          <p className={styles.temp}>{weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}

      {forecast.length > 0 && <Forecast forecast={forecast} />}
    </div>
  );
}
