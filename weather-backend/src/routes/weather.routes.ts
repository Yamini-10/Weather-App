import express from "express";
import axios from "axios";
import redisClient from "../redisClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { city, lat, lon } = req.query;

    // Create unique cache key
    const cacheKey = city
        ? `weather:city:${city.toLowerCase()}`
        : `weather:coords:${lat},${lon}`;

    try {
        // Check Redis cache
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        // Fetch from OpenWeatherMap
        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    q: city,
                    lat,
                    lon,
                    units: "metric",
                    appid: process.env.WEATHER_API_KEY,
                },
            }
        );

        // Save to Redis (TTL = 10 minutes)
        await redisClient.setEx(
            cacheKey,
            600,
            JSON.stringify(response.data)
        );

        res.json(response.data);
    } catch (error) {
        console.log("Error on fetching weather data", error)
        res.status(500).json({
            message: "Failed to fetch weather data",
        });
    }
});

export default router;
