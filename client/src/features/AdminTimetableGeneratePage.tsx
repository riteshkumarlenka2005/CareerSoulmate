import React, { useState, useMemo } from 'react';

type ViewMode = 'Weekly' | 'Faculty' | 'Room' | 'Cohort';

const AdminTimetableGeneratePage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('Weekly');
  const [selectedProgram, setSelectedProgram] = useState('B.Tech CS (S6)');
  
  const [optimizationSettings, setOptimizationSettings] = useState({
    minConflicts: true,
    balanceWorkload: true,
    maxRoomUtil: false,
    prioritizeCore: true
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const scheduleData = [
    { time: '09:00 - 10:00', mon: 'Algorithms', tue: 'Neural Nets', wed: 'OS Lab', thu: 'Ethics', fri: 'Project' },
    { time: '10:00 - 11:00', mon: 'Cloud Ops', tue: 'Algorithms', wed: 'OS Lab', thu: 'Math IV', fri: 'Project' },
    { time: '11:00 - 11:30', mon: 'Break', tue: 'Break', wed: 'Break', thu: 'Break', fri: 'Break' },
    { time: '11:30 - 12:30', mon: 'Neural Nets', tue: 'Math IV', wed: 'Cloud Ops', thu: 'Algorithms', fri: 'Seminar' },
    { time: '12:30 - 01:30', mon: 'Lunch', tue: 'Lunch', wed: 'Lunch', thu: 'Lunch', fri: 'Lunch' },
    { time: '01:30 - 03:30', mon: 'AI Workshop', tue: 'Soft Skills', wed: 'Elective A', thu: 'Lab B', fri: 'Review' },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. HEADER & INPUT CONFIGURATION PANEL */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                NEURAL SCHEDULING ENGINE v4.2
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Generate <span className="gradient-text">Timetable.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Automated constraint satisfaction mapping. Define institutional guardrails and let 
                AI orchestrate the optimal academic flow for your campus.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
               <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                 Configure Master Data
               </button>
               <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl shadow-blue-600/30 active:scale-95 disabled:opacity-50"
               >
                 {isGenerating ? 'Computing Paths...' : 'Launch AI Generator'}
               </button>
            </div>
          </div>

          {isGenerating && (
            <div className="mt-12 space-y-4 animate-in slide-in-from-top-2 duration-300">
               <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Optimizing Constraint Satisfaction...</span>
                  <span className="text-xs font-black text-white">{generationProgress}%</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6] transition-all duration-300" style={{ width: `${generationProgress}%` }} />
               </div>
            </div>
          )}
        </div>
      </section>

      {/* B. CONFIGURATION & OPTIMIZATION TABS */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* SIDEBAR: CONSTRAINTS & SETTINGS */}
        <div className="lg:col-span-4 space-y-8">
           <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl space-y-10">
              <h3 className="text-xl font-black uppercase tracking-tight">Institutional <span className="text-blue-500">Rules.</span></h3>
              
              <div className="space-y-6">
                 <div>
                    <p className="text-[9px] font-black text-gray-600 uppercase mb-4 tracking-widest ml-1">Academic Structure</p>
                    <div className="grid grid-cols-1 gap-3">
                       {['24 Active Programs', '142 Semester Courses', '12 Elective Baskets'].map(rule => (
                         <div key={rule} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-blue-500/20 transition-all">
                            <span className="text-[11px] font-bold text-gray-400 group-hover:text-white uppercase tracking-tight">{rule}</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                         </div>
                       ))}
                    </div>
                 </div>

                 <div>
                    <p className="text-[9px] font-black text-gray-600 uppercase mb-4 tracking-widest ml-1">Faculty & Resources</p>
                    <div className="grid grid-cols-1 gap-3">
                       {['312 Mapped Faculty', 'Max 18h / week Workload', '84 Active Classrooms'].map(rule => (
                         <div key={rule} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:border-blue-500/20 transition-all">
                            <span className="text-[11px] font-bold text-gray-400 group-hover:text-white uppercase tracking-tight">{rule}</span>
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-10 rounded-[56px] bg-blue-600/5 border border-blue-500/30 shadow-2xl space-y-10">
              <h3 className="text-xl font-black uppercase tracking-tight">AI <span className="text-blue-500">Heuristics.</span></h3>
              <div className="space-y-6">
                 {[
                   { id: 'minConflicts', label: 'Minimize Student Conflicts', val: optimizationSettings.minConflicts },
                   { id: 'balanceWorkload', label: 'Balance Faculty Workload', val: optimizationSettings.balanceWorkload },
                   { id: 'maxRoomUtil', label: 'Maximize Room Utilization', val: optimizationSettings.maxRoomUtil },
                   { id: 'prioritizeCore', label: 'Prioritize Core Courses', val: optimizationSettings.prioritizeCore },
                 ].map(set => (
                   <button 
                    key={set.id}
                    // Fix: Property 'val' does not exist on type '{ minConflicts: boolean; balanceWorkload: boolean; maxRoomUtil: boolean; prioritizeCore: boolean; }'
                    // Access property in 'prev' using 'set.id' dynamically.
                    onClick={() => setOptimizationSettings(prev => ({ ...prev, [set.id]: !prev[set.id as keyof typeof prev] }))}
                    className="w-full flex items-center justify-between group"
                   >
                      <span className={`text-[10px] font-black uppercase tracking-widest ${set.val ? 'text-white' : 'text-gray-600'}`}>{set.label}</span>
                      <div className={`w-10 h-5 rounded-full relative transition-all ${set.val ? 'bg-blue-600' : 'bg-white/5'}`}>
                         <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${set.val ? 'right-1' : 'left-1'}`} />
                      </div>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* MAIN: PREVIEW AREA */}
        <div className="lg:col-span-8 space-y-8">
           <div className="p-10 rounded-[64px] bg-[#0a0a0a] border border-white/5 shadow-2xl flex flex-col h-full">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
                 <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Preview.</span></h3>
                    <div className="flex gap-2">
                       <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">98.2% Optimization Score</span>
                    </div>
                 </div>

                 <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 overflow-hidden">
                    {['Weekly', 'Faculty', 'Room', 'Cohort'].map(mode => (
                      <button 
                        key={mode} 
                        onClick={() => setViewMode(mode as any)}
                        className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-white'}`}
                      >
                        {mode}
                      </button>
                    ))}
                 </div>
              </div>

              {/* TIMETABLE GRID */}
              <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-3xl bg-black/40">
                 <table className="w-full border-collapse">
                    <thead>
                       <tr className="bg-white/[0.02] border-b border-white/10">
                          <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest border-r border-white/5 min-w-[120px]">Time Slot</th>
                          <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Monday</th>
                          <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Tuesday</th>
                          <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Wednesday</th>
                          <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Thursday</th>
                          <th className="p-6 text-[10px] font-black uppercase text-gray-500 tracking-widest">Friday</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {scheduleData.map((row, i) => (
                         <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                            <td className="p-6 border-r border-white/5 bg-white/[0.01]">
                               <span className="text-[11px] font-black text-gray-500 tabular-nums">{row.time}</span>
                            </td>
                            {['mon', 'tue', 'wed', 'thu', 'fri'].map(day => {
                               const subject = (row as any)[day];
                               const isSpecial = subject === 'Break' || subject === 'Lunch';
                               return (
                                 <td key={day} className="p-3">
                                    <div className={`p-4 rounded-2xl border transition-all h-full flex flex-col justify-center items-center text-center ${
                                      isSpecial ? 'bg-white/[0.01] border-white/5 opacity-40' :
                                      subject === 'Project' || subject === 'Seminar' ? 'bg-purple-600/5 border-purple-500/20' :
                                      'bg-blue-600/5 border-blue-500/20 hover:border-blue-500/50'
                                    }`}>
                                       <span className={`text-[10px] font-black uppercase tracking-tight ${isSpecial ? 'text-gray-700' : 'text-white'}`}>{subject}</span>
                                       {!isSpecial && <span className="text-[7px] font-bold text-blue-500/60 uppercase tracking-widest mt-1">Room 402</span>}
                                    </div>
                                 </td>
                               );
                            })}
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                 <div className="flex gap-8">
                    <div>
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Conflicts</p>
                       <p className="text-sm font-black text-emerald-500">None Detected</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Utilization</p>
                       <p className="text-sm font-black text-white">84.4%</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Download PDF</button>
                    <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20">Finalize & Publish</button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* C. SCENARIO ANALYSIS (BOTTOM) */}
      <section className="py-24 px-6 bg-[#080808] border-t border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Scenario <span className="text-blue-500">Benchmarking.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Evaluating alternative institutional flows</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                  { label: 'Current Best', score: 98, l: 'Optimal conflict resolution vs teacher satisfaction.', c: 'blue' },
                  { label: 'Infrastructure Lean', score: 92, l: 'Minimal room use; heavier evening slots for labs.', c: 'cyan' },
                  { label: 'Student Balanced', score: 86, l: 'Zero morning labs; optimized for commute peaks.', c: 'indigo' }
               ].map((scenario, i) => (
                  <div key={i} className="p-10 rounded-[56px] bg-black/60 border border-white/10 flex flex-col items-center group hover:border-white/20 transition-all relative">
                     <span className="text-[9px] font-black text-gray-600 uppercase mb-6 tracking-[0.4em]">{scenario.label}</span>
                     <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                        <svg className="w-full h-full rotate-[-90deg]">
                           <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                           <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.42" strokeDashoffset={364.42 - (364.42 * scenario.score / 100)} className={`text-${scenario.c}-500 transition-all duration-1000`} />
                        </svg>
                        <span className="absolute text-2xl font-black text-white">{scenario.score}</span>
                     </div>
                     <p className="text-shadow text-[10px] text-gray-500 font-bold uppercase leading-relaxed text-center px-4">{scenario.l}</p>
                     <button className="mt-8 text-[8px] font-black uppercase text-blue-500 group-hover:underline">Load Scenario →</button>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Decision <br/><span className="gradient-text">Automation.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Timetabling is no longer a human struggle. Career Soulmate 
              converts millions of data points into a single, conflict-free academic flow.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Conflict Resolution Audit...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               View Conflict Audit
             </button>
             <button onClick={() => onNavigate('admin-dashboard')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Admin Dashboard
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
        .text-blue-500 { color: #3b82f6; }
        .text-cyan-500 { color: #06b6d4; }
        .text-indigo-500 { color: #6366f1; }
        .text-emerald-500 { color: #10b981; }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminTimetableGeneratePage;