import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { AppError } from "../utils/error";

export const errorHandlerMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong. Please try again later.";
  let details: unknown;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
    logger.warn({ statusCode, message, details }, "Client Request Warning");
  } else {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const errorStack = err instanceof Error ? err.stack : undefined;
    logger.error(
      { error: errorMessage, stack: errorStack },
      "Unhandled Server Exception",
    );
  }
  res.sendResponse(statusCode, {
    success: false,
    error: message,
    details: details ? details : undefined,
  });
};
