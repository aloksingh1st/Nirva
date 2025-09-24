"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var index_exports = {};
__export(index_exports, {
  configureEntrix: () => configureEntrix2,
  getMe: () => getMe,
  loginGithub: () => loginGithub,
  loginGoogle: () => loginGoogle,
  loginWithEmail: () => loginWithEmail,
  logout: () => logout,
  registerWithEmail: () => registerWithEmail
});
module.exports = __toCommonJS(index_exports);

// src/config.ts
var config = null;
var configureEntrix = (options) => {
  var _a;
  if (!options.baseUrl) {
    throw new Error("Nirva configuration error: baseUrl is required");
  }
  const normalizedUrl = options.baseUrl.replace(/\/$/, "");
  config = {
    baseUrl: normalizedUrl,
    tokenStorage: (_a = options.tokenStorage) != null ? _a : "localStorage"
  };
};
var ensureConfigured = () => {
  if (!config) {
    throw new Error(
      "Nirva SDK not configured. Call configureEntrix(...) first."
    );
  }
  return config;
};
var getEntrixConfig = () => {
  return ensureConfigured();
};

// src/http/index.ts
function request(_0, _1, _2) {
  return __async(this, arguments, function* (url, method, body, headers = {}) {
    const response = yield fetch(url, {
      method,
      headers: __spreadValues({
        "Content-Type": "application/json"
      }, headers),
      body: body ? JSON.stringify(body) : void 0
    });
    if (!response.ok) {
      const error = yield response.json().catch(() => ({}));
      throw new Error(error.message || `Request failed: ${response.status}`);
    }
    return response.json();
  });
}

// src/index.ts
var configureEntrix2 = configureEntrix;
var loginGoogle = () => {
  const { baseUrl } = getEntrixConfig();
  const url = `${baseUrl}/auth/google`;
  window.location.href = url;
};
var loginGithub = () => {
  const { baseUrl } = getEntrixConfig();
  const url = `${baseUrl}/auth/github`;
  window.location.href = url;
};
var getMe = () => __async(null, null, function* () {
  const { baseUrl } = getEntrixConfig();
  const res = yield fetch(`${baseUrl}/auth/me`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  }
  return res.json();
});
function loginWithEmail(formData) {
  return __async(this, null, function* () {
    const { email, password } = formData;
    const { baseUrl } = getEntrixConfig();
    return request(`${baseUrl}/auth/login`, "POST", { email, password });
  });
}
function registerWithEmail(formData) {
  return __async(this, null, function* () {
    const { baseUrl } = getEntrixConfig();
    const { name, email, password } = formData;
    return request(`${baseUrl}/auth/register`, "POST", { name, email, password });
  });
}
var logout = () => __async(null, null, function* () {
  const { baseUrl } = getEntrixConfig();
  const res = yield fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) {
    throw new Error(`Logout failed: ${res.status} ${res.statusText}`);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configureEntrix,
  getMe,
  loginGithub,
  loginGoogle,
  loginWithEmail,
  logout,
  registerWithEmail
});
//# sourceMappingURL=index.js.map