
import React, { useState, useMemo } from 'react';

interface Lab {
  id: string;
  name: string;
  department: string;
  specialization: 'Physics' | 'Computer Science' | 'Skill Lab' | 'Mechanical' | 'AI/ML' | 'Bio-Tech';
  capacity: number;
  equipmentLevel: 'Standard' | 'Advanced' | 'Cutting Edge';
  facultyInCharge: string;
  inventory: { item: string; count: number; status: 'Operational' | 'Maintenance' }[];
  safetyConstraints: string[];
  mappedCourses: string[];
  mappedNsqfSkills: { name: string; level: number }[];
  utilization: number; // percentage
  status: 'Available' | 'In-Use' | 'Maintenance';
}

const LABS_DB: Lab[] = [
  {
    id: 'LAB-ML-01',
    name: 'Neural Synthesis Hub',
    department: 'Computer Science',
    specialization: 'AI/ML',
    capacity: 25,
    equipmentLevel: 'Cutting Edge',
    facultyInCharge: 'Dr. Ritesh Lenka',
    status: 'In-Use',
    utilization: 94,
    inventory: [
      { item: 'A100 GPU Cluster', count: 4, status: 'Operational' },
      { item: 'VR/AR Headsets', count: 12, status: 'Operational' },
      { item: 'Bio-feedback Sensors', count: 10, status: 'Maintenance' }
    ],
    safetyConstraints: ['Restricted Access (Authorization Level 2)', 'Climate Controlled (18°C)', 'Surge Protection Active'],
    mappedCourses: ['CS302: Neural Model Architectures', 'CS405: LLM Fine-tuning'],
    mappedNsqfSkills: [{ name: 'Neural Orchestration', level: 8 }, { name: 'GPU Computing', level: 7 }]
  },
  {
    id: 'LAB-ME-02',
    name: 'EV Propulsion Systems Lab',
    department: 'Mechanical Engineering',
    specialization: 'Skill Lab',
    capacity: 40,
    equipmentLevel: 'Advanced',
    facultyInCharge: 'Prof. Mayank Mishra',
    status: 'Available',
    utilization: 62,
    inventory: [
      { item: 'Lithium Battery Cycle Tester', count: 2, status: 'Operational' },
      { item: 'DC Motor Dynamometer', count: 4, status: 'Operational' },
      { item: 'Oscilloscopes', count: 15, status: 'Operational' }
    ],
    safetyConstraints: ['HV Safety Protocol Mandatory', 'Class D Fire Extinguishers', 'Anti-static Flooring'],
    mappedCourses: ['ME412: EV Propulsion Lab', 'SKL102: Battery Management'],
    mappedNsqfSkills: [{ name: 'BMS Diagnostics', level: 5 }, { name: 'EV Repair', level: 4 }]
  },
  {
    id: 'LAB-PHY-03',
    name: 'Quantum Optics Cell',
    department: 'Physics',
    specialization: 'Physics',
    capacity: 15,
    equipmentLevel: 'Advanced',
    facultyInCharge: 'Dr. Lipsita Mishra',
    status: 'Maintenance',
    utilization: 40,
    inventory: [
      { item: 'He-Ne Lasers', count: 8, status: 'Operational' },
      { item: 'Optical Benches', count: 6, status: 'Operational' },
      { item: 'Photon Counters', count: 2, status: 'Maintenance' }
    ],
    safetyConstraints: ['Laser Safety Goggles Required', 'Light-Seal Protocol', 'Restricted Vibration Area'],
    mappedCourses: ['PH301: Quantum Mechanics', 'PH402: Fiber Optics'],
    mappedNsqfSkills: [{ name: 'Optical Alignment', level: 6 }]
  }
];

const AdminInfraLabsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null);
  const [filterDept, setFilterDept] = useState('All Departments');

  const filteredLabs = useMemo(() => {
    return LABS_DB.filter(l => filterDept === 'All Departments' || l.department === filterDept);
  }, [filterDept]);

  const selectedLab = useMemo(() => LABS_DB.find(l => l.id === selectedLabId), [selectedLabId]);

  const stats = {
    totalLabs: LABS_DB.length,
    cuttingEdge: LABS_DB.filter(l => l.equipmentLevel === 'Cutting Edge').length,
    activeUtility: 65,
    safetyIncidents: 0
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. HEADER & LAB DIRECTORY DASHBOARD */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808] z-40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                SPECIALIZED INFRASTRUCTURE CONSOLE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Lab <span className="gradient-text">Intelligence.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Management of high-constraint academic assets. Track specialized equipment, 
                ensure safety compliance, and map physical labs to NSQF skill outcomes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Specialized Labs', v: stats.totalLabs, c: 'blue' },
                 { l: 'Cutting Edge', v: stats.cuttingEdge, c: 'cyan' },
                 { l: 'Avg Utilization', v: `${stats.activeUtility}%`, c: 'purple' },
                 { l: 'Safety Status', v: 'Secure', c: 'emerald' }
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

      {/* FILTER BAR */}
      <section className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
           <div className="flex gap-4 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              {['All Departments', 'Computer Science', 'Mechanical Engineering', 'Physics'].map(dept => (
                <button 
                  key={dept}
                  onClick={() => setFilterDept(dept)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filterDept === dept ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'}`}
                >
                  {dept}
                </button>
              ))}
           </div>
           <div className="flex-grow flex justify-end">
              <button className="px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl">Audit Inventory +</button>
           </div>
        </div>
      </section>

      {/* B. LAB DIRECTORY TABLE */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10">
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Lab Name & Specialization</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Equipment Level</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Utilization</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Faculty Charge</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredLabs.map(lab => (
                     <tr 
                      key={lab.id} 
                      onClick={() => setSelectedLabId(lab.id)}
                      className="group hover:bg-white/[0.01] transition-colors cursor-pointer"
                     >
                        <td className="p-10">
                           <div className="space-y-1">
                              <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors leading-none">{lab.name}</h4>
                              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{lab.specialization} • {lab.id}</p>
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                             lab.equipmentLevel === 'Cutting Edge' ? 'bg-purple-600/10 text-purple-500' : 'bg-white/5 text-gray-400'
                           }`}>{lab.equipmentLevel}</span>
                        </td>
                        <td className="p-10 text-center">
                           <div className="space-y-1">
                              <span className="text-sm font-black text-white">{lab.utilization}%</span>
                              <div className="w-16 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                                 <div className="h-full bg-blue-600" style={{ width: `${lab.utilization}%` }} />
                              </div>
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lab.facultyInCharge}</p>
                        </td>
                        <td className="p-10 text-center">
                           <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                             lab.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500' : 
                             lab.status === 'In-Use' ? 'bg-blue-600/10 text-blue-500' : 'bg-rose-500/10 text-rose-500'
                           }`}>
                              {lab.status}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* C. LAB DETAIL VIEW (MODAL) */}
      {selectedLab && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedLabId(null)} />
           
           <div className="relative w-full max-w-7xl h-full max-h-[92vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-2xl">
              
              {/* Left Col: Constraints & Charge */}
              <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-blue-600/[0.02]">
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Facility Dossier</span>
                       <h2 className="text-4xl font-black uppercase text-white leading-none tracking-tighter">{selectedLab.name}</h2>
                       <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedLab.department}</p>
                    </div>

                    <div className="p-10 rounded-[48px] bg-black border border-white/5 space-y-6">
                       <h3 className="text-xs font-black text-rose-500 uppercase tracking-[0.4em]">Safety & Constraints</h3>
                       <div className="space-y-4">
                          {selectedLab.safetyConstraints.map((c, i) => (
                             <div key={i} className="flex gap-4 items-start group">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shadow-[0_0_10px_#f43f5e]" />
                                <span className="text-[10px] font-black text-gray-300 uppercase leading-relaxed">{c}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <section className="space-y-6">
                       <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Faculty Supervision</h4>
                       <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center font-black text-blue-500">{selectedLab.facultyInCharge.charAt(0)}</div>
                          <p className="text-sm font-black text-white uppercase tracking-widest">{selectedLab.facultyInCharge}</p>
                       </div>
                    </section>
                 </div>
              </div>

              {/* Right Col: Inventory & Mapping */}
              <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40">
                 <div className="flex justify-end mb-10">
                    <button onClick={() => setSelectedLabId(null)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10">
                       <svg className="w-7 h-7 text-gray-500 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 </div>

                 <div className="space-y-20">
                    {/* D. SKILL & COURSE MAPPING (SECTION C) */}
                    <section className="space-y-12">
                       <div className="flex items-center gap-6">
                         <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] whitespace-nowrap">Skill & Course Synergy</h4>
                         <div className="h-px flex-grow bg-white/10" />
                       </div>
                       <div className="grid md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                             <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Supports Academic Courses</p>
                             <div className="space-y-3">
                                {selectedLab.mappedCourses.map(c => (
                                  <div key={c} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-blue-500/20 transition-all">
                                     <span className="text-[10px] font-black text-gray-300 uppercase">{c}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                          <div className="space-y-6">
                             <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Validates NSQF Skills</p>
                             <div className="space-y-3">
                                {selectedLab.mappedNsqfSkills.map(s => (
                                  <div key={s.name} className="flex justify-between items-center p-4 rounded-xl bg-emerald-600/5 border border-emerald-500/20 group hover:border-emerald-500/40 transition-all">
                                     <span className="text-[10px] font-black text-emerald-400 uppercase">{s.name}</span>
                                     <span className="text-[9px] font-black text-gray-500 uppercase">Lv. {s.level}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </section>

                    <section className="space-y-12">
                       <div className="flex items-center gap-6">
                         <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.5em] whitespace-nowrap">Asset Inventory</h4>
                         <div className="h-px flex-grow bg-white/10" />
                       </div>
                       <div className="grid md:grid-cols-2 gap-6">
                          {selectedLab.inventory.map((item, i) => (
                             <div key={i} className="p-6 rounded-[32px] bg-[#0a0a0a] border border-white/5 flex items-center justify-between group hover:border-cyan-500/20 transition-all">
                                <div>
                                   <h5 className="text-sm font-black uppercase text-white group-hover:text-cyan-400 transition-colors leading-tight">{item.item}</h5>
                                   <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Unit Count: {item.count}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                  item.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                }`}>{item.status}</span>
                             </div>
                          ))}
                       </div>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-white/5">
                       <button className="py-7 bg-blue-600 hover:bg-blue-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl transition-all active:scale-95">
                          Modify Timetable Slots
                       </button>
                       <button className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                          Export Asset Health Audit
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Applied <br/><span className="gradient-text">Excellence.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Labs are the bridge from theory to reality. Career Soulmate ensures 
              your specialized facilities support high-stakes skill acquisition for 
              institutional prestige.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Infrastructure Planner...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Plan Facility Upgrade
             </button>
             <button onClick={() => onNavigate('admin-dashboard')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to Admin Dashboard
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
      `}</style>
    </div>
  );
};

export default AdminInfraLabsPage;
