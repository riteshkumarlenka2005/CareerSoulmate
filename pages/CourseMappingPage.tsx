
import React, { useState, useMemo } from 'react';

interface MappingData {
  id: string;
  courseName: string;
  level: 'Diploma' | 'UG' | 'PG' | 'PhD';
  stream: 'Science' | 'Arts' | 'Commerce' | 'Tech';
  skillsGained: string[];
  marketGapSkills: string[];
  entryRoles: { name: string; salary: string }[];
  advancedPaths: { name: string; growth: string }[];
  alternatives: string[];
}

const MAPPING_DATABASE: MappingData[] = [
  {
    id: 'cs_ug',
    courseName: 'B.Tech Computer Science & Engineering',
    level: 'UG',
    stream: 'Tech',
    skillsGained: ['DSA', 'Web Dev', 'OS Concepts', 'DBMS'],
    marketGapSkills: ['Cloud Native Ops', 'Prompt Engineering', 'MLOps'],
    entryRoles: [
      { name: 'Junior Software Dev', salary: '$60k - $85k' },
      { name: 'QA Engineer', salary: '$55k - $75k' }
    ],
    advancedPaths: [
      { name: 'Systems Architect', growth: 'Exponential' },
      { name: 'CTO', growth: 'Strategic' }
    ],
    alternatives: ['Data Scientist', 'Technical Product Manager', 'Cybersecurity Specialist']
  },
  {
    id: 'psy_ug',
    courseName: 'B.A. Psychology (Honors)',
    level: 'UG',
    stream: 'Arts',
    skillsGained: ['Cognitive Theory', 'Statistical Analysis', 'Human Behavior', 'Research Methods'],
    marketGapSkills: ['AI Interaction Design', 'Corporate Wellness Strategy', 'UX Research'],
    entryRoles: [
      { name: 'Mental Health Associate', salary: '$45k - $60k' },
      { name: 'HR Generalist', salary: '$50k - $70k' }
    ],
    advancedPaths: [
      { name: 'Clinical Psychologist', growth: 'High' },
      { name: 'Behavioral Economist', growth: 'Very High' }
    ],
    alternatives: ['UX Researcher', 'Counselor', 'Marketing Analyst']
  },
  {
    id: 'comm_ug',
    courseName: 'Bachelor of Commerce (Accountancy)',
    level: 'UG',
    stream: 'Commerce',
    skillsGained: ['Financial Accounting', 'Auditing', 'Commercial Law', 'Taxation'],
    marketGapSkills: ['FinTech Compliance', 'Algorithmic Trading Basics', 'Data-Driven Valuation'],
    entryRoles: [
      { name: 'Accountant', salary: '$50k - $70k' },
      { name: 'Financial Analyst Intern', salary: '$45k - $65k' }
    ],
    advancedPaths: [
      { name: 'Chief Financial Officer', growth: 'Strategic' },
      { name: 'Investment Banker', growth: 'High-Stakes' }
    ],
    alternatives: ['Stock Trader', 'Corporate Auditor', 'Tax Consultant']
  }
];

interface CourseMappingPageProps {
  onNavigate: (page: any) => void;
}

const CourseMappingPage: React.FC<CourseMappingPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(MAPPING_DATABASE[0].id);
  const [isReverseMapping, setIsReverseMapping] = useState(false);

  const selectedCourse = useMemo(() => 
    MAPPING_DATABASE.find(c => c.id === selectedCourseId) || MAPPING_DATABASE[0]
  , [selectedCourseId]);

  const filteredCourses = MAPPING_DATABASE.filter(c => 
    c.courseName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-32 animate-in fade-in duration-700">
      
      {/* A. MAPPING HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
              {isReverseMapping ? 'CAREER → EDUCATION' : 'EDUCATION → CAREER'} INTELLIGENCE
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-tight">
              Degree <span className="gradient-text">Destiny</span> Map
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Our neural engine maps standard academic syllabi to real-world labor market outcomes. 
              Find out where your degree actually ends.
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow group">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isReverseMapping ? "Search for a career (e.g. Data Scientist)..." : "Search for a degree (e.g. B.Tech Computer Science)..."}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-blue-500 transition-all backdrop-blur-md"
              />
              {search && filteredCourses.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {filteredCourses.map(c => (
                    <button 
                      key={c.id}
                      onClick={() => {
                        setSelectedCourseId(c.id);
                        setSearch('');
                      }}
                      className="w-full text-left px-8 py-4 hover:bg-blue-600/10 transition-colors border-b border-white/5 last:border-0"
                    >
                      <p className="text-sm font-black uppercase text-white">{c.courseName}</p>
                      <p className="text-[9px] font-black uppercase text-gray-500">{c.level} • {c.stream}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setIsReverseMapping(!isReverseMapping)}
              className="px-8 py-5 bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
            >
              {isReverseMapping ? 'Switch to Degree Mapping' : 'Switch to Reverse Mapping'}
            </button>
          </div>
        </div>
      </section>

      {/* B. COURSE → CAREER MAP (MAIN VISUAL) */}
      <section className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="mb-12 flex items-baseline gap-4">
          <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Pipeline</span></h2>
          <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Mapping: {selectedCourse.courseName}</span>
        </div>

        <div className="relative">
          {/* Animated Connectors - Background */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-500/40 to-purple-500/20 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            
            {/* Step 1: Input */}
            <div className="group space-y-4">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest border-l-2 border-blue-500 pl-3">01. Academic Input</span>
              <div className="p-8 rounded-[40px] bg-blue-600/5 border border-blue-500/30 group-hover:bg-blue-600/10 transition-all duration-500 min-h-[160px] flex flex-col justify-center">
                <h4 className="text-xl font-black uppercase tracking-tight text-white">{selectedCourse.courseName}</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-2">{selectedCourse.level} Degree Program</p>
              </div>
            </div>

            {/* Step 2: Skills */}
            <div className="group space-y-4">
              <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest border-l-2 border-cyan-500 pl-3">02. Skill Acquisition</span>
              <div className="p-8 rounded-[40px] bg-cyan-600/5 border border-cyan-500/20 group-hover:bg-cyan-600/10 transition-all duration-500 min-h-[160px] flex flex-wrap gap-2 content-center">
                {selectedCourse.skillsGained.map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-widest border border-white/5">{skill}</span>
                ))}
              </div>
            </div>

            {/* Step 3: Entry Roles */}
            <div className="group space-y-4">
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest border-l-2 border-indigo-500 pl-3">03. Entry Catalyst</span>
              <div className="p-8 rounded-[40px] bg-indigo-600/5 border border-indigo-500/20 group-hover:bg-indigo-600/10 transition-all duration-500 min-h-[160px] space-y-4">
                {selectedCourse.entryRoles.map(role => (
                  <div key={role.name}>
                    <p className="text-xs font-black uppercase text-white leading-none">{role.name}</p>
                    <p className="text-[8px] text-gray-500 font-black uppercase mt-1">{role.salary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Advanced */}
            <div className="group space-y-4">
              <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest border-l-2 border-purple-500 pl-3">04. Zenith Destiny</span>
              <div className="p-8 rounded-[40px] bg-purple-600/5 border border-purple-500/20 group-hover:bg-purple-600/10 transition-all duration-500 min-h-[160px] space-y-4">
                {selectedCourse.advancedPaths.map(path => (
                  <div key={path.name}>
                    <p className="text-xs font-black uppercase text-white leading-none">{path.name}</p>
                    <p className="text-[8px] text-purple-400 font-black uppercase mt-1">{path.growth} Growth</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* C. SKILL ALIGNMENT PANEL */}
      <section className="py-20 px-6 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Market <span className="text-blue-500">Gap Analysis</span></h2>
              <p className="text-gray-400 font-medium leading-relaxed mb-10">
                While your degree covers foundational theory, the current labor market demands specific applied competencies. 
                We identified these "Missing Links" for your path.
              </p>
              
              <div className="space-y-4">
                {selectedCourse.marketGapSkills.map(skill => (
                  <div key={skill} className="flex items-center gap-6 p-5 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-red-500/30 transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xs font-black uppercase text-white">{skill}</h4>
                      <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-1">High Demand Specialty</p>
                    </div>
                    <button className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline">Find Courses →</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="p-12 rounded-[50px] border border-white/10 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <svg width="200" height="200" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" strokeDasharray="10,10" /></svg>
                </div>
                <h3 className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase mb-4">Neural Score</h3>
                <h2 className="text-4xl font-black uppercase mb-8 leading-none">Alignment Index</h2>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-gray-500 uppercase">Degree Relevancy</span>
                      <span className="text-xl font-black text-white">74%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[74%]" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-gray-500 uppercase">Market Elasticity</span>
                      <span className="text-xl font-black text-white">88%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[88%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5">
                  <p className="text-gray-400 text-sm font-medium leading-relaxed">
                    This degree provides a strong pivot potential. You are <span className="text-white">highly eligible</span> for multidisciplinary transitions under NEP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. CAREER OUTCOME CARDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-16">Primary <span className="text-blue-500">Outcomes</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            ...selectedCourse.entryRoles.map(r => ({ ...r, level: 'Entry' })),
            ...selectedCourse.advancedPaths.map(r => ({ ...r, level: 'Advanced' }))
          ].map((outcome, i) => (
            <div key={i} className="group relative p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center cursor-pointer">
              <div className="w-24 h-24 rounded-3xl bg-blue-600/10 flex items-center justify-center font-black text-3xl text-blue-500 group-hover:scale-110 transition-transform">
                {outcome.name.charAt(0)}
              </div>
              <div className="flex-grow text-center md:text-left">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${outcome.level === 'Entry' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                    {outcome.level} Role
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest">
                    {selectedCourse.stream}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-blue-400 transition-colors mb-2">
                  {outcome.name}
                </h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  Est. Compensation: <span className="text-white">{(outcome as any).salary || 'Market Rates'}</span>
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* E. ALTERNATIVE PATHWAYS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto p-12 rounded-[60px] bg-white/[0.01] border border-white/5 relative overflow-hidden">
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
               <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Alternative <br/><span className="text-blue-500">Destinies.</span></h2>
               <p className="text-gray-500 text-sm font-medium leading-relaxed">
                 Degrees don't define you—they launch you. These non-obvious paths are accessible with your current academic profile.
               </p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedCourse.alternatives.map((alt, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-black/40 border border-white/5 hover:border-blue-500/40 transition-all group">
                   <div className="flex items-center justify-between mb-4">
                     <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Pivot Path</span>
                     <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping" />
                   </div>
                   <h4 className="text-lg font-black uppercase text-white mb-4">{alt}</h4>
                   <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest">Requires 1-2 Specialized Certs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* F. FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
            Ready to <span className="gradient-text">Sync?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => onNavigate('explorer')} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl shadow-blue-600/40">
              Explore Open Vacancies
            </button>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all backdrop-blur-md">
              Download Full Mapping Report
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CourseMappingPage;
