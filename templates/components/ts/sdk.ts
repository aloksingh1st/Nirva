// @ts-ignore
import {
  configureEntrix,
  loginGoogle,
  getMe,
  logout,
  loginGithub,
} from "nirva";

// Auto-configure Entrix SDK with default base URL
configureEntrix({
  baseUrl: "http://localhost:8000",
  tokenStorage: "cookie",
});

export { loginGoogle, getMe, logout, loginGithub };
