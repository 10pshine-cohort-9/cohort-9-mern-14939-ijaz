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
