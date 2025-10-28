import React, { useState } from 'react';
import { GoogleButton, GithubButton as GitHubBtn } from '../components/auth';
import { EmailForm } from '../components/auth/EmailForm.jsx';
import { loginGithub, loginGoogle, loginWithEmail } from '../components/auth/sdk.js';
import { Link } from 'react-router-dom';
import Toast from "../components/auth/Toast";

const Login = ({ onSwitchToRegister }) => {

    const [toast, setToast] = useState(null);

    const showToast = (message, type) => {
        setToast({ message, type });
    };
    
    const handleGoogleLogin = () => {
        loginGoogle();
    };

    const handleGithubLogin = () => {
        console.log('GitHub login clicked');
        loginGithub();
    };

    const handleEmailLogin = async (formData) => {
        try {
            const user = await loginWithEmail(formData);

            if (user.status) {
                showToast(user.message, 'success');
            }
            else {
                showToast(user.message, 'error');
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="min-h-screen w-[100vw] bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">

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
                    <h1 className="text-xl font-semibold text-gray-900 mb-1">Welcome Back</h1>
                    <p className="text-sm text-gray-500">Sign in to continue</p>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-2 mb-4">
                    <GoogleButton onClick={handleGoogleLogin} />
                    <GitHubBtn onClick={handleGithubLogin} />
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
                        Don't have an account?{' '}
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
                        Powered by{' '}
                        <span className="font-medium text-gray-500">Nirva</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;