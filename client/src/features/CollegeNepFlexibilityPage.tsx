
import React, { useState, useMemo } from 'react';

interface EntryExitStep {
  year: number;
  label: string;
  award: string;
  minCredits: number;
  description: string;
  status: 'active' | 'in-review' | 'pending';
}

const ENTRY_EXIT_FLOW: EntryExitStep[] = [
  { year: 1, label: 'Certificate Stage', award: 'Undergraduate Certificate', minCredits: 40, description: 'Foundational literacy and basic vocational training.', status: 'active' },
  { year: 2, label: 'Diploma Stage', award: 'Undergraduate Diploma', minCredits: 80, description: 'Applied technical depth and core subject proficiency.', status: 'active' },
  { year: 3, label: 'Degree Stage', award: "Bachelor's Degree", minCredits: 120, description: 'Comprehensive disciplinary mastery and career readiness.', status: 'active' },
  { year: 4, label: 'Zenith Stage', award: 'Honours / Research Degree', minCredits: 160, description: 'Advanced specialization and research methodologies.', status: 'active' }
];

const INTERDISCIPLINARY_BLUEPRINTS = [
  { name: 'CS + Cognitive Psychology', major: 'Comp Science', minor: 'Psychology', credits: '120 + 20', outcome: 'UX Researcher / AI Ethicist' },
  { name: 'Eco + Data Visualization', major: 'Economics', minor: 'Data Arts', credits: '120 + 15', outcome: 'Policy Data Analyst' },
  { name: 'Business + Sustainable Design', major: 'BBA', minor: 'Env Design', credits: '120 + 25', outcome: 'ESG Consultant' }
];

const CollegeNepFlexibilityPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [simulationYear, setSimulationYear] = useState<number>(3);
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. NEP FLEXIBILITY OVERVIEW (HERO) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black tracking-widest uppercase">
                STRATEGIC POLICY IMPLEMENTATION
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                NEP <span className="gradient-text">Flexibility.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Operationalizing NEP 2020 at scale. Manage multi-disciplinary pathways, 
                ABC credit sync, and modular student journeys with institutional oversight.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full lg:w-auto">
               {[
                 { l: 'Multi-Exit Capable', v: '92%', c: 'purple' },
                 { l: 'Interdisciplinary Links', v: '45+', c: 'blue' },
                 { l: 'ABC Active Sync', v: 'Verified', c: 'emerald' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-purple-500/30 transition-all">
                    <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. ENTRY-EXIT SCENARIOS (MAIN VISUAL) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">The Modular <span className="text-purple-500">Pipeline.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Visualizing multi-entry & exit logic</p>
          </div>
          <button onClick={startSimulation} className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all shadow-xl active:scale-95">
             {isSimulating ? 'Processing...' : 'Run Simulation'}
          </button>
        </div>

        <div className="relative">
           {/* Backbone Line */}
           <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent hidden lg:block" />

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {ENTRY_EXIT_FLOW.map((step, idx) => (
               <div key={step.year} className={`group relative p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 transition-all duration-500 flex flex-col h-full ${simulationYear === step.year ? 'border-purple-500 ring-2 ring-purple-500/20' : 'hover:border-white/20'}`}>
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-12 h-12 rounded-[20px] bg-purple-600/10 border border-purple-500/30 flex items-center justify-center font-black text-purple-500">
                        0{step.year}
                     </div>
                     <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">YEAR</span>
                  </div>

                  <div className="space-y-2 mb-8">
                     <h3 className="text-xl font-black uppercase text-white tracking-tight leading-tight">{step.label}</h3>
                     <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">{step.award}</p>
                  </div>

                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                     {step.description}
                  </p>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black text-gray-600 uppercase">Min Credits</span>
                        <span className="text-sm font-black text-white">{step.minCredits}</span>
                     </div>
                     <button 
                       onClick={() => setSimulationYear(step.year)}
                       className={`w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${simulationYear === step.year ? 'bg-purple-600 border-purple-400 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                     >
                        {simulationYear === step.year ? 'Exit Selected' : 'Simulate Exit'}
                     </button>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* C. INTERDISCIPLINARY OPTIONS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                 <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Hybrid <br/><span className="text-blue-500">Blueprints.</span></h2>
                 <p className="text-gray-400 text-xl font-medium leading-relaxed">
                    NEP removes hard silos. We help you define which Minor specializations 
                    perfectly complement your Major programs for maximum market leverage.
                 </p>
                 <div className="space-y-4">
                    {INTERDISCIPLINARY_BLUEPRINTS.map((bp, i) => (
                      <div key={i} className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 group hover:border-blue-500/40 transition-all flex items-center justify-between">
                         <div className="space-y-1">
                            <h4 className="text-sm font-black uppercase text-white">{bp.name}</h4>
                            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{bp.major} (Major) • {bp.minor} (Minor)</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest mb-1">Career Goal</p>
                            <span className="text-[10px] font-black text-gray-400 uppercase">{bp.outcome}</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
                 <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl">
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12 text-center">Credit Transfer Protocol</h4>
                    <div className="space-y-10">
                       {[
                          { l: 'Core Domain Credits', v: 70, c: 'bg-blue-600' },
                          { l: 'Minor / Elective Credits', v: 20, c: 'bg-purple-600' },
                          { l: 'Vocational / AEC Credits', v: 10, c: 'bg-emerald-600' }
                       ].map((item, i) => (
                         <div key={i} className="space-y-4">
                            <div className="flex justify-between items-end">
                               <span className="text-xs font-black uppercase text-white tracking-widest">{item.l}</span>
                               <span className="text-lg font-black text-white">{item.v}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className={`h-full ${item.c} transition-all duration-1500`} style={{ width: `${item.v}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                       <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Fully Compliant with National Credit Framework (NCrF)</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* D. INSTITUTIONAL READINESS INDICATOR */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-20 text-center">
           <h2 className="text-3xl font-black uppercase tracking-tight">Readiness <span className="text-emerald-500">Audit.</span></h2>
           <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Institutional compliance level</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
           {[
             { t: "Program Compliance", v: 88, d: "Percentage of active programs with mapped Year 1-4 exit options.", i: "📋", c: "emerald" },
             { t: "Credit Bank Status", v: 100, d: "Full automated sync with Academic Bank of Credits (ABC) ID system.", i: "🏦", c: "blue" },
             { t: "Flexibility Level", v: 64, d: "Ability for students to select cross-departmental electives.", i: "🎯", c: "purple" }
           ].map((item, i) => (
             <div key={i} className="p-10 rounded-[56px] bg-white/[0.01] border border-white/5 flex flex-col items-center text-center group hover:border-white/20 transition-all">
                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform">{item.i}</div>
                <h4 className="text-xl font-black uppercase text-white mb-6 tracking-tight">{item.t}</h4>
                <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                   <svg className="w-full h-full rotate-[-90deg]">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.42" strokeDashoffset={364.42 - (364.42 * item.v / 100)} className={`text-${item.c}-500 transition-all duration-1000`} />
                   </svg>
                   <span className="absolute text-2xl font-black text-white">{item.v}%</span>
                </div>
                <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
             </div>
           ))}
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Ready in Practice, <br/><span className="gradient-text">Not Just Theory.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't get left behind in the academic transition of the decade. 
              Career Soulmate gives your institution the technical agility to lead the NEP revolution.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('programs')} className="px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-purple-600/40 uppercase tracking-[0.2em] text-[10px]">
               Remap Program Directory
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Generate Compliance Report
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #a855f7 1px, transparent 1px),
                            linear-gradient(to bottom, #a855f7 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .text-purple-500 { color: #a855f7; }
        .text-blue-500 { color: #3b82f6; }
        .text-emerald-500 { color: #10b981; }
      `}</style>
    </div>
  );
};

export default CollegeNepFlexibilityPage;
