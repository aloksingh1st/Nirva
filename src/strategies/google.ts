import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateUser } from "../services/userService";
import { findAppUser } from "../services/findAppUserService";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const keyHeader = req.query["x-nirva-key"];

        console.log(keyHeader);
        if (!keyHeader) {
          return done(new Error("Missing API key"), null);
        }

        const key = Array.isArray(keyHeader) ? keyHeader[0] : keyHeader;

        const user = await findOrCreateUser(profile, "google", key);

        done(null, user);
      } catch (err) {
        done(err as Error, null);
      }
    }
  )
);
