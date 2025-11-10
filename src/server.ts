import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { authGuard } from "./middlewares/authGuard";
import passport from "passport";
import authRoutes from "./routes/auth.routes";
import appRoutes from "./routes/app.routes";
import "./strategies/google";
import "./strategies/github";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dynamicCors } from "./services/dynamicCors";

dotenv.config();

const app = express();
const port = 8000;

interface TypedRequest extends Request {
  user?: any;
}

app.use(dynamicCors);

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/apps", appRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript with Express!");
});

//@ts-ignore
app.get("/auth/me", authGuard, (req: TypedRequest, res: Response) => {
  res.json({ user: req.user });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
