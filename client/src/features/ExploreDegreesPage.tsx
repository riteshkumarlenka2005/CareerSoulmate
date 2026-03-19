
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface Degree {
  id: string;
  name: string;
  level: 'UG' | 'PG' | 'Diploma' | 'Doctorate';
  stream: 'Science' | 'Arts' | 'Commerce' | 'Tech' | 'Medical' | 'Management' | 'Vocational';
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  nepReady: boolean;
  eligibility: string;
  subjects: string[];
  outcomes: string[];
  description: string;
  curriculumOverview: string;
  skills: string[];
  exitOptions: { level: string; award: string; timing: string }[];
  trending?: boolean;
}

const DEGREES_DB: Degree[] = [
  {
    id: 'btech_cs',
    name: 'B.Tech in Computer Science & Engineering',
    level: 'UG',
    stream: 'Tech',
    duration: '4 Years',
    mode: 'Offline',
    nepReady: true,
    eligibility: 'Class 12 with PCM (Physics, Chemistry, Maths)',
    subjects: ['Data Structures', 'Operating Systems', 'AI & ML', 'Computer Networks'],
    outcomes: ['Software Engineer', 'Data Scientist', 'Cloud Architect'],
    description: 'A professional technical degree focused on the theoretical and practical foundations of computation and digital systems.',
    curriculumOverview: 'Foundation in Mathematics & Physics (Year 1), Core CS Logic (Year 2), Specialization Electives (Year 3), Major Research Project (Year 4).',
    skills: ['Programming', 'System Architecture', 'Algorithms', 'Logic'],
    exitOptions: [
      { level: 'Year 1', award: 'Undergraduate Certificate', timing: 'After 40 Credits' },
      { level: 'Year 2', award: 'Undergraduate Diploma', timing: 'After 80 Credits' },
      { level: 'Year 3', award: "Bachelor's Degree", timing: 'After 120 Credits' }
    ],
    trending: true
  },
  {
    id: 'ba_multidisciplinary',
    name: 'B.A. Multidisciplinary Studies',
    level: 'UG',
    stream: 'Arts',
    duration: '3-4 Years',
    mode: 'Hybrid',
    nepReady: true,
    eligibility: 'Class 12 in any stream',
    subjects: ['Psychology', 'Sociology', 'Digital Arts', 'Political Science'],
    outcomes: ['Public Policy Analyst', 'Creative Strategist', 'UX Researcher'],
    description: 'A highly flexible liberal arts program allowing students to pick majors and minors across disparate fields of study.',
    curriculumOverview: 'Exploratory Foundation (Year 1), Major/Minor Selection (Year 2), Applied Projects (Year 3), Optional Research (Year 4).',
    skills: ['Critical Analysis', 'Cross-domain Synergy', 'Research', 'Communication'],
    exitOptions: [
      { level: 'Year 1', award: 'Certificate in Humanities', timing: 'After 40 Credits' },
      { level: 'Year 2', award: 'Diploma in Liberal Arts', timing: 'After 80 Credits' }
    ]
  },
  {
    id: 'itep_integrated',
    name: 'ITEP (Integrated Teacher Education Program)',
    level: 'UG',
    stream: 'Vocational',
    duration: '4 Years',
    mode: 'Offline',
    nepReady: true,
    eligibility: 'Class 12 with min 50% marks',
    subjects: ['Child Development', 'Pedagogy', 'Subject Mastery', 'School Internships'],
    outcomes: ['Senior Secondary Teacher', 'Education Architect', 'Content Specialist'],
    description: 'A dual-major integrated degree aimed at preparing professional teachers for the new school structure (5+3+3+4).',
    curriculumOverview: 'Subject Foundation + Pedagogy Basics (Year 1 & 2), Extensive Field Internships (Year 3), Advanced School Leadership (Year 4).',
    skills: ['Instructional Design', 'LMS Mastery', 'Public Speaking', 'Cognitive Mentoring'],
    exitOptions: []
  },
  {
    id: 'msc_data_science',
    name: 'M.Sc in Data Science & Analytics',
    level: 'PG',
    stream: 'Tech',
    duration: '2 Years',
    mode: 'Online',
    nepReady: true,
    eligibility: 'Bachelor’s in CS, Maths or Stats',
    subjects: ['Big Data', 'Neural Networks', 'Predictive Modeling', 'Ethics in Data'],
    outcomes: ['Lead Data Scientist', 'AI Researcher', 'Business Intelligence Head'],
    description: 'An advanced postgraduate program designed for deep-dive technical mastery in large-scale data systems and AI.',
    curriculumOverview: 'Advanced Statistics & ML (Year 1), Industry Specialization (FinTech/Health) + Masters Thesis (Year 2).',
    skills: ['PyTorch', 'SQL', 'Deep Learning', 'Strategic Forecasting'],
    exitOptions: [
      { level: 'Year 1', award: 'PG Diploma', timing: 'After 40 PG Credits' }
    ],
    trending: true
  }
];

const LEVELS = ['All Levels', 'UG', 'PG', 'Diploma', 'Doctorate'];
const STREAMS = ['All Streams', 'Science', 'Arts', 'Commerce', 'Tech', 'Medical', 'Management', 'Vocational'];
const MODES = ['All Modes', 'Online', 'Offline', 'Hybrid'];

const ExploreDegreesPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState('All Levels');
  const [filterStream, setFilterStream] = useState('All Streams');
  const [filterMode, setFilterMode] = useState('All Modes');
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredDegrees = useMemo(() => {
    return DEGREES_DB.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || 
                            d.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchesLevel = filterLevel === 'All Levels' || d.level === filterLevel;
      const matchesStream = filterStream === 'All Streams' || d.stream === filterStream;
      const matchesMode = filterMode === 'All Modes' || d.mode === filterMode;
      return matchesSearch && matchesLevel && matchesStream && matchesMode;
    });
  }, [search, filterLevel, filterStream, filterMode]);

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
      
      {/* A. DEGREE DISCOVERY HEADER */}
      <section className="relative pt-28 pb-16 px-6 overflow-visible border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black tracking-widest uppercase">
            ACADEMIC INVENTORY LAB
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            Choose Your <br/><span className="gradient-text">Foundation.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-16">
            Degrees are more than certificates—they are neural frameworks. Explore global 
            program types and find the academic path that aligns with your ambition.
          </p>

          <div className="max-w-6xl mx-auto bg-white/[0.03] border border-white/10 rounded-[48px] p-10 backdrop-blur-3xl shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-2">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Search Programs</p>
                <div className="relative group">
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by degree name or subjects..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-4 text-lg focus:outline-none focus:border-purple-500 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
              <CustomSelect id="level" label="Education Level" options={LEVELS} value={filterLevel} onChange={setFilterLevel} />
              <CustomSelect id="stream" label="Academic Stream" options={STREAMS} value={filterStream} onChange={setFilterStream} />
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6">
               <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">NEP Compatibility</span>
                  <div className="w-10 h-5 bg-purple-600/30 rounded-full relative">
                     <div className="absolute right-1 top-1 w-3 h-3 bg-purple-500 rounded-full" />
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Preferred Mode</p>
                  <div className="flex gap-2">
                    {MODES.slice(1).map(m => (
                      <button key={m} onClick={() => setFilterMode(m)} className={`px-4 py-1.5 rounded-lg border text-[8px] font-black uppercase transition-all ${filterMode === m ? 'bg-purple-600 border-purple-500 text-white' : 'border-white/10 text-gray-500 hover:text-white'}`}>{m}</button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. DEGREE CARDS GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tight">Academic <span className="text-purple-500">Assets.</span></h2>
          <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em]">{filteredDegrees.length} Programs Mapped</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDegrees.map(degree => (
            <div 
              key={degree.id}
              onClick={() => setSelectedDegree(degree)}
              className="group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[48px] overflow-hidden hover:border-purple-500/40 transition-all duration-500 cursor-pointer shadow-xl relative"
            >
              {degree.trending && (
                <div className="absolute top-8 right-8 z-10">
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-2xl">TRENDING</span>
                </div>
              )}
              
              <div className="p-12 flex-grow flex flex-col">
                <div className="mb-10">
                  <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em] mb-3 block">{degree.level} • {degree.stream}</span>
                  <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-purple-400 transition-colors tracking-tighter">{degree.name}</h3>
                </div>

                <div className="space-y-6 mb-10">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Duration</p>
                        <p className="text-xs font-black text-white uppercase">{degree.duration}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Mode</p>
                        <p className="text-xs font-black text-white uppercase">{degree.mode}</p>
                      </div>
                   </div>
                   
                   <div>
                     <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-3">Core Subjects</p>
                     <div className="flex flex-wrap gap-2">
                        {degree.subjects.slice(0, 3).map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold text-gray-400 uppercase tracking-tight">{s}</span>)}
                     </div>
                   </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Entry Eligibility</p>
                      <p className="text-[9px] font-black text-gray-400 uppercase line-clamp-1">{degree.eligibility}</p>
                   </div>
                   <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-600 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C. DEGREE DETAIL VIEW (MODAL) */}
      {selectedDegree && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedDegree(null)} />
          
          <div className="relative w-full max-w-7xl h-full max-h-[92vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-2xl">
             
             {/* Left Col: Blueprint Stats */}
             <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-purple-600/[0.02]">
                <div className="space-y-14">
                   <div className="space-y-4">
                      <div className="inline-block px-3 py-1 bg-purple-600/20 border border-purple-600/40 text-purple-400 text-[9px] font-black uppercase tracking-widest rounded">Curriculum Dossier</div>
                      <h2 className="text-5xl font-black uppercase text-white leading-none tracking-tighter">{selectedDegree.name}</h2>
                      <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedDegree.stream} Division</p>
                   </div>

                   <div className="p-10 rounded-[48px] bg-black border border-white/5 space-y-8">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Entry Gate</p>
                         <p className="text-sm font-medium text-gray-200">{selectedDegree.eligibility}</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Format</p>
                         <p className="text-sm font-medium text-gray-200">{selectedDegree.duration} • {selectedDegree.mode}</p>
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">NEP-2020 Aligned</span>
                      </div>
                   </div>

                   <section className="space-y-6">
                      <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-purple-600 pl-6">Profile Build</h4>
                      <p className="text-sm text-gray-400 font-medium leading-relaxed italic">"{selectedDegree.description}"</p>
                   </section>
                </div>
             </div>

             {/* Right Col: Deep Navigation */}
             <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40">
                <div className="flex justify-end mb-10">
                   <button onClick={() => setSelectedDegree(null)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10">
                      <svg className="w-7 h-7 text-gray-500 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                </div>

                <div className="space-y-24">
                   <section className="space-y-12">
                      <div className="flex items-center gap-6">
                        <h4 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.5em] whitespace-nowrap">Academic Architecture</h4>
                        <div className="h-px flex-grow bg-white/10" />
                      </div>
                      <p className="text-gray-300 text-2xl font-medium leading-relaxed tracking-tight max-w-3xl">
                        {selectedDegree.curriculumOverview}
                      </p>
                      <div className="grid md:grid-cols-2 gap-10">
                         <div className="space-y-6">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Subject Mastery</p>
                            <div className="flex flex-wrap gap-3">
                               {selectedDegree.subjects.map(s => <span key={s} className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-black uppercase text-white tracking-widest">{s}</span>)}
                            </div>
                         </div>
                         <div className="space-y-6">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Skills Harvested</p>
                            <div className="flex flex-wrap gap-3">
                               {selectedDegree.skills.map(s => <span key={s} className="px-5 py-2.5 rounded-2xl bg-cyan-600/10 border border-cyan-600/20 text-xs font-black uppercase text-cyan-400 tracking-widest">{s}</span>)}
                            </div>
                         </div>
                      </div>
                   </section>

                   <section className="space-y-12">
                      <div className="flex items-center gap-6">
                        <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">Career Outcomes</h4>
                        <div className="h-px flex-grow bg-white/10" />
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                         {selectedDegree.outcomes.map(role => (
                           <div key={role} className="p-8 rounded-[32px] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/40 transition-all group cursor-pointer">
                              <h4 className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors mb-3 leading-tight">{role}</h4>
                              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Direct Placement Path</p>
                           </div>
                         ))}
                      </div>
                   </section>

                   {selectedDegree.exitOptions.length > 0 && (
                     <section className="space-y-12 p-16 rounded-[64px] bg-gradient-to-br from-purple-900/15 via-[#080808] to-[#080808] border border-purple-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-16 opacity-[0.05]">
                           <svg width="250" height="250" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                        </div>
                        <div className="relative z-10">
                           <h3 className="text-4xl font-black uppercase tracking-tighter mb-14">NEP <span className="text-purple-500">Multi-Exit</span> Roadmap</h3>
                           <div className="relative">
                              <div className="absolute top-10 bottom-10 left-4 w-px bg-white/10" />
                              <div className="space-y-10">
                                 {selectedDegree.exitOptions.map((opt, i) => (
                                   <div key={i} className="flex gap-10 items-start relative pl-4">
                                      <div className="w-10 h-10 rounded-2xl bg-black border border-purple-500/40 flex items-center justify-center text-[10px] font-black text-purple-400 shrink-0 z-10">E{i+1}</div>
                                      <div className="space-y-2">
                                         <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{opt.level} — {opt.timing}</p>
                                         <h4 className="text-xl font-black uppercase text-white tracking-tight">{opt.award}</h4>
                                         <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Eligible for Professional Re-entry</p>
                                      </div>
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </section>
                   )}

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                      <button onClick={() => onNavigate('mapping')} className="py-7 bg-purple-600 hover:bg-purple-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_70px_rgba(168,85,247,0.3)] transition-all active:scale-95">
                         Map This Degree to Careers
                      </button>
                      <button onClick={() => onNavigate('colleges')} className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                         Find Institutions Offering This
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* D. FINAL CROSS-LINKING PANEL */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Purpose-Built <br/><span className="gradient-text">Education.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't just collect degrees. Collect outcomes. Use the Soulmate AI to 
              verify the long-term ROI of your academic choices.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('explorer')} className="px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-purple-600/40 uppercase tracking-[0.2em] text-[10px]">
               View Careers by Degree
             </button>
             <button onClick={() => onNavigate('nsqf')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Analyze Skill Parity
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.4); }
        input::placeholder { color: #4a5568; }
      `}</style>
    </div>
  );
};

export default ExploreDegreesPage;
