
import React, { useState, useMemo } from 'react';

interface ReportData {
  learnerName: string;
  learnerId: string;
  academicLevel: string;
  reportingPeriod: string;
  counselorName: string;
  institution: string;
  careerEvolution: {
    period: string;
    recommendedPath: string;
    clarityScore: number;
  }[];
  assessments: {
    aptitude: { label: string; score: number; trend: 'up' | 'down' | 'stable' }[];
    interests: { label: string; affinity: number; icon: string }[];
    personality: string;
    readinessIndex: number;
  };
  skills: {
    acquired: string[];
    inProgress: { name: string; progress: number }[];
    missing: { name: string; priority: 'Critical' | 'High' | 'Medium' }[];
  };
  interventions: {
    date: string;
    flag: string;
    action: string;
    impact: string;
  }[];
}

const MOCK_REPORT: ReportData = {
  learnerName: 'Alex Johnson',
  learnerId: 'L-9821',
  academicLevel: 'Class 12 (Science PCM)',
  reportingPeriod: 'Jan 2025 – Feb 2025',
  counselorName: 'Dr. Sarah Mitchell',
  institution: 'Global Heights International School',
  careerEvolution: [
    { period: 'Jan 2025', recommendedPath: 'Software Engineer', clarityScore: 72 },
    { period: 'Feb 2025', recommendedPath: 'AI Research Scientist', clarityScore: 98 }
  ],
  assessments: {
    aptitude: [
      { label: 'Logical', score: 92, trend: 'up' },
      { label: 'Numerical', score: 68, trend: 'stable' },
      { label: 'Analytical', score: 85, trend: 'up' }
    ],
    interests: [
      { label: 'Investigative', affinity: 95, icon: '🔬' },
      { label: 'Realistic', affinity: 70, icon: '🛠️' }
    ],
    personality: 'The Strategist (Architect persona)',
    readinessIndex: 74
  },
  skills: {
    acquired: ['Python Syntax', 'Linear Algebra', 'Logic Flow'],
    inProgress: [
      { name: 'PyTorch Foundations', progress: 45 },
      { name: 'Advanced Calculus', progress: 82 }
    ],
    missing: [
      { name: 'MLOps Architectures', priority: 'Critical' },
      { name: 'Scientific Communication', priority: 'High' }
    ]
  },
  interventions: [
    { date: 'Feb 12, 2025', flag: 'High Anxiety', action: 'Stress Management Session', impact: 'Reported 40% reduction in prep stress' },
    { date: 'Feb 15, 2025', flag: 'Domain Shift', action: 'Research Lab Virtual Tour', impact: 'Confirmed interest in AI Research' }
  ]
};

const CounselorProgressReportPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [report, setReport] = useState<ReportData>(MOCK_REPORT);
  const [remarks, setRemarks] = useState('Alex demonstrates exceptional cognitive depth. The shift from generic Engineering to specialized AI Research is highly validated by recent aptitude spikes. Recommended focus for next period: Verifiable skill badges.');

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* HEADER ACTIONS */}
      <section className="pt-28 pb-12 px-6 max-w-6xl mx-auto flex justify-between items-center border-b border-white/5 bg-black/20">
         <div className="space-y-1">
            <h1 className="text-2xl font-black uppercase tracking-widest text-white leading-none">Formal Progress Report</h1>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">Confidential Institutional Document</p>
         </div>
         <div className="flex gap-4">
            <button onClick={() => window.print()} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
               Print / Export PDF
            </button>
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all">
               Finalize & Send
            </button>
         </div>
      </section>

      {/* THE ACTUAL REPORT CONTAINER */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
         <div className="bg-[#0a0a0a] border border-white/5 rounded-[64px] p-16 shadow-2xl space-y-24 relative overflow-hidden">
            
            {/* A. REPORT HEADER */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5 pb-12">
               <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase mb-2">Learner Identity</p>
                  <h4 className="text-xl font-black text-white uppercase leading-none">{report.learnerName}</h4>
                  <p className="text-xs font-bold text-indigo-500 uppercase mt-2 tracking-widest">{report.learnerId}</p>
               </div>
               <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase mb-2">Institutional Context</p>
                  <p className="text-sm font-bold text-white uppercase leading-tight">{report.institution}</p>
                  <p className="text-[10px] font-medium text-gray-500 uppercase mt-1">{report.academicLevel}</p>
               </div>
               <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase mb-2">Counselor of Record</p>
                  <p className="text-sm font-bold text-white uppercase">{report.counselorName}</p>
               </div>
               <div className="text-right">
                  <p className="text-[9px] font-black text-gray-600 uppercase mb-2">Reporting Period</p>
                  <p className="text-sm font-bold text-white uppercase">{report.reportingPeriod}</p>
               </div>
            </div>

            {/* B. CAREER DEVELOPMENT SUMMARY */}
            <section className="space-y-12">
               <div className="flex items-center gap-6">
                  <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">Career Trajectory Evolution</h3>
                  <div className="h-px flex-grow bg-white/5" />
               </div>
               
               <div className="grid lg:grid-cols-3 gap-16 items-center">
                  <div className="lg:col-span-2">
                     <div className="relative h-40 flex items-end gap-1 px-4 border-l border-b border-white/5">
                        <div className="absolute top-0 left-4 text-[8px] font-black text-gray-700 uppercase tracking-widest">Clarity Score Trend</div>
                        {report.careerEvolution.map((ev, i) => (
                           <div key={i} className="flex-1 bg-blue-600/10 relative group/bar mx-2">
                              <div className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-1500" style={{ height: `${ev.clarityScore}%` }} />
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-center w-max">
                                 <p className="text-[8px] font-black text-gray-500 uppercase mb-1">{ev.period}</p>
                                 <p className="text-xs font-black text-white">{ev.clarityScore}%</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 text-center">
                     <p className="text-[9px] font-black text-gray-500 uppercase mb-4 tracking-widest">Current Targeted Path</p>
                     <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{report.careerEvolution[report.careerEvolution.length-1].recommendedPath}</h4>
                     <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">98% Fit Probability</p>
                  </div>
               </div>
            </section>

            {/* C. ASSESSMENT PERFORMANCE SECTION */}
            <section className="space-y-12">
               <div className="flex items-center gap-6">
                  <h3 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.5em] whitespace-nowrap">Psychometric Benchmarks</h3>
                  <div className="h-px flex-grow bg-white/5" />
               </div>
               
               <div className="grid lg:grid-cols-2 gap-20">
                  <div className="space-y-10">
                     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Cognitive Load Capacity (Aptitude)</p>
                     <div className="space-y-8">
                        {report.assessments.aptitude.map((a, i) => (
                           <div key={i} className="space-y-3">
                              <div className="flex justify-between items-end">
                                 <span className="text-xs font-black uppercase text-white tracking-widest">{a.label} Logic</span>
                                 <span className={`text-[9px] font-black uppercase ${a.trend === 'up' ? 'text-emerald-500' : 'text-gray-600'}`}>Trend: {a.trend}</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-indigo-600 transition-all duration-1000" style={{ width: `${a.score}%` }} />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                     <div className="p-8 rounded-[40px] bg-black border border-white/5 text-center flex flex-col justify-center">
                        <p className="text-[9px] font-black text-gray-500 uppercase mb-4 tracking-widest">Persona Sync</p>
                        <p className="text-sm font-black text-white uppercase italic">"{report.assessments.personality}"</p>
                     </div>
                     <div className="p-8 rounded-[40px] bg-indigo-600/5 border border-indigo-500/20 text-center flex flex-col justify-center items-center">
                        <p className="text-[9px] font-black text-indigo-500 uppercase mb-4 tracking-widest">Readiness Index</p>
                        <div className="text-3xl font-black text-white">{report.assessments.readinessIndex}%</div>
                     </div>
                  </div>
               </div>
            </section>

            {/* D. SKILL PROGRESS & GAPS */}
            <section className="space-y-12">
               <div className="flex items-center gap-6">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] whitespace-nowrap">Skill Capital Audit</h3>
                  <div className="h-px flex-grow bg-white/5" />
               </div>

               <div className="grid lg:grid-cols-2 gap-20">
                  <div className="space-y-10">
                     <div className="space-y-6">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mastered Competencies</p>
                        <div className="flex flex-wrap gap-2">
                           {report.skills.acquired.map(s => <span key={s} className="px-4 py-2 bg-emerald-900/10 border border-emerald-500/30 rounded-xl text-[10px] font-black text-emerald-400 uppercase tracking-widest">✓ {s}</span>)}
                        </div>
                     </div>
                     <div className="space-y-6">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Learning Tracks</p>
                        <div className="space-y-4">
                           {report.skills.inProgress.map(s => (
                              <div key={s.name} className="space-y-2">
                                 <div className="flex justify-between text-[10px] font-black uppercase text-white">
                                    <span>{s.name}</span>
                                    <span>{s.progress}%</span>
                                 </div>
                                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600" style={{ width: `${s.progress}%` }} />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="p-10 rounded-[56px] bg-red-600/5 border border-red-500/20">
                     <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-8">Identified Shortfalls (Priority)</p>
                     <div className="space-y-6">
                        {report.skills.missing.map(m => (
                           <div key={m.name} className="flex justify-between items-center group">
                              <div>
                                 <h5 className="text-sm font-black uppercase text-white">{m.name}</h5>
                                 <p className="text-[8px] font-bold text-gray-600 uppercase">Target NSQF Level 7+</p>
                              </div>
                              <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase ${m.priority === 'Critical' ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-500'}`}>{m.priority}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </section>

            {/* E. RISK & INTERVENTION LOG */}
            <section className="space-y-12">
               <div className="flex items-center gap-6">
                  <h3 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.5em] whitespace-nowrap">Intervention Ledger</h3>
                  <div className="h-px flex-grow bg-white/5" />
               </div>
               
               <div className="overflow-x-auto rounded-[40px] border border-white/5 bg-black/40">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="border-b border-white/10 bg-white/[0.02]">
                           <th className="p-8 text-[9px] font-black uppercase text-gray-500 tracking-widest">Date</th>
                           <th className="p-8 text-[9px] font-black uppercase text-gray-500 tracking-widest">Identified Signal</th>
                           <th className="p-8 text-[9px] font-black uppercase text-gray-500 tracking-widest">Counselor Action</th>
                           <th className="p-8 text-[9px] font-black uppercase text-gray-500 tracking-widest">Observed Impact</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {report.interventions.map((item, i) => (
                           <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                              <td className="p-8 text-[10px] font-black text-gray-500 uppercase">{item.date}</td>
                              <td className="p-8 text-xs font-black text-rose-400 uppercase">{item.flag}</td>
                              <td className="p-8 text-xs font-medium text-white uppercase">{item.action}</td>
                              <td className="p-8 text-xs font-medium text-gray-400 leading-relaxed italic">"{item.impact}"</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>

            {/* F. COUNSELOR REMARKS (EDITABLE) */}
            <section className="space-y-12">
               <div className="flex items-center gap-6">
                  <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">Professional Observations</h3>
                  <div className="h-px flex-grow bg-white/5" />
               </div>
               
               <div className="p-12 rounded-[56px] bg-white/[0.01] border border-white/10 relative overflow-hidden">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6">Final Guidance Summary</p>
                  <textarea 
                     value={remarks}
                     onChange={(e) => setRemarks(e.target.value)}
                     className="w-full bg-transparent border-none outline-none text-gray-300 text-lg font-medium leading-relaxed italic placeholder:text-gray-800 min-h-[120px] resize-none"
                  />
                  <div className="mt-12 grid md:grid-cols-2 gap-10 border-t border-white/5 pt-10">
                     <div>
                        <p className="text-[8px] font-black text-blue-500 uppercase mb-4 tracking-widest">Next-Period Milestones</p>
                        <ul className="space-y-2">
                           {['Achieve NSQF Level 4 in Python Systems', 'Finalize IIT Bombay Seat Eligibility Audit', 'Complete CUET Mock Series 1'].map(goal => (
                              <li key={goal} className="text-[10px] font-black text-gray-400 uppercase tracking-tight">• {goal}</li>
                           ))}
                        </ul>
                     </div>
                     <div className="flex flex-col items-end justify-end">
                        <div className="text-right">
                           <p className="text-[10px] font-black text-gray-700 uppercase mb-6 tracking-widest">Counselor Digital Signature</p>
                           <p className="text-2xl font-serif text-white/40 select-none italic underline decoration-white/10 underline-offset-8">S. Mitchell</p>
                           <p className="text-[8px] font-black text-gray-500 uppercase mt-4">Verified by Career Soulmate ID-291</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mb-12">End of Progress Report</p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Top
             </button>
             <button onClick={() => onNavigate('student-list')} className="px-12 py-6 bg-white text-black rounded-[24px] font-black transition-all shadow-2xl hover:bg-blue-600 hover:text-white uppercase tracking-[0.2em] text-[10px]">
               Return to Directory
             </button>
           </div>
        </div>
      </section>

      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          main { padding-top: 0 !important; }
          .bg-[#050505], .bg-[#0a0a0a], .bg-[#080808], .bg-black { background: white !important; border-color: #eee !important; }
          .text-white, .text-gray-300, .text-gray-400, .text-gray-500, .text-gray-600 { color: black !important; }
          .border-white\/5, .border-white\/10 { border-color: #eee !important; }
          .shadow-2xl { shadow: none !important; }
          header, footer { display: none !important; }
          textarea { color: black !important; font-style: italic; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #3b82f6 1px, transparent 1px),
                            linear-gradient(to bottom, #3b82f6 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default CounselorProgressReportPage;
