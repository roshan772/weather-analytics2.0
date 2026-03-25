import { kelvinToCelsius } from "../utils/temperature";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateComfortScore(weather: any): number {
  const tempC = kelvinToCelsius(weather.main.temp);
  const humidity = weather.main.humidity ?? 0;
  const windSpeed = weather.wind?.speed ?? 0;
  const clouds = weather.clouds?.all ?? 0;

  const tempScore = 100 - Math.abs(tempC - 22) * 4; //
  const humidityScore = 100 - Math.abs(humidity - 50) * 1.2;
  const windScore = 100 - Math.abs(windSpeed - 3) * 12;
  const cloudScore = 100 - Math.abs(clouds - 30) * 0.5;

  const score =
    tempScore * 0.4 +
    humidityScore * 0.25 +
    windScore * 0.2 +
    cloudScore * 0.15;

  return clamp(Math.round(score), 0, 100); //87.05 → 87
}
//calculate wheather comport score