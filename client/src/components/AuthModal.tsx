import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [educationLevel, setEducationLevel] = useState<'class10' | 'class12' | 'undergraduate' | 'postgraduate' | 'working'>('class12');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { login, signup, loginWithGoogle, isLoading } = useAuth();
    const { t } = useI18n();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (mode === 'signup') {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
            const result = await signup({
                email,
                password,
                fullName,
                education: { level: educationLevel },
            });
            if (result.success) {
                setSuccess(t('auth.signupSuccess'));
                setTimeout(() => onClose(), 1500);
            } else {
                setError(result.error || 'Signup failed');
            }
        } else {
            const result = await login(email, password);
            if (result.success) {
                setSuccess(t('auth.loginSuccess'));
                setTimeout(() => onClose(), 1000);
            } else {
                setError(result.error || 'Login failed');
            }
        }
    };

    const handleGoogleLogin = () => {
        loginWithGoogle();
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFullName('');
        setError('');
        setSuccess('');
    };

    const switchMode = () => {
        resetForm();
        setMode(mode === 'login' ? 'signup' : 'login');
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 text-gray-200 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        {mode === 'login' ? t('auth.login') : t('auth.signup')}
                    </h2>
                    <p className="text-gray-200 text-sm mt-2">
                        {mode === 'login'
                            ? 'Welcome back to CareerSoulmate'
                            : 'Start your career journey today'
                        }
                    </p>
                </div>

                {/* ─── Google Sign-In Button ─── */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3.5 mb-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                    {/* Google "G" logo */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11 11 0 001 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                {/* ─── Divider ─── */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex-grow h-px bg-white/10" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">or</span>
                    <div className="flex-grow h-px bg-white/10" />
                </div>

                {/* Demo Credentials Hint */}
                {mode === 'login' && (
                    <div className="mb-5 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <p className="text-xs text-blue-400 text-center">
                            Demo: <span className="font-mono">demo@careersoulmate.com</span> / <span className="font-mono">demo123</span>
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div>
                            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                {t('auth.fullName')}
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Enter your full name"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                            {t('auth.email')}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                            {t('auth.password')}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter your password"
                        />
                    </div>

                    {mode === 'signup' && (
                        <>
                            <div>
                                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                    {t('auth.confirmPassword')}
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Confirm your password"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider mb-2">
                                    Education Level
                                </label>
                                <select
                                    value={educationLevel}
                                    onChange={(e) => setEducationLevel(e.target.value as any)}
                                    aria-label="Education Level"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="class10" className="bg-gray-900">Class 10</option>
                                    <option value="class12" className="bg-gray-900">Class 12</option>
                                    <option value="undergraduate" className="bg-gray-900">Undergraduate</option>
                                    <option value="postgraduate" className="bg-gray-900">Postgraduate</option>
                                    <option value="working" className="bg-gray-900">Working Professional</option>
                                </select>
                            </div>
                        </>
                    )}

                    {/* Error/Success Messages */}
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-sm text-red-400 text-center">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <p className="text-sm text-green-400 text-center">{success}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            mode === 'login' ? t('auth.login') : t('auth.signup')
                        )}
                    </button>
                </form>

                {/* Switch Mode */}
                <div className="mt-6 text-center">
                    <p className="text-gray-200 text-sm">
                        {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
                        <button
                            onClick={switchMode}
                            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                            {mode === 'login' ? t('auth.signup') : t('auth.login')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
