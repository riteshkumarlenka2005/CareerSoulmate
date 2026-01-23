
import React from 'react';

const GovAnalyticsEnrollmentPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. NATIONAL ENROLLMENT OVERVIEW (KPIs) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                NATIONAL EDUCATION PARTICIPATION INDEX
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Enrollment <br/><span className="gradient-text">Intelligence.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Strategic oversight of human capital formation. Real-time mapping of education participation 
                across all tiers of the national system.
              </p>
            </div>

            <div className="flex gap-4 no-print">
               <button onClick={() => window.print()} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Download Audit</button>
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl shadow-blue-600/30">Live Sync</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { l: 'Total Enrollment', v: '41.4M', d: '+4.2% YoY', c: 'blue' },
               { l: 'Gross Enrollment (GER)', v: '27.3%', d: 'Target: 50%', c: 'indigo' },
               { l: 'Gender Parity Index', v: '1.02', d: 'F:M Ratio', c: 'purple' },
               { l: 'Vocational Uptake', v: '12%', d: 'Rising Trend', c: 'emerald' }
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

      {/* B. PROGRAM & STREAM ANALYSIS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Stream Distribution Chart Mockup */}
            <div className="lg:col-span-7 p-12 rounded-[64px] bg-[#0a0a0a] border border-white/5 shadow-2xl space-y-12">
               <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Stream <span className="text-blue-500">Distribution.</span></h2>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Academic Year 2024-25</span>
               </div>
               
               <div className="space-y-10">
                  {[
                    { l: 'Arts & Humanities', v: 34, c: 'bg-rose-500' },
                    { l: 'Science & Tech', v: 28, c: 'bg-blue-600' },
                    { l: 'Commerce & Mgmt', v: 22, c: 'bg-cyan-500' },
                    { l: 'Vocational / Skills', v: 16, c: 'bg-emerald-500' }
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
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6">Institution Ownership Mix</p>
                  <div className="flex gap-1 h-6 w-full rounded-xl overflow-hidden">
                     <div className="h-full bg-blue-600" style={{ width: '45%' }} title="Government: 45%" />
                     <div className="h-full bg-indigo-600" style={{ width: '35%' }} title="Private Aided: 35%" />
                     <div className="h-full bg-slate-700" style={{ width: '20%' }} title="Private Un-Aided: 20%" />
                  </div>
                  <div className="flex gap-6 mt-4">
                     <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-600" /><span className="text-[8px] font-black text-gray-500 uppercase">Government</span></div>
                     <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-indigo-600" /><span className="text-[8px] font-black text-gray-500 uppercase">Aided</span></div>
                     <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-700" /><span className="text-[8px] font-black text-gray-500 uppercase">Un-Aided</span></div>
                  </div>
               </div>
            </div>

            {/* Level Breakdown Sidebar */}
            <div className="lg:col-span-5 space-y-8">
               <div className="p-12 rounded-[64px] bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden h-full">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-12">Educational <span className="text-purple-500">Tiers.</span></h3>
                  <div className="space-y-12">
                     {[
                        { l: 'Undergraduate', v: '32.1M', p: 77.5 },
                        { l: 'Postgraduate', v: '4.8M', p: 11.5 },
                        { l: 'Diploma', v: '2.8M', p: 7.0 },
                        { l: 'PhD / Research', v: '0.2M', p: 0.5 }
                     ].map((tier, i) => (
                        <div key={i} className="flex justify-between items-center group">
                           <div>
                              <h4 className="text-sm font-black uppercase text-white group-hover:text-purple-400 transition-colors">{tier.l}</h4>
                              <p className="text-[10px] font-bold text-gray-600 uppercase mt-1">{tier.v} Learners</p>
                           </div>
                           <div className="text-right">
                              <span className="text-lg font-black text-white">{tier.p}%</span>
                              <div className="w-12 h-1 bg-white/5 rounded-full mt-1">
                                 <div className="h-full bg-purple-600" style={{ width: `${tier.p}%` }} />
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/5">
                     <div className="p-6 rounded-3xl bg-purple-600/5 border border-purple-500/10">
                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-2">Policy Insight</p>
                        <p className="text-[11px] text-gray-400 font-medium leading-relaxed uppercase">
                           Teacher Education shows a <span className="text-white">12% growth</span> spike following the ITEP mandate implementation.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* C. COHORT & DEMOGRAPHIC INSIGHTS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-20 text-center">
               <h2 className="text-3xl font-black uppercase tracking-tight">Demographic <span className="text-blue-500">Parity.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Analysis of social and regional participation</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-12 rounded-[56px] bg-black border border-white/10 flex flex-col items-center text-center group hover:border-white/20 transition-all">
                  <div className="text-4xl mb-8">🌇</div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Regional Split</p>
                  <div className="flex justify-between w-full text-[10px] font-black uppercase mb-2">
                     <span className="text-blue-400">Urban: 62%</span>
                     <span className="text-gray-500">Rural: 38%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                     <div className="h-full bg-blue-600" style={{ width: '62%' }} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-4">Rural participation increased by 8.4% since decentralized platform rollout.</p>
               </div>

               <div className="p-12 rounded-[56px] bg-black border border-white/10 flex flex-col items-center text-center group hover:border-white/20 transition-all">
                  <div className="text-4xl mb-8">🧬</div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Gender Equilibrium</p>
                  <div className="flex justify-between w-full text-[10px] font-black uppercase mb-2">
                     <span className="text-purple-400">Female: 51%</span>
                     <span className="text-gray-500">Male: 49%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                     <div className="h-full bg-purple-600 shadow-[0_0_10px_rgba(168,85,247,0.4)]" style={{ width: '51%' }} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-4">STEM enrollment for female learners crossed the 40% threshold this cycle.</p>
               </div>

               <div className="p-12 rounded-[56px] bg-black border border-white/10 flex flex-col items-center text-center group hover:border-white/20 transition-all">
                  <div className="text-4xl mb-8">💰</div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Socio-Economic Filter</p>
                  <div className="flex justify-between w-full text-[10px] font-black uppercase mb-2">
                     <span className="text-emerald-400">Aid Recipients: 72%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                     <div className="h-full bg-emerald-600" style={{ width: '72%' }} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-4">7.2M students currently supported through central/state direct benefit schemes.</p>
               </div>
            </div>
         </div>
      </section>

      {/* D. DROPOUT & RETENTION TRENDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight">Transition <span className="text-rose-500">Loss.</span></h2>
            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-2xl mt-4">
               Mapping the funnel from secondary to higher education. Identifying systemic leakage 
               points in the professional development pipeline.
            </p>
         </div>

         <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
               {[
                 { l: 'Class 10 → Class 12 Transition', p: 84, loss: 16, c: 'blue' },
                 { l: 'Class 12 → UG Higher Ed', p: 27, loss: 73, c: 'rose' },
                 { l: 'UG Year 1 → Year 2 Persistence', p: 92, loss: 8, c: 'emerald' }
               ].map((funnel, i) => (
                 <div key={i} className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                       <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors">{funnel.l}</h4>
                       <span className="text-2xl font-black text-white">{funnel.p}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full transition-all duration-1500 ${funnel.c === 'rose' ? 'bg-rose-600 shadow-[0_0_10px_#f43f5e]' : funnel.c === 'blue' ? 'bg-blue-600' : 'bg-emerald-600'}`} style={{ width: `${funnel.p}%` }} />
                    </div>
                    <p className="text-[10px] font-black text-gray-600 uppercase mt-4">Transition Loss (Dropout): <span className="text-rose-500">{funnel.loss}%</span></p>
                 </div>
               ))}
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-rose-600/5 blur-[120px] rounded-full" />
               <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl">
                  <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-12 text-center">High Risk Cohort Alert</h4>
                  <div className="space-y-10">
                     <div className="p-8 rounded-[40px] bg-rose-600/5 border border-rose-500/20">
                        <h5 className="text-sm font-black uppercase text-rose-500 mb-2 tracking-widest">Region: North-East Hub</h5>
                        <p className="text-[11px] text-gray-400 font-bold uppercase leading-relaxed mb-6">
                           Year 1 UG attrition rate in technical programs is <span className="text-white">24% above</span> national baseline.
                        </p>
                        <button className="w-full py-4 bg-rose-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/30">Trigger Intervention Research</button>
                     </div>
                     <div className="p-8 rounded-[40px] bg-emerald-600/5 border border-emerald-500/20">
                        <h5 className="text-sm font-black uppercase text-emerald-500 mb-2 tracking-widest">Growth: Skill-Bridge Success</h5>
                        <p className="text-[11px] text-gray-400 font-bold uppercase leading-relaxed">
                           Retention in B.A. Multidisciplinary has increased by <span className="text-white">18%</span> post-NEP elective rollout.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             National <br/><span className="gradient-text">Visibility.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Data-driven policymaking starts with total visibility. Career Soulmate 
              transforms millions of learner touchpoints into a unified national intelligence layer.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center no-print">
             <button onClick={() => alert('Generating National Enrollment Dossier...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Policy Brief
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to Global Dashboard
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

export default GovAnalyticsEnrollmentPage;
