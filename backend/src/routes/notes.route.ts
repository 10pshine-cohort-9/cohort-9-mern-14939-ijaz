import { Router } from "express";
import { handleCreateNote } from "../controllers/notes.controller";
import { validate } from "../middleware/validate.mw";
import { createNoteSchema } from "../validators/notes.validator";

const router = Router();

router.post("/", validate(createNoteSchema), handleCreateNote);

export default router;
