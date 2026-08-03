import { Router } from "express";
import { validate } from "../middleware/validate.mw";
import { registerSchema, loginSchema } from "../validators/user.validator";
import { register, login } from "../controllers/user.controller";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
