import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// User interface
export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'student' | 'college' | 'counselor' | 'admin';
    avatar?: string;
    phone?: string;
    education?: {
        level: 'class10' | 'class12' | 'undergraduate' | 'postgraduate' | 'working';
        stream?: string;
        institution?: string;
    };
    interests?: string[];
    completedAssessments?: string[];
    badges?: string[];
    points?: number;
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
    loginWithGoogle: () => void;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
    addBadge: (badge: string) => void;
    addPoints: (points: number) => void;
}

interface SignupData {
    email: string;
    password: string;
    fullName: string;
    role?: 'student' | 'college' | 'counselor';
    education?: User['education'];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Helper to make API requests
    const apiRequest = useCallback(async (endpoint: string, options: RequestInit = {}) => {
        const token = localStorage.getItem('careersoulmate-token');
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: { ...headers, ...options.headers as Record<string, string> },
        });

        const data = await response.json();
        return { ok: response.ok, status: response.status, data };
    }, []);

    // Fetch current user from the server using stored JWT
    const fetchCurrentUser = useCallback(async (token: string) => {
        try {
            const { ok, data } = await apiRequest('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (ok && data.data?.user) {
                const u = data.data.user;
                setUser(u);
                localStorage.setItem('careersoulmate-user', JSON.stringify(u));
                return true;
            } else {
                localStorage.removeItem('careersoulmate-token');
                localStorage.removeItem('careersoulmate-user');
                return false;
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            // Try fallback path for legacy routes
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    const u = data.data?.user || data.user;
                    if (u) {
                        setUser(u);
                        localStorage.setItem('careersoulmate-user', JSON.stringify(u));
                        return true;
                    }
                }
            } catch { /* fallback failed too */ }
            return false;
        }
    }, [apiRequest]);

    // On mount: check for OAuth redirect token in URL, or existing token in storage
    useEffect(() => {
        const init = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const tokenFromUrl = urlParams.get('token');
            const authError = urlParams.get('auth');

            if (authError === 'error') {
                console.error('Google authentication failed.');
                window.history.replaceState({}, document.title, window.location.pathname);
                setIsLoading(false);
                return;
            }

            if (tokenFromUrl) {
                localStorage.setItem('careersoulmate-token', tokenFromUrl);
                await fetchCurrentUser(tokenFromUrl);
                window.history.replaceState({}, document.title, window.location.pathname);
                setIsLoading(false);
                return;
            }

            const existingToken = localStorage.getItem('careersoulmate-token');
            if (existingToken) {
                await fetchCurrentUser(existingToken);
                setIsLoading(false);
                return;
            }

            const savedUser = localStorage.getItem('careersoulmate-user');
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch {
                    localStorage.removeItem('careersoulmate-user');
                }
            }
            setIsLoading(false);
        };

        init();
    }, [fetchCurrentUser]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('careersoulmate-user', JSON.stringify(user));
        }
    }, [user]);

    // ─── Google OAuth ───────────────────────────────────
    const loginWithGoogle = useCallback(() => {
        window.location.href = `${API_URL}/api/auth/google`;
    }, []);

    // ─── Email/Password Login (Real API) ────────────────
    const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true);
        try {
            const { ok, data } = await apiRequest('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            if (ok && data.data) {
                const { user: u, token } = data.data;
                localStorage.setItem('careersoulmate-token', token);
                setUser(u);
                setIsLoading(false);
                return { success: true };
            }

            setIsLoading(false);
            return { success: false, error: data.message || 'Invalid credentials.' };
        } catch (error: any) {
            setIsLoading(false);
            return { success: false, error: 'Network error. Please check your connection.' };
        }
    }, [apiRequest]);

    // ─── Email/Password Signup (Real API) ───────────────
    const signup = useCallback(async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true);
        try {
            const { ok, data: responseData } = await apiRequest('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password,
                    role: data.role || 'student',
                }),
            });

            if (ok && responseData.data) {
                const { user: u, token } = responseData.data;
                localStorage.setItem('careersoulmate-token', token);
                setUser(u);
                setIsLoading(false);
                return { success: true };
            }

            setIsLoading(false);
            return { success: false, error: responseData.message || 'Registration failed.' };
        } catch (error: any) {
            setIsLoading(false);
            return { success: false, error: 'Network error. Please check your connection.' };
        }
    }, [apiRequest]);

    const logout = useCallback(() => {
        const token = localStorage.getItem('careersoulmate-token');
        setUser(null);
        localStorage.removeItem('careersoulmate-token');
        localStorage.removeItem('careersoulmate-user');

        if (token) {
            fetch(`${API_URL}/api/auth/logout`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            }).catch(() => { /* silently fail */ });
        }
    }, []);

    const updateProfile = useCallback((data: Partial<User>) => {
        setUser(prev => {
            if (!prev) return null;
            return { ...prev, ...data };
        });
    }, []);

    const addBadge = useCallback((badge: string) => {
        setUser(prev => {
            if (!prev) return null;
            if (prev.badges?.includes(badge)) return prev;
            return {
                ...prev,
                badges: [...(prev.badges || []), badge],
                points: (prev.points || 0) + 25,
            };
        });
    }, []);

    const addPoints = useCallback((points: number) => {
        setUser(prev => {
            if (!prev) return null;
            return {
                ...prev,
                points: (prev.points || 0) + points,
            };
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                signup,
                loginWithGoogle,
                logout,
                updateProfile,
                addBadge,
                addPoints,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
