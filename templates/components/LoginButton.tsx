import React from "react";
import { loginGoogle } from "./sdk";

export const LoginButton = () => (
  <button onClick={loginGoogle} className="px-4 py-2 bg-red-500 text-white rounded">
    Login with Google
  </button>
);
