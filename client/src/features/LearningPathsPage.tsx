import React, { useState, useMemo } from 'react';

type Tab = 'pathways' | 'nep' | 'nsqf';

interface SkillStep { title: string; nsqf: number; duration: string; outcomes: string[]; certs: string[]; }
interface Pathway { id: string; title: string; industry: string; demand: string; salaryRange: string; growth: string; steps: SkillStep[]; }

const PATHWAYS_DB: Pathway[] = [
  { id: 'cloud', title: 'Cloud Solutions Architect', industry: 'Technology', demand: 'High', salaryRange: '$120k-$250k', growth: '28% YoY', steps: [
    { title: 'Foundation', nsqf: 4, duration: '3 Mo', outcomes: ['Cloud Fundamentals', 'Networking'], certs: ['AWS Practitioner'] },
    { title: 'Core Technical', nsqf: 6, duration: '6 Mo', outcomes: ['Compute', 'Storage'], certs: ['Azure Associate'] },
    { title: 'Advanced', nsqf: 8, duration: '12 Mo', outcomes: ['Security Architecture', 'Serverless'], certs: ['Google Cloud Pro'] },
    { title: 'Professional', nsqf: 10, duration: 'Ongoing', outcomes: ['Ecosystem Management'], certs: ['Senior Architect'] },
  ]},
  { id: 'ev', title: 'EV Propulsion Expert', industry: 'Automotive', demand: 'Emerging', salaryRange: '$80k-$160k', growth: '45% YoY', steps: [
    { title: 'Foundation', nsqf: 3, duration: '4 Mo', outcomes: ['Electrical Safety', 'Battery'], certs: ['EV Safety'] },
    { title: 'Core', nsqf: 5, duration: '8 Mo', outcomes: ['Motor Control', 'Thermal'], certs: ['BMS Specialist'] },
    { title: 'Advanced', nsqf: 7, duration: '12 Mo', outcomes: ['Regen Braking'], certs: ['Propulsion Master'] },
    { title: 'Professional', nsqf: 9, duration: 'Ongoing', outcomes: ['Vehicle Integration'], certs: ['Certified EV Eng'] },
  ]},
  { id: 'ux', title: 'Cognitive UX Designer', industry: 'Creative', demand: 'Medium', salaryRange: '$95k-$180k', growth: '15% YoY', steps: [
    { title: 'Foundation', nsqf: 4, duration: '2 Mo', outcomes: ['Design Principles'], certs: ['Design Thinking'] },
    { title: 'Core', nsqf: 6, duration: '6 Mo', outcomes: ['Interaction Design'], certs: ['HCI Associate'] },
    { title: 'Advanced', nsqf: 8, duration: '10 Mo', outcomes: ['Cognitive Analysis'], certs: ['Senior UX'] },
    { title: 'Professional', nsqf: 10, duration: 'Ongoing', outcomes: ['Product Vision'], certs: ['Certified Lead'] },
  ]},
];

const NEP_FEATURES = [
  { icon: '🎓', title: 'Multi-Exit', desc: 'Leave at Year 1 (Certificate), Year 2 (Diploma), Year 3 (Degree), or Year 4 (Honors).' },
  { icon: '🏦', title: 'Academic Bank of Credits', desc: 'Store and transfer credits across institutions with ABC.' },
  { icon: '📚', title: 'Multidisciplinary', desc: 'Choose majors and minors across Science + Arts + Commerce.' },
  { icon: '🔬', title: 'Research Focus', desc: 'Integrated research from UG level with M.Phil and Ph.D pathways.' },
  { icon: '🌍', title: 'Mother Tongue Education', desc: 'Higher education in regional languages alongside English.' },
  { icon: '⚡', title: '5+3+3+4 Structure', desc: 'K-12: Foundational (5), Preparatory (3), Middle (3), Secondary (4).' },
];

const NSQF_LEVELS = [
  { level: 1, title: 'Basic Awareness', desc: 'Simple tasks under supervision.', edu: 'Class 8', color: 'bg-gray-500' },
  { level: 2, title: 'Task Performer', desc: 'Defined tasks, limited supervision.', edu: 'Class 10 / ITI Entry', color: 'bg-gray-400' },
  { level: 3, title: 'Skilled Worker', desc: 'Independent standard procedures.', edu: 'Class 12 / ITI Cert', color: 'bg-blue-600' },
  { level: 4, title: 'Supervisor', desc: 'Guide others in routine tasks.', edu: 'UG Year 1 / Diploma', color: 'bg-blue-500' },
  { level: 5, title: 'Technician', desc: 'Solve non-routine problems.', edu: 'UG Year 2', color: 'bg-cyan-500' },
  { level: 6, title: 'Advanced Technician', desc: 'Analyze and improve processes.', edu: "Bachelor's Degree", color: 'bg-cyan-400' },
  { level: 7, title: 'Professional', desc: 'Strategic problem resolution.', edu: "Master's / PG Diploma", color: 'bg-purple-500' },
  { level: 8, title: 'Expert', desc: 'Generate new knowledge.', edu: 'M.Phil / Doctorate', color: 'bg-purple-400' },
  { level: 9, title: 'Specialist', desc: 'Lead research and policy.', edu: 'Doctoral Research', color: 'bg-red-500' },
  { level: 10, title: 'Thought Leader', desc: 'Pioneer global discoveries.', edu: 'Post-Doctoral', color: 'bg-red-400' },
];

const LearningPathsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<Tab>('pathways');
  const [activePathwayId, setActivePathwayId] = useState(PATHWAYS_DB[0].id);
  const activePathway = useMemo(() => PATHWAYS_DB.find(p => p.id === activePathwayId) || PATHWAYS_DB[0], [activePathwayId]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans">
      {/* HERO */}
      <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 border-b border-white/10">
        <div className="absolute inset-0 z-0"><div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-600/5 blur-[180px] rounded-full" /></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">LEARNING INTELLIGENCE ENGINE</div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 md:mb-8 lg:mb-10">Learning <br/><span className="gradient-text">Paths.</span></h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-8 md:mb-12 lg:mb-16">Skill pathways, NEP 2020, and NSQF levels — your complete guide to structured learning.</p>
          <div className="flex justify-center gap-4">
            {(['pathways', 'nep', 'nsqf'] as Tab[]).map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`px-8 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-sm transition-all border ${activeTab === t ? 'bg-blue-600 border-blue-400 text-white shadow-xl' : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'}`}>
                {t === 'pathways' ? 'Skill Pathways' : t === 'nep' ? 'NEP 2020' : 'NSQF Framework'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 md:py-20 md:px-6 max-w-7xl mx-auto">
        {activeTab === 'pathways' && (
          <div className="grid lg:grid-cols-4 gap-5 md:p-8 lg:p-12">
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs font-black text-gray-300 uppercase tracking-[0.4em] mb-6">Select Career Goal</h3>
              {PATHWAYS_DB.map(p => (
                <button key={p.id} onClick={() => setActivePathwayId(p.id)} className={`w-full p-6 rounded-2xl text-left border transition-all ${activePathwayId === p.id ? 'bg-blue-600/10 border-blue-500' : 'bg-white/5 border-white/10 hover:border-white/30'}`}>
                  <span className="text-sm font-black text-blue-400 uppercase tracking-widest">{p.industry}</span>
                  <h4 className="text-sm font-black uppercase text-white mt-1">{p.title}</h4>
                </button>
              ))}
            </div>
            <div className="lg:col-span-3">
              <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-10 lg:mb-12 gap-6">
                <div><h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Journey.</span></h2><p className="text-gray-300 text-xs font-black uppercase tracking-[0.4em] mt-1">{activePathway.title}</p></div>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-6">
                  <div><p className="text-sm font-black text-gray-400 uppercase">Salary</p><p className="text-xs font-black text-white">{activePathway.salaryRange}</p></div>
                  <div className="w-px h-8 bg-white/10" />
                  <div><p className="text-sm font-black text-gray-400 uppercase">Growth</p><p className="text-xs font-black text-blue-400">{activePathway.growth}</p></div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 opacity-20" />
                <div className="space-y-12">
                  {activePathway.steps.map((step, idx) => (
                    <div key={idx} className={`relative flex flex-col md:flex-row items-start gap-5 md:p-8 lg:p-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-black border-2 border-blue-500/50 flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <span className="text-sm font-black text-gray-300 uppercase">NSQF</span>
                        <span className="text-xl font-black text-white">{step.nsqf}</span>
                      </div>
                      <div className="w-full md:w-[45%] p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-xs font-black text-blue-500 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-full">Phase 0{idx+1}</span>
                          <h3 className="text-xl font-black uppercase text-white tracking-tight">{step.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">{step.outcomes.map(o => <span key={o} className="px-3 py-1.5 rounded-xl bg-white/5 text-xs font-bold text-gray-300 uppercase">{o}</span>)}</div>
                        <div className="flex justify-between"><div><p className="text-sm font-black text-gray-400 uppercase mb-1">Duration</p><p className="text-sm font-black text-white">{step.duration}</p></div><div><p className="text-sm font-black text-gray-400 uppercase mb-1">Credential</p><p className="text-sm font-black text-cyan-400">{step.certs[0]}</p></div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nep' && (
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6">National Education <span className="text-emerald-500">Policy 2020.</span></h2>
            <p className="text-gray-200 text-lg font-medium leading-relaxed mb-8 md:mb-12 lg:mb-16 max-w-3xl">India's transformative education framework: flexible, multi-disciplinary, and research-driven.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:p-8 lg:p-10">
              {NEP_FEATURES.map((item, i) => (
                <div key={i} className="p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 transition-all group">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-black uppercase text-white mb-4 group-hover:text-emerald-400 transition-colors tracking-tight">{item.title}</h3>
                  <p className="text-gray-200 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-20 p-6 md:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-emerald-900/15 via-[#080808] to-[#080808] border border-emerald-500/20">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-14">NEP <span className="text-emerald-500">Multi-Exit</span> Roadmap</h3>
              <div className="space-y-10">
                {[{ l: 'Year 1', a: 'UG Certificate', t: '40 Credits' }, { l: 'Year 2', a: 'UG Diploma', t: '80 Credits' }, { l: 'Year 3', a: "Bachelor's Degree", t: '120 Credits' }, { l: 'Year 4', a: 'Honours / Research', t: '160 Credits' }].map((opt, i) => (
                  <div key={i} className="flex gap-5 md:p-8 lg:p-10 items-start pl-4">
                    <div className="w-10 h-10 rounded-2xl bg-black border border-emerald-500/40 flex items-center justify-center text-xs font-black text-emerald-400 shrink-0">E{i+1}</div>
                    <div><p className="text-xs font-black text-gray-300 uppercase tracking-widest">{opt.l} — {opt.t}</p><h4 className="text-xl font-black uppercase text-white tracking-tight">{opt.a}</h4></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nsqf' && (
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-6">National Skills <span className="text-purple-500">Qualification Framework.</span></h2>
            <p className="text-gray-200 text-lg font-medium leading-relaxed mb-8 md:mb-12 lg:mb-16 max-w-3xl">A 10-level competency framework mapping every skill from basic awareness to thought leadership.</p>
            <div className="space-y-4">
              {NSQF_LEVELS.map(item => (
                <div key={item.level} className="flex items-stretch gap-6 group">
                  <div className="w-20 shrink-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white font-black text-2xl shadow-2xl group-hover:scale-110 transition-transform`}>{item.level}</div>
                  </div>
                  <div className="flex-grow p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div><h3 className="text-lg font-black uppercase text-white tracking-tight group-hover:text-purple-400 transition-colors">{item.title}</h3><p className="text-gray-200 text-sm mt-1">{item.desc}</p></div>
                      <div className="shrink-0"><p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Education</p><p className="text-xs font-black text-purple-400 uppercase">{item.edu}</p></div>
                    </div>
                    <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className={`h-full ${item.color}`} style={{ width: `${item.level * 10}%` }} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default LearningPathsPage;
