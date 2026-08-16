import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";
import { verifyToken } from "../utils/token";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;
  if (!token) {
    return next(new AppError(401, "No token provided"));
  }
  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.sub };
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
};
