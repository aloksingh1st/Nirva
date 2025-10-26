// // @ts-ignore
import {
  configureEntrix,
  loginGoogle,
  getMe,
  logout,
  loginGithub,
  registerWithEmail,
  loginWithEmail,
  NirvaProvider,
} from "nirva";

// // Auto-configure Entrix SDK with default base URL
// configureEntrix({
//   // baseUrl: "https://nirva-backend.onrender.com",
//   baseUrl: "http://localhost:8000",
//   tokenStorage: "cookie",
// });

// export { loginGoogle, getMe, logout, loginGithub, loginWithEmail, registerWithEmail };







import { initEntrixClient } from "nirva";

// Pull secret key from env
const apiKey =
  import.meta.env.VITE_NV_SECRET_KEY ||
  process.env.NV_SECRET_KEY ||
  null;

if (!apiKey) {
  console.warn("⚠️ Nirva SDK: Missing secret key in environment.");
}

// Configure base URL & token storage
configureEntrix({
  baseUrl: "http://localhost:8000",
  tokenStorage: "cookie",
});

//  Initialize the client singleton with the key
if (apiKey) {
  initEntrixClient(apiKey);
}

// Export everything as usual
export {
  loginGoogle,
  getMe,
  logout,
  loginGithub,
  loginWithEmail,
  registerWithEmail,
  NirvaProvider,
};
