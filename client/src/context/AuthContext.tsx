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

    // Fetch current user from the server using stored JWT
    const fetchCurrentUser = useCallback(async (token: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                localStorage.setItem('careersoulmate-user', JSON.stringify(data.user));
                return true;
            } else {
                // Token invalid/expired — clean up
                localStorage.removeItem('careersoulmate-token');
                localStorage.removeItem('careersoulmate-user');
                return false;
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            return false;
        }
    }, []);

    // On mount: check for OAuth redirect token in URL, or existing token in storage
    useEffect(() => {
        const init = async () => {
            // 1. Check if this is an OAuth redirect with token in the URL
            const urlParams = new URLSearchParams(window.location.search);
            const tokenFromUrl = urlParams.get('token');
            const authError = urlParams.get('auth');

            if (authError === 'error') {
                console.error('Google authentication failed.');
                // Clean the URL
                window.history.replaceState({}, document.title, window.location.pathname);
                setIsLoading(false);
                return;
            }

            if (tokenFromUrl) {
                // Store the token and fetch user
                localStorage.setItem('careersoulmate-token', tokenFromUrl);
                await fetchCurrentUser(tokenFromUrl);
                // Clean the URL (remove ?token=... from address bar)
                window.history.replaceState({}, document.title, window.location.pathname);
                setIsLoading(false);
                return;
            }

            // 2. Check for existing token in localStorage
            const existingToken = localStorage.getItem('careersoulmate-token');
            if (existingToken) {
                await fetchCurrentUser(existingToken);
                setIsLoading(false);
                return;
            }

            // 3. Fallback: check for locally stored user (from mock login)
            const savedUser = localStorage.getItem('careersoulmate-user');
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (e) {
                    localStorage.removeItem('careersoulmate-user');
                }
            }
            setIsLoading(false);
        };

        init();
    }, [fetchCurrentUser]);

    // Save user to localStorage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('careersoulmate-user', JSON.stringify(user));
        }
    }, [user]);

    // ─── Google OAuth ───────────────────────────────────
    const loginWithGoogle = useCallback(() => {
        // Redirect the whole page to the Google OAuth endpoint on the server
        window.location.href = `${API_URL}/auth/google`;
    }, []);

    // ─── Email/Password (mock — can be upgraded to real API later) ───
    const login = useCallback(async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        // For now, mock login still works as a fallback
        if (email.toLowerCase() === 'demo@careersoulmate.com' && _password === 'demo123') {
            const demoUser: User = {
                id: 'user-demo',
                email: 'demo@careersoulmate.com',
                fullName: 'Demo User',
                role: 'student',
                education: { level: 'class12', stream: 'Science' },
                interests: ['Technology', 'Engineering'],
                completedAssessments: [],
                badges: ['early-adopter'],
                points: 100,
                createdAt: new Date().toISOString(),
            };
            setUser(demoUser);
            setIsLoading(false);
            return { success: true };
        }

        setIsLoading(false);
        return { success: false, error: 'Invalid credentials. Use Google Sign-In or demo credentials.' };
    }, []);

    const signup = useCallback(async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        const newUser: User = {
            id: `user-${Date.now()}`,
            email: data.email,
            fullName: data.fullName,
            role: data.role || 'student',
            education: data.education,
            interests: [],
            completedAssessments: [],
            badges: ['welcome'],
            points: 50,
            createdAt: new Date().toISOString(),
        };

        setUser(newUser);
        setIsLoading(false);
        return { success: true };
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('careersoulmate-token');
        localStorage.removeItem('careersoulmate-user');

        // Optionally call server logout
        const token = localStorage.getItem('careersoulmate-token');
        if (token) {
            fetch(`${API_URL}/auth/logout`, {
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
