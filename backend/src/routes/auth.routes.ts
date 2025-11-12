import { Router } from "express";
import passport from "passport";
import { generateToken } from "../services/tokenService";
import { login, logout, register } from "../controllers/auth.controller";
import { findCallbackUriWithSecretKey } from "../services/secretKeyService";

const router = Router();

//@ts-ignore
router.get("/google", (req, res, next) => {
  const key = req.query["x-nirva-key"];
  if (!key) {
    return res.status(400).send("Missing API key");
  }

  // Pass the API key in the OAuth state parameter
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: encodeURIComponent(key.toString()),
    prompt: "consent",
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  async (req, res) => {
    // <-- add async
    // @ts-ignore: Passport adds `user` to the request object
    const token = generateToken(req.user);

    const key = req.query.state
      ? decodeURIComponent(req.query.state.toString())
      : null;

    if (!key) {
      throw new Error("Key is mandatory");
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const redirectURI = await findCallbackUriWithSecretKey(key);

    res.redirect(`${redirectURI}?token=${token}`);
  }
);

router.get("/github", (req, res, next) => {
  const { state } = req.query;

  const authOptions: any = {
    scope: ["user:email"],
  };

  if (state) {
    authOptions.state = encodeURIComponent(state.toString());
  }

  passport.authenticate("github", authOptions)(req, res, next);
});

// GitHub OAuth Callback
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/", // redirect on error
  }),
  (req, res) => {
    //@ts-ignore
    const token = generateToken(req.user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or "strict" for CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/auth/success?token=${token}`);
  }
);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
