
import React, { useState, useMemo } from 'react';

interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  expertise: string[];
  assignedCourses: string[];
  workload: number; // hours per week
  maxLoad: number;
  qualifications: string[];
  feedbackScore: number; // 0-5 scale
  availability: string;
  skills: { name: string; relevance: number }[];
}

const FACULTY_DB: Faculty[] = [
  {
    id: 'f1',
    name: 'Dr. Ritesh Lenka',
    department: 'Computer Science',
    designation: 'Professor',
    expertise: ['Deep Learning', 'Neural Architectures', 'Algorithms'],
    assignedCourses: ['CS302: Neural Model Architectures', 'CS101: Intro to Programming'],
    workload: 14,
    maxLoad: 18,
    qualifications: ['PhD in AI (IITB)', 'Post-Doc (MIT)'],
    feedbackScore: 4.8,
    availability: 'Mon-Thu (Full Day)',
    skills: [
      { name: 'Research Logic', relevance: 98 },
      { name: 'Pedagogy', relevance: 92 },
      { name: 'Industry Sync', relevance: 95 }
    ]
  },
  {
    id: 'f2',
    name: 'Prof. Mayank Mishra',
    department: 'Finance & Commerce',
    designation: 'Associate Professor',
    expertise: ['FinTech Compliance', 'Blockchain Econ', 'Taxation'],
    assignedCourses: ['MG105: Ethical FinTech Compliance', 'CO201: Corporate Law'],
    workload: 18,
    maxLoad: 20,
    qualifications: ['CA', 'PhD in Digital Finance'],
    feedbackScore: 4.5,
    availability: 'All Week (Morning)',
    skills: [
      { name: 'Audit Rigor', relevance: 94 },
      { name: 'Communication', relevance: 88 },
      { name: 'Policy Logic', relevance: 91 }
    ]
  },
  {
    id: 'f3',
    name: 'Asst. Prof. Lipsita Mishra',
    department: 'Humanities & Design',
    designation: 'Assistant Professor',
    expertise: ['Cognitive UX', 'Visual Semantics', 'User Research'],
    assignedCourses: ['DS101: Visual Arts Foundation', 'PY204: Cognitive Psychology'],
    workload: 10,
    maxLoad: 18,
    qualifications: ['M.Des (NID)', 'PhD (Ongoing)'],
    feedbackScore: 4.9,
    availability: 'Tue-Fri (Flexible)',
    skills: [
      { name: 'Creative Design', relevance: 96 },
      { name: 'Student Mentorship', relevance: 98 },
      { name: 'Lab Management', relevance: 85 }
    ]
  }
];

const AdminAcademicsFacultyPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All Departments');

  const filteredFaculty = useMemo(() => {
    return FACULTY_DB.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDept = filterDept === 'All Departments' || f.department === filterDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, filterDept]);

  const selectedFaculty = useMemo(() => FACULTY_DB.find(f => f.id === selectedFacultyId), [selectedFacultyId]);

  const stats = {
    total: FACULTY_DB.length,
    overloaded: FACULTY_DB.filter(f => f.workload >= f.maxLoad).length,
    avgFeedback: 4.7,
    utilization: 74
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. FACULTY INTELLIGENCE HEADER */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808] z-40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                HUMAN CAPITAL ORCHESTRATION
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Faculty <span className="gradient-text">Intelligence.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Strategic allocation of academic expertise. Ensure faculty strengths align with 
                curriculum outcomes while maintaining optimal workload balance.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Faculty Roster', v: stats.total, c: 'blue' },
                 { l: 'Load Alerts', v: stats.overloaded, c: 'rose' },
                 { l: 'Success Index', v: stats.avgFeedback, c: 'emerald' },
                 { l: 'Capacity Util', v: `${stats.utilization}%`, c: 'cyan' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                    <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
           <div className="relative group w-full md:w-96">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Expertise or Name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-xs font-black uppercase outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>

           <div className="flex gap-4 w-full md:w-auto">
              {['All Departments', 'Computer Science', 'Finance & Commerce', 'Humanities & Design'].map(dept => (
                <button 
                  key={dept}
                  onClick={() => setFilterDept(dept)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterDept === dept ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'}`}
                >
                  {dept.replace('All Departments', 'Global View')}
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* B. FACULTY DIRECTORY TABLE */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10">
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Faculty Name & Designation</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Expertise Verticals</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Workload (h/w)</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Feedback</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredFaculty.map(f => (
                     <tr 
                      key={f.id} 
                      onClick={() => setSelectedFacultyId(f.id)}
                      className="group hover:bg-white/[0.01] transition-colors cursor-pointer"
                     >
                        <td className="p-10">
                           <div className="flex items-center gap-6">
                              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center font-black text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">{f.name.charAt(0)}</div>
                              <div className="space-y-1">
                                 <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors leading-none">{f.name}</h4>
                                 <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{f.designation} • {f.department}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-10">
                           <div className="flex flex-wrap gap-2">
                              {f.expertise.map(e => <span key={e} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[8px] font-black text-gray-400 uppercase">{e}</span>)}
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <div className="space-y-1">
                              <span className={`text-sm font-black ${f.workload >= f.maxLoad ? 'text-rose-500' : 'text-white'}`}>{f.workload}h / {f.maxLoad}h</span>
                              <div className="w-16 h-1 bg-white/5 rounded-full mx-auto overflow-hidden">
                                 <div className={`h-full ${f.workload >= f.maxLoad ? 'bg-rose-600' : 'bg-blue-600'}`} style={{ width: `${(f.workload/f.maxLoad)*100}%` }} />
                              </div>
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <span className="text-sm font-black text-emerald-500">{f.feedbackScore} <span className="text-[8px] text-gray-600 uppercase">Avg</span></span>
                        </td>
                        <td className="p-10 text-center">
                           <span className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase ${f.workload >= f.maxLoad ? 'text-rose-500' : 'text-emerald-500'}`}>
                              {f.workload >= f.maxLoad ? 'Overloaded' : 'Optimal'}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* C. FACULTY PROFILE PAGE (MODAL) */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedFacultyId(null)} />
           
           <div className="relative w-full max-w-7xl h-full max-h-[92vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-2xl">
              
              {/* Left Col: Expertise & Qualifications */}
              <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-blue-600/[0.02]">
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Faculty Dossier</span>
                       <h2 className="text-4xl font-black uppercase text-white leading-none tracking-tighter">{selectedFaculty.name}</h2>
                       <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedFaculty.designation}</p>
                    </div>

                    <div className="p-10 rounded-[48px] bg-black border border-white/5 space-y-6">
                       <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">Credentials</h3>
                       <div className="space-y-4">
                          {selectedFaculty.qualifications.map((q, i) => (
                             <div key={i} className="flex gap-4 items-center group">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-black text-gray-300 uppercase">{q}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <section className="space-y-6">
                       <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Availability Profile</h4>
                       <p className="text-sm font-black text-white uppercase tracking-widest">{selectedFaculty.availability}</p>
                    </section>
                    
                    <section className="space-y-6">
                       <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-emerald-600 pl-6">Teaching Quality</h4>
                       <div className="flex items-center gap-4">
                          <span className="text-4xl font-black text-emerald-500">{selectedFaculty.feedbackScore}</span>
                          <div>
                             <div className="flex gap-1">
                                {[1,2,3,4,5].map(s => <div key={s} className={`w-2 h-2 rounded-full ${s <= Math.floor(selectedFaculty.feedbackScore) ? 'bg-emerald-500' : 'bg-white/5'}`} />)}
                             </div>
                             <p className="text-[8px] font-black text-gray-600 uppercase mt-2">Aggregate Learner Satisfaction</p>
                          </div>
                       </div>
                    </section>
                 </div>
              </div>

              {/* Right Col: Load & Performance */}
              <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40">
                 <div className="flex justify-end mb-10">
                    <button onClick={() => setSelectedFacultyId(null)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10">
                       <svg className="w-7 h-7 text-gray-500 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 </div>

                 <div className="space-y-20">
                    <section className="space-y-12">
                       <div className="flex items-center gap-6">
                         <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">Assigned Curriculum</h4>
                         <div className="h-px flex-grow bg-white/10" />
                       </div>
                       <div className="grid md:grid-cols-2 gap-8">
                          {selectedFaculty.assignedCourses.map((c, i) => (
                             <div key={i} className="p-8 rounded-[40px] bg-[#0a0a0a] border border-white/5 group hover:border-blue-500/30 transition-all">
                                <h5 className="text-sm font-black uppercase text-white mb-2 leading-tight">{c}</h5>
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Active Academic Assignment</p>
                             </div>
                          ))}
                       </div>
                    </section>

                    <section className="space-y-12">
                       <div className="flex items-center gap-6">
                         <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.5em] whitespace-nowrap">Competency Relevance</h4>
                         <div className="h-px flex-grow bg-white/10" />
                       </div>
                       <div className="space-y-10">
                          {selectedFaculty.skills.map(s => (
                             <div key={s.name} className="space-y-3">
                                <div className="flex justify-between items-end">
                                   <span className="text-xs font-black uppercase text-white tracking-widest">{s.name} Mastery</span>
                                   <span className="text-xs font-black text-cyan-500">{s.relevance}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-cyan-600" style={{ width: `${s.relevance}%` }} />
                                </div>
                             </div>
                          ))}
                       </div>
                    </section>

                    <div className="p-12 rounded-[64px] bg-gradient-to-br from-blue-900/15 via-[#080808] to-[#080808] border border-blue-500/20 relative overflow-hidden">
                       <h3 className="text-2xl font-black uppercase text-white mb-4">Workload <span className="text-blue-500">Equilibrium.</span></h3>
                       <p className="text-sm text-gray-300 font-medium leading-relaxed tracking-tight max-w-2xl">
                         This faculty member is currently at <span className="text-blue-400 font-black">{Math.round((selectedFaculty.workload/selectedFaculty.maxLoad)*100)}%</span> capacity. 
                         The AI scheduling model suggests <span className="text-emerald-500">optimal bandwidth</span> for additional interdisciplinary mentorship.
                       </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-white/5">
                       <button className="py-7 bg-blue-600 hover:bg-blue-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl transition-all active:scale-95">
                          Modify Load Assignments
                       </button>
                       <button className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                          Export Performance Review
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* C. AGGREGATE ANALYTICS (BOTTOM) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-20">Resource <span className="text-blue-500">Utilization.</span></h2>
            <div className="grid md:grid-cols-3 gap-12">
               {[
                 { label: 'Workload Balance', val: '92%', d: 'Variance across departmental staff.', c: 'blue' },
                 { label: 'Syllabus Coverage', val: '84%', d: 'Real-time instructional progress tracking.', c: 'emerald' },
                 { label: 'Faculty Satisfaction', val: '4.2/5', d: 'Aggregated internal experience score.', c: 'indigo' }
               ].map((item, i) => (
                 <div key={i} className="p-10 rounded-[56px] bg-black/60 border border-white/10 flex flex-col items-center group hover:border-white/20 transition-all">
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-6">{item.label}</p>
                    <span className={`text-4xl font-black text-${item.c}-500 mb-4`}>{item.val}</span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-6">{item.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Intelligent <br/><span className="gradient-text">Orchestration.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Faculty are the architects of student legacy. Career Soulmate 
              ensures their expertise is deployed with mathematical precision for 
              institutional excellence.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Expertise Matcher...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Match Faculty to Electives
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
        .text-rose-500 { color: #f43f5e; }
        .bg-rose-600 { background-color: #e11d48; }
        .text-emerald-500 { color: #10b981; }
        .bg-emerald-500 { background-color: #10b981; }
      `}</style>
    </div>
  );
};

export default AdminAcademicsFacultyPage;
