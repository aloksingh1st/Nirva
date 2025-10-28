import { Request, Response } from "express";
import { db } from "../config/db";
import { generateSecretKey } from "../services/secretKeyService";

export const CreateApp = async (req: Request, res: Response) => {
  try {
    const { name, baseUrl, redirectUrl } = req.body;

    if (!name || !baseUrl || !redirectUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Use optional chaining and type assertion for user
    const user = (req as any).user as { id: string; email?: string };
    if (!user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const secretKey = generateSecretKey(name);

    const app = await db.app.create({
      data: {
        name,
        baseUrl,
        redirect: redirectUrl,
        secretKey,
        userId: user.id,
      },
    });

    return res.status(201).json({ message: "App created successfully", app });
  } catch (error) {
    console.error("CreateApp error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const MyApps = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as { id: string; email?: string };
    if (!user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const apps = await db.app.findMany({
      where: {
        userId: user.id,
      },
    });

    const today = new Date().toISOString();

    const formattedApps = apps.map((app) => ({
     ...app,
      status: 1,
      last_used: today,
    }));

    return res.json({
      status: 1,
      apps: formattedApps,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 0, message: "Internal Server Error" });
  }
};
