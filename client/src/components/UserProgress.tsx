import React from 'react';
import { useAuth } from '../context/AuthContext';

// Badge definitions
export const BADGES: Record<string, { name: string; icon: string; description: string; color: string }> = {
    'welcome': {
        name: 'Welcome',
        icon: '👋',
        description: 'Joined CareerSoulmate',
        color: 'from-blue-500 to-cyan-500',
    },
    'early-adopter': {
        name: 'Early Adopter',
        icon: '🌟',
        description: 'Among the first users',
        color: 'from-purple-500 to-pink-500',
    },
    'aptitude-complete': {
        name: 'Aptitude Pro',
        icon: '🧠',
        description: 'Completed aptitude assessment',
        color: 'from-green-500 to-emerald-500',
    },
    'interest-complete': {
        name: 'Interest Explorer',
        icon: '🔍',
        description: 'Completed interest assessment',
        color: 'from-orange-500 to-yellow-500',
    },
    'personality-complete': {
        name: 'Self-Aware',
        icon: '🪞',
        description: 'Completed personality assessment',
        color: 'from-pink-500 to-rose-500',
    },
    'skills-complete': {
        name: 'Skill Master',
        icon: '⚡',
        description: 'Completed skills assessment',
        color: 'from-cyan-500 to-blue-500',
    },
    'career-explorer': {
        name: 'Career Explorer',
        icon: '🧭',
        description: 'Explored 10+ careers',
        color: 'from-indigo-500 to-purple-500',
    },
    'college-hunter': {
        name: 'College Hunter',
        icon: '🏛️',
        description: 'Bookmarked 5+ colleges',
        color: 'from-amber-500 to-orange-500',
    },
    'streak-7': {
        name: '7-Day Streak',
        icon: '🔥',
        description: 'Logged in 7 days in a row',
        color: 'from-red-500 to-orange-500',
    },
    'pathway-planner': {
        name: 'Pathway Planner',
        icon: '🗺️',
        description: 'Created a career roadmap',
        color: 'from-teal-500 to-green-500',
    },
};

interface UserProgressProps {
    compact?: boolean;
}

const UserProgress: React.FC<UserProgressProps> = ({ compact = false }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
        return null;
    }

    const userBadges = user.badges || [];
    const points = user.points || 0;

    // Calculate level based on points
    const level = Math.floor(points / 100) + 1;
    const pointsInLevel = points % 100;
    const progressPercent = pointsInLevel;

    if (compact) {
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full">
                    <span className="text-sm">⭐</span>
                    <span className="text-xs font-bold text-blue-400">{points}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full">
                    <span className="text-sm">🏅</span>
                    <span className="text-xs font-bold text-purple-400">Lv.{level}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Your Progress</h3>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl">
                    <span className="text-xl">⭐</span>
                    <span className="text-lg font-bold text-white">{points}</span>
                    <span className="text-xs text-gray-200">points</span>
                </div>
            </div>

            {/* Level Progress */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-200">Level {level}</span>
                    <span className="text-xs text-gray-300">{pointsInLevel}/100 to next level</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Badges */}
            <div>
                <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-4">
                    Badges Earned ({userBadges.length})
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {userBadges.map((badgeId) => {
                        const badge = BADGES[badgeId];
                        if (!badge) return null;
                        return (
                            <div
                                key={badgeId}
                                className="group relative flex flex-col items-center p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center mb-2 shadow-lg`}>
                                    <span className="text-2xl">{badge.icon}</span>
                                </div>
                                <span className="text-xs font-medium text-white text-center leading-tight">
                                    {badge.name}
                                </span>

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                    <p className="text-xs text-white">{badge.description}</p>
                                </div>
                            </div>
                        );
                    })}

                    {/* Locked badges preview */}
                    {Object.entries(BADGES)
                        .filter(([id]) => !userBadges.includes(id))
                        .slice(0, 4)
                        .map(([id, badge]) => (
                            <div
                                key={id}
                                className="flex flex-col items-center p-3 bg-white/5 border border-white/10 rounded-xl opacity-40"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mb-2">
                                    <span className="text-2xl grayscale">🔒</span>
                                </div>
                                <span className="text-xs font-medium text-gray-300 text-center leading-tight">
                                    {badge.name}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default UserProgress;
