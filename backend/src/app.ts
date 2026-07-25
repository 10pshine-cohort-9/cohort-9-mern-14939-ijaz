import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { healthRouter } from "./routes/health.route.js";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", healthRouter);

export { app };
