import { Request, Response } from "express";
import * as AuthService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = await AuthService.register(email, password, name);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await AuthService.login(email, password);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // or "strict" for CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({ token });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out" });
};
