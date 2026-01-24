
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface SkillGap {
  id: string;
  name: string;
  category: 'Technical' | 'Soft' | 'Digital';
  requiredLevel: number;
  averageLevel: number;
  affectedStudents: number; // percentage
  severity: 'Critical' | 'Moderate' | 'Low';
  rootCause: string;
  recommendations: string[];
}

const GAPS_DATABASE: SkillGap[] = [
  {
    id: 'sg1',
    name: 'LLM Orchestration',
    category: 'Technical',
    requiredLevel: 90,
    averageLevel: 42,
    affectedStudents: 85,
    severity: 'Critical',
    rootCause: 'Curriculum relies on legacy NLP libraries (NLTK/SpaCy) without transformer exposure.',
    recommendations: ['Integrate LangChain module', 'Host Generative AI Hackathon', 'AWS Bedrock Workshop']
  },
  {
    id: 'sg2',
    name: 'Cloud Security Compliance',
    category: 'Digital',
    requiredLevel: 85,
    averageLevel: 55,
    affectedStudents: 60,
    severity: 'Moderate',
    rootCause: 'Infrastructure focus is on-prem; lack of cloud-native security auditing practice.',
    recommendations: ['Palo Alto Cloud Sec Cert', 'Simulated Breach Lab Session']
  },
  {
    id: 'sg3',
    name: 'Stakeholder Negotiation',
    category: 'Soft',
    requiredLevel: 80,
    averageLevel: 72,
    affectedStudents: 45,
    severity: 'Low',
    rootCause: 'Limited exposure to cross-functional industry projects and corporate simulation.',
    recommendations: ['Industry Mentor Meetup', 'Agile Product Simulation']
  }
];

const CollegeGapsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedProgram, setSelectedProgram] = useState('B.Tech Computer Science');
  const [selectedYear, setSelectedYear] = useState('Year 3 (Pre-Placement)');
  const [selectedCluster, setSelectedCluster] = useState('Emerging Tech (AI/ML)');
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
      
      {/* A. COHORT SELECTION PANEL - Removed overflow-hidden and added z-index */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/5 blur-[180px] rounded-full -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black tracking-widest uppercase">
                INSTITUTIONAL GAP ANALYSIS
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Skill <span className="gradient-text">Shortfall.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Real-time mapping of your current student cohort's proficiency against 
                live global labor market requirements. Identify what is missing before graduation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
               <CustomSelect 
                  id="prog" 
                  label="Academic Program" 
                  options={['B.Tech Computer Science', 'B.Com Honors', 'B.Sc Data Science']} 
                  value={selectedProgram} 
                  onChange={setSelectedProgram} 
               />
               <CustomSelect 
                  id="year" 
                  label="Cohort Year" 
                  options={['Year 1 (Foundation)', 'Year 2 (Applied)', 'Year 3 (Pre-Placement)', 'Year 4 (Research)']} 
                  value={selectedYear} 
                  onChange={setSelectedYear} 
               />
               <CustomSelect 
                  id="cluster" 
                  label="Target Career Cluster" 
                  options={['Emerging Tech (AI/ML)', 'Core Engineering', 'Creative/Design']} 
                  value={selectedCluster} 
                  onChange={setSelectedCluster} 
               />
            </div>
          </div>
        </div>
      </section>

      {/* B. SKILL GAP DASHBOARD (MAIN VISUALS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">Competency <span className="text-red-500">Heatmap.</span></h2>
              <div className="space-y-10">
                 {GAPS_DATABASE.map((gap, i) => (
                   <div key={gap.id} className="space-y-4">
                      <div className="flex justify-between items-end">
                         <div>
                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest block mb-1">{gap.category} Skill</span>
                            <h4 className="text-sm font-black uppercase text-white tracking-widest">{gap.name}</h4>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black text-gray-500 uppercase">Avg Proficiency: {gap.averageLevel}%</span>
                         </div>
                      </div>
                      <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         {/* Required Level Bar */}
                         <div className="absolute inset-0 bg-blue-600/10 opacity-40 border-r border-white/20" style={{ width: `${gap.requiredLevel}%` }} />
                         {/* Current Avg Bar */}
                         <div 
                           className={`h-full transition-all duration-1500 ${gap.severity === 'Critical' ? 'bg-red-600 shadow-[0_0_10px_#ef4444]' : gap.severity === 'Moderate' ? 'bg-orange-500' : 'bg-emerald-500'}`} 
                           style={{ width: `${gap.averageLevel}%` }} 
                         />
                      </div>
                      <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-gray-600">
                         <span>Student Population affected: <span className="text-white">{gap.affectedStudents}%</span></span>
                         <span className={gap.severity === 'Critical' ? 'text-red-400' : 'text-gray-400'}>{gap.severity} Severity</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Radar Chart Mockup / Abstract Visual */}
           <div className="relative">
              <div className="absolute inset-0 bg-red-600/5 blur-[120px] rounded-full" />
              <div className="relative aspect-square p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl flex items-center justify-center">
                 <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Radar Circles */}
                    {[1, 2, 3, 4].map(i => <circle key={i} cx="200" cy="200" r={i * 45} fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="5,5" className="opacity-10" />)}
                    {/* Axes */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => <line key={a} x1="200" y1="200" x2={200 + 180 * Math.cos(a * Math.PI / 180)} y2={200 + 180 * Math.sin(a * Math.PI / 180)} stroke="white" strokeWidth="0.5" className="opacity-10" />)}
                    
                    {/* Required Data Shape */}
                    <path d="M200,40 L340,140 L340,260 L200,360 L60,260 L60,140 Z" fill="rgba(37,99,235,0.05)" stroke="rgba(37,99,235,0.4)" strokeWidth="2" />
                    
                    {/* Student Data Shape (Warped based on gaps) */}
                    <path d="M200,100 L280,180 L300,280 L180,320 L100,240 L120,120 Z" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.8)" strokeWidth="3" className="animate-pulse" />
                    
                    <text x="200" y="30" textAnchor="middle" className="fill-gray-500 text-[10px] font-black uppercase">Technical</text>
                    <text x="370" y="200" textAnchor="middle" className="fill-gray-500 text-[10px] font-black uppercase" transform="rotate(90, 370, 200)">Strategy</text>
                    <text x="200" y="380" textAnchor="middle" className="fill-gray-500 text-[10px] font-black uppercase">Soft Skills</text>
                    <text x="30" y="200" textAnchor="middle" className="fill-gray-500 text-[10px] font-black uppercase" transform="rotate(-90, 30, 200)">Digital</text>
                 </svg>
                 <div className="absolute bottom-10 left-10 p-6 rounded-2xl bg-black border border-white/10 text-center">
                    <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Aggregated Gap Score</p>
                    <p className="text-2xl font-black text-red-500">42.4</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* C. GAP BREAKDOWN TABLE */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex justify-between items-end mb-16">
           <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">Granular <span className="text-red-500">Breakdown.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Data-driven priority queue</p>
           </div>
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Export JSON Data</button>
        </div>

        <div className="overflow-x-auto rounded-[40px] border border-white/5 bg-[#0a0a0a]">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-white/[0.02] border-b border-white/10">
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Skill Module</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Required Level</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Average Level</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Cohort Exposure</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Severity</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {GAPS_DATABASE.map((row) => (
                    <tr key={row.id} className="group hover:bg-white/[0.01] transition-colors">
                       <td className="p-8">
                          <div className="space-y-1">
                             <h4 className="text-sm font-black uppercase text-white">{row.name}</h4>
                             <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{row.category} Core</p>
                          </div>
                       </td>
                       <td className="p-8 text-center"><span className="text-sm font-black text-blue-500">{row.requiredLevel}%</span></td>
                       <td className="p-8 text-center"><span className="text-sm font-black text-white">{row.averageLevel}%</span></td>
                       <td className="p-8 text-center"><span className="text-sm font-black text-gray-500">{row.affectedStudents}%</span></td>
                       <td className="p-8 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            row.severity === 'Critical' ? 'bg-red-500/20 text-red-500' : 
                            row.severity === 'Moderate' ? 'bg-orange-500/20 text-orange-500' : 'bg-emerald-500/20 text-emerald-500'
                          }`}>
                            {row.severity}
                          </span>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </section>

      {/* D. ROOT CAUSE INSIGHTS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-12">
                 <h2 className="text-3xl font-black uppercase tracking-tight">Root Cause <br/><span className="text-red-500">Analysis.</span></h2>
                 <div className="grid grid-cols-1 gap-6">
                    {[
                       { t: "Curriculum Staleness", d: "45% of gaps are caused by syllabus items that haven't been updated since 2021.", i: "📚", color: "red" },
                       { t: "Practice Exposure", d: "72% of students report lack of high-spec compute resources for model training.", i: "💻", color: "orange" },
                       { t: "Tooling Lag", d: "Industry is using Docker/K8s; Curriculum focus remains on VM management.", i: "⚙️", color: "blue" }
                    ].map((item, i) => (
                       <div key={i} className={`p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-${item.color}-500/30 transition-all flex gap-8 items-start`}>
                          <div className="text-3xl shrink-0">{item.i}</div>
                          <div className="space-y-2">
                             <h4 className="text-sm font-black uppercase text-white">{item.t}</h4>
                             <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-red-600/5 blur-[120px]" />
                 <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl">
                    <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-10">AI Diagnostic Log</h4>
                    <p className="text-sm text-gray-400 font-medium leading-relaxed italic mb-8">
                       "The most significant outlier is the <span className="text-white">LLM Orchestration</span> gap. 
                       While students understand basic Python, their inability to work with vector 
                       databases will prevent 85% of them from clearing technical rounds in 2025."
                    </p>
                    <div className="pt-8 border-t border-white/5">
                       <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-4">Urgent Curriculum Updates Needed</p>
                       <div className="flex flex-wrap gap-2">
                          {['Vector Search', 'RAG Architectures', 'Prompt Ops'].map(v => (
                            <span key={v} className="px-4 py-2 bg-red-600/5 border border-red-500/20 rounded-xl text-[10px] font-black uppercase text-red-400 tracking-widest">{v}</span>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* E. ACTION RECOMMENDATIONS */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
         <div className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight">Strategic <span className="text-blue-500">Fixes.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Automated remedy deployment</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {[
               { t: "Bridging Modules", d: "Inject 20-hour intensive 'Add-Ons' into the current semester.", i: "⚡", action: "Configure Modules" },
               { t: "Industry Hackathons", d: "Partner with FAANG for real-world challenge sets.", i: "🏆", action: "Invite Partners" },
               { t: "Advanced Internships", d: "Direct portal mapping for high-performing students.", i: "🤝", action: "View Candidates" }
            ].map((item, i) => (
               <div key={i} className="p-10 rounded-[56px] bg-white/[0.02] border border-white/5 flex flex-col h-full hover:border-blue-500/40 transition-all group">
                  <div className="text-4xl mb-8">{item.i}</div>
                  <h4 className="text-xl font-black uppercase text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">{item.t}</h4>
                  <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed mb-10">{item.d}</p>
                  <button className="mt-auto w-full py-4 bg-white/5 group-hover:bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all border border-white/10 group-hover:border-blue-500">
                     {item.action}
                  </button>
               </div>
            ))}
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Actionable <br/><span className="gradient-text">Certainty.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't guess your graduates' future. Know it. Career Soulmate 
              converts institutional data into placement results.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('add-ons')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Build Bridging Modules
             </button>
             <button onClick={() => onNavigate('mapping')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Re-align Curriculum Map
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        .border-red-500\/30 { border-color: rgba(239, 68, 68, 0.3); }
        .border-orange-500\/30 { border-color: rgba(249, 115, 22, 0.3); }
        .hover\:border-red-500\/30:hover { border-color: rgba(239, 68, 68, 0.3); }
        .hover\:border-orange-500\/30:hover { border-color: rgba(249, 115, 22, 0.3); }
        .hover\:border-blue-500\/30:hover { border-color: rgba(59, 130, 246, 0.3); }
      `}</style>
    </div>
  );
};

export default CollegeGapsPage;
