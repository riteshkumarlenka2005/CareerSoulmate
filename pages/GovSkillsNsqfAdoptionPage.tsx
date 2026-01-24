
import React from 'react';

const GovSkillsNsqfAdoptionPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. NSQF ADOPTION OVERVIEW (KPIs) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest uppercase">
                VOCATIONAL FRAMEWORK MONITORING
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Framework <br/><span className="gradient-text">Adoption.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Measuring the penetration of the National Skill Qualification Framework (NSQF). 
                Tracking institutional alignment and learner progression across levels 1–10.
              </p>
            </div>

            <div className="flex gap-4 no-print">
               <button onClick={() => window.print()} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Download NSQF Audit</button>
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl">Framework Sync</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { l: 'Mapped Learners', v: '18.2M', d: '64% of cohort', c: 'blue' },
               { l: 'Registered SSCs', v: '38', d: 'Sector Skill Councils', c: 'cyan' },
               { l: 'Adopting Inst.', v: '14,210', d: '+12% this cycle', c: 'purple' },
               { l: 'Level 4+ Certs', v: '4.8M', d: 'Employability Ready', c: 'emerald' }
             ].map((stat, i) => (
               <div key={i} className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group shadow-xl">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">{stat.l}</p>
                  <h3 className={`text-4xl font-black mb-2 text-${stat.c}-500 tracking-tighter leading-none`}>{stat.v}</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* B. LEVEL-WISE DISTRIBUTION (VISUAL) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Level Distribution Chart */}
            <div className="lg:col-span-8 p-12 rounded-[64px] bg-[#0a0a0a] border border-white/5 shadow-2xl space-y-12">
               <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Level <span className="text-cyan-500">Progression.</span></h2>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Learner Pyramid</span>
               </div>
               
               <div className="space-y-8">
                  {[
                    { l: 'NSQF Level 7+ (Professional)', v: 12, c: 'bg-purple-600' },
                    { l: 'NSQF Level 5-6 (Advanced)', v: 24, c: 'bg-blue-600' },
                    { l: 'NSQF Level 4 (Skilled)', v: 42, c: 'bg-cyan-500' },
                    { l: 'NSQF Level 1-3 (Foundational)', v: 22, c: 'bg-gray-700' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-3 group">
                       <div className="flex justify-between items-end">
                          <span className="text-xs font-black uppercase text-gray-400 group-hover:text-white transition-colors">{item.l}</span>
                          <span className="text-sm font-black text-white">{item.v}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${item.c} transition-all duration-1000`} style={{ width: `${item.v}%` }} />
                       </div>
                    </div>
                  ))}
               </div>

               <div className="pt-10 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6">Framework Movement (Sankey Projection)</h4>
                  <div className="relative h-24 flex items-center justify-between px-10">
                     <div className="text-center">
                        <p className="text-[8px] font-black text-gray-500 uppercase">Input</p>
                        <p className="text-xs font-black">Level 3</p>
                     </div>
                     <div className="flex-grow mx-10 relative h-1 bg-white/5 rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 to-cyan-400/80 rounded-full" style={{ width: '85%' }} />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                     </div>
                     <div className="text-center">
                        <p className="text-[8px] font-black text-gray-500 uppercase">Outcome</p>
                        <p className="text-xs font-black">Level 4+</p>
                     </div>
                  </div>
                  <p className="text-[10px] text-gray-500 text-center uppercase font-bold mt-4">85% of learners successfully transition from foundational to skilled levels within 12 months.</p>
               </div>
            </div>

            {/* Outcome Correlation Sidebar */}
            <div className="lg:col-span-4 space-y-8">
               <div className="p-12 rounded-[64px] bg-[#0a0a0a] border border-white/5 shadow-2xl h-full flex flex-col">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-12">Outcome <span className="text-emerald-500">Correlation.</span></h3>
                  <div className="space-y-10 flex-grow">
                     {[
                        { l: 'Employment Rate (Lv 4)', v: 72, c: 'emerald' },
                        { l: 'Wage Premium (Lv 6 vs Degree)', v: '+34', c: 'blue' },
                        { l: 'Institutional Retention', v: 94, c: 'purple' }
                     ].map((item, i) => (
                        <div key={i} className="group">
                           <div className="flex justify-between mb-2">
                              <span className="text-[10px] font-black text-gray-500 uppercase">{item.l}</span>
                              <span className={`text-sm font-black text-${item.c}-500`}>{item.v}%</span>
                           </div>
                           <div className="h-0.5 w-full bg-white/5">
                              <div className={`h-full bg-${item.c}-600`} style={{ width: `${item.v}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/5">
                     <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">Policy Value</p>
                     <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase italic">
                        "NSQF Level 4 is now the <span className="text-white">minimum benchmark</span> for state technical hiring parity."
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* C. REGIONAL & INSTITUTIONAL COMPARISON */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-20 text-center">
               <h2 className="text-3xl font-black uppercase tracking-tight">Regional <span className="text-blue-500">Penetration.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Adoption variance across districts & tiers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-12 rounded-[56px] bg-black border border-white/10 flex flex-col items-center text-center group hover:border-blue-500/40 transition-all">
                  <div className="text-4xl mb-8">🌇</div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Urban vs Rural</p>
                  <div className="flex justify-between w-full text-[10px] font-black uppercase mb-2">
                     <span className="text-blue-400">Urban: 72%</span>
                     <span className="text-gray-500">Rural: 28%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                     <div className="h-full bg-blue-600" style={{ width: '72%' }} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-4">Intervention needed in rural hubs to align ITI outcomes with NCrF standards.</p>
               </div>

               <div className="p-12 rounded-[56px] bg-black border border-white/10 flex flex-col items-center text-center group hover:border-purple-500/40 transition-all">
                  <div className="text-4xl mb-8">🏛️</div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Institutional Tiers</p>
                  <div className="flex justify-between w-full text-[10px] font-black uppercase mb-2">
                     <span className="text-purple-400">Govt: 94%</span>
                     <span className="text-gray-500">Private: 42%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                     <div className="h-full bg-purple-600" style={{ width: '94%' }} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-4">Government institutions leading adoption; Private aided sectors show a 52% lag.</p>
               </div>

               <div className="p-12 rounded-[56px] bg-black border border-white/10 flex flex-col items-center text-center group hover:border-emerald-500/40 transition-all">
                  <div className="text-4xl mb-8">⚙️</div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">SSC Participation</p>
                  <div className="flex justify-between w-full text-[10px] font-black uppercase mb-2">
                     <span className="text-emerald-400">Active SSCs: 32</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                     <div className="h-full bg-emerald-600 shadow-[0_0_10px_#10b981]" style={{ width: '84%' }} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-4">84% of mapped industries now contribute to live competency standards (NOS).</p>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Dignity through <br/><span className="gradient-text">Certification.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              NSQF is the grammar of employability. Career Soulmate converts 
              policy framework into real professional movement at a national scale.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center no-print">
             <button onClick={() => alert('Opening Framework Auditor...')} className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-cyan-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Full Framework Audit
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to National Terminal
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #06b6d4 1px, transparent 1px),
                            linear-gradient(to bottom, #06b6d4 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .text-emerald-500 { color: #10b981; }
        .text-cyan-500 { color: #06b6d4; }
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .bg-[#050505], .bg-[#0a0a0a], .bg-[#080808], .bg-black { background: white !important; border-color: #eee !important; color: black !important; }
          .text-white, .text-gray-300, .text-gray-400, .text-gray-500, .text-gray-600 { color: black !important; }
          .border-white\/5, .border-white\/10 { border-color: #eee !important; }
          .gradient-text { background: none !important; -webkit-text-fill-color: black !important; color: black !important; }
        }
      `}</style>
    </div>
  );
};

export default GovSkillsNsqfAdoptionPage;
