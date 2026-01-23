
import React, { useState, useMemo } from 'react';

interface LearnerSkillGap {
  id: string;
  name: string;
  targetCareer: string;
  overallGap: number;
  skills: {
    name: string;
    current: number;
    required: number;
    severity: 'Low' | 'Medium' | 'High';
  }[];
}

const SKILL_GAPS_DATA: LearnerSkillGap[] = [
  {
    id: 'L-9821',
    name: 'Alex Johnson',
    targetCareer: 'AI Research Scientist',
    overallGap: 42,
    skills: [
      { name: 'Python Systems', current: 35, required: 90, severity: 'High' },
      { name: 'Linear Algebra', current: 85, required: 85, severity: 'Low' },
      { name: 'MLOps', current: 15, required: 80, severity: 'High' },
      { name: 'Prompt Ops', current: 40, required: 70, severity: 'Medium' }
    ]
  },
  {
    id: 'L-4412',
    name: 'Maria Garcia',
    targetCareer: 'ML Engineer',
    overallGap: 58,
    skills: [
      { name: 'C++', current: 20, required: 85, severity: 'High' },
      { name: 'Cloud Native', current: 30, required: 75, severity: 'High' },
      { name: 'Algorithms', current: 45, required: 90, severity: 'High' }
    ]
  },
  {
    id: 'L-2210',
    name: 'Sam Chen',
    targetCareer: 'UX Designer',
    overallGap: 28,
    skills: [
      { name: 'Figma', current: 65, required: 95, severity: 'Medium' },
      { name: 'User Research', current: 70, required: 85, severity: 'Low' },
      { name: 'Psychology 101', current: 80, required: 80, severity: 'Low' }
    ]
  }
];

const COHORT_TRENDS = [
  { skill: 'Neural Architectures', gap: 74, trend: 'Increasing' },
  { skill: 'Cloud Compliance', gap: 52, trend: 'Decreasing' },
  { skill: 'Distributed Systems', gap: 68, trend: 'Stable' },
  { skill: 'Soft Logic', gap: 34, trend: 'Decreasing' }
];

const CounselorSkillGapsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(null);
  const selectedLearner = useMemo(() => SKILL_GAPS_DATA.find(l => l.id === selectedLearnerId), [selectedLearnerId]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. SKILL GAP OVERVIEW (HERO) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest uppercase">
                READINESS DIAGNOSIS TERMINAL
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Readiness <br /><span className="gradient-text">Gaps.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Empirical skill deficiency mapping. Identify the critical technical and cognitive 
                shortfalls standing between your learners and their professional destinies.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Avg Batch Gap', v: '48%', c: 'cyan' },
                 { l: 'Critical Needs', v: 12, c: 'rose' },
                 { l: 'Placement Ready', v: '32%', c: 'emerald' },
                 { l: 'Active Pathways', v: 24, c: 'blue' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-cyan-500/30 transition-all">
                    <p className={`text-3xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. COHORT HEATMAP / TRENDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-12">
              <div className="flex justify-between items-end">
                 <h2 className="text-2xl font-black uppercase tracking-tight">Cohort <span className="text-cyan-500">Heatmap.</span></h2>
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Aggregate Batch: Year 3</span>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                 {SKILL_GAPS_DATA.map(l => (
                   <div key={l.id} className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 transition-all flex items-center justify-between group cursor-pointer" onClick={() => setSelectedLearnerId(l.id)}>
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 flex items-center justify-center font-black text-cyan-500">{l.name.charAt(0)}</div>
                         <div>
                            <h4 className="text-sm font-black uppercase text-white group-hover:text-cyan-400 transition-colors">{l.name}</h4>
                            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{l.targetCareer}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-10">
                         <div className="text-right">
                            <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Gap Severity</p>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${l.overallGap > 50 ? 'bg-rose-500/10 text-rose-500' : 'bg-orange-500/10 text-orange-500'}`}>
                               {l.overallGap > 50 ? 'Critical' : 'Moderate'}
                            </span>
                         </div>
                         <div className="w-24 text-right">
                            <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Gap Index</p>
                            <p className="text-xl font-black text-white">{l.overallGap}%</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-12">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">Deficiency <span className="text-blue-500">Trends.</span></h2>
              <div className="p-10 rounded-[56px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl space-y-8">
                 {COHORT_TRENDS.map((t, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.skill}</span>
                         <span className={`text-[8px] font-black uppercase tracking-tighter ${t.trend === 'Increasing' ? 'text-rose-500' : 'text-emerald-500'}`}>{t.trend}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full bg-blue-600 transition-all duration-1000`} style={{ width: `${t.gap}%` }} />
                      </div>
                   </div>
                 ))}
                 <div className="pt-6 border-t border-white/5 text-center">
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic">"Neural Architectures show a 12% widening gap vs industry standards."</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* C. LEARNER DRILL-DOWN VIEW */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
           {selectedLearner ? (
              <div className="animate-in zoom-in duration-500">
                 <div className="flex justify-between items-start mb-16">
                    <div className="space-y-4">
                       <h3 className="text-3xl font-black uppercase text-white tracking-tighter">Gap Analysis: <span className="text-cyan-500">{selectedLearner.name}</span></h3>
                       <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Target Destiny: {selectedLearner.targetCareer}</p>
                    </div>
                    <button onClick={() => setSelectedLearnerId(null)} className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest border border-white/10 px-6 py-2 rounded-xl transition-all">Close Dossier</button>
                 </div>

                 <div className="grid lg:grid-cols-2 gap-20">
                    <div className="space-y-8">
                       <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-10">Required Skillsets (Priority Order)</h4>
                       <div className="space-y-10">
                          {selectedLearner.skills.map((s, i) => (
                             <div key={i} className="space-y-4">
                                <div className="flex justify-between items-end">
                                   <div className="space-y-1">
                                      <h5 className="text-sm font-black uppercase text-white tracking-widest">{s.name}</h5>
                                      <span className={`text-[8px] font-black uppercase tracking-widest ${
                                        s.severity === 'High' ? 'text-rose-500' : s.severity === 'Medium' ? 'text-orange-500' : 'text-emerald-500'
                                      }`}>Severity: {s.severity}</span>
                                   </div>
                                   <div className="text-right">
                                      <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Target: {s.required}%</p>
                                      <p className="text-[11px] font-black text-cyan-400 uppercase">Current: {s.current}%</p>
                                   </div>
                                </div>
                                <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                   <div className="absolute inset-0 bg-blue-600/10" style={{ width: `${s.required}%` }} />
                                   <div className={`h-full transition-all duration-1500 ${
                                     s.severity === 'High' ? 'bg-rose-600' : s.severity === 'Medium' ? 'bg-orange-600' : 'bg-emerald-600'
                                   }`} style={{ width: `${s.current}%` }} />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    {/* D. ACTION SUGGESTIONS */}
                    <div className="space-y-12">
                       <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-10">AI Intervention Protocol</h4>
                       <div className="grid gap-6">
                          {[
                             { t: "Certification Sprint", d: "Complete AWS Cloud Practitioner to close 'Cloud Native' gap by 40%.", i: "🎓", timeline: "4 Weeks" },
                             { t: "Applied Lab Session", d: "Enroll in 12-hour intensive 'PyTorch Fundamentals' practice module.", i: "💻", timeline: "2 Weeks" },
                             { t: "NAPS Apprenticeship", d: "Match with 'Junior Neural Tech' role at NeuralCorp for hands-on ML experience.", i: "🤝", timeline: "Immediate" }
                          ].map((action, idx) => (
                             <div key={idx} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all group flex gap-8 items-start">
                                <div className="text-3xl group-hover:scale-125 transition-transform">{action.i}</div>
                                <div className="flex-grow space-y-2">
                                   <div className="flex justify-between items-center">
                                      <h5 className="text-sm font-black uppercase text-white tracking-widest">{action.t}</h5>
                                      <span className="text-[9px] font-black text-emerald-500 uppercase">{action.timeline}</span>
                                   </div>
                                   <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{action.d}</p>
                                   <button className="mt-4 text-[9px] font-black text-cyan-500 uppercase tracking-widest hover:underline">Provision Resources →</button>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[64px] text-center p-20 opacity-40">
                 <div className="text-6xl mb-8">🔍</div>
                 <h3 className="text-xl font-black uppercase text-gray-500">Select Learner from Heatmap</h3>
                 <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-2 max-w-xs mx-auto">Analyze specific skill shortfalls and generate automated intervention schedules.</p>
              </div>
           )}
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Knowledge is <br/><span className="gradient-text">Precision.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't guess where your cohort stands. Use Career Soulmate's diagnostic 
              engine to verify readiness and eliminate professional uncertainty.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Batch Notification Engine...')} className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-cyan-600/40 uppercase tracking-[0.2em] text-[10px]">
               Batch Message High Gaps
             </button>
             <button onClick={() => onNavigate('student-list')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Student List
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #06b6d4 1px, transparent 1px),
                            linear-gradient(to bottom, #06b6d4 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default CounselorSkillGapsPage;
