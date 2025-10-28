import React, { useEffect } from "react";
import { GoogleButton, GithubButton } from "../components/auth";
import { EmailForm } from "../components/auth/EmailForm.tsx";
import {
  loginGithub,
  loginGoogle,
  loginWithEmail,
} from "../components/auth/sdk.ts";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext.tsx";
// import { use } from "framer-motion/client";

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, []);
  const handleGoogleLogin = (): void => {
    console.log("Google login clicked");
    loginGoogle();
  };

  const handleGithubLogin = (): void => {
    console.log("GitHub login clicked");
    loginGithub;
  };

  const handleEmailLogin = async (formData: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    console.log("Email login:", formData);
    try {
      loginWithEmail(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-[100vw] bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2 mb-4">
          <GoogleButton onClick={handleGoogleLogin} />
          <GithubButton onClick={handleGithubLogin} />
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-400">or</span>
          </div>
        </div>

        {/* Email Form */}
        <EmailForm type="login" onSubmit={handleEmailLogin} />

        {/* Switch to Register */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Nirva Branding */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-center text-xs text-gray-400">
            Powered by <span className="font-medium text-gray-500">Nirva</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
