import jwt from "jsonwebtoken";
import {User} from '../generated/prisma/index'

export const generateToken = (user: User): String => {

  const payload = {
    id: user.id,
    email: user.email,
    provider: user.provider,
    name: user.name,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};
