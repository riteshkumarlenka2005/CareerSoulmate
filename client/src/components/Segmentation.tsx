
import React from 'react';

const Segmentation: React.FC = () => {
  const personas = [
    { title: "School Student", desc: "Clarity for 10th & 12th transitions.", icon: "🎒" },
    { title: "College Student", desc: "NEP mapping & skill bridging.", icon: "🎓" },
    { title: "Vocational Learner", desc: "Stackable credits & NSQF paths.", icon: "🏗️" },
    { title: "Institutions", desc: "AI Timetables & NEP Compliance.", icon: "🏛️" },
    { title: "Policymaker", desc: "Regional analytics & skill supply data.", icon: "⚖️" }
  ];

  return (
    <section className="py-24 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6 md:mb-8 lg:mb-10 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Who is <span className="text-blue-500">Soulmate</span> For?</h2>
          <p className="text-gray-300 text-xs font-black uppercase tracking-[0.4em]">Integrated Career Ecosystem</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {personas.map((p, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-blue-600 transition-all duration-500 cursor-pointer text-center flex flex-col items-center">
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">{p.icon}</div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-3 group-hover:text-white transition-colors">{p.title}</h4>
              <p className="text-gray-300 text-xs font-bold leading-tight uppercase group-hover:text-blue-100 transition-colors">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segmentation;
