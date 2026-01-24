
import React, { useState, useMemo } from 'react';

interface CreditFramework {
  program: string;
  total: number;
  distribution: { semester: number; credits: number }[];
  exits: { level: string; threshold: number; award: string }[];
}

const PROGRAM_FRAMEWORKS: CreditFramework[] = [
  {
    program: 'B.Tech CS (FYUP)',
    total: 160,
    distribution: [
      { semester: 1, credits: 20 },
      { semester: 2, credits: 20 },
      { semester: 3, credits: 22 },
      { semester: 4, credits: 22 },
      { semester: 5, credits: 20 },
      { semester: 6, credits: 20 },
      { semester: 7, credits: 18 },
      { semester: 8, credits: 18 },
    ],
    exits: [
      { level: 'Year 1', threshold: 40, award: 'UG Certificate' },
      { level: 'Year 2', threshold: 80, award: 'UG Diploma' },
      { level: 'Year 3', threshold: 120, award: "Bachelor's Degree" },
      { level: 'Year 4', threshold: 160, award: 'Honours/Research' }
    ]
  }
];

const AdminAcademicsCreditsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedProgram, setSelectedProgram] = useState(PROGRAM_FRAMEWORKS[0]);
  const [skillRatio, setSkillRatio] = useState(25); // 25% skill vs academic
  const [abcSyncActive, setAbcSyncActive] = useState(true);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. HEADER & FRAMEWORK OVERVIEW */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                CREDIT ARCHITECTURE ENGINE v1.4
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Credit <span className="gradient-text">Governance.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Design and enforce institutional credit logic. Fully mapped to NEP 2020 
                standards, including Academic Bank of Credits (ABC) portability and 
                multi-exit threshold management.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-auto">
               {[
                 { l: 'Total Credits', v: selectedProgram.total, c: 'blue' },
                 { l: 'ABC Readiness', v: '98%', c: 'emerald' },
                 { l: 'Transfer Cap', v: '40%', c: 'purple' },
                 { l: 'Audit Status', v: 'Ready', c: 'cyan' }
               ].map((stat, i) => (
                 <div key={i} className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-indigo-500/30 transition-all">
                    <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. CORE FRAMEWORK & DISTRIBUTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* Framework Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl space-y-10">
              <h3 className="text-xl font-black uppercase tracking-tight">Exit <span className="text-indigo-500">Thresholds.</span></h3>
              <div className="space-y-6">
                 {selectedProgram.exits.map((exit, i) => (
                   <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-indigo-500/40 transition-all relative overflow-hidden">
                      <div className="flex justify-between items-start mb-2">
                         <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{exit.level}</span>
                         <span className="text-sm font-black text-white">{exit.threshold} Cr</span>
                      </div>
                      <h4 className="text-xs font-black uppercase text-gray-400 group-hover:text-indigo-400 transition-colors">{exit.award}</h4>
                      <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full" style={{ width: '0%' }} />
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-10 rounded-[56px] bg-indigo-600/5 border border-indigo-500/20 shadow-2xl space-y-10">
              <h3 className="text-xl font-black uppercase tracking-tight">ABC <span className="text-blue-500">Sync Status.</span></h3>
              <div className="space-y-6">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">ABC ID Mandatory</span>
                    <button onClick={() => setAbcSyncActive(!abcSyncActive)} className={`w-12 h-6 rounded-full relative transition-all ${abcSyncActive ? 'bg-emerald-600' : 'bg-white/5'}`}>
                       <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${abcSyncActive ? 'right-1' : 'left-1'}`} />
                    </button>
                 </div>
                 <div className="p-6 rounded-3xl bg-black/40 border border-white/5 text-center">
                    <p className="text-[9px] font-black text-gray-600 uppercase mb-2">Automated Deposit Frequency</p>
                    <p className="text-sm font-black text-white">Daily at 02:00 AM</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Main Content: Distribution Graph */}
        <div className="lg:col-span-8 space-y-8">
           <div className="p-10 rounded-[64px] bg-[#0a0a0a] border border-white/5 shadow-2xl flex flex-col h-full">
              <div className="flex justify-between items-center mb-16">
                 <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Credit <span className="text-indigo-500">Allocation.</span></h3>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Semester-wise Load Balancing</p>
                 </div>
                 <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:text-white hover:bg-indigo-600 transition-all">Redistribute Credits</button>
              </div>

              <div className="h-64 flex items-end gap-3 px-10 border-b border-white/5 relative">
                 {selectedProgram.distribution.map((sem, i) => (
                   <div key={i} className="flex-1 bg-white/5 relative group">
                      <div className="absolute bottom-0 left-0 right-0 bg-indigo-600/40 group-hover:bg-indigo-600 transition-all duration-700" style={{ height: `${(sem.credits / 25) * 100}%` }} />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all">
                         <span className="text-xl font-black text-white">{sem.credits}</span>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-gray-600 uppercase">Sem {sem.semester}</div>
                   </div>
                 ))}
              </div>

              <div className="mt-20 grid md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Weightage Protocol</h4>
                    <div className="space-y-4">
                       {[
                          { l: 'Major Core', v: 60, c: 'bg-indigo-600' },
                          { l: 'Minor / Elective', v: 20, c: 'bg-purple-600' },
                          { l: 'Skill Enhancement', v: 20, c: 'bg-emerald-600' }
                       ].map((item, i) => (
                          <div key={i} className="space-y-2">
                             <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">{item.l}</span>
                                <span className="text-xs font-black text-white">{item.v}%</span>
                             </div>
                             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${item.c}`} style={{ width: `${item.v}%` }} />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="p-8 rounded-[40px] bg-indigo-900/10 border border-indigo-500/20 flex flex-col justify-center text-center">
                    <h5 className="text-xs font-black text-white uppercase mb-4 tracking-widest">Compliance Audit</h5>
                    <p className="text-sm text-gray-400 font-medium italic leading-relaxed">
                       "Current structure provides 92% alignment with UGC FYUP framework. 8% deviation noted in Year 4 Research credit weights."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* C. CREDIT RULE ENGINE (INTERACTIVE) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Rule <span className="text-indigo-500">Configuration.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Fine-tuning institutional credit logic</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-10 rounded-[56px] bg-black/60 border border-white/10 space-y-10 group hover:border-indigo-500/30 transition-all">
                  <div className="space-y-2">
                     <h4 className="text-sm font-black uppercase text-white tracking-widest">Skill vs Academic Ratio</h4>
                     <p className="text-[9px] text-gray-500 font-bold uppercase">Defining vocational integration depth</p>
                  </div>
                  <div className="space-y-6">
                     <input 
                        type="range" 
                        min="10" 
                        max="50" 
                        value={skillRatio} 
                        onChange={(e) => setSkillRatio(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                     />
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-600 uppercase">Standard (10%)</span>
                        <span className="text-xl font-black text-indigo-500">{skillRatio}%</span>
                        <span className="text-[10px] font-black text-gray-600 uppercase">Intensive (50%)</span>
                     </div>
                  </div>
               </div>

               <div className="p-10 rounded-[56px] bg-black/60 border border-white/10 space-y-10 group hover:border-purple-500/30 transition-all">
                  <div className="space-y-2">
                     <h4 className="text-sm font-black uppercase text-white tracking-widest">Transferability Caps</h4>
                     <p className="text-[9px] text-gray-500 font-bold uppercase">Max external credits acceptable</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     {[
                        { label: 'MOOC (Swayam)', val: '40%' },
                        { label: 'OER / Self', val: '10%' },
                        { label: 'Lateral Entry', val: '50%' },
                        { label: 'Exchange', val: '20%' }
                     ].map((cap, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                           <p className="text-[7px] font-black text-gray-600 uppercase mb-1">{cap.label}</p>
                           <p className="text-sm font-black text-white">{cap.val}</p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="p-10 rounded-[56px] bg-black/60 border border-white/10 space-y-10 group hover:border-emerald-500/30 transition-all">
                  <div className="space-y-2">
                     <h4 className="text-sm font-black uppercase text-white tracking-widest">Automatic Mapping</h4>
                     <p className="text-[9px] text-gray-500 font-bold uppercase">Rule-based credit allocation</p>
                  </div>
                  <div className="space-y-4">
                     {['Auto-Scale Credits by Difficulty', 'Reject Non-Verified Certs', 'Enable Partial Year Transfers'].map((rule, i) => (
                        <div key={i} className="flex items-center justify-between group/rule">
                           <span className="text-[9px] font-black text-gray-400 group-hover/rule:text-white transition-colors uppercase">{rule}</span>
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Traceable <br/><span className="gradient-text">Excellence.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Credits are the currency of professional destiny. Career Soulmate 
              ensures every unit earned is flexible, traceable, and fully aligned with national policy.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Credit Audit for Batch 2025...')} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-[10px]">
               Audit Batch Credits
             </button>
             <button onClick={() => onNavigate('admin-dashboard')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Dashboard
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #6366f1 1px, transparent 1px),
                            linear-gradient(to bottom, #6366f1 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .text-indigo-400 { color: #818cf8; }
        .text-indigo-500 { color: #6366f1; }
        .text-blue-500 { color: #3b82f6; }
        .text-cyan-500 { color: #06b6d4; }
        .text-emerald-500 { color: #10b981; }
        .text-purple-500 { color: #a855f7; }
        .bg-indigo-600 { background-color: #4f46e5; }
        .bg-indigo-600\/10 { background-color: rgba(79, 70, 229, 0.1); }
        .border-indigo-500\/20 { border-color: rgba(99, 102, 241, 0.2); }
      `}</style>
    </div>
  );
};

export default AdminAcademicsCreditsPage;
