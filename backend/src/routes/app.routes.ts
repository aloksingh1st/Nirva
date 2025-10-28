import { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { CreateApp, MyApps } from "../controllers/app.controller";

const router = Router();

router.post("/create", authGuard as any, CreateApp);
router.get("/getMyApps", authGuard as any, MyApps);

export default router;
