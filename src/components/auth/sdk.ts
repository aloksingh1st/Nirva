// @ts-ignore
import {
  configureEntrix,
  loginGoogle,
  getMe,
  logout,
  loginGithub,
  registerWithEmail,
  loginWithEmail,
} from "nirva";

// Auto-configure Entrix SDK with default base URL
configureEntrix({
  // baseUrl: "https://nirva-backend.onrender.com",
  baseUrl: "http://localhost:8000",
  tokenStorage: "cookie",
});

export {
  loginGoogle,
  getMe,
  logout,
  loginGithub,
  registerWithEmail,
  loginWithEmail,
};
