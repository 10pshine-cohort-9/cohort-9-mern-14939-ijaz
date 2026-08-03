import { Router } from "express";
import {
  handleCreateNote,
  handleFetchNotes,
  handleFetchSingleNote,
  handleDeleteNote,
  handleUpdateNote,
} from "../controllers/notes.controller";
import { validate } from "../middleware/validate.mw";
import {
  createNoteSchema,
  updateNoteSchema,
} from "../validators/notes.validator";

const router = Router();

router.post("/", validate(createNoteSchema), handleCreateNote);
router.get("/", handleFetchNotes);
router.get("/:id", handleFetchSingleNote);
router.delete("/:id", handleDeleteNote);
router.patch("/:id", validate(updateNoteSchema), handleUpdateNote);

export default router;
