
import React, { useState } from 'react';

interface PathwayStep {
  year: number;
  label: string;
  award: string;
  credits: number;
  skills: string[];
  careers: string[];
  color: string;
}

const NEP_LADDER: PathwayStep[] = [
  {
    year: 1,
    label: "FOUNDATION YEAR",
    award: "Undergraduate Certificate",
    credits: 40,
    skills: ["Core Subject Fundamentals", "Digital Literacy", "Critical Thinking"],
    careers: ["Junior Technician", "Support Associate", "Field Assistant"],
    color: "blue"
  },
  {
    year: 2,
    label: "DIPLOMA YEAR",
    award: "Undergraduate Diploma",
    credits: 80,
    skills: ["Specialized Subject Depth", "Applied Soft Skills", "Technical Competency"],
    careers: ["Executive Associate", "Specialized Operator", "Client Liaison"],
    color: "cyan"
  },
  {
    year: 3,
    label: "DEGREE YEAR",
    award: "Bachelor's Degree",
    credits: 120,
    skills: ["Advanced Discipline Mastery", "Problem Solving", "Strategic Execution"],
    careers: ["Professional Analyst", "Department Lead", "Operational Manager"],
    color: "indigo"
  },
  {
    year: 4,
    label: "HONOURS / RESEARCH",
    award: "Bachelor's with Honours/Research",
    credits: 160,
    skills: ["Academic Research", "Innovations", "Strategic Leadership"],
    careers: ["Research Scientist", "Academic Consultant", "Innovation Lead"],
    color: "purple"
  }
];

const SCENARIOS = [
  {
    title: "THE CAREER PAUSE",
    scenario: "Exit after Year 2",
    logic: "Secure a Diploma + 80 Credits in your Academic Bank of Credits (ABC).",
    outcome: "Work for 2 years as a Technician, then re-enter Year 3 seamlessly at any university.",
    icon: "⏸️"
  },
  {
    title: "THE MAJOR PIVOT",
    scenario: "Interdisciplinary Switch",
    logic: "Use 1st year foundation credits to switch from Science to Humanities.",
    outcome: "Credits are transferred; you don't lose academic time. Multi-disciplinary flexibility.",
    icon: "🔄"
  },
  {
    title: "LIFELONG LEARNING",
    scenario: "The Credit Accumulator",
    logic: "Combine credits from MOOCs (Swayam), offline college, and skill certs.",
    outcome: "Earn a degree at your own pace. The platform manages your ABC compliance.",
    icon: "♾️"
  }
];

const COMBOS = [
  { name: "CS + Psychology", career: "User Experience (UX) Psychologist", synergy: 94 },
  { name: "Business + Data Science", career: "FinTech Strategist", synergy: 88 },
  { name: "Biology + AI", career: "Computational Biologist", synergy: 91 },
  { name: "Arts + Web Tech", career: "Digital Heritage Conservator", synergy: 82 }
];

interface NepPathwaysPageProps {
  onNavigate: (page: any) => void;
}

const NepPathwaysPage: React.FC<NepPathwaysPageProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-32 animate-in fade-in duration-700 font-sans">
      
      {/* A. NEP OVERVIEW SECTION */}
      <section className="relative pt-24 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full -top-40 -left-40" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
            NEP-2020 ARCHITECTURE
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-10 uppercase tracking-tighter leading-[0.9]">
            Education <span className="gradient-text">Unbound.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-16">
            The New Education Policy (NEP) 2020 introduces a radical flexibility. 
            No more "Degree Dead-Ends". Explore the modular future of learning.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: "Multi Entry/Exit", desc: "No degree dropouts. Only pauses.", icon: "🚪" },
              { label: "Credit Bank", desc: "Digital locker for your knowledge.", icon: "🏦" },
              { label: "Interdisciplinary", desc: "Mix Science, Arts & Commerce.", icon: "🧪" },
              { label: "Skill-First", desc: "Industry outcomes at every stage.", icon: "🎯" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-[11px] font-black uppercase text-white tracking-widest mb-2">{item.label}</h4>
                <p className="text-[9px] text-gray-500 font-black uppercase leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B. NEP EDUCATION PATHWAY VISUAL (MAIN) */}
      <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-black uppercase tracking-tight">The <span className="text-blue-500">Academic Ladder</span></h2>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Visualizing the 4-Year Journey</p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Vertical/Horizontal Ladder Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 opacity-20 hidden lg:block" />

          <div className="space-y-24 relative z-10 w-full max-w-5xl">
            {NEP_LADDER.map((step, i) => (
              <div 
                key={i} 
                className={`flex flex-col lg:flex-row items-center gap-12 group ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                onMouseEnter={() => setActiveStep(step.year)}
              >
                <div className={`lg:w-1/2 text-center ${i % 2 !== 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 block">Stage 0{step.year}</span>
                   <h3 className="text-3xl font-black uppercase text-white mb-4 group-hover:text-blue-400 transition-colors">{step.label}</h3>
                   <p className="text-blue-500 font-black uppercase text-xs tracking-widest">{step.award}</p>
                </div>

                <div className="relative shrink-0">
                  <div className={`w-16 h-16 rounded-[20px] bg-black border-2 border-${step.color}-500 flex items-center justify-center font-black text-xl transition-all shadow-[0_0_30px_rgba(59,130,246,0.1)] group-hover:scale-110 group-hover:bg-${step.color}-500/20`}>
                    {step.year}
                  </div>
                </div>

                <div className={`lg:w-1/2 p-10 rounded-[40px] bg-white/[0.02] border border-white/5 transition-all duration-500 ${activeStep === step.year ? `border-${step.color}-500/40 bg-${step.color}-600/5` : 'hover:border-white/20'}`}>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Target Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {step.skills.map(s => <span key={s} className="px-2 py-1 rounded-md bg-white/5 text-[8px] font-bold text-gray-400 uppercase tracking-wider">{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3">Job Readiness</p>
                      <ul className="space-y-1">
                        {step.careers.map(c => <li key={c} className="text-[9px] font-black text-white uppercase tracking-widest">• {c}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Credit Requirement</span>
                    <span className="text-lg font-black text-blue-500">{step.credits} Units</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C. EXIT & RE-ENTRY SCENARIOS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tight">Pause, Play, <span className="text-blue-500">Pivot.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">The Multi-Entry & Multi-Exit Logic</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SCENARIOS.map((s, i) => (
              <div key={i} className="group p-10 rounded-[48px] bg-white/[0.01] border border-white/5 hover:bg-blue-600/5 hover:border-blue-500/30 transition-all duration-500">
                <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h4 className="text-lg font-black uppercase text-white mb-2">{s.title}</h4>
                <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6">{s.scenario}</p>
                
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                    <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Policy Logic</p>
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">{s.logic}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                    <p className="text-[8px] font-black text-blue-400 uppercase mb-2">Career Outcome</p>
                    <p className="text-[11px] text-white font-medium leading-relaxed">{s.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. INTERDISCIPLINARY PATHWAYS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">Mix Your <br/><span className="gradient-text">Majors & Minors.</span></h2>
            <p className="text-gray-400 font-medium leading-relaxed mb-10 text-lg">
              NEP eliminates hard silos between Science, Arts, and Commerce. 
              Our AI evaluates cross-domain synergy to find hybrid careers that didn't exist 5 years ago.
            </p>
            
            <div className="space-y-4">
              {COMBOS.map(combo => (
                <div key={combo.name} className="flex items-center gap-6 p-6 rounded-[32px] bg-white/[0.02] border border-white/5 group hover:border-blue-500/20 transition-all">
                  <div className="flex-grow">
                    <h4 className="text-sm font-black uppercase text-white mb-1">{combo.name}</h4>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Hybrid Goal: <span className="text-blue-400">{combo.career}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Synergy</p>
                    <p className="text-lg font-black text-white">{combo.synergy}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full" />
            <div className="p-12 rounded-[60px] border border-white/10 bg-[#080808] relative z-10 text-center">
               <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Neural Matching</h3>
               <h2 className="text-3xl font-black uppercase mb-8 leading-none">Find Your Hybrid</h2>
               
               <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Major Choice</p>
                    <select className="bg-transparent text-white font-black uppercase text-xs outline-none w-full">
                      <option>Computer Science</option>
                      <option>Biology</option>
                      <option>Commerce</option>
                    </select>
                 </div>
                 <div className="p-6 rounded-3xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[8px] font-black text-gray-500 uppercase mb-2">Minor Choice</p>
                    <select className="bg-transparent text-white font-black uppercase text-xs outline-none w-full">
                      <option>Psychology</option>
                      <option>Statistics</option>
                      <option>Classical Arts</option>
                    </select>
                 </div>
               </div>

               <button className="w-full py-5 bg-blue-600 rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-2xl shadow-blue-600/40">
                 Analyze Outcomes
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* F. CREDIT TRANSFER & FLEXIBILITY (ADVANCED) */}
      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-[#080808] to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">The Academic <br/><span className="text-blue-500">Bank of Credits (ABC).</span></h2>
              <div className="space-y-6">
                 {[
                   { t: "Seamless Mobility", d: "Credits follow you. Transfer between national or international universities without friction." },
                   { t: "Digital Sovereignty", d: "You own your academic data. Verifiable through Blockchain-based verification." },
                   { t: "MOOC Integration", d: "Earn up to 40% of your degree credits through online platforms like SWAYAM/Coursera." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6 items-start group">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-white mb-1">{item.t}</h4>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div className="p-12 rounded-[50px] bg-white/[0.02] border border-white/5 relative flex items-center justify-center min-h-[400px]">
               <div className="absolute inset-0 p-12 opacity-[0.05]">
                 <svg width="100%" height="100%" viewBox="0 0 400 300"><path d="M50,250 Q100,50 350,250" stroke="white" strokeWidth="2" fill="none" strokeDasharray="10,10" /></svg>
               </div>
               <div className="text-center relative z-10 space-y-4">
                  <div className="w-24 h-24 rounded-[32px] bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <h3 className="text-xl font-black uppercase text-white">Credit Syncing</h3>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest max-w-xs mx-auto">
                    Platform integrated directly with DigiLocker and National Academic Depository (NAD).
                  </p>
                  <div className="flex justify-center gap-2 pt-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Real-time sync active</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 leading-[1.1] tracking-tighter">
             Plan Your <span className="gradient-text">Evolution.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('explorer')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Simulate My NEP Pathway
             </button>
             <button className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               View NSQF Skill Standards
             </button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default NepPathwaysPage;
