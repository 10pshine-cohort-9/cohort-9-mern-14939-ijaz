import { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/user.service";
import {
  LoginUserInput,
  RegisterUserInput,
} from "../validators/user.validator";

const isProduction = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  maxAge: 15 * 60 * 1000,
};

export const handleUserRegister = async (
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
  res.cookie("token", token, COOKIE_OPTIONS);
  return res.sendResponse(200, {
    success: true,
    message: "User logged in successfully",
    data: { user },
  });
};

export const handleGetMe = async (req: Request, res: Response) => {
  const user = await getCurrentUser(req.user!.id);
  return res.sendResponse(200, {
    success: true,
    message: "Current user fetched successfully",
    data: { user },
  });
};

export const handleUserLogout = async (_req: Request, res: Response) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  return res.sendResponse(200, {
    success: true,
    message: "Logged out successfully",
    data: null,
  });
};
