import { Router } from "express";
import {
  handleCreateNote,
  handleFetchNotes,
  handleFetchSingleNote,
  handleDeleteNote,
} from "../controllers/notes.controller";
import { validate } from "../middleware/validate.mw";
import { createNoteSchema } from "../validators/notes.validator";

const router = Router();

router.post("/", validate(createNoteSchema), handleCreateNote);
router.get("/", handleFetchNotes);
router.get("/:id", handleFetchSingleNote);
router.delete("/:id", handleDeleteNote);

export default router;
