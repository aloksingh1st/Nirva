import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateUser } from "../services/userService";
import { findAppUser } from "../services/findAppUserService";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const keyParam = req.query.state;
        const key = keyParam ? decodeURIComponent(keyParam.toString()) : null;

        if (!key) {
          return done(new Error("Missing API key"), null);
        }

        const user = await findOrCreateUser(profile, "google", key);
        done(null, user);
      } catch (err) {
        console.error("OAuth error:", err);
        done(err as Error, null);
      }
    }
  )
);
