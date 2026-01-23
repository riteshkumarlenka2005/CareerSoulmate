
import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { useAuth } from '../contexts/AuthContext';

interface ForumPost {
    id: string;
    author: { name: string; avatar: string; role: string };
    title: string;
    content: string;
    category: 'career-advice' | 'college-guidance' | 'skills' | 'general';
    likes: number;
    replies: number;
    timestamp: string;
    isLiked: boolean;
}

const MOCK_POSTS: ForumPost[] = [
    {
        id: '1',
        author: { name: 'Priya Sharma', avatar: 'P', role: 'Career Counselor' },
        title: 'How to choose between Science and Commerce after Class 10?',
        content: 'Many students struggle with this decision. Here are some tips based on my 10 years of counseling experience...',
        category: 'college-guidance',
        likes: 45,
        replies: 12,
        timestamp: '2 hours ago',
        isLiked: false,
    },
    {
        id: '2',
        author: { name: 'Rahul Verma', avatar: 'R', role: 'IIT Bombay Alumni' },
        title: 'My journey from small town to IIT - Tips for JEE preparation',
        content: 'Coming from a small town with limited resources, I want to share how I cracked JEE Advanced...',
        category: 'career-advice',
        likes: 128,
        replies: 34,
        timestamp: '5 hours ago',
        isLiked: true,
    },
    {
        id: '3',
        author: { name: 'Ananya Gupta', avatar: 'A', role: 'Data Scientist' },
        title: 'Essential skills for a career in AI/ML in 2025',
        content: 'The AI landscape is rapidly evolving. Here are the skills that will be most valuable...',
        category: 'skills',
        likes: 89,
        replies: 21,
        timestamp: '1 day ago',
        isLiked: false,
    },
    {
        id: '4',
        author: { name: 'Vikram Singh', avatar: 'V', role: 'ITI Graduate' },
        title: 'NSQF Level 5 to starting my own electrical business',
        content: 'Sharing my journey from vocational training to entrepreneurship in the electrical sector...',
        category: 'skills',
        likes: 67,
        replies: 15,
        timestamp: '2 days ago',
        isLiked: false,
    },
];

const CATEGORIES = [
    { id: 'all', label: 'All Discussions', icon: '💬' },
    { id: 'career-advice', label: 'Career Advice', icon: '🎯' },
    { id: 'college-guidance', label: 'College Guidance', icon: '🏛️' },
    { id: 'skills', label: 'Skills & Training', icon: '⚡' },
    { id: 'general', label: 'General', icon: '📢' },
];

const CommunityPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [posts, setPosts] = useState(MOCK_POSTS);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const { t } = useI18n();

    const filteredPosts = selectedCategory === 'all'
        ? posts
        : posts.filter(p => p.category === selectedCategory);

    const toggleLike = (postId: string) => {
        setPosts(prev => prev.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    isLiked: !p.isLiked,
                    likes: p.isLiked ? p.likes - 1 : p.likes + 1,
                };
            }
            return p;
        }));
    };

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'career-advice': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'college-guidance': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'skills': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700">
            {/* Header */}
            <section className="relative pt-28 pb-16 px-6 border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black tracking-widest uppercase">
                        Community Forum
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                        Connect & <span className="gradient-text">Learn</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join thousands of students, mentors, and professionals sharing career insights
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-72 space-y-6">
                        {/* New Post Button */}
                        {isAuthenticated ? (
                            <button
                                onClick={() => setShowNewPostModal(true)}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center gap-3"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Start Discussion
                            </button>
                        ) : (
                            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
                                <p className="text-sm text-gray-400 mb-3">Join the conversation</p>
                                <button
                                    onClick={() => onNavigate('home')}
                                    className="text-sm text-purple-400 hover:text-purple-300 font-semibold"
                                >
                                    Login to post →
                                </button>
                            </div>
                        )}

                        {/* Categories */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Categories</h3>
                            <div className="space-y-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${selectedCategory === cat.id
                                                ? 'bg-purple-500/20 border border-purple-500/30 text-white'
                                                : 'hover:bg-white/5 text-gray-400'
                                            }`}
                                    >
                                        <span>{cat.icon}</span>
                                        <span className="text-sm font-medium">{cat.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Community Stats</h3>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Members</span>
                                <span className="text-white font-bold">12,450+</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Discussions</span>
                                <span className="text-white font-bold">2,340</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Mentors Online</span>
                                <span className="text-emerald-400 font-bold">23</span>
                            </div>
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="flex-grow space-y-6">
                        {/* Sort Options */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-white">
                                {selectedCategory === 'all' ? 'All Discussions' : CATEGORIES.find(c => c.id === selectedCategory)?.label}
                                <span className="text-gray-500 ml-2 text-sm font-normal">({filteredPosts.length})</span>
                            </h2>
                            <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-purple-500">
                                <option>Most Recent</option>
                                <option>Most Liked</option>
                                <option>Most Discussed</option>
                            </select>
                        </div>

                        {/* Posts List */}
                        <div className="space-y-4">
                            {filteredPosts.map(post => (
                                <div
                                    key={post.id}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all cursor-pointer group"
                                >
                                    {/* Author */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                            {post.author.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{post.author.name}</p>
                                            <p className="text-xs text-gray-500">{post.author.role} • {post.timestamp}</p>
                                        </div>
                                        <span className={`ml-auto px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getCategoryColor(post.category)}`}>
                                            {post.category.replace('-', ' ')}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                        {post.content}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                                            className={`flex items-center gap-2 text-sm transition-colors ${post.isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'
                                                }`}
                                        >
                                            <svg className="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            {post.likes}
                                        </button>
                                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            {post.replies} replies
                                        </button>
                                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors ml-auto">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                            Share
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mentorship CTA */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/20 rounded-3xl p-12 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Looking for a Mentor?</h3>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                        Connect with experienced professionals and alumni who can guide you through your career journey
                    </p>
                    <button className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all">
                        Browse Mentors
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CommunityPage;
