import { WeatherData } from "../types/weather";

export function rankWeatherData(items: WeatherData[]): WeatherData[] {
  return [...items]
    .sort((a, b) => b.comfortScore - a.comfortScore)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
}
//sort results and adds rank