
import React, { useState } from 'react';

interface NSQFLevel {
  level: number;
  label: string;
  complexity: string;
  hours: string;
  roles: string[];
  requirements: string;
  academicEquiv: string;
  color: string;
}

const NSQF_DATA: NSQFLevel[] = [
  {
    level: 1,
    label: "Beginner",
    complexity: "Basic awareness and routine repetitive tasks under close supervision.",
    hours: "200 - 400 Hours",
    roles: ["General Helper", "Office Attendant", "Manual Labor Support"],
    requirements: "No formal education required.",
    academicEquiv: "Primary School (Class 5)",
    color: "slate"
  },
  {
    level: 2,
    label: "Basic Operator",
    complexity: "Operating tools and performing predictable tasks in a stable environment.",
    hours: "400 - 600 Hours",
    roles: ["Assembly Line Op", "Data Entry Operator", "Hospitality Staff"],
    requirements: "Class 8 Pass or RPL Assessment.",
    academicEquiv: "Class 8",
    color: "blue"
  },
  {
    level: 3,
    label: "Semi-skilled",
    complexity: "Working with a range of specialized tools and limited problem solving.",
    hours: "600 - 800 Hours",
    roles: ["Assistant Electrician", "Customer Care Executive", "Junior Mechanic"],
    requirements: "Class 10 Pass or Level 2 Certificate.",
    academicEquiv: "Class 10 (Secondary)",
    color: "cyan"
  },
  {
    level: 4,
    label: "Skilled Worker",
    complexity: "Independent execution of tasks with technical precision and safety compliance.",
    hours: "800 - 1200 Hours",
    roles: ["Senior Welder", "Solar PV Installer", "Logistics Coordinator"],
    requirements: "Class 12 Pass or Level 3 Certificate.",
    academicEquiv: "Class 12 (Higher Secondary) / ITI",
    color: "emerald"
  },
  {
    level: 5,
    label: "Supervisor",
    complexity: "Specialized technical knowledge with management and team leadership skills.",
    hours: "1200 - 1800 Hours",
    roles: ["Floor Manager", "HVAC Supervisor", "Software Tester"],
    requirements: "Level 4 Certificate + Experience or Diploma Entry.",
    academicEquiv: "1st Year Undergraduate / Diploma",
    color: "amber"
  },
  {
    level: 6,
    label: "Diploma Level",
    complexity: "Advanced theoretical knowledge and planning complex system interventions.",
    hours: "1800 - 2400 Hours",
    roles: ["Technical Project Lead", "Operations Analyst", "Quality Lead"],
    requirements: "Level 5 Certificate or Advanced Diploma.",
    academicEquiv: "2nd Year Undergraduate / Advanced Diploma",
    color: "indigo"
  },
  {
    level: 7,
    label: "Advanced Professional",
    complexity: "Comprehensive professional competency with strategic decision-making authority.",
    hours: "3000+ Hours",
    roles: ["Systems Architect", "Strategic Consultant", "Production Manager"],
    requirements: "Level 6 Certificate or Bachelor's Degree.",
    academicEquiv: "Bachelor's Degree",
    color: "purple"
  }
];

const NSQFPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(4);

  const activeLevel = NSQF_DATA.find(d => d.level === selectedLevel) || NSQF_DATA[3];

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. NSQF OVERVIEW SECTION */}
      <section className="relative pt-28 pb-16 px-6 overflow-visible border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest uppercase">
            SKILL STANDARDIZATION PROTOCOL
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            The NSQF <br/><span className="gradient-text">Alphabet.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-12">
            The National Skill Qualification Framework (NSQF) is the bridge between education 
            and employability. It translates what you <span className="text-white">know</span> into what you can <span className="text-white">do</span>.
          </p>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
             {[
               { t: "Global Benchmarking", d: "Aligns Indian skills with International (EQF) standards.", i: "🌍" },
               { t: "Vertical Mobility", d: "Allows you to climb from helper to architect systematically.", i: "🚀" },
               { t: "RPL Recognized", d: "Experience is valued even without formal schooling.", i: "💎" }
             ].map((item, i) => (
               <div key={i} className="space-y-4">
                  <div className="text-3xl">{item.i}</div>
                  <h4 className="text-xs font-black uppercase text-white tracking-widest">{item.t}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-tight">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* B. NSQF LADDER VISUALIZATION (MAIN) */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
        
        {/* Left: Interactive Ladder */}
        <div className="space-y-4">
           <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-10">Select Level to Analyze</h3>
           <div className="flex flex-col gap-3">
              {NSQF_DATA.slice().reverse().map(d => (
                <button
                  key={d.level}
                  onClick={() => setSelectedLevel(d.level)}
                  className={`relative p-6 rounded-2xl border transition-all duration-300 text-left group overflow-hidden ${selectedLevel === d.level ? `bg-${d.color}-500/10 border-${d.color}-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)]` : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500 bg-${d.color}-500 ${selectedLevel === d.level ? 'opacity-100' : 'opacity-20'}`} />
                  <div className="flex justify-between items-center relative z-10">
                     <div className="flex items-baseline gap-4">
                        <span className={`text-xl font-black transition-colors ${selectedLevel === d.level ? 'text-white' : 'text-gray-600'}`}>0{d.level}</span>
                        <span className={`text-sm font-black uppercase tracking-widest ${selectedLevel === d.level ? 'text-white' : 'text-gray-400'}`}>{d.label}</span>
                     </div>
                     {selectedLevel === d.level && (
                       <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                     )}
                  </div>
                </button>
              ))}
           </div>
        </div>

        {/* Right: Immersive Level Dossier */}
        <div className="sticky top-32">
           <div className={`p-12 rounded-[56px] border bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-3xl shadow-2xl relative overflow-hidden transition-all duration-700 ${`border-${activeLevel.color}-500/30`}`}>
              {/* Dynamic Glow */}
              <div className={`absolute -top-20 -right-20 w-64 h-64 blur-[100px] rounded-full transition-all duration-1000 ${`bg-${activeLevel.color}-500/10`}`} />
              
              <div className="relative z-10 space-y-10">
                 <div className="flex justify-between items-start">
                    <div>
                       <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${`text-${activeLevel.color}-500`}`}>NSQF PROFICIENCY LEVEL</p>
                       <h2 className="text-5xl font-black uppercase tracking-tighter text-white">LEVEL 0{activeLevel.level}</h2>
                    </div>
                    <div className={`w-20 h-20 rounded-[24px] border-2 flex items-center justify-center text-3xl font-black ${`border-${activeLevel.color}-500/40 text-${activeLevel.color}-500`}`}>
                       {activeLevel.level}
                    </div>
                 </div>

                 <section className="space-y-4">
                    <h5 className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Skill Complexity</h5>
                    <p className="text-gray-200 text-lg font-medium leading-relaxed italic border-l-4 border-white/10 pl-6">
                      "{activeLevel.complexity}"
                    </p>
                 </section>

                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <h5 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Typical Roles</h5>
                       <div className="flex flex-col gap-2">
                          {activeLevel.roles.map(role => (
                            <div key={role} className="flex items-center gap-3">
                               <div className={`w-1.5 h-1.5 rounded-full ${`bg-${activeLevel.color}-500`}`} />
                               <span className="text-[11px] font-black uppercase text-white tracking-widest">{role}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div>
                       <h5 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Learning Intensity</h5>
                       <p className="text-xl font-black text-white">{activeLevel.hours}</p>
                       <p className="text-[9px] font-bold text-gray-600 uppercase mt-1">Guided Learning Hours (GLH)</p>
                    </div>
                 </div>

                 <div className="pt-10 border-t border-white/5 space-y-6">
                    <div>
                       <h5 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Academic Equivalence</h5>
                       <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-white`}>
                          {activeLevel.academicEquiv}
                       </span>
                    </div>
                    <div>
                       <h5 className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2">Entry Requirements</h5>
                       <p className="text-xs font-medium text-gray-400 uppercase leading-relaxed">{activeLevel.requirements}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* C. ACADEMIC ↔ VOCATIONAL MAPPING */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
              <h2 className="text-3xl font-black uppercase tracking-tight">Equivalence <span className="text-blue-500">Mapping.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Dignity of Labor Through Academic Parity</p>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/10">
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Level</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Vocational Track (ITI/Skills)</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Academic Track (School/Degree)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {NSQF_DATA.map(d => (
                       <tr key={d.level} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="p-8"><span className="text-2xl font-black text-gray-600 group-hover:text-blue-500 transition-colors">0{d.level}</span></td>
                          <td className="p-8">
                             <div className="space-y-1">
                                <p className="text-sm font-black uppercase text-white tracking-widest">{d.label}</p>
                                <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Professional Certification</p>
                             </div>
                          </td>
                          <td className="p-8">
                             <div className="space-y-1">
                                <p className="text-sm font-black uppercase text-white tracking-widest">{d.academicEquiv}</p>
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Board/University Outcome</p>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </section>

      {/* D. PROGRESSION & MOBILITY PATHS */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
               <div className="absolute inset-0 bg-blue-600/5 blur-[120px]" />
               <div className="relative p-12 rounded-[60px] bg-white/[0.02] border border-white/10 overflow-hidden">
                  <div className="flex flex-col gap-12">
                     {[
                        { t: "Skill Upgrading", d: "Transition from Level 3 to Level 5 through bridge courses and work-ex.", i: "📈" },
                        { t: "Lateral Entry", d: "Move from a Level 5 Diploma directly into the 2nd year of a Degree.", i: "➡️" },
                        { t: "Experience Recognition", d: "Work 3 years at Level 4? Challenge the Level 5 assessment directly.", i: "🏅" }
                     ].map((step, i) => (
                        <div key={i} className="flex gap-8 items-start group">
                           <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl group-hover:bg-blue-600 transition-all shrink-0">
                              {step.i}
                           </div>
                           <div className="space-y-2">
                              <h4 className="text-xs font-black uppercase text-white tracking-widest">{step.t}</h4>
                              <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">{step.d}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-10">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Infinite <br/><span className="text-blue-500">Mobility.</span></h2>
               <p className="text-gray-400 text-xl font-medium leading-relaxed">
                  NEP 2020 and NSQF remove the ceiling for vocational learners. 
                  Start as an apprentice, end as a PhD researcher. 
                  The framework ensures every credit earned is bankable and transferable.
               </p>
               <button onClick={() => onNavigate('nep')} className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                  Understand NEP Integration
               </button>
            </div>
         </div>
      </section>

      {/* E. EMPLOYER RECOGNITION */}
      <section className="py-24 px-6 bg-gradient-to-t from-blue-900/10 to-transparent">
         <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-3xl font-black uppercase tracking-tight">Employer <span className="text-blue-500">Trust.</span></h2>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-10 rounded-[40px] bg-black/40 border border-white/10 space-y-4">
                  <h4 className="text-xs font-black uppercase text-white tracking-widest">Verified Competency</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">
                     Employers no longer rely on degree names. They look for NSQF Level 4+ 
                     competency matching their specific job roles.
                  </p>
               </div>
               <div className="p-10 rounded-[40px] bg-black/40 border border-white/10 space-y-4">
                  <h4 className="text-xs font-black uppercase text-white tracking-widest">Unified Hiring</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">
                     Standardized skill levels reduce recruitment friction and 
                     ensure pay-parity based on actual performance levels.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Certify Your <br/><span className="gradient-text">Potential.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Skill Assessment...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Assess My NSQF Level
             </button>
             <button onClick={() => onNavigate('pathways')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Browse Skill Pathways
             </button>
           </div>
        </div>
      </section>

      <style>{`
        /* Dynamic Tailwind Colors Fallback for Safety */
        .bg-slate-500 { background-color: #64748b; }
        .bg-blue-500 { background-color: #3b82f6; }
        .bg-cyan-500 { background-color: #06b6d4; }
        .bg-emerald-500 { background-color: #10b981; }
        .bg-amber-500 { background-color: #f59e0b; }
        .bg-indigo-500 { background-color: #6366f1; }
        .bg-purple-500 { background-color: #a855f7; }
        
        .border-slate-500\/50 { border-color: rgba(100, 116, 139, 0.5); }
        .border-blue-500\/50 { border-color: rgba(59, 130, 246, 0.5); }
        .border-cyan-500\/50 { border-color: rgba(6, 182, 212, 0.5); }
        .border-emerald-500\/50 { border-color: rgba(16, 185, 129, 0.5); }
        .border-amber-500\/50 { border-color: rgba(245, 158, 11, 0.5); }
        .border-indigo-500\/50 { border-color: rgba(99, 102, 241, 0.5); }
        .border-purple-500\/50 { border-color: rgba(168, 85, 247, 0.5); }
        
        .text-slate-500 { color: #64748b; }
        .text-blue-500 { color: #3b82f6; }
        .text-cyan-500 { color: #06b6d4; }
        .text-emerald-500 { color: #10b981; }
        .text-amber-500 { color: #f59e0b; }
        .text-indigo-500 { color: #6366f1; }
        .text-purple-500 { color: #a855f7; }
      `}</style>
    </div>
  );
};

export default NSQFPage;
