
import React, { useState, useMemo, useRef, useEffect } from 'react';

/* ─── DATA: CAREERS ─── */
interface Career {
  id: string; name: string; industry: string; domain: string; description: string;
  growth: 'Low' | 'Medium' | 'High' | 'Extreme'; salaryRange: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Specialist' | 'Expert';
  skills: string[]; education: string[]; trending?: boolean;
}

const CAREERS_DB: Career[] = [
  { id: 'neural_arch', name: 'Neural Architect', industry: 'Technology', domain: 'AI', description: 'Design structural layers of advanced neural network models.', growth: 'Extreme', salaryRange: '$140k - $250k', difficulty: 'Expert', skills: ['PyTorch', 'Linear Algebra', 'Distributed Systems'], education: ['B.Tech CS', 'M.Sc AI'], trending: true },
  { id: 'ux_psych', name: 'Cognitive Experience Designer', industry: 'Creative', domain: 'UX', description: 'Design cognitive-load-optimized digital interfaces.', growth: 'High', salaryRange: '$95k - $170k', difficulty: 'Specialist', skills: ['Figma', 'Behavioral Psychology', 'User Research'], education: ['B.Des', 'HCI Certifications'] },
  { id: 'sus_auditor', name: 'Sustainability Auditor', industry: 'Business', domain: 'Environment', description: 'Audit corporate carbon-neutral and ESG compliance.', growth: 'High', salaryRange: '$85k - $140k', difficulty: 'Intermediate', skills: ['ESG Standards', 'Policy Analysis', 'Risk Assessment'], education: ['MBA Sustainability', 'B.Sc Environmental Science'] },
  { id: 'cyber_warden', name: 'Digital Identity Warden', industry: 'Government', domain: 'Security', description: 'Protect citizen identity in decentralized governance systems.', growth: 'Extreme', salaryRange: '$110k - $190k', difficulty: 'Specialist', skills: ['Cryptography', 'Blockchain', 'Network Security'], education: ['B.Tech Cybersecurity', 'CISSP'], trending: true },
];

/* ─── DATA: DEGREES ─── */
interface Degree {
  id: string; name: string; level: 'UG' | 'PG' | 'Diploma' | 'Doctorate';
  stream: string; duration: string; mode: 'Online' | 'Offline' | 'Hybrid';
  subjects: string[]; outcomes: string[]; description: string; nepReady: boolean; trending?: boolean;
}

const DEGREES_DB: Degree[] = [
  { id: 'btech_cs', name: 'B.Tech Computer Science', level: 'UG', stream: 'Tech', duration: '4 Years', mode: 'Offline', subjects: ['Data Structures', 'OS', 'AI & ML', 'Networks'], outcomes: ['Software Engineer', 'Data Scientist'], description: 'Foundation in computation and digital systems.', nepReady: true, trending: true },
  { id: 'ba_multi', name: 'B.A. Multidisciplinary Studies', level: 'UG', stream: 'Arts', duration: '3-4 Years', mode: 'Hybrid', subjects: ['Psychology', 'Sociology', 'Digital Arts'], outcomes: ['Policy Analyst', 'Creative Strategist'], description: 'Flexible liberal arts with majors and minors.', nepReady: true },
  { id: 'itep', name: 'ITEP (Integrated Teacher Education)', level: 'UG', stream: 'Vocational', duration: '4 Years', mode: 'Offline', subjects: ['Child Development', 'Pedagogy', 'Internships'], outcomes: ['Senior Teacher', 'Education Architect'], description: 'Dual-major integrated degree for professional teachers.', nepReady: true },
  { id: 'msc_ds', name: 'M.Sc Data Science & Analytics', level: 'PG', stream: 'Tech', duration: '2 Years', mode: 'Online', subjects: ['Big Data', 'Neural Networks', 'Predictive Modeling'], outcomes: ['Lead Data Scientist', 'AI Researcher'], description: 'Advanced postgraduate mastery in large-scale data systems.', nepReady: true, trending: true },
];

/* ─── DATA: SKILLS ─── */
interface Skill {
  id: string; name: string; category: 'Hard' | 'Soft' | 'Cognitive' | 'Technical';
  domain: string; industry: string; difficulty: string; nsqf: number;
  demand: 'Low' | 'Moderate' | 'High' | 'Critical';
  description: string; careers: string[]; certifications: string[];
  currentLevel?: number; requiredLevel: number;
}

const SKILLS_DB: Skill[] = [
  { id: 'pytorch', name: 'Neural Model Architecture (PyTorch)', category: 'Technical', domain: 'AI/ML', industry: 'Technology', difficulty: 'Specialist', nsqf: 7, demand: 'Critical', description: 'Design and optimize complex neural networks using PyTorch.', careers: ['AI Researcher', 'ML Engineer'], certifications: ['DeepLearning.AI Professional'], currentLevel: 35, requiredLevel: 85 },
  { id: 'logic', name: 'Abstract Logical Reasoning', category: 'Cognitive', domain: 'Core Intel', industry: 'Cross-Industry', difficulty: 'Expert', nsqf: 8, demand: 'High', description: 'Solve complex multi-layered problems by identifying patterns.', careers: ['Management Consultant', 'Research Scientist'], certifications: ['Certified Strategy Professional'], currentLevel: 72, requiredLevel: 90 },
  { id: 'persuasion', name: 'Strategic Persuasion', category: 'Soft', domain: 'Leadership', industry: 'Business', difficulty: 'Intermediate', nsqf: 5, demand: 'High', description: 'Influence decisions among diverse stakeholders.', careers: ['Product Manager', 'Client Relations Head'], certifications: ['Harvard Negotiation Cert'], currentLevel: 60, requiredLevel: 75 },
  { id: 'empathy', name: 'Emotional Intelligence & Empathy', category: 'Soft', domain: 'Interpersonal', industry: 'Cross-Industry', difficulty: 'Expert', nsqf: 6, demand: 'Critical', description: 'Understanding and managing emotions in professional settings.', careers: ['Clinical Psychologist', 'HR Director'], certifications: ['EQ-i 2.0 Certified'], currentLevel: 85, requiredLevel: 95 },
];

/* ─── TABS ─── */
type Tab = 'careers' | 'degrees' | 'skills';

const ExplorePage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('careers');
  const [search, setSearch] = useState('');

  const tabs: { key: Tab; label: string; color: string; count: number }[] = [
    { key: 'careers', label: 'Careers', color: 'blue', count: CAREERS_DB.length },
    { key: 'degrees', label: 'Degrees', color: 'purple', count: DEGREES_DB.length },
    { key: 'skills', label: 'Skills', color: 'cyan', count: SKILLS_DB.length },
  ];

  const tabColor = tabs.find(t => t.key === activeTab)?.color || 'blue';

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* HERO + TAB HEADER */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] bg-${tabColor}-600/5 blur-[180px] rounded-full`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className={`inline-block px-4 py-1.5 mb-8 rounded-full bg-${tabColor}-500/10 border border-${tabColor}-500/20 text-${tabColor}-400 text-xs font-black tracking-widest uppercase`}>
            UNIFIED EXPLORATION LAB
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            Explore <br/><span className="gradient-text">Everything.</span>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-16">
            Careers, degrees, and skills — all in one place. Search the global landscape to 
            find what aligns with your natural curiosity.
          </p>

          {/* TAB SWITCHER */}
          <div className="flex justify-center gap-4 mb-12">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSearch(''); }}
                className={`px-8 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-sm transition-all border ${
                  activeTab === tab.key
                    ? `bg-${tab.color}-600 border-${tab.color}-400 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]`
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
                <span className="ml-3 text-xs opacity-60">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="max-w-3xl mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        
        {/* CAREERS TAB */}
        {activeTab === 'careers' && <CareersTab search={search} onNavigate={onNavigate} />}
        
        {/* DEGREES TAB */}
        {activeTab === 'degrees' && <DegreesTab search={search} onNavigate={onNavigate} />}
        
        {/* SKILLS TAB */}
        {activeTab === 'skills' && <SkillsTab search={search} onNavigate={onNavigate} />}
      </section>
    </div>
  );
};

/* ─── CAREERS TAB ─── */
const CareersTab: React.FC<{ search: string; onNavigate: (page: any) => void }> = ({ search, onNavigate }) => {
  const filtered = useMemo(() => 
    CAREERS_DB.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase())),
    [search]
  );
  const [shortlist, setShortlist] = useState<string[]>([]);

  return (
    <>
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Inventory.</span></h2>
        <p className="text-xs font-black text-gray-300 uppercase tracking-widest">{filtered.length} Roles Synced</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(career => (
          <div key={career.id} className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 cursor-pointer shadow-xl p-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">{career.industry}</span>
                <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-blue-400 transition-colors tracking-tighter">{career.name}</h3>
              </div>
              {career.trending && <span className="px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full text-sm font-black uppercase tracking-widest">Trending</span>}
            </div>
            <p className="text-gray-200 text-sm font-medium leading-relaxed mb-8 line-clamp-3">{career.description}</p>
            <div className="space-y-6 mt-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-black text-gray-400 uppercase mb-1 tracking-widest">Avg Salary</p>
                  <p className="text-xs font-black text-white">{career.salaryRange}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-400 uppercase mb-1 tracking-widest">Growth</p>
                  <span className={`text-xs font-black uppercase ${career.growth === 'Extreme' ? 'text-red-500' : 'text-emerald-500'}`}>{career.growth}</span>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
                {career.skills.slice(0, 3).map(s => (
                  <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-sm font-black text-gray-300 uppercase tracking-widest">#{s.replace(/\s+/g, '')}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {shortlist.length > 0 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[250]">
          <div className="bg-blue-600/95 backdrop-blur-2xl px-10 py-6 rounded-2xl shadow-2xl flex items-center gap-12 border border-blue-400/30">
            <span className="text-sm font-black uppercase tracking-widest text-white">{shortlist.length} Careers Chosen</span>
            <button onClick={() => onNavigate('comparison')} className="bg-white text-blue-600 px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-[0.2em]">Compare</button>
          </div>
        </div>
      )}
    </>
  );
};

/* ─── DEGREES TAB ─── */
const DegreesTab: React.FC<{ search: string; onNavigate: (page: any) => void }> = ({ search, onNavigate }) => {
  const filtered = useMemo(() =>
    DEGREES_DB.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()))),
    [search]
  );

  return (
    <>
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-3xl font-black uppercase tracking-tight">Academic <span className="text-purple-500">Assets.</span></h2>
        <p className="text-xs font-black text-gray-300 uppercase tracking-widest">{filtered.length} Programs Mapped</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(degree => (
          <div key={degree.id} className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/40 transition-all duration-500 cursor-pointer shadow-xl relative p-12">
            {degree.trending && (
              <div className="absolute top-8 right-8 z-10">
                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-black uppercase tracking-widest shadow-2xl">TRENDING</span>
              </div>
            )}
            <div className="mb-10">
              <span className="text-xs font-black text-purple-500 uppercase tracking-[0.3em] mb-3 block">{degree.level} • {degree.stream}</span>
              <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-purple-400 transition-colors tracking-tighter">{degree.name}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="text-sm font-black text-gray-400 uppercase mb-1">Duration</p>
                <p className="text-xs font-black text-white uppercase">{degree.duration}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="text-sm font-black text-gray-400 uppercase mb-1">Mode</p>
                <p className="text-xs font-black text-white uppercase">{degree.mode}</p>
              </div>
            </div>
            <div className="mb-8">
              <p className="text-sm font-black text-gray-300 uppercase tracking-widest mb-3">Core Subjects</p>
              <div className="flex flex-wrap gap-2">
                {degree.subjects.slice(0, 3).map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold text-gray-200 uppercase tracking-tight">{s}</span>)}
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-white/10">
              <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Career Outcomes</p>
              <p className="text-xs font-black text-gray-300 uppercase">{degree.outcomes.join(' • ')}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

/* ─── SKILLS TAB ─── */
const SkillsTab: React.FC<{ search: string; onNavigate: (page: any) => void }> = ({ search, onNavigate }) => {
  const filtered = useMemo(() =>
    SKILLS_DB.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <>
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-cyan-500">Toolkit.</span></h2>
        <p className="text-xs font-black text-gray-300 uppercase tracking-widest">{filtered.length} Proficiencies Scanned</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(skill => (
          <div key={skill.id} className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/40 transition-all duration-500 cursor-pointer shadow-xl p-12">
            <div className="mb-8 flex justify-between items-start">
              <div>
                <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em] mb-2 block">{skill.category} • {skill.domain}</span>
                <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-cyan-400 transition-colors tracking-tighter">{skill.name}</h3>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs border border-white/10 ${skill.demand === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-white/5 text-gray-200'}`}>
                {skill.demand.charAt(0)}
              </div>
            </div>
            <p className="text-gray-200 text-sm font-medium leading-relaxed mb-8 line-clamp-3 italic">"{skill.description}"</p>

            {/* Gap analysis bar */}
            {skill.currentLevel !== undefined && (
              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-xs font-black uppercase">
                  <span className="text-gray-300">Your Level</span>
                  <span className="text-cyan-400">{skill.currentLevel}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600 transition-all duration-1000" style={{ width: `${skill.currentLevel}%` }} />
                </div>
              </div>
            )}

            <div className="space-y-4 mt-auto border-t border-white/10 pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-black text-gray-400 uppercase mb-1">Standard</p>
                  <p className="text-xs font-black text-white uppercase">NSQF Level {skill.nsqf}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-400 uppercase mb-1">Careers</p>
                  <p className="text-xs font-black text-gray-200 uppercase">{skill.careers.slice(0, 2).join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExplorePage;
