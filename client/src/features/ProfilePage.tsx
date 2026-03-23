
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import UserProgress, { BADGES } from '../components/UserProgress';

const ProfilePage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
    const { user, isAuthenticated, updateProfile, logout } = useAuth();
    const { t } = useI18n();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        educationLevel: user?.education?.level || 'class12',
        stream: user?.education?.stream || '',
        institution: user?.education?.institution || '',
    });

    if (!isAuthenticated || !user) {
        return (
            <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please login to view your profile</h2>
                    <button
                        onClick={() => onNavigate('home')}
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Go to Home →
                    </button>
                </div>
            </div>
        );
    }

    const handleSave = () => {
        updateProfile({
            fullName: editForm.fullName,
            phone: editForm.phone,
            education: {
                level: editForm.educationLevel as any,
                stream: editForm.stream,
                institution: editForm.institution,
            },
        });
        setIsEditing(false);
    };

    return (
        <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700">
            {/* Header */}
            <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
                </div>

                <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-blue-500/30">
                                {user.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#050505]">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left flex-grow">
                            <h1 className="text-4xl font-bold text-white mb-2">{user.fullName}</h1>
                            <p className="text-gray-200 mb-4">{user.email}</p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className="px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-400 capitalize">
                                    {user.role}
                                </span>
                                <span className="px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-400">
                                    Level {Math.floor((user.points || 0) / 100) + 1}
                                </span>
                                <span className="px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm text-emerald-400">
                                    {user.points || 0} Points
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-all"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={logout}
                                className="px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/20 transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-6 max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Progress Card */}
                    <div>
                        <UserProgress />
                    </div>

                    {/* Details Card */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6">Profile Details</h3>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-200 uppercase mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={editForm.fullName}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                                        placeholder="Enter your full name"
                                        aria-label="Full Name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-200 uppercase mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-200 uppercase mb-2">Education Level</label>
                                    <select
                                        value={editForm.educationLevel}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, educationLevel: e.target.value }))}
                                        aria-label="Education Level"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="class10" className="bg-gray-900">Class 10</option>
                                        <option value="class12" className="bg-gray-900">Class 12</option>
                                        <option value="undergraduate" className="bg-gray-900">Undergraduate</option>
                                        <option value="postgraduate" className="bg-gray-900">Postgraduate</option>
                                        <option value="working" className="bg-gray-900">Working Professional</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-200 uppercase mb-2">Stream/Field</label>
                                    <input
                                        type="text"
                                        value={editForm.stream}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, stream: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="e.g., Science, Commerce, Arts"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleSave}
                                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition-all"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-gray-200">Email</span>
                                    <span className="text-white">{user.email}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-gray-200">Phone</span>
                                    <span className="text-white">{user.phone || 'Not set'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-gray-200">Education Level</span>
                                    <span className="text-white capitalize">{user.education?.level?.replace('class', 'Class ') || 'Not set'}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-gray-200">Stream</span>
                                    <span className="text-white">{user.education?.stream || 'Not set'}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span className="text-gray-200">Member Since</span>
                                    <span className="text-white">{new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Completed Assessments */}
                <div className="mt-8 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Your Activity</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <p className="text-3xl font-bold text-blue-400">{user.completedAssessments?.length || 0}</p>
                            <p className="text-xs text-gray-300 uppercase mt-1">Assessments</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <p className="text-3xl font-bold text-purple-400">{user.badges?.length || 0}</p>
                            <p className="text-xs text-gray-300 uppercase mt-1">Badges</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <p className="text-3xl font-bold text-emerald-400">3</p>
                            <p className="text-xs text-gray-300 uppercase mt-1">Bookmarked Colleges</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <p className="text-3xl font-bold text-orange-400">7</p>
                            <p className="text-xs text-gray-300 uppercase mt-1">Day Streak</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
