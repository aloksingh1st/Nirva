import { getEntrixConfig } from "../config";

export const getToken = (): string | null => {
  const { tokenStorage } = getEntrixConfig();

  if (tokenStorage === "cookie") {
    const match = document.cookie.match(/(^| )entrix-token=([^;]+)/);
    return match ? match[2] : null;
  }

  return localStorage.getItem("entrix-token");
};

export const setToken = (value: string): void => {
  const { tokenStorage } = getEntrixConfig();

  if (tokenStorage === "cookie") {
    document.cookie = `entrix-token=${value}; path=/;`;
  } else {
    localStorage.setItem("entrix-token", value);
  }
};

export const clearToken = (): void => {
  const { tokenStorage } = getEntrixConfig();

  if (tokenStorage === "cookie") {
    document.cookie =
      "entrix-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  } else {
    localStorage.removeItem("entrix-token");
  }
};
