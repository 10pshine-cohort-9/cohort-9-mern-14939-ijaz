import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import AppRouter from "./routes/index";
import responseMiddleware from "./middleware/response.mw";
import loggerMiddleware from "./middleware/logger.mw";
import { errorHandlerMiddleware } from "./middleware/errorHandler.mw";
import { AppError } from "./utils/error";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(responseMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

app.use("/api", AppRouter);

app.use((req, _res, next) => {
  next(new AppError(404, `Route ${req.method} ${req.path} not found`));
});
app.use(errorHandlerMiddleware);

export default app;
