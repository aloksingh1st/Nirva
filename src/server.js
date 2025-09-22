"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authGuard_1 = require("./middlewares/authGuard");
const passport_1 = __importDefault(require("passport"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
require("./strategies/google");
require("./strategies/github");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true, // if you are using cookies/auth headers
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.use("/auth", auth_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello TypeScript with Express!");
});
//@ts-ignore
app.get("/auth/me", authGuard_1.authGuard, (req, res) => {
    res.json({ user: req.user });
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
