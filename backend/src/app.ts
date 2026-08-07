import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/index";
import responseMiddleware from "./middleware/response.mw";
import loggerMiddleware from "./middleware/logger.mw";
import { errorHandlerMiddleware } from "./middleware/errorHandler.mw";
import { AppError } from "./utils/error";

const app = express();

app.use(helmet());
app.use(cors());
app.use(responseMiddleware);
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api", router);

app.use((req, _res, next) => {
  next(new AppError(404, `Route ${req.method} ${req.path} not found`));
});
app.use(errorHandlerMiddleware);

export default app;
