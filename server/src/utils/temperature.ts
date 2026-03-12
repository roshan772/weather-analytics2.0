export function kelvinToCelsius(kelvin: number): number {
  return Number((kelvin - 273.15).toFixed(1));
}
//We use this because OpenWeather returns temperature in Kelvin by default.