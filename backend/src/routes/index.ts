import { Router } from "express";
import healthRouter from "./health.route";
import userRouter from "./user.route";

const router = Router();

router.use("/health", healthRouter);
router.use("/user", userRouter);

export default router;
