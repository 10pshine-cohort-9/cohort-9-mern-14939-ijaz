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
