import { Request, Response } from "express";
import { getCacheKeys } from "../services/casheService";

export function getCacheStatus(_req: Request, res: Response): void {
  const keys = getCacheKeys();

  res.status(200).json({
    success: true,
    count: keys.length,
    keys,
  });
}
