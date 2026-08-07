import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { AppError } from "../utils/error";

export const validate = (schema: ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      let detail = result.error.issues.map((issue) => {
        return {
          field: issue.path.join("."),
          message: issue.message,
        };
      });
      logger.warn({ detail }, "validation failed");
      return next(new AppError(400, "Validation failed", detail));
    }

    req.body = result.data;
    next();
  };
};
