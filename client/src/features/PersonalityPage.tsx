
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type PageView = 'intro' | 'assessment' | 'results';

interface PersonalityTrait {
  id: string;
  name: string;
  description: string;
  leftLabel: string;
  rightLabel: string;
  color: string;
}

const PERSONALITY_TRAITS: PersonalityTrait[] = [
  { id: 'social', name: 'Social Energy', description: 'How you recharge and interact with others.', leftLabel: 'Introverted', rightLabel: 'Extroverted', color: 'blue' },
  { id: 'operational', name: 'Operational Style', description: 'How you manage your time and tasks.', leftLabel: 'Structured', rightLabel: 'Flexible', color: 'cyan' },
  { id: 'decision', name: 'Decision Pattern', description: 'The primary filter for your choices.', leftLabel: 'Analytical', rightLabel: 'Intuitive', color: 'indigo' },
  { id: 'collaboration', name: 'Collaboration Mode', description: 'Your preferred environment for impact.', leftLabel: 'Independent', rightLabel: 'Team-Oriented', color: 'purple' },
  { id: 'risk', name: 'Risk Appetite', description: 'How you handle uncertainty and novelty.', leftLabel: 'Risk Averse', rightLabel: 'Risk Tolerant', color: 'emerald' },
];

const QUESTIONS = [
  {
    id: 1,
    trait: 'social',
    text: "At the end of a very long and productive day, how do you prefer to recharge?",
    options: [
      { text: "Reading a book or working on a solo hobby.", value: -1 },
      { text: "Meeting up with friends or discussing the day's events.", value: 1 }
    ]
  },
  {
    id: 2,
    trait: 'operational',
    text: "When starting a complex project, what is your first instinct?",
    options: [
      { text: "Create a detailed list of steps and a firm schedule.", value: -1 },
      { text: "Dive in and figure out the best approach as I go.", value: 1 }
    ]
  },
  {
    id: 3,
    trait: 'decision',
    text: "You need to make a choice between two similar options. You rely on:",
    options: [
      { text: "A comparison of data, pros/cons, and logical outcomes.", value: -1 },
      { text: "My 'gut feeling' and the emotional vibe of the choices.", value: 1 }
    ]
  },
  {
    id: 4,
    trait: 'collaboration',
    text: "In a team meeting where a problem is being solved, you're usually:",
    options: [
      { text: "Listening quietly and formulating a thought to share later.", value: -1 },
      { text: "Thinking out loud and bouncing ideas off others instantly.", value: 1 }
    ]
  },
  {
    id: 5,
    trait: 'risk',
    text: "If offered a role in a stable company vs. a high-growth startup:",
    options: [
      { text: "I'd prefer the stability and clear career path of the big company.", value: -1 },
      { text: "I'd prefer the excitement and unpredictability of the startup.", value: 1 }
    ]
  },
  {
    id: 6,
    trait: 'operational',
    text: "A surprise guest arrives or a sudden meeting is called. You feel:",
    options: [
      { text: "Slightly annoyed because it breaks my planned routine.", value: -1 },
      { text: "Excited by the change of pace and the spontaneity.", value: 1 }
    ]
  },
  {
    id: 7,
    trait: 'collaboration',
    text: "If you had to choose a workspace for the rest of your life:",
    options: [
      { text: "A quiet, private office with deep-focus potential.", value: -1 },
      { text: "A collaborative open-space with constant peer access.", value: 1 }
    ]
  },
  {
    id: 8,
    trait: 'decision',
    text: "When reading a news story, you are more interested in:",
    options: [
      { text: "The hard facts, numbers, and technical details.", value: -1 },
      { text: "The human stories and the emotional impact on people.", value: 1 }
    ]
  }
];

const PersonalityPage: React.FC = () => {
  const navigate = useNavigate();
  const onNavigate = (page: string) => navigate(page === 'explorer' ? '/career-explorer' : page === 'ai-recs' ? '/recommendations' : `/${page}`);
  const [view, setView] = useState<PageView>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ social: 0, operational: 0, decision: 0, collaboration: 0, risk: 0 });

  const handleAnswer = (trait: string, value: number) => {
    setScores(prev => ({ ...prev, [trait]: prev[trait] + value }));
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setView('results');
    }
  };

  const archetype = useMemo(() => {
    // Basic logic to determine an archetype based on the highest scores
    const isIntro = scores.social < 0;
    const isStructured = scores.operational < 0;
    const isAnalytical = scores.decision < 0;
    
    if (isIntro && isStructured && isAnalytical) return { name: "The Strategist", icon: "🏛️", desc: "A deep-thinking architect of logic and order." };
    if (!isIntro && isStructured && isAnalytical) return { name: "The Director", icon: "⚖️", desc: "A clear-headed leader who thrives on efficiency." };
    if (isIntro && !isStructured && !isAnalytical) return { name: "The Creative Soloist", icon: "🎨", desc: "A visionary who finds patterns in the abstract." };
    if (!isIntro && !isStructured && !isAnalytical) return { name: "The Innovator", icon: "🚀", desc: "A dynamic agent of change and social synergy." };
    return { name: "The Orchestrator", icon: "🎻", desc: "A balanced professional who harmonizes logic and emotion." };
  }, [scores]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. PERSONALITY INTRO SECTION */}
      {view === 'intro' && (
        <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 overflow-visible">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-indigo-600/5 blur-[180px] rounded-full" />
          </div>

          <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto relative z-10 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black tracking-widest uppercase mb-6 md:mb-8 lg:mb-10">
              WORKING STYLE & PERSONA ANALYSIS
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              Decipher Your <br/><span className="gradient-text">DNA.</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed mb-6 md:mb-10 lg:mb-12">
              Personality is not a measure of skill—it's a measure of <span className="text-white">comfort</span>. 
              Our assessment identifies your natural working style to ensure your professional path matches your human nature.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left mb-8 md:mb-12 lg:mb-16">
               <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h4 className="text-sm font-black uppercase text-indigo-500 mb-4 tracking-widest">No Good or Bad</h4>
                  <p className="text-gray-200 text-sm leading-relaxed">Being introverted is as valuable as being extroverted. High structure is as useful as high flexibility. We look for alignment, not judgment.</p>
               </div>
               <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h4 className="text-sm font-black uppercase text-cyan-500 mb-4 tracking-widest">Environment Sync</h4>
                  <p className="text-gray-200 text-sm leading-relaxed">By understanding your decision-making and social patterns, we can recommend roles where you'll naturally find 'flow' and avoid burnout.</p>
               </div>
            </div>

            <button 
              onClick={() => setView('assessment')}
              className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-xs"
            >
              Start Archetype Probe
            </button>
          </div>
        </section>
      )}

      {/* C. SCENARIO-BASED QUESTIONS */}
      {view === 'assessment' && (
        <section className="py-10 px-4 md:py-20 md:px-6 max-w-full px-2 md:max-w-4xl md:px-0 mx-auto min-h-[70vh] flex flex-col animate-in zoom-in duration-500">
           <div className="flex justify-between items-center mb-8 md:mb-12 lg:mb-16">
              <div className="space-y-2">
                 <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.4em]">Persona Lab</p>
                 <h2 className="text-2xl font-black uppercase text-white tracking-widest">Behavioral Scenario</h2>
              </div>
              <div className="text-right">
                 <p className="text-sm font-black text-gray-300 uppercase mb-1">Progress</p>
                 <p className="text-xl font-black tabular-nums text-white">{currentIdx + 1} / {QUESTIONS.length}</p>
              </div>
           </div>

           <div className="flex-grow flex flex-col justify-center">
              <div className="mb-6 md:mb-10 lg:mb-12 space-y-4">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-700" style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }} />
                 </div>
              </div>

              <div className="text-center space-y-16">
                 <h3 className="text-3xl md:text-4xl font-black uppercase text-white leading-tight tracking-tight">
                    {QUESTIONS[currentIdx].text}
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {QUESTIONS[currentIdx].options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleAnswer(QUESTIONS[currentIdx].trait, opt.value)}
                        className="group relative p-5 md:p-8 lg:p-12 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-indigo-500 hover:bg-indigo-600/5 transition-all duration-500 flex flex-col items-center justify-center min-h-[220px]"
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <span className="text-lg font-black uppercase tracking-tight text-gray-300 group-hover:text-white leading-relaxed">
                            {opt.text}
                         </span>
                         <div className="mt-8 px-5 py-2 rounded-xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all text-sm font-black uppercase tracking-widest text-gray-300">
                            Select Instinct
                         </div>
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* D. PERSONALITY INSIGHTS (RESULTS) */}
      {view === 'results' && (
        <section className="py-10 px-4 md:py-20 md:px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="text-center mb-6 md:mb-8 lg:mb-10 md:mb-16 lg:mb-24 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black tracking-widest uppercase">
                PERSONA SYNTHESIS COMPLETE
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Your Professional <br/><span className="gradient-text">Archetype.</span>
              </h1>
              <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                We've mapped your instincts across 5 operational dimensions. 
                This profile explains how you interact with complexity and teams.
              </p>
           </div>

           <div className="grid lg:grid-cols-2 gap-8 md:gap-14 lg:gap-20 items-center mb-32">
              {/* Dimensions Chart */}
              <div className="space-y-12">
                 <div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-6 md:mb-8 lg:mb-10">Dimension <span className="text-indigo-500">Alignment.</span></h3>
                    <div className="space-y-12">
                       {PERSONALITY_TRAITS.map((trait) => {
                         const score = scores[trait.id as keyof typeof scores] || 0;
                         // Map -2 to 2 score into percentage (0-100)
                         const percentage = ((score + 2) / 4) * 100;
                         
                         return (
                           <div key={trait.id} className="space-y-4">
                              <div className="flex justify-between items-end">
                                 <span className="text-xs font-black uppercase tracking-widest text-indigo-400">{trait.name}</span>
                                 <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{trait.description}</span>
                              </div>
                              <div className="relative h-2 w-full bg-white/5 rounded-full">
                                 <div className="absolute inset-0 flex justify-between items-center px-2">
                                    <span className="text-sm font-black text-gray-400 uppercase z-10">{trait.leftLabel}</span>
                                    <span className="text-sm font-black text-gray-400 uppercase z-10">{trait.rightLabel}</span>
                                 </div>
                                 <div 
                                   className="absolute top-1/2 -translate-y-1/2 h-6 w-1 bg-white shadow-[0_0_15px_white] z-20 transition-all duration-1000" 
                                   style={{ left: `${percentage}%` }}
                                 />
                                 <div 
                                   className={`h-full bg-indigo-600/20 rounded-full transition-all duration-1000`} 
                                   style={{ width: `${percentage}%` }}
                                 />
                              </div>
                           </div>
                         );
                       })}
                    </div>
                 </div>
              </div>

              {/* Archetype Card */}
              <div className="relative">
                 <div className="absolute inset-0 bg-indigo-600/5 blur-[120px]" />
                 <div className="relative p-5 md:p-8 lg:p-12 rounded-3xl border border-white/10 bg-[#080808] backdrop-blur-3xl shadow-2xl overflow-hidden">
                    <div className="absolute -top-5 md:p-8 lg:p-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full" />
                    <h4 className="text-xs font-black text-indigo-500 uppercase tracking-[0.4em] mb-6 md:mb-8 lg:mb-10">AI Archetype Sync</h4>
                    <div className="space-y-10">
                       <div className="flex items-center gap-8">
                          <div className="w-24 h-24 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-5xl">
                             {archetype.icon}
                          </div>
                          <div>
                             <h4 className="text-3xl font-black uppercase text-white tracking-tighter">{archetype.name}</h4>
                             <p className="text-xs text-gray-300 font-bold uppercase tracking-widest mt-1">Core Professional Persona</p>
                          </div>
                       </div>
                       <p className="text-gray-300 text-xl font-medium leading-relaxed italic">
                          "{archetype.desc}"
                       </p>
                       
                       <div className="grid grid-cols-2 gap-6 pt-4 md:pt-6 md:pt-8 lg:pt-10 border-t border-white/10">
                          <div>
                             <p className="text-sm font-black text-gray-400 uppercase mb-2 tracking-widest">Ideal Workspace</p>
                             <p className="text-xs font-black text-white uppercase">{scores.social < 0 ? 'Private & Focused' : 'Active & Collaborative'}</p>
                          </div>
                          <div>
                             <p className="text-sm font-black text-gray-400 uppercase mb-2 tracking-widest">Collaboration Style</p>
                             <p className="text-xs font-black text-white uppercase">{scores.collaboration < 0 ? 'Documentation-First' : 'Discussion-First'}</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Career Insight Bridge */}
           <div className="p-6 md:p-12 lg:p-16 rounded-3xl border border-white/10 bg-white/[0.01] text-center max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Persona <span className="text-indigo-500">Destiny.</span></h3>
              <p className="text-gray-300 text-lg font-medium leading-relaxed mb-6 md:mb-10 lg:mb-12">
                Your {archetype.name} archetype suggests you would be most fulfilled in 
                roles that allow for <span className="text-white">{scores.decision < 0 ? 'Rigorous Analysis' : 'Creative Expression'}</span> 
                and {scores.operational < 0 ? 'High Predictability' : 'Fast-paced Adaptability'}.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button onClick={() => onNavigate('ai-recs')} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-xs">Sync Recs with Persona</button>
                 <button onClick={() => setView('assessment')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">Restart Assessment</button>
              </div>
           </div>
        </section>
      )}

      <style>{`
        .bg-blue-500 { background-color: #3b82f6; }
        .bg-cyan-500 { background-color: #06b6d4; }
        .bg-indigo-500 { background-color: #6366f1; }
        .bg-purple-500 { background-color: #a855f7; }
        .bg-emerald-500 { background-color: #10b981; }
        
        .grid-pattern {
          background-image: linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default PersonalityPage;
