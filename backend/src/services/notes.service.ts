import * as noteRepo from "../repositories/notes.repository";
import logger from "../utils/logger";
import { UpdateNoteInput } from "../validators/notes.validator";
import { AppError } from "../utils/error";

export const createNote = async (data: {
  title: string;
  content: string;
  userId: string;
}) => {
  const createdNote = await noteRepo.createNote(data);
  logger.info(`Note created with ID: ${createdNote.id}`);
  return createdNote;
};

export const fetchNotes = async (userId: string) => {
  const notes = await noteRepo.fetchNotesByUserId(userId);
  logger.info(`Fetched ${notes.length} notes for user ID: ${userId}`);
  return notes;
};

export const fetchSingleNote = async (noteId: string, userId: string) => {
  const note = await noteRepo.fetchNote(noteId);
  if (!note) {
    throw new AppError(404, "Note not found");
  }
  if (note.userId !== userId) {
    throw new AppError(403, "You do not have access to this note");
  }
  logger.info(`fetched Note - ${noteId}`);
  return note;
};

export const deleteNote = async (noteId: string, userId: string) => {
  const note = await noteRepo.fetchNote(noteId);
  if (!note) {
    throw new AppError(404, "Note not found");
  }
  if (note.userId !== userId) {
    throw new AppError(403, "You do not have access to this note");
  }
  const deletedNote = await noteRepo.deleteNote(noteId);
  logger.info(`Deleted Note - ${noteId}`);
  return deletedNote;
};

export const updateNote = async (
  noteId: string,
  data: UpdateNoteInput,
  userId: string,
) => {
  const note = await noteRepo.fetchNote(noteId);
  if (!note) {
    throw new AppError(404, "Note not found");
  }
  if (note.userId !== userId) {
    throw new AppError(403, "You do not have access to this note");
  }
  const updatedNote = await noteRepo.updateNote(noteId, data);
  logger.info(`Updated Note - ${noteId}`);
  return updatedNote;
};
