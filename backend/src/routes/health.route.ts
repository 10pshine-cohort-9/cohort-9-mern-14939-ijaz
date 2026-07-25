import { Router, type Request, type Response } from "express";

const healthRouter: Router = Router();

interface HealthResponseBody {
  status: "ok";
  timestamp: string;
}

healthRouter.get("/health", (_req: Request, res: Response<HealthResponseBody>) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export { healthRouter };
