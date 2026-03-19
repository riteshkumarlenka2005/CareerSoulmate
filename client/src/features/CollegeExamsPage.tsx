
import React, { useState, useMemo } from 'react';

interface CompetitiveExam {
  id: string;
  name: string;
  purpose: string;
  category: 'National' | 'State' | 'Corporate' | 'International';
  priority: 'High' | 'Medium' | 'Standard';
  eligibility: string;
  regDate: string;
  examDate: string;
  syllabus: string[];
  careers: string[];
  eligibleStudents: number;
  appliedCount: number;
  appearedCount: number;
}

const COLLEGE_EXAMS_DB: CompetitiveExam[] = [
  {
    id: 'gate_2025',
    name: 'GATE 2025',
    purpose: 'PG Admissions & PSU Hiring',
    category: 'National',
    priority: 'High',
    eligibility: 'Final Year Engineering Students (CGPA 6.5+)',
    // Removed regStart as it is not in the CompetitiveExam interface
    regDate: 'Sept 30, 2024',
    examDate: 'Feb 01, 2025',
    syllabus: ['Engineering Maths', 'Discrete Logic', 'Operating Systems', 'Algorithms'],
    careers: ['M.Tech Scholar', 'ONGC Engineer', 'ISRO Scientist'],
    eligibleStudents: 412,
    appliedCount: 385,
    appearedCount: 360
  },
  {
    id: 'iese_2025',
    name: 'IES (UPSC Engineering Services)',
    purpose: 'Govt Technical Leadership',
    category: 'National',
    priority: 'High',
    eligibility: 'Engineering Graduates',
    regDate: 'Dec 15, 2024',
    examDate: 'June 20, 2025',
    syllabus: ['General Studies', 'Core Discipline Specialty', 'Aptitude'],
    careers: ['Assistant Executive Engineer', 'Director of Ops (Govt)'],
    eligibleStudents: 320,
    appliedCount: 140,
    appearedCount: 0
  },
  {
    id: 'tcs_nqt',
    name: 'TCS National Qualifier Test',
    purpose: 'Mass Corporate Recruitment',
    category: 'Corporate',
    priority: 'Medium',
    eligibility: 'Any Degree Stream',
    regDate: 'Ongoing',
    examDate: 'Oct 15, 2024',
    syllabus: ['Numerical Ability', 'Verbal Reasoning', 'Coding Logic'],
    careers: ['Software Associate', 'Systems Engineer'],
    eligibleStudents: 1200,
    appliedCount: 1150,
    appearedCount: 1100
  }
];

const CollegeExamsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'detail' | 'readiness' | 'prep'>('dashboard');

  const selectedExam = useMemo(() => 
    COLLEGE_EXAMS_DB.find(e => e.id === selectedExamId) || null
  , [selectedExamId]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. EXAM OPPORTUNITY DASHBOARD (TOP) */}
      {!selectedExamId ? (
        <section className="relative pt-28 pb-16 px-6 overflow-visible">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 flex flex-col lg:flex-row justify-between items-end gap-12">
               <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                    COMPETITIVE READINESS TERMINAL
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
                    Outcome <span className="gradient-text">Enablement.</span>
                  </h1>
                  <p className="text-gray-400 max-w-2xl text-lg font-medium">
                    Bridge the gap between academic learning and high-stakes assessments. 
                    Manage the institutional pipeline for the world's most critical career gateways.
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">Export Report</button>
                  <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95">
                    Link New Board Exam
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
               {[
                 { l: 'Upcoming Exams', v: COLLEGE_EXAMS_DB.length, c: 'indigo' },
                 { l: 'Eligible Students', v: '1.2k', c: 'blue' },
                 { l: 'Avg Readiness', v: '64%', c: 'emerald' },
                 { l: 'Success Trend', v: '+8%', c: 'cyan' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-indigo-500/30 transition-all">
                    <p className={`text-3xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>

            <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10">
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Exam Name / Purpose</th>
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Priority</th>
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Eligible Pool</th>
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Applied</th>
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Exam Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {COLLEGE_EXAMS_DB.map(exam => (
                    <tr key={exam.id} className="group hover:bg-white/[0.01] transition-colors cursor-pointer" onClick={() => setSelectedExamId(exam.id)}>
                      <td className="p-10">
                        <div className="space-y-1">
                          <h4 className="text-lg font-black uppercase text-white group-hover:text-indigo-400 transition-colors">{exam.name}</h4>
                          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{exam.purpose}</p>
                        </div>
                      </td>
                      <td className="p-10">
                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          exam.priority === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-600/10 text-blue-500'
                        }`}>
                          {exam.priority}
                        </span>
                      </td>
                      <td className="p-10 text-center"><span className="text-sm font-black text-gray-300">{exam.eligibleStudents}</span></td>
                      <td className="p-10 text-center">
                        <div className="space-y-1">
                           <span className="text-sm font-black text-white">{exam.appliedCount}</span>
                           <div className="w-16 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                              <div className="h-full bg-blue-600" style={{ width: `${(exam.appliedCount/exam.eligibleStudents)*100}%` }} />
                           </div>
                        </div>
                      </td>
                      <td className="p-10 text-center">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{exam.examDate}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        /* B, C, D - EXAM DETAIL & READINESS & PREP */
        <section className="pt-28 pb-16 px-6 animate-in slide-in-from-right duration-500">
           <div className="max-w-7xl mx-auto">
              <button onClick={() => setSelectedExamId(null)} className="mb-12 flex items-center gap-4 text-gray-500 hover:text-white transition-colors group">
                 <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                 <span className="text-[10px] font-black uppercase tracking-widest">Back to Terminal</span>
              </button>

              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                 <div className="space-y-6 flex-grow">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em]">{selectedExam?.category} Milestone</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">{selectedExam?.name}</h1>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl">{selectedExam?.purpose}</p>
                 </div>

                 <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-3xl border border-white/10">
                    {['detail', 'readiness', 'prep'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
                      >
                        {tab.replace('detail', 'Blueprint')}
                      </button>
                    ))}
                 </div>
              </div>

              {/* TAB CONTENT: DETAIL (EXAM DOSSIER) */}
              {activeTab === 'detail' && (
                 <div className="grid lg:grid-cols-2 gap-20 animate-in fade-in duration-500">
                    <div className="space-y-12">
                       <section className="space-y-6">
                          <h3 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.4em] border-l-4 border-indigo-600 pl-6">Eligibility Guardrails</h3>
                          <p className="text-xl text-gray-300 font-medium leading-relaxed italic">"{selectedExam?.eligibility}"</p>
                       </section>

                       <div className="grid grid-cols-2 gap-6">
                          <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
                             <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Final Registration</p>
                             <p className="text-2xl font-black text-white">{selectedExam?.regDate}</p>
                          </div>
                          <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
                             <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Exam Window</p>
                             <p className="text-2xl font-black text-indigo-500">{selectedExam?.examDate}</p>
                          </div>
                       </div>

                       <section className="space-y-8">
                          <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">Career Pathways Unlocked</h3>
                          <div className="flex flex-wrap gap-3">
                             {selectedExam?.careers.map(path => (
                               <div key={path} className="px-6 py-3 rounded-2xl bg-blue-600/5 border border-blue-500/20 text-[10px] font-black uppercase text-blue-400 tracking-widest">{path}</div>
                             ))}
                          </div>
                       </section>
                    </div>

                    <div className="space-y-12">
                       <section className="p-12 rounded-[64px] bg-[#0a0a0a] border border-white/5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-10 opacity-5">
                             <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                          </div>
                          <div className="relative z-10 space-y-8">
                             <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Syllabus Mapping</h4>
                             <div className="space-y-4">
                                {selectedExam?.syllabus.map((item, i) => (
                                   <div key={i} className="flex justify-between items-center group">
                                      <span className="text-sm font-black uppercase text-white group-hover:text-indigo-400 transition-colors">{item}</span>
                                      <span className="text-[9px] font-black text-gray-600 uppercase">Core Discipline</span>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </section>
                    </div>
                 </div>
              )}

              {/* TAB CONTENT: READINESS INDICATORS */}
              {activeTab === 'readiness' && (
                 <div className="space-y-16 animate-in fade-in duration-500">
                    <div className="grid md:grid-cols-2 gap-12">
                       <div className="p-12 rounded-[56px] border border-white/10 bg-[#080808] relative overflow-hidden">
                          <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-10">Aptitude Alignment</h4>
                          <div className="space-y-10">
                             {[
                                { label: 'Quantitative Mastery', val: 78, c: 'bg-indigo-600' },
                                { label: 'Logical Synthesis', val: 92, c: 'bg-blue-600' },
                                { label: 'Verbal Logic', val: 45, c: 'bg-red-600' }
                             ].map((s, i) => (
                                <div key={i} className="space-y-4">
                                   <div className="flex justify-between items-end">
                                      <span className="text-xs font-black uppercase text-white tracking-widest">{s.label}</span>
                                      <span className="text-xl font-black text-white">{s.val}%</span>
                                   </div>
                                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                      <div className={`h-full ${s.c} transition-all duration-1500`} style={{ width: `${s.val}%` }} />
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>

                       <div className="flex flex-col justify-center text-center p-12 rounded-[56px] bg-indigo-600/5 border border-indigo-500/20">
                          <h3 className="text-4xl font-black uppercase mb-6 leading-tight">Batch Readiness <br/><span className="text-indigo-500">Probability.</span></h3>
                          <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-8">
                             <svg className="w-full h-full rotate-[-90deg]">
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="552.92" strokeDashoffset="200" className="text-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
                             </svg>
                             <span className="absolute text-4xl font-black">64%</span>
                          </div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest max-w-xs mx-auto">
                             Probability of achieving a Top 5% National Percentile based on current diagnostic scores.
                          </p>
                       </div>
                    </div>
                 </div>
              )}

              {/* TAB CONTENT: PREP & SUPPORT */}
              {activeTab === 'prep' && (
                 <div className="space-y-12 animate-in slide-in-from-bottom duration-500">
                    <div className="grid md:grid-cols-3 gap-8">
                       {[
                          { t: "Study Resource Vault", d: "Access official institutional notes and high-yield topic summaries.", i: "📚", count: "142 Files" },
                          { t: "Simulated Mock Tests", d: "Schedule proctored time-bound exams for the entire batch.", i: "⏱️", count: "12 Tests" },
                          { t: "Mentor Coaching", d: "Direct portal linkage to subject matter specialists and alumni.", i: "👤", count: "8 Mentors" }
                       ].map((item, i) => (
                          <div key={i} className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/30 transition-all group flex flex-col items-center text-center">
                             <div className="text-4xl mb-8">{item.i}</div>
                             <h4 className="text-xl font-black uppercase text-white mb-4 group-hover:text-indigo-400 transition-colors">{item.t}</h4>
                             <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed mb-8 flex-grow">{item.d}</p>
                             <div className="w-full pt-8 border-t border-white/5 flex flex-col gap-4">
                                <span className="text-[10px] font-black text-indigo-500 uppercase">{item.count}</span>
                                <button className="w-full py-4 bg-white/5 hover:bg-indigo-600 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Manage Access</button>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Tracking Status: <span className="text-emerald-500">Milestone Synced</span></p>
                 <div className="flex gap-4">
                    <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">Download Audit</button>
                    <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-indigo-600/40">Sync Prep Schedule</button>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Prepare for <br/><span className="gradient-text">Results.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Exams are not barriers; they are benchmarks of potential. Career Soulmate 
              gives your institution the foresight to prepare every student for the 
              milestones that define their professional legacy.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => setActiveTab('prep')} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-[10px]">
               Launch Preparation Lab
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to Dashboard
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
      `}</style>
    </div>
  );
};

export default CollegeExamsPage;
