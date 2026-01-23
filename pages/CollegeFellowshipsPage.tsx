
import React, { useState, useMemo } from 'react';

interface Fellowship {
  id: string;
  name: string;
  provider: string;
  category: 'National' | 'International';
  objective: string;
  funding: string;
  duration: string;
  deadline: string;
  applicationSteps: string[];
  alumniSuccess: { name: string; year: string; outcome: string }[];
  eligibilityScore: number; // Aggregate institution readiness
}

interface Candidate {
  id: string;
  name: string;
  assessmentData: string;
  researchInterest: string;
  facultyRecommendation: 'Strong' | 'Average' | 'Pending';
  matchIndex: number;
}

const FELLOWSHIPS_DB: Fellowship[] = [
  {
    id: 'rhodes_2025',
    name: 'Rhodes Scholarship',
    provider: 'Oxford University',
    category: 'International',
    objective: 'The Rhodes Scholarship is a fully funded, full-time, post-graduate award which enables talented young people from around the world to study at the University of Oxford.',
    funding: 'Full Tuition + £19,000 Annual Stipend + Flights',
    duration: '2-3 Years',
    deadline: 'October 2025',
    applicationSteps: [
      'Institutional Endorsement Letter',
      'Personal Statement (1000 words)',
      '6 Letters of Recommendation',
      'Final Interview at Regional Centre'
    ],
    alumniSuccess: [
      { name: 'Dr. Siddharth V.', year: '2021', outcome: 'PhD in AI Ethics, Oxford' }
    ],
    eligibilityScore: 78
  },
  {
    id: 'pmrf_2025',
    name: 'PMRF (Prime Minister\'s Research Fellowship)',
    provider: 'Government of India',
    category: 'National',
    objective: 'Designed for improving the quality of research in various higher educational institutions in the country.',
    funding: '₹70,000 - ₹80,000 / Month + Research Grant',
    duration: '5 Years (Integrated PhD)',
    deadline: 'Ongoing (Cycles)',
    applicationSteps: [
      'GATE/NET Verification',
      'Detailed Research Abstract',
      'Interview by Central Nodal Committee'
    ],
    alumniSuccess: [
      { name: 'Ananya S.', year: '2023', outcome: 'Lead Researcher, IIT Madras' }
    ],
    eligibilityScore: 92
  },
  {
    id: 'schwarzman_2025',
    name: 'Schwarzman Scholars',
    provider: 'Tsinghua University',
    category: 'International',
    objective: 'Global leadership program designed to prepare the next generation of global leaders to respond to the geopolitical landscape of the 21st century.',
    funding: 'Full Scholarship + Living Expenses',
    duration: '1 Year',
    deadline: 'September 2025',
    applicationSteps: [
      'Leadership Essay',
      'Current Affairs Video Prompt',
      'Three Letters of Reference'
    ],
    alumniSuccess: [
      { name: 'Rohan M.', year: '2022', outcome: 'Policy Lead, UN High Commission' }
    ],
    eligibilityScore: 65
  }
];

const CANDIDATE_POOL: Candidate[] = [
  { id: 'c1', name: 'Alex Johnson', assessmentData: 'Top 1% Logical Reasoning', researchInterest: 'Neural Architectures', facultyRecommendation: 'Strong', matchIndex: 96 },
  { id: 'c2', name: 'Maria Garcia', assessmentData: 'Top 5% Analytical', researchInterest: 'Bio-Digital Ethics', facultyRecommendation: 'Strong', matchIndex: 88 },
  { id: 'c3', name: 'Sam Chen', assessmentData: 'Top 10% Verbal', researchInterest: 'Global Geopolitics', facultyRecommendation: 'Average', matchIndex: 74 }
];

const CollegeFellowshipsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedFellowshipId, setSelectedFellowshipId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'candidates' | 'mentorship'>('dashboard');

  const selectedFellowship = useMemo(() => FELLOWSHIPS_DB.find(f => f.id === selectedFellowshipId), [selectedFellowshipId]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. FELLOWSHIP DASHBOARD (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black tracking-widest uppercase">
                ELITE OPPORTUNITY CONSOLE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Global <br /><span className="gradient-text">Fellowships.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Nurturing the next generation of global leaders and researchers. Strategic 
                orchestration of high-impact opportunities for your top-decile students.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Total Programs', v: 18, c: 'purple' },
                 { l: 'Active Aspirants', v: 42, c: 'blue' },
                 { l: 'Global Reach', v: '12 Countries', c: 'cyan' },
                 { l: 'Mentors Assigned', v: 14, c: 'emerald' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-purple-500/30 transition-all">
                    <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <div className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex gap-4">
          {['dashboard', 'candidates', 'mentorship'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-purple-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* DASHBOARD CONTENT */}
      {activeTab === 'dashboard' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="p-12 rounded-[56px] bg-indigo-600/5 border border-indigo-500/20 relative overflow-hidden group">
                 <h3 className="text-2xl font-black uppercase mb-4">National <span className="text-indigo-400">Pillar.</span></h3>
                 <p className="text-gray-400 text-sm font-medium mb-10">Tracking PMRF, KVPY, and CSIR-JRF opportunities.</p>
                 <div className="space-y-4">
                    {FELLOWSHIPS_DB.filter(f => f.category === 'National').map(f => (
                      <div key={f.id} onClick={() => setSelectedFellowshipId(f.id)} className="p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-indigo-500/40 transition-all cursor-pointer flex justify-between items-center">
                         <span className="text-sm font-black uppercase text-white">{f.name}</span>
                         <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Apply by {f.deadline}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="p-12 rounded-[56px] bg-purple-600/5 border border-purple-500/20 relative overflow-hidden group">
                 <h3 className="text-2xl font-black uppercase mb-4">International <span className="text-purple-400">Gateway.</span></h3>
                 <p className="text-gray-400 text-sm font-medium mb-10">Ivy League, Rhodes, and Fulbright pathways.</p>
                 <div className="space-y-4">
                    {FELLOWSHIPS_DB.filter(f => f.category === 'International').map(f => (
                      <div key={f.id} onClick={() => setSelectedFellowshipId(f.id)} className="p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-purple-500/40 transition-all cursor-pointer flex justify-between items-center">
                         <span className="text-sm font-black uppercase text-white">{f.name}</span>
                         <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest">Apply by {f.deadline}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Detail View Overlay */}
           {selectedFellowship && (
             <div className="p-16 rounded-[64px] bg-[#0a0a0a] border border-white/10 shadow-2xl animate-in zoom-in duration-500 relative overflow-hidden">
                <button onClick={() => setSelectedFellowshipId(null)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:text-red-500 transition-colors">✕</button>
                
                <div className="grid lg:grid-cols-2 gap-24">
                   <div className="space-y-12">
                      <div className="space-y-4">
                         <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.4em]">{selectedFellowship.category} Fellowship</span>
                         <h2 className="text-4xl font-black uppercase text-white tracking-tighter leading-tight">{selectedFellowship.name}</h2>
                         <p className="text-gray-500 text-xs font-black uppercase tracking-widest">{selectedFellowship.provider}</p>
                      </div>
                      
                      <div className="p-8 rounded-[40px] bg-purple-600/10 border border-purple-500/30">
                         <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-4">Funding & Stipend</p>
                         <p className="text-xl font-black text-white italic">"{selectedFellowship.funding}"</p>
                      </div>

                      <section className="space-y-6">
                         <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Core Objective</h4>
                         <p className="text-gray-400 text-lg font-medium leading-relaxed italic">{selectedFellowship.objective}</p>
                      </section>
                   </div>

                   <div className="space-y-12">
                      <section className="space-y-8">
                         <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Application Protocol</h4>
                         <div className="space-y-4">
                            {selectedFellowship.applicationSteps.map((step, i) => (
                              <div key={i} className="flex gap-6 items-start">
                                 <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 text-xs font-black shrink-0">0{i+1}</div>
                                 <p className="text-sm font-black uppercase text-gray-300">{step}</p>
                              </div>
                            ))}
                         </div>
                      </section>

                      <section className="p-10 rounded-[48px] bg-emerald-600/5 border border-emerald-500/20 relative overflow-hidden">
                         <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-8">Institutional Success</h4>
                         <div className="space-y-6">
                            {selectedFellowship.alumniSuccess.map((alum, i) => (
                              <div key={i} className="flex justify-between items-center">
                                 <div className="space-y-1">
                                    <p className="text-sm font-black uppercase text-white">{alum.name}</p>
                                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Class of {alum.year}</p>
                                 </div>
                                 <span className="text-[10px] font-black text-emerald-400 uppercase">{alum.outcome}</span>
                              </div>
                            ))}
                         </div>
                      </section>
                   </div>
                </div>
             </div>
           )}
        </section>
      )}

      {/* CANDIDATES TAB */}
      {activeTab === 'candidates' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-right duration-500">
           <div className="mb-20">
              <h2 className="text-3xl font-black uppercase tracking-tight">AI Candidate <span className="text-blue-500">Matching.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Shortlisting aspirants based on cognitive & research data</p>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {CANDIDATE_POOL.map(c => (
                <div key={c.id} className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
                   <div className="flex items-center gap-10 flex-grow">
                      <div className="w-20 h-20 rounded-[32px] bg-blue-600/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">👤</div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-black uppercase text-white group-hover:text-blue-400 transition-colors">{c.name}</h3>
                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{c.researchInterest}</p>
                         <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">{c.assessmentData}</p>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-center md:text-right">
                      <div>
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Match Index</p>
                         <p className={`text-2xl font-black ${c.matchIndex > 90 ? 'text-emerald-500' : 'text-blue-500'}`}>{c.matchIndex}%</p>
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Faculty Rec</p>
                         <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                           c.facultyRecommendation === 'Strong' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-600'
                         }`}>{c.facultyRecommendation}</span>
                      </div>
                      <button className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-blue-600 hover:text-white transition-all shadow-xl">Assign Mentor</button>
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* MENTORSHIP TAB */}
      {activeTab === 'mentorship' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-left duration-500">
           <div className="grid lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                 <h2 className="text-3xl font-black uppercase tracking-tight">Mentorship <span className="text-emerald-500">Protocol.</span></h2>
                 <p className="text-gray-400 text-lg leading-relaxed">
                    Fellowships aren't won alone. We facilitate the connection between high-potential 
                    students and expert faculty advisors for essay reviews and interview prep.
                 </p>
                 <div className="grid gap-6">
                    {[
                       { t: "Faculty Dashboard", d: "Enable professors to review student essays and track recommendation requests.", i: "📋" },
                       { t: "Application Tracker", d: "Step-by-step visibility into the fellowship submission pipeline.", i: "🏗️" },
                       { t: "Essay Support AI", d: "Real-time logic checking and narrative structure enhancement for personal statements.", i: "🖋️" }
                    ].map((item, i) => (
                       <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex gap-8 items-start group">
                          <div className="text-3xl group-hover:scale-125 transition-transform">{item.i}</div>
                          <div className="space-y-2">
                             <h4 className="text-sm font-black uppercase text-white">{item.t}</h4>
                             <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-emerald-600/5 blur-[120px] rounded-full" />
                 <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
                    <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-12 text-center">Active Guidance Loop</h4>
                    <div className="space-y-10">
                       {[
                          { label: 'Essay Refinement', val: 74, color: 'bg-blue-600' },
                          { label: 'Interview Readiness', val: 42, color: 'bg-emerald-600' },
                          { label: 'Document Verification', val: 100, color: 'bg-purple-600' }
                       ].map((item, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black uppercase text-white tracking-widest">{item.label}</span>
                              <span className="text-lg font-black text-white">{item.val}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color} shadow-[0_0_10px_currentColor] transition-all duration-1500`} style={{ width: `${item.val}%` }} />
                           </div>
                        </div>
                       ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                       <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Schedule Review Session →</button>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Nurturing <br/><span className="gradient-text">Future Titans.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Placements are for today. Fellowships are for a lifetime. Career Soulmate 
              gives your institution the precision to identify and empower tomorrow's 
              global visionaries.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => setActiveTab('candidates')} className="px-12 py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-purple-600/40 uppercase tracking-[0.2em] text-[10px]">
               Launch Global Aspirant Matcher
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Configure Institutional Mentors
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #a855f7 1px, transparent 1px),
                            linear-gradient(to bottom, #a855f7 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default CollegeFellowshipsPage;
