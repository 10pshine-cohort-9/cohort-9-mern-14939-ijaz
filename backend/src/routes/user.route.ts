import { Router } from "express";
import { validate } from "../middleware/validate.mw";
import { registerSchema, loginSchema } from "../validators/user.validator";
import {
  handleUserRegister,
  handleUserLogin,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", validate(registerSchema), handleUserRegister);
router.post("/login", validate(loginSchema), handleUserLogin);

export default router;
