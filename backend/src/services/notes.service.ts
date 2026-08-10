import * as noteRepo from "../repositories/notes.repository";
import logger from "../utils/logger";
import { UpdateNoteInput } from "../validators/notes.validator";
import { AppError } from "../utils/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { Note } from "../generated/prisma";

const mapPrismaError = (err: unknown): never => {
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        throw new AppError(409, "A record with this value already exists.", {
          field: err.meta?.target,
        });
      }
      case "P2025": {
        throw new AppError(404, "The requested record was not found.", {
          cause: err.meta?.cause,
        });
      }
    }
  }
  throw err;
};

export const createNote = async (data: {
  title: string;
  content: string;
  userId: string;
}): Promise<Note> => {
  try {
    const createdNote = await noteRepo.createNote(data);
    logger.info(`Note created with ID: ${createdNote.id}`);
    return createdNote;
  } catch (err) {
    if (err instanceof AppError) throw err;
    mapPrismaError(err);
    throw err;
  }
};

export const fetchNotes = async (userId: string): Promise<Note[]> => {
  try {
    const notes = await noteRepo.fetchNotesByUserId(userId);
    logger.info(`Fetched ${notes.length} notes for user ID: ${userId}`);
    return notes;
  } catch (err) {
    if (err instanceof AppError) throw err;
    mapPrismaError(err);
    throw err;
  }
};

export const fetchSingleNote = async (
  noteId: string,
  userId: string,
): Promise<Note> => {
  try {
    const note = await noteRepo.fetchNote(noteId);
    if (!note) {
      throw new AppError(404, "Note not found");
    }
    if (note.userId !== userId) {
      throw new AppError(403, "You do not have access to this note");
    }
    logger.info(`fetched Note - ${noteId}`);
    return note;
  } catch (err) {
    if (err instanceof AppError) throw err;
    mapPrismaError(err);
    throw err;
  }
};

export const deleteNote = async (
  noteId: string,
  userId: string,
): Promise<Note> => {
  try {
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
  } catch (err) {
    if (err instanceof AppError) throw err;
    mapPrismaError(err);
    throw err;
  }
};

export const updateNote = async (
  noteId: string,
  data: UpdateNoteInput,
  userId: string,
): Promise<Note> => {
  try {
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
  } catch (err) {
    if (err instanceof AppError) throw err;
    mapPrismaError(err);
    throw err;
  }
};
