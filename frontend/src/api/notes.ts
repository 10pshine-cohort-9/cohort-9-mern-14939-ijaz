import client from "./client";
import { toApiError } from "./apiError";

export async function fetchNotes() {
  try {
    const response = await client.get("/notes");
    return response.data;
  } catch (err) {
    throw toApiError(err);
  }
}
