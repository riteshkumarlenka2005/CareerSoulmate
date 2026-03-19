import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// Notification types
export interface Notification {
    id: string;
    type: 'deadline' | 'recommendation' | 'achievement' | 'system' | 'reminder';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
    priority: 'low' | 'medium' | 'high';
    icon?: string;
}

export interface NotificationPreferences {
    inApp: boolean;
    email: boolean;
    push: boolean;
    deadlineReminders: boolean;
    recommendationAlerts: boolean;
    achievementNotifications: boolean;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    preferences: NotificationPreferences;
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    dismissNotification: (id: string) => void;
    clearAllNotifications: () => void;
    updatePreferences: (prefs: Partial<NotificationPreferences>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Sample notifications for demo
const INITIAL_NOTIFICATIONS: Notification[] = [
    {
        id: 'n1',
        type: 'deadline',
        title: 'JEE Main Registration Closing',
        message: 'Only 3 days left to register for JEE Main 2025. Complete your application now!',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        read: false,
        actionUrl: '/?page=admissions',
        priority: 'high',
        icon: '⏰'
    },
    {
        id: 'n2',
        type: 'recommendation',
        title: 'New Career Match Found',
        message: 'Based on your aptitude scores, we found "Data Scientist" as a 94% match for you.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        actionUrl: '/?page=ai-recs',
        priority: 'medium',
        icon: '🎯'
    },
    {
        id: 'n3',
        type: 'achievement',
        title: 'Badge Earned: Explorer',
        message: 'Congratulations! You explored 5 different career paths. Keep exploring!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        priority: 'low',
        icon: '🏆'
    },
    {
        id: 'n4',
        type: 'reminder',
        title: 'Complete Your Profile',
        message: 'Add your education details to get more personalized recommendations.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        read: true,
        actionUrl: '/?page=profile',
        priority: 'medium',
        icon: '📝'
    }
];

const DEFAULT_PREFERENCES: NotificationPreferences = {
    inApp: true,
    email: true,
    push: false,
    deadlineReminders: true,
    recommendationAlerts: true,
    achievementNotifications: true
};

interface NotificationProviderProps {
    children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>(() => {
        const saved = localStorage.getItem('careersoulmate-notifications');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return parsed.map((n: any) => ({ ...n, timestamp: new Date(n.timestamp) }));
            } catch {
                return INITIAL_NOTIFICATIONS;
            }
        }
        return INITIAL_NOTIFICATIONS;
    });

    const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
        const saved = localStorage.getItem('careersoulmate-notification-prefs');
        if (saved) {
            try {
                return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
            } catch {
                return DEFAULT_PREFERENCES;
            }
        }
        return DEFAULT_PREFERENCES;
    });

    // Save notifications to localStorage
    useEffect(() => {
        localStorage.setItem('careersoulmate-notifications', JSON.stringify(notifications));
    }, [notifications]);

    // Save preferences to localStorage
    useEffect(() => {
        localStorage.setItem('careersoulmate-notification-prefs', JSON.stringify(preferences));
    }, [preferences]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
        const newNotification: Notification = {
            ...notification,
            id: `n-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    }, []);

    const markAsRead = useCallback((id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    const dismissNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const clearAllNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const updatePreferences = useCallback((prefs: Partial<NotificationPreferences>) => {
        setPreferences(prev => ({ ...prev, ...prefs }));
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                preferences,
                addNotification,
                markAsRead,
                markAllAsRead,
                dismissNotification,
                clearAllNotifications,
                updatePreferences
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export default NotificationContext;
