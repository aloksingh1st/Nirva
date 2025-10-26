import React, {useState} from 'react';

import { GoogleButton, GithubButton, EmailForm } from '../components/auth';
import { loginGithub, loginGoogle, registerWithEmail } from '../components/auth/sdk.js';
import { Link } from 'react-router-dom';
import Toast from "../components/auth/Toast";

const Register = ({ onSwitchToLogin }) => {

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleGoogleRegister = () => {
    console.log('Google register clicked');
    // Implement Google OAuth here
    loginGoogle();
  };

  const handleGithubRegister = () => {
    loginGithub();
  };

  const handleEmailRegister = async (formData) => {
    console.log('Email register:', formData);
    try {
      const user = registerWithEmail(formData);

      if (user.status) {
        showToast(user.message, 'success');
      }
      else {
        showToast(user.message, 'error');
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-[100vw] bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center p-4">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">Create Account</h1>
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
            Already have an account?{' '}
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
            Powered by{' '}
            <span className="font-medium text-gray-500">Nirva</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;