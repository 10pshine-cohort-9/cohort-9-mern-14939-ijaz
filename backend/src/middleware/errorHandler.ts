import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client.js";
import { ZodError } from "zod";
import { env } from "../config/env.js";

/**
 * Global error handler middleware (4-arg signature).
 * Must be registered last in app.ts, after all routes and notFoundHandler.
 */
export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  const requestId = req.requestId ?? req.id;
  const isDevelopment = env.NODE_ENV === "development";

  // Operational errors (ApiError instances) - log at warn level
  if (err instanceof ApiError) {
    req.log.warn(
      {
        err: {
          code: err.code,
          message: err.message,
          statusCode: err.statusCode,
          details: err.details,
        },
        requestId,
      },
      "Operational error",
    );

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
        ...(requestId !== undefined ? { requestId } : {}),
      },
    });
    return;
  }

  // Prisma known request errors
  if (err instanceof PrismaClientKnownRequestError) {
    const { statusCode, code, message } = mapPrismaError(err, isDevelopment);

    req.log.warn(
      {
        err: { code: err.code, message: err.message, meta: err.meta },
        requestId,
        statusCode,
        code,
      },
      "Prisma error",
    );

    res.status(statusCode).json({
      success: false,
      error: {
        code,
        message,
        ...(requestId !== undefined ? { requestId } : {}),
      },
    });
    return;
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    const details = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    req.log.warn({ err: { issues: err.issues }, requestId }, "Validation error");

    res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details,
        ...(requestId !== undefined ? { requestId } : {}),
      },
    });
    return;
  }

  // Unknown/programmer errors - log full stack at error level
  const errorMessage = err instanceof Error ? err.message : "Unknown error";
  const errorStack = err instanceof Error ? err.stack : undefined;

  req.log.error(
    { err: { message: errorMessage, stack: errorStack }, requestId },
    "Unexpected error",
  );

  // In production, never leak error details
  const message = isDevelopment && err instanceof Error ? err.message : "Something went wrong";

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message,
      ...(requestId !== undefined ? { requestId } : {}),
      // Never include details/stack in production
      ...(isDevelopment && err instanceof Error ? { details: errorStack } : {}),
    },
  });
};

/**
 * Maps Prisma error codes to HTTP status codes and error codes.
 */
function mapPrismaError(
  err: PrismaClientKnownRequestError,
  isDevelopment: boolean,
): { statusCode: number; code: string; message: string } {
  switch (err.code) {
    case "P2002": {
      // Unique constraint violation
      const target = err.meta?.target as string[] | undefined;
      return {
        statusCode: 409,
        code: "CONFLICT",
        message: target
          ? `Unique constraint failed on: ${target.join(", ")}`
          : "Unique constraint violation",
      };
    }
    case "P2025": {
      // Record not found
      return {
        statusCode: 404,
        code: "NOT_FOUND",
        message: "Record not found",
      };
    }
    default: {
      return {
        statusCode: 500,
        code: "INTERNAL_ERROR",
        message: isDevelopment ? err.message : "Database error",
      };
    }
  }
}
