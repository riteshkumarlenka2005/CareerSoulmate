import React, { useState, useRef, useEffect } from 'react';
import { useNotifications, Notification } from '../contexts/NotificationContext';

const NotificationCenter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification } = useNotifications();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const getPriorityColor = (priority: Notification['priority']) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-amber-500';
            case 'low': return 'bg-blue-500';
        }
    };

    const getTypeIcon = (type: Notification['type'], icon?: string) => {
        if (icon) return icon;
        switch (type) {
            case 'deadline': return '⏰';
            case 'recommendation': return '🎯';
            case 'achievement': return '🏆';
            case 'reminder': return '📝';
            case 'system': return '⚙️';
            default: return '🔔';
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                aria-label="Notifications"
            >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>

                {/* Badge */}
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 max-h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                        <h3 className="font-semibold text-white">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="overflow-y-auto max-h-[400px]">
                        {notifications.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="text-4xl mb-3">🔔</div>
                                <p className="text-gray-500">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-500/5' : ''}`}
                                    onClick={() => {
                                        markAsRead(notification.id);
                                        if (notification.actionUrl) {
                                            window.location.href = notification.actionUrl;
                                        }
                                    }}
                                >
                                    <div className="flex items-start gap-3">
                                        {/* Icon */}
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                                            {getTypeIcon(notification.type, notification.icon)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-white text-sm truncate">
                                                    {notification.title}
                                                </span>
                                                {!notification.read && (
                                                    <span className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400 line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <span className="text-xs text-gray-500 mt-1 block">
                                                {formatTime(notification.timestamp)}
                                            </span>
                                        </div>

                                        {/* Dismiss */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dismissNotification(notification.id);
                                            }}
                                            className="p-1 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                                        >
                                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-3 bg-white/5 border-t border-white/10 text-center">
                            <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
