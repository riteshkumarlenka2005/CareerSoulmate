
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface SemesterCourse {
  code: string;
  name: string;
  credits: number;
  type: 'Core' | 'Elective' | 'Vocational' | 'Value-Added';
}

interface AcademicProgram {
  id: string;
  name: string;
  level: 'UG' | 'PG' | 'Diploma';
  department: string;
  nepStructure: '3-Year' | '4-Year (FYUP)' | 'Research Track';
  status: 'Active' | 'Archived';
  overview: string;
  objectives: string[];
  totalCredits: number;
  eligibility: string;
  exitOptions: { year: number; award: string }[];
  careerOutcomes: string[];
  skillOutcomes: string[];
  curriculum: Record<number, SemesterCourse[]>; // Map semester number to courses
}

const PROGRAMS_DB: AcademicProgram[] = [
  {
    id: 'btech_cs',
    name: 'B.Tech Computer Science & Engineering',
    level: 'UG',
    department: 'School of Engineering',
    nepStructure: '4-Year (FYUP)',
    status: 'Active',
    overview: 'A comprehensive technical program designed to build deep logic and architectural proficiency in modern computing systems.',
    objectives: [
      'Master algorithmic efficiency and data structure optimization.',
      'Design and deploy scalable cloud-native architectures.',
      'Apply neural intelligence to real-world industrial problems.'
    ],
    totalCredits: 160,
    eligibility: '10+2 with PCM (Physics, Chemistry, Maths) + Entrance Score',
    exitOptions: [
      { year: 1, award: 'Certificate in Computer Engineering' },
      { year: 2, award: 'Diploma in Computer Science' },
      { year: 3, award: 'B.Sc Computer Science' }
    ],
    careerOutcomes: ['Cloud Architect', 'ML Engineer', 'Full-stack Lead', 'Research JRF'],
    skillOutcomes: ['Neural Orchestration', 'Distributed Systems', 'Cognitive Logic'],
    curriculum: {
      1: [
        { code: 'CS101', name: 'Intro to Programming', credits: 4, type: 'Core' },
        { code: 'MA101', name: 'Calculus & Linear Algebra', credits: 4, type: 'Core' },
        { code: 'HS101', name: 'Comm Skills', credits: 2, type: 'Value-Added' }
      ],
      2: [
        { code: 'CS102', name: 'Data Structures', credits: 4, type: 'Core' },
        { code: 'CS103', name: 'Digital Logic', credits: 3, type: 'Core' },
        { code: 'EV101', name: 'Environmental Science', credits: 2, type: 'Value-Added' }
      ],
      5: [
        { code: 'CS301', name: 'Database Management', credits: 4, type: 'Core' },
        { code: 'CS302', name: 'Artificial Intelligence', credits: 4, type: 'Core' },
        { code: 'EL105', name: 'Cyber Security Basics', credits: 3, type: 'Elective' }
      ]
    }
  },
  {
    id: 'bcom_hon',
    name: 'B.Com Honours (Accountancy)',
    level: 'UG',
    department: 'Commerce & Management',
    nepStructure: '3-Year',
    status: 'Active',
    overview: 'Strategic finance and audit intensive degree focused on the global corporate regulatory landscape.',
    objectives: ['Financial auditing mastery.', 'Corporate law interpretation.', 'Strategic tax planning.'],
    totalCredits: 120,
    eligibility: '10+2 with 50% aggregate in any stream.',
    exitOptions: [
      { year: 1, award: 'Certificate in Commerce' },
      { year: 2, award: 'Diploma in Management' }
    ],
    careerOutcomes: ['Chartered Accountant', 'Financial Analyst', 'Tax Consultant'],
    skillOutcomes: ['Audit Logic', 'Market Analysis', 'Compliance Auditing'],
    curriculum: {}
  }
];

const CollegeProgramsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'curriculum' | 'outcomes'>('details');

  const selectedProgram = useMemo(() => 
    PROGRAMS_DB.find(p => p.id === selectedProgramId) || null
  , [selectedProgramId]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. PROGRAM DIRECTORY DASHBOARD */}
      {!selectedProgramId ? (
        <section className="relative pt-28 pb-16 px-6 overflow-visible">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 flex flex-col lg:flex-row justify-between items-end gap-12">
               <div className="space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                    ACADEMIC ASSET MANAGEMENT
                  </div>
                  <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
                    Program <span className="gradient-text">Directory.</span>
                  </h1>
               </div>
               <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                  Launch New Program
               </button>
            </div>

            <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10">
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Program Name / Dept</th>
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Level</th>
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">NEP Structure</th>
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                    <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {PROGRAMS_DB.map(program => (
                    <tr key={program.id} className="group hover:bg-white/[0.01] transition-colors cursor-pointer" onClick={() => setSelectedProgramId(program.id)}>
                      <td className="p-10">
                        <div className="space-y-1">
                          <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors">{program.name}</h4>
                          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{program.department}</p>
                        </div>
                      </td>
                      <td className="p-10 text-center"><span className="text-sm font-black text-gray-300">{program.level}</span></td>
                      <td className="p-10 text-center"><span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{program.nepStructure}</span></td>
                      <td className="p-10 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${program.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-600'}`}>
                          {program.status}
                        </span>
                      </td>
                      <td className="p-10 text-center">
                         <div className="w-10 h-10 rounded-2xl bg-white/5 mx-auto flex items-center justify-center group-hover:bg-blue-600 transition-all border border-white/10 group-hover:border-blue-500">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7-7" /></svg>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        /* B, C, D - PROGRAM DETAIL & WORKSPACE */
        <section className="pt-28 pb-16 px-6 animate-in slide-in-from-right duration-500">
           <div className="max-w-7xl mx-auto">
              <button onClick={() => setSelectedProgramId(null)} className="mb-12 flex items-center gap-4 text-gray-500 hover:text-white transition-colors group">
                 <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                 <span className="text-[10px] font-black uppercase tracking-widest">Back to Directory</span>
              </button>

              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                 <div className="space-y-6 flex-grow">
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{selectedProgram?.level} • {selectedProgram?.department}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">{selectedProgram?.name}</h1>
                 </div>

                 <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-3xl border border-white/10">
                    {['details', 'curriculum', 'outcomes'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
                      >
                        {tab}
                      </button>
                    ))}
                 </div>
              </div>

              {/* TAB CONTENT: DETAILS */}
              {activeTab === 'details' && (
                 <div className="grid lg:grid-cols-2 gap-20 animate-in fade-in duration-500">
                    <div className="space-y-12">
                       <section className="space-y-6">
                          <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Program Objective</h3>
                          <p className="text-xl text-gray-300 font-medium leading-relaxed italic">"{selectedProgram?.overview}"</p>
                          <ul className="space-y-4 pt-6">
                             {selectedProgram?.objectives.map((obj, i) => (
                               <li key={i} className="flex gap-4 items-start group">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                  <p className="text-sm text-gray-400 font-medium uppercase tracking-wide leading-relaxed">{obj}</p>
                               </li>
                             ))}
                          </ul>
                       </section>

                       <div className="grid grid-cols-2 gap-6">
                          <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
                             <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Academic Intensity</p>
                             <p className="text-2xl font-black text-white">{selectedProgram?.totalCredits} Credits</p>
                             <p className="text-[9px] text-gray-600 uppercase font-black mt-1">Total Graduation Requirement</p>
                          </div>
                          <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5">
                             <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Gate Criteria</p>
                             <p className="text-xs font-black text-white leading-relaxed line-clamp-2 uppercase">{selectedProgram?.eligibility}</p>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-12">
                       <section className="space-y-8">
                          <h3 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.4em]">NEP Multi-Exit Roadmap</h3>
                          <div className="relative pl-6 border-l border-white/10 space-y-10">
                             {selectedProgram?.exitOptions.map((opt, i) => (
                               <div key={i} className="relative group">
                                  <div className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-purple-600 border-4 border-[#050505] group-hover:scale-125 transition-transform" />
                                  <div className="space-y-1">
                                     <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Exit at Year 0{opt.year}</p>
                                     <h4 className="text-lg font-black uppercase text-white group-hover:text-purple-400 transition-colors">{opt.award}</h4>
                                     <p className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Direct Placement Eligible</p>
                                  </div>
                               </div>
                             ))}
                             <div className="relative group">
                                <div className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#050505]" />
                                <div className="space-y-1">
                                   <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Full Completion</p>
                                   <h4 className="text-lg font-black uppercase text-white">Full Degree Honours</h4>
                                </div>
                             </div>
                          </div>
                       </section>
                    </div>
                 </div>
              )}

              {/* TAB CONTENT: CURRICULUM VIEW */}
              {activeTab === 'curriculum' && (
                 <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="flex justify-between items-end">
                       <h3 className="text-2xl font-black uppercase tracking-tight">Semester-wise <span className="text-blue-500">Blueprint.</span></h3>
                       <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest border border-blue-500/20 px-6 py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all">Audit Credit Weights</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {[1, 2, 5].map((sem) => (
                          <div key={sem} className="p-10 rounded-[56px] bg-white/[0.01] border border-white/5 hover:border-white/10 transition-all flex flex-col min-h-[400px]">
                             <div className="flex justify-between items-start mb-10">
                                <h4 className="text-4xl font-black text-white leading-none">0{sem}</h4>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Semester</span>
                             </div>
                             <div className="space-y-4 flex-grow">
                                {selectedProgram?.curriculum[sem]?.map((course) => (
                                  <div key={course.code} className="p-5 rounded-[32px] bg-black border border-white/5 group hover:border-blue-500/30 transition-all">
                                     <div className="flex justify-between items-start mb-2">
                                        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{course.code}</p>
                                        <span className={`px-2 py-0.5 rounded text-[7px] font-black uppercase ${
                                          course.type === 'Core' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                                        }`}>{course.type}</span>
                                     </div>
                                     <h5 className="text-xs font-black uppercase text-white group-hover:text-blue-400 transition-colors leading-tight mb-3">{course.name}</h5>
                                     <div className="flex justify-between items-end">
                                        <span className="text-[9px] font-black text-gray-700 uppercase">Credits</span>
                                        <span className="text-xs font-black text-white">{course.credits}</span>
                                     </div>
                                  </div>
                                ))}
                                {(!selectedProgram?.curriculum[sem] || selectedProgram.curriculum[sem].length === 0) && (
                                   <div className="flex-grow flex items-center justify-center p-10 border border-dashed border-white/5 rounded-[40px]">
                                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Syllabus Pending Definition</p>
                                   </div>
                                )}
                             </div>
                             <button className="mt-8 w-full py-4 border border-dashed border-white/10 rounded-2xl text-[9px] font-black uppercase text-gray-600 hover:text-white hover:border-white/30 transition-all">
                                Add Module
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              {/* TAB CONTENT: OUTCOME MAPPING */}
              {activeTab === 'outcomes' && (
                 <div className="space-y-20 animate-in fade-in duration-500">
                    <div className="grid md:grid-cols-2 gap-20">
                       <section className="space-y-10">
                          <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Career Synergy</h3>
                          <div className="grid grid-cols-1 gap-4">
                             {selectedProgram?.careerOutcomes.map(career => (
                               <div key={career} className="p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/40 transition-all group flex items-center justify-between">
                                  <span className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors">{career}</span>
                                  <div className="text-right">
                                     <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Market Readiness</p>
                                     <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600" style={{ width: '85%' }} />
                                     </div>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </section>

                       <section className="space-y-10">
                          <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-l-4 border-emerald-600 pl-6">Skill Harvest</h3>
                          <div className="flex flex-wrap gap-3">
                             {selectedProgram?.skillOutcomes.map(skill => (
                               <div key={skill} className="px-6 py-3 rounded-2xl bg-emerald-600/5 border border-emerald-500/20 text-[10px] font-black uppercase text-emerald-400 tracking-widest hover:bg-emerald-600 hover:text-white transition-all cursor-default">
                                  {skill}
                               </div>
                             ))}
                          </div>
                       </section>
                    </div>

                    <div className="p-16 rounded-[64px] bg-[#080808] border border-white/10 relative overflow-hidden">
                       <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
                       <div className="relative z-10 grid lg:grid-cols-3 gap-16 items-center">
                          <div className="lg:col-span-1">
                             <h4 className="text-2xl font-black uppercase text-white mb-4">Entrance & HE <span className="text-blue-500">Mapping.</span></h4>
                             <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed">Direct correlation between curriculum modules and national level assessments.</p>
                          </div>
                          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                             {[
                               { t: 'GATE Engineering', d: '92% Syllabus Correlation', i: '⚙️' },
                               { t: 'Higher Edu Pathways', d: 'Tier-1 International Eligibility', i: '🌍' }
                             ].map((item, i) => (
                               <div key={i} className="p-8 rounded-[40px] bg-black border border-white/5 group hover:border-blue-500/30 transition-all">
                                  <div className="text-3xl mb-6">{item.i}</div>
                                  <h5 className="text-sm font-black uppercase text-white mb-2">{item.t}</h5>
                                  <p className="text-[10px] text-gray-500 font-bold uppercase">{item.d}</p>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              )}

              <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Verification Status: <span className="text-emerald-500">Audit Ready</span></p>
                 <div className="flex gap-4">
                    <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">Download Structure PDF</button>
                    <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-600/40">Sync with National ABC</button>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Structure <br/><span className="gradient-text">Certainty.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Programs are the foundation of student destiny. Career Soulmate 
              ensures every course is an intentional investment in professional outcomes.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('mapping')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               View Skill Gaps
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Institutional Dashboard
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

export default CollegeProgramsPage;
