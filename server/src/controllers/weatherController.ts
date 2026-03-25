import { Request, Response, NextFunction } from "express";
import { getRankedWeather } from "../services/weatherService";
//handle weather api
export async function getWeather(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = await getRankedWeather();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
}
