var __defProp = Object.defineProperty;
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
  var _a;
  const { baseUrl } = getEntrixConfig();
  const token = (_a = document.cookie.split("; ").find((row) => row.startsWith("token="))) == null ? void 0 : _a.split("=")[1];
  console.log(token);
  const res = yield fetch(`${baseUrl}/auth/me`, {
    method: "GET",
    credentials: "include",
    // still includes cookies
    headers: __spreadValues({
      "Content-Type": "application/json"
    }, token ? { Authorization: `Bearer ${token}` } : {})
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  }
  return res.json();
});
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
export {
  configureEntrix2 as configureEntrix,
  getMe,
  loginGithub,
  loginGoogle,
  logout
};
//# sourceMappingURL=index.mjs.map