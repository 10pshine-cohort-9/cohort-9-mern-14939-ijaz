import { RequestHandler, Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const loggerMiddleware: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  logger.info(
    { method: req.method, url: req.url },
    "Incoming request",
  );
  next();
};

export default loggerMiddleware;
