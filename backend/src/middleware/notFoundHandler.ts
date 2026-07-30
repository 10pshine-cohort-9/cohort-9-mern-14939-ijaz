import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";

/**
 * Catch-all handler for undefined routes.
 * Must be mounted after all real routes but before the error handler.
 * Forwards to the global error handler via next(ApiError.notFound(...))
 * so the response uses the standard error envelope.
 */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(ApiError.notFound(`Route ${req.method} ${req.path} not found`));
}
