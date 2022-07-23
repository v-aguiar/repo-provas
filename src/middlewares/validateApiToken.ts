import { NextFunction, Request, Response } from "express";

import userUtils from "../utils/userUtils.js";

export default function validateApiToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw {
      name: "expiredToken",
      message: "⚠ Invalid or inexistent token...",
    };
  }

  const userId = userUtils.verifyToken(token);
  res.locals.userId = userId;

  next();
}
