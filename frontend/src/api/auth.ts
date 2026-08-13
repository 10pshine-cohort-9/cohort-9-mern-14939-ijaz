import client from "./client";

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const response = await client.post("/user/register", {
    username,
    email,
    password,
  });
  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await client.post("/user/login", { email, password });
  return response.data;
}
