
#  Weather App – Backend

A Node.js backend service that fetches weather data from OpenWeather API, caches responses using Redis, and serves clean, normalized data to the frontend.

## Features
- Fetch current weather by city or coordinates
- 5-day forecast API
- Redis caching for performance
- API response normalization
- Environment-based configuration
- Ready for deployment

## Tech Stack
- Node.js
- Express
- TypeScript
- Axios
- Redis
- dotenv
  
## Environment Variables
Create a `.env` file in the root:
PORT=5000
WEATHER_API_KEY=your_openweather_api_key
REDIS_URL=redis://localhost:6379
