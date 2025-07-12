import { Router } from "express";
import passport from "passport";
import { generateToken } from "../services/tokenService";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    // @ts-ignore: Passport adds `user` to the request object
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth Callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/", // redirect on error
  }),
  (req, res) => {
    // @ts-ignore
    const token = req.user.token;

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  }
);

export default router;
