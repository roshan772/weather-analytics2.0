import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env";

import weatherRoutes from "./routes/weatherRoutes";
import cacheRoutes from "./routes/casheRoutes";

import { checkJwt } from "./middleware/authMiddleware";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { whitelistMiddleware } from "./middleware/whitelistMiddleware";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
  }),
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});
app.use("/api/weather", checkJwt, whitelistMiddleware, weatherRoutes);
app.use("/api/cache-status", checkJwt, whitelistMiddleware, cacheRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
