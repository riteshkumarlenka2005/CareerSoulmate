
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../services/api';
import { useAuth } from '../context/AuthContext';

/* ── Types matching backend models ── */
interface RoadmapData {
  _id: string;
  title: string;
  description: string;
  estimated_duration: string;
  difficulty_level: string;
}

interface ResourceLink {
  title: string;
  url: string;
  type: string;
}

interface SkillCovered {
  _id: string;
  name: string;
  category: string;
}

interface RoadmapStep {
  _id: string;
  step_no: number;
  title: string;
  description: string;
  duration_estimate: string;
  resource_links: ResourceLink[];
  skills_covered: SkillCovered[];
}

interface CareerData {
  _id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  growth_outlook: string;
  difficulty_level: string;
}

interface RecommendedCareer {
  _id: string;
  career: CareerData;
  match_score: number;
}

const RESOURCE_ICONS: Record<string, string> = {
  video: '🎥',
  article: '📄',
  course: '🎓',
  tool: '🔧',
  other: '🔗',
};

const RoadmapPage: React.FC = () => {
  const navigate = useNavigate();
  const { careerId } = useParams<{ careerId: string }>();
  const { user } = useAuth();

  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [career, setCareer] = useState<CareerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // For career selection when no careerId
  const [recommendedCareers, setRecommendedCareers] = useState<RecommendedCareer[]>([]);
  const [loadingCareers, setLoadingCareers] = useState(false);

  // Step completion (local state)
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedResources, setExpandedResources] = useState<string | null>(null);

  // Load roadmap when careerId exists
  useEffect(() => {
    if (careerId) {
      loadRoadmap(careerId);
    } else {
      loadCareerSelection();
    }
  }, [careerId]);

  const loadRoadmap = async (id: string) => {
    try {
      setLoading(true);
      setError('');

      // Fetch roadmap + steps
      const roadmapRes = await ApiClient.get(`/api/careers/${id}/roadmap`);
      setRoadmap(roadmapRes.data?.roadmap || null);
      setSteps(roadmapRes.data?.steps || []);

      // Fetch career info via skills endpoint (which has the career id)
      try {
        const careerSkillsRes = await ApiClient.get(`/api/careers/${id}/skills`);
        // Try to get career info from the careers listing
        const careersRes = await ApiClient.get(`/api/careers?limit=100`);
        const found = (careersRes.data || []).find((c: any) => c._id === id);
        if (found) setCareer(found);
      } catch {
        // Career info not critical
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load roadmap');
    } finally {
      setLoading(false);
    }
  };

  const loadCareerSelection = async () => {
    try {
      setLoadingCareers(true);
      setLoading(false);
      // Try to get recommended careers
      const res = await ApiClient.get('/api/recommendations/latest');
      setRecommendedCareers(res.data?.recommendations || []);
    } catch {
      // If no recommendations, try getting all careers
      try {
        const res = await ApiClient.get('/api/careers?limit=12');
        const careers = (res.data || []).map((c: any) => ({
          _id: c._id,
          career: c,
          match_score: 0,
        }));
        setRecommendedCareers(careers);
      } catch { /* ignore */ }
    } finally {
      setLoadingCareers(false);
    }
  };

  const toggleComplete = (stepId: string) => {
    setCompletedSteps(prev =>
      prev.includes(stepId) ? prev.filter(i => i !== stepId) : [...prev, stepId]
    );
  };

  const overallProgress = steps.length > 0
    ? Math.round((completedSteps.length / steps.length) * 100)
    : 0;

  /* ── Career Selection View (no careerId) ── */
  if (!careerId) {
    return (
      <div className="bg-[#050505] text-white min-h-screen pb-20 animate-in fade-in duration-700 font-sans">
        <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 blur-[120px] rounded-full" />
          </div>
          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">
              CAREER ROADMAPS
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Choose Your <br/><span className="gradient-text">Trajectory.</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium leading-relaxed max-w-xl mx-auto">
              Select a career to view its personalized learning roadmap with step-by-step milestones.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-6 max-w-5xl mx-auto">
          {loadingCareers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-1/4 mb-4" />
                  <div className="h-6 bg-white/5 rounded w-3/4 mb-3" />
                  <div className="h-10 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          ) : recommendedCareers.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
              <p className="text-3xl mb-3">🗺️</p>
              <p className="text-gray-400 font-black uppercase tracking-widest text-sm mb-2">No careers available</p>
              <p className="text-gray-500 text-xs mb-6">Generate recommendations first to see roadmap options.</p>
              <button onClick={() => navigate('/recommendations')} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                Go to Recommendations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedCareers.map(rec => (
                <button
                  key={rec._id}
                  onClick={() => navigate(`/roadmap/${rec.career?._id || rec._id}`)}
                  className="group p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 transition-all text-left"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black text-blue-500/60 uppercase tracking-[0.2em]">
                      {rec.career?.category}
                    </span>
                    {rec.match_score > 0 && (
                      <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs font-black text-blue-400">
                        {rec.match_score}% match
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-black uppercase text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {rec.career?.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-medium line-clamp-2">
                    {rec.career?.short_description || 'View the career roadmap and learning path →'}
                  </p>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="text-sm font-black uppercase tracking-widest text-gray-400">Loading Roadmap</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <p className="text-4xl">⚠️</p>
          <h2 className="text-2xl font-black uppercase tracking-tight">Something went wrong</h2>
          <p className="text-gray-400 text-sm">{error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('/roadmap')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Back
            </button>
            <button onClick={() => loadRoadmap(careerId!)} className="px-6 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── No Roadmap Available ── */
  if (!roadmap || steps.length === 0) {
    return (
      <div className="bg-[#050505] text-white min-h-screen pb-20 animate-in fade-in duration-700 font-sans">
        <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black tracking-widest uppercase">
              NO ROADMAP YET
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              {career?.title || 'This Career'}
            </h1>
            <p className="text-gray-300 text-lg font-medium leading-relaxed max-w-xl mx-auto">
              A roadmap hasn't been created for this career yet. Check back soon or explore other careers.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <button onClick={() => navigate('/roadmap')} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Browse Other Careers
              </button>
              <button onClick={() => navigate('/career-explorer')} className="px-8 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
                Career Explorer
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ── Main Roadmap View ── */
  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. ROADMAP HERO */}
      <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 overflow-visible border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 md:p-8 lg:p-12">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">
                PERSONALIZED CAREER BLUEPRINT
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                {career?.title || roadmap.title} <br/><span className="gradient-text">Trajectory.</span>
              </h1>
              <div className="flex flex-wrap gap-8 pt-4">
                 {career && (
                   <>
                     <div>
                        <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">Category</p>
                        <p className="text-lg font-black text-white uppercase">{career.category}</p>
                     </div>
                     <div className="w-px h-12 bg-white/10 hidden sm:block" />
                   </>
                 )}
                 <div>
                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">Duration</p>
                    <p className="text-lg font-black text-blue-400 uppercase">{roadmap.estimated_duration || `${steps.length} Phases`}</p>
                 </div>
                 <div className="w-px h-12 bg-white/10 hidden sm:block" />
                 <div>
                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">Difficulty</p>
                    <p className="text-lg font-black text-white uppercase capitalize">{roadmap.difficulty_level}</p>
                 </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="w-full lg:w-96 p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                  <svg width="80" height="80" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10,5" /></svg>
               </div>
               <p className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Journey Sync</p>
               <div className="flex justify-between items-end mb-6">
                 <h3 className="text-5xl font-black text-white leading-none">{overallProgress}%</h3>
                 <span className="text-xs font-black text-gray-300 uppercase tracking-widest">{completedSteps.length}/{steps.length} Steps</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                 <div className="h-full bg-blue-600 shadow-[0_0_15px_#3b82f6] transition-all duration-500" style={{ width: `${overallProgress}%` }} />
               </div>
               <button onClick={() => navigate('/report')} className="w-full py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Download Report</button>
            </div>
          </div>
        </div>
      </section>

      {/* B. TIMELINE */}
      <section className="py-14 md:py-24 lg:py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8 lg:mb-10 flex items-center gap-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">The <span className="text-blue-500">Pipeline.</span></h2>
          <div className="h-px flex-grow bg-white/10" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-800 opacity-20" />

          <div className="space-y-32">
            {steps.map((step, idx) => {
              const isDone = completedSteps.includes(step._id);
              const isCurrent = idx === 0 && !isDone;

              return (
                <div key={step._id} className={`relative flex flex-col md:flex-row gap-5 md:p-8 lg:p-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Status Bubble */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-[24px] bg-black border-4 border-[#050505] z-10 flex items-center justify-center transition-all duration-500">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all duration-500 ${
                      isDone ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 
                      isCurrent ? 'bg-blue-600 shadow-[0_0_15px_#2563eb] animate-pulse' : 
                      'bg-white/5 border border-white/10 text-gray-300'
                    }`}>
                      {isDone ? '✓' : `${String(step.step_no).padStart(2, '0')}`}
                    </div>
                  </div>

                  {/* Date/Status Sidebar */}
                  <div className={`md:w-[45%] flex flex-col pt-4 ${idx % 2 !== 0 ? 'md:items-start text-left' : 'md:items-end text-right'}`}>
                     <span className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-2">
                       {step.duration_estimate || `Phase ${step.step_no}`}
                     </span>
                     <h3 className="text-3xl font-black uppercase text-white tracking-tighter mb-4">{step.title}</h3>
                     <p className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block ${
                       isDone ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 
                       isCurrent ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 
                       'text-gray-300 bg-white/5'
                     }`}>
                       {isDone ? 'Phase Completed' : isCurrent ? 'Active Milestone' : 'Upcoming Phase'}
                     </p>
                  </div>

                  {/* Card */}
                  <div className={`md:w-[45%] p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.04] border border-white/10 shadow-2xl transition-all duration-500 hover:border-blue-500/40 relative overflow-hidden group ${isCurrent ? 'ring-2 ring-blue-500/20 bg-blue-600/5' : ''}`}>
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                      backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }} />

                    <div className="relative z-10 space-y-10">
                      {/* Description */}
                      {step.description && (
                        <div className="space-y-4">
                          <h5 className="text-xs font-black text-gray-200 uppercase tracking-widest flex items-center gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                             Core Focus
                          </h5>
                          <p className="text-sm font-medium text-gray-300 leading-relaxed italic">
                             "{step.description}"
                          </p>
                        </div>
                      )}

                      {/* Skills Covered */}
                      {step.skills_covered && step.skills_covered.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {step.skills_covered.map(skill => (
                              <span key={skill._id} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-200 uppercase tracking-tight group-hover:bg-white/10 transition-all">
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resources */}
                      {step.resource_links && step.resource_links.length > 0 && (
                        <div className="pt-8 border-t border-white/10">
                           <button 
                             onClick={() => setExpandedResources(expandedResources === step._id ? null : step._id)}
                             className="flex items-center gap-3 text-xs font-black text-cyan-500 uppercase tracking-widest hover:text-cyan-400 transition-colors"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                             </svg>
                             {step.resource_links.length} Resource{step.resource_links.length > 1 ? 's' : ''} Available
                           </button>
                           {expandedResources === step._id && (
                             <div className="mt-4 space-y-2 animate-in slide-in-from-top-2">
                               {step.resource_links.map((link, li) => (
                                 <a
                                   key={li}
                                   href={link.url}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-all text-sm"
                                 >
                                   <span className="text-lg">{RESOURCE_ICONS[link.type] || '🔗'}</span>
                                   <span className="text-gray-300 hover:text-white font-medium">{link.title || link.url}</span>
                                   <span className="text-[10px] font-black text-gray-500 uppercase ml-auto">{link.type}</span>
                                 </a>
                               ))}
                             </div>
                           )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => navigate(`/skill-gap?career=${careerId}`)}
                          className="py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest border border-white/10 transition-all text-gray-200 hover:text-white"
                        >
                          Skill Gap
                        </button>
                        <button 
                          onClick={() => toggleComplete(step._id)}
                          className={`py-3 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                            isDone ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                          }`}
                        >
                          {isDone ? 'Complete ✓' : 'Finish Stage'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADVISOR CALLOUT */}
      <section className="py-10 px-4 md:py-20 md:px-6 bg-[#080808] border-y border-white/10">
        <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto flex flex-col md:flex-row items-center gap-6 md:p-12 lg:p-16">
          <div className="w-48 h-48 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
             <svg width="80" height="80" viewBox="0 0 24 24" className="text-blue-500 relative z-10" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8c-1.1 0-2.1.4-2.8 1.2M12 8c1.1 0 2.1.4 2.8 1.2M12 8v4m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
             </svg>
          </div>
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tight leading-none">Stuck at a <br/><span className="text-blue-500">Crossroad?</span></h3>
            <p className="text-gray-200 text-lg font-medium leading-relaxed">
              Your personalized roadmap is dynamic. If your interests shift or market data changes, the AI Soulmate will suggest a neural re-routing.
            </p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/assessment/start')} className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Re-sync Assessment</button>
              <button onClick={() => navigate('/chatbot')} className="px-8 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20">Talk to Advisor AI</button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-28 lg:py-40 px-6 text-center">
        <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 md:mb-10 lg:mb-12 leading-[0.9] tracking-tighter">
             Your Future <br/><span className="gradient-text">In Resolution.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => navigate('/career-explorer')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs">
               Explore Other Careers
             </button>
             <button onClick={() => navigate('/recommendations')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">
               View Recommendations
             </button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapPage;
