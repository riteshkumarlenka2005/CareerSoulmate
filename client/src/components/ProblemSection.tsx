
import React from 'react';

const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: "Student Confusion",
      text: "Wrong choices after Class 10 & 12 lead to years of career dissatisfaction.",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.195a2 2 0 011.242-1.848l6.226-2.49a2 2 0 011.532 0l6.226 2.49a2 2 0 011.242 1.848v10.29c0 .79-.466 1.503-1.189 1.822L13 20V12a1 1 0 10-2 0v8z" />
        </svg>
      )
    },
    {
      title: "Skill–Job Mismatch",
      text: "Traditional degrees are losing employability. 80% of graduates are currently under-skilled.",
      icon: (
        <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a2 2 0 11-4 0V4zM11 14a2 2 0 114 0v1a2 2 0 11-4 0v-1z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 8a2 2 0 11-4 0 2 2 0 014 0zM15 18a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Institutional Complexity",
      text: "NEP 2020 multi-disciplinary pathways are hard to execute manually.",
      icon: (
        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">The Modern <span className="text-blue-500">Crisis</span></h2>
          <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">Why CareerSoulmate Exists</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <div key={i} className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                {p.icon}
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-wide text-white">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
