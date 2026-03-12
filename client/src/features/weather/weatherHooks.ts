import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchWeather } from "./weatherApi";

type WeatherItem = {
  cityId: number;
  city: string;
  temperatureC: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  comfortScore: number;
  rank: number;
};

type WeatherResponse = {
  success: boolean;
  count: number;
  data: WeatherItem[];
};

export function useWeather() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [weather, setWeather] = useState<WeatherItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError("");

        const token = await getAccessTokenSilently();
        const response = (await fetchWeather(token)) as WeatherResponse;

        setWeather(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load weather");
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      loadWeather();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  return {
    weather,
    loading,
    error,
  };
}
