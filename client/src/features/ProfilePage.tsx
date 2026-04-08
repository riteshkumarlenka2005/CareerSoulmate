
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import UserProgress, { BADGES } from '../components/UserProgress';
import ApiClient from '../services/api';

interface ProfileData {
    education_level: string;
    stream: string;
    occupation_status: string;
    city: string;
    state: string;
    date_of_birth: string;
    gender: string;
    interests_text: string;
    known_skills: string[];
    known_skills_ratings: Record<string, number>;
    work_preference: string;
    preferred_industries: string[];
    preferred_work_style: string;
    career_preference: string;
    bio: string;
    profile_completion: number;
    target_career: string;
}

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, updateProfile, logout } = useAuth();
    const { t } = useI18n();

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [profile, setProfile] = useState<ProfileData | null>(null);

    const [editForm, setEditForm] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        educationLevel: (user?.education?.level || 'class12') as string,
        stream: user?.education?.stream || '',
        institution: user?.education?.institution || '',
        bio: '',
        city: '',
        state: '',
        gender: '',
        occupation_status: '',
        work_preference: '',
    });

    // Load profile on mount
    useEffect(() => {
        if (isAuthenticated) {
            loadProfile();
        } else {
            setLoadingProfile(false);
        }
    }, [isAuthenticated]);

    const loadProfile = async () => {
        try {
            setLoadingProfile(true);
            const res = await ApiClient.get('/api/profile');
            const data = res.data;
            if (data?.profile) {
                setProfile(data.profile);
                // Pre-fill edit form with API data
                setEditForm(prev => ({
                    ...prev,
                    fullName: data.user?.fullName || prev.fullName,
                    phone: data.user?.phone || prev.phone,
                    educationLevel: data.profile.education_level || data.user?.education?.level || prev.educationLevel,
                    stream: data.profile.stream || data.user?.education?.stream || prev.stream,
                    institution: data.user?.education?.institution || prev.institution,
                    bio: data.profile.bio || '',
                    city: data.profile.city || '',
                    state: data.profile.state || '',
                    gender: data.profile.gender || '',
                    occupation_status: data.profile.occupation_status || '',
                    work_preference: data.profile.work_preference || '',
                }));
            }
        } catch (err: any) {
            console.error('Failed to load profile:', err.message);
        } finally {
            setLoadingProfile(false);
        }
    };

    if (!isAuthenticated || !user) {
        return (
            <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Please login to view your profile</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Go to Home →
                    </button>
                </div>
            </div>
        );
    }

    const handleSave = async () => {
        try {
            setSaving(true);
            setSaveMessage(null);

            // Client-side validation
            if (!editForm.fullName || editForm.fullName.trim().length < 2) {
                setSaveMessage({ type: 'error', text: 'Full Name must be at least 2 characters' });
                setSaving(false);
                return;
            }

            const payload: any = {
                fullName: editForm.fullName.trim(),
                phone: editForm.phone,
                education: {
                    level: editForm.educationLevel,
                    stream: editForm.stream,
                    institution: editForm.institution,
                },
                // Extended profile fields
                education_level: editForm.educationLevel,
                stream: editForm.stream,
                bio: editForm.bio,
                city: editForm.city,
                state: editForm.state,
                gender: editForm.gender,
                occupation_status: editForm.occupation_status,
                work_preference: editForm.work_preference,
            };

            const res = await ApiClient.put('/api/profile', payload);

            if (!res.success) {
                throw new Error(res.message || 'Failed to save profile');
            }

            // Update local auth state with the returned user data
            if (res.data?.user) {
                updateProfile({
                    fullName: res.data.user.fullName,
                    phone: res.data.user.phone,
                    education: res.data.user.education,
                });
            }

            // Update profile data
            if (res.data?.profile) {
                setProfile(res.data.profile);
            }

            setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);

            // Auto-hide success message
            setTimeout(() => setSaveMessage(null), 3000);
        } catch (err: any) {
            console.error('Save error:', err);
            const errorMsg = err.errors?.[0]?.message || err.message || 'Failed to save profile';
            setSaveMessage({ type: 'error', text: errorMsg });
        } finally {
            setSaving(false);
        }
    };

    const profileCompletion = profile?.profile_completion || 0;

    return (
        <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700">
            {/* Header */}
            <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
                </div>

                <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto relative z-10">
                    {/* Save message toast */}
                    {saveMessage && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center justify-between animate-in slide-in-from-top-2 ${
                            saveMessage.type === 'success'
                                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}>
                            <span>{saveMessage.text}</span>
                            <button onClick={() => setSaveMessage(null)} className="text-xs opacity-60 hover:opacity-100">✕</button>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl shadow-blue-500/30">
                                {user.fullName.charAt(0).toUpperCase()}
                            </div>
                            {profileCompletion >= 80 && (
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#050505]">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
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
                                    {profileCompletion}% Complete
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
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 sm:p-6 w-full min-w-0 overflow-x-hidden">
                        <h3 className="text-lg font-bold text-white mb-6">Profile Details</h3>

                        {loadingProfile ? (
                            <div className="space-y-4">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="flex justify-between py-3 border-b border-white/10 animate-pulse">
                                        <div className="h-4 bg-white/5 rounded w-20" />
                                        <div className="h-4 bg-white/5 rounded w-32" />
                                    </div>
                                ))}
                            </div>
                        ) : isEditing ? (
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
                                <div>
                                    <label className="block text-xs font-bold text-gray-200 uppercase mb-2">City</label>
                                    <input
                                        type="text"
                                        value={editForm.city}                                        maxLength={100}                                        onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="e.g., Mumbai, Delhi"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-200 uppercase mb-2">Gender</label>
                                    <select
                                        value={editForm.gender}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, gender: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="" className="bg-gray-900">Select</option>
                                        <option value="male" className="bg-gray-900">Male</option>
                                        <option value="female" className="bg-gray-900">Female</option>
                                        <option value="other" className="bg-gray-900">Other</option>
                                        <option value="prefer_not_to_say" className="bg-gray-900">Prefer not to say</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-200 uppercase mb-2">Work Preference</label>
                                    <select
                                        value={editForm.work_preference}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, work_preference: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="" className="bg-gray-900">Select</option>
                                        <option value="remote" className="bg-gray-900">Remote</option>
                                        <option value="office" className="bg-gray-900">Office</option>
                                        <option value="hybrid" className="bg-gray-900">Hybrid</option>
                                        <option value="field" className="bg-gray-900">Field Work</option>
                                        <option value="freelance" className="bg-gray-900">Freelance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-200 uppercase mb-2">Bio</label>
                                    <textarea
                                        value={editForm.bio}
                                        maxLength={500}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                    <div className="text-right text-xs text-gray-400 mt-1">
                                        {(editForm.bio || '').length} / 500
                                    </div>
                                </div>
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                    >
                                        {saving && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                                        {saving ? 'Saving…' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-white/10 gap-1">
                                    <span className="text-gray-200 text-sm sm:text-base">Email</span>
                                    <span className="text-white text-sm sm:text-base break-all">{user.email}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-white/10 gap-1">
                                    <span className="text-gray-200 text-sm sm:text-base">Phone</span>
                                    <span className="text-white text-sm sm:text-base">{user.phone || 'Not set'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-white/10 gap-1">
                                    <span className="text-gray-200 text-sm sm:text-base">Education Level</span>
                                    <span className="text-white text-sm sm:text-base capitalize">{(profile?.education_level || user.education?.level || '')?.replace('class', 'Class ') || 'Not set'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-white/10 gap-1">
                                    <span className="text-gray-200 text-sm sm:text-base">Stream</span>
                                    <span className="text-white text-sm sm:text-base">{profile?.stream || user.education?.stream || 'Not set'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-white/10 gap-1">
                                    <span className="text-gray-200 text-sm sm:text-base">City</span>
                                    <span className="text-white text-sm sm:text-base">{profile?.city || 'Not set'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-white/10 gap-1">
                                    <span className="text-gray-200 text-sm sm:text-base">Gender</span>
                                    <span className="text-white text-sm sm:text-base capitalize">{profile?.gender?.replace('_', ' ') || 'Not set'}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-white/10 gap-1">
                                    <span className="text-gray-200 text-sm sm:text-base">Work Preference</span>
                                    <span className="text-white text-sm sm:text-base capitalize">{profile?.work_preference || 'Not set'}</span>
                                </div>
                                {profile?.bio && (
                                    <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-white/10 gap-1">
                                        <span className="text-gray-200 text-sm sm:text-base">Bio</span>
                                        <span className="text-white text-sm sm:text-base sm:text-right w-full sm:max-w-[200px] break-words">{profile.bio}</span>
                                    </div>
                                )}
                                <div className="flex flex-col sm:flex-row justify-between py-3 gap-1">
                                    <span className="text-gray-200 text-sm sm:text-base">Member Since</span>
                                    <span className="text-white text-sm sm:text-base">{new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Activity */}
                <div className="mt-8 bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 sm:p-6 w-full min-w-0">
                    <h3 className="text-lg font-bold text-white mb-6">Your Activity</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <p className="text-3xl font-bold text-blue-400">{user.completedAssessments?.length || 0}</p>
                            <p className="text-xs text-gray-300 uppercase mt-1">Assessments</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <p className="text-3xl font-bold text-purple-400">{user.badges?.length || 0}</p>
                            <p className="text-xs text-gray-300 uppercase mt-1">Badges</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <p className="text-3xl font-bold text-emerald-400">{profileCompletion}%</p>
                            <p className="text-xs text-gray-300 uppercase mt-1">Profile Complete</p>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                            <p className="text-3xl font-bold text-orange-400">{user.points || 0}</p>
                            <p className="text-xs text-gray-300 uppercase mt-1">Points</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProfilePage;
