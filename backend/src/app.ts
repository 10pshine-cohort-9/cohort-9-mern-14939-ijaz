import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { healthRouter } from "./routes/health.route.js";
import { requestIdMiddleware } from "./middleware/requestId.js";
import { requestLoggerMiddleware } from "./middleware/requestLogger.js";

const app: Application = express();

app.use(helmet());
app.use(cors());
// Request ID must come before request logger so the ID exists for correlation
app.use(requestIdMiddleware);
app.use(requestLoggerMiddleware);
app.use(express.json());

// Routes
app.use("/api/v1", healthRouter);

export { app };
