// tests/app.controller.test.ts
import { describe, it, expect, vi, afterEach } from "vitest";
import { CreateApp, MyApps } from "../controllers/app.controller";
import { db } from "../config/db";
import * as SecretService from "../services/secretKeyService";

describe("App Controller", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockRes = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  // ---------------------- CREATE APP ----------------------
  describe("CreateApp", () => {
    it("should return 400 if fields are missing", async () => {
      const req: any = { body: {}, user: { id: "user1" } };
      const res = mockRes();

      await CreateApp(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Missing required fields",
      });
    });

    it("should return 401 if user is unauthorized", async () => {
      const req: any = {
        body: { name: "MyApp", baseUrl: "http://example.com", redirectUrl: "http://redirect.com" },
        user: null,
      };
      const res = mockRes();

      await CreateApp(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    });

    it("should create app successfully", async () => {
      const req: any = {
        body: { name: "MyApp", baseUrl: "http://example.com", redirectUrl: "http://redirect.com" },
        user: { id: "user1", email: "test@test.com" },
      };
      const res = mockRes();

      const fakeApp = {
        id: "app123",
        name: "MyApp",
        baseUrl: "http://example.com",
        redirect: "http://redirect.com",
        userId: "user1",
        secretKey: "key-123",
      };

      vi.spyOn(SecretService, "generateSecretKey").mockReturnValueOnce("key-123");
      vi.spyOn(db.app, "create").mockResolvedValueOnce(fakeApp);

      await CreateApp(req, res);

      expect(SecretService.generateSecretKey).toHaveBeenCalledWith("MyApp");
      expect(db.app.create).toHaveBeenCalledWith({
        data: {
          name: "MyApp",
          baseUrl: "http://example.com",
          redirect: "http://redirect.com",
          secretKey: "key-123",
          userId: "user1",
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "App created successfully",
        app: fakeApp,
      });
    });

    it("should return 500 if db throws error", async () => {
      const req: any = {
        body: { name: "MyApp", baseUrl: "http://example.com", redirectUrl: "http://redirect.com" },
        user: { id: "user1" },
      };
      const res = mockRes();

      vi.spyOn(SecretService, "generateSecretKey").mockReturnValueOnce("key-123");
      vi.spyOn(db.app, "create").mockRejectedValueOnce(new Error("DB down"));

      await CreateApp(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
  });

  // ---------------------- MY APPS ----------------------
  describe("MyApps", () => {
    it("should return 401 if user is unauthorized", async () => {
      const req: any = { user: null };
      const res = mockRes();

      await MyApps(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    });

    it("should return user's apps", async () => {
      const req: any = { user: { id: "user1" } };
      const res = mockRes();

      const fakeApps = [
        { id: "1", name: "App1", baseUrl: "http://a.com", redirect: "http://a.com/redirect", userId: "user1" },
        { id: "2", name: "App2", baseUrl: "http://b.com", redirect: "http://b.com/redirect", userId: "user1" },
      ];

      vi.spyOn(db.app, "findMany").mockResolvedValueOnce(fakeApps);

      await MyApps(req, res);

      expect(db.app.findMany).toHaveBeenCalledWith({ where: { userId: "user1" } });
      const result = res.json.mock.calls[0][0];
      expect(result.status).toBe(1);
      expect(result.apps.length).toBe(2);
      expect(result.apps[0]).toHaveProperty("status", 1);
      expect(result.apps[0]).toHaveProperty("last_used");
    });

    it("should handle db errors gracefully", async () => {
      const req: any = { user: { id: "user1" } };
      const res = mockRes();

      vi.spyOn(db.app, "findMany").mockRejectedValueOnce(new Error("DB down"));

      await MyApps(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 0,
        message: "Internal Server Error",
      });
    });
  });
});
