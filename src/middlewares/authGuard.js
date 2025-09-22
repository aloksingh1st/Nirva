"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(req.headers.cookie);
    let token;
    // First, check Authorization header
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    // If no Bearer token, fallback to cookies
    if (!token && req.headers.cookie) {
        const cookies = req.headers.cookie.split(";").map((c) => c.trim());
        const tokenCookie = cookies.find((c) => c.startsWith("token="));
        if (tokenCookie) {
            token = tokenCookie.split("=")[1];
        }
    }
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        //@ts-ignore
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authGuard = authGuard;
