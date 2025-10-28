import React, { useEffect } from "react";
import { GoogleButton, GithubButton, EmailForm } from "../components/auth";
import {
  loginGithub,
  loginGoogle,
  registerWithEmail,
} from "../components/auth/sdk";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, []);

  const handleGoogleRegister = (): void => {
    console.log("Google register clicked");
    loginGoogle();
  };

  const handleGithubRegister = (): void => {
    console.log("GitHub register clicked");
    // Implement GitHub OAuth here
    loginGithub();
  };

  const handleEmailRegister = async (formData: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> => {
    console.log("Email register:", formData);

    try {
      registerWithEmail(formData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-[100vw] bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">Get started today</p>
        </div>

        {/* Social Registration Buttons */}
        <div className="space-y-2 mb-4">
          <GoogleButton onClick={handleGoogleRegister} />
          <GithubButton onClick={handleGithubRegister} />
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
        <EmailForm type="register" onSubmit={handleEmailRegister} />

        {/* Switch to Login */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Sign in
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

export default Register;
