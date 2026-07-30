import { Router, type Request, type Response } from "express";

const healthRouter: Router = Router();

interface HealthResponseData {
  status: "ok";
  timestamp: string;
}

healthRouter.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    } satisfies HealthResponseData,
  });
});

export { healthRouter };
