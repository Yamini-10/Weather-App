export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

export interface ForecastItem {
  date: string;
  temp: number;
  condition: string;
  icon: string;
}
