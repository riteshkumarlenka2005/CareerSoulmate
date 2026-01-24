
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface AddOn {
  id: string;
  name: string;
  focus: string;
  duration: string;
  nsqf: number;
  industry: string;
  mode: 'In-House' | 'Online' | 'Industry Partner';
  partner?: string;
  credits: number;
  outcomes: string[];
  impact: number; // Percentage placement boost
}

const ADD_ONS_DB: AddOn[] = [
  {
    id: 'ao1',
    name: 'Advanced Prompt Engineering',
    focus: 'Generative AI',
    duration: '40 Hours',
    nsqf: 6,
    industry: 'Tech / Creative',
    mode: 'Online',
    partner: 'OpenAI Academy',
    credits: 2,
    outcomes: ['LLM Orchestration', 'Token Optimization'],
    impact: 35
  },
  {
    id: 'ao2',
    name: 'FinTech Compliance Standards',
    focus: 'Finance Regulation',
    duration: '60 Hours',
    nsqf: 7,
    industry: 'Banking',
    mode: 'Industry Partner',
    partner: 'Standard Chartered',
    credits: 4,
    outcomes: ['Regulatory Auditing', 'Risk Management'],
    impact: 42
  },
  {
    id: 'ao3',
    name: 'EV Systems Diagnostics',
    focus: 'Automotive Tech',
    duration: '80 Hours',
    nsqf: 5,
    industry: 'Manufacturing',
    mode: 'In-House',
    credits: 4,
    outcomes: ['Battery Management', 'Drivetrain Troubleshooting'],
    impact: 28
  },
  {
    id: 'ao4',
    name: 'Strategic Soft Skills',
    focus: 'Communication',
    duration: '20 Hours',
    nsqf: 4,
    industry: 'Cross-Domain',
    mode: 'In-House',
    credits: 1,
    outcomes: ['Negotiation', 'Stakeholder Management'],
    impact: 15
  }
];

const CollegeAddOnsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedProgram, setSelectedProgram] = useState('B.Tech Computer Science');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mapping, setMapping] = useState<Record<string, string[]>>({
    'B.Tech Computer Science': ['ao1', 'ao4'],
    'B.Com Honors': ['ao2', 'ao4']
  });

  const currentMapping = mapping[selectedProgram] || [];

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
      <div className="relative w-full max-w-md" ref={ref}>
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

  const toggleMapping = (addonId: string) => {
    setMapping(prev => {
      const current = prev[selectedProgram] || [];
      const updated = current.includes(addonId) 
        ? current.filter(id => id !== addonId)
        : [...current, addonId];
      return { ...prev, [selectedProgram]: updated };
    });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. ADD-ON OVERVIEW SECTION */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                EMPLOYABILITY ACCELERATOR
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Academic <span className="gradient-text">Add-Ons.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Enhance your curriculum without overhauling core degrees. Modular, 
                credit-backed skill units aligned with the latest industry requirements and NEP flexibility.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
               <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-2xl font-black text-white mb-1">12</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-blue-500">Live Modules</p>
               </div>
               <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-2xl font-black text-emerald-500 mb-1">+45%</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Placement Delta</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. ADD-ON CATALOG & C. PROGRAM MAPPING INTERFACE */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div className="space-y-2">
              <h2 className="text-3xl font-black uppercase tracking-tight">Catalog <span className="text-blue-500">& Control.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Manage value-added mappings</p>
           </div>
           <CustomSelect 
              id="prog" 
              label="Mapping Context" 
              options={['B.Tech Computer Science', 'B.Com Honors', 'B.Sc Data Science']} 
              value={selectedProgram} 
              onChange={setSelectedProgram} 
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ADD_ONS_DB.map(addon => {
            const isMapped = currentMapping.includes(addon.id);
            return (
              <div key={addon.id} className={`group relative p-10 rounded-[56px] border transition-all duration-500 flex flex-col gap-8 shadow-xl ${isMapped ? 'bg-blue-600/5 border-blue-500/30 ring-1 ring-blue-500/20' : 'bg-white/[0.01] border-white/5'}`}>
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest px-3 py-1 bg-blue-600/10 rounded-full">{addon.focus}</span>
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">NSQF Level {addon.nsqf}</span>
                      </div>
                      <h3 className="text-2xl font-black uppercase text-white tracking-tighter group-hover:text-blue-400 transition-colors mt-4">{addon.name}</h3>
                   </div>
                   <button 
                     onClick={() => toggleMapping(addon.id)}
                     className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${isMapped ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'}`}
                   >
                     {isMapped ? 'Mapped' : 'Link Program'}
                   </button>
                </div>

                <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/5">
                   <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Duration</p>
                      <p className="text-[10px] font-black text-white uppercase">{addon.duration}</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Credits</p>
                      <p className="text-[10px] font-black text-blue-400 uppercase">{addon.credits} Units</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Impact</p>
                      <p className="text-[10px] font-black text-emerald-500 uppercase">+{addon.impact}% Hireability</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Core Outcomes</p>
                   <div className="flex flex-wrap gap-2">
                      {addon.outcomes.map(o => <span key={o} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-bold text-gray-400 uppercase">{o}</span>)}
                   </div>
                </div>

                {/* D. DELIVERY MODE & PARTNERSHIPS */}
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs">
                         {addon.mode === 'Online' ? '🌐' : addon.mode === 'Industry Partner' ? '🤝' : '🏛️'}
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[8px] font-black text-gray-600 uppercase">Delivery Mode</p>
                         <p className="text-[9px] font-black text-white uppercase">{addon.mode}</p>
                      </div>
                   </div>
                   {addon.partner && (
                     <div className="text-right">
                        <p className="text-[8px] font-black text-gray-600 uppercase">Partner</p>
                        <p className="text-[9px] font-black text-blue-400 uppercase">{addon.partner}</p>
                     </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* E. OUTCOME IMPACT VIEW (ADVANCED ANALYTICS) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Outcome <br/><span className="text-blue-500">Certainty.</span></h2>
               <p className="text-gray-400 text-xl font-medium leading-relaxed">
                  Every add-on is mathematically weighted against current vacancies. 
                  We analyze student performance to predict placement outcomes before 
                  recruitment season even starts.
               </p>
               
               <div className="space-y-6">
                  {[
                    { t: "Predictive Analytics", d: "Forecast placement rates based on module completion data.", i: "📈" },
                    { t: "Skill Gap Closure", d: "Identify exactly which institutional weaknesses are being addressed.", i: "🎯" },
                    { t: "Recruiter Feedback Loop", d: "Direct portal integration for partners to grade add-on relevance.", i: "🔄" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 items-start group">
                       <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-blue-600 transition-all shrink-0">
                          {item.i}
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-sm font-black uppercase text-white tracking-widest">{item.t}</h4>
                          <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
               <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
                  <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12">Program ROI Projection</h3>
                  <div className="space-y-10">
                     {[
                        { label: 'Technical Eligibility', val: 94, trend: 'up' },
                        { label: 'Soft Competency', val: 78, trend: 'up' },
                        { label: 'Industry Awareness', val: 82, trend: 'up' }
                     ].map((s, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-sm font-black uppercase text-white tracking-widest">{s.label}</span>
                              <span className="text-xl font-black text-blue-500">{s.val}%</span>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6]" style={{ width: `${s.val}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/5 text-center">
                     <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Aggregate Data for: {selectedProgram}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Future-Proof <br/><span className="gradient-text">Your Campus.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't wait for syllabus updates. Enhance your students' professional destiny 
              instantly with AI-selected Add-Ons.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Opening Module Configurator...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Configure New Module
             </button>
             <button onClick={() => onNavigate('mapping')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               View Program Mappings
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

export default CollegeAddOnsPage;
