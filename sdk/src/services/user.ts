import { getToken } from "./token";
import { getEntrixConfig } from "../config";

export const getUser = async () => {
  const token = getToken();

  if (!token) return null;

  const { baseUrl } = getEntrixConfig();

  try {
    const res = await fetch(`${baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    return null;
  }
};
