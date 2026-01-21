import React, { useState } from 'react';
import { X, Mail, Lock, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';

export function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
    const { theme } = useTheme();
    const { login } = useAuth();
    const isDark = theme === 'dark';

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setFormData({ email: '', password: '' });
            }, 1000);
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={`relative w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                <div className="grid md:grid-cols-[45%_55%] min-h-[600px]">
                    {/* Left Panel - Form */}
                    <div className={`p-8 md:p-12 flex flex-col ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className={`absolute top-4 right-4 md:left-8 md:right-auto p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
                        >
                            <X size={20} />
                        </button>

                        {/* Header */}
                        <div className="mb-8 mt-4">
                            <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Welcome back!
                            </h2>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Simplify your workflow and boost your productivity with <span className="font-semibold">InterPrep</span>. Get started for free.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                                    <p className="text-sm text-red-500">{error}</p>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                                    <p className="text-sm text-green-500">Login successful! Redirecting...</p>
                                </div>
                            )}

                            {/* Username/Email Field */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={`w-full px-4 py-3 rounded-full border transition-colors ${isDark
                                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-slate-600'
                                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-400'
                                        } focus:outline-none`}
                                    placeholder="Username"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className={`w-full px-4 py-3 rounded-full border transition-colors ${isDark
                                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-slate-600'
                                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-400'
                                        } focus:outline-none`}
                                    placeholder="Password"
                                />
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <button
                                    type="button"
                                    className={`text-sm transition-colors ${isDark ? 'text-slate-400 hover:text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 rounded-full font-semibold text-white bg-black hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader size={18} className="animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-4">
                                <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>or continue with</span>
                                <div className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                            </div>

                            {/* Social Login Buttons */}
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    type="button"
                                    className="w-12 h-12 rounded-full bg-black hover:bg-slate-800 transition-colors flex items-center justify-center"
                                    aria-label="Login with Google"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-12 h-12 rounded-full bg-black hover:bg-slate-800 transition-colors flex items-center justify-center"
                                    aria-label="Login with Apple"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-12 h-12 rounded-full bg-black hover:bg-slate-800 transition-colors flex items-center justify-center"
                                    aria-label="Login with Facebook"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="mt-auto pt-4">
                                <p className={`text-sm text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Not a member?{' '}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onClose();
                                            onSwitchToSignup();
                                        }}
                                        className={`font-semibold transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-900 hover:text-black'}`}
                                    >
                                        Register now
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Right Panel - Illustration */}
                    <div className="hidden md:flex flex-col items-center justify-center bg-[#e8f5e9] p-12 relative">
                        <div className="w-full max-w-md">
                            <img
                                src="/login-illustration.png"
                                alt="Productivity illustration"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
