
import React, { useState, useMemo } from 'react';

interface ScenarioMetrics {
  id: string;
  name: string;
  conflictRate: number;
  facultyLoad: number;
  roomUtil: number;
  nepScore: number;
  description: string;
  color: string;
}

const AdminTimetableScenariosPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeScenario, setActiveScenario] = useState('Baseline');
  const [isSimulating, setIsSimulating] = useState(false);

  const scenarios: ScenarioMetrics[] = [
    { 
      id: 'base', 
      name: 'Baseline', 
      conflictRate: 4.2, 
      facultyLoad: 78, 
      roomUtil: 92, 
      nepScore: 92, 
      description: 'Current active institutional schedule.', 
      color: 'slate' 
    },
    { 
      id: 'a', 
      name: 'Scenario Alpha', 
      conflictRate: 0.4, 
      facultyLoad: 88, 
      roomUtil: 84, 
      nepScore: 98, 
      description: 'Optimized for NEP interdisciplinary electives + evening lab slots.', 
      color: 'indigo' 
    },
    { 
      id: 'b', 
      name: 'Scenario Beta', 
      conflictRate: 1.2, 
      facultyLoad: 68, 
      roomUtil: 98, 
      nepScore: 84, 
      description: 'Optimized for maximal faculty satisfaction (No morning slots for research staff).', 
      color: 'cyan' 
    }
  ];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. SCENARIO LAB HERO */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                STRATEGIC PLANNING SIMULATOR
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Scenario <span className="gradient-text">Lab.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Test institutional changes before deployment. Ask "What If?" and analyze 
                the ripples across faculty load, student conflicts, and NEP compliance.
              </p>
            </div>

            <div className="flex gap-4">
               <button onClick={handleSimulate} className={`px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl shadow-blue-600/30 ${isSimulating ? 'opacity-50 pointer-events-none' : ''}`}>
                  {isSimulating ? 'Computing Iterations...' : 'Launch New Simulation'}
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* B. SCENARIO BUILDER (MODIFIERS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-12 items-start">
           
           {/* Sidebar: Modification Controls */}
           <div className="lg:col-span-1 space-y-8">
              <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/10 shadow-2xl space-y-10">
                 <h3 className="text-xl font-black uppercase tracking-tight">Modify <span className="text-blue-500">Variables.</span></h3>
                 
                 <div className="space-y-6">
                    <div className="space-y-3">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Faculty Availability</label>
                       <div className="grid grid-cols-2 gap-2">
                          <button className="py-2.5 rounded-xl bg-blue-600 text-white text-[8px] font-black uppercase">Standard</button>
                          <button className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-[8px] font-black uppercase hover:text-white transition-all">Restricted</button>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Student Intake Delta</label>
                       <input type="range" className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                       <div className="flex justify-between text-[8px] font-black text-gray-700 uppercase">
                          <span>-20%</span>
                          <span className="text-blue-500">+10% (Active)</span>
                          <span>+50%</span>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">New Elective Baskets</label>
                       <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-[10px] font-black uppercase outline-none text-white">
                          <option>None (Baseline)</option>
                          <option>Add FinTech Minor</option>
                          <option>Add AI Ethics</option>
                       </select>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Delivery Mode</label>
                       <div className="flex flex-col gap-2">
                          {['100% On-Campus', '20% Hybrid / Swayam', 'Full Blended (NEP Max)'].map(mode => (
                             <button key={mode} className={`text-left px-4 py-3 rounded-xl border text-[9px] font-black uppercase transition-all ${mode.includes('20%') ? 'bg-indigo-600/10 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-gray-600'}`}>
                                {mode}
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
                 
                 <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase text-gray-500 hover:text-white transition-all">Reset to Baseline</button>
              </div>
           </div>

           {/* Main: Comparison Engine */}
           <div className="lg:col-span-3 space-y-12">
              <div className="flex justify-between items-end">
                 <h2 className="text-3xl font-black uppercase tracking-tight">Scenario <span className="text-indigo-500">Analytics.</span></h2>
                 <div className="flex gap-4">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Comparing 3 Scenarios</span>
                 </div>
              </div>

              <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-white/[0.02] border-b border-white/10">
                          <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Configuration</th>
                          <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Conflict Rate</th>
                          <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Faculty Load</th>
                          <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">NEP Readiness</th>
                          <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Utility</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {scenarios.map(s => (
                          <tr key={s.id} className={`group transition-colors cursor-pointer ${activeScenario === s.name ? 'bg-indigo-600/5' : 'hover:bg-white/[0.01]'}`} onClick={() => setActiveScenario(s.name)}>
                             <td className="p-10">
                                <div className="space-y-1">
                                   <h4 className={`text-lg font-black uppercase ${activeScenario === s.name ? 'text-indigo-400' : 'text-white'}`}>{s.name}</h4>
                                   <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest max-w-[200px] leading-relaxed">{s.description}</p>
                                </div>
                             </td>
                             <td className="p-10 text-center">
                                <span className={`text-xl font-black ${s.conflictRate < 1 ? 'text-emerald-500' : 'text-rose-500'}`}>{s.conflictRate}%</span>
                             </td>
                             <td className="p-10 text-center">
                                <div className="space-y-2">
                                   <span className="text-sm font-black text-white">{s.facultyLoad}%</span>
                                   <div className="w-16 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                                      <div className="h-full bg-blue-500" style={{ width: `${s.facultyLoad}%` }} />
                                   </div>
                                </div>
                             </td>
                             <td className="p-10 text-center">
                                <span className="text-sm font-black text-purple-500">{s.nepScore}/100</span>
                             </td>
                             <td className="p-10 text-center">
                                <button className={`px-5 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${activeScenario === s.name ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-500 border border-white/10 group-hover:text-white'}`}>
                                   {activeScenario === s.name ? 'Selected' : 'Select'}
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              {/* Impact Visualization (Delta Chart) */}
              <div className="p-12 rounded-[64px] bg-[#080808] border border-white/10 relative overflow-hidden">
                 <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
                 <h3 className="text-xl font-black uppercase tracking-tight mb-12">Delta <span className="text-blue-500">Analysis.</span></h3>
                 <div className="grid md:grid-cols-2 gap-20">
                    <div className="space-y-10">
                       <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Metric Shifts (vs Baseline)</h4>
                       {[
                          { l: 'Instructional Capacity', v: '+12%', c: 'text-emerald-500' },
                          { l: 'Facility Congestion', v: '-24%', c: 'text-emerald-500' },
                          { l: 'Average Faculty Work-Hours', v: '+4h', c: 'text-rose-500' },
                          { l: 'Interdisciplinary Flexibility', v: '+68%', c: 'text-indigo-400' }
                       ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center group">
                             <span className="text-xs font-black text-white uppercase tracking-tight">{item.l}</span>
                             <span className={`text-sm font-black ${item.c}`}>{item.v}</span>
                          </div>
                       ))}
                    </div>
                    
                    <div className="flex flex-col justify-center items-center text-center p-8 rounded-[40px] bg-indigo-600/5 border border-indigo-500/20">
                       <div className="w-20 h-20 rounded-full border-4 border-indigo-500 flex items-center justify-center text-2xl font-black mb-6 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                          A+
                       </div>
                       <h4 className="text-lg font-black uppercase text-white mb-2">NEP Compliance Peak</h4>
                       <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-4">
                          This scenario achieves the highest possible inter-departmental 
                          sync rate allowed under current infrastructure constraints.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* C. VISUAL IMPACT HEATMAP (CONFLICT OVERLAYS) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Conflict <span className="text-rose-500">Density Map.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Space-Time bottleneck identification</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                  { l: 'Mon 10:00 - 11:30', val: 0.1, d: 'Minimal Overlap', c: 'emerald' },
                  { l: 'Tue 14:00 - 15:30', val: 0.8, d: 'Lab Block Contention', c: 'rose' },
                  { l: 'Wed 09:00 - 10:30', val: 0.2, d: 'Optimal Distribution', c: 'blue' },
                  { l: 'Thu 11:00 - 12:30', val: 0.95, d: 'Critical Capacity Peak', c: 'rose' },
                  { l: 'Fri 16:00 - 17:30', val: 0.05, d: 'High Availability', c: 'emerald' },
                  { l: 'Sat 10:00 - 12:00', val: 0.4, d: 'Moderate Elective Flow', c: 'indigo' }
               ].map((block, i) => (
                  <div key={i} className="p-8 rounded-[40px] bg-black/60 border border-white/10 hover:border-white/20 transition-all group">
                     <p className="text-[9px] font-black text-gray-600 uppercase mb-4 tracking-[0.2em]">{block.l}</p>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                        <div className={`h-full bg-${block.c}-500 transition-all duration-700`} style={{ width: `${block.val * 100}%` }} />
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-[8px] font-black text-gray-500 uppercase">{block.d}</span>
                        <span className={`text-xs font-black text-${block.c}-500`}>{Math.round(block.val * 100)}%</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[150px] -z-10" />
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Plan Before <br/><span className="gradient-text">Implementation.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Timetabling mistakes cost thousands of student-hours. Career Soulmate's 
              Scenario Lab ensures your institutional logic is sound before the first lecture starts.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Generating Comparative Audit PDF...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Comparison Report
             </button>
             <button onClick={() => onNavigate('admin-timetable-generate')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Deploy Active Scenario
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
        .bg-emerald-500 { background-color: #10b981; }
        .text-emerald-500 { color: #10b981; }
        .text-indigo-400 { color: #818cf8; }
        .bg-indigo-600 { background-color: #4f46e5; }
        .border-indigo-500\/20 { border-color: rgba(99, 102, 241, 0.2); }
      `}</style>
    </div>
  );
};

export default AdminTimetableScenariosPage;
