import { Request, Response, NextFunction } from "express";

const allowedUsers = ["careers@fidenz.com"];

export function whitelistMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const payload = (req as any).auth?.payload;

  console.log("AUTH PAYLOAD:", payload);

  const email = payload?.["https://weather-api/email"] || "";

  console.log("RESOLVED EMAIL:", email);

  if (!allowedUsers.includes(email)) {
    return res.status(403).json({
      success: false,
      message: "User not authorized",
    });
  }

  next();
}
