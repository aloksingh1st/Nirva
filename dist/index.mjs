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
    throw new Error("Entrix configuration error: baseUrl is required");
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
      "Entrix SDK not configured. Call configureEntrix(...) first."
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
  loginGoogle,
  logout
};
//# sourceMappingURL=index.mjs.map