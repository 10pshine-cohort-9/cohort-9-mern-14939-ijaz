import { Router } from "express";
import {
  handleCreateNote,
  handleFetchNotes,
} from "../controllers/notes.controller";
import { validate } from "../middleware/validate.mw";
import { createNoteSchema } from "../validators/notes.validator";

const router = Router();

router.post("/", validate(createNoteSchema), handleCreateNote);
router.get("/", handleFetchNotes);

export default router;
