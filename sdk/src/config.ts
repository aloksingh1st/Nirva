// src/config.ts

export interface EntrixConfig {
  baseUrl: string;
  tokenStorage?: "cookie" | "localStorage";
}

let config: EntrixConfig | null = null;

/**
 * Configure the Entrix SDK with required options.
 * Ensures baseUrl has no trailing slash.
 */
export const configureEntrix = (options: EntrixConfig) => {
  
  if (!options.baseUrl) {
    throw new Error("Nirva configuration error: baseUrl is required");
  }

  const normalizedUrl = options.baseUrl.replace(/\/$/, ""); // remove trailing slash

  config = {
    baseUrl: normalizedUrl,
    tokenStorage: options.tokenStorage ?? "localStorage",
  };
};

/**
 * Internal helper to assert that config is ready.
 */
export const ensureConfigured = () => {
  if (!config) {
    throw new Error(
      "Nirva SDK not configured. Call configureEntrix(...) first."
    );
  }
  return config;
};

/**
 * Get the Entrix configuration (safe only after configureEntrix).
 */
export const getEntrixConfig = (): EntrixConfig => {
  return ensureConfigured();
};
