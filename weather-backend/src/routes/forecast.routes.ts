import express from "express";
import axios from "axios";
import redisClient from "../redisClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { city } = req.query;

  if (!city || typeof city !== "string") {
    return res.status(400).json({ message: "City is required" });
  }

  const safeCity = city.trim().toLowerCase();
  const cacheKey = `forecast:city:${safeCity}`;

  try {
    // Redis cache check
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log("Forecast Cache HIT");
      return res.json(JSON.parse(cached));
    }

    console.log("Forecast Cache MISS");

    // Fetch forecast
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          units: "metric",
          appid: process.env.WEATHER_API_KEY,
        },
      }
    );

    // Normalize → 1 entry per day
    const dailyForecast = response.data.list
      .filter((_: any, index: number) => index % 8 === 0)
      .slice(0, 5)
      .map((item: any) => ({
        date: item.dt_txt.split(" ")[0],
        temp: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
      }));

    // Cache for 30 minutes
    await redisClient.setEx(
      cacheKey,
      1800,
      JSON.stringify(dailyForecast)
    );

    res.json(dailyForecast);
  } catch (error: any) {
    console.error("Forecast error:", error.message);
    res.status(500).json({ message: "Failed to fetch forecast" });
  }
});

export default router;
