
import React, { useState } from 'react';

interface Factor {
  label: string;
  score: number;
  description: string;
  icon: string;
  color: string;
}

const WHY_THIS_FACTORS: Factor[] = [
  { 
    label: "Aptitude Strengths", 
    score: 98, 
    description: "Your top-decile performance in logical reasoning and abstract pattern matching directly mirrors the cognitive load of AI research.", 
    icon: "🧠", 
    color: "blue" 
  },
  { 
    label: "Interest Alignment", 
    score: 92, 
    description: "You've shown consistent curiosity in 'Emerging Technology' and 'Strategic Problem Solving' over 4 separate assessments.", 
    icon: "🔭", 
    color: "cyan" 
  },
  { 
    label: "Personality Traits", 
    score: 85, 
    description: "As an 'Architect' persona, your preference for structured, independent, and high-focus work is ideal for laboratory environments.", 
    icon: "👤", 
    color: "indigo" 
  },
  { 
    label: "Skill Compatibility", 
    score: 74, 
    description: "Your existing foundation in Mathematics and basic Python provides a 40% head-start compared to generic CS graduates.", 
    icon: "🛠️", 
    color: "purple" 
  },
  { 
    label: "Market Demand", 
    score: 95, 
    description: "Global labor data predicts a 400% shortage in specialized AI Research roles by 2027. High stability and ROI.", 
    icon: "📈", 
    color: "emerald" 
  }
];

const WhyThisPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedFactor, setSelectedFactor] = useState<Factor | null>(WHY_THIS_FACTORS[0]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. CAREER FIT SUMMARY */}
      <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 overflow-visible border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-6 md:p-12 lg:p-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">
                EXPLAINABLE AI PROTOCOL
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Logic Behind <br/><span className="gradient-text">Your Match.</span>
              </h1>
              <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed">
                We don't believe in black boxes. Every recommendation we make is a 
                transparent synthesis of your data points against the global economy. 
                Here is why <span className="text-white">AI Research Scientist</span> is your optimal destiny.
              </p>
            </div>

            <div className="lg:w-1/2 w-full">
               <div className="p-5 md:p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                  <div className="flex flex-col items-center text-center space-y-6">
                     <p className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">Overall Fit Confidence</p>
                     <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full rotate-[-90deg]">
                           <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                           <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="552.92" strokeDashoffset="11" className="text-blue-600 shadow-[0_0_20px_#3b82f6]" />
                        </svg>
                        <span className="absolute text-5xl font-black text-white">98%</span>
                     </div>
                     <h3 className="text-2xl font-black uppercase text-white tracking-tight">Exceptional Alignment</h3>
                     <p className="text-gray-300 text-xs font-bold uppercase leading-relaxed px-6">
                        "Your profile shows a rare 1:1 correlation with the specific 
                        behavioral and cognitive requirements of this role."
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. FACTOR BREAKDOWN (MAIN) */}
      <section className="py-10 px-4 md:py-20 md:px-6 max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8 lg:mb-10 md:mb-16 lg:mb-20">
           <h2 className="text-3xl font-black uppercase tracking-tight">The <span className="text-blue-500">Decision Matrix.</span></h2>
           <p className="text-gray-300 text-xs font-black uppercase tracking-[0.4em] mt-2">Weighted Contributions to your Recommendation</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-14 lg:gap-20">
           <div className="space-y-4">
              {WHY_THIS_FACTORS.map((f) => (
                <button
                  key={f.label}
                  onClick={() => setSelectedFactor(f)}
                  className={`w-full p-8 rounded-3xl border transition-all duration-500 text-left group relative overflow-hidden ${selectedFactor?.label === f.label ? `bg-${f.color}-500/10 border-${f.color}-500/50 shadow-2xl` : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                  <div className="flex justify-between items-center mb-4">
                     <div className="flex items-center gap-4">
                        <span className="text-2xl">{f.icon}</span>
                        <h4 className="text-sm font-black uppercase tracking-widest text-white">{f.label}</h4>
                     </div>
                     <span className={`text-lg font-black ${selectedFactor?.label === f.label ? `text-${f.color}-500` : 'text-gray-400'}`}>{f.score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full transition-all duration-1000 bg-${f.color}-500`} style={{ width: `${f.score}%` }} />
                  </div>
                </button>
              ))}
           </div>

           <div className="sticky top-32 h-fit">
              <div className={`p-6 md:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-3xl transition-all duration-700 ${selectedFactor ? `border-${selectedFactor.color}-500/30` : ''}`}>
                 {selectedFactor ? (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex items-center gap-6">
                          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl ${`bg-${selectedFactor.color}-500/20 text-${selectedFactor.color}-500 border border-${selectedFactor.color}-500/40 shadow-2xl`}`}>
                             {selectedFactor.icon}
                          </div>
                          <div>
                             <p className={`text-xs font-black uppercase tracking-[0.4em] mb-1 ${`text-${selectedFactor.color}-500`}`}>Factor deep-dive</p>
                             <h3 className="text-3xl font-black uppercase text-white tracking-tight leading-none">{selectedFactor.label}</h3>
                          </div>
                       </div>
                       
                       <div className="space-y-6">
                          <h5 className="text-sm font-black text-gray-300 uppercase tracking-widest border-l-4 border-white/10 pl-6">Contribution Insight</h5>
                          <p className="text-gray-200 text-xl font-medium leading-relaxed italic">
                             "{selectedFactor.description}"
                          </p>
                       </div>

                       <div className="pt-4 md:pt-6 md:pt-8 lg:pt-10 border-t border-white/10">
                          <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-300 mb-2">
                             <span>Factor Reliability</span>
                             <span className="text-white">High (Data Confirmed)</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className={`h-full bg-${selectedFactor.color}-500`} style={{ width: '90%' }} />
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="text-center py-20">
                       <p className="text-gray-300 font-black uppercase tracking-widest">Select a factor to view analysis</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </section>

      {/* C. COMPARATIVE CONTEXT */}
      <section className="py-14 md:py-24 lg:py-32 px-6 bg-[#080808] border-y border-white/10">
         <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-10">
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Relative <br/><span className="text-blue-500">Dominance.</span></h2>
                  <p className="text-gray-200 text-xl font-medium leading-relaxed">
                     Why this and not your second choice (Data Scientist)? 
                     While you have the technical skills for both, your 'Curiosity Quotient' 
                     and 'Abstract Reasoning' score 35% higher for Research roles.
                  </p>
                  
                  <div className="space-y-6">
                     {[
                        { t: "AI Research Scientist", s: 98, c: "blue" },
                        { t: "Data Scientist", s: 72, c: "slate" },
                        { t: "Product Manager", s: 45, c: "slate" }
                     ].map((item, i) => (
                        <div key={i} className="space-y-3">
                           <div className="flex justify-between items-end">
                              <span className={`text-sm font-black uppercase tracking-widest ${item.c === 'blue' ? 'text-white' : 'text-gray-400'}`}>{item.t}</span>
                              <span className={`text-lg font-black ${item.c === 'blue' ? 'text-blue-500' : 'text-gray-700'}`}>{item.s}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full bg-${item.c}-600 transition-all duration-1500`} style={{ width: `${item.s}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute inset-0 bg-blue-600/5 blur-[120px]" />
                  <div className="relative p-5 md:p-8 lg:p-12 rounded-[60px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 shadow-2xl">
                     <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-8">Evolution of your Match</h4>
                     <div className="space-y-12">
                        <div className="flex gap-8 items-start relative">
                           <div className="absolute left-4 top-5 md:p-8 lg:p-10 bottom-[-40px] w-px bg-white/10" />
                           <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-gray-300 z-10 shrink-0">01</div>
                           <div>
                              <h5 className="text-xs font-black uppercase text-white mb-2">Initial Onboarding (Jan 2025)</h5>
                              <p className="text-sm text-gray-300 font-bold uppercase">Match: Software Engineer (82%)</p>
                           </div>
                        </div>
                        <div className="flex gap-8 items-start relative">
                           <div className="absolute left-4 top-5 md:p-8 lg:p-10 bottom-[-40px] w-px bg-white/10" />
                           <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-gray-300 z-10 shrink-0">02</div>
                           <div>
                              <h5 className="text-xs font-black uppercase text-white mb-2">After Aptitude Test (Feb 2025)</h5>
                              <p className="text-sm text-blue-500 font-bold uppercase">Match: Machine Learning Engineer (89%)</p>
                           </div>
                        </div>
                        <div className="flex gap-8 items-start relative">
                           <div className="w-8 h-8 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-xs font-black text-white z-10 shadow-[0_0_15px_#3b82f6] shrink-0">03</div>
                           <div>
                              <h5 className="text-xs font-black uppercase text-white mb-2">Current Profile (Active)</h5>
                              <p className="text-sm text-emerald-500 font-bold uppercase">Match: AI Research Scientist (98%)</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* D. ASSUMPTIONS & FLEXIBILITY */}
      <section className="py-10 px-4 md:py-20 md:px-6 max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
         <div className="p-6 md:p-12 lg:p-16 rounded-3xl border border-white/10 bg-white/[0.01] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-5 md:p-8 lg:p-10 opacity-10">
               <svg width="100" height="100" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" stroke="white" strokeWidth="2" fill="none" strokeDasharray="10,5" /></svg>
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-8">Platform <span className="text-blue-500">Assumptions.</span></h3>
            <div className="grid md:grid-cols-2 gap-5 md:p-8 lg:p-12">
               <div className="space-y-4">
                  <h5 className="text-xs font-black text-white uppercase tracking-widest">Technological Continuity</h5>
                  <p className="text-xs text-gray-300 font-medium leading-relaxed">
                     The system assumes current AI scaling laws continue. If a radical 
                     shift in computing paradigms occurs, your roadmap may re-calibrate.
                  </p>
               </div>
               <div className="space-y-4">
                  <h5 className="text-xs font-black text-white uppercase tracking-widest">Self-Reporting Honesty</h5>
                  <p className="text-xs text-gray-300 font-medium leading-relaxed">
                     Recommendations rely on the accuracy of your interest profile. 
                     Fluctuations in your reported joy for coding will alter the Match Index.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* E. USER CONTROL */}
      <section className="py-16 md:py-28 lg:py-40 px-6 text-center">
        <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-6 md:mb-10 lg:mb-12 leading-[0.9] tracking-tighter">
             Stay In <br/><span className="gradient-text">Command.</span>
           </h2>
           <p className="text-gray-200 text-lg mb-6 md:mb-10 lg:mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              AI is your co-pilot, not your destination. Adjust your trajectory 
              manually at any time if your human intuition signals a different path.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Restarting Core Psychometrics...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs">
               Retake Core Assessment
             </button>
             <button onClick={() => onNavigate('explorer')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">
               Browse All Alternative Destinies
             </button>
           </div>
           <div className="mt-6 md:mt-10 lg:mt-12 flex justify-center gap-5 md:p-8 lg:p-10">
              <button className="text-xs font-black text-gray-300 hover:text-blue-500 uppercase tracking-widest transition-colors">Adjust Interests</button>
              <button className="text-xs font-black text-gray-300 hover:text-blue-500 uppercase tracking-widest transition-colors">Override Persona</button>
              <button className="text-xs font-black text-gray-300 hover:text-blue-500 uppercase tracking-widest transition-colors">Export Logic Dossier</button>
           </div>
        </div>
      </section>

      <style>{`
        /* Dynamic Tailwind Color Fallbacks for Explanation Logic */
        .bg-blue-500 { background-color: #3b82f6; }
        .bg-cyan-500 { background-color: #06b6d4; }
        .bg-indigo-500 { background-color: #6366f1; }
        .bg-purple-500 { background-color: #a855f7; }
        .bg-emerald-500 { background-color: #10b981; }
        .bg-slate-500 { background-color: #64748b; }
        
        .border-blue-500\/50 { border-color: rgba(59, 130, 246, 0.5); }
        .border-cyan-500\/50 { border-color: rgba(6, 182, 212, 0.5); }
        .border-indigo-500\/50 { border-color: rgba(99, 102, 241, 0.5); }
        .border-purple-500\/50 { border-color: rgba(168, 85, 247, 0.5); }
        .border-emerald-500\/50 { border-color: rgba(16, 185, 129, 0.5); }
        
        .text-blue-500 { color: #3b82f6; }
        .text-cyan-500 { color: #06b6d4; }
        .text-indigo-500 { color: #6366f1; }
        .text-purple-500 { color: #a855f7; }
        .text-emerald-500 { color: #10b981; }
      `}</style>
    </div>
  );
};

export default WhyThisPage;
