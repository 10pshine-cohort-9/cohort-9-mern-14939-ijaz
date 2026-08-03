import * as noteRepo from "../repositories/notes.repository";
import logger from "../utils/logger";
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

export const fetchSingleNote = async (noteId: string) => {
  const note = await noteRepo.fetchNote(noteId);
  logger.info(`fetched Note - ${noteId}`);
  return note;
};

export const deleteNote = async (noteId: string) => {
  const note = await noteRepo.deleteNote(noteId);
  logger.info(`Deleted Note - ${noteId}`);
  return note;
};
