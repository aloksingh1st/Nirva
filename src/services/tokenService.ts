import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const generateToken = (user: User): String => {
  const payload = {
    id: user.id,
    email: user.email,
    provider: user.provider,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
