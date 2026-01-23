
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface MappingNode {
  id: string;
  label: string;
  type: 'program' | 'subject' | 'skill' | 'role' | 'outcome';
  status?: 'strong' | 'moderate' | 'weak';
  children?: string[];
}

const PROGRAM_NODES: MappingNode[] = [
  { id: 'prog', label: 'B.Tech Computer Science (FYUP)', type: 'program' },
  { id: 'sub1', label: 'Advanced Algorithms', type: 'subject' },
  { id: 'sub2', label: 'Database Architectures', type: 'subject' },
  { id: 'sub3', label: 'Neural Network Theory', type: 'subject' },
  { id: 'sub4', label: 'Ethics in Computing', type: 'subject' },
  { id: 'skill1', label: 'Python Systems', type: 'skill', status: 'strong' },
  { id: 'skill2', label: 'SQL Optimization', type: 'skill', status: 'strong' },
  { id: 'skill3', label: 'ML Model Design', type: 'skill', status: 'moderate' },
  { id: 'skill4', label: 'Strategic Auditing', type: 'skill', status: 'weak' },
  { id: 'role1', label: 'ML Engineer', type: 'role' },
  { id: 'role2', label: 'Data Architect', type: 'role' },
  { id: 'role3', label: 'Compliance Officer', type: 'role' },
  { id: 'out1', label: 'FAANG Recruitment', type: 'outcome' },
  { id: 'out2', label: 'Research Fellowship', type: 'outcome' },
  { id: 'out3', label: 'Startup Leadership', type: 'outcome' },
];

const CollegeMappingPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedProgram, setSelectedProgram] = useState('B.Tech Computer Science');
  const [selectedDept, setSelectedDept] = useState('School of Engineering');
  const [selectedYear, setSelectedYear] = useState('2025-26');
  const [nepStructure, setNepStructure] = useState('4-Year (Honours + Research)');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const matrixData = [
    { subject: 'Advanced Algorithms', skills: { 'Python Systems': 95, 'Logic': 90, 'MLOps': 40 }, credit: 4 },
    { subject: 'Database Systems', skills: { 'SQL Optimization': 92, 'System Design': 75, 'Compliance': 30 }, credit: 4 },
    { subject: 'Deep Learning 101', skills: { 'ML Model Design': 88, 'PyTorch': 90, 'Math': 85 }, credit: 4 },
    { subject: 'Professional Ethics', skills: { 'Communication': 80, 'Policy Logic': 70, 'Compliance': 85 }, credit: 2 },
  ];

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
      <div className="relative w-full" ref={ref}>
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
      
      {/* A. PROGRAM SELECTION PANEL */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                INSTITUTIONAL OUTCOME ARCHITECT
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Program <span className="gradient-text">Mapping.</span>
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                 <CustomSelect 
                    id="program" 
                    label="Degree Program" 
                    options={['B.Tech Computer Science', 'B.A. Multidisciplinary', 'B.Com FinTech']} 
                    value={selectedProgram} 
                    onChange={setSelectedProgram} 
                 />
                 <CustomSelect 
                    id="dept" 
                    label="Department" 
                    options={['School of Engineering', 'Liberal Arts Division', 'Commerce & Management']} 
                    value={selectedDept} 
                    onChange={setSelectedDept} 
                 />
                 <CustomSelect 
                    id="year" 
                    label="Academic Year" 
                    options={['2025-26', '2024-25']} 
                    value={selectedYear} 
                    onChange={setSelectedYear} 
                 />
                 <CustomSelect 
                    id="nep" 
                    label="NEP Structure" 
                    options={['4-Year (Honours + Research)', '3-Year (Exit Path)']} 
                    value={nepStructure} 
                    onChange={setNepStructure} 
                 />
              </div>
            </div>
            <button className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 mb-1">
               Validate All Nodes
            </button>
          </div>
        </div>
      </section>

      {/* B. PROGRAM → CAREER MAP (VISUAL FLOW) */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-x-auto custom-scrollbar">
        <div className="mb-16">
           <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Flow Blueprint.</span></h2>
           <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Dynamic outcome visualizer</p>
        </div>

        <div className="relative min-w-[1200px] h-[600px] bg-[#080808] border border-white/5 rounded-[64px] p-12 overflow-hidden flex items-center shadow-2xl">
           <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" />
           
           <div className="relative w-full flex justify-between items-center gap-10">
              {/* Layer 1: Program */}
              <div className="flex flex-col items-center gap-8 w-1/5">
                 <div className="p-8 rounded-[32px] bg-blue-600/10 border-2 border-blue-500/40 text-center shadow-[0_0_30px_rgba(59,130,246,0.2)] group hover:scale-105 transition-all">
                    <span className="text-[8px] font-black text-blue-500 uppercase block mb-2">Program Root</span>
                    <h4 className="text-sm font-black uppercase text-white leading-tight">B.Tech CS<br/>Engineering</h4>
                 </div>
              </div>

              {/* Layer 2: Core Subjects */}
              <div className="flex flex-col gap-4 w-1/5">
                 {['Algorithms', 'Data Systems', 'ML Theory'].map(s => (
                   <div key={s} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-blue-500/50 transition-all cursor-pointer">
                      <h5 className="text-[10px] font-black uppercase text-gray-300">{s}</h5>
                   </div>
                 ))}
              </div>

              {/* Layer 3: Skills */}
              <div className="flex flex-col gap-4 w-1/5">
                 {PROGRAM_NODES.filter(n => n.type === 'skill').map(s => (
                   <div key={s.id} className={`p-5 rounded-2xl border flex flex-col items-center gap-2 group transition-all cursor-pointer ${
                     s.status === 'strong' ? 'bg-emerald-600/10 border-emerald-500/30' :
                     s.status === 'moderate' ? 'bg-blue-600/10 border-blue-500/30' :
                     'bg-red-600/10 border-red-500/30'
                   }`}>
                      <h5 className="text-[10px] font-black uppercase text-white">{s.label}</h5>
                      <div className="flex gap-1">
                         {[1,2,3].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= (s.status === 'strong' ? 3 : s.status === 'moderate' ? 2 : 1) ? (s.status === 'strong' ? 'bg-emerald-500' : s.status === 'moderate' ? 'bg-blue-500' : 'bg-red-500') : 'bg-white/10'}`} />)}
                      </div>
                   </div>
                 ))}
              </div>

              {/* Layer 4: Roles */}
              <div className="flex flex-col gap-4 w-1/5">
                 {['ML Engineer', 'Data Architect', 'SecOps Lead'].map(r => (
                   <div key={r} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center group hover:bg-blue-600/10 hover:border-blue-500 transition-all cursor-pointer">
                      <h5 className="text-[10px] font-black uppercase text-gray-400 group-hover:text-white">{r}</h5>
                   </div>
                 ))}
              </div>

              {/* Layer 5: Outcomes */}
              <div className="flex flex-col gap-4 w-1/5">
                 {['Top Recruitment', 'Govt Projects', 'R&D Innovation'].map(o => (
                   <div key={o} className="p-6 rounded-[32px] bg-blue-600/10 border border-blue-500/20 text-center shadow-2xl group hover:bg-blue-600 transition-all">
                      <h5 className="text-[10px] font-black uppercase text-white">{o}</h5>
                   </div>
                 ))}
              </div>

              {/* Connecting Lines Canvas Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                 <path d="M200,300 C300,300 300,100 400,100" stroke="#3b82f6" fill="none" strokeWidth="1" strokeDasharray="5,5" />
                 <path d="M200,300 C300,300 300,300 400,300" stroke="#3b82f6" fill="none" strokeWidth="1" strokeDasharray="5,5" />
                 <path d="M200,300 C300,300 300,500 400,500" stroke="#3b82f6" fill="none" strokeWidth="1" strokeDasharray="5,5" />
              </svg>
           </div>
        </div>
      </section>

      {/* C. SKILL ALIGNMENT MATRIX */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
           <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Accreditation <span className="text-blue-500">Matrix.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">NAAC & NIRF Documentation Ready</p>
           </div>
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Export Matrix to PDF</button>
        </div>

        <div className="overflow-x-auto rounded-[40px] border border-white/5 bg-[#0a0a0a]">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-white/[0.02] border-b border-white/10">
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Course / Module</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Tech Proficiency</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Soft Competency</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Alignment Score</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {matrixData.map((row, i) => (
                    <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                       <td className="p-8">
                          <div className="space-y-1">
                             <h4 className="text-sm font-black uppercase text-white">{row.subject}</h4>
                             <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{row.credit} Academic Credits</p>
                          </div>
                       </td>
                       <td className="p-8">
                          <div className="flex flex-col items-center gap-2">
                             <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600" style={{ width: `${Object.values(row.skills)[0]}%` }} />
                             </div>
                             <span className="text-[8px] font-black text-gray-500 uppercase">{Object.keys(row.skills)[0]}</span>
                          </div>
                       </td>
                       <td className="p-8">
                          <div className="flex flex-col items-center gap-2">
                             <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-600" style={{ width: `${Object.values(row.skills)[1]}%` }} />
                             </div>
                             <span className="text-[8px] font-black text-gray-500 uppercase">{Object.keys(row.skills)[1]}</span>
                          </div>
                       </td>
                       <td className="p-8 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500 transition-all">
                             <span className="text-xs font-black text-blue-500">{Math.round((Object.values(row.skills).reduce((a,b)=>a+b,0))/3)}%</span>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </section>

      {/* D. EXAM & OUTCOME MAPPING */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-start">
               <div className="space-y-12">
                  <h2 className="text-3xl font-black uppercase tracking-tight">Institutional <br/><span className="text-blue-500">Outcomes.</span></h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-emerald-500/30 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-500 mb-6 text-2xl">🏛️</div>
                        <h4 className="text-sm font-black uppercase text-white mb-2">Govt Eligibility</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">IES, GATE, and State Technical Services pre-mapped for curriculum sync.</p>
                     </div>
                     <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-purple-500/30 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 mb-6 text-2xl">💎</div>
                        <h4 className="text-sm font-black uppercase text-white mb-2">Cert Alignment</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">AWS Academy, Oracle, and RedHat badges integrated into Year 2 & 3.</p>
                     </div>
                  </div>
               </div>

               <div className="relative">
                  <div className="absolute inset-0 bg-blue-600/5 blur-[120px]" />
                  <div className="relative p-12 rounded-[64px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 backdrop-blur-3xl shadow-2xl">
                     <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-10">Market Placement Readiness</h4>
                     <div className="space-y-8">
                        {[
                           { sector: 'Emerging AI', match: 94, trend: 'Increasing' },
                           { sector: 'Data Architecture', match: 82, trend: 'Steady' },
                           { sector: 'Cyber Governance', match: 45, trend: 'Weak' },
                        ].map((s, i) => (
                           <div key={i} className="space-y-3">
                              <div className="flex justify-between items-end">
                                 <span className="text-sm font-black uppercase tracking-widest text-white">{s.sector}</span>
                                 <span className="text-[10px] font-black text-gray-500 uppercase">Sync: {s.match}%</span>
                              </div>
                              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                 <div className={`h-full transition-all duration-1500 ${s.match > 80 ? 'bg-emerald-500' : s.match > 60 ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: `${s.match}%` }} />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* E. GAP ANALYSIS (ADVANCED) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="p-16 rounded-[64px] bg-red-600/5 border border-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-16 opacity-[0.05]">
               <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </div>
            
            <div className="relative z-10 max-w-3xl">
               <h3 className="text-3xl font-black uppercase tracking-tight text-red-500 mb-6">Strategic Gap Analysis</h3>
               <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
                  Our neural market scraper detects a <span className="text-white">critical missing component</span> in the current 
                  Year 3 Syllabus for B.Tech CS: <span className="text-red-400 font-black">PROMPT ENGINEERING & LLM OPS</span>.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1 p-6 rounded-3xl bg-black border border-white/5">
                     <p className="text-[8px] font-black text-gray-600 uppercase mb-2 tracking-widest">Industry Risk</p>
                     <p className="text-xs font-black uppercase text-gray-300">45% decrease in student eligibility for Senior AI roles by 2026 if not added.</p>
                  </div>
                  <div className="flex-1 p-6 rounded-3xl bg-black border border-white/5">
                     <p className="text-[8px] font-black text-emerald-500 uppercase mb-2 tracking-widest">AI Fix Suggestion</p>
                     <p className="text-xs font-black uppercase text-emerald-400">Replace "Module 4: Legacy OS" with "Applied LLM Architectures".</p>
                  </div>
               </div>

               <button className="mt-12 px-10 py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-red-600/20">
                  Update Curriculum Blueprint
               </button>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Education <br/><span className="gradient-text">Accountability.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Ensure every lecture and every lab is a direct deposit into your students' professional destiny. 
              Career Soulmate turns institutional data into outcome certainty.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Opening Simulation Mode...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Simulate NEP Re-mapping
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Download Compliance Audit
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

export default CollegeMappingPage;
