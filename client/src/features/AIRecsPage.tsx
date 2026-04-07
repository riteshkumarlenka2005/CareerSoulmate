
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../services/api';

/* ── Types matching backend Recommendation model ── */
interface ScoreBreakdown {
  interest_match: number;
  skill_match: number;
  education_match: number;
  preference_match: number;
  stage_fit: number;
}

interface CareerInfo {
  _id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  salary_range?: { min: number; max: number; currency: string };
  growth_outlook: string;
  difficulty_level: string;
  remote_friendly: boolean;
  beginner_friendly: boolean;
}

interface Recommendation {
  _id: string;
  career: CareerInfo;
  match_score: number;
  score_breakdown: ScoreBreakdown;
  reason_text: string;
  reason_points: string[];
  rank: number;
  batch_id: string;
  createdAt: string;
}

const BREAKDOWN_LABELS: Record<keyof ScoreBreakdown, { label: string; color: string }> = {
  interest_match:   { label: 'Interest',   color: 'text-purple-400' },
  skill_match:      { label: 'Skills',     color: 'text-cyan-400' },
  education_match:  { label: 'Education',  color: 'text-emerald-400' },
  preference_match: { label: 'Preference', color: 'text-orange-400' },
  stage_fit:        { label: 'Stage Fit',  color: 'text-blue-400' },
};

const GROWTH_LABELS: Record<string, string> = {
  very_high: 'Very High', high: 'High', medium: 'Medium', low: 'Low',
};

const AIRecsPage: React.FC = () => {
  const navigate = useNavigate();

  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const [filterCategory, setFilterCategory] = useState('All');

  /* ── Load latest recs on mount ── */
  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await ApiClient.get('/api/recommendations/latest');
      setRecs(res.data?.recommendations || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError('');
      const res = await ApiClient.post('/api/recommendations/generate');
      // After generation, reload latest
      await loadRecommendations();
    } catch (err: any) {
      setError(err.message || 'Failed to generate recommendations. Complete assessments first.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async (careerId: string) => {
    try {
      setSavingId(careerId);
      await ApiClient.post('/api/saved', { item_type: 'career', item_id: careerId });
    } catch {
      // silently ignore duplicates
    } finally {
      setSavingId(null);
    }
  };

  /* ── Derived data ── */
  const categories = useMemo(() => {
    const cats = new Set(recs.map(r => r.career?.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, [recs]);

  const filteredRecs = useMemo(() => {
    if (filterCategory === 'All') return recs;
    return recs.filter(r => r.career?.category === filterCategory);
  }, [recs, filterCategory]);

  const topThree = useMemo(() => {
    return [...recs].sort((a, b) => b.match_score - a.match_score).slice(0, 3);
  }, [recs]);

  const formatSalary = (range?: CareerInfo['salary_range']) => {
    if (!range || (!range.min && !range.max)) return null;
    const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;
    return `${fmt(range.min)} – ${fmt(range.max)}`;
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. HERO */}
      <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 overflow-visible border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-600/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">
              AI-POWERED GUIDANCE
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Strategic <br/><span className="gradient-text">Directives.</span>
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Your career soulmate's prioritized career matches, derived from 
              your assessments and profile data.
            </p>
            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-wait text-white rounded-2xl font-black transition-all shadow-2xl shadow-blue-600/30 uppercase tracking-[0.2em] text-xs"
            >
              {generating ? (
                <span className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Your Profile…
                </span>
              ) : recs.length > 0 ? 'Re-Generate Recommendations' : 'Generate Recommendations'}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="max-w-2xl mx-auto mb-10 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center justify-between">
              <span>{error}</span>
              <button onClick={loadRecommendations} className="text-xs font-black uppercase tracking-widest hover:text-red-300">Retry</button>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-1/3 mb-6" />
                  <div className="h-6 bg-white/5 rounded w-3/4 mb-4" />
                  <div className="h-16 bg-white/5 rounded mb-4" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : recs.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl max-w-2xl mx-auto">
              <p className="text-3xl mb-3">🧭</p>
              <p className="text-gray-300 font-black uppercase tracking-widest text-sm mb-2">No recommendations yet</p>
              <p className="text-gray-500 text-xs">Complete your assessments and click "Generate Recommendations" to get started.</p>
            </div>
          ) : (
            /* TOP 3 CARDS */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topThree.map((rec, i) => (
                <div key={rec._id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
                  <div className="relative p-8 rounded-2xl bg-black border border-white/10 hover:border-white/20 transition-all flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-black uppercase tracking-widest ${
                        rec.match_score >= 80 ? 'bg-green-500/20 text-green-400' :
                        rec.match_score >= 60 ? 'bg-blue-500/20 text-blue-400' :
                        'bg-orange-500/20 text-orange-400'
                      }`}>
                        #{i + 1} Match
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">Score</p>
                        <p className="text-xl font-black text-white">{rec.match_score}%</p>
                      </div>
                    </div>
                    <p className="text-xs font-black text-blue-500/60 uppercase tracking-[0.2em] mb-2">{rec.career?.category}</p>
                    <h3 className="text-xl font-black uppercase text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                      {rec.career?.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4 flex-grow line-clamp-2">
                      {rec.career?.short_description}
                    </p>
                    <p className="text-xs text-gray-300 font-bold uppercase leading-relaxed mt-auto">
                      Ranked #{rec.rank} by AI match engine.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* B. FULL RECOMMENDATION LIST */}
      {recs.length > 0 && (
        <section className="py-10 px-4 md:py-20 md:px-6 max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-6 py-2.5 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${
                  filterCategory === cat 
                    ? 'bg-blue-500/10 border-blue-500 text-blue-400' 
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* C. DETAILED CARDS */}
          <div className="grid grid-cols-1 gap-6">
            {filteredRecs.map(rec => (
              <div key={rec._id} className="group p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-blue-500/30 transition-all duration-500 flex flex-col lg:flex-row items-start gap-6 relative overflow-hidden">
                {/* Score Gauge */}
                <div className="lg:w-24 lg:h-24 rounded-2xl bg-blue-600/10 flex flex-col items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-600 transition-all duration-500">
                  <span className="text-xs font-black text-blue-400 group-hover:text-blue-200 uppercase mb-1">Match</span>
                  <span className="text-2xl font-black text-white">{rec.match_score}</span>
                </div>

                <div className="flex-grow space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">{rec.career?.category}</span>
                    <h3 className="text-2xl font-black uppercase text-white group-hover:text-blue-400 transition-colors tracking-tight">{rec.career?.title}</h3>
                  </div>
                  
                  {/* Reason Points (from API) */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-4">
                      <p className="text-xs font-black text-gray-300 uppercase tracking-widest border-l-2 border-blue-600 pl-4">Why This Career?</p>
                      <ul className="space-y-2 pl-4">
                        {(rec.reason_points || []).map((point, pi) => (
                          <li key={pi} className="text-sm text-gray-200 font-medium leading-relaxed flex items-start gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Score Breakdown */}
                    <div className="space-y-4">
                      <p className="text-xs font-black text-emerald-500 uppercase tracking-widest border-l-2 border-emerald-600 pl-4">Match Breakdown</p>
                      <div className="space-y-2">
                        {rec.score_breakdown && Object.entries(BREAKDOWN_LABELS).map(([key, meta]) => {
                          const score = rec.score_breakdown[key as keyof ScoreBreakdown] || 0;
                          return (
                            <div key={key} className="flex items-center gap-3">
                              <span className={`text-[10px] font-black uppercase tracking-wider w-20 ${meta.color}`}>{meta.label}</span>
                              <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, score)}%` }} />
                              </div>
                              <span className="text-xs font-black text-gray-400 w-8 text-right">{Math.round(score)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Info Tags */}
                  <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
                    {formatSalary(rec.career?.salary_range) && (
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-400 uppercase mb-1 tracking-widest">Salary</span>
                        <span className="text-sm font-black text-white uppercase">{formatSalary(rec.career?.salary_range)}</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-400 uppercase mb-1 tracking-widest">Growth</span>
                      <span className="text-sm font-black text-cyan-400 uppercase">{GROWTH_LABELS[rec.career?.growth_outlook] || rec.career?.growth_outlook}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-400 uppercase mb-1 tracking-widest">Difficulty</span>
                      <span className="text-sm font-black text-white uppercase capitalize">{rec.career?.difficulty_level}</span>
                    </div>
                    {rec.career?.remote_friendly && (
                      <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase rounded-lg border border-cyan-500/20 self-center">Remote</span>
                    )}
                    {rec.career?.beginner_friendly && (
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-black uppercase rounded-lg border border-green-500/20 self-center">Beginner</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="shrink-0 flex flex-col gap-3 min-w-[200px]">
                  <button
                    onClick={() => navigate(`/skill-gap?career=${rec.career?._id}`)}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20 transition-all active:scale-95"
                  >
                    Analyze Skill Gap
                  </button>
                  <button
                    onClick={() => navigate(`/roadmap/${rec.career?._id}`)}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
                  >
                    View Roadmap
                  </button>
                  <button
                    onClick={() => handleSave(rec.career?._id)}
                    disabled={savingId === rec.career?._id}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all disabled:opacity-40"
                  >
                    {savingId === rec.career?._id ? 'Saving…' : 'Save Career'}
                  </button>
                </div>
              </div>
            ))}

            {filteredRecs.length === 0 && (
              <div className="py-14 md:py-24 lg:py-32 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
                <p className="text-gray-300 font-black uppercase tracking-[0.3em]">No recommendations found in this category.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* D. ADAPTIVE UPDATES VISUAL SECTION */}
      <section className="py-14 md:py-24 lg:py-32 px-6 bg-[#080808] border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="relative">
                <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="relative p-5 md:p-8 lg:p-12 rounded-[60px] bg-white/[0.04] border border-white/10 overflow-hidden">
                   <div className="flex flex-col gap-5 md:p-8 lg:p-10">
                      {[
                        { t: "Dynamic Re-Calibration", d: "As you complete courses, our AI reassesses your skill gaps in real-time.", i: "🔄" },
                        { t: "Market Sentiment Sync", d: "Global hiring trends update these cards every 24 hours.", i: "📊" },
                        { t: "Neural Progress Ring", d: "Visualize how each action moves the needle on your career destiny.", i: "⭕" }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-8 items-start group">
                           <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-blue-600 transition-all shrink-0">
                              {item.i}
                           </div>
                           <div className="space-y-2">
                              <h4 className="text-sm font-black uppercase text-white tracking-widest">{item.t}</h4>
                              <p className="text-sm text-gray-300 font-bold uppercase leading-relaxed">{item.d}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="space-y-10">
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">The Living <br/><span className="text-blue-500">Algorithm.</span></h2>
                <p className="text-gray-200 text-xl font-medium leading-relaxed">
                   Career Soulmate isn't a static plan. It's a continuous intelligence layer. 
                   When you evolve, your recommendations evolve. When the market shifts, 
                   your priorities pivot instantly.
                </p>
                <div className="flex items-center gap-6">
                   <div className="flex -space-x-4">
                      {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-[#080808] bg-blue-500/20 flex items-center justify-center text-xs font-black">AI</div>)}
                   </div>
                   <p className="text-xs font-black text-gray-300 uppercase tracking-widest">Optimizing pathways for learners right now.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-16 md:py-28 lg:py-40 px-6 text-center">
        <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 md:mb-10 lg:mb-12 leading-[0.9] tracking-tighter">
             Confidence <br/><span className="gradient-text">Through Clarity.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => navigate('/roadmap')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs">
               Review My Roadmap
             </button>
             <button onClick={() => navigate('/chatbot')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">
               Talk to AI Advisor
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
      `}
      </style>
    </div>
  );
};

export default AIRecsPage;
