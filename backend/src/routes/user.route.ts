import { Router } from "express";
import { validate } from "../middleware/validate.mw";
import { registerSchema } from "../validators/user.validator";
import { register } from "../controllers/user.controller";

const router = Router();

router.post("/register", validate(registerSchema), register);

export default router;
