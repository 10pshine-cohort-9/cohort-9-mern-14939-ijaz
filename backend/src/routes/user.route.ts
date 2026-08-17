import { Router } from "express";
import { validate } from "../middleware/validate.mw";
import { registerSchema, loginSchema } from "../validators/user.validator";
import { authMiddleware } from "../middleware/auth.mw";
import {
  handleUserRegister,
  handleUserLogin,
  handleGetMe,
  handleUserLogout,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", validate(registerSchema), handleUserRegister);
router.post("/login", validate(loginSchema), handleUserLogin);
router.get("/me", authMiddleware, handleGetMe);
router.post("/logout", handleUserLogout);

export default router;
