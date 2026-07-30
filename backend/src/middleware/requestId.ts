/**
 * Request ID middleware.
 * - Uses incoming x-request-id header if present
 * - Otherwise generates a new UUID via crypto.randomUUID()
 * - Attaches the ID to response header x-request-id for correlation
 */
import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

const REQUEST_ID_HEADER = "x-request-id";

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId = req.headers[REQUEST_ID_HEADER] as string | undefined;

  // Use provided request ID or generate a new UUID
  const id = requestId && requestId.length > 0 ? requestId : randomUUID();

  // Attach to response header for client correlation
  res.setHeader(REQUEST_ID_HEADER, id);

  // Attach to request for downstream middleware/handlers
  req.requestId = id;

  next();
}
