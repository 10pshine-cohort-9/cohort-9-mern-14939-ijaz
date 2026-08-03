import { Router } from "express";
import { validate } from "../middleware/validate.mw";
import { registerSchema, loginSchema } from "../validators/user.validator";
import {
  handleUserregister,
  handleUserLogin,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", validate(registerSchema), handleUserregister);
router.post("/login", validate(loginSchema), handleUserLogin);

export default router;
