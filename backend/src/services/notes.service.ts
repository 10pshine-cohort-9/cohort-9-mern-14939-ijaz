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
