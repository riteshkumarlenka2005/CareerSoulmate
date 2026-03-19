
import React, { useState, useMemo } from 'react';

interface Learner {
  id: string;
  name: string;
  age: number;
  program: string;
  pathway: string;
  stream: string;
  risk: 'Low' | 'Medium' | 'High';
  lastInteraction: string;
  readiness: number;
  flags: string[];
  level: string;
  cluster: string;
}

const LEARNERS_DB: Learner[] = [
  {
    id: 'L-9821',
    name: 'Alex Johnson',
    age: 18,
    program: 'Class 12',
    pathway: 'B.Tech CS',
    stream: 'Science (PCM)',
    risk: 'Low',
    lastInteraction: '2 hours ago',
    readiness: 88,
    flags: ['High Potential', 'Early Finisher'],
    level: 'School',
    cluster: 'Technology'
  },
  {
    id: 'L-4412',
    name: 'Maria Garcia',
    age: 20,
    program: 'B.Tech CS (Year 2)',
    pathway: 'ML Engineer',
    stream: 'Engineering',
    risk: 'High',
    lastInteraction: '3 days ago',
    readiness: 42,
    flags: ['Skill Mismatch', 'Dropout Risk'],
    level: 'College',
    cluster: 'Artificial Intelligence'
  },
  {
    id: 'L-2210',
    name: 'Sam Chen',
    age: 19,
    program: 'B.A. Multi (Year 1)',
    pathway: 'UX Design',
    stream: 'Liberal Arts',
    risk: 'Medium',
    lastInteraction: '1 week ago',
    readiness: 65,
    flags: ['Confused Choice'],
    level: 'College',
    cluster: 'Creative'
  },
  {
    id: 'L-7756',
    name: 'Sarah Miller',
    age: 17,
    program: 'Class 11',
    pathway: 'Sustainability',
    stream: 'Science (PCB)',
    risk: 'Low',
    lastInteraction: '5 hours ago',
    readiness: 72,
    flags: ['Interdisciplinary Goal'],
    level: 'School',
    cluster: 'Environment'
  },
  {
    id: 'L-3341',
    name: 'Rohan Gupta',
    age: 21,
    program: 'B.Com (Year 3)',
    pathway: 'FinTech',
    stream: 'Commerce',
    risk: 'High',
    lastInteraction: 'Yesterday',
    readiness: 38,
    flags: ['Skill Mismatch', 'Low Assessment'],
    level: 'College',
    cluster: 'Finance'
  }
];

const CounselorStudentListPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [filterRisk, setFilterRisk] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLearners = useMemo(() => {
    return LEARNERS_DB.filter(l => {
      const matchesRisk = filterRisk === 'All' || l.risk === filterRisk;
      const matchesLevel = filterLevel === 'All' || l.level === filterLevel;
      const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            l.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRisk && matchesLevel && matchesSearch;
    });
  }, [filterRisk, filterLevel, searchQuery]);

  const stats = {
    total: LEARNERS_DB.length,
    highRisk: LEARNERS_DB.filter(l => l.risk === 'High').length,
    criticalGaps: 3,
    sessionsPending: 12
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* 1. OVERVIEW DASHBOARD */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                LEARNER DISCOVERY TERMINAL
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Student <br /><span className="gradient-text">Portfolio.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Strategic intervention management. Who needs your expertise today? 
                Prioritize by AI risk assessment and skill readiness.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Total Learners', v: stats.total, c: 'indigo' },
                 { l: 'High Risk', v: stats.highRisk, c: 'rose' },
                 { l: 'Critical Gaps', v: stats.criticalGaps, c: 'orange' },
                 { l: 'Pending Sessions', v: stats.sessionsPending, c: 'cyan' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-indigo-500/30 transition-all">
                    <p className={`text-3xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SMART FILTERS BAR */}
      <section className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
           <div className="relative group w-full md:w-96">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Name or ID..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-xs font-black uppercase outline-none focus:border-indigo-500 transition-all placeholder:text-gray-700"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>

           <div className="flex gap-4 w-full md:w-auto">
              <select 
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="flex-grow md:w-48 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[10px] font-black uppercase outline-none focus:border-indigo-500 text-gray-400"
              >
                <option value="All">Risk: All</option>
                <option value="High">Risk: High</option>
                <option value="Medium">Risk: Medium</option>
                <option value="Low">Risk: Low</option>
              </select>
              <select 
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="flex-grow md:w-48 bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[10px] font-black uppercase outline-none focus:border-indigo-500 text-gray-400"
              >
                <option value="All">Level: All</option>
                <option value="School">School</option>
                <option value="College">College</option>
              </select>
              <button className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">More AI Filters</button>
           </div>
        </div>
      </section>

      {/* 3. LEARNER DIRECTORY LISTING */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">Active <span className="text-indigo-500">Directory.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">{filteredLearners.length} Identified Learners</p>
         </div>

         <div className="space-y-4">
            {filteredLearners.map(l => (
              <div key={l.id} className="group p-8 rounded-[40px] bg-[#0a0a0a] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
                 
                 {/* Basic Info */}
                 <div className="flex items-center gap-8 flex-grow min-w-[300px]">
                    <div className="w-16 h-16 rounded-[24px] bg-indigo-600/10 flex items-center justify-center font-black text-indigo-500 text-xl border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                       {l.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-lg font-black uppercase text-white group-hover:text-indigo-400 transition-colors">{l.name}</h4>
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{l.id} • {l.program}</p>
                    </div>
                 </div>

                 {/* Pathway & Cluster */}
                 <div className="grid grid-cols-2 gap-12 flex-grow">
                    <div>
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-2">Current Path</p>
                       <p className="text-xs font-black text-white uppercase">{l.pathway}</p>
                       <p className="text-[9px] text-gray-500 font-bold uppercase">{l.stream}</p>
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-2">AI Cluster</p>
                       <p className="text-xs font-black text-indigo-400 uppercase">{l.cluster}</p>
                    </div>
                 </div>

                 {/* Readiness & Risk */}
                 <div className="flex items-center gap-12 text-center md:text-right min-w-[320px] justify-end">
                    <div className="space-y-2">
                       <p className="text-[8px] font-black text-gray-600 uppercase">Readiness</p>
                       <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-white">{l.readiness}%</span>
                          <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-600" style={{ width: `${l.readiness}%` }} />
                          </div>
                       </div>
                    </div>
                    <div className="min-w-[100px]">
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-2">Risk Level</p>
                       <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                         l.risk === 'High' ? 'bg-rose-500/10 text-rose-500 animate-pulse' : 
                         l.risk === 'Medium' ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500'
                       }`}>
                         {l.risk}
                       </span>
                    </div>
                 </div>

                 {/* Priority Flags (AI Core) */}
                 <div className="flex flex-wrap gap-2 justify-end lg:w-48">
                    {l.flags.map(f => (
                      <span key={f} className="px-2 py-1 bg-indigo-900/20 border border-indigo-500/20 text-indigo-400 text-[8px] font-black uppercase tracking-tighter rounded">
                        {f}
                      </span>
                    ))}
                 </div>

                 {/* Quick Actions */}
                 <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 transition-all border border-white/10" title="View Profile">
                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all border border-white/10" title="Schedule Session">
                       <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </button>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 4. INTERVENTION PROMPTS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Intervention <br/><span className="text-indigo-500">Directives.</span></h2>
               <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xl">
                  Our AI scans the student list every hour. It doesn't just flag risks; it suggests exactly <span className="text-white">how to fix them</span>.
               </p>
               <div className="space-y-6">
                  {[
                     { t: "The Confused Batch", d: "12 students in B.Tech Year 2 are showing erratic career search patterns. Recommend 'Path Stability' workshop.", i: "🤔" },
                     { t: "Post-Assessment Drift", d: "High potential candidates are missing 2 critical skill certs. Batch message suggest AWS Academy.", i: "📡" }
                  ].map((item, i) => (
                    <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 flex gap-8 items-start group hover:border-indigo-500/40 transition-all">
                       <div className="text-3xl shrink-0">{item.i}</div>
                       <div className="space-y-2">
                          <h4 className="text-sm font-black uppercase text-white tracking-widest">{item.t}</h4>
                          <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-indigo-600/5 blur-[120px] rounded-full" />
               <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl text-center">
                  <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-12">Counselor Efficacy Metrics</h4>
                  <div className="space-y-10">
                     {[
                        { label: 'Intervention Rate', val: 92, color: 'bg-indigo-600' },
                        { label: 'Risk Mitigation', val: 78, color: 'bg-emerald-600' },
                        { label: 'Average Resolution Time', val: 4.2, unit: 'Days', color: 'bg-cyan-600' }
                     ].map((s, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black uppercase text-white tracking-widest">{s.label}</span>
                              <span className="text-xl font-black text-white">{s.val}{s.unit || '%'}</span>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${s.color} transition-all duration-1500`} style={{ width: s.unit ? '100%' : `${s.val}%` }} />
                           </div>
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
             Know Your <br/><span className="gradient-text">Impact.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Counseling is the highest-value human interaction on our platform. 
              We give you the data, you give the guidance.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Batch Notification Engine...')} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-[10px]">
               Batch Message High Risks
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Configure Alert Thresholds
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
        .text-rose-500 { color: #f43f5e; }
        .bg-rose-500\/10 { background-color: rgba(244, 63, 94, 0.1); }
      `}</style>
    </div>
  );
};

export default CounselorStudentListPage;
