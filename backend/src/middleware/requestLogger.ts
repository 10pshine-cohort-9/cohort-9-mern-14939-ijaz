/**
 * Request logger middleware using pino-http.
 * - Uses shared logger singleton from src/logger/index.ts
 * - Correlates logs with request ID from requestIdMiddleware
 * - Auto-logs method, path, status code, and duration
 * - Attaches per-request child logger to req.log
 */
import { pinoHttp } from "pino-http";
import { logger } from "../logger/index.js";
import type { Request, Response } from "express";

export const requestLoggerMiddleware = pinoHttp({
  logger,
  // Use the request ID set by requestIdMiddleware for correlation
  genReqId: (req: Request): string => {
    return req.requestId ?? "";
  },
  // Custom log level for successful responses
  customLogLevel: (req: Request, res: Response): string => {
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  // Include response time in logs
  serializers: {
    req: (req: Request) => ({
      method: req.method,
      url: req.url,
      headers: {
        "user-agent": req.headers["user-agent"],
        "x-request-id": req.headers["x-request-id"],
      },
      remoteAddress: req.ip,
      remotePort: req.socket?.remotePort,
    }),
    res: (res: Response) => ({
      statusCode: res.statusCode,
    }),
  },
  autoLogging: {
    // Log all requests including 404s
    ignore: () => false,
  },
});
