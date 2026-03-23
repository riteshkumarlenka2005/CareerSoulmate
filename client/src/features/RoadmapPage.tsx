
import React, { useState } from 'react';

interface MilestoneLayer {
  category: 'Academics' | 'Skills' | 'Exams' | 'Experience' | 'Certifications';
  items: string[];
}

interface Milestone {
  id: string;
  title: string;
  timeframe: string;
  why: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  layers: MilestoneLayer[];
  planB?: string;
}

const STUDENT_PROFILE = {
  name: 'Alex Johnson',
  currentLevel: 'Class 12 (Science PCM)',
  targetGoal: 'AI Research Scientist',
  timeline: '2025 - 2030',
  overallProgress: 15
};

const ROADMAP_DATA: Milestone[] = [
  {
    id: 'm1',
    title: 'THE FOUNDATION',
    timeframe: 'Current - Aug 2025',
    why: 'Establishing fundamental mastery in mathematical logic and initial coding syntax.',
    status: 'In Progress',
    layers: [
      { category: 'Academics', items: ['Board Exams Prep', 'Calculus Mastery'] },
      { category: 'Skills', items: ['Python Basics', 'Linear Algebra', 'Logic Flow'] },
      { category: 'Exams', items: ['JEE Main', 'CUET UG', 'BITSAT'] }
    ],
    planB: 'If JEE ranks are suboptimal, pivot to B.Sc (Hons) Computer Science via CUET at top Central Universities.'
  },
  {
    id: 'm2',
    title: 'ACADEMIC CORE (UG)',
    timeframe: 'Sept 2025 - May 2029',
    why: 'Acquiring formal credentials and structural knowledge in Computer Science & AI.',
    status: 'Not Started',
    layers: [
      { category: 'Academics', items: ['B.Tech CS / B.Sc AI Curriculum', 'Elective: Neuro-science'] },
      { category: 'Skills', items: ['DSA Mastery', 'Neural Network Architectures', 'MLOps'] },
      { category: 'Certifications', items: ['AWS Machine Learning Specialty', 'DeepLearning.AI Specs'] },
      { category: 'Experience', items: ['Open Source Contributions', 'College Hackathons'] }
    ],
    planB: 'Leverage NEP multi-exit: If professional opportunity arises, exit with Diploma (Year 2) and resume later via ABC.'
  },
  {
    id: 'm3',
    title: 'INDUSTRY IMMERSION',
    timeframe: 'Summer 2027 & 2028',
    why: 'Validating theoretical models against large-scale industrial datasets.',
    status: 'Not Started',
    layers: [
      { category: 'Experience', items: ['Research Internship at IIIT-H', 'Product Internship at Tech Giant'] },
      { category: 'Certifications', items: ['TensorFlow Developer Certificate'] },
      { category: 'Skills', items: ['System Design', 'Technical Writing'] }
    ]
  },
  {
    id: 'm4',
    title: 'CAREER ENTRY / GATEWAY',
    timeframe: 'June 2029',
    why: 'Launching into high-impact AI Research or Engineering roles.',
    status: 'Not Started',
    layers: [
      { category: 'Exams', items: ['GATE (for Masters)', 'Corporate Aptitude Tests'] },
      { category: 'Experience', items: ['Graduate Trainee Program', 'Junior Research Fellow'] }
    ],
    planB: 'Switch to AI Product Management if research funding is cyclical.'
  },
  {
    id: 'm5',
    title: 'ZENITH GROWTH',
    timeframe: '2030 & Beyond',
    why: 'Leading global AI ethics or architectural initiatives.',
    status: 'Not Started',
    layers: [
      { category: 'Academics', items: ['Specialized Masters / PhD (Part-time)'] },
      { category: 'Skills', items: ['Strategic Leadership', 'Stakeholder Advisory'] }
    ]
  }
];

const RoadmapPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [expandedPlanB, setExpandedPlanB] = useState<string | null>(null);

  const toggleComplete = (id: string) => {
    setCompletedMilestones(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. ROADMAP HERO (PERSONAL CONTEXT) */}
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
                {STUDENT_PROFILE.name}'s <br/><span className="gradient-text">Trajectory.</span>
              </h1>
              <div className="flex flex-wrap gap-8 pt-4">
                 <div>
                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">Target Destiny</p>
                    <p className="text-lg font-black text-white uppercase">{STUDENT_PROFILE.targetGoal}</p>
                 </div>
                 <div className="w-px h-12 bg-white/10 hidden sm:block" />
                 <div>
                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">Current Level</p>
                    <p className="text-lg font-black text-blue-400 uppercase">{STUDENT_PROFILE.currentLevel}</p>
                 </div>
                 <div className="w-px h-12 bg-white/10 hidden sm:block" />
                 <div>
                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-1">Active Window</p>
                    <p className="text-lg font-black text-white uppercase">{STUDENT_PROFILE.timeline}</p>
                 </div>
              </div>
            </div>

            <div className="w-full lg:w-96 p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                  <svg width="80" height="80" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10,5" /></svg>
               </div>
               <p className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Journey Sync</p>
               <div className="flex justify-between items-end mb-6">
                 <h3 className="text-5xl font-black text-white leading-none">{STUDENT_PROFILE.overallProgress}%</h3>
                 <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Alignment Rating: 9.8/10</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                 <div className="h-full bg-blue-600 shadow-[0_0_15px_#3b82f6]" style={{ width: `${STUDENT_PROFILE.overallProgress}%` }} />
               </div>
               <button className="w-full py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Download Roadmap Dossier</button>
            </div>
          </div>
        </div>
      </section>

      {/* B. CAREER JOURNEY TIMELINE (MAIN VISUAL) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8 lg:mb-10 md:mb-16 lg:mb-24 flex items-center gap-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">The <span className="text-blue-500">Pipeline.</span></h2>
          <div className="h-px flex-grow bg-white/10" />
        </div>

        <div className="relative">
          {/* Vertical Backbone Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-800 opacity-20" />

          <div className="space-y-32">
            {ROADMAP_DATA.map((milestone, idx) => {
              const isDone = completedMilestones.includes(milestone.id) || milestone.status === 'Completed';
              const isCurrent = milestone.status === 'In Progress' && !isDone;

              return (
                <div key={milestone.id} className={`relative flex flex-col md:flex-row gap-5 md:p-8 lg:p-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Status Indicator Bubble */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-[24px] bg-black border-4 border-[#050505] z-10 flex items-center justify-center transition-all duration-500">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black transition-all duration-500 ${
                      isDone ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 
                      isCurrent ? 'bg-blue-600 shadow-[0_0_15px_#2563eb] animate-pulse' : 
                      'bg-white/5 border border-white/10 text-gray-300'
                    }`}>
                      {isDone ? '✓' : `0${idx + 1}`}
                    </div>
                  </div>

                  {/* Date/Status Sidebar (Responsive) */}
                  <div className={`md:w-[45%] flex flex-col pt-4 ${idx % 2 !== 0 ? 'md:items-start text-left' : 'md:items-end text-right'}`}>
                     <span className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-2">{milestone.timeframe}</span>
                     <h3 className="text-3xl font-black uppercase text-white tracking-tighter mb-4 group-hover:text-blue-400 transition-colors">{milestone.title}</h3>
                     <p className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block ${
                       isDone ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 
                       isCurrent ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 
                       'text-gray-300 bg-white/5'
                     }`}>
                       {isDone ? 'Phase Completed' : isCurrent ? 'Active Milestone' : 'Upcoming Phase'}
                     </p>
                  </div>

                  {/* C. MULTI-DIMENSION LAYERS CARD */}
                  <div className={`md:w-[45%] p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.04] border border-white/10 shadow-2xl transition-all duration-500 hover:border-blue-500/40 relative overflow-hidden group ${isCurrent ? 'ring-2 ring-blue-500/20 bg-blue-600/5' : ''}`}>
                    {/* Animated Grid Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] grid-pattern pointer-events-none" />

                    <div className="relative z-10 space-y-10">
                      <div className="space-y-4">
                        <h5 className="text-xs font-black text-gray-200 uppercase tracking-widest flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                           Core Logic
                        </h5>
                        <p className="text-sm font-medium text-gray-300 leading-relaxed italic">
                           "{milestone.why}"
                        </p>
                      </div>

                      <div className="space-y-8">
                        {milestone.layers.map((layer, lIdx) => (
                          <div key={lIdx} className="space-y-3">
                            <p className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">{layer.category}</p>
                            <div className="flex flex-wrap gap-2">
                              {layer.items.map(item => (
                                <span key={item} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-200 uppercase tracking-tight group-hover:bg-white/10 transition-all">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* E. ALTERNATE PATH ALERT */}
                      {milestone.planB && (
                        <div className="pt-8 border-t border-white/10">
                           <button 
                             onClick={() => setExpandedPlanB(expandedPlanB === milestone.id ? null : milestone.id)}
                             className="flex items-center gap-3 text-xs font-black text-orange-500 uppercase tracking-widest hover:text-orange-400 transition-colors"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                             Strategic_Plan_B Analysis
                           </button>
                           {expandedPlanB === milestone.id && (
                             <p className="mt-4 p-5 rounded-2xl bg-orange-500/5 border border-orange-500/20 text-xs text-orange-200/80 leading-relaxed animate-in slide-in-from-top-2">
                               {milestone.planB}
                             </p>
                           )}
                        </div>
                      )}

                      {/* D. SMART MILESTONE ACTIONS */}
                      <div className="grid grid-cols-2 gap-4">
                        <button className="py-3 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest border border-white/10 transition-all text-gray-200 hover:text-white">Resources</button>
                        <button 
                          onClick={() => toggleComplete(milestone.id)}
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
              <button onClick={() => onNavigate('explorer')} className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all">Re-sync Assessment</button>
              <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="px-8 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20">Talk to Advisor AI</button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 md:mb-10 lg:mb-12 leading-[0.9] tracking-tighter">
             Your Future <br/><span className="gradient-text">In Resolution.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('colleges')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs">
               Match College to Roadmap
             </button>
             <button onClick={() => onNavigate('explorer')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">
               View Career Alternatives
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .grid-pattern {
          background-image: linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .animate-electric-flow {
          animation: flow 2s linear infinite;
        }
        @keyframes flow {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
};

export default RoadmapPage;
