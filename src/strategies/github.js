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
// src/strategies/github.ts
const passport_github2_1 = require("passport-github2");
const passport_1 = __importDefault(require("passport"));
const db_1 = require("../config/db");
const tokenService_1 = require("../services/tokenService");
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
}, (profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || `${profile.username}@github.com`;
        let user = yield db_1.db.user.findFirst({
            where: { email },
        });
        if (!user) {
            user = yield db_1.db.user.create({
                data: {
                    name: profile.displayName || profile.username,
                    email,
                    provider: "github",
                    oauthId: profile.id,
                },
            });
        }
        const token = (0, tokenService_1.generateToken)(user);
        return done(null, Object.assign(Object.assign({}, user), { token }));
    }
    catch (err) {
        return done(err);
    }
})));
