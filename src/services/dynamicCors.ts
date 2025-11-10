import cors from "cors";
import { db } from "../config/db";

export const dynamicCors = cors({
  origin: async (origin, callback) => {
    if (!origin) return callback(null, true);

    try {
      const app = await db.app.findFirst({ where: { baseUrl: origin } });
      if (app) return callback(null, true);
    } catch (e) {
      console.error("CORS lookup error:", e);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
});
