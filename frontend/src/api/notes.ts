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

export type NoteResponse = {
  success: boolean;
  message: string;
  data: Note;
};

export async function fetchNotes(): Promise<NotesResponse> {
  try {
    const response = await client.get<NotesResponse>("/notes");
    return response.data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function fetchSingleNote(id: string): Promise<NoteResponse> {
  try {
    const response = await client.get<NoteResponse>(`/notes/${id}`);
    return response.data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function createNote(
  title: string,
  content: string,
): Promise<NoteResponse> {
  try {
    const response = await client.post<NoteResponse>("/notes", {
      title,
      content,
    });
    return response.data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function updateNote(
  id: string,
  title: string,
  content: string,
): Promise<NoteResponse> {
  try {
    const response = await client.patch<NoteResponse>(`/notes/${id}`, {
      title,
      content,
    });
    return response.data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function deleteNote(id: string): Promise<void> {
  try {
    await client.delete(`/notes/${id}`);
  } catch (err) {
    throw toApiError(err);
  }
}
