import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { AppError } from "../utils/error";
import { Prisma } from "../generated/prisma";

export const errorHandlerMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = "Something went wrong. Please try again later.";
  let details: unknown;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
    logger.warn({ statusCode, message, details }, "Client Request Warning");
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        statusCode = 409;
        message = "A record with this value already exists.";
        details = { field: err.meta?.target };
        logger.warn(
          { errorCode: err.code, meta: err.meta },
          "Unique constraint violation",
        );
        break;
      }
      case "P2025": {
        statusCode = 404;
        message = "The requested record was not found.";
        details = { cause: err.meta?.cause };
        logger.warn(
          { errorCode: err.code, meta: err.meta },
          "Record not found",
        );
        break;
      }
      default: {
        logger.error(
          { errorCode: err.code, meta: err.meta },
          "Prisma known request error occurred",
        );
      }
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 503;
    message = "Database connection failed. Please try again later.";
    logger.fatal({ message: err.message }, "Failed to connect to the database");
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
    details,
  });
};
