import prisma from "../config/db";
import { UpdateNoteInput } from "../validators/notes.validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { AppError } from "../utils/error";
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
    return await prisma.note.create({
      data,
    });
  } catch (err) {
    mapPrismaError(err);
    throw err;
  }
};

export const fetchNotesByUserId = async (userId: string): Promise<Note[]> => {
  try {
    return await prisma.note.findMany({
      where: { userId },
    });
  } catch (err) {
    mapPrismaError(err);
    throw err;
  }
};

export const fetchNote = async (noteId: string): Promise<Note | null> => {
  try {
    return await prisma.note.findUnique({
      where: { id: noteId },
    });
  } catch (err) {
    mapPrismaError(err);
    throw err;
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
    return await prisma.note.delete({
      where: { id: noteId },
    });
  } catch (err) {
    mapPrismaError(err);
    throw err;
  }
};

export const updateNote = async (
  noteId: string,
  data: UpdateNoteInput,
): Promise<Note> => {
  try {
    return await prisma.note.update({
      where: { id: noteId },
      data,
    });
  } catch (err) {
    mapPrismaError(err);
    throw err;
  }
};
