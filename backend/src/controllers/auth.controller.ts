import { Request, Response } from "express";
import * as AuthService from "../services/userService";
import { findAppUser } from "../services/findAppUserService";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
      return;
    }

    const keyHeader = req.headers["x-nirva-key"];

    // Ensure it's a string
    if (!keyHeader) {
      res.status(401).json({ success: false, message: "Missing API key" });
      return;
    }

    const key = Array.isArray(keyHeader) ? keyHeader[0] : keyHeader;

    const AppUser = await findAppUser(key);

    const user = await AuthService.register(email, password, name, AppUser);

    // Strip sensitive fields
    // const { password: _, ...safeUser } = user;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error: any) {
    console.error("Register error:", error);

    if (error.message === "User already registered") {
      res.status(409).json({
        success: false,
        message: "User already registered. Please log in.",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong during registration",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const key = req.headers["x-nirva-key"];
    console.log(key);

    const token = await AuthService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ token, message: "Successfully logged in", success: true });
  } catch (error: any) {
    console.error(error);

    if (error.message === "Invalid credentials") {
      res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
      return;
    }

    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out" });
};
