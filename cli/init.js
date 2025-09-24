#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const prompts = require("prompts");
const { execSync } = require("child_process");



function getPkgManager(projectRoot) {
  if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) return "pnpm";
  return "npm";
}


function resolveAppFile(projectRoot, lang) {
  // possible extensions based on lang
  const extensions = [
    lang,                // js or ts
    lang + "x"           // jsx or tsx
  ];

  for (const ext of extensions) {
    const filePath = path.join(projectRoot, "src", `App.${ext}`);
    if (fs.existsSync(filePath)) {
      return filePath; // return first one found
    }
  }

  return null; // not found
}


const init = async () => {
  try {



    const framwork = await prompts({
      type: "select",
      name: "framwork",
      message: "Which language do you want to scaffold?",
      choices: [
        { title: "React", value: "next" },
        { title: "Next", value: "react" }
      ],
      initial: 0
    });


    const response = await prompts({
      type: "select",
      name: "lang",
      message: "Which language do you want to scaffold?",
      choices: [
        { title: "TypeScript (TSX)", value: "ts" },
        { title: "JavaScript (JSX)", value: "js" }
      ],
      initial: 0
    });

    const projectRoot = process.cwd();

    // 1️⃣ Create src/components/auth
    const authDir = path.join(projectRoot, "src/components/auth");
    fs.mkdirSync(authDir, { recursive: true });

    // 2️⃣ Copy React component templates
    const templatesDir = path.join(__dirname, "../templates/components/" + response.lang);

    fs.readdirSync(templatesDir).forEach((file) => {
      fs.copyFileSync(path.join(templatesDir, file), path.join(authDir, file));
    });

    // 3️⃣ Copy SDK wrapper with default configureEntrix
    const sdkTemplate = fs.readFileSync(path.join(__dirname, "../templates/components/" + response.lang + "/sdk." + response.lang), "utf8");

    fs.writeFileSync(path.join(authDir, "sdk." + response.lang), sdkTemplate);

    // 4️⃣ Create src/pages/Login.tsx
    const pagesDirectory = path.join(projectRoot, "src/pages");
    fs.mkdirSync(pagesDirectory, { recursive: true });

    const pagesDir = path.join(__dirname, "../templates/pages/" + response.lang);

    fs.readdirSync(pagesDir).forEach((file) => {
      fs.copyFileSync(path.join(pagesDir, file), path.join(path.join(projectRoot, "src/pages"), file));
    });


    // 5️⃣ Update App.tsx
    const appFile = resolveAppFile(projectRoot, response.lang);

    if (fs.existsSync(appFile)) {
      const appContent = `import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login + Register routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
`;
      fs.writeFileSync(appFile, appContent);
    }

    const pkgManager = getPkgManager(projectRoot);

    // console.log(`📦 Installing dependencies (react-router-dom) with ${pkgManager}...`);
    // execSync(`${pkgManager} add react-router-dom`, { stdio: "inherit", cwd: projectRoot });


    
    console.log("✅ Nirva SDK initialized! Components, SDK, and Login page created.");
  } catch (err) {
    console.error("❌ Nirva init failed:", err);
  }
};


init();
