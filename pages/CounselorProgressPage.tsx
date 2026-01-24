
import React, { useState, useMemo } from 'react';

interface StudentProgress {
  id: string;
  name: string;
  clarity: number; // 0-100
  skills: number; // 0-100
  assessments: number; // 0-100
  goals: number; // 0-100
  lastActivity: string;
  trend: 'up' | 'down' | 'stable';
  stagnationAlert: boolean;
  conflictingSignals: string[];
}

const PROGRESS_STATS = [
  { label: 'Avg Clarity', v: '72%', c: 'indigo' },
  { label: 'Skill Growth', v: '+14%', c: 'emerald' },
  { label: 'Completion', v: '68%', c: 'blue' },
  { label: 'Risk Count', v: '12', c: 'rose' }
];

const STUDENTS_PROGRESS: StudentProgress[] = [
  { id: 'L-9821', name: 'Alex Johnson', clarity: 98, skills: 85, assessments: 100, goals: 92, lastActivity: '2 hours ago', trend: 'up', stagnationAlert: false, conflictingSignals: [] },
  { id: 'L-4412', name: 'Maria Garcia', clarity: 42, skills: 30, assessments: 20, goals: 15, lastActivity: '8 days ago', trend: 'down', stagnationAlert: true, conflictingSignals: ['Low engagement', 'Mixed career search'] },
  { id: 'L-2210', name: 'Sam Chen', clarity: 65, skills: 72, assessments: 85, goals: 50, lastActivity: 'Yesterday', trend: 'stable', stagnationAlert: false, conflictingSignals: ['Pivot candidate'] },
  { id: 'L-7756', name: 'Sarah Miller', clarity: 88, skills: 90, assessments: 95, goals: 100, lastActivity: '3 hours ago', trend: 'up', stagnationAlert: false, conflictingSignals: [] },
  { id: 'L-3341', name: 'Rohan Gupta', clarity: 38, skills: 45, assessments: 40, goals: 25, lastActivity: 'Yesterday', trend: 'down', stagnationAlert: false, conflictingSignals: ['Skill lag vs cohort'] }
];

const CounselorProgressPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const selectedStudent = useMemo(() => STUDENTS_PROGRESS.find(s => s.id === selectedStudentId), [selectedStudentId]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. PROGRESS OVERVIEW DASHBOARD (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                COHORT VELOCITY MONITOR
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Growth <br /><span className="gradient-text">Intelligence.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Aggregated performance tracking. Monitor developmental milestones across 
                your entire student body to prevent stagnation and detect early warning signals.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {PROGRESS_STATS.map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-indigo-500/30 transition-all">
                    <p className={`text-3xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. RISK DETECTION ENGINE (AI ALERTS) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-4">
              AI Risk <span className="text-rose-500">Detection.</span>
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]" />
            </h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Active Intervention Priority Queue</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'No Progress', count: 4, label: 'L-4412, L-9021 +2', desc: 'Zero activity in 7+ days.', color: 'rose' },
              { type: 'Conflicting Signals', count: 8, label: 'L-2210, L-3341 +6', desc: 'Inconsistent career search patterns.', color: 'orange' },
              { type: 'Peer Lag', count: 12, label: 'L-3341, L-1102 +10', desc: 'Critical skill gaps vs cohort avg.', color: 'indigo' }
            ].map((alert, i) => (
               <div key={i} className={`p-8 rounded-[40px] bg-${alert.color}-500/5 border border-${alert.color}-500/20 hover:bg-${alert.color}-500/10 transition-all cursor-pointer group`}>
                  <div className="flex justify-between items-start mb-6">
                     <span className={`text-[10px] font-black uppercase tracking-widest text-${alert.color}-500`}>{alert.type}</span>
                     <span className="text-2xl font-black text-white">{alert.count}</span>
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase mb-2">{alert.label}</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">{alert.desc}</p>
                  <button className={`mt-6 text-[9px] font-black uppercase text-${alert.color}-500 group-hover:underline`}>Run Intervention →</button>
               </div>
            ))}
         </div>
      </section>

      {/* C. INDIVIDUAL PROGRESS DRILL-DOWN */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="grid lg:grid-cols-3 gap-16">
              {/* List of Learners */}
              <div className="lg:col-span-1 space-y-6">
                 <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-10">Cohort Drill-Down</h3>
                 <div className="flex flex-col gap-3">
                    {STUDENTS_PROGRESS.map(s => (
                      <button 
                        key={s.id}
                        onClick={() => setSelectedStudentId(s.id)}
                        className={`p-6 rounded-3xl border transition-all duration-300 text-left flex justify-between items-center ${selectedStudentId === s.id ? 'bg-indigo-600/10 border-indigo-500/50 shadow-2xl' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                      >
                         <div>
                            <p className="text-[10px] font-black text-white uppercase">{s.name}</p>
                            <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{s.id}</p>
                         </div>
                         <div className={`w-2 h-2 rounded-full ${s.trend === 'up' ? 'bg-emerald-500' : s.trend === 'down' ? 'bg-rose-500 animate-pulse' : 'bg-blue-500'}`} />
                      </button>
                    ))}
                 </div>
              </div>

              {/* Detail Analytics Visual */}
              <div className="lg:col-span-2">
                 {selectedStudent ? (
                    <div className="p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl space-y-12 animate-in zoom-in duration-500">
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className="text-3xl font-black uppercase text-white tracking-tighter leading-none">{selectedStudent.name}</h4>
                             <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-2">Personal Growth Dossier</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black text-gray-600 uppercase">Last Sync</p>
                             <p className="text-[10px] font-black text-white uppercase">{selectedStudent.lastActivity}</p>
                          </div>
                       </div>

                       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                          {[
                            { l: 'Clarity', v: selectedStudent.clarity, c: 'bg-indigo-500' },
                            { l: 'Skills', v: selectedStudent.skills, c: 'bg-blue-500' },
                            { l: 'Assessments', v: selectedStudent.assessments, c: 'bg-emerald-500' },
                            { l: 'Goals', v: selectedStudent.goals, c: 'bg-purple-500' }
                          ].map((m, idx) => (
                             <div key={idx} className="space-y-3">
                                <div className="flex justify-between">
                                   <span className="text-[9px] font-black text-gray-500 uppercase">{m.l}</span>
                                   <span className="text-xs font-black text-white">{m.v}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                   <div className={`h-full ${m.c} transition-all duration-1000`} style={{ width: `${m.v}%` }} />
                                </div>
                             </div>
                          ))}
                       </div>

                       {/* Simulated Chart (Linear) */}
                       <div className="p-10 rounded-[40px] bg-white/[0.01] border border-white/5 relative h-48 flex items-end gap-2 px-8">
                          <div className="absolute top-4 left-6 text-[8px] font-black text-gray-700 uppercase tracking-widest">Monthly Growth Trend (v.04)</div>
                          {[20, 35, 30, 45, 60, 55, 74, 92].map((h, i) => (
                             <div key={i} className="flex-1 bg-indigo-600/20 relative group/bar">
                                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 transition-all duration-1500" style={{ height: `${h}%` }} />
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all text-[8px] font-black text-white">{h}%</div>
                             </div>
                          ))}
                       </div>

                       <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-12">
                          <div>
                             <h5 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-4">Improvement Areas</h5>
                             <div className="flex flex-wrap gap-2">
                                {['Advanced SQL', 'Soft Logic', 'ML Orchestration'].map(tag => (
                                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase text-gray-500">{tag}</span>
                                ))}
                             </div>
                          </div>
                          <div>
                             <h5 className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-4">AI Observations</h5>
                             <ul className="space-y-1">
                                {selectedStudent.conflictingSignals.length > 0 ? (
                                   selectedStudent.conflictingSignals.map(s => <li key={s} className="text-[10px] font-bold text-gray-400 uppercase">• {s}</li>)
                                ) : (
                                   <li className="text-[10px] font-bold text-emerald-500 uppercase">• Profile Optimal & Balanced</li>
                                )}
                             </ul>
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[64px] text-center p-20">
                       <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-8 opacity-20">👤</div>
                       <h3 className="text-xl font-black uppercase text-gray-600">Select Learner Dossier</h3>
                       <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest mt-2 max-w-xs mx-auto">Analyze individual trajectories and trigger personalized counselor intervention loops.</p>
                    </div>
                 )}
              </div>
           </div>
        </div>
      </section>

      {/* D. COUNSELOR INTERVENTION TRACKER */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-16">
            <div>
               <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Intervention <br /><span className="text-emerald-500">Efficacy Tracker.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Closing the guidance-action loop</p>
            </div>
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 hover:text-white transition-all shadow-xl">New Session Log</button>
         </div>

         <div className="grid grid-cols-1 gap-4">
            {[
              { student: 'Sam Chen', advice: 'Recommended UX Design over Core CS based on personality sync.', outcome: 'Engagement Up 40%', impact: 'High', date: 'Feb 24, 2025' },
              { student: 'Maria Garcia', advice: 'Assigned "Python Syntax" bridge course for skill shortfall.', outcome: 'In Progress', impact: 'Moderate', date: 'Feb 22, 2025' },
              { student: 'Rohan Gupta', advice: 'Career clarity session to resolve indecision between Finance & Tech.', outcome: 'Destiny Locked', impact: 'Extreme', date: 'Feb 18, 2025' }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-[40px] bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                 <div className="flex items-center gap-8 flex-grow min-w-[200px]">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-gray-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                       {item.student.charAt(0)}
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-lg font-black uppercase text-white group-hover:text-emerald-400 transition-colors">{item.student}</h4>
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.date}</p>
                    </div>
                 </div>
                 <div className="flex-grow max-w-xl">
                    <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Guidance Delivered</p>
                    <p className="text-xs font-medium text-gray-400 leading-relaxed italic">"{item.advice}"</p>
                 </div>
                 <div className="flex items-center gap-12 text-center md:text-right min-w-[280px] justify-end">
                    <div>
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Observed Outcome</p>
                       <p className="text-xs font-black text-white uppercase">{item.outcome}</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Counselor ROI</p>
                       <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                         item.impact === 'Extreme' ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]' : 
                         item.impact === 'High' ? 'bg-blue-600/10 text-blue-500' : 'bg-white/5 text-gray-600'
                       }`}>{item.impact}</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Transform <br/><span className="gradient-text">Destinies.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Tracking progress is only half the battle. Your guidance is the catalyst 
              that converts raw student potential into high-value professional outcomes.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Cohort Progress PDF...')} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Cohort Progress Report
             </button>
             <button onClick={() => onNavigate('student-list')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Student Directory
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
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CounselorProgressPage;
