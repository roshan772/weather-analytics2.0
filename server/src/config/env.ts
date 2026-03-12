import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  auth0Domain: process.env.AUTH0_DOMAIN || "",
  auth0Audience: process.env.AUTH0_AUDIENCE || "",
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY || "",
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS) || 300,
};
