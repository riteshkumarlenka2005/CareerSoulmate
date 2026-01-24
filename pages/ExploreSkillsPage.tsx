
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface Skill {
  id: string;
  name: string;
  category: 'Hard' | 'Soft' | 'Cognitive' | 'Technical';
  domain: string;
  industry: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Specialist' | 'Expert';
  nsqf: number;
  demand: 'Low' | 'Moderate' | 'High' | 'Critical';
  description: string;
  whereUsed: string[];
  careers: string[];
  pathways: string[];
  certifications: string[];
  currentLevel?: number; // 0-100 scale for mock student profile
  requiredLevel: number;
}

const SKILLS_DB: Skill[] = [
  {
    id: 'pytorch',
    name: 'Neural Model Architecture (PyTorch)',
    category: 'Technical',
    domain: 'AI/ML',
    industry: 'Technology',
    difficulty: 'Specialist',
    nsqf: 7,
    demand: 'Critical',
    description: 'The ability to design, train, and optimize complex neural networks using the PyTorch framework for deep learning applications.',
    whereUsed: ['Self-driving systems', 'LLM training', 'Medical diagnostics'],
    careers: ['AI Researcher', 'Machine Learning Engineer', 'Neural Architect'],
    pathways: ['Computer Science UG', 'AI Specialization Bootcamp'],
    certifications: ['DeepLearning.AI PyTorch Professional', 'Meta AI Engineer'],
    currentLevel: 35,
    requiredLevel: 85
  },
  {
    id: 'logic',
    name: 'Abstract Logical Reasoning',
    category: 'Cognitive',
    domain: 'Core Intel',
    industry: 'Cross-Industry',
    difficulty: 'Expert',
    nsqf: 8,
    demand: 'High',
    description: 'Solving complex, multi-layered problems by identifying underlying patterns and rules without relying on specific subject matter knowledge.',
    whereUsed: ['Strategic management', 'System design', 'Cryptography'],
    careers: ['Management Consultant', 'Chief Strategist', 'Research Scientist'],
    pathways: ['Mathematics', 'Philosophy', 'Competitive Programming'],
    certifications: ['Certified Strategy Professional', 'MENSA Recognition'],
    currentLevel: 72,
    requiredLevel: 90
  },
  {
    id: 'persuasion',
    name: 'Strategic Persuasion & Stakeholder Mgmt',
    category: 'Soft',
    domain: 'Leadership',
    industry: 'Business',
    difficulty: 'Intermediate',
    nsqf: 5,
    demand: 'High',
    description: 'The art of influencing decisions and managing expectations among diverse groups of stakeholders to achieve organizational goals.',
    whereUsed: ['Sales leadership', 'Product management', 'Public relations'],
    careers: ['Product Manager', 'Client Relations Head', 'Politician'],
    pathways: ['MBA', 'Communications Degree'],
    certifications: ['Harvard Negotiation Cert', 'PMP Stakeholder Specialist'],
    currentLevel: 60,
    requiredLevel: 75
  },
  {
    id: 'blockchain',
    name: 'Distributed Ledger Development',
    category: 'Technical',
    domain: 'Blockchain',
    industry: 'FinTech',
    difficulty: 'Specialist',
    nsqf: 6,
    demand: 'Moderate',
    description: 'Building secure, decentralized applications and smart contracts on Ethereum, Solana, or private enterprise chains.',
    whereUsed: ['DeFi platforms', 'Supply chain tracking', 'NFT marketplaces'],
    careers: ['Blockchain Developer', 'Smart Contract Auditor', 'CTO'],
    pathways: ['Software Engineering', 'Cryptography Focus'],
    certifications: ['Certified Ethereum Developer', 'Solidity Masterclass'],
    currentLevel: 10,
    requiredLevel: 80
  },
  {
    id: 'empathy',
    name: 'Emotional Intelligence & Empathy',
    category: 'Soft',
    domain: 'Interpersonal',
    industry: 'Cross-Industry',
    difficulty: 'Expert',
    nsqf: 6,
    demand: 'Critical',
    description: 'Understanding and managing your own emotions while recognizing and influencing the emotional states of others in professional settings.',
    whereUsed: ['Healthcare', 'Human Resources', 'Team Leadership'],
    careers: ['Clinical Psychologist', 'HR Director', 'Team Lead'],
    pathways: ['Psychology Degree', 'Leadership Workshops'],
    certifications: ['EQ-i 2.0 Certified', 'Emotional Intelligence Master'],
    currentLevel: 85,
    requiredLevel: 95
  }
];

const DOMAINS = ['All Domains', 'AI/ML', 'Core Intel', 'Leadership', 'Blockchain', 'Interpersonal', 'Finance', 'Energy'];
const NSQF_LEVELS = ['All Levels', 'NSQF 4', 'NSQF 5', 'NSQF 6', 'NSQF 7', 'NSQF 8'];
const DIFFICULTIES = ['All Difficulties', 'Beginner', 'Intermediate', 'Specialist', 'Expert'];

const ExploreSkillsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [filterDomain, setFilterDomain] = useState('All Domains');
  const [filterLevel, setFilterLevel] = useState('All Levels');
  const [filterDiff, setFilterDiff] = useState('All Difficulties');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    return SKILLS_DB.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                            s.description.toLowerCase().includes(search.toLowerCase());
      const matchesDomain = filterDomain === 'All Domains' || s.domain === filterDomain;
      const matchesLevel = filterLevel === 'All Levels' || `NSQF ${s.nsqf}` === filterLevel;
      const matchesDiff = filterDiff === 'All Difficulties' || s.difficulty === filterDiff;
      return matchesSearch && matchesDomain && matchesLevel && matchesDiff;
    });
  }, [search, filterDomain, filterLevel, filterDiff]);

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
          className={`w-full flex items-center justify-between bg-white/5 border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/10'} rounded-xl px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md`}
        >
          <span className={value.includes('All') ? 'text-gray-500' : 'text-blue-400'}>{value}</span>
          <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isOpen && (
          <div className="absolute top-[105%] left-0 right-0 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-[200] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
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
      
      {/* A. SKILL EXPLORER HEADER */}
      <section className="relative pt-28 pb-16 px-6 overflow-visible border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest uppercase">
            COMPETENCY DISCOVERY LAB
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            Master the <br/><span className="gradient-text">Invisible.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-16">
            Skills are the atomic units of your professional destiny. Use our AI explorer to 
            understand the high-utility toolkit required for the future economy.
          </p>

          <div className="max-w-6xl mx-auto bg-white/[0.03] border border-white/10 rounded-[48px] p-10 backdrop-blur-3xl shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Quick Search</p>
                <div className="relative group">
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by skill name..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
              <CustomSelect id="domain" label="Skill Domain" options={DOMAINS} value={filterDomain} onChange={setFilterDomain} />
              <CustomSelect id="level" label="NSQF Proficiency" options={NSQF_LEVELS} value={filterLevel} onChange={setFilterLevel} />
              <CustomSelect id="diff" label="Learning Curve" options={DIFFICULTIES} value={filterDiff} onChange={setFilterDiff} />
            </div>
          </div>
        </div>
      </section>

      {/* B. SKILL CARDS GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tight">Active <span className="text-cyan-500">Toolkit.</span></h2>
          <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em]">{filteredSkills.length} Proficiencies Scanned</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredSkills.map(skill => (
            <div 
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[48px] overflow-hidden hover:border-cyan-500/40 transition-all duration-500 cursor-pointer shadow-xl relative"
            >
              <div className="p-12 flex-grow flex flex-col">
                <div className="mb-8 flex justify-between items-start">
                   <div>
                     <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-2 block">{skill.category} • {skill.domain}</span>
                     <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-cyan-400 transition-colors tracking-tighter">{skill.name}</h3>
                   </div>
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs border border-white/10 ${skill.demand === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-white/5 text-gray-400'}`}>
                      {skill.demand.charAt(0)}
                   </div>
                </div>

                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 line-clamp-3 italic">
                   "{skill.description}"
                </p>

                <div className="space-y-6 mb-8 mt-auto">
                   <div>
                      <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-3">Target Careers</p>
                      <div className="flex flex-wrap gap-2">
                        {skill.careers.slice(0, 2).map(c => <span key={c} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold text-gray-400 uppercase">{c}</span>)}
                      </div>
                   </div>
                   <div className="flex justify-between items-end border-t border-white/5 pt-6">
                      <div>
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Standard</p>
                         <p className="text-xs font-black text-white uppercase">NSQF Level {skill.nsqf}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Difficulty</p>
                         <p className="text-xs font-black text-cyan-400 uppercase">{skill.difficulty}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C. SKILL DETAIL VIEW (MODAL) */}
      {selectedSkill && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedSkill(null)} />
          
          <div className="relative w-full max-w-7xl h-full max-h-[92vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)]">
             
             {/* Left Col: Archetype Analysis */}
             <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-cyan-600/[0.02]">
                <div className="space-y-14">
                   <div className="space-y-4">
                      <div className="inline-block px-3 py-1 bg-cyan-600/20 border border-cyan-600/40 text-cyan-400 text-[9px] font-black uppercase tracking-widest rounded">Competency Dossier</div>
                      <h2 className="text-5xl font-black uppercase text-white leading-none tracking-tighter">{selectedSkill.name}</h2>
                      <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedSkill.category} Domain</p>
                   </div>

                   {/* D. SKILL PROGRESS PREVIEW (INNER COMPONENT) */}
                   <div className="p-10 rounded-[48px] bg-black border border-white/5 space-y-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-20">
                         <svg width="40" height="40" viewBox="0 0 24 24" fill="cyan"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      </div>
                      <h3 className="text-xs font-black text-cyan-500 uppercase tracking-[0.4em]">Personal Gap Analysis</h3>
                      <div className="space-y-6">
                         <div className="space-y-3">
                            <div className="flex justify-between items-end">
                               <span className="text-[9px] font-black text-gray-500 uppercase">Your Proficiency</span>
                               <span className="text-sm font-black text-white">{selectedSkill.currentLevel}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               <div className="h-full bg-cyan-600 transition-all duration-1000" style={{ width: `${selectedSkill.currentLevel}%` }} />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <div className="flex justify-between items-end">
                               <span className="text-[9px] font-black text-gray-500 uppercase">Market Requirement</span>
                               <span className="text-sm font-black text-white">{selectedSkill.requiredLevel}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                               <div className="h-full bg-blue-600 opacity-40 transition-all duration-1000" style={{ width: `${selectedSkill.requiredLevel}%` }} />
                            </div>
                         </div>
                      </div>
                      <div className="pt-6 border-t border-white/5">
                         <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest leading-relaxed">
                            GAP: {selectedSkill.requiredLevel - (selectedSkill.currentLevel || 0)}% proficiency increase needed for Target Destiny.
                         </p>
                      </div>
                   </div>

                   <section className="space-y-6">
                      <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-cyan-600 pl-6">Industrial Utility</h4>
                      <p className="text-sm text-gray-400 font-medium leading-relaxed italic">"{selectedSkill.description}"</p>
                   </section>
                </div>
             </div>

             {/* Right Col: Deep Logic & Integration */}
             <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40 bg-[#080808]">
                <div className="flex justify-end mb-10">
                   <button onClick={() => setSelectedSkill(null)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10">
                      <svg className="w-7 h-7 text-gray-500 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                </div>

                <div className="space-y-24">
                   <section className="space-y-12">
                      <div className="flex items-center gap-6">
                        <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.5em] whitespace-nowrap">Career Ecosystem</h4>
                        <div className="h-px flex-grow bg-white/10" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Primary Career Outcomes</p>
                            <div className="flex flex-wrap gap-3">
                               {selectedSkill.careers.map(c => <span key={c} className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-black uppercase text-white tracking-widest">{c}</span>)}
                            </div>
                         </div>
                         <div className="space-y-6">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Application Verticals</p>
                            <div className="flex flex-wrap gap-3">
                               {selectedSkill.whereUsed.map(w => <span key={w} className="px-5 py-2.5 rounded-2xl bg-blue-600/10 border border-blue-600/20 text-xs font-black uppercase text-blue-400 tracking-widest">{w}</span>)}
                            </div>
                         </div>
                      </div>
                   </section>

                   <section className="space-y-12">
                      <div className="flex items-center gap-6">
                        <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] whitespace-nowrap">Mastery Pathways</h4>
                        <div className="h-px flex-grow bg-white/10" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                         <div className="p-10 rounded-[48px] bg-[#0a0a0a] border border-white/5 space-y-6">
                            <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Learning Routes</h5>
                            <div className="space-y-4">
                               {selectedSkill.pathways.map((p, i) => (
                                 <div key={i} className="flex gap-4 items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                    <span className="text-sm font-medium text-white uppercase">{p}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                         <div className="p-10 rounded-[48px] bg-emerald-900/5 border border-emerald-500/20 space-y-6">
                            <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Verification & Certs</h5>
                            <div className="space-y-4">
                               {selectedSkill.certifications.map((c, i) => (
                                 <div key={i} className="flex gap-4 items-center">
                                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[10px]">✓</div>
                                    <span className="text-xs font-black text-gray-300 uppercase">{c}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </section>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                      <button onClick={() => alert('Assessment Engine Booting...')} className="py-7 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_70px_rgba(6,182,212,0.3)] transition-all active:scale-95">
                         Challenge Level {selectedSkill.nsqf} Assessment
                      </button>
                      <button onClick={() => onNavigate('pathways')} className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                         View Complete Skill Pathway
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
             Concrete <br/><span className="gradient-text">Competency.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't focus on degrees. Focus on the skills they build. Career Soulmate 
              makes talent verifiable, bankable, and future-proof.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('nsqf')} className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-cyan-600/40 uppercase tracking-[0.2em] text-[10px]">
               Analyze My Current Levels
             </button>
             <button onClick={() => onNavigate('explorer')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Match Skills to Jobs
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6, 182, 212, 0.4); }
        input::placeholder { color: #4a5568; }
      `}</style>
    </div>
  );
};

export default ExploreSkillsPage;
