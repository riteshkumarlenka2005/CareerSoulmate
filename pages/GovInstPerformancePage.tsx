
import React from 'react';

const GovInstPerformancePage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. NATIONAL PERFORMANCE OVERVIEW */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                INSTITUTIONAL OUTCOME INTELLIGENCE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Institutional <br/><span className="gradient-text">Excellence.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Evaluating institutions through the lens of human outcome. Moving beyond reputation 
                towards verifiable results in skill readiness, retention, and economic mobility.
              </p>
            </div>

            <div className="flex gap-4 no-print">
               <button onClick={() => window.print()} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Download Master Audit</button>
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl shadow-blue-600/30">Sync SSC Data</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { l: 'Enrollment Growth', v: '+6.8%', d: 'Nat. Baseline: +4.2%', c: 'blue' },
               { l: 'Retention Index', v: '94.2%', d: 'Aggregate Benchmark', c: 'indigo' },
               { l: 'Skill Readiness', v: '78/100', d: 'Tier-1 Industry Sync', c: 'emerald' },
               { l: 'Placement Velocity', v: '0.84', d: 'Hiring Efficiency', c: 'purple' }
             ].map((stat, i) => (
               <div key={i} className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group shadow-xl">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">{stat.l}</p>
                  <h3 className={`text-4xl font-black mb-2 text-${stat.c}-500 tracking-tighter leading-none`}>{stat.v}</h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* B. INSTITUTION RANKING & CLUSTERING */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Performance <span className="text-blue-500">Clusters.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Clustered by outcome parity, not size</p>
         </div>

         <div className="grid lg:grid-cols-3 gap-8">
            {[
               { t: "Elite Performers", b: "Top 5%", d: "High NSQF adoption (Level 7+) and 90%+ placement conversion.", i: "💎", color: "blue" },
               { t: "Steady Progressors", b: "Mid 75%", d: "Consistent academic baseline with growing vocational integration.", i: "📈", color: "indigo" },
               { t: "High Support Needs", b: "Lower 20%", d: "Stagnant retention and low interdisciplinary credit utilization.", i: "⚠️", color: "rose" }
            ].map((cluster, i) => (
               <div key={i} className="p-12 rounded-[56px] bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all group flex flex-col h-full shadow-2xl">
                  <div className="flex justify-between items-start mb-10">
                     <div className="text-4xl">{cluster.i}</div>
                     <span className={`px-4 py-1 bg-${cluster.color}-500/10 text-${cluster.color}-500 border border-${cluster.color}-500/20 rounded-full text-[8px] font-black uppercase tracking-widest`}>{cluster.b} Band</span>
                  </div>
                  <h4 className="text-2xl font-black uppercase text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">{cluster.t}</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-12 flex-grow">{cluster.d}</p>
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:bg-blue-600 hover:text-white transition-all">Explore Peer Group</button>
               </div>
            ))}
         </div>
      </section>

      {/* C. DIMENSION-WISE PERFORMANCE (RADAR/SCORECARDS) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-12">
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Institutional <br/><span className="text-blue-500">Benchmark Scorecard.</span></h2>
                  <div className="space-y-10">
                     {[
                        { l: 'Academic Outcomes', v: 84, c: 'blue' },
                        { l: 'Skill Adoption (NSQF)', v: 62, c: 'indigo' },
                        { l: 'NEP Compliance', v: 92, c: 'purple' },
                        { l: 'Infrastructure Util.', v: 74, c: 'emerald' }
                     ].map((item, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-sm font-black uppercase text-white tracking-widest">{item.l}</span>
                              <span className="text-xl font-black text-white">{item.v}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full bg-${item.c}-600 shadow-[0_0_10px_currentColor] transition-all duration-1500`} style={{ width: `${item.v}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Radar Chart Mockup */}
               <div className="relative aspect-square p-12 rounded-[64px] border border-white/10 bg-black shadow-2xl flex items-center justify-center">
                  <svg viewBox="0 0 400 400" className="w-full h-full opacity-40">
                     <circle cx="200" cy="200" r="180" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="5,5" />
                     <circle cx="200" cy="200" r="135" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="5,5" />
                     <circle cx="200" cy="200" r="90" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="5,5" />
                     <circle cx="200" cy="200" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="5,5" />
                     <path d="M200,40 L340,140 L340,260 L200,360 L60,260 L60,140 Z" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.4)" strokeWidth="2" />
                     <path d="M200,100 L300,180 L280,280 L180,320 L120,240 L140,120 Z" fill="rgba(168,85,247,0.3)" stroke="#a855f7" strokeWidth="3" className="animate-pulse" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Aggregate Efficiency</p>
                        <p className="text-4xl font-black text-white">82.4%</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* D. TREND & IMPROVEMENT TRACKING */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Policy Impact <br/><span className="text-emerald-500">Signals.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Correlating intervention with outcome shifts</p>
         </div>

         <div className="grid md:grid-cols-2 gap-12">
            <div className="p-12 rounded-[56px] bg-white/[0.01] border border-white/5 space-y-10 group hover:border-emerald-500/30 transition-all">
               <h4 className="text-xl font-black uppercase text-white mb-6">Year-on-Year <span className="text-emerald-500">Momentum.</span></h4>
               <div className="space-y-8">
                  {[
                     { label: 'Vocational Conversion', v: '+24%', d: 'Post-NSQF Alignment' },
                     { label: 'Industry Engagement', v: '+18%', d: 'Post-Internship Mandate' },
                     { label: 'Student Satisfaction', v: '+12%', d: 'Platform Integration' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center group/item">
                       <div>
                          <p className="text-sm font-black text-white group-hover/item:text-emerald-400 transition-colors uppercase">{item.label}</p>
                          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{item.d}</p>
                       </div>
                       <span className="text-2xl font-black text-emerald-500">{item.v}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-12 rounded-[56px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center group hover:border-blue-500/40 transition-all">
               <div className="text-5xl mb-8">🛠️</div>
               <h4 className="text-2xl font-black uppercase text-white mb-4">Intervention Architect</h4>
               <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed max-w-sm mx-auto mb-10">
                  Targeted funding recommendation: Directing grants to the "High Support" cluster can 
                  raise regional skill parity by <span className="text-white">12% within one cycle</span>.
               </p>
               <button className="px-10 py-5 bg-blue-600 text-white rounded-[32px] font-black uppercase tracking-widest text-[10px] shadow-xl">Simulate Funding Ripple</button>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Fairness through <br/><span className="gradient-text">Visibility.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Policy should be a surgical instrument, not a blunt force. Career Soulmate 
              gives you the precision to support institutions where it matters most.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center no-print">
             <button onClick={() => alert('Launching Policy Modeler...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Generate Intervention Draft
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Global Terminal
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
          background-image: linear-gradient(to right, #3b82f6 1px, transparent 1px),
                            linear-gradient(to bottom, #3b82f6 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .text-rose-500 { color: #f43f5e; }
        .bg-rose-500 { background-color: #f43f5e; }
        .text-emerald-500 { color: #10b981; }
        .bg-emerald-500 { background-color: #10b981; }
      `}</style>
    </div>
  );
};

export default GovInstPerformancePage;
