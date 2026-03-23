
import React, { useState, useMemo } from 'react';

interface Recommendation {
  id: string;
  title: string;
  category: 'Skills' | 'Academics' | 'Exams' | 'Experience' | 'Career Exploration';
  priority: 'Critical' | 'High' | 'Medium';
  impactScore: number;
  why: string;
  benefit: string;
  timeRequired: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Specialist';
  status: 'new' | 'saved' | 'completed' | 'rejected';
}

const INITIAL_RECS: Recommendation[] = [
  {
    id: 'rec_01',
    title: 'Master Python Neural Frameworks',
    category: 'Skills',
    priority: 'Critical',
    impactScore: 95,
    why: 'Current market gap analysis shows your target roles (AI Scientist) demand 40% higher proficiency in PyTorch than your current profile.',
    benefit: 'Increases eligibility for Tier-1 internships by 65%.',
    timeRequired: '40 Hours',
    difficulty: 'Intermediate',
    status: 'new'
  },
  {
    id: 'rec_02',
    title: 'Apply for NAPS Research Internship',
    category: 'Experience',
    priority: 'High',
    impactScore: 88,
    why: 'Hands-on validation of theoretical models is the primary filter used by top engineering recruiters.',
    benefit: 'Secures a verified industry badge on your neural portfolio.',
    timeRequired: '3 Months (Part-time)',
    difficulty: 'Specialist',
    status: 'new'
  },
  {
    id: 'rec_03',
    title: 'Improve Verbal Aptitude Score',
    category: 'Exams',
    priority: 'Medium',
    impactScore: 72,
    why: 'Your last assessment showed a 15% lag in communication logic compared to the successful candidate average in "Research & Development".',
    benefit: 'Critical for passing final-round behavioral interviews.',
    timeRequired: '10 Hours',
    difficulty: 'Beginner',
    status: 'new'
  },
  {
    id: 'rec_04',
    title: 'Explore Quantum Computing Pathways',
    category: 'Career Exploration',
    priority: 'Medium',
    impactScore: 65,
    why: 'Emerging tech trends show a convergence between AI and Quantum. Early awareness provides a 2-year competitive advantage.',
    benefit: 'Opens "Plan B" options in high-frequency trading and security.',
    timeRequired: '4 Hours',
    difficulty: 'Specialist',
    status: 'new'
  },
  {
    id: 'rec_05',
    title: 'Complete CUET Domain Mock Test',
    category: 'Academics',
    priority: 'High',
    impactScore: 82,
    why: 'Your current preparation level for "Mathematics" is at 78th percentile. Aiming for 95th percentile secures top-tier university entry.',
    benefit: 'Direct impact on university seat allotment priority.',
    timeRequired: '3 Hours',
    difficulty: 'Intermediate',
    status: 'new'
  }
];

const CATEGORIES = ['All', 'Skills', 'Academics', 'Exams', 'Experience', 'Career Exploration'];

const AIRecsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [recs, setRecs] = useState<Recommendation[]>(INITIAL_RECS);
  const [filterCategory, setFilterCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'pending' | 'saved'>('pending');

  const filteredRecs = useMemo(() => {
    return recs.filter(r => {
      const matchesCategory = filterCategory === 'All' || r.category === filterCategory;
      const matchesTab = activeTab === 'pending' ? r.status === 'new' : r.status === 'saved';
      return matchesCategory && matchesTab;
    });
  }, [recs, filterCategory, activeTab]);

  const topThree = useMemo(() => {
    return [...recs].sort((a, b) => b.impactScore - a.impactScore).slice(0, 3);
  }, [recs]);

  const handleAction = (id: string, newStatus: Recommendation['status']) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. RECOMMENDATION SUMMARY PANEL */}
      <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 overflow-visible border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-600/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">
              LIVE GUIDANCE PROTOCOL
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Strategic <br/><span className="gradient-text">Directives.</span>
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Your career soulmate never sleeps. These prioritized actions are derived from 
              real-time market shifts and your latest academic progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {topThree.map((rec, i) => (
               <div key={rec.id} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative p-8 rounded-2xl bg-black border border-white/10 hover:border-white/20 transition-all flex flex-col h-full">
                     <div className="flex justify-between items-start mb-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-black uppercase tracking-widest ${
                          rec.priority === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {rec.priority} Priority
                        </span>
                        <div className="text-right">
                           <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">Impact</p>
                           <p className="text-xl font-black text-white">{rec.impactScore}%</p>
                        </div>
                     </div>
                     <h3 className="text-xl font-black uppercase text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                        {rec.title}
                     </h3>
                     <p className="text-xs text-gray-300 font-bold uppercase leading-relaxed mt-auto">
                        Ranked #0{i+1} in high-utility directives.
                     </p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* B. RECOMMENDATION CATEGORIES & MAIN LIST */}
      <section className="py-10 px-4 md:py-20 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 lg:mb-16 gap-5 md:p-8 lg:p-10">
          <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'pending' ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-300 hover:text-white'}`}
            >
              Pending Recommendations
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'saved' ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-300 hover:text-white'}`}
            >
              Saved For Later ({recs.filter(r => r.status === 'saved').length})
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
             {CATEGORIES.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setFilterCategory(cat)}
                 className={`px-6 py-2.5 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${filterCategory === cat ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* C. ACTIONABLE RECOMMENDATIONS LIST */}
        <div className="grid grid-cols-1 gap-6">
          {filteredRecs.map(rec => (
            <div key={rec.id} className="group p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-blue-500/30 transition-all duration-500 flex flex-col lg:flex-row items-center gap-5 md:p-8 lg:p-12 relative overflow-hidden">
               {/* Impact Gauge Visual */}
               <div className="lg:w-24 lg:h-24 rounded-2xl bg-blue-600/10 flex flex-col items-center justify-center shrink-0 border border-blue-500/20 group-hover:bg-blue-600 transition-all duration-500">
                  <span className="text-xs font-black text-blue-400 group-hover:text-blue-200 uppercase mb-1">ROI</span>
                  <span className="text-2xl font-black text-white">{rec.impactScore}</span>
               </div>

               <div className="flex-grow space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                     <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">{rec.category}</span>
                     <h3 className="text-2xl font-black uppercase text-white group-hover:text-blue-400 transition-colors tracking-tight">{rec.title}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5 md:p-8 lg:p-10">
                     <div className="space-y-4">
                        <p className="text-xs font-black text-gray-300 uppercase tracking-widest border-l-2 border-blue-600 pl-4">The Strategic Why</p>
                        <p className="text-sm text-gray-200 font-medium leading-relaxed italic">{rec.why}</p>
                     </div>
                     <div className="space-y-4">
                        <p className="text-xs font-black text-emerald-500 uppercase tracking-widest border-l-2 border-emerald-600 pl-4">Expected Dividend</p>
                        <p className="text-sm text-gray-200 font-medium leading-relaxed">{rec.benefit}</p>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-400 uppercase mb-1 tracking-widest">Investment</span>
                        <span className="text-sm font-black text-white uppercase">{rec.timeRequired}</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-400 uppercase mb-1 tracking-widest">Complexity</span>
                        <span className="text-sm font-black text-cyan-400 uppercase">{rec.difficulty}</span>
                     </div>
                  </div>
               </div>

               <div className="shrink-0 flex flex-col gap-3 min-w-[200px]">
                  <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20 transition-all active:scale-95">Start Execution</button>
                  {activeTab === 'pending' ? (
                    <button onClick={() => handleAction(rec.id, 'saved')} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all">Save For Later</button>
                  ) : (
                    <button onClick={() => handleAction(rec.id, 'new')} className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all">Move to Active</button>
                  )}
                  {/* E. FEEDBACK LOOP */}
                  <div className="flex justify-center gap-4 mt-2">
                     <button onClick={() => handleAction(rec.id, 'rejected')} title="Not Relevant" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-all border border-white/10 group/reject">
                        <svg className="w-4 h-4 text-gray-300 group-hover/reject:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                     </button>
                     <button onClick={() => alert('Feedback recorded. Neural models retraining...')} title="Highly Relevant" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-500/20 flex items-center justify-center transition-all border border-white/10 group/approve">
                        <svg className="w-4 h-4 text-gray-300 group-hover/approve:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                     </button>
                  </div>
               </div>
            </div>
          ))}

          {filteredRecs.length === 0 && (
            <div className="py-32 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-3xl">
               <p className="text-gray-300 font-black uppercase tracking-[0.3em]">No {activeTab} recommendations found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* D. ADAPTIVE UPDATES VISUAL SECTION */}
      <section className="py-32 px-6 bg-[#080808] border-y border-white/10 overflow-hidden">
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
                   <p className="text-xs font-black text-gray-300 uppercase tracking-widest">Optimizing pathways for 12,402 learners right now.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 md:mb-10 lg:mb-12 leading-[0.9] tracking-tighter">
             Confidence <br/><span className="gradient-text">Through Clarity.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('roadmap')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs">
               Review My Roadmap
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">
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
      `}</style>
    </div>
  );
};

export default AIRecsPage;
