import { configureEntrix as _configureEntrix, getEntrixConfig } from "./config";

// Re-export configureEntrix so the user can call it
export const configureEntrix = _configureEntrix;

export const loginGoogle = () => {
  const { baseUrl } = getEntrixConfig();
  const url = `${baseUrl}/auth/google`;
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
