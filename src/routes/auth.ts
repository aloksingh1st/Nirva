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


export default router;
