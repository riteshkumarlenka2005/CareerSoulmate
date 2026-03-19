
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface ReadinessStats {
  category: string;
  score: number;
  description: string;
  icon: string;
}

interface Distribution {
  label: string;
  value: number;
  color: string;
}

const READINESS_BREAKDOWN: ReadinessStats[] = [
  { category: 'Hard Skills', score: 64, description: 'Technical proficiency in core domain languages & tools.', icon: '🛠️' },
  { category: 'Academics', score: 82, description: 'CGPA alignment and theoretical base coverage.', icon: '📚' },
  { category: 'Experience', score: 45, description: 'Internship count, industry projects, and hackathons.', icon: '💼' },
  { category: 'Soft Skills', score: 72, description: 'Communication, adaptability, and leadership readiness.', icon: '🤝' },
];

const DISTRIBUTION: Distribution[] = [
  { label: 'Fully Ready', value: 22, color: 'bg-emerald-500' },
  { label: 'Partially Ready', value: 54, color: 'bg-blue-500' },
  { label: 'Not Yet Ready', value: 24, color: 'bg-red-500' },
];

const ROLE_READINESS = [
  { role: 'Software Engineer', industry: 'Tech', readiness: 78, trend: '+5%' },
  { role: 'Data Analyst', industry: 'Data', readiness: 62, trend: '-2%' },
  { role: 'Product Manager', industry: 'Business', readiness: 48, trend: '+12%' },
  { role: 'SecOps Lead', industry: 'Security', readiness: 35, trend: '+1%' },
];

const CollegeReadinessPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedProgram, setSelectedProgram] = useState('B.Tech Computer Science');
  const [selectedCohort, setSelectedCohort] = useState('2025 Graduating Batch');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const CustomSelect = ({ label, options, value, onChange, id }: { label: string, options: string[], value: string, onChange: (val: string) => void, id: string }) => {
    const isOpen = activeDropdown === id;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) setActiveDropdown(null);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative w-full z-[100]" ref={ref}>
        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">{label}</p>
        <button
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className={`w-full flex items-center justify-between bg-white/5 border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/10'} rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md hover:bg-white/[0.08]`}
        >
          <span className="text-blue-400">{value}</span>
          <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isOpen && (
          <div className="absolute top-[105%] left-0 right-0 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-[200] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
            {options.map(opt => (
              <button key={opt} onClick={() => { onChange(opt); setActiveDropdown(null); }}
                className={`w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${value === opt ? 'text-blue-500 bg-blue-500/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. READINESS INDEX OVERVIEW (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                EMPLOYABILITY INTELLIGENCE HUB
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Job <span className="gradient-text">Readiness.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Aggregate employability measurement of your cohort. Analyzing real-time student capabilities against current global hiring standards.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                 <CustomSelect 
                    id="prog" 
                    label="Academic Program" 
                    options={['B.Tech Computer Science', 'B.Com Honors', 'B.Sc Data Science']} 
                    value={selectedProgram} 
                    onChange={setSelectedProgram} 
                 />
                 <CustomSelect 
                    id="cohort" 
                    label="Active Cohort" 
                    options={['2025 Graduating Batch', '2026 Applied Batch']} 
                    value={selectedCohort} 
                    onChange={setSelectedCohort} 
                 />
              </div>
            </div>
            
            {/* Main Gauge Widget */}
            <div className="p-10 rounded-[64px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden min-w-[320px] flex flex-col items-center">
               <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full rotate-[-90deg]">
                     <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                     <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="452.39" strokeDashoffset="135" className="text-blue-500 shadow-[0_0_20px_#3b82f6]" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-white">68%</span>
                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Aggregate</span>
                  </div>
               </div>
               <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-6">OVERALL READINESS INDEX</p>
            </div>
          </div>
        </div>
      </section>

      {/* B. READINESS BREAKDOWN & DISTRIBUTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid lg:grid-cols-2 gap-20">
           {/* Dimension Breakdown */}
           <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">Readiness <span className="text-blue-500">Dimensions.</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {READINESS_BREAKDOWN.map((stat, i) => (
                   <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">{stat.icon}</div>
                         <span className="text-2xl font-black text-white">{stat.score}%</span>
                      </div>
                      <h4 className="text-sm font-black uppercase text-white mb-2 tracking-widest">{stat.category}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed mb-4">{stat.description}</p>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${stat.score}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Distribution View */}
           <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">Cohort <span className="text-blue-500">Distribution.</span></h2>
              <div className="p-12 rounded-[56px] border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl relative overflow-hidden">
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/5 blur-[80px] rounded-full" />
                 
                 <div className="space-y-10">
                    <div className="flex h-12 w-full rounded-2xl overflow-hidden bg-white/5">
                       {DISTRIBUTION.map((d, i) => (
                         <div key={i} className={`h-full ${d.color} transition-all duration-1000`} style={{ width: `${d.value}%` }} title={`${d.label}: ${d.value}%`} />
                       ))}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                       {DISTRIBUTION.map((d, i) => (
                         <div key={i} className="flex justify-between items-center group">
                            <div className="flex items-center gap-4">
                               <div className={`w-3 h-3 rounded-full ${d.color}`} />
                               <span className="text-xs font-black uppercase text-gray-400 group-hover:text-white transition-colors">{d.label}</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                               <span className="text-xl font-black text-white">{d.value}%</span>
                               <span className="text-[8px] font-black text-gray-600 uppercase">Population</span>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="pt-8 border-t border-white/5">
                       <p className="text-[11px] text-gray-500 font-medium leading-relaxed italic">
                          "Currently, 54% of the cohort sits in the 'Partially Ready' zone. Focus on 
                          specific technical bridge programs can move 15% of these to 'Fully Ready' within one semester."
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* C. ROLE-BASED READINESS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 z-10 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="flex justify-between items-end mb-16">
              <div>
                 <h2 className="text-3xl font-black uppercase tracking-tight">Market <span className="text-blue-500">Readiness Per Role.</span></h2>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Targeted placement strategy analysis</p>
              </div>
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Simulation Mode</button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ROLE_READINESS.map((item, i) => (
                <div key={i} className="p-8 rounded-[40px] bg-black/60 border border-white/5 hover:border-blue-500/40 transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-3 py-1 bg-blue-600/10 rounded-full">{item.industry}</span>
                      <span className={`text-[10px] font-black uppercase ${item.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{item.trend}</span>
                   </div>
                   <h4 className="text-lg font-black uppercase text-white mb-8 leading-tight group-hover:text-blue-400 transition-colors">{item.role}</h4>
                   <div className="space-y-4">
                      <div className="flex justify-between items-end">
                         <span className="text-[9px] font-black text-gray-600 uppercase">Batch Match</span>
                         <span className="text-xl font-black text-white">{item.readiness}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full transition-all duration-1500 ${item.readiness > 70 ? 'bg-emerald-500' : item.readiness > 40 ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: `${item.readiness}%` }} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* D. INTERVENTION SUGGESTIONS */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="mb-16">
           <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-emerald-500">Intervention.</span></h2>
           <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Automated remedy deployment for low-readiness clusters</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {[
             { t: "Intensive Skill Sprints", d: "Recommended for 24% of students lacking core technical proficiency.", i: "⚡", tag: "Hard Skills" },
             { t: "Mock Interview Marathons", d: "Focus on communication logic for the 'Partially Ready' 54%.", i: "🎤", tag: "Soft Skills" },
             { t: "Internship Acceleration", d: "Mandatory industrial projects for students with < 30% Experience scores.", i: "🤝", tag: "Experience" }
           ].map((item, i) => (
             <div key={i} className="p-10 rounded-[56px] bg-white/[0.02] border border-white/5 flex flex-col h-full hover:border-emerald-500/40 transition-all group">
                <div className="flex justify-between items-start mb-8">
                   <div className="text-4xl">{item.i}</div>
                   <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-black uppercase text-gray-500 tracking-widest">{item.tag}</span>
                </div>
                <h4 className="text-xl font-black uppercase text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors">{item.t}</h4>
                <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed mb-10">{item.d}</p>
                <button className="mt-auto w-full py-4 bg-white/5 group-hover:bg-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-white/10 group-hover:border-emerald-500 shadow-xl group-hover:shadow-emerald-600/20">
                   Deploy Program
                </button>
             </div>
           ))}
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Certainty over <br/><span className="gradient-text">Guesswork.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Every percentage point on this page is a real student career waiting to happen. 
              Career Soulmate gives institutions the transparency needed to ensure no student is left behind.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('gaps')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Analyze Specific Gaps
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Export Full Audit
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

export default CollegeReadinessPage;
