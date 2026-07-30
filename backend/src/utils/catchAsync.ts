import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Higher-order function that wraps an async route handler,
 * catches any rejected promise, and forwards it to Express's error handler via next(err).
 *
 * Preserves full TypeScript typing for req, res, next including generics
 * for typed request bodies, params, query, etc.
 */
export function catchAsync<TReq extends Request = Request, TRes extends Response = Response>(
  handler: (req: TReq, res: TRes, next: NextFunction) => Promise<unknown>,
): RequestHandler {
  return (req, res, next): void => {
    Promise.resolve(handler(req as TReq, res as TRes, next)).catch(next);
  };
}
