
import React from 'react';

const GovInstCapacityPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. NATIONAL CAPACITY SNAPSHOT */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest uppercase">
                SPATIAL INFRASTRUCTURE AUDIT
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                National <br/><span className="gradient-text">Capacity.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Mapping the physical ceiling of national education. Understanding where capacity 
                exists, where bottlenecks occur, and where strategic expansion is mandated.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full lg:w-auto">
               {[
                 { l: 'Total Seats', v: '4.2M', d: 'Available 2025', c: 'blue' },
                 { l: 'Seat Utilization', v: '88.4%', d: 'Aggregate Load', c: 'indigo' },
                 { l: 'Lab Hubs', v: '12,420', d: 'Specialized Tech', c: 'cyan' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-cyan-500/30 transition-all">
                    <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. REGIONAL CAPACITY MAPPING (VISUAL) */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
         
         {/* Visual Map Mockup */}
         <div className="lg:col-span-7 relative h-[600px] bg-[#0a0a0a] border border-white/5 rounded-[64px] overflow-hidden shadow-2xl flex items-center justify-center group">
            <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" />
            <div className="absolute top-10 left-10 z-20">
               <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Infrastructure Density Map</span>
               <p className="text-[8px] text-gray-600 font-bold uppercase mt-1">Live Spatial Registry Active</p>
            </div>

            <svg viewBox="0 0 400 450" className="w-full h-full relative z-10 fill-cyan-500/10 stroke-cyan-500/30">
               <path d="M180,20 L220,50 L250,150 L350,250 L300,350 L200,420 L100,350 L50,250 L100,100 Z" className="hover:fill-cyan-500/20 transition-all cursor-pointer" />
               
               {/* Hotspots of high capacity */}
               <circle cx="200" cy="225" r="30" className="fill-cyan-500/10 stroke-cyan-500/40" />
               <circle cx="200" cy="225" r="10" className="fill-cyan-500/40 animate-ping" />
               
               <circle cx="120" cy="180" r="20" className="fill-blue-500/10 stroke-blue-500/40" />
               <circle cx="280" cy="300" r="25" className="fill-indigo-500/10 stroke-indigo-500/40" />
            </svg>

            <div className="absolute bottom-10 right-10 flex flex-col gap-2 no-print">
               <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">+</button>
               <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">-</button>
            </div>
         </div>

         {/* Access & Ratio Stats */}
         <div className="lg:col-span-5 space-y-12">
            <h2 className="text-3xl font-black uppercase tracking-tight">Access <span className="text-cyan-500">Analytics.</span></h2>
            <div className="space-y-10">
               {[
                  { label: 'Institution Density', val: '4.2', unit: '/10k students', c: 'blue' },
                  { label: 'Faculty-Student Ratio', val: '1:18', unit: 'Aggregate', c: 'cyan' },
                  { label: 'Program Availability', val: '84%', unit: 'Cross-Domain', c: 'indigo' }
               ].map((m, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-cyan-500/40 transition-all">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{m.label}</p>
                     <div className="flex items-baseline gap-4">
                        <span className={`text-4xl font-black text-${m.c}-500`}>{m.val}</span>
                        <span className="text-[10px] font-bold text-gray-600 uppercase">{m.unit}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* C. DEMAND-CAPACITY MISMATCH ANALYSIS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-20 text-center">
               <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Mismatch <span className="text-rose-500">Alerts.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Space-Demand Bottleneck Identification</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[
                  { t: "Overcrowded Hubs", g: "114% Utilization", d: "Tier-1 cities showing critical seat shortfalls in STEM programs.", i: "🏙️", color: "rose" },
                  { t: "Lab Shortage", g: "Zero specialized GPU-Labs", d: "High student interest in AI in North-West sector vs zero physical lab infra.", i: "🔬", color: "orange" },
                  { t: "Asset Stagnation", g: "22% Utilization", d: "Rural vocational centers showing high idle rates despite industry demand.", i: "🏛️", color: "blue" }
               ].map((item, i) => (
                  <div key={i} className={`p-12 rounded-[56px] bg-black/60 border border-white/10 flex flex-col h-full hover:border-${item.color}-500/40 transition-all group`}>
                     <div className="flex justify-between items-start mb-8">
                        <div className="text-4xl">{item.i}</div>
                        <span className={`px-4 py-1 bg-${item.color}-500/10 text-${item.color}-500 border border-${item.color}-500/20 rounded-full text-[8px] font-black uppercase tracking-widest`}>{item.g}</span>
                     </div>
                     <h4 className="text-xl font-black uppercase text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">{item.t}</h4>
                     <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed mb-10 flex-grow">{item.d}</p>
                     <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:bg-blue-600 hover:text-white transition-all">Assign Planning Review</button>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* D. EXPANSION & INVESTMENT SIGNALS (AI FLAGS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Expansion <br/><span className="text-cyan-500">Orchestrator.</span></h2>
               <p className="text-gray-400 text-xl font-medium leading-relaxed">
                  Where should we build next? Our AI models institutional demand 5 years out. 
                  If current trends continue, the <span className="text-white">Maharashtra IT Hub</span> 
                  requires <span className="text-white">12,000 additional seats</span> in Applied AI by 2027.
               </p>
               <div className="space-y-6">
                  {[
                     { t: "Priority 01: North-East Hub", d: "High latent interest in Green Energy; 0 matching ITIs.", i: "🏗️" },
                     { t: "Priority 02: Rural Skill Bridge", d: "84 existing centers need hardware refresh for NSQF Lv 4 support.", i: "⚡" }
                  ].map((sig, i) => (
                    <div key={i} className="flex gap-8 items-start group">
                       <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-2xl group-hover:bg-cyan-600 group-hover:text-white transition-all shrink-0">
                          {sig.i}
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-sm font-black uppercase text-white tracking-widest">{sig.t}</h4>
                          <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{sig.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-cyan-600/5 blur-[120px] rounded-full" />
               <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
                  <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-12 text-center">Investment Readiness Score</h4>
                  <div className="space-y-10">
                     {[
                        { label: 'Public Sector Expansion', val: 92, c: 'bg-cyan-600' },
                        { label: 'PPP Opportunity Index', val: 78, c: 'bg-blue-600' },
                        { label: 'Social Access Parity', val: 64, c: 'bg-indigo-600' }
                     ].map((item, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black uppercase text-white tracking-widest">{item.label}</span>
                              <span className="text-xl font-black text-white">{item.val}%</span>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${item.c} transition-all duration-1500 shadow-[0_0_10px_currentColor]`} style={{ width: `${item.val}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/5 text-center">
                     <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic">"Directing ₹800Cr towards priority hubs ensures 100% capacity sync by 2026."</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Building <br/><span className="gradient-text">The Backbone.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Capacity is the foundation of opportunity. Career Soulmate 
              orchestrates national spatial resources so every student gets a seat in the future.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center no-print">
             <button onClick={() => alert('Launching Infrastructure Budgeter...')} className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-cyan-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Infrastructure Masterplan
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to National Hub
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
        .text-rose-500 { color: #f43f5e; }
        .bg-rose-500 { background-color: #f43f5e; }
        .text-orange-500 { color: #f97316; }
        .bg-orange-500 { background-color: #f97316; }
      `}</style>
    </div>
  );
};

export default GovInstCapacityPage;
