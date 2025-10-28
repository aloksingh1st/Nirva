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

// src/http/index.ts
var apiKey = null;
var initEntrixClient = (key) => {
  if (!key) throw new Error("API key is required");
  apiKey = key;
};
var getApiKey = () => {
  if (!apiKey)
    throw new Error(
      "Entrix client is not initialized. Call initEntrixClient first."
    );
  return apiKey;
};
function request(_0) {
  return __async(this, arguments, function* (url, method = "GET", body, headers = {}) {
    const response = yield fetch(url, {
      method,
      headers: __spreadValues(__spreadValues({
        "Content-Type": "application/json"
      }, apiKey ? { "x-nirva-key": apiKey } : {}), headers),
      body: body ? JSON.stringify(body) : void 0
    });
    if (!response.ok) {
      const error = yield response.json().catch(() => ({}));
      throw new Error(error.message || `Request failed: ${response.status}`);
    }
    return response.json();
  });
}

// src/contexts/NirvaContext.tsx
var NirvaProvider = () => {
  const apiKey2 = "somehgin";
  if (!apiKey2) {
    console.warn("\u26A0\uFE0F Entrix SDK: Missing Nirva Secret Key in environment.");
  }
  return apiKey2;
};
var useEntrixKey = (apiKey2) => {
  return apiKey2;
};

// src/index.ts
var configureEntrix2 = configureEntrix;
var loginGoogle = () => {
  const { baseUrl } = getEntrixConfig();
  const key = getApiKey();
  const url = `${baseUrl}/auth/google?x-nirva-key=${encodeURIComponent(key)}`;
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
export {
  NirvaProvider,
  configureEntrix2 as configureEntrix,
  getMe,
  initEntrixClient,
  loginGithub,
  loginGoogle,
  loginWithEmail,
  logout,
  registerWithEmail,
  useEntrixKey
};
//# sourceMappingURL=index.mjs.map