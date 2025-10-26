import { configureEntrix as _configureEntrix, getEntrixConfig } from "./config";
import { request } from "./http";

import { getApiKey } from "./http/index";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}
// Re-export configureEntrix so the user can call it
export const configureEntrix = _configureEntrix;

// async function request(url: string, method: string, body?: any) {
//   const res = await fetch(url, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     throw new Error(`Request failed: ${res.status} - ${errorText}`);
//   }

//   return res.json();
// }
export const loginGoogle = () => {
  const { baseUrl } = getEntrixConfig();
  const key = getApiKey();
  const url = `${baseUrl}/auth/google?x-nirva-key=${encodeURIComponent(key)}`;
  window.location.href = url;
};
export const loginGithub = () => {
  const { baseUrl } = getEntrixConfig();
  const url = `${baseUrl}/auth/github`;
  window.location.href = url;
};

export const getMe = async () => {
  const { baseUrl } = getEntrixConfig();
  const res = await fetch(`${baseUrl}/auth/me`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export async function loginWithEmail(formData: LoginFormData) {
  const { email, password } = formData;
  const { baseUrl } = getEntrixConfig();
  return request(`${baseUrl}/auth/login`, "POST", { email, password });
}

export async function registerWithEmail(formData: FormData) {
  const { baseUrl } = getEntrixConfig();
  const { name, email, password } = formData;
  return request(`${baseUrl}/auth/register`, "POST", { name, email, password });
}

export const logout = async (): Promise<void> => {
  const { baseUrl } = getEntrixConfig();

  const res = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Logout failed: ${res.status} ${res.statusText}`);
  }
};

export { NirvaProvider, useEntrixKey } from "./contexts/NirvaContext";
export { initEntrixClient } from "./http/index";
