
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface Career {
  id: string;
  name: string;
  industry: string;
  domain: string;
  description: string;
  dayToDay: string[];
  growth: 'Low' | 'Medium' | 'High' | 'Extreme';
  salaryRange: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Specialist' | 'Expert';
  level: 'Entry' | 'Advanced' | 'Leadership';
  skills: string[];
  education: string[];
  related: string[];
  trending?: boolean;
}

const CAREERS_DATABASE: Career[] = [
  {
    id: 'neural_arch',
    name: 'Neural Architect',
    industry: 'Technology',
    domain: 'Artificial Intelligence',
    description: 'Specialists who design the structural layers of advanced neural network models inspired by synthetic biology and brain mechanics.',
    dayToDay: [
      'Simulating synaptic efficiency in large models.',
      'Architecting multi-modal transformer blocks.',
      'Collaborating with Ethics teams on bias mitigation.',
      'Analyzing real-time inference latency across global nodes.'
    ],
    growth: 'Extreme',
    salaryRange: '$140k - $250k',
    difficulty: 'Expert',
    level: 'Advanced',
    skills: ['PyTorch', 'Linear Algebra', 'Neuroscience Basics', 'Distributed Systems'],
    education: ['B.Tech Computer Science', 'M.Sc Artificial Intelligence', 'PhD (Preferred)'],
    related: ['ML Engineer', 'AI Ethicist', 'Research Scientist'],
    trending: true
  },
  {
    id: 'ux_psych',
    name: 'Cognitive Experience Designer',
    industry: 'Creative',
    domain: 'User Experience',
    description: 'Designing digital interfaces that optimize for cognitive load and psychological wellness, moving beyond simple aesthetics to behavioral science.',
    dayToDay: [
      'Conducting eye-tracking and neural-response tests.',
      'Mapping emotional user journeys.',
      'Designing non-addictive interaction patterns.',
      'Consulting on accessible interface accessibility for neurodivergent users.'
    ],
    growth: 'High',
    salaryRange: '$95k - $170k',
    difficulty: 'Specialist',
    level: 'Entry',
    skills: ['Figma', 'Behavioral Psychology', 'Interaction Design', 'User Research'],
    education: ['B.Des (Visual Comm)', 'B.A. Psychology', 'HCI Certifications'],
    related: ['UI Designer', 'Product Manager', 'Human Factors Engineer']
  },
  {
    id: 'sus_auditor',
    name: 'Sustainability Auditor',
    industry: 'Business',
    domain: 'Environment',
    description: 'Ensuring global corporate giants meet international carbon-neutral and circular economy regulations through rigorous data-driven audits.',
    dayToDay: [
      'Analyzing supply-chain carbon footprints.',
      'Verifying ESG disclosures for shareholders.',
      'Conducting field audits on waste-management protocols.',
      'Advising on green-tax incentives and compliance.'
    ],
    growth: 'High',
    salaryRange: '$85k - $140k',
    difficulty: 'Intermediate',
    level: 'Entry',
    skills: ['ESG Standards', 'LCA Tools', 'Policy Analysis', 'Risk Assessment'],
    education: ['MBA Sustainability', 'B.Sc Environmental Science', 'Auditing Certifications'],
    related: ['ESG Analyst', 'Climate Strategist', 'Environmental Lawyer']
  },
  {
    id: 'cyber_warden',
    name: 'Digital Identity Warden',
    industry: 'Government',
    domain: 'Security',
    description: 'Protecting citizen identity integrity and digital sovereignty in decentralized governance and blockchain-based national systems.',
    dayToDay: [
      'Monitoring identity-theft threat vectors.',
      'Managing zero-knowledge proof protocols.',
      'Incident response for state-level data breaches.',
      'Developing cross-border digital passport standards.'
    ],
    growth: 'Extreme',
    salaryRange: '$110k - $190k',
    difficulty: 'Specialist',
    level: 'Advanced',
    skills: ['Cryptography', 'Blockchain Tech', 'Network Security', 'Public Policy'],
    education: ['B.Tech Cybersecurity', 'M.A. Public Policy', 'CISSP Certification'],
    related: ['Security Analyst', 'Blockchain Dev', 'Data Privacy Officer'],
    trending: true
  }
];

const INDUSTRIES = ['All Industries', 'Technology', 'Creative', 'Business', 'Government', 'Healthcare', 'Energy'];
const DIFFICULTY_LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Specialist', 'Expert'];
const GROWTH_OUTLOOK = ['All Outlooks', 'Low', 'Medium', 'High', 'Extreme'];

const ExploreCareersPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('All Industries');
  const [filterDiff, setFilterDiff] = useState('All Levels');
  const [filterGrowth, setFilterGrowth] = useState('All Outlooks');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredCareers = useMemo(() => {
    return CAREERS_DATABASE.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                            c.industry.toLowerCase().includes(search.toLowerCase()) ||
                            c.domain.toLowerCase().includes(search.toLowerCase());
      const matchesIndustry = filterIndustry === 'All Industries' || c.industry === filterIndustry;
      const matchesDiff = filterDiff === 'All Levels' || c.difficulty === filterDiff;
      const matchesGrowth = filterGrowth === 'All Outlooks' || c.growth === filterGrowth;
      return matchesSearch && matchesIndustry && matchesDiff && matchesGrowth;
    });
  }, [search, filterIndustry, filterDiff, filterGrowth]);

  const toggleShortlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShortlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

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
          className={`w-full flex items-center justify-between bg-white/5 border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/10'} rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md`}
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
      
      {/* A. CAREER DISCOVERY HEADER */}
      <section className="relative pt-28 pb-16 px-6 overflow-visible border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
              PROFESSIONAL EXPLORATION LAB
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Explore <br/><span className="gradient-text">The Horizon.</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Discovery without pressure. Search the global labor market to find 
              the patterns of work that match your natural curiosity.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8 bg-white/[0.03] border border-white/10 rounded-[48px] p-10 backdrop-blur-3xl shadow-2xl">
            <div className="relative group">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by role, domain, or industry..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <CustomSelect id="industry" label="Industry Sector" options={INDUSTRIES} value={filterIndustry} onChange={setFilterIndustry} />
               <CustomSelect id="diff" label="Complexity Level" options={DIFFICULTY_LEVELS} value={filterDiff} onChange={setFilterDiff} />
               <CustomSelect id="growth" label="Market Outlook" options={GROWTH_OUTLOOK} value={filterGrowth} onChange={setFilterGrowth} />
            </div>
          </div>
        </div>
      </section>

      {/* B. CAREER GRID / CARDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
           <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Inventory.</span></h2>
           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{filteredCareers.length} Roles Synced</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCareers.map(career => (
            <div 
              key={career.id}
              onClick={() => setSelectedCareer(career)}
              className="group relative flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[48px] overflow-hidden hover:border-blue-500/40 transition-all duration-500 cursor-pointer shadow-xl"
            >
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">{career.industry}</span>
                    <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-blue-400 transition-colors tracking-tighter">{career.name}</h3>
                  </div>
                  {career.trending && (
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full text-[8px] font-black uppercase tracking-widest">Trending</span>
                  )}
                </div>

                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                  {career.description}
                </p>

                <div className="space-y-6 mt-auto">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1 tracking-widest">Avg Salary</p>
                         <p className="text-xs font-black text-white">{career.salaryRange}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1 tracking-widest">Growth</p>
                         <span className={`text-[10px] font-black uppercase ${career.growth === 'Extreme' ? 'text-red-500' : 'text-emerald-500'}`}>{career.growth}</span>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                      {career.skills.slice(0, 3).map(s => (
                        <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black text-gray-500 uppercase tracking-widest">#{s.replace(/\s+/g, '')}</span>
                      ))}
                   </div>
                </div>
              </div>

              {/* Compare Button */}
              <button 
                onClick={(e) => toggleShortlist(career.id, e)}
                className={`absolute bottom-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center transition-all border ${shortlist.includes(career.id) ? 'bg-blue-600 border-blue-400' : 'bg-black/40 border-white/10 hover:border-blue-500'}`}
              >
                <svg className={`w-5 h-5 ${shortlist.includes(career.id) ? 'fill-white' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* C. CAREER DETAIL VIEW (MODAL) */}
      {selectedCareer && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setSelectedCareer(null)} />
          
          <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-2xl">
             {/* Modal Header for Mobile */}
             <div className="p-6 md:hidden border-b border-white/5 flex justify-between items-center shrink-0">
                <h3 className="text-lg font-black uppercase text-white tracking-tight">{selectedCareer.name}</h3>
                <button onClick={() => setSelectedCareer(null)} className="text-gray-500">✕</button>
             </div>

             {/* Left Column: Visuals & Core Logic */}
             <div className="md:w-1/3 bg-blue-600/5 p-12 border-r border-white/5 overflow-y-auto custom-scrollbar hidden md:flex flex-col">
                <div className="space-y-12">
                   <div className="space-y-4">
                      <span className="px-3 py-1 bg-blue-600/10 border border-blue-600/30 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Dossier Profile</span>
                      <h2 className="text-5xl font-black uppercase text-white leading-none tracking-tighter">{selectedCareer.name}</h2>
                      <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">{selectedCareer.industry} • {selectedCareer.domain}</p>
                   </div>

                   <div className="space-y-8">
                      <div className="p-8 rounded-[40px] bg-black/40 border border-white/5">
                         <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">Economic Outlook</p>
                         <div className="space-y-6">
                            <div className="flex justify-between">
                               <span className="text-[10px] font-black text-gray-400 uppercase">Growth Index</span>
                               <span className="text-[10px] font-black text-red-500 uppercase">{selectedCareer.growth}</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-[10px] font-black text-gray-400 uppercase">Salary Range</span>
                               <span className="text-[10px] font-black text-white uppercase">{selectedCareer.salaryRange}</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-[10px] font-black text-gray-400 uppercase">Automation Risk</span>
                               <span className="text-[10px] font-black text-emerald-500 uppercase">Very Low</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest border-l-2 border-blue-600 pl-4">The Logic</p>
                         <p className="text-sm text-gray-400 font-medium leading-relaxed italic">
                           "{selectedCareer.description}"
                         </p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: Deep Dive Content */}
             <div className="flex-grow p-12 overflow-y-auto custom-scrollbar space-y-20 pb-32">
                <div className="flex justify-end hidden md:block">
                   <button onClick={() => setSelectedCareer(null)} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group">
                      <svg className="w-6 h-6 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                </div>

                <section className="space-y-10">
                   <div className="flex items-center gap-6">
                      <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">The Day-To-Day</h4>
                      <div className="h-px flex-grow bg-white/10" />
                   </div>
                   <div className="grid md:grid-cols-2 gap-6">
                      {selectedCareer.dayToDay.map((task, i) => (
                        <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-all">
                           <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 font-black text-xs shrink-0">0{i+1}</div>
                           <p className="text-sm text-gray-300 font-medium leading-relaxed">{task}</p>
                        </div>
                      ))}
                   </div>
                </section>

                <div className="grid lg:grid-cols-2 gap-20">
                   <section className="space-y-10">
                      <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.5em]">Skill Toolkit</h4>
                      <div className="flex flex-wrap gap-3">
                         {selectedCareer.skills.map(skill => (
                           <span key={skill} className="px-5 py-2.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-xs font-black uppercase text-cyan-400 tracking-widest">{skill}</span>
                         ))}
                      </div>
                   </section>

                   <section className="space-y-10">
                      <h4 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.5em]">Academic Base</h4>
                      <div className="space-y-4">
                         {selectedCareer.education.map(edu => (
                           <div key={edu} className="flex items-center gap-4 group/edu">
                              <div className="w-2 h-2 rounded-full bg-purple-500 group-hover/edu:scale-150 transition-all" />
                              <span className="text-sm font-black uppercase text-white tracking-widest">{edu}</span>
                           </div>
                         ))}
                      </div>
                   </section>
                </div>

                <section className="space-y-10">
                   <h4 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.5em]">Related Synergies</h4>
                   <div className="grid md:grid-cols-3 gap-4">
                      {selectedCareer.related.map(rel => (
                        <button key={rel} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-orange-500/40 transition-all text-center group">
                           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-orange-400">{rel}</p>
                        </button>
                      ))}
                   </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-white/5">
                   <button className="flex-grow py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-2xl shadow-blue-600/30">
                      Unlock Full Pathway Guide
                   </button>
                   <button 
                     onClick={(e) => toggleShortlist(selectedCareer.id, e)}
                     className={`px-12 py-6 rounded-[32px] font-black uppercase tracking-[0.2em] text-[10px] transition-all border ${shortlist.includes(selectedCareer.id) ? 'bg-blue-600 text-white border-blue-400' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                   >
                      {shortlist.includes(selectedCareer.id) ? 'Saved' : 'Shortlist'}
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* D. COMPARE & SAVE FLOATING BAR */}
      {shortlist.length > 0 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[250] animate-in slide-in-from-bottom-6 duration-500">
           <div className="bg-blue-600/95 backdrop-blur-2xl px-10 py-6 rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,1)] flex items-center gap-12 border border-blue-400/30">
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-4">
                   {shortlist.slice(0,3).map(id => {
                     const career = CAREERS_DATABASE.find(c => c.id === id);
                     return (
                        <div key={id} className="w-12 h-12 rounded-full border-4 border-blue-600 bg-black flex items-center justify-center font-black text-blue-500 text-[10px] shadow-xl">
                           {career?.name.charAt(0)}
                        </div>
                     );
                   })}
                 </div>
                 <div className="space-y-1">
                   <span className="text-[12px] font-black uppercase tracking-widest text-white leading-none block">{shortlist.length} Careers Chosen</span>
                   <span className="text-[9px] font-black uppercase tracking-widest text-blue-200 opacity-60">Ready for Logic Mapping</span>
                 </div>
              </div>
              <div className="flex gap-4">
                 <button 
                   onClick={() => setShortlist([])}
                   className="text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                 >
                   Clear All
                 </button>
                 <button 
                   onClick={() => onNavigate('comparison')}
                   className="bg-white text-blue-600 px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-50 transition-all active:scale-95 shadow-xl"
                 >
                   Compare Destinies
                 </button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        input::placeholder { color: #4a5568; }
      `}</style>
    </div>
  );
};

export default ExploreCareersPage;
