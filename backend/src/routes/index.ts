import { Router } from "express";
import healthRouter from "./health.route";
import userRouter from "./user.route";
import notesRouter from "./notes.route";
import { authMiddleware } from "../middleware/auth.mw";

const router = Router();

router.use("/health", healthRouter);
router.use("/user", userRouter);
router.use(authMiddleware);
router.use("/notes", notesRouter);

export default router;
