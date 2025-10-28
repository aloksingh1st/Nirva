import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

// Pages
import { HomePage } from "@/pages/HomePage";
import { DocsPage } from "@/pages/DocsPage";
import { GettingStartedPage } from "@/pages/GettingStartedPage";
import { ComponentsPage } from "@/pages/ComponentsPage";
import { PlaygroundPage } from "@/pages/PlaygroundPage";
import { DashboardPage } from "@/pages/DashboardPage";

// Auth Pages
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/docs" element={<DocsPage />} />
                <Route
                  path="/docs/getting-started"
                  element={<GettingStartedPage />}
                />
                <Route path="/docs/components" element={<ComponentsPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Auth Routes */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route
                  path="/auth/reset-password"
                  element={<ResetPasswordPage />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
