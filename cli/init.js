#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

(() => {
  try {
    const projectRoot = process.cwd();

    // 1️⃣ Create src/components/auth
    const authDir = path.join(projectRoot, "src/components/auth");
    fs.mkdirSync(authDir, { recursive: true });

    // 2️⃣ Copy React component templates
    const templatesDir = path.join(__dirname, "../templates/components");
    fs.readdirSync(templatesDir).forEach((file) => {
      fs.copyFileSync(path.join(templatesDir, file), path.join(authDir, file));
    });

    // 3️⃣ Copy SDK wrapper with default configureEntrix
    const sdkTemplate = fs.readFileSync(path.join(__dirname, "../templates/sdk.ts"), "utf8");
    fs.writeFileSync(path.join(authDir, "sdk.ts"), sdkTemplate);

    // 4️⃣ Create src/pages/Login.tsx
    const pagesDir = path.join(projectRoot, "src/pages");
    fs.mkdirSync(pagesDir, { recursive: true });

    const loginPageContent = `import React from "react";
import { LoginGoogle, LoginGithub, LogoutButton, UserInfo } from "../components/auth";

const Login = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <h1 className="text-2xl font-bold">Entrix Auth Demo</h1>
    <LoginGoogle />
    <LoginGithub />
    <LogoutButton />
    <UserInfo />
  </div>
);

export default Login;
`;

    fs.writeFileSync(path.join(pagesDir, "Login.tsx"), loginPageContent);

    // 5️⃣ Update App.tsx
    const appFile = path.join(projectRoot, "src/App.tsx");
    if (fs.existsSync(appFile)) {
      const appContent = `import React from "react";
import Login from "./pages/Login";

function App() {
  return <Login />;
}

export default App;
`;
      fs.writeFileSync(appFile, appContent);
    }

    console.log("✅ Entrix SDK initialized! Components, SDK, and Login page created.");
  } catch (err) {
    console.error("❌ Entrix init failed:", err);
  }
})();
