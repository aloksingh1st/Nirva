// src/strategies/github.ts
import { Strategy as GitHubStrategy } from "passport-github2";
import passport from "passport";
import { db } from "../config/db";
import { User } from "../generated/prisma/index";
import { generateToken } from "../services/tokenService";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value || `${profile.username}@github.com`;

        let user: User | null = await db.user.findFirst({
          where: { email },
        });

        if (!user) {
          user = await db.user.create({
            data: {
              name: profile.displayName || profile.username,
              email,
              provider: "github",
              oauthId: profile.id,
            },
          });
        }

        const token = generateToken(user);
        return done(null, { ...user, token });
      } catch (err) {
        return done(err as any);
      }
    }
  )
);
