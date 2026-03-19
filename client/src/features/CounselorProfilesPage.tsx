
import React, { useState, useMemo } from 'react';

interface StudentProfile {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  recommendedPath: string;
  confidenceScore: number;
  aptitude: { label: string; score: number }[];
  interests: { label: string; affinity: number; icon: string }[];
  personality: { trait: string; score: number; labels: [string, string] }[];
  skills: { name: string; current: number; required: number }[];
  careerAnalysis: {
    primary: string;
    alternatives: string[];
    risks: string[];
    logic: string;
  };
  timeline: {
    period: string;
    event: string;
    status: 'Past' | 'Current' | 'Future';
    desc: string;
  }[];
  counselorNotes: {
    id: string;
    date: string;
    text: string;
    intervention: string;
  }[];
}

const DEFAULT_PROFILE: StudentProfile = {
  id: 'L-9821',
  name: 'Alex Johnson',
  age: 18,
  grade: 'Class 12 (Science PCM)',
  avatar: 'https://picsum.photos/seed/alex/200/200',
  recommendedPath: 'AI Research Scientist',
  confidenceScore: 98,
  aptitude: [
    { label: 'Logical', score: 92 },
    { label: 'Numerical', score: 68 },
    { label: 'Verbal', score: 74 },
    { label: 'Spatial', score: 45 },
    { label: 'Analytical', score: 85 }
  ],
  interests: [
    { label: 'Investigative', affinity: 95, icon: '🔬' },
    { label: 'Artistic', affinity: 40, icon: '🎨' },
    { label: 'Realistic', affinity: 70, icon: '🛠️' }
  ],
  personality: [
    { trait: 'Social Energy', score: -1.2, labels: ['Introverted', 'Extroverted'] },
    { trait: 'Operational', score: -1.8, labels: ['Structured', 'Flexible'] },
    { trait: 'Decision Pattern', score: -1.5, labels: ['Analytical', 'Intuitive'] }
  ],
  skills: [
    { name: 'Python Systems', current: 35, required: 85 },
    { name: 'Linear Algebra', current: 90, required: 85 },
    { name: 'ML Architecture', current: 15, required: 80 }
  ],
  careerAnalysis: {
    primary: 'AI Research Scientist',
    alternatives: ['Data Architect', 'Quantum Cryptographer'],
    risks: ['Burnout potential due to high intensity', 'Niche specialization risk'],
    logic: "High correlation between Abstract Reasoning and Investigative interests. Cognitive load capacity exceeds current grade standards."
  },
  timeline: [
    { period: 'Jan 2024', event: 'Initial Discovery', status: 'Past', desc: 'Onboarded via school counselor. Marked interest in Robotics.' },
    { period: 'Feb 2025', event: 'Advanced Aptitude', status: 'Past', desc: 'Scored in top 1% nationally for logical reasoning.' },
    { period: 'Active', event: 'JEE/CUET Prep', status: 'Current', desc: 'Preparing for top-tier institution entrance.' },
    { period: 'Sept 2025', event: 'Degree Start', status: 'Future', desc: 'Expected entry into B.Tech CS or B.Sc Math.' }
  ],
  counselorNotes: [
    { id: 'n1', date: 'Feb 15, 2025', text: "Alex shows extreme focus but high anxiety regarding entrance dates.", intervention: "Scheduled stress-management session." }
  ]
};

const CounselorProfilesPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedProfile, setSelectedProfile] = useState<StudentProfile>(DEFAULT_PROFILE);
  const [noteInput, setNoteInput] = useState('');

  const addNote = () => {
    if (!noteInput.trim()) return;
    const newNote = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      text: noteInput,
      intervention: 'Manual Entry'
    };
    setSelectedProfile(prev => ({
      ...prev,
      counselorNotes: [newNote, ...prev.counselorNotes]
    }));
    setNoteInput('');
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. LEARNER SNAPSHOT (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row items-center gap-10 lg:w-1/2">
               <div className="relative group shrink-0">
                  <div className="absolute -inset-2 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-[50px] blur opacity-20 group-hover:opacity-40 transition-all duration-500" />
                  <img src={selectedProfile.avatar} className="w-40 h-40 rounded-[48px] object-cover relative z-10 border border-white/10" alt={selectedProfile.name} />
                  <div className="absolute bottom-[-10px] right-[-10px] w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center z-20 shadow-2xl border-4 border-[#050505]">
                     <span className="text-white text-xs font-black">AI</span>
                  </div>
               </div>
               <div className="text-center md:text-left space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">{selectedProfile.id} Dossier</span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter">{selectedProfile.name}</h1>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{selectedProfile.grade}</p>
                  </div>
                  <div className="p-5 rounded-3xl bg-indigo-900/10 border border-indigo-500/20">
                     <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-1">Target Identity</p>
                     <p className="text-sm font-black text-white uppercase">{selectedProfile.recommendedPath}</p>
                  </div>
               </div>
            </div>

            {/* Confidence Radial */}
            <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
               <div className="p-10 rounded-[64px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col items-center min-w-[300px]">
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full rotate-[-90deg]">
                       <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                       <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="452.39" strokeDashoffset={452.39 - (452.39 * selectedProfile.confidenceScore / 100)} className="text-indigo-500 shadow-[0_0_20px_#6366f1]" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-black text-white">{selectedProfile.confidenceScore}%</span>
                      <span className="text-[8px] font-black text-gray-500 uppercase">Match Score</span>
                    </div>
                  </div>
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.4em] mt-8">Institutional Confidence</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. ASSESSMENT SUMMARY PANEL */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
         
         {/* Aptitude & Personality */}
         <div className="space-y-16">
            <div className="space-y-8">
               <h3 className="text-2xl font-black uppercase tracking-tight">Cognitive <span className="text-indigo-500">Architecture.</span></h3>
               <div className="grid grid-cols-1 gap-4">
                  {selectedProfile.aptitude.map((a, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{a.label}</span>
                          <span className="text-xs font-black text-white">{a.score}%</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full bg-indigo-600 transition-all duration-1000`} style={{ width: `${a.score}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-2xl font-black uppercase tracking-tight">Persona <span className="text-blue-500">Continuum.</span></h3>
               <div className="space-y-8 p-10 rounded-[48px] bg-white/[0.02] border border-white/5">
                  {selectedProfile.personality.map((p, i) => {
                    const percentage = ((p.score + 2) / 4) * 100;
                    return (
                      <div key={i} className="space-y-3">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">{p.trait}</p>
                         <div className="relative h-1 w-full bg-white/10 rounded-full">
                            <div className="absolute -left-1 -top-6 text-[8px] font-black text-gray-600 uppercase">{p.labels[0]}</div>
                            <div className="absolute -right-1 -top-6 text-[8px] font-black text-gray-600 uppercase text-right">{p.labels[1]}</div>
                            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-black shadow-[0_0_10px_#3b82f6] transition-all duration-1000" style={{ left: `${percentage}%` }} />
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>
         </div>

         {/* Interests & Skill Readiness */}
         <div className="space-y-16">
            <div className="space-y-8">
               <h3 className="text-2xl font-black uppercase tracking-tight">Interest <span className="text-purple-500">Clusters.</span></h3>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedProfile.interests.map((int, i) => (
                    <div key={i} className="p-8 rounded-[40px] bg-[#0a0a0a] border border-white/5 text-center group hover:border-purple-500/30 transition-all">
                       <div className="text-3xl mb-4">{int.icon}</div>
                       <h4 className="text-[10px] font-black text-white uppercase mb-2">{int.label}</h4>
                       <p className="text-xl font-black text-purple-500">{int.affinity}%</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-2xl font-black uppercase tracking-tight">Skill <span className="text-emerald-500">Gap Report.</span></h3>
               <div className="space-y-6">
                  {selectedProfile.skills.map((s, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-emerald-500/20 transition-all">
                       <div className="flex justify-between items-end mb-4">
                          <h4 className="text-xs font-black uppercase text-white tracking-widest">{s.name}</h4>
                          <span className="text-[9px] font-black text-gray-500 uppercase">Target: {s.required}%</span>
                       </div>
                       <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="absolute inset-0 bg-blue-600/10 opacity-30" style={{ width: `${s.required}%` }} />
                          <div className={`h-full bg-emerald-600 shadow-[0_0_10px_#10b981] transition-all duration-1000`} style={{ width: `${s.current}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* C. CAREER PATH ANALYSIS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-24">
               <div className="space-y-12">
                  <h3 className="text-3xl font-black uppercase tracking-tight">Logic <span className="text-indigo-500">Analysis.</span></h3>
                  <div className="p-12 rounded-[56px] bg-black border border-white/10 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-10">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                     </div>
                     <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-6">AI Match Explanation</p>
                     <p className="text-gray-300 text-lg font-medium leading-relaxed italic">
                        "{selectedProfile.careerAnalysis.logic}"
                     </p>
                     <div className="mt-10 grid grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                           <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Risks Identified</p>
                           <ul className="space-y-1">
                              {selectedProfile.careerAnalysis.risks.map((r, i) => <li key={i} className="text-[9px] font-bold text-red-400 uppercase">• {r}</li>)}
                           </ul>
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                           <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Alternatives</p>
                           <ul className="space-y-1">
                              {selectedProfile.careerAnalysis.alternatives.map((a, i) => <li key={i} className="text-[9px] font-bold text-blue-400 uppercase">• {a}</li>)}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-12">
                  <h3 className="text-3xl font-black uppercase tracking-tight">Timeline <span className="text-emerald-500">Tracker.</span></h3>
                  <div className="relative pl-8 border-l border-white/5 space-y-12">
                     {selectedProfile.timeline.map((t, i) => (
                       <div key={i} className="relative group">
                          <div className={`absolute -left-[41px] top-0 w-4 h-4 rounded-full border-4 border-[#080808] z-10 transition-all ${
                            t.status === 'Past' ? 'bg-indigo-500' : t.status === 'Current' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-white/10'
                          }`} />
                          <div className="space-y-1">
                             <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{t.period} • {t.status}</span>
                             <h4 className="text-lg font-black uppercase text-white group-hover:text-emerald-400 transition-colors">{t.event}</h4>
                             <p className="text-xs text-gray-500 font-medium leading-relaxed">{t.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* D. COUNSELOR NOTES & ACTIONS */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
         <div className="space-y-12">
            <h3 className="text-3xl font-black uppercase tracking-tight">Intervention <span className="text-emerald-500">Vault.</span></h3>
            
            <div className="p-12 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl">
               <div className="mb-10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4 ml-1">Private Counselor Notes</p>
                  <div className="flex flex-col gap-4">
                     <textarea 
                       value={noteInput}
                       onChange={(e) => setNoteInput(e.target.value)}
                       placeholder="Add observation or intervention plan..."
                       className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-sm outline-none focus:border-indigo-500 transition-all min-h-[120px] placeholder:text-gray-700"
                     />
                     <button onClick={addNote} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl active:scale-95">Save Intervension</button>
                  </div>
               </div>

               <div className="space-y-6">
                  {selectedProfile.counselorNotes.map((note) => (
                    <div key={note.id} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-indigo-500/20 transition-all group relative">
                       <div className="flex justify-between items-start mb-4">
                          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{note.date}</span>
                          <span className="text-[8px] font-black text-indigo-500 uppercase tracking-[0.2em]">{note.intervention}</span>
                       </div>
                       <p className="text-sm text-gray-300 font-medium leading-relaxed">{note.text}</p>
                       <button className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-red-500/60 hover:text-red-500">✕</button>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Beyond <br/><span className="gradient-text">Statistics.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Every profile is a human destiny in progress. Career Soulmate 
              gives you the resolution to see exactly where they stand today.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-[10px]">
               Schedule Mentorship Session
             </button>
             <button onClick={() => onNavigate('student-list')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Directory
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

export default CounselorProfilesPage;
