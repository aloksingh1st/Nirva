import { Request, Response } from "express";
import * as AuthService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
    }

    const user = await AuthService.register(email, password, name);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    console.error("Register error:", error);

    if (error.message === "User already registered") {
      return res.status(409).json({
        success: false,
        message: "User already registered. Please log in.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong during registration",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or "strict" for CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res
      .status(200)
      .json({ token, message: "Successfully logged in", success: true });
  } catch (error: any) {
    console.error(error);

    if (error.message === "Invalid credentials") {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    if (error.message === "User not found") {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
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
