import client from "./client";
import { toApiError } from "./apiError";

export type Note = {
  id: string;
  title: string;
  content: string;
};

export type NotesResponse = {
  success: boolean;
  message: string;
  data: Note[];
};

export async function fetchNotes(): Promise<NotesResponse> {
  try {
    const response = await client.get<NotesResponse>("/notes");
    return response.data;
  } catch (err) {
    throw toApiError(err);
  }
}
