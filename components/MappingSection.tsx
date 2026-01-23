
import React from 'react';

const MappingSection: React.FC = () => {
  const pathways = [
    {
      degree: "FYUP (B.Sc Data Science)",
      career: "AI Ethicist / Neural Engineer",
      skills: ["Linear Algebra", "Ethics in AI", "PyTorch", "Prompt Ops"],
      nsqf: "Level 7"
    },
    {
      degree: "B.A. Multidisciplinary",
      career: "Cross-Cultural Product Manager",
      skills: ["Anthropology", "Product Lifecycle", "Market Intel", "Agile"],
      nsqf: "Level 6"
    },
    {
      degree: "ITEP (Integrated Teacher Ed)",
      career: "EdTech Architect",
      skills: ["Instructional Design", "Python", "LMS Admin", "Cognition"],
      nsqf: "Level 8"
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-black uppercase mb-6 leading-tight">NEP 2020 <br />Pathways</h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">
              We map every official Indian degree (including FYUP & ITEP) to emerging global careers and the specific NSQF skills required to get there.
            </p>
            <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2">Platform Power</span>
              <p className="text-xs text-gray-300 font-bold leading-relaxed">
                Dynamic redirection allows you to pivot your career at any "Exit Point" defined by the new National Education Policy.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-12 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/10 to-transparent" />
            
            {pathways.map((path, i) => (
              <div key={i} className="relative pl-16 group">
                <div className="absolute left-4 top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-[#050505] group-hover:scale-150 transition-transform z-10" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-3xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] transition-all">
                  <div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Degree Path</span>
                    <h4 className="text-white font-black uppercase tracking-wide">{path.degree}</h4>
                  </div>
                  <div className="md:border-x md:border-white/5 md:px-8">
                    <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest block mb-2">Target Destiny</span>
                    <h4 className="text-white font-black uppercase tracking-wide">{path.career}</h4>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest block mb-2">Critical Skills ({path.nsqf})</span>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((s, si) => (
                        <span key={si} className="px-2 py-1 rounded-md bg-white/5 text-[9px] font-bold text-gray-400 uppercase">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MappingSection;
