
import React from 'react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'about') => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const team = [
    {
      name: "Ritesh Kumar Lenka",
      role: "ML Developer",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
      desc: "Responsible for designing and implementing AI/ML models including career recommendation systems, skill-job matching, psychometric scoring, and data-driven intelligence pipelines.",
      skills: ["Machine Learning", "Recommendation Systems", "Python", "Data Analysis"]
    },
    {
      name: "Mayank Mishra",
      role: "Backend Developer",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
      desc: "Leads backend architecture, API development, authentication systems, and scalable server-side logic ensuring secure and high-performance platform operations.",
      skills: ["FastAPI", "Node.js", "REST APIs", "System Architecture"]
    },
    {
      name: "Lipsita Mishra",
      role: "UI Designer & Database Designer",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      desc: "Designs intuitive user interfaces and structured databases, ensuring seamless user experience, data integrity, and scalable schema design.",
      skills: ["UI/UX Design", "Database Design", "PostgreSQL", "User Research"]
    }
  ];

  const roadmap = [
    { phase: "Phase 1", title: "Career & College Intelligence", desc: "Core mapping of 10k+ institutions and career trees." },
    { phase: "Phase 2", title: "Skilling & Vocational AI", desc: "NSQF level integration and stackable micro-credentialing." },
    { phase: "Phase 3", title: "Institutional Automation", desc: "AI Timetabling and NEP compliance tools for colleges." },
    { phase: "Phase 4", title: "Policy Analytics", desc: "State-level dashboards for skill supply/demand intelligence." }
  ];

  return (
    <div className="bg-[#050505] text-white overflow-hidden animate-in fade-in duration-700">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* New Background Image with higher visibility (30% opacity) */}
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale brightness-[0.5]" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/95 to-transparent" />
          <div className="absolute inset-0 bg-blue-500/5 mix-blend-color-dodge" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase backdrop-blur-md animate-pulse">
              National Scale Intelligence
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] uppercase tracking-tighter">
              About <br /><span className="gradient-text">Career<br/>Soulmate</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              CareerSoulmate is an AI-Powered Career, Education & Skill Intelligence Platform built for national-scale impact. We bridge the gap between human ambition and market reality—aligned with NEP 2020.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-transparent" />
                  <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">Decision Authority</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-cyan-500 to-transparent" />
                  <span className="text-xs font-black text-cyan-500 uppercase tracking-[0.3em]">Neural Matching</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-12 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
                  <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.3em]">Explainable AI</span>
               </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative scale-110">
             <div className="w-full max-w-lg aspect-square relative">
                <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full" />
                <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
                  <circle cx="200" cy="200" r="60" className="fill-blue-500/5 stroke-blue-500/20" strokeWidth="1" strokeDasharray="5,5" />
                  <circle cx="200" cy="200" r="40" className="fill-blue-500/10 stroke-blue-500/30" strokeWidth="2" />
                  <circle cx="200" cy="200" r="120" className="fill-none stroke-white/5 animate-spin-slow" strokeWidth="1" strokeDasharray="10,20" />
                  <g className="stroke-blue-400/30 fill-none" strokeWidth="1.5">
                    <path d="M200,160 L200,80 L280,40" className="animate-path" />
                    <path d="M200,160 L140,100 L60,100" className="animate-path" />
                    <path d="M240,200 L320,200 L360,160" className="animate-path" />
                    <path d="M160,200 L80,200 L40,240" className="animate-path" />
                    <path d="M200,240 L200,320 L120,360" className="animate-path" />
                  </g>
                  <circle cx="200" cy="200" r="10" fill="#3b82f6" className="animate-ping opacity-20" />
                  <circle cx="200" cy="200" r="4" fill="#3b82f6" />
                </svg>
             </div>
          </div>
        </div>
      </section>

      {/* 2. THE VISION & PROBLEM STATEMENT */}
      <section className="py-32 px-6 border-y border-white/10 relative bg-[#060606]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div>
              <h3 className="text-xs font-black tracking-[0.5em] text-blue-500 uppercase mb-4">The Crisis We Solve</h3>
              <h2 className="text-5xl font-black uppercase mb-8 tracking-tighter">Why We <span className="text-red-500/30">Exist.</span></h2>
              <p className="text-gray-200 font-medium leading-relaxed mb-12">
                Traditional career guidance is fragmented, static, and disconnected from the real economy. CareerSoulmate solves three systemic failures in the education-to-employment pipeline:
              </p>
            </div>
            <div className="space-y-6">
                {[
                  { t: "Student Misalignment", d: "70% of graduates realize they've chosen the wrong field only after entering the workforce, leading to massive productivity loss." },
                  { t: "The Employability Gap", d: "Degrees are becoming 'lagging indicators' of skill. 80% of recruiters struggle to find candidates with industry-ready competencies." },
                  { t: "NEP Execution Barrier", d: "While NEP 2020 offers revolutionary flexibility, navigating its multi-disciplinary routes manually is impossible for millions." }
                ].map((item, i) => (
                  <div key={i} className="group p-8 rounded-2xl bg-white/[0.01] border border-white/10 hover:border-blue-500/20 transition-all duration-500">
                    <h4 className="text-white font-black uppercase tracking-widest text-sm mb-3 group-hover:text-blue-400 transition-colors">{item.t}</h4>
                    <p className="text-gray-300 text-sm font-medium leading-relaxed">{item.d}</p>
                  </div>
                ))}
             </div>
          </div>
          <div className="flex flex-col justify-center">
             <div className="p-12 md:p-16 rounded-[60px] bg-gradient-to-br from-blue-600/10 via-transparent to-transparent border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
                <h3 className="text-xs font-black tracking-[0.5em] text-blue-500 uppercase mb-4">Our Mission</h3>
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 leading-[1.1] tracking-tighter">Connecting <br/><span className="gradient-text">Ambition to Data.</span></h2>
                <p className="text-gray-300 text-xl font-medium leading-relaxed mb-10">
                  To create a single, intelligent ecosystem that connects careers, education, skills, institutions, and policy—ensuring no learner is forced to choose blindly.
                </p>
                <div className="grid grid-cols-2 gap-8 py-8 border-t border-white/10">
                  <div>
                    <h5 className="text-white font-black text-2xl mb-1">10k+</h5>
                    <p className="text-xs text-gray-300 uppercase font-black tracking-widest">Institutions Mapped</p>
                  </div>
                  <div>
                    <h5 className="text-white font-black text-2xl mb-1">500+</h5>
                    <p className="text-xs text-gray-300 uppercase font-black tracking-widest">Skill Clusters</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM ARCHITECTURE */}
      <section className="py-32 px-6 bg-[#030303] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black uppercase mb-6 tracking-tighter">System <span className="gradient-text">Architecture</span></h2>
            <p className="text-gray-300 text-xs font-black uppercase tracking-[0.5em]">The Engineering Behind the Guidance</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="flex flex-col gap-6 relative z-10">
              {[
                { title: "Layer 01: Multi-Modal Interface", desc: "Web, Mobile, and Voice interfaces for accessibility across rural and urban India.", color: "border-blue-500/20 bg-blue-500/5" },
                { title: "Layer 02: AI Intelligence Cluster", desc: "Explainable Recommendation Engines, Neural Matching, and LLM-driven career advisory.", color: "border-cyan-500/20 bg-cyan-500/5" },
                { title: "Layer 03: Knowledge Graph Hub", desc: "Central database of NEP pathways, NSQF levels, College fees, and Scholarship eligibility.", color: "border-indigo-500/20 bg-indigo-500/5" },
                { title: "Layer 04: Data & Compliance API", desc: "Secure integration with National Skill Development and Labor Market APIs.", color: "border-purple-500/20 bg-purple-500/5" }
              ].map((layer, i) => (
                <div key={i} className={`p-8 rounded-2xl border ${layer.color} backdrop-blur-xl group hover:-translate-y-1 transition-all duration-500`}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-black text-white group-hover:bg-blue-600 transition-colors">0{i+1}</div>
                      <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">{layer.title}</h4>
                        <p className="text-gray-200 text-xs font-bold uppercase tracking-wide">{layer.desc}</p>
                      </div>
                    </div>
                    <svg className="w-6 h-6 text-white/10 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute left-[3.25rem] top-10 bottom-10 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 opacity-20 -z-0" />
          </div>
        </div>
      </section>

      {/* 4. THE INTELLIGENCE ENGINE (DATA VISUALS) */}
      <section className="py-32 px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h3 className="text-xs font-black tracking-[0.5em] text-blue-500 uppercase mb-4">Intelligence Engine</h3>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 tracking-tighter">Real-Time <br/><span className="gradient-text">Labor Intelligence.</span></h2>
            <p className="text-gray-200 font-medium leading-relaxed mb-10">
              We don't just guess your future. Our models continuously scrape global labor market trends, job descriptions, and policy updates to ensure every recommendation is backed by empirical demand.
            </p>
            <ul className="space-y-4">
              {["Skill Demand Prediction (6-24 Months)", "Regional Salary Benchmarking", "Institutional Performance Grading", "NSQF Competency Mapping"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-sm font-black uppercase tracking-widest text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative group p-10 rounded-[50px] bg-white/[0.01] border border-white/10 overflow-hidden">
             <div className="space-y-8">
               <div className="flex justify-between items-end h-40 gap-4">
                  {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                    <div key={i} className="flex-grow bg-blue-600/20 relative group/bar">
                       <div 
                         className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-cyan-500 transition-all duration-1000" 
                         style={{ height: `${h}%` }} 
                       />
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity text-sm font-black text-white">{h}%</div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-between text-sm font-black uppercase tracking-widest text-gray-400">
                  <span>AI/ML</span>
                  <span>Health</span>
                  <span>Creative</span>
                  <span>Data</span>
                  <span>DevOps</span>
                  <span>Ethics</span>
                  <span>Policy</span>
               </div>
               <div className="text-center pt-4">
                  <p className="text-xs font-black uppercase text-blue-500/60 tracking-[0.3em]">Projected Market Growth 2025-2027</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. POLICY & GOVERNANCE ALIGNMENT */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black uppercase mb-6 tracking-tighter">Governance <span className="gradient-text">& Alignment</span></h2>
            <p className="text-gray-300 text-xs font-black uppercase tracking-[0.5em]">Built for National Readiness</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: "NEP 2020", d: "Built from the ground up to support FYUP, multi-entry-exit, and multidisciplinary education pathways." },
              { t: "NSQF Framework", d: "Every skill and assessment is mapped to the National Skill Qualification Framework (Levels 1-10)." },
              { t: "NCVET Ready", d: "Alignment with vocational training standards to ensure credibility for non-traditional learners." },
              { t: "Data Privacy", d: "Strict adherence to Digital India Act and GDPR principles ensuring student data sovereignty." }
            ].map((badge, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/20 transition-all text-center">
                 <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                 </div>
                 <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3">{badge.t}</h4>
                 <p className="text-gray-300 text-xs font-bold uppercase leading-relaxed">{badge.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CORE DEVELOPMENT TEAM - UPDATED WITH PHOTOS */}
      <section className="py-32 px-6 bg-[#030303] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black uppercase mb-6 tracking-tighter text-white">Engineering <span className="gradient-text">Core</span></h2>
            <p className="text-gray-300 text-xs font-black uppercase tracking-[0.5em]">The Architects of Professional Destiny</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-white/[0.01] border border-white/10 hover:border-blue-500/30 transition-all relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all" />
                
                {/* Team Photo with Glow Border */}
                <div className="relative mb-10 w-24 h-24 group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40" />
                  <img 
                    src={member.photo} 
                    alt={member.name}
                    className="w-full h-full rounded-3xl object-cover relative z-10 border border-white/10 shadow-2xl" 
                  />
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 leading-none">{member.name}</h3>
                <p className="text-blue-500 font-black uppercase tracking-widest text-xs mb-8">{member.role}</p>
                <p className="text-gray-300 text-xs font-medium leading-relaxed mb-10 min-h-[80px]">{member.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                   {member.skills.map((skill, si) => (
                     <span key={si} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-gray-300 uppercase tracking-widest">
                       {skill}
                     </span>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TECHNOLOGY STACK */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black uppercase mb-16 tracking-tighter">Technology <span className="text-blue-500">Infrastructure</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { category: "Frontend", tech: "React, Tailwind, Framer" },
              { category: "Backend", tech: "FastAPI, Node.js, Python" },
              { category: "AI / ML", tech: "Gemini AI, PyTorch, Scikit" },
              { category: "DevOps", tech: "Docker, Vercel, PostgreSQL" }
            ].map((s, i) => (
              <div key={i}>
                <h5 className="text-blue-500 text-xs font-black uppercase tracking-[0.4em] mb-3">{s.category}</h5>
                <p className="text-white font-black uppercase text-sm tracking-widest">{s.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FUTURE ROADMAP */}
      <section className="py-32 px-6 relative bg-[#080808] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-24 text-center tracking-tighter">Evolution <span className="text-blue-500">Timeline</span></h2>
          <div className="relative">
             <div className="hidden lg:block absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
               {roadmap.map((item, i) => (
                 <div key={i} className="relative z-10 text-center group">
                    <div className="w-12 h-12 rounded-full bg-[#050505] border border-blue-600 mx-auto mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.2)] group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                       <span className="text-xs font-black">{i+1}</span>
                    </div>
                    <h5 className="text-blue-500 font-black uppercase tracking-widest text-xs mb-3">{item.phase}</h5>
                    <h4 className="text-white font-black uppercase tracking-wide text-sm mb-4 leading-tight">{item.title}</h4>
                    <p className="text-gray-300 text-xs font-bold uppercase leading-relaxed px-6">{item.desc}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CLOSING STATEMENT */}
      <section className="py-40 px-6 text-center relative overflow-hidden bg-gradient-to-t from-blue-900/10 to-transparent">
        <div className="absolute inset-0 bg-blue-600/5 blur-[150px]" />
        <div className="max-w-4xl mx-auto relative z-10">
           <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 leading-[1.1] tracking-tighter">
             Not just a platform. <br/>An <span className="gradient-text">Intelligence Layer</span> for professional destiny.
           </h2>
           <p className="text-gray-200 text-lg mb-12 max-w-2xl mx-auto">
             CareerSoulmate is an evolving intelligence system designed to guide learners with clarity, confidence, and credibility at every stage of their professional journey.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs">
               Explore Platform
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">
               Start Assessment
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: drawPath 4s ease-out infinite alternate;
        }
        @keyframes drawPath {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
