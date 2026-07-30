import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { healthRouter } from "./routes/health.route.js";
import { requestIdMiddleware } from "./middleware/requestId.js";
import { requestLoggerMiddleware } from "./middleware/requestLogger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app: Application = express();

app.use(helmet());
app.use(cors());
// Request ID must come before request logger so the ID exists for correlation
app.use(requestIdMiddleware);
app.use(requestLoggerMiddleware);
app.use(express.json());

// Routes
app.use("/api/v1", healthRouter);

// 404 handler for undefined routes - must be after all routes
app.use(notFoundHandler);

// Global error handler - must be last (4-arg middleware)
app.use(errorHandler);

export { app };
