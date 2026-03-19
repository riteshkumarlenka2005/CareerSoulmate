
import React, { useState, useMemo } from 'react';

interface Course {
  id: string;
  code: string;
  name: string;
  program: string;
  semester: number;
  type: 'Core' | 'Elective' | 'Skill' | 'Audit';
  credits: number;
  mode: 'Theory' | 'Lab' | 'Hybrid';
  description: string;
  outcomes: string[];
  nsqfLevel: number;
  prerequisites: string[];
  assessment: { component: string; weight: number }[];
  industryTags: string[];
  nepCompliant: {
    multidisciplinary: boolean;
    vocational: boolean;
    experiential: boolean;
  };
}

const COURSES_DB: Course[] = [
  {
    id: 'c1',
    code: 'CS302',
    name: 'Neural Model Architectures',
    program: 'B.Tech CS (S6)',
    semester: 6,
    type: 'Core',
    credits: 4,
    mode: 'Theory',
    description: 'A deep-dive into transformer-based architectures and their neural synthesis logic.',
    outcomes: ['Design multi-modal transformers', 'Optimize inference latency', 'Implement attention mechanisms'],
    nsqfLevel: 7,
    prerequisites: ['CS201: Data Structures', 'MA202: Linear Algebra'],
    assessment: [
      { component: 'Terminal Exam', weight: 60 },
      { component: 'R&D Project', weight: 30 },
      { component: 'Peer Review', weight: 10 }
    ],
    industryTags: ['AI Research', 'Deep Learning', 'Big Tech'],
    nepCompliant: {
      multidisciplinary: true,
      vocational: false,
      experiential: true
    }
  },
  {
    id: 'c2',
    code: 'MG105',
    name: 'Ethical FinTech Compliance',
    program: 'B.Com FinTech (S4)',
    semester: 4,
    type: 'Elective',
    credits: 3,
    mode: 'Hybrid',
    description: 'Understanding the regulatory landscape of digital finance and ethical algorithmic trading.',
    outcomes: ['Conduct compliance audits', 'Analyze risk vectors', 'Design ethical nudging'],
    nsqfLevel: 6,
    prerequisites: ['Basic Finance'],
    assessment: [
      { component: 'Case Study', weight: 50 },
      { component: 'Simulated Audit', weight: 50 }
    ],
    industryTags: ['Banking', 'Legal Tech', 'Risk Mgmt'],
    nepCompliant: {
      multidisciplinary: true,
      vocational: true,
      experiential: false
    }
  },
  {
    id: 'c3',
    code: 'ME412',
    name: 'EV Propulsion Systems Lab',
    program: 'B.Tech Mech (S8)',
    semester: 8,
    type: 'Skill',
    credits: 4,
    mode: 'Lab',
    description: 'Hands-on laboratory for testing lithium-ion propulsion and motor control logic.',
    outcomes: ['Assemble EV drivetrain', 'Calibrate BMS systems', 'Diagnostic testing'],
    nsqfLevel: 5,
    prerequisites: ['Thermodynamics', 'Electronics 101'],
    assessment: [
      { component: 'Lab Practical', weight: 70 },
      { component: 'Viva Voce', weight: 30 }
    ],
    industryTags: ['Automotive', 'Clean Tech', 'Manufacturing'],
    nepCompliant: {
      multidisciplinary: false,
      vocational: true,
      experiential: true
    }
  }
];

const AdminAcademicsCoursesPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All Types');

  const filteredCourses = useMemo(() => {
    return COURSES_DB.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'All Types' || c.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const selectedCourse = useMemo(() => COURSES_DB.find(c => c.id === selectedCourseId), [selectedCourseId]);

  const stats = {
    total: COURSES_DB.length,
    core: COURSES_DB.filter(c => c.type === 'Core').length,
    nepAligned: Math.round((COURSES_DB.filter(c => c.nepCompliant.multidisciplinary || c.nepCompliant.vocational).length / COURSES_DB.length) * 100),
    avgCredits: 3.4
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. COURSE CATALOG DASHBOARD (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808] z-40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                CURRICULUM ARCHITECTURE SYSTEM
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Academic <span className="gradient-text">Inventory.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Structural definition and control of institutional assets. Ensure every module 
                is aligned with NSQF standards and NEP 2020 multi-disciplinary mandates.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Total Modules', v: stats.total, c: 'blue' },
                 { l: 'Core Assets', v: stats.core, c: 'cyan' },
                 { l: 'NEP Compliant', v: `${stats.nepAligned}%`, c: 'purple' },
                 { l: 'Avg Credits', v: stats.avgCredits, c: 'emerald' }
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

      {/* SEARCH & FILTERS BAR */}
      <section className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
           <div className="relative group w-full md:w-96">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Code or Name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-xs font-black uppercase outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>

           <div className="flex gap-4 w-full md:w-auto">
              {['All Types', 'Core', 'Elective', 'Skill'].map(type => (
                <button 
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterType === type ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'}`}
                >
                  {type}
                </button>
              ))}
           </div>
           
           <div className="flex-grow flex justify-end">
              <button className="px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Add Course +</button>
           </div>
        </div>
      </section>

      {/* B. CATALOG TABLE */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10">
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Code & Title</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Program</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Value</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Delivery Mode</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">NEP Badge</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredCourses.map(course => (
                     <tr 
                      key={course.id} 
                      onClick={() => setSelectedCourseId(course.id)}
                      className="group hover:bg-white/[0.01] transition-colors cursor-pointer"
                     >
                        <td className="p-10">
                           <div className="space-y-1">
                              <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors leading-none">{course.name}</h4>
                              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">{course.code}</p>
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{course.program}</span>
                        </td>
                        <td className="p-10 text-center">
                           <div className="space-y-1">
                              <span className="text-sm font-black text-white">{course.credits} Cr</span>
                              <p className="text-[8px] font-black text-blue-500 uppercase">{course.type}</p>
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase text-gray-300">{course.mode}</span>
                        </td>
                        <td className="p-10 text-center">
                           <div className="flex justify-center gap-2">
                              {course.nepCompliant.multidisciplinary && <div className="w-2 h-2 rounded-full bg-blue-500" title="Multidisciplinary" />}
                              {course.nepCompliant.vocational && <div className="w-2 h-2 rounded-full bg-emerald-500" title="Vocational" />}
                              {course.nepCompliant.experiential && <div className="w-2 h-2 rounded-full bg-purple-500" title="Experiential" />}
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* C. COURSE DETAIL VIEW (MODAL) */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedCourseId(null)} />
           
           <div className="relative w-full max-w-7xl h-full max-h-[92vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              
              {/* Left Col: Core Definition */}
              <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-blue-600/[0.02]">
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Module Specification</span>
                       <h2 className="text-4xl font-black uppercase text-white leading-none tracking-tighter">{selectedCourse.name}</h2>
                       <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedCourse.code} • NSQF Level {selectedCourse.nsqfLevel}</p>
                    </div>

                    <div className="p-10 rounded-[48px] bg-black border border-white/5 space-y-6">
                       <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">NEP Compliance Audit</h3>
                       <div className="space-y-4">
                          {[
                            { l: 'Multidisciplinary', v: selectedCourse.nepCompliant.multidisciplinary },
                            { l: 'Vocational Sync', v: selectedCourse.nepCompliant.vocational },
                            { l: 'Experiential', v: selectedCourse.nepCompliant.experiential }
                          ].map((item, i) => (
                             <div key={i} className="flex justify-between items-center group">
                                <span className="text-[10px] font-black text-gray-500 uppercase group-hover:text-white transition-colors">{item.l}</span>
                                <div className={`w-10 h-5 rounded-full relative transition-all ${item.v ? 'bg-emerald-600/20 border border-emerald-500/40' : 'bg-white/5'}`}>
                                   <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${item.v ? 'right-2 bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'left-2 bg-gray-700'}`} />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    <section className="space-y-6">
                       <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Industrial Synergy</h4>
                       <div className="flex flex-wrap gap-2">
                          {selectedCourse.industryTags.map(tag => <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase text-gray-400">#{tag}</span>)}
                       </div>
                    </section>
                 </div>
              </div>

              {/* Right Col: Outcomes & Assessment */}
              <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40">
                 <div className="flex justify-end mb-10">
                    <button onClick={() => setSelectedCourseId(null)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10">
                       <svg className="w-7 h-7 text-gray-500 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 </div>

                 <div className="space-y-24">
                    <section className="space-y-10">
                       <div className="flex items-center gap-6">
                         <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">Learning Outcomes</h4>
                         <div className="h-px flex-grow bg-white/10" />
                       </div>
                       <div className="grid md:grid-cols-2 gap-8">
                          {selectedCourse.outcomes.map((o, i) => (
                             <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-all">
                                <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 font-black text-xs shrink-0">0{i+1}</div>
                                <p className="text-sm font-medium text-gray-300 uppercase leading-relaxed">{o}</p>
                             </div>
                          ))}
                       </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-16">
                       <section className="space-y-10">
                          <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.5em]">Prerequisites</h4>
                          <div className="space-y-4">
                             {selectedCourse.prerequisites.map(pre => (
                               <div key={pre} className="flex items-center gap-4 group/pre">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 transition-all group-hover/pre:scale-150" />
                                  <span className="text-sm font-black uppercase text-gray-300">{pre}</span>
                               </div>
                             ))}
                          </div>
                       </section>
                       <section className="space-y-10">
                          <h4 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.5em]">Assessment Weights</h4>
                          <div className="space-y-6">
                             {selectedCourse.assessment.map(a => (
                               <div key={a.component} className="space-y-2">
                                  <div className="flex justify-between items-end">
                                     <span className="text-[10px] font-black text-gray-500 uppercase">{a.component}</span>
                                     <span className="text-sm font-black text-white">{a.weight}%</span>
                                  </div>
                                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-purple-600" style={{ width: `${a.weight}%` }} />
                                  </div>
                               </div>
                             ))}
                          </div>
                       </section>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-white/5">
                       <button className="py-7 bg-blue-600 hover:bg-blue-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl transition-all active:scale-95">
                          Modify Specifications
                       </button>
                       <button className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                          Audit Log History
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Purpose Driven <br/><span className="gradient-text">Curriculum.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Academic modules are the building blocks of student legacy. 
              Career Soulmate ensures every syllabus item translates to a verified skill.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Skill Mapping Engine...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Analyze Skill Overlap
             </button>
             <button onClick={() => onNavigate('admin-dashboard')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Dashboard
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

export default AdminAcademicsCoursesPage;
