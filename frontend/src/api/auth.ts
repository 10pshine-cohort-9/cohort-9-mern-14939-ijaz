import client from "./client";
import { toApiError } from "./apiError";

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  try {
    const response = await client.post("/user/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw toApiError(err);
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await client.post("/user/login", { email, password });
    return response.data;
  } catch (err) {
    throw toApiError(err);
  }
}
