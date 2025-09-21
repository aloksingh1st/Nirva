import React from "react";
import { loginGithub } from "./sdk";

export const LoginGithub = () => (
  <button onClick={loginGithub} className="px-4 py-2 bg-red-500 text-white rounded">
    Login with Github
  </button>
);
