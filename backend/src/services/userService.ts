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

  // console.log(profile);

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

  console.log("USER", user);
  return user;
};

// 🟢 For Local Registration
export const register = async (
  email: string,
  password: string,
  name: string,
  AppUser: string
) => {
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      provider: "local",
      app_id: AppUser,
    },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
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
