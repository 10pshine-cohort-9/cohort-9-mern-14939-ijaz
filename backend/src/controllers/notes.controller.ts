import { Request, Response } from "express";
import { CreateNoteInput } from "../validators/notes.validator";
import * as noteService from "../services/notes.service";

export const handleCreateNote = async (
  req: Request<{}, {}, CreateNoteInput>,
  res: Response,
) => {
  const createdNote = await noteService.createNote({
    title: req.body.title,
    content: req.body.content,
    userId: req.user?.id as string,
  });
  res.sendResponse(201, {
    success: true,
    message: "Note created successfully",
    data: createdNote,
  });
};

export const handleFetchNotes = async (req: Request, res: Response) => {
  const notes = await noteService.fetchNotes(req.user?.id as string);
  res.sendResponse(200, {
    success: true,
    message: "Notes fetched successfully",
    data: notes,
  });
};

export const handleFetchSingleNote = async (req: Request, res: Response) => {
  const NoteId = req.params.id as string;
  const note = await noteService.fetchSingleNote(NoteId);
  res.sendResponse(200, {
    success: true,
    message: "Note fetch Successfully",
    data: note,
  });
};
