
import axios from "axios";
import { env } from "../config/env";
import { getCities } from "./cityService";
import { calculateComfortScore } from "./comfortScoreService";
import { rankWeatherData } from "./rankingService";
import { getCache, setCache } from "./casheService";
import { CACHE_KEYS, DEFAULT_CACHE_TTL_SECONDS } from "../config/constants";
import { WeatherData } from "../types/weather";
import { kelvinToCelsius } from "../utils/temperature";

type OpenWeatherResponse = {
  id: number
  name: string
  main: {
    temp: number
    humidity: number
  }
  wind?: {
    speed?: number
  }
  clouds?: {
    all?: number
  }
  weather?: Array<{
    main?: string
    description?: string
  }>
}

export async function getRankedWeather(): Promise<WeatherData[]> {
  const cached = getCache<WeatherData[]>(CACHE_KEYS.WEATHER_ALL_CITIES);

  if (cached) {
    return cached;
  }
  if (!env.openWeatherApiKey) {
    throw new Error("OPENWEATHER_API_KEY is missing in environment variables");
  }

  const cities = getCities();
  const weatherResults: WeatherData[] = [];

  for (const city of cities) {
    const response = await axios.get<OpenWeatherResponse>(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          id: city.id,
          appid: env.openWeatherApiKey,
        },
      },
    );

    const weather = response.data;
    const comfortScore = calculateComfortScore(weather);

    weatherResults.push({
      cityId: weather.id,
      city: weather.name,
      temperatureC: kelvinToCelsius(weather.main.temp),
      humidity: weather.main.humidity,
      windSpeed: weather.wind?.speed ?? 0,
      condition: weather.weather?.[0]?.main ?? "Unknown",
      description: weather.weather?.[0]?.description ?? "No description",
      comfortScore,
    });
  }

  const ranked = rankWeatherData(weatherResults);

  setCache(CACHE_KEYS.WEATHER_ALL_CITIES, ranked, DEFAULT_CACHE_TTL_SECONDS);

  return ranked;
}