
import React, { useState, useMemo } from 'react';

interface StudentRisk {
  id: string;
  name: string;
  avatar: string;
  score: number; // 0-100
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: 'Career Confusion' | 'Dropout Probability' | 'Skill Misalignment' | 'Low Engagement';
  factors: string[];
  explanation: string;
  historicalTrend: number[]; // Sparkline data
  confidence: number;
}

const RISK_DATA: StudentRisk[] = [
  {
    id: 'L-4412',
    name: 'Maria Garcia',
    avatar: 'https://picsum.photos/seed/maria/200/200',
    score: 84,
    severity: 'Critical',
    category: 'Dropout Probability',
    factors: ['Zero activity in 12 days', 'Declining assessment scores', 'Mixed sentiment in advisor logs'],
    explanation: "Maria's engagement score has dropped by 65% since last month. Pattern matches 'High Attrition' profile seen in Year 2 Engineering students facing heavy workloads without social support.",
    historicalTrend: [10, 15, 20, 45, 68, 84],
    confidence: 94
  },
  {
    id: 'L-2210',
    name: 'Sam Chen',
    avatar: 'https://picsum.photos/seed/sam/200/200',
    score: 62,
    severity: 'High',
    category: 'Career Confusion',
    factors: ['Erratic career search (6 domains)', 'Conflicting interest test results', 'Skipped 2 roadmap sessions'],
    explanation: "Sam is searching for roles across 'Bio-Tech', 'Finance', and 'UI/UX' simultaneously. High dissonance between reported interests and historical aptitude scores (Logic: 90% vs Art: 30%).",
    historicalTrend: [40, 42, 50, 55, 60, 62],
    confidence: 88
  },
  {
    id: 'L-3341',
    name: 'Rohan Gupta',
    avatar: 'https://picsum.photos/seed/rohan/200/200',
    score: 45,
    severity: 'Medium',
    category: 'Skill Misalignment',
    factors: ['Target: AI Researcher', 'Python Proficiency < 20%', 'Math scores lagging'],
    explanation: "Significant delta between target career 'AI Researcher' and current technical baseline. Risk of recruitment failure if technical bridge programs aren't completed by May.",
    historicalTrend: [20, 25, 30, 35, 42, 45],
    confidence: 91
  },
  {
    id: 'L-1102',
    name: 'Sarah Miller',
    avatar: 'https://picsum.photos/seed/sarah/200/200',
    score: 28,
    severity: 'Low',
    category: 'Low Engagement',
    factors: ['Missed weekly check-in', '1 pending skill badge overdue'],
    explanation: "Minor drop in consistency. Usually a high performer, Sarah has missed the last two platform pings. Likely temporary but monitored for escalation.",
    historicalTrend: [5, 5, 8, 12, 15, 28],
    confidence: 98
  }
];

const CounselorRiskFlagsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const selectedStudent = useMemo(() => RISK_DATA.find(s => s.id === selectedStudentId), [selectedStudentId]);

  const stats = {
    totalAtRisk: RISK_DATA.length,
    critical: RISK_DATA.filter(s => s.severity === 'Critical').length,
    avgConfidence: 92,
    preventedLastMonth: 14
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. RISK SUMMARY DASHBOARD (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-rose-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black tracking-widest uppercase">
                EARLY WARNING SYSTEM (v4.2)
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Risk <span className="gradient-text">Signals.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Strategic failure prevention. Detect student attrition, career confusion, 
                and skill misalignment before they impact outcomes.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'At-Risk Learners', v: stats.totalAtRisk, c: 'rose' },
                 { l: 'Critical Alerts', v: stats.critical, c: 'rose' },
                 { l: 'AI Confidence', v: `${stats.avgConfidence}%`, c: 'indigo' },
                 { l: 'Failures Prevented', v: stats.preventedLastMonth, c: 'emerald' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-rose-500/30 transition-all">
                    <p className={`text-3xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. INDIVIDUAL RISK PROFILES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-3 gap-12">
            
            {/* List of Flagged Students */}
            <div className="lg:col-span-1 space-y-6">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em]">Signal Queue</h3>
                  <button className="text-[8px] font-black text-gray-600 uppercase hover:text-white">Refresh Stream</button>
               </div>
               
               <div className="flex flex-col gap-3">
                  {RISK_DATA.map(s => (
                    <button 
                      key={s.id}
                      onClick={() => setSelectedStudentId(s.id)}
                      className={`p-6 rounded-3xl border transition-all duration-300 text-left flex justify-between items-center ${selectedStudentId === s.id ? 'bg-rose-600/10 border-rose-500/50 shadow-2xl' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                       <div className="flex items-center gap-4">
                          <img src={s.avatar} className="w-10 h-10 rounded-xl object-cover grayscale brightness-75" alt={s.name} />
                          <div>
                             <p className="text-[10px] font-black text-white uppercase">{s.name}</p>
                             <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{s.category}</p>
                          </div>
                       </div>
                       <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                         s.severity === 'Critical' ? 'bg-rose-500 text-white animate-pulse' :
                         s.severity === 'High' ? 'bg-orange-600 text-white' :
                         'bg-white/10 text-gray-400'
                       }`}>
                          {s.score}%
                       </div>
                    </button>
                  ))}
               </div>
            </div>

            {/* Detailed Risk Intelligence Panel */}
            <div className="lg:col-span-2">
               {selectedStudent ? (
                  <div className="animate-in zoom-in duration-500 space-y-8">
                     <div className="p-12 rounded-[64px] border border-white/10 bg-[#0a0a0a] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5">
                           <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                           <div className="space-y-6">
                              <div>
                                 <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-2">Detailed Intervention Dossier</p>
                                 <h2 className="text-4xl font-black uppercase text-white tracking-tighter leading-none">{selectedStudent.name}</h2>
                                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">{selectedStudent.id} • {selectedStudent.category}</p>
                              </div>
                              <div className="flex gap-4">
                                 <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                   selectedStudent.severity === 'Critical' ? 'bg-rose-600' : 'bg-orange-600'
                                 }`}>
                                    {selectedStudent.severity} Severity
                                 </span>
                                 <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                    {selectedStudent.confidence}% AI Confidence
                                 </span>
                              </div>
                           </div>

                           <div className="text-center md:text-right space-y-4">
                              <div className="relative w-28 h-28 mx-auto md:ml-auto">
                                 <svg className="w-full h-full rotate-[-90deg]">
                                    <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                                    <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="314.16" strokeDashoffset={314.16 - (314.16 * selectedStudent.score / 100)} className="text-rose-500 shadow-[0_0_15px_#f43f5e]" />
                                 </svg>
                                 <span className="absolute inset-0 flex items-center justify-center text-2xl font-black">{selectedStudent.score}%</span>
                              </div>
                              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Aggregate Failure Probability</p>
                           </div>
                        </div>

                        {/* C. EXPLAINABILITY PANEL */}
                        <div className="mt-16 pt-12 border-t border-white/5 grid md:grid-cols-2 gap-12 relative z-10">
                           <div className="space-y-8">
                              <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">The Strategic Why</h4>
                              <p className="text-gray-300 text-lg font-medium leading-relaxed italic border-l-4 border-rose-500/40 pl-8">
                                 "{selectedStudent.explanation}"
                              </p>
                           </div>
                           <div className="space-y-8">
                              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em]">Contributing Factors</h4>
                              <div className="space-y-4">
                                 {selectedStudent.factors.map((f, i) => (
                                   <div key={i} className="flex gap-4 items-center group">
                                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
                                      <span className="text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors uppercase">{f}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>

                        {/* Sparkline Trend Mockup */}
                        <div className="mt-16 h-20 w-full flex items-end gap-1 px-2">
                           <div className="absolute top-[-24px] left-0 text-[8px] font-black text-gray-700 uppercase tracking-widest">30-Day Risk Escalation Trend</div>
                           {selectedStudent.historicalTrend.map((val, i) => (
                             <div key={i} className="flex-1 bg-rose-600/10 relative group/bar">
                                <div className="absolute bottom-0 left-0 right-0 bg-rose-600 transition-all duration-1000" style={{ height: `${val}%` }} />
                             </div>
                           ))}
                        </div>
                     </div>

                     {/* D. RECOMMENDED INTERVENTIONS */}
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all group">
                           <div className="flex items-center gap-6 mb-8">
                              <div className="text-3xl">🎯</div>
                              <h4 className="text-sm font-black uppercase text-white tracking-widest">Primary Remedy</h4>
                           </div>
                           <p className="text-xs text-gray-400 font-bold uppercase leading-relaxed mb-8">
                              {selectedStudent.category === 'Dropout Probability' ? 'Schedule urgent wellness and social integration session.' : 
                               selectedStudent.category === 'Career Confusion' ? 'Re-run core interest assessment with domain expert oversight.' :
                               'Mandatory technical bridge course enrollment.'}
                           </p>
                           <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95">Initiate Session</button>
                        </div>

                        <div className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group">
                           <div className="flex items-center gap-6 mb-8">
                              <div className="text-3xl">🔄</div>
                              <h4 className="text-sm font-black uppercase text-white tracking-widest">Secondary Pivot</h4>
                           </div>
                           <p className="text-xs text-gray-400 font-bold uppercase leading-relaxed mb-8">
                              Review 'Academic Plan B' and suggest pathway modification under NEP multi-exit logic.
                           </p>
                           <button onClick={() => onNavigate('tree')} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95">Simulate New Path</button>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[64px] text-center p-20 opacity-30">
                     <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-5xl mb-10">📡</div>
                     <h3 className="text-2xl font-black uppercase text-gray-500">Select Signal from Stream</h3>
                     <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-4 max-w-sm mx-auto">Analyze root causes and deploy AI-generated interventions for high-risk learners.</p>
                  </div>
               )}
            </div>
         </div>
      </section>

      {/* C. RISK CATEGORY HEATMAP */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-20">Cohort <span className="text-rose-500">Fragility Map.</span></h2>
            <div className="grid md:grid-cols-4 gap-8">
               {[
                 { label: 'Confusion', val: 12, color: 'bg-orange-500' },
                 { label: 'At-Risk', val: 4, color: 'bg-rose-600' },
                 { label: 'Misaligned', val: 18, color: 'bg-blue-600' },
                 { label: 'Engagement', val: 24, color: 'bg-indigo-600' }
               ].map((item, i) => (
                 <div key={i} className="p-10 rounded-[56px] bg-white/[0.01] border border-white/5 flex flex-col items-center group hover:border-white/20 transition-all">
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-6">{item.label}</p>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
                       <div className={`h-full ${item.color} transition-all duration-1000 group-hover:shadow-[0_0_10px_white]`} style={{ width: `${(item.val / 30) * 100}%` }} />
                    </div>
                    <span className="text-3xl font-black text-white">{item.val}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Protect <br/><span className="gradient-text">Potential.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Failures are usually visible 90 days before they happen. 
              Career Soulmate gives you the sight to see them and the tools to stop them.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Parental Engagement Gateway...')} className="px-12 py-6 bg-rose-600 hover:bg-rose-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-rose-600/40 uppercase tracking-[0.2em] text-[10px]">
               Batch Alert Parent/Guardians
             </button>
             <button onClick={() => onNavigate('student-list')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to Directory
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(244, 63, 94, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(244, 63, 94, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #f43f5e 1px, transparent 1px),
                            linear-gradient(to bottom, #f43f5e 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default CounselorRiskFlagsPage;
