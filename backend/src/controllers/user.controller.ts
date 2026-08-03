import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/user.service";
import {
  LoginUserInput,
  RegisterUserInput,
} from "../validators/user.validator";

export const handleUserregister = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
) => {
  const newUser = await registerUser(req.body);
  return res.sendResponse(201, {
    success: true,
    message: "User Created successfully",
    data: newUser,
  });
};

export const handleUserLogin = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
) => {
  const { token, user } = await loginUser(req.body);
  return res.sendResponse(200, {
    success: true,
    message: "User logged in successfully",
    data: { token, user },
  });
};
