
import React, { useState, useMemo } from 'react';

interface ProgramCapacity {
  name: string;
  enrolled: number;
  capacity: number;
  utilization: number;
  status: 'optimal' | 'constrained' | 'overflow';
}

const CAPACITY_DATA: ProgramCapacity[] = [
  { name: 'B.Tech Computer Science', enrolled: 420, capacity: 400, utilization: 105, status: 'overflow' },
  { name: 'B.Des Cognitive Design', enrolled: 120, capacity: 150, utilization: 80, status: 'optimal' },
  { name: 'B.Com FinTech', enrolled: 280, capacity: 300, utilization: 93, status: 'constrained' },
  { name: 'M.Sc AI Research', enrolled: 45, capacity: 60, utilization: 75, status: 'optimal' }
];

const AdminInfraCapacityPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [simulationIntake, setSimulationIntake] = useState(0); // percentage increase
  const [isHybridMode, setIsHybridMode] = useState(false);

  const stats = {
    totalSeats: 2450,
    labSeats: 480,
    overallUtil: 84,
    bottlenecks: 3
  };

  const simulatedData = useMemo(() => {
    const intakeMultiplier = 1 + (simulationIntake / 100);
    const hybridRelief = isHybridMode ? 0.7 : 1.0; // 30% reduction in physical load if hybrid

    return CAPACITY_DATA.map(p => {
      const simEnrolled = Math.round(p.enrolled * intakeMultiplier);
      const simUtil = Math.round((simEnrolled * hybridRelief / p.capacity) * 100);
      return {
        ...p,
        simEnrolled,
        simUtil,
        simStatus: simUtil > 100 ? 'overflow' : simUtil > 85 ? 'constrained' : 'optimal'
      };
    });
  }, [simulationIntake, isHybridMode]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. CAPACITY OVERVIEW DASHBOARD */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808] z-40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                INSTITUTIONAL READINESS ENGINE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Capacity <span className="gradient-text">Intelligence.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Strategic spatial auditing. Analyze current infrastructure constraints and 
                simulate future demand to plan data-driven campus expansions.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Total Seating', v: stats.totalSeats, c: 'blue' },
                 { l: 'Lab Capacity', v: stats.labSeats, c: 'cyan' },
                 { l: 'Avg Utilization', v: `${stats.overallUtil}%`, c: 'purple' },
                 { l: 'Active Bottlenecks', v: stats.bottlenecks, c: 'rose' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                    <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. PROGRAM VS INFRASTRUCTURE MAPPING */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight">Spatial <span className="text-blue-500">Mapping.</span></h2>
            <div className="flex gap-4">
               <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Enrollment vs Physical Ceiling</span>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-6">
            {CAPACITY_DATA.map(p => (
              <div key={p.name} className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
                 <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${p.status === 'overflow' ? 'bg-rose-600' : p.status === 'constrained' ? 'bg-amber-600' : 'bg-emerald-600'}`} />
                 
                 <div className="flex-grow min-w-[280px]">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Academic Program</p>
                    <h3 className="text-2xl font-black uppercase text-white tracking-tighter">{p.name}</h3>
                 </div>

                 <div className="flex items-center gap-16 text-center md:text-right min-w-[400px] justify-end">
                    <div className="space-y-1">
                       <p className="text-[8px] font-black text-gray-600 uppercase">Live Enrollment</p>
                       <p className="text-xl font-black text-white">{p.enrolled}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[8px] font-black text-gray-600 uppercase">Hard Capacity</p>
                       <p className="text-xl font-black text-gray-400">{p.capacity}</p>
                    </div>
                    <div className="w-32 space-y-2">
                       <div className="flex justify-between items-end">
                          <span className="text-[8px] font-black text-gray-600 uppercase">Utilization</span>
                          <span className={`text-xs font-black ${p.utilization > 100 ? 'text-rose-500' : 'text-emerald-500'}`}>{p.utilization}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${p.utilization > 100 ? 'bg-rose-600 shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-600'}`} style={{ width: `${Math.min(100, p.utilization)}%` }} />
                       </div>
                    </div>
                    <div className="min-w-[120px]">
                       <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                         p.status === 'overflow' ? 'bg-rose-500/10 text-rose-500' : 
                         p.status === 'constrained' ? 'bg-amber-500/10 text-amber-500' : 
                         'bg-emerald-500/10 text-emerald-500'
                       }`}>
                          {p.status}
                       </span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* C. SCENARIO PLANNING SIMULATOR */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Expansion <span className="text-blue-500">Simulator.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Modeling institutional growth vectors</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-16 items-start">
               
               {/* Simulation Controls */}
               <div className="lg:col-span-4 p-12 rounded-[64px] bg-black/60 border border-white/10 shadow-2xl space-y-12">
                  <div className="space-y-6">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Intake Increase (%)</label>
                        <input 
                           type="range" 
                           min="0" 
                           max="100" 
                           value={simulationIntake}
                           onChange={(e) => setSimulationIntake(parseInt(e.target.value))}
                           className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                        />
                        <div className="flex justify-between text-2xl font-black text-blue-500">
                           <span>+{simulationIntake}%</span>
                        </div>
                     </div>

                     <div className="space-y-4 pt-6 border-t border-white/5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Hybrid Efficiency Logic</label>
                        <button 
                           onClick={() => setIsHybridMode(!isHybridMode)}
                           className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all ${isHybridMode ? 'bg-indigo-600/10 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                        >
                           <div className="flex items-center gap-4">
                              <span className="text-xl">{isHybridMode ? '🌐' : '🏛️'}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest">Enable Hybrid (30% physical relief)</span>
                           </div>
                           <div className={`w-3 h-3 rounded-full ${isHybridMode ? 'bg-indigo-500 shadow-[0_0_10px_#6366f1]' : 'bg-gray-800'}`} />
                        </button>
                     </div>
                  </div>

                  <div className="p-8 rounded-[40px] bg-blue-600/5 border border-blue-500/20 text-center">
                     <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-4">AI Prediction</p>
                     <p className="text-sm font-medium text-gray-300 leading-relaxed italic">
                        "Increasing intake by <span className="text-white">+{simulationIntake}%</span> will cause <span className="text-rose-500 font-black">4 program overflows</span>. {isHybridMode ? 'Hybrid mode mitigates 70% of risk.' : 'Immediate facility expansion required.'}"
                     </p>
                  </div>
               </div>

               {/* Simulation Results Table */}
               <div className="lg:col-span-8 overflow-hidden rounded-[56px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-white/[0.02] border-b border-white/10">
                          <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Program</th>
                          <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Sim. Enrollment</th>
                          <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Sim. Utilization</th>
                          <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Risk Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {simulatedData.map(p => (
                          <tr key={p.name} className="group hover:bg-white/[0.01] transition-colors">
                             <td className="p-8"><span className="text-xs font-black text-white uppercase">{p.name}</span></td>
                             <td className="p-8 text-center"><span className="text-sm font-black text-gray-400">{p.simEnrolled}</span></td>
                             <td className="p-8">
                                <div className="space-y-1">
                                   <div className="flex justify-between items-end">
                                      <span className={`text-xs font-black ${p.simStatus === 'overflow' ? 'text-rose-500' : p.simStatus === 'constrained' ? 'text-amber-500' : 'text-emerald-500'}`}>{p.simUtil}%</span>
                                   </div>
                                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                      <div className={`h-full transition-all duration-700 ${p.simStatus === 'overflow' ? 'bg-rose-500' : p.simStatus === 'constrained' ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, p.simUtil)}%` }} />
                                   </div>
                                </div>
                             </td>
                             <td className="p-8 text-center">
                                <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                  p.simStatus === 'overflow' ? 'bg-rose-500/10 text-rose-500' : 
                                  p.simStatus === 'constrained' ? 'bg-amber-500/10 text-amber-500' : 
                                  'bg-emerald-500/10 text-emerald-500'
                                }`}>
                                   {p.simStatus}
                                </span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>

      {/* D. INFRASTRUCTURE GAPS AUDIT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Infrastructure <br/><span className="text-rose-500">Shortfalls.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Identified physical constraints for 2025-26 cycle</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {[
               { t: "AI Research Lab", g: "25 Seats Missing", r: "High-tier GPU cluster access required for PG cohort expansion.", i: "🤖" },
               { t: "Communal Study Bays", g: "800 sq.ft Deficit", r: "Increase in FYUP multidisciplinary electives requires more self-study zones.", i: "📚" },
               { t: "Bilingual Lecture Hall", g: "Audio Lag in Hall A", r: "Hall A requires updated directional mics for hybrid delivery support.", i: "🎤" }
            ].map((gap, i) => (
               <div key={i} className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 flex flex-col h-full hover:border-rose-500/40 transition-all group">
                  <div className="flex justify-between items-start mb-8">
                     <div className="text-4xl">{gap.i}</div>
                     <span className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[8px] font-black uppercase tracking-widest">Gap Detected</span>
                  </div>
                  <h4 className="text-xl font-black uppercase text-white mb-2 leading-tight group-hover:text-rose-400 transition-colors">{gap.t}</h4>
                  <p className="text-sm font-black text-rose-500 uppercase tracking-widest mb-6">{gap.g}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed mb-10 flex-grow">{gap.r}</p>
                  <button className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:bg-rose-600 hover:text-white transition-all">Submit Asset Request</button>
               </div>
            ))}
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Expansion through <br/><span className="gradient-text">Data Mastery.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Every student deserves a seat at the table of destiny. Career Soulmate 
              gives you the precision to build your institution for the future, not the past.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Master Plan Blueprint...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Expansion Master Plan
             </button>
             <button onClick={() => onNavigate('admin-dashboard')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to Admin Console
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
        .bg-emerald-600 { background-color: #059669; }
        .text-amber-500 { color: #f59e0b; }
        .bg-amber-600 { background-color: #d97706; }
      `}</style>
    </div>
  );
};

export default AdminInfraCapacityPage;
