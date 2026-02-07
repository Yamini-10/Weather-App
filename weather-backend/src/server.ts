import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";
import forecastRoutes from "./routes/forecast.routes";

console.log("API KEY CHECK:", process.env.WEATHER_API_KEY);

const app = express();

app.use(cors());

app.use("/api/weather/forecast", forecastRoutes);
app.use("/api/weather", weatherRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
