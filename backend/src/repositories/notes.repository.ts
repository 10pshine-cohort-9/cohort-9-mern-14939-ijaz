import prisma from "../config/db";

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
