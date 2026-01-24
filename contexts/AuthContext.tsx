import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

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

// Mock user database (in real app, this would be a backend)
const mockUsers: Record<string, { password: string; user: User }> = {
    'demo@careersoulmate.com': {
        password: 'demo123',
        user: {
            id: 'user-1',
            email: 'demo@careersoulmate.com',
            fullName: 'Demo User',
            role: 'student',
            education: { level: 'class12', stream: 'Science' },
            interests: ['Technology', 'Engineering'],
            completedAssessments: [],
            badges: ['early-adopter'],
            points: 100,
            createdAt: new Date().toISOString(),
        },
    },
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('careersoulmate-user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('careersoulmate-user');
            }
        }
        setIsLoading(false);
    }, []);

    // Save user to localStorage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('careersoulmate-user', JSON.stringify(user));
        }
    }, [user]);

    const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const userRecord = mockUsers[email.toLowerCase()];

        if (!userRecord) {
            setIsLoading(false);
            return { success: false, error: 'User not found. Please sign up first.' };
        }

        if (userRecord.password !== password) {
            setIsLoading(false);
            return { success: false, error: 'Invalid password.' };
        }

        setUser(userRecord.user);
        setIsLoading(false);
        return { success: true };
    }, []);

    const signup = useCallback(async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (mockUsers[data.email.toLowerCase()]) {
            setIsLoading(false);
            return { success: false, error: 'User already exists. Please login.' };
        }

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

        // Add to mock database
        mockUsers[data.email.toLowerCase()] = {
            password: data.password,
            user: newUser,
        };

        setUser(newUser);
        setIsLoading(false);
        return { success: true };
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('careersoulmate-user');
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
                points: (prev.points || 0) + 25, // Bonus points for badges
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
