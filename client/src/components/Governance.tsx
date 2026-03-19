
import React from 'react';

const Governance: React.FC = () => {
  const badges = [
    { label: "NEP 2020 Aligned", desc: "Full compliance with New Education Policy" },
    { label: "NSQF Mapped", desc: "Official National Skill Qualification Framework" },
    { label: "Privacy First", desc: "GDPR & Digital India Act compliant data handling" },
    { label: "Explainable AI", desc: "Transparent career reasoning architecture" }
  ];

  return (
    <section className="py-24 bg-[#050505] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {badges.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-blue-500/5 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:border-blue-400 transition-all duration-500 shadow-xl">
                 <svg className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                 </svg>
              </div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-2">{b.label}</h4>
              <p className="text-gray-500 text-[10px] font-bold leading-tight uppercase">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Governance;
