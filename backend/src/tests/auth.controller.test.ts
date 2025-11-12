import { describe, it, expect, vi, afterEach } from "vitest";
import { register, login, logout } from "../controllers/auth.controller";
import * as AppUserUtil from "../services/findAppUserService";
import * as AuthService from "../services/userService";

describe("register controller", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockRes = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it("should return 400 if fields are missing", async () => {
    const req: any = { body: {}, headers: {} };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Email, password, and name are required",
    });
  });

  it("should return 401 if API key missing", async () => {
    const req: any = {
      body: { email: "a@test.com", password: "123", name: "Alok" },
      headers: {},
    };
    const res = mockRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Missing API key",
    });
  });

  it("should register user successfully", async () => {
    const req: any = {
      body: { email: "a@test.com", password: "123", name: "Alok" },
      headers: { "x-nirva-key": "test-key" },
    };
    const res = mockRes();

    const fakeAppUser = { id: 1 };
    const fakeUser = { id: 2, email: "a@test.com" };

    vi.spyOn(AppUserUtil, "findAppUser").mockResolvedValueOnce(fakeAppUser);
    vi.spyOn(AuthService, "register").mockResolvedValueOnce(fakeUser);

    await register(req, res);

    expect(AppUserUtil.findAppUser).toHaveBeenCalledWith("test-key");
    expect(AuthService.register).toHaveBeenCalledWith(
      "a@test.com",
      "123",
      "Alok",
      fakeAppUser
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "User registered successfully",
      user: fakeUser,
    });
  });

  it("should handle duplicate user error", async () => {
    const req: any = {
      body: { email: "a@test.com", password: "123", name: "Alok" },
      headers: { "x-nirva-key": "test-key" },
    };
    const res = mockRes();

    vi.spyOn(AppUserUtil, "findAppUser").mockResolvedValueOnce({});
    vi.spyOn(AuthService, "register").mockRejectedValueOnce(
      new Error("User already registered")
    );

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User already registered. Please log in.",
    });
  });

  it("should handle unexpected errors", async () => {
    const req: any = {
      body: { email: "a@test.com", password: "123", name: "Alok" },
      headers: { "x-nirva-key": "test-key" },
    };
    const res = mockRes();

    vi.spyOn(AppUserUtil, "findAppUser").mockResolvedValueOnce({});
    vi.spyOn(AuthService, "register").mockRejectedValueOnce(
      new Error("DB down")
    );

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Something went wrong during registration",
    });
  });
});

describe("Auth Controller - login & logout", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockRes = () => {
    const res: any = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    res.cookie = vi.fn().mockReturnValue(res);
    res.clearCookie = vi.fn().mockReturnValue(res);
    return res;
  };

  // ---------------------- LOGIN ----------------------
  it("should login successfully and set cookie", async () => {
    const req: any = {
      body: { email: "a@test.com", password: "123456" },
      headers: { "x-nirva-key": "test-key" },
    };
    const res = mockRes();

    const fakeToken = "jwt-token-123";
    vi.spyOn(AuthService, "login").mockResolvedValueOnce(fakeToken);

    await login(req, res);

    expect(AuthService.login).toHaveBeenCalledWith("a@test.com", "123456");
    expect(res.cookie).toHaveBeenCalledWith(
      "token",
      fakeToken,
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: fakeToken,
      message: "Successfully logged in",
      success: true,
    });
  });

  it("should return 401 for invalid credentials", async () => {
    const req: any = {
      body: { email: "a@test.com", password: "wrong" },
      headers: { "x-nirva-key": "test-key" },
    };
    const res = mockRes();

    vi.spyOn(AuthService, "login").mockRejectedValueOnce(
      new Error("Invalid credentials")
    );

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password",
      success: false,
    });
  });

  it("should return 404 for user not found", async () => {
    const req: any = {
      body: { email: "unknown@test.com", password: "123" },
      headers: { "x-nirva-key": "test-key" },
    };
    const res = mockRes();

    vi.spyOn(AuthService, "login").mockRejectedValueOnce(
      new Error("User not found")
    );

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found",
      success: false,
    });
  });

  it("should return 500 on unexpected error", async () => {
    const req: any = {
      body: { email: "a@test.com", password: "123" },
      headers: { "x-nirva-key": "test-key" },
    };
    const res = mockRes();

    vi.spyOn(AuthService, "login").mockRejectedValueOnce(new Error("DB down"));

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something went wrong",
      success: false,
    });
  });

  // ---------------------- LOGOUT ----------------------
  it("should clear cookie and return success message", () => {
    const req: any = {};
    const res = mockRes();

    logout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith(
      "token",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "lax",
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Logged out" });
  });
});
