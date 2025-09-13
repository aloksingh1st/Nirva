
// @ts-ignore
import { configureEntrix, loginGoogle, getMe, logout } from "entrixsdk";

// Auto-configure Entrix SDK with default base URL
configureEntrix({
  baseUrl: "http://localhost:3000",
  tokenStorage: "cookie",
});

export { loginGoogle, getMe, logout };
