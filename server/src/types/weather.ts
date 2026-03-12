export interface WeatherData {
  cityId: number;
  city: string;
  temperatureC: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  comfortScore: number;
  rank?: number;
}
