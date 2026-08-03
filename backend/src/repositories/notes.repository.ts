import prisma from "../config/db";
import { UpdateNoteInput } from "../validators/notes.validator";

export const createNote = async (data: {
  title: string;
  content: string;
  userId: string;
}) => {
  return await prisma.note.create({
    data,
  });
};

export const fetchNotesByUserId = async (userId: string) => {
  return await prisma.note.findMany({
    where: { userId },
  });
};

export const fetchNote = async (noteId: string) => {
  return await prisma.note.findUnique({
    where: { id: noteId },
  });
};

export const deleteNote = async (noteId: string) => {
  return await prisma.note.delete({
    where: { id: noteId },
  });
};

export const updateNote = async (noteId: string, data: UpdateNoteInput) => {
  return await prisma.note.update({
    where: { id: noteId },
    data,
  });
};
