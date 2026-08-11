import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegisterUserInput = z.infer<typeof registerSchema>;

export const loginSchema = z
  .object({
    email: z.email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  })
  .strict();

export type LoginUserInput = z.infer<typeof loginSchema>;
