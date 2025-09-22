"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.findOrCreateUser = void 0;
const db_1 = require("../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenService_1 = require("./tokenService");
// 🟢 For Google/GitHub OAuth
const findOrCreateUser = (profile, provider) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value;
    let user = yield db_1.db.user.findUnique({
        where: { oauthId: profile.id },
    });
    if (!user) {
        user = yield db_1.db.user.create({
            data: {
                name: profile.displayName,
                email,
                oauthId: profile.id,
                provider,
            },
        });
    }
    return user;
});
exports.findOrCreateUser = findOrCreateUser;
// 🟢 For Local Registration
const register = (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield db_1.db.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            provider: "local",
        },
    });
    return { id: user.id, email: user.email };
});
exports.register = register;
// 🟢 For Local Login
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.user.findUnique({ where: { email } });
    if (!user || !user.password) {
        throw new Error("Invalid credentials");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    return (0, tokenService_1.generateToken)(user);
});
exports.login = login;
