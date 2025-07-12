import { db } from "../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "./tokenService";

interface OAuthProfile {
  id: string;
  displayName: string;
  emails?: { value: string; verified?: boolean }[];
  provider: string;
}

// 🟢 For Google/GitHub OAuth
export const findOrCreateUser = async (
  profile: OAuthProfile,
  provider: string
) => {
  const email = profile.emails?.[0]?.value;

  let user = await db.user.findUnique({
    where: { oauthId: profile.id },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        name: profile.displayName,
        email,
        oauthId: profile.id,
        provider,
      },
    });
  }

  return user;
};

// 🟢 For Local Registration
export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      provider: "local",
    },
  });
  return { id: user.id, email: user.email };
};

// 🟢 For Local Login
export const login = async (email: string, password: string) => {
  const user = await db.user.findUnique({ where: { email } });

  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return generateToken(user);
};
