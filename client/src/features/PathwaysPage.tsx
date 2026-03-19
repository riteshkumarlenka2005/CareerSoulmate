
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface SkillStep {
  title: string;
  nsqf: number;
  duration: string;
  outcomes: string[];
  courseTypes: string[];
  certs: string[];
}

interface Pathway {
  id: string;
  title: string;
  industry: string;
  domain: string;
  demand: 'High' | 'Medium' | 'Emerging';
  description: string;
  salaryRange: string;
  growth: string;
  steps: SkillStep[];
}

const PATHWAYS_DB: Pathway[] = [
  {
    id: 'cloud_arch',
    title: 'Cloud Solutions Architect',
    industry: 'Technology',
    domain: 'Infrastructure',
    demand: 'High',
    description: 'Design and deploy scalable, secure cloud environments for global enterprises.',
    salaryRange: '$120k - $250k',
    growth: '28% YoY',
    steps: [
      { title: 'Foundation', nsqf: 4, duration: '3 Months', outcomes: ['Cloud Fundamentals', 'Basic Networking'], courseTypes: ['MOOCs', 'Guided Projects'], certs: ['AWS Practitioner'] },
      { title: 'Core Technical', nsqf: 6, duration: '6 Months', outcomes: ['Compute Services', 'Storage Optimization'], courseTypes: ['Professional Certs', 'Labs'], certs: ['Azure Associate'] },
      { title: 'Advanced Specialization', nsqf: 8, duration: '12 Months', outcomes: ['Security Architecture', 'Serverless Design'], courseTypes: ['Post-Grad Diploma', 'Hackathons'], certs: ['Google Professional Cloud Architect'] },
      { title: 'Job / Apprenticeship', nsqf: 10, duration: 'Ongoing', outcomes: ['Full Ecosystem Management', 'Stakeholder Advisory'], courseTypes: ['Industry Mentor', 'Live Projects'], certs: ['Senior Architect Badge'] }
    ]
  },
  {
    id: 'ev_tech',
    title: 'EV Propulsion Systems Expert',
    industry: 'Automotive',
    domain: 'Electric Mobility',
    demand: 'Emerging',
    description: 'Bridge the gap between traditional mechanical engineering and advanced electrical propulsion.',
    salaryRange: '$80k - $160k',
    growth: '45% YoY',
    steps: [
      { title: 'Foundation', nsqf: 3, duration: '4 Months', outcomes: ['Electrical Safety', 'Battery Basics'], courseTypes: ['ITI Workshops', 'Online Modules'], certs: ['EV Safety Cert'] },
      { title: 'Core Technical', nsqf: 5, duration: '8 Months', outcomes: ['Motor Control', 'Thermal Mgmt'], courseTypes: ['Polytechnic Diploma', 'Apprenticeship'], certs: ['BMS Specialist'] },
      { title: 'Advanced Specialization', nsqf: 7, duration: '12 Months', outcomes: ['Regen Braking Design', 'CAN Bus Protocol'], courseTypes: ['Degree Specialty', 'R&D Internship'], certs: ['Propulsion Systems Master'] },
      { title: 'Job / Apprenticeship', nsqf: 9, duration: 'Ongoing', outcomes: ['Whole Vehicle Integration', 'Diagnostics'], courseTypes: ['Corporate Training'], certs: ['Certified EV Engineer'] }
    ]
  },
  {
    id: 'ux_psych',
    title: 'Cognitive Experience Designer',
    industry: 'Creative',
    domain: 'User Experience',
    demand: 'Medium',
    description: 'Combining behavioral psychology with interface design for human-centric digital products.',
    salaryRange: '$95k - $180k',
    growth: '15% YoY',
    steps: [
      { title: 'Foundation', nsqf: 4, duration: '2 Months', outcomes: ['Design Principles', 'Psychology 101'], courseTypes: ['Short-term Certs'], certs: ['Design Thinking Badge'] },
      { title: 'Core Technical', nsqf: 6, duration: '6 Months', outcomes: ['Interaction Design', 'Usability Testing'], courseTypes: ['Bootcamps', 'Studio Work'], certs: ['HCI Associate'] },
      { title: 'Advanced Specialization', nsqf: 8, duration: '10 Months', outcomes: ['Cognitive Load Analysis', 'Ethical Nudging'], courseTypes: ['Masters Research', 'Agency Projects'], certs: ['Senior UX Practitioner'] },
      { title: 'Job / Apprenticeship', nsqf: 10, duration: 'Ongoing', outcomes: ['Strategic Product Vision', 'Behavioral Audits'], courseTypes: ['Product Leadership'], certs: ['Certified Exp. Lead'] }
    ]
  }
];

const INDUSTRIES = ['All Industries', 'Technology', 'Automotive', 'Creative', 'Healthcare', 'Energy'];
const DOMAINS = ['All Domains', 'Infrastructure', 'Electric Mobility', 'User Experience', 'Data Science', 'Security'];

const PathwaysPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [activePathwayId, setActivePathwayId] = useState(PATHWAYS_DB[0].id);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const activePathway = useMemo(() => 
    PATHWAYS_DB.find(p => p.id === activePathwayId) || PATHWAYS_DB[0]
  , [activePathwayId]);

  const filteredPathways = useMemo(() => {
    return PATHWAYS_DB.filter(p => 
      (selectedIndustry === 'All Industries' || p.industry === selectedIndustry) &&
      (selectedDomain === 'All Domains' || p.domain === selectedDomain)
    );
  }, [selectedIndustry, selectedDomain]);

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
      <div className="relative min-w-[200px]" ref={ref}>
        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">{label}</p>
        <button
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className={`w-full flex items-center justify-between bg-white/5 border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/10'} rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md hover:bg-white/[0.08]`}
        >
          <span className={value.includes('All') ? 'text-gray-500' : 'text-blue-400'}>{value}</span>
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
      
      {/* A. SKILL PATHWAY HERO SECTION */}
      <section className="relative pt-28 pb-16 px-6 overflow-visible border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
              VOCATIONAL INTELLIGENCE ENGINE
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Skill <br/><span className="gradient-text">Catalyst.</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Degrees are static. Skills are stackable. Mapping your personalized path from 
              foundational awareness to industry mastery.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 bg-white/[0.03] border border-white/10 rounded-[32px] p-8 backdrop-blur-3xl shadow-2xl">
            <CustomSelect id="industry" label="Target Industry" options={INDUSTRIES} value={selectedIndustry} onChange={setSelectedIndustry} />
            <CustomSelect id="domain" label="Skill Domain" options={DOMAINS} value={selectedDomain} onChange={setSelectedDomain} />
            
            <div className="flex-grow flex flex-col justify-end">
               <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                 Optimize My Path
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* B. PERSONALIZED SKILL PATH BUILDER (MAIN) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Pathway Selector Sidebar */}
          <div className="lg:col-span-1 space-y-4">
             <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-6">Select Career Goal</h3>
             {filteredPathways.map(p => (
               <button 
                 key={p.id}
                 onClick={() => setActivePathwayId(p.id)}
                 className={`w-full p-6 rounded-2xl text-left border transition-all duration-300 group ${activePathwayId === p.id ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
               >
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">{p.industry}</span>
                    <div className={`w-2 h-2 rounded-full ${activePathwayId === p.id ? 'bg-blue-500 animate-pulse' : 'bg-white/10'}`} />
                 </div>
                 <h4 className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors">{p.title}</h4>
               </button>
             ))}
          </div>

          {/* Visual Journey Canvas */}
          <div className="lg:col-span-3">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Journey.</span></h2>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">{activePathway.title} Pipeline</p>
                </div>
                
                {/* E. INDUSTRY DEMAND INDICATOR */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-6">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Market Demand</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${activePathway.demand === 'High' ? 'bg-emerald-500' : activePathway.demand === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'} animate-pulse`} />
                        <span className="text-xs font-black text-white uppercase tracking-widest">{activePathway.demand}</span>
                      </div>
                   </div>
                   <div className="w-px h-8 bg-white/10" />
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Est. ROI</p>
                      <span className="text-xs font-black text-blue-400 uppercase tracking-widest">Extreme</span>
                   </div>
                </div>
             </div>

             <div className="relative">
                {/* Ladder Connector Line */}
                <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 opacity-20" />

                <div className="space-y-12">
                   {activePathway.steps.map((step, idx) => (
                     <div key={idx} className={`relative flex flex-col md:flex-row items-start gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        {/* Dot / Level */}
                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-black border-2 border-blue-500/50 flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(59,130,246,0.2)] group hover:scale-110 transition-transform cursor-default">
                           <span className="text-[8px] font-black text-gray-500 uppercase leading-none">NSQF</span>
                           <span className="text-xl font-black text-white">{step.nsqf}</span>
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-[45%] p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group ${idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                           <div className={`flex items-center gap-4 mb-6 ${idx % 2 !== 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-full">Phase 0{idx+1}</span>
                              <h3 className="text-xl font-black uppercase text-white group-hover:text-blue-400 transition-colors tracking-tight">{step.title}</h3>
                           </div>
                           
                           <div className="space-y-6">
                              <div>
                                 <p className="text-[8px] font-black text-gray-600 uppercase mb-3 tracking-widest">Skill Outcomes</p>
                                 <div className={`flex flex-wrap gap-2 ${idx % 2 !== 0 ? 'justify-start' : 'md:justify-end justify-start'}`}>
                                    {step.outcomes.map(o => <span key={o} className="px-3 py-1.5 rounded-xl bg-white/5 text-[10px] font-bold text-gray-300 uppercase">{o}</span>)}
                                 </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <div>
                                    <p className="text-[8px] font-black text-gray-600 uppercase mb-1 tracking-widest">Duration</p>
                                    <p className="text-[11px] font-black text-white">{step.duration}</p>
                                 </div>
                                 <div>
                                    <p className="text-[8px] font-black text-gray-600 uppercase mb-1 tracking-widest">Format</p>
                                    <p className="text-[11px] font-black text-cyan-400">{step.courseTypes[0]}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        
                        {/* Floating Credential Indicator (Part of Section C) */}
                        <div className="hidden md:flex flex-col justify-center items-start md:w-[45%]">
                           <div className="p-6 rounded-[32px] bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-xl animate-in fade-in zoom-in duration-700">
                              <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-3">Unlocked Credentials</p>
                              <div className="space-y-3">
                                 {step.certs.map(c => (
                                    <div key={c} className="flex items-center gap-3 group/badge">
                                       <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs">🎓</div>
                                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover/badge:text-white transition-colors">{c}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* C. STACKABLE CREDENTIALS VIEW */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-10">
                <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">The Credit <br/><span className="text-blue-500">Accumulator.</span></h2>
                <p className="text-gray-400 text-lg font-medium leading-relaxed">
                   Career Soulmate transforms learning into an asset. Every workshop, micro-cert, 
                   and apprenticeship adds "Stackable Units" to your professional profile. 
                   Pause your journey for work, re-enter when ready—your progress is permanent.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                      { t: "Micro-Credentials", d: "10-20 hour deep dives in niche skills.", icon: "⚡" },
                      { t: "Industry Badges", d: "Verified mastery from tech partners.", icon: "💎" },
                      { t: "Pause & Resume", d: "Lifelong learning architecture.", icon: "🔄" },
                      { t: "Direct ABC Sync", d: "Linked to Academic Bank of Credits.", icon: "🏦" }
                   ].map((item, i) => (
                      <div key={i} className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                         <div className="text-2xl mb-3">{item.icon}</div>
                         <h4 className="text-xs font-black uppercase text-white mb-2">{item.t}</h4>
                         <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>

             <div className="relative">
                <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full" />
                <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/40 overflow-hidden backdrop-blur-md">
                   <div className="flex justify-between items-center mb-10">
                      <h3 className="text-xl font-black uppercase text-white">Profile Credential Stack</h3>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Verified_ID: 9821-CS</span>
                   </div>
                   <div className="space-y-4">
                      {[
                        { label: 'Cloud Security Fundamentals', provider: 'AWS', level: 'NSQF 4', width: '100%' },
                        { label: 'Behavioral Economics', provider: 'Yale', level: 'NSQF 5', width: '85%' },
                        { label: 'EV Thermal Systems', provider: 'IIT Madras', level: 'NSQF 6', width: '60%' }
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-[24px] bg-white/[0.03] border border-white/5 group hover:border-blue-500/40 transition-all">
                           <div className="flex justify-between items-start mb-4">
                              <div>
                                 <p className="text-[9px] font-black text-gray-500 uppercase mb-1">{item.provider} • {item.level}</p>
                                 <h4 className="text-xs font-black uppercase text-white">{item.label}</h4>
                              </div>
                              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">✓</div>
                           </div>
                           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 group-hover:animate-pulse" style={{ width: item.width }} />
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="mt-10 pt-8 border-t border-white/5 flex justify-center">
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Auto-Synced with National Education Ecosystem</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* D. CAREER OUTCOME MAPPING */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">Learning → <span className="gradient-text">Livelihood.</span></h2>
           <p className="text-gray-500 text-lg font-medium">Economic performance of the <span className="text-white">{activePathway.title}</span> path.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           <div className="p-12 rounded-[50px] bg-white/[0.02] border border-white/10 text-center space-y-6">
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Target Roles</p>
              <div className="space-y-4">
                 {activePathway.steps[activePathway.steps.length-1].outcomes.slice(0, 3).map(role => (
                   <p key={role} className="text-xl font-black text-white uppercase tracking-tight">{role}</p>
                 ))}
              </div>
           </div>

           <div className="p-12 rounded-[50px] bg-blue-600/5 border border-blue-500/20 text-center space-y-6">
              <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Avg Salary Range</p>
              <h3 className="text-5xl font-black text-white leading-none">{activePathway.salaryRange}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Global Market Standards</p>
           </div>

           <div className="p-12 rounded-[50px] bg-white/[0.02] border border-white/10 text-center space-y-6">
              <p className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">Economic Growth</p>
              <h3 className="text-4xl font-black text-white leading-none">{activePathway.growth}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Projected Stability Index: 9.2/10</p>
           </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center bg-gradient-to-t from-blue-900/10 to-transparent relative">
        <div className="absolute inset-0 bg-blue-500/5 blur-[150px]" />
        <div className="max-w-4xl mx-auto relative z-10">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Your Evolution <br/><span className="gradient-text">Starts Here.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Assessment Engine...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Analyze My Skill Gap
             </button>
             <button onClick={() => onNavigate('explorer')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Browse Career Tracks
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
      `}</style>
    </div>
  );
};

export default PathwaysPage;
