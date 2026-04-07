
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type PageView = 'intro' | 'categories' | 'assessment' | 'results';

interface AptitudeCategory {
  id: string;
  name: string;
  description: string;
  timeLimit: string;
  difficulty: 'Adaptive' | 'Standard';
  icon: string;
  color: string;
}

const APTITUDE_CATEGORIES: AptitudeCategory[] = [
  { id: 'logical', name: 'Logical Reasoning', description: 'Pattern recognition, deductive logic, and abstract problem solving.', timeLimit: '12 Mins', difficulty: 'Adaptive', icon: '🧩', color: 'blue' },
  { id: 'numerical', name: 'Numerical Ability', description: 'Quantitative analysis, arithmetic logic, and data interpretation.', timeLimit: '15 Mins', difficulty: 'Adaptive', icon: '🔢', color: 'cyan' },
  { id: 'verbal', name: 'Verbal Ability', description: 'Linguistic precision, reading comprehension, and structural syntax.', timeLimit: '10 Mins', difficulty: 'Adaptive', icon: '📖', color: 'indigo' },
  { id: 'spatial', name: 'Spatial Reasoning', description: 'Visualizing 3D structures, mental rotation, and object orientation.', timeLimit: '8 Mins', difficulty: 'Standard', icon: '📐', color: 'purple' },
  { id: 'analytical', name: 'Analytical Thinking', description: 'Deconstructing complex scenarios to find root causes and outcomes.', timeLimit: '15 Mins', difficulty: 'Adaptive', icon: '🧪', color: 'emerald' },
];

const AptitudePage: React.FC = () => {
  const navigate = useNavigate();
  const onNavigate = (page: string) => navigate(page === 'explorer' ? '/career-explorer' : page === 'ai-recs' ? '/recommendations' : `/${page}`);
  const [view, setView] = useState<PageView>('intro');
  const [activeCategory, setActiveCategory] = useState<AptitudeCategory | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (view === 'assessment') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view]);

  const handleStartAssessment = (cat: AptitudeCategory) => {
    setActiveCategory(cat);
    setView('assessment');
    setTimer(0);
    setCurrentQuestion(1);
  };

  const finishAssessment = () => {
    setView('results');
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. APTITUDE INTRO SECTION */}
      {view === 'intro' && (
        <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 overflow-visible">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
          </div>

          <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto relative z-10 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase mb-6 md:mb-8 lg:mb-10">
              COGNITIVE CAPABILITY ASSESSMENT
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
              Skill vs <br/><span className="gradient-text">Aptitude.</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed mb-6 md:mb-10 lg:mb-12">
              Skills are what you've learned; Aptitude is what you're <span className="text-white">built for</span>. 
              Our assessments measure raw cognitive patterns to identify your natural professional advantage—no memorization required.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left mb-8 md:mb-12 lg:mb-16">
               <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h4 className="text-sm font-black uppercase text-blue-500 mb-4 tracking-widest">Why it Matters</h4>
                  <p className="text-gray-200 text-sm leading-relaxed">Understanding your aptitude helps you choose paths that feel intuitive. When your work matches your brain's natural logic, burnout drops and performance skyrockets.</p>
               </div>
               <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h4 className="text-sm font-black uppercase text-cyan-500 mb-4 tracking-widest">Measure Ability</h4>
                  <p className="text-gray-200 text-sm leading-relaxed">Unlike exams, there are no "wrong" answers—only "different" ways of thinking. We measure speed, accuracy, and pattern affinity across 5 key dimensions.</p>
               </div>
            </div>

            <button 
              onClick={() => setView('categories')}
              className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs"
            >
              Explore Dimensions
            </button>
          </div>
        </section>
      )}

      {/* B. APTITUDE CATEGORIES */}
      {view === 'categories' && (
        <section className="py-10 px-4 md:py-20 md:px-6 max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-between items-end mb-8 md:mb-12 lg:mb-16">
             <div>
                <h2 className="text-4xl font-black uppercase tracking-tight">The <span className="text-blue-500">Dimensions.</span></h2>
                <p className="text-gray-300 text-xs font-black uppercase tracking-[0.4em] mt-2">Core Cognitive Benchmarks</p>
             </div>
             <button onClick={() => setView('intro')} className="text-xs font-black text-gray-300 hover:text-white uppercase tracking-widest">Back</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {APTITUDE_CATEGORIES.map((cat) => (
               <div 
                 key={cat.id} 
                 className="group p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
               >
                  <div className={`absolute -top-5 md:p-8 lg:p-10 -right-10 w-32 h-32 blur-[80px] opacity-20 bg-${cat.color}-500 transition-all group-hover:opacity-40`} />
                  
                  <div className="flex justify-between items-start mb-6 md:mb-8 lg:mb-10">
                     <div className="text-4xl">{cat.icon}</div>
                     <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm font-black uppercase tracking-widest text-gray-300">{cat.difficulty}</span>
                  </div>

                  <h3 className="text-2xl font-black uppercase text-white mb-4 leading-tight tracking-tight">{cat.name}</h3>
                  <p className="text-gray-200 text-sm font-medium leading-relaxed mb-6 md:mb-8 lg:mb-10">{cat.description}</p>

                  <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Estimated Time</p>
                        <p className="text-xs font-black text-white uppercase">{cat.timeLimit}</p>
                     </div>
                     <button 
                       onClick={() => handleStartAssessment(cat)}
                       className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xl"
                     >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </button>
                  </div>
               </div>
             ))}
          </div>
        </section>
      )}

      {/* C. ASSESSMENT FLOW (SIMULATOR) */}
      {view === 'assessment' && activeCategory && (
        <section className="py-10 px-4 md:py-20 md:px-6 max-w-full px-2 md:max-w-4xl md:px-0 mx-auto min-h-[70vh] flex flex-col animate-in zoom-in duration-500">
           <div className="flex justify-between items-center mb-8 md:mb-12 lg:mb-16">
              <div className="space-y-2">
                 <p className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">{activeCategory.name} Lab</p>
                 <h2 className="text-2xl font-black uppercase text-white tracking-widest">Active Session</h2>
              </div>
              <div className="text-right">
                 <p className="text-sm font-black text-gray-300 uppercase mb-1">Time Elapsed</p>
                 <p className="text-xl font-black tabular-nums text-white">{formatTime(timer)}</p>
              </div>
           </div>

           <div className="flex-grow flex flex-col">
              <div className="mb-6 md:mb-10 lg:mb-12 space-y-4">
                 <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-300">
                    <span>Question 0{currentQuestion} of 10</span>
                    <span>Adaptive Complexity: Level 4</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-700" style={{ width: `${(currentQuestion / 10) * 100}%` }} />
                 </div>
              </div>

              <div className="p-5 md:p-8 lg:p-12 md:p-20 rounded-3xl bg-white/[0.04] border border-white/10 relative overflow-hidden flex-grow flex flex-col justify-center">
                 <div className="absolute top-0 right-0 p-5 md:p-8 lg:p-10 opacity-10">
                    <svg width="100" height="100" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" stroke="white" strokeWidth="1" fill="none" strokeDasharray="5,5" /></svg>
                 </div>
                 
                 <div className="space-y-12">
                    <h3 className="text-2xl md:text-3xl font-black uppercase text-white leading-tight">
                       "If all A are B, and some B are C, which of the following MUST be logically true based ONLY on the provided statement?"
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                       {[
                         "Some A are definitely C.",
                         "All C are definitely B.",
                         "None of the provided options are necessarily true.",
                         "All A are definitely not C."
                       ].map((opt, i) => (
                         <button 
                           key={i}
                           onClick={() => currentQuestion < 10 ? setCurrentQuestion(currentQuestion + 1) : finishAssessment()}
                           className="w-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all text-left group"
                         >
                            <div className="flex gap-6 items-center">
                               <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-xs font-black text-gray-300 group-hover:text-blue-400 group-hover:border-blue-500/40">0{i+1}</div>
                               <span className="text-sm font-medium text-gray-300 group-hover:text-white uppercase tracking-wide">{opt}</span>
                            </div>
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="mt-6 md:mt-10 lg:mt-12 flex justify-between items-center">
                 <button className="text-xs font-black text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Skip Dimension</button>
                 <div className="flex gap-4">
                    <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Previous</button>
                    <button onClick={() => currentQuestion < 10 ? setCurrentQuestion(currentQuestion + 1) : finishAssessment()} className="px-8 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all">Next Logic</button>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* D. RESULTS & INSIGHTS */}
      {view === 'results' && (
        <section className="py-10 px-4 md:py-20 md:px-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="text-center mb-6 md:mb-8 lg:mb-10 md:mb-16 lg:mb-24 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black tracking-widest uppercase">
                ANALYSIS COMPLETE
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Your Cognitive <br/><span className="gradient-text">Landscape.</span>
              </h1>
              <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                We've processed your responses across all dimensions. Here is how your 
                brain naturally synthesizes information.
              </p>
           </div>

           <div className="grid lg:grid-cols-2 gap-8 md:gap-14 lg:gap-20 items-center mb-32">
              <div className="space-y-12">
                 <div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-8">Strength <span className="text-blue-500">Distribution.</span></h3>
                    <div className="space-y-8">
                       {[
                         { label: "Logical Reasoning", score: 92, status: "High" },
                         { label: "Analytical Thinking", score: 85, status: "High" },
                         { label: "Numerical Ability", score: 68, status: "Medium" },
                         { label: "Verbal Ability", score: 74, status: "Medium" },
                         { label: "Spatial Reasoning", score: 45, status: "Developing" },
                       ].map((item) => (
                         <div key={item.label} className="space-y-3">
                            <div className="flex justify-between items-end">
                               <div className="flex items-center gap-3">
                                  <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'High' ? 'bg-blue-500' : item.status === 'Medium' ? 'bg-cyan-500' : 'bg-gray-600'}`} />
                                  <span className="text-sm font-black uppercase tracking-widest text-white">{item.label}</span>
                               </div>
                               <span className={`text-xs font-black uppercase tracking-widest ${item.status === 'High' ? 'text-blue-500' : 'text-gray-300'}`}>{item.status} Affinity</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className={`h-full transition-all duration-1500 ${item.status === 'High' ? 'bg-blue-600 shadow-[0_0_10px_#2563eb]' : item.status === 'Medium' ? 'bg-cyan-600' : 'bg-gray-700'}`} style={{ width: `${item.score}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-blue-600/5 blur-[120px]" />
                 <div className="relative p-5 md:p-8 lg:p-12 rounded-3xl border border-white/10 bg-[#080808] backdrop-blur-3xl shadow-2xl">
                    <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-6 md:mb-8 lg:mb-10">AI Personality Sync</h4>
                    <div className="space-y-10">
                       <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-[28px] bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-3xl">🕵️‍♂️</div>
                          <div>
                             <h4 className="text-xl font-black uppercase text-white tracking-tight">The Logical Architect</h4>
                             <p className="text-xs text-gray-300 font-bold uppercase tracking-widest mt-1">Primary Cognitive Archetype</p>
                          </div>
                       </div>
                       <p className="text-gray-200 text-base leading-relaxed font-medium">
                          "Your high Logical and Analytical scores suggest a brain designed for 
                          complex system navigation and pattern synthesis. You thrive in 
                          structured but ambiguous environments where root-cause analysis is critical."
                       </p>
                       <div className="pt-4 md:pt-6 md:pt-8 lg:pt-10 border-t border-white/10">
                          <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Recommended Career Verticals</p>
                          <div className="flex flex-wrap gap-2">
                             {['AI Research', 'Systems Engineering', 'Strategic Consulting', 'Quantum Cryptography'].map(v => (
                               <span key={v} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase text-blue-400 tracking-widest">{v}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-6 md:p-12 lg:p-16 rounded-3xl border border-white/10 bg-white/[0.01] text-center max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Developing <span className="text-cyan-500">Horizons.</span></h3>
              <p className="text-gray-300 text-lg font-medium leading-relaxed mb-6 md:mb-10 lg:mb-12">
                Spatial reasoning is currently your secondary trait. This means you might find 
                abstract architecture easier than physical 3D manipulation. This can be 
                enhanced through targeted neural training exercises.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button onClick={() => onNavigate('roadmap')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs">Sync with Roadmap</button>
                 <button onClick={() => setView('categories')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">Retake Other Dimensions</button>
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

export default AptitudePage;
