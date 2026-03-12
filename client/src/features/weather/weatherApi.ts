import { apiClient } from "../../services/apiClient";

export async function fetchWeather(token: string) {
  return apiClient("/api/weather", token);
}

export async function fetchCacheStatus(token: string) {
  return apiClient("/api/cache-status", token);
}
