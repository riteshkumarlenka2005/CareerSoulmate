
import React from 'react';

const VocationalNavigator: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-blue-900/20 to-transparent p-5 md:p-8 lg:p-12 md:p-20 rounded-[40px] border border-white/10 relative">
          <div className="absolute top-0 right-0 p-5 md:p-8 lg:p-10 hidden xl:block opacity-20 hover:opacity-100 transition-opacity">
            {/* Robot Illustration Placeholder using SVG */}
            <svg width="300" height="300" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="80" r="40" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M70,140 Q100,180 130,140" stroke="#3b82f6" strokeWidth="2" />
              <rect x="85" y="70" width="30" height="20" rx="5" fill="#3b82f6" className="animate-pulse" />
            </svg>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">AI Skilling & <br /><span className="gradient-text">Vocational Navigator</span></h2>
            <p className="text-gray-300 text-lg mb-6 md:mb-8 lg:mb-10 leading-relaxed font-medium">
              Skills are stackable. Careers are adaptable. Our navigator uses NSQF Level 1-10 mapping to bridge the gap between rural craftsmanship and global technology roles.
            </p>

            <div className="space-y-6">
              {[
                { title: "Apprenticeship Mapping", level: "NSQF Level 4-5", icon: "🛠️" },
                { title: "Digital Literacy Core", level: "NSQF Level 3", icon: "💻" },
                { title: "Advanced Automation", level: "NSQF Level 8", icon: "🤖" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-blue-500/40 transition-all cursor-pointer group">
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-grow">
                    <h4 className="text-white font-black uppercase tracking-wide text-sm">{item.title}</h4>
                    <p className="text-xs text-blue-500 font-black uppercase tracking-[0.2em]">{item.level}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VocationalNavigator;
