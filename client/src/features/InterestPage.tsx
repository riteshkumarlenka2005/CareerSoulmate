
import React, { useState, useMemo } from 'react';

type PageView = 'intro' | 'dimensions' | 'assessment' | 'results';

interface InterestDimension {
  id: string;
  name: string;
  scenario: string;
  icon: string;
  color: string;
}

const INTEREST_DIMENSIONS: InterestDimension[] = [
  { id: 'I', name: 'Investigative', scenario: "You lose track of time while searching for the 'root cause' of a mystery.", icon: '🔬', color: 'blue' },
  { id: 'A', name: 'Artistic', scenario: "You find patterns in sounds, colors, or words that others might miss.", icon: '🎨', color: 'purple' },
  { id: 'S', name: 'Social', scenario: "You feel most alive when you're explaining a concept or helping a friend.", icon: '🤝', color: 'emerald' },
  { id: 'E', name: 'Enterprising', scenario: "You enjoy the thrill of starting a project and persuading others to join.", icon: '⚡', color: 'orange' },
  { id: 'C', name: 'Conventional', scenario: "You find peace in organizing data and ensuring every detail is perfect.", icon: '📊', color: 'cyan' },
  { id: 'R', name: 'Realistic', scenario: "You prefer using tools and your hands to build something physical.", icon: '🛠️', color: 'rose' },
];

const QUESTIONS = [
  {
    id: 1,
    text: "How would you rather spend a Saturday afternoon?",
    options: [
      { text: "Researching a complex scientific theory on YouTube.", type: 'I' },
      { text: "Sketching digital art or writing a short story.", type: 'A' }
    ]
  },
  {
    id: 2,
    text: "Which role in a team project sounds more exciting?",
    options: [
      { text: "Leading the pitch and managing the budget.", type: 'E' },
      { text: "Developing the technical code or structural logic.", type: 'I' }
    ]
  },
  {
    id: 3,
    text: "If you were given a broken vintage watch, would you:",
    options: [
      { text: "Take it apart to see how the gears work.", type: 'R' },
      { text: "Organize it into a collection and document its history.", type: 'C' }
    ]
  },
  {
    id: 4,
    text: "A friend is struggling with a new concept. You:",
    options: [
      { text: "Sit down and mentor them until they get it.", type: 'S' },
      { text: "Persuade them to join a study group you've organized.", type: 'E' }
    ]
  },
  {
    id: 5,
    text: "In a digital world, would you rather design:",
    options: [
      { text: "The visual aesthetic and user emotions.", type: 'A' },
      { text: "The database architecture and file structure.", type: 'C' }
    ]
  },
  {
    id: 6,
    text: "Would you rather work in:",
    options: [
      { text: "A high-tech research laboratory.", type: 'I' },
      { text: "A workshop where you build physical prototypes.", type: 'R' }
    ]
  },
  {
    id: 7,
    text: "When you look at a spreadsheet, you feel:",
    options: [
      { text: "Excited by the clarity and organization.", type: 'C' },
      { text: "Like there's a human story waiting to be told.", type: 'S' }
    ]
  },
  {
    id: 8,
    text: "Which environment fuels your creativity?",
    options: [
      { text: "A bustling marketplace where ideas are traded.", type: 'E' },
      { text: "A quiet studio where you can experiment freely.", type: 'A' }
    ]
  }
];

const InterestPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [view, setView] = useState<PageView>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ I: 0, A: 0, S: 0, E: 0, C: 0, R: 0 });

  const handleAnswer = (type: string) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setView('results');
    }
  };

  const sortedResults = useMemo(() => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([id, score]) => ({
        ...INTEREST_DIMENSIONS.find(d => d.id === id)!,
        score
      }));
  }, [scores]);

  const matchingCareers = useMemo(() => {
    const topId = sortedResults[0].id;
    switch (topId) {
      case 'I': return ['Data Scientist', 'AI Researcher', 'Medical Specialist'];
      case 'A': return ['UX Designer', 'Content Creator', 'Creative Architect'];
      case 'S': return ['Career Counselor', 'HR Director', 'Educational Lead'];
      case 'E': return ['Startup Founder', 'Product Manager', 'Strategic Lead'];
      case 'C': return ['Audit Specialist', 'Systems Admin', 'Financial Analyst'];
      case 'R': return ['Robotics Engineer', 'Field Architect', 'Hardware Specialist'];
      default: return [];
    }
  }, [sortedResults]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. INTEREST ASSESSMENT INTRO */}
      {view === 'intro' && (
        <section className="relative pt-28 pb-16 px-6 overflow-visible">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black tracking-widest uppercase mb-10">
              CURIOSITY & PREFERENCE DISCOVERY
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
              Find What <br/><span className="gradient-text">Fuels You.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-12">
              Forget what you're good at for a moment. What do you <span className="text-white">actually enjoy?</span> 
              Interests evolve over time. Our assessment eliminates performance bias to find your natural curiosity patterns.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-black uppercase text-purple-500 mb-4 tracking-widest">No Wrong Answers</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">This isn't a test. There are no right or wrong choices—only preferences. Be honest with your instincts.</p>
               </div>
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-black uppercase text-blue-500 mb-4 tracking-widest">Evolving Logic</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Interests aren't static. We recommend retaking this every 6 months to see how your professional soul evolves.</p>
               </div>
            </div>

            <button 
              onClick={() => setView('dimensions')}
              className="px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-purple-600/40 uppercase tracking-[0.2em] text-[10px]"
            >
              Explore Dimensions
            </button>
          </div>
        </section>
      )}

      {/* B. INTEREST DIMENSIONS */}
      {view === 'dimensions' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-end mb-16">
             <div>
                <h2 className="text-4xl font-black uppercase tracking-tight">The <span className="text-purple-500">Dimensions.</span></h2>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Archetypes of Human Preference</p>
             </div>
             <button onClick={() => setView('intro')} className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest">Back</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {INTEREST_DIMENSIONS.map((dim) => (
               <div 
                 key={dim.id} 
                 className="group p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-purple-500/40 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
               >
                  <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[80px] opacity-20 bg-${dim.color}-500 transition-all group-hover:opacity-40`} />
                  
                  <div className="flex justify-between items-start mb-10">
                     <div className="text-4xl">{dim.icon}</div>
                     <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-gray-500">DIM_0{dim.id}</span>
                  </div>

                  <h3 className="text-2xl font-black uppercase text-white mb-4 leading-tight tracking-tight">{dim.name}</h3>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed italic">"{dim.scenario}"</p>

                  <div className="mt-auto pt-10">
                     <button 
                       onClick={() => setView('assessment')}
                       className="text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-2 group/btn"
                     >
                        Begin Identification
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </button>
                  </div>
               </div>
             ))}
          </div>
        </section>
      )}

      {/* C. CHOICE-BASED QUESTIONS */}
      {view === 'assessment' && (
        <section className="py-24 px-6 max-w-4xl mx-auto min-h-[70vh] flex flex-col animate-in zoom-in duration-500">
           <div className="flex justify-between items-center mb-16">
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">Interest Lab</p>
                 <h2 className="text-2xl font-black uppercase text-white tracking-widest">A vs B Selection</h2>
              </div>
              <div className="text-right">
                 <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Progress</p>
                 <p className="text-xl font-black tabular-nums text-white">{currentQuestionIdx + 1} / {QUESTIONS.length}</p>
              </div>
           </div>

           <div className="flex-grow flex flex-col justify-center">
              <div className="mb-12 space-y-4">
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 transition-all duration-700" style={{ width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%` }} />
                 </div>
              </div>

              <div className="text-center space-y-16">
                 <h3 className="text-3xl md:text-4xl font-black uppercase text-white leading-tight tracking-tight">
                    {QUESTIONS[currentQuestionIdx].text}
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {QUESTIONS[currentQuestionIdx].options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleAnswer(opt.type)}
                        className="group relative p-12 rounded-[56px] bg-white/[0.02] border border-white/5 hover:border-purple-500 hover:bg-purple-600/5 transition-all duration-500 flex flex-col items-center justify-center min-h-[280px]"
                      >
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                         <span className="text-4xl mb-8 opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all">
                            {INTEREST_DIMENSIONS.find(d => d.id === opt.type)?.icon}
                         </span>
                         <span className="text-lg font-black uppercase tracking-tight text-gray-300 group-hover:text-white leading-relaxed">
                            {opt.text}
                         </span>
                         <div className="mt-8 px-5 py-2 rounded-xl bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-all text-[8px] font-black uppercase tracking-widest text-gray-500">
                            Select Path
                         </div>
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="mt-16 text-center">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Take your time. There is no clock.</p>
           </div>
        </section>
      )}

      {/* D. INTEREST PROFILE RESULT */}
      {view === 'results' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="text-center mb-24 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest uppercase">
                INTEREST SYNTHESIS COMPLETE
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                Your Preferred <br/><span className="gradient-text">World.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                We've mapped your choices against the RIASEC logic. This profile 
                represents the environments where you are most likely to find flow.
              </p>
           </div>

           <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
              <div className="space-y-12">
                 <div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-10">Interest <span className="text-purple-500">Hierarchy.</span></h3>
                    <div className="space-y-10">
                       {sortedResults.map((item, i) => (
                         <div key={item.id} className="space-y-4">
                            <div className="flex justify-between items-end">
                               <div className="flex items-center gap-4">
                                  <span className="text-2xl">{item.icon}</span>
                                  <div>
                                     <span className="text-sm font-black uppercase tracking-widest text-white">{item.name}</span>
                                     <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Dimension {item.id}</p>
                                  </div>
                               </div>
                               <span className={`text-[10px] font-black uppercase tracking-widest ${i < 2 ? 'text-purple-500' : 'text-gray-500'}`}>
                                  {i === 0 ? 'Primary' : i === 1 ? 'Secondary' : 'Auxiliary'}
                               </span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <div 
                                 className={`h-full transition-all duration-1500 ${i === 0 ? 'bg-purple-600 shadow-[0_0_15px_#a855f7]' : 'bg-blue-600 opacity-60'}`} 
                                 style={{ width: `${(item.score / 5) * 100}%` }} 
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-purple-600/5 blur-[120px]" />
                 <div className="relative p-12 rounded-[64px] border border-white/10 bg-[#080808] backdrop-blur-3xl shadow-2xl">
                    <h4 className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-10">Matching Career Clusters</h4>
                    <div className="space-y-10">
                       <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-[28px] bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-3xl">
                             {sortedResults[0].icon}
                          </div>
                          <div>
                             <h4 className="text-xl font-black uppercase text-white tracking-tight">The {sortedResults[0].name} Explorer</h4>
                             <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">Core Professional Persona</p>
                          </div>
                       </div>
                       <p className="text-gray-400 text-base leading-relaxed font-medium">
                          "Your strong affinity for {sortedResults[0].name} activities suggests that you thrive in environments 
                          that {sortedResults[0].id === 'I' ? 'challenge your intellect' : sortedResults[0].id === 'A' ? 'allow for self-expression' : 'rely on interpersonal connection'}. 
                          You are likely motivated by {sortedResults[0].id === 'I' ? 'discovery' : 'impact'} rather than simple routine."
                       </p>
                       <div className="pt-10 border-t border-white/5">
                          <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-4">Immediate Match Examples</p>
                          <div className="flex flex-wrap gap-2">
                             {matchingCareers.map(v => (
                               <span key={v} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-purple-400 tracking-widest">{v}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-16 rounded-[64px] border border-white/10 bg-white/[0.01] text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Cross-Sync <span className="text-blue-500">Destiny.</span></h3>
              <p className="text-gray-500 text-lg font-medium leading-relaxed mb-12">
                Your interests are now synced with your Aptitude and Skill profile. 
                Our AI will prioritize career recommendations that sit at the intersection 
                of what you <span className="text-white">can do</span> and what you <span className="text-white">love to do</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button onClick={() => onNavigate('roadmap')} className="px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-purple-600/40 uppercase tracking-[0.2em] text-[10px]">Generate Unified Roadmap</button>
                 <button onClick={() => setView('assessment')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">Restart Assessment</button>
              </div>
           </div>
        </section>
      )}

      <style>{`
        .bg-blue-500 { background-color: #3b82f6; }
        .bg-purple-500 { background-color: #a855f7; }
        .bg-emerald-500 { background-color: #10b981; }
        .bg-orange-500 { background-color: #f97316; }
        .bg-cyan-500 { background-color: #06b6d4; }
        .bg-rose-500 { background-color: #f43f5e; }
        
        .grid-pattern {
          background-image: linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default InterestPage;
