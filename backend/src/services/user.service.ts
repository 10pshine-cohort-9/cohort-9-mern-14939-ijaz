import { findByEmail, createUser } from "../repositories/user.repository";
import { AppError } from "../utils/error";
import logger from "../utils/logger";
import { RegisterUserInput } from "../validators/user.validator";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export const registerUser = async (input: RegisterUserInput) => {
  const existingUser = await findByEmail(input.email);

  if (existingUser) {
    throw new AppError(409, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  let newUser;
  try {
    newUser = await createUser({
      email: input.email,
      passwordHash: hashedPassword,
      username: input.username,
    });
  } catch (err) {
    if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      throw new AppError(409, "User with this email already exists");
    }
    throw err;
  }

  logger.info({ userId: newUser.id }, "New user registered");

  const { passwordHash, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};
