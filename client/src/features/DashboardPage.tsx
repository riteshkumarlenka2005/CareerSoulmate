import React, { useEffect, useState } from 'react';
import ApiClient from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

interface DashboardData {
  welcome: { name: string; points: number; badges: string[]; level: number };
  profile_completion: number;
  assessment_status: { completed: string[]; pending: string[]; total_completed: number; total: number };
  recent_attempts: any[];
  top_recommendations: any[];
  saved_count: number;
  notifications: { unread_count: number; recent: any[] };
  target_career: string | null;
  trending_market: any[];
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await ApiClient.get('/api/dashboard');
        setData(res.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="text-blue-400 text-sm underline">Retry</button>
      </div>
    );
  }

  const d = data!;
  const completionPct = d.profile_completion || 0;
  const assessmentPct = d.assessment_status.total > 0
    ? Math.round((d.assessment_status.total_completed / d.assessment_status.total) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 rounded-2xl p-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-black text-white mb-1">Welcome back, {d.welcome.name?.split(' ')[0] || 'User'} 👋</h1>
            <p className="text-gray-400 text-sm">Here's your career exploration summary</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-5 py-3 text-center">
              <p className="text-yellow-400 text-2xl font-black">{d.welcome.points}</p>
              <p className="text-yellow-400/60 text-[10px] uppercase tracking-wider font-bold">Points</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-5 py-3 text-center">
              <p className="text-blue-400 text-2xl font-black">Lv.{d.welcome.level}</p>
              <p className="text-blue-400/60 text-[10px] uppercase tracking-wider font-bold">Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Profile Completion */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">Profile</span>
            <span className="text-white font-black text-lg">{completionPct}%</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
          </div>
          <Link to="/profile" className="text-blue-400 text-xs mt-3 inline-block hover:underline">Complete Profile →</Link>
        </div>

        {/* Assessments */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">Assessments</span>
            <span className="text-white font-black text-lg">{d.assessment_status.total_completed}/{d.assessment_status.total}</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all" style={{ width: `${assessmentPct}%` }} />
          </div>
          {d.assessment_status.pending.length > 0 && (
            <Link to="/assessment/start" className="text-green-400 text-xs mt-3 inline-block hover:underline">
              Take {d.assessment_status.pending[0]} →
            </Link>
          )}
        </div>

        {/* Saved Items */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">Saved</span>
            <span className="text-white font-black text-lg">{d.saved_count}</span>
          </div>
          <p className="text-gray-500 text-xs">Careers and items you've bookmarked</p>
          <Link to="/saved" className="text-purple-400 text-xs mt-3 inline-block hover:underline">View Saved →</Link>
        </div>

        {/* Notifications */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-bold">Notifications</span>
            {d.notifications.unread_count > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{d.notifications.unread_count}</span>
            )}
          </div>
          <p className="text-gray-500 text-xs">{d.notifications.unread_count} unread notifications</p>
          <Link to="/notifications" className="text-orange-400 text-xs mt-3 inline-block hover:underline">View All →</Link>
        </div>
      </div>

      {/* Recommendations + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live Market Insights (Trending) */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 lg:col-span-2">
           <div className="flex items-center justify-between mb-5">
             <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2"><span className="text-pink-500">🔥</span> Live Market Trends</h3>
             <span className="text-gray-500 text-xs">Updated globally</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {d.trending_market && d.trending_market.map((insight: any, i: number) => (
                 <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl hover:bg-white/[0.04] transition-all">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-white font-bold text-sm truncate">{insight.career?.title}</h4>
                       <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] uppercase font-bold rounded">Score: {insight.demand_score}</span>
                    </div>
                    {insight.salary_min && insight.salary_max && (
                       <p className="text-emerald-400 text-xs font-bold mb-3">💰 ${insight.salary_min.toLocaleString()} - ${insight.salary_max.toLocaleString()}</p>
                    )}

                    {insight.top_skills && insight.top_skills.length > 0 && (
                       <div className="flex flex-wrap gap-1 mb-3">
                          {insight.top_skills.slice(0, 3).map((skill: string, sI: number) => (
                             <span key={sI} className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] uppercase rounded font-bold">
                                {skill}
                             </span>
                          ))}
                          {insight.top_skills.length > 3 && <span className="text-gray-500 text-[10px]">+{insight.top_skills.length - 3}</span>}
                       </div>
                    )}
                    
                    {insight.related_news_articles && insight.related_news_articles.length > 0 && (
                       <div className="mt-3 pt-3 border-t border-white/5">
                          <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">📰 Latest Industry News</p>
                          <a href={insight.related_news_articles[0].url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-xs line-clamp-2">
                             {insight.related_news_articles[0].title}
                          </a>
                       </div>
                    )}
                 </div>
              ))}
              {(!d.trending_market || d.trending_market.length === 0) && (
                 <p className="text-gray-500 text-xs col-span-3 text-center py-4">Market insights currently syncing...</p>
              )}
           </div>
        </div>

        {/* Top Recommendations */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Top Recommendations</h3>
            <Link to="/recommendations" className="text-blue-400 text-xs hover:underline">View All</Link>
          </div>
          {d.top_recommendations.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-sm mb-3">No recommendations yet</p>
              <Link to="/assessment/start" className="text-blue-400 text-xs underline">Complete assessments to get recommendations</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {d.top_recommendations.map((rec: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-sm shrink-0">
                    {rec.match_score || rec.rank}%
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{rec.career?.title || 'Career'}</p>
                    <p className="text-gray-500 text-xs truncate">{rec.career?.category || ''} • {rec.career?.short_description || ''}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Recent Assessment Attempts</h3>
          {d.recent_attempts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-sm">No assessment attempts yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {d.recent_attempts.map((attempt: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                  <div>
                    <p className="text-white text-sm font-medium">{attempt.assessment?.title || 'Assessment'}</p>
                    <p className="text-gray-500 text-xs">{new Date(attempt.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    attempt.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {attempt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { to: '/recommendations', label: 'Generate Recommendations', icon: '🎯', color: 'blue' },
          { to: '/career-explorer', label: 'Explore Careers', icon: '🔍', color: 'cyan' },
          { to: '/skill-gap', label: 'Skill Gap Analysis', icon: '📊', color: 'purple' },
          { to: '/report', label: 'Download Report', icon: '📄', color: 'green' },
        ].map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="bg-[#0a0a0a] border border-white/5 hover:border-white/10 rounded-xl p-5 text-center transition-all group hover:bg-white/[0.02]"
          >
            <span className="text-3xl block mb-3">{action.icon}</span>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">{action.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
