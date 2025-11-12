import { describe, it, expect, vi, beforeEach } from "vitest";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// ✅ Mock dependencies
vi.mock("../services/userService", () => ({
  findOrCreateUser: vi.fn(),
}));
vi.mock("../services/findAppUserService", () => ({
  findAppUser: vi.fn(),
}));

import "../config/passport"; // this should register your GoogleStrategy
import { findOrCreateUser } from "../services/userService";

describe("Google Strategy", () => {
  let strategy: GoogleStrategy;
  let verifyCallback: Function;

  beforeEach(() => {
    vi.clearAllMocks();

    // Extract the GoogleStrategy instance registered with passport
    const googleStrategy = (passport as any)._strategies["google"];
    expect(googleStrategy).toBeDefined();

    strategy = googleStrategy;
    verifyCallback = (strategy as any)._verify; // internal callback
  });

  it("should return error when API key is missing", async () => {
    const req = { query: {} };
    const done = vi.fn();

    await verifyCallback(
      req,
      "accessToken",
      "refreshToken",
      { id: "123" },
      done
    );

    expect(done).toHaveBeenCalledWith(expect.any(Error), null);
    expect(done.mock.calls[0][0].message).toBe("Missing API key");
  });

  it("should call findOrCreateUser with correct params when API key is present", async () => {
    const req = { query: { "x-nirva-key": "my-key" } };
    const done = vi.fn();

    (findOrCreateUser as any).mockResolvedValueOnce({ id: "user-1" });

    await verifyCallback(
      req,
      "accessToken",
      "refreshToken",
      { id: "google-123" },
      done
    );

    expect(findOrCreateUser).toHaveBeenCalledWith(
      { id: "google-123" },
      "google",
      "my-key"
    );
    expect(done).toHaveBeenCalledWith(null, { id: "user-1" });
  });

  it("should call done with error when findOrCreateUser throws", async () => {
    const req = { query: { "x-nirva-key": "key" } };
    const done = vi.fn();

    (findOrCreateUser as any).mockRejectedValueOnce(new Error("DB error"));

    await verifyCallback(
      req,
      "accessToken",
      "refreshToken",
      { id: "123" },
      done
    );

    expect(done).toHaveBeenCalledWith(expect.any(Error), null);
    expect(done.mock.calls[0][0].message).toBe("DB error");
  });
});
