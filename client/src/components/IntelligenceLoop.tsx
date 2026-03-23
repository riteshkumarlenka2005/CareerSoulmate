
import React from 'react';

const IntelligenceLoop: React.FC = () => {
  const steps = [
    { label: "Assess", desc: "AI Aptitude Discovery" },
    { label: "Discover", desc: "Career Market Mapping" },
    { label: "Plan", desc: "Neural Roadmap Generation" },
    { label: "Skill", desc: "Stackable Credentialing" },
    { label: "Execute", desc: "Recruitment Pipeline" },
    { label: "Adapt", desc: "Continuous Evolution" }
  ];

  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">The <span className="gradient-text">Intelligence</span> Loop</h2>
          <p className="text-gray-300 text-xs font-black uppercase tracking-[0.4em]">Our Core Operating Logic</p>
        </div>

        <div className="relative flex flex-col items-center">
          {/* Mobile Linear View / Desktop Circular View */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="relative group text-center p-6 rounded-2xl border border-white/10 bg-white/[0.04] hover:border-blue-500/50 transition-all duration-300">
                <div className="text-blue-500 text-3xl font-black mb-3 opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">{step.label}</h4>
                <p className="text-xs text-gray-300 font-bold leading-tight uppercase">{step.desc}</p>
                
                {/* Connector Line Logic (Desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-blue-500/50 to-transparent z-0" />
                )}
              </div>
            ))}
          </div>
          
          {/* Animated Background SVG Loop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] pointer-events-none opacity-20">
            <svg viewBox="0 0 1000 400" className="w-full h-full stroke-blue-500/30 fill-none stroke-[0.5]">
              <path d="M0,200 Q250,50 500,200 T1000,200" className="animate-dash" strokeDasharray="10,10" />
              <path d="M0,200 Q250,350 500,200 T1000,200" className="animate-dash" strokeDasharray="10,10" style={{ animationDirection: 'reverse' }} />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        .animate-dash {
          animation: dash 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default IntelligenceLoop;
