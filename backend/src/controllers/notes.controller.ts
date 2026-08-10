import { Request, Response } from "express";
import {
  CreateNoteInput,
  UpdateNoteInput,
} from "../validators/notes.validator";
import * as noteService from "../services/notes.service";
import { AppError } from "../utils/error";

const handleError = (err: unknown, res: Response): void => {
  if (err instanceof AppError) {
    res.sendResponse(err.statusCode, {
      success: false,
      error: err.message,
      details: err.details,
    });
    return;
  }
  throw err;
};

export const handleCreateNote = async (
  req: Request<{}, {}, CreateNoteInput>,
  res: Response,
) => {
  try {
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
  } catch (err) {
    handleError(err, res);
  }
};

export const handleFetchNotes = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.fetchNotes(req.user?.id as string);
    res.sendResponse(200, {
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const handleFetchSingleNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id as string;
    const note = await noteService.fetchSingleNote(noteId, req.user!.id);
    res.sendResponse(200, {
      success: true,
      message: "Note fetch Successfully",
      data: note,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const handleDeleteNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.id as string;
    const note = await noteService.deleteNote(noteId, req.user!.id);
    res.sendResponse(200, {
      success: true,
      message: "Note deleted Successfully",
      data: note,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const handleUpdateNote = async (
  req: Request<{ id: string }, {}, UpdateNoteInput>,
  res: Response,
) => {
  try {
    const noteId = req.params.id;
    const data = req.body;
    const note = await noteService.updateNote(noteId, data, req.user!.id);
    res.sendResponse(200, {
      success: true,
      message: "Note Updated Successfully",
      data: note,
    });
  } catch (err) {
    handleError(err, res);
  }
};
