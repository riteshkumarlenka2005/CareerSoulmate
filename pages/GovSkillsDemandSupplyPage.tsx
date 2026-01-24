
import React, { useState, useMemo } from 'react';

interface SkillMetric {
  name: string;
  demand: number;
  supply: number;
  gap: number;
  trend: 'up' | 'down' | 'stable';
  sector: string;
}

const SKILL_DATA: SkillMetric[] = [
  { name: 'Neural Engineering', demand: 92, supply: 12, gap: 80, trend: 'up', sector: 'IT & AI' },
  { name: 'EV Diagnostics', demand: 85, supply: 34, gap: 51, trend: 'up', sector: 'Manufacturing' },
  { name: 'Renewable Audit', demand: 68, supply: 42, gap: 26, trend: 'up', sector: 'Green Jobs' },
  { name: 'Data Privacy Law', demand: 75, supply: 65, gap: 10, trend: 'stable', sector: 'Legal' },
  { name: 'Digital Literacy', demand: 98, supply: 88, gap: 10, trend: 'stable', sector: 'Education' },
  { name: 'Cloud Native Ops', demand: 82, supply: 45, gap: 37, trend: 'up', sector: 'IT & AI' }
];

const GovSkillsDemandSupplyPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeSector, setActiveSector] = useState('All Sectors');

  const filteredSkills = useMemo(() => {
    return SKILL_DATA.filter(s => activeSector === 'All Sectors' || s.sector === activeSector);
  }, [activeSector]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. NATIONAL SKILL DEMAND SNAPSHOT */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                NATIONAL SKILL GAP INTELLIGENCE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Demand vs <br/><span className="gradient-text">Supply.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Mapping the friction between industrial requirements and educational output. 
                Identifying the atomic skills that define the sovereign economy of 2025.
              </p>
            </div>

            <div className="flex gap-4 no-print">
               <button onClick={() => window.print()} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Export Macro Audit</button>
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl">Real-time Pulse</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { l: 'Critical Skill Gap', v: '42.4%', d: 'Aggregate Deficit', c: 'rose' },
               { l: 'Supply Growth', v: '+18%', d: 'NSQF Certified YoY', c: 'emerald' },
               { l: 'Market Demand', v: '14.2M', d: 'Open Tech Roles', c: 'blue' },
               { l: 'Equilibrium Index', v: '0.62', d: 'Supply/Demand Ratio', c: 'purple' }
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

      {/* FILTER BAR */}
      <section className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
           <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {['All Sectors', 'IT & AI', 'Manufacturing', 'Green Jobs', 'Education', 'Legal'].map(s => (
                <button 
                  key={s}
                  onClick={() => setActiveSector(s)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeSector === s ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'}`}
                >
                  {s}
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* B. GAP ANALYSIS ENGINE (MAIN TABLE) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight">Deficit <span className="text-rose-500">Heatmap.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Ranked by urgency of intervention</p>
         </div>

         <div className="overflow-x-auto rounded-[56px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10">
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Skill Module</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Market Demand</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Current Supply</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Gap Index</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredSkills.map(skill => (
                     <tr key={skill.name} className="group hover:bg-white/[0.01] transition-colors">
                        <td className="p-10">
                           <div className="space-y-1">
                              <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors leading-none">{skill.name}</h4>
                              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{skill.sector} Division</p>
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <span className="text-sm font-black text-white">{skill.demand}%</span>
                           <div className="w-16 h-1 bg-white/5 rounded-full mx-auto mt-2 overflow-hidden">
                              <div className="h-full bg-blue-600" style={{ width: `${skill.demand}%` }} />
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <span className="text-sm font-black text-gray-400">{skill.supply}%</span>
                           <div className="w-16 h-1 bg-white/5 rounded-full mx-auto mt-2 overflow-hidden">
                              <div className="h-full bg-emerald-600" style={{ width: `${skill.supply}%` }} />
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <span className={`text-xl font-black ${skill.gap > 50 ? 'text-rose-500' : 'text-orange-500'}`}>{skill.gap}%</span>
                        </td>
                        <td className="p-10 text-center">
                           <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                             skill.gap > 50 ? 'bg-rose-500/10 text-rose-500' : 
                             skill.gap > 20 ? 'bg-orange-500/10 text-orange-500' : 
                             'bg-emerald-500/10 text-emerald-500'
                           }`}>
                              {skill.gap > 50 ? 'CRITICAL DEFICIT' : skill.gap > 20 ? 'MODERATE' : 'OPTIMAL'}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* C. FORECAST & SCENARIO MODELING */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-10">
                  <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Policy <br/><span className="text-blue-500">Forecasting.</span></h2>
                  <p className="text-gray-400 text-xl font-medium leading-relaxed">
                     Simulating the impact of increased NSQF enrollment. If Year 1 ITI 
                     capacity increases by 20%, the EV Diagnostics gap resolves within 
                     <span className="text-white"> 14 months.</span>
                  </p>
                  
                  <div className="space-y-8">
                     {[
                        { label: 'Baseline Gap', val: 74, color: 'bg-white/10' },
                        { label: 'Post-Intervention (6m)', val: 42, color: 'bg-blue-600/40' },
                        { label: 'Projected Resolution (12m)', val: 12, color: 'bg-emerald-600' }
                     ].map((item, i) => (
                        <div key={i} className="space-y-3">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black uppercase text-gray-500">{item.label}</span>
                              <span className="text-lg font-black text-white">{item.val}% Gap</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color} transition-all duration-1500`} style={{ width: `${item.val}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
                  <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl">
                     <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12 text-center">Intervention Deployment Simulator</h4>
                     <div className="space-y-10">
                        <div className="p-8 rounded-[40px] bg-blue-600/5 border border-blue-500/20">
                           <h5 className="text-sm font-black uppercase text-blue-500 mb-2 tracking-widest">Macro Directive #1</h5>
                           <p className="text-[11px] text-gray-400 font-bold uppercase leading-relaxed mb-6">
                              Direct ₹400Cr towards <span className="text-white">Neural Logic ITIs</span> in MH and TN hubs to mitigate high-tech deficit.
                           </p>
                           <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl">Simulate Funding Cycle</button>
                        </div>
                        <div className="p-8 rounded-[40px] bg-emerald-600/5 border border-emerald-500/20">
                           <h5 className="text-sm font-black uppercase text-emerald-500 mb-2 tracking-widest">Growth: Skill-Bridge Success</h5>
                           <p className="text-[11px] text-gray-400 font-bold uppercase leading-relaxed">
                              Swayam online credits account for <span className="text-white">12%</span> of recent supply surge in Management clusters.
                           </p>
                        </div>
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
             Building the <br/><span className="gradient-text">Future Force.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Policymaking is about foresight. Career Soulmate provides the lens 
              to see economic needs before they become crises.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center no-print">
             <button onClick={() => alert('Generating National Skill Directive...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Skill-Supply Masterplan
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
        .text-rose-500 { color: #f43f5e; }
        .text-orange-500 { color: #f97316; }
        .text-emerald-500 { color: #10b981; }
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

export default GovSkillsDemandSupplyPage;
