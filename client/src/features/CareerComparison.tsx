
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CareerStats {
  id: string;
  name: string;
  education: string;
  skills: string[];
  salary: { start: string; mid: string; peak: string };
  growth: string;
  wlb: string; // Work-life balance
  stress: string;
  learningCurve: string;
  matchScore: number;
  strengths: string[];
  risks: string[];
  personality: string;
  automationRisk: number;
  marketVolatility: string;
  industry: string;
}

const CAREER_DATA: CareerStats[] = [
  {
    id: 'neural',
    name: 'Neural Architect',
    industry: 'Emerging AI',
    education: 'PhD/Masters in AI/Neuroscience',
    skills: ['PyTorch', 'Neuro-Linguistic Ops', 'Graph Theory', 'Bio-Ethics'],
    salary: { start: '$140k', mid: '$220k', peak: '$450k+' },
    growth: 'Extreme (High Demand)',
    wlb: 'Moderate (High Focus)',
    stress: 'High (Complex Systems)',
    learningCurve: 'Steep',
    matchScore: 94,
    strengths: ['Analytical Depth', 'Systemic Thinking', 'Innovation Mastery'],
    risks: ['Burnout Potential', 'Fast Obsolescence'],
    personality: 'Logical & Deep-Thinker',
    automationRisk: 5,
    marketVolatility: 'Low (Niche Essential)'
  },
  {
    id: 'data',
    name: 'Senior Data Scientist',
    industry: 'Technology',
    education: 'Masters in Stats/CS',
    skills: ['SQL', 'Python', 'MLOps', 'Business Intelligence'],
    salary: { start: '$100k', mid: '$160k', peak: '$300k' },
    growth: 'Steady (Established)',
    wlb: 'Excellent',
    stress: 'Moderate',
    learningCurve: 'Moderate',
    matchScore: 82,
    strengths: ['Data Fluency', 'Strategy Alignment', 'Tool Mastery'],
    risks: ['Market Saturation'],
    personality: 'Methodical & Balanced',
    automationRisk: 15,
    marketVolatility: 'Medium (Standard Role)'
  },
  {
    id: 'quantum',
    name: 'Quantum Cryptographer',
    industry: 'Research',
    education: 'PhD in Quantum Physics/CS',
    skills: ['Quantum Logic', 'OpenSSL', 'Complex Math', 'Post-Quantum Sec'],
    salary: { start: '$130k', mid: '$210k', peak: '$400k' },
    growth: 'Extreme',
    wlb: 'Good',
    stress: 'High',
    learningCurve: 'Extremely Steep',
    matchScore: 78,
    strengths: ['Complex Problem Solving', 'Future-Proofing', 'Security Expertise'],
    risks: ['Limited Market Size', 'Research Driven'],
    personality: 'Intense & Focused',
    automationRisk: 8,
    marketVolatility: 'Very Low'
  },
  {
    id: 'sustainable',
    name: 'Sustainability Consultant',
    industry: 'Business',
    education: 'Masters in Env Science/MBA',
    skills: ['ESG Reporting', 'Circular Econ', 'LCA Tools', 'Policy Analysis'],
    salary: { start: '$85k', mid: '$130k', peak: '$250k' },
    growth: 'High',
    wlb: 'Very Good',
    stress: 'Low',
    learningCurve: 'Moderate',
    matchScore: 88,
    strengths: ['Strategic Impact', 'Communication', 'Ethical Leadership'],
    risks: ['Policy Dependency', 'Variable Regulation'],
    personality: 'Empathetic & Strategic',
    automationRisk: 12,
    marketVolatility: 'Medium'
  },
  {
    id: 'bioethics',
    name: 'Bio-Digital Ethicist',
    industry: 'Healthcare',
    education: 'PhD in Philosophy/Law/Bio',
    skills: ['Policy Design', 'Ethical Frameworks', 'Tech Law', 'Public Health'],
    salary: { start: '$95k', mid: '$150k', peak: '$280k' },
    growth: 'Medium',
    wlb: 'Excellent',
    stress: 'Low',
    learningCurve: 'Steep',
    matchScore: 85,
    strengths: ['Abstract Reasoning', 'Governance', 'Risk Assessment'],
    risks: ['Academic Pace', 'Funding Variability'],
    personality: 'Philosophical & Guarded',
    automationRisk: 2,
    marketVolatility: 'Low'
  }
];

interface CareerComparisonProps {
  onNavigate?: (page: string) => void;
}

const CareerComparison: React.FC<CareerComparisonProps> = () => {
  const navigate = useNavigate();
  const onNavigate = (page: string) => navigate(page === 'explorer' ? '/career-explorer' : page === 'home' ? '/' : `/${page}`);
  const [selectedIds, setSelectedIds] = useState<string[]>(['neural', 'data']);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const selectedCareers = CAREER_DATA.filter(c => selectedIds.includes(c.id));

  const toggleCareer = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(prev => prev.filter(i => i !== id));
      }
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 animate-in fade-in duration-700">
      
      {/* SELECTION MODAL */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsSelectorOpen(false)} />
          <div className="relative w-full max-w-4xl bg-[#080808] border border-white/10 rounded-[40px] p-5 md:p-8 lg:p-10 overflow-hidden animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Select <span className="text-blue-500">Careers</span></h2>
                <p className="text-gray-300 text-xs font-black uppercase tracking-widest mt-1">Select 2 to 4 careers to compare</p>
              </div>
              <button onClick={() => setIsSelectorOpen(false)} className="text-gray-300 hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
              {CAREER_DATA.map(career => {
                const isSelected = selectedIds.includes(career.id);
                const canSelect = selectedIds.length < 4 || isSelected;
                const canDeselect = selectedIds.length > 2 || !isSelected;

                return (
                  <div 
                    key={career.id}
                    onClick={() => {
                      if (isSelected ? canDeselect : canSelect) {
                        toggleCareer(career.id);
                      }
                    }}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer relative group ${
                      isSelected 
                        ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
                        : 'bg-white/[0.04] border-white/10 hover:border-white/20'
                    } ${(!canSelect && !isSelected) || (!canDeselect && isSelected) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-black text-blue-500 uppercase tracking-widest">{career.industry}</span>
                      {isSelected && (
                         <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                            <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                         </div>
                      )}
                    </div>
                    <h4 className="text-white font-black uppercase tracking-tight mb-2">{career.name}</h4>
                    <p className="text-xs text-gray-300 font-bold uppercase">{career.salary.mid} • {career.growth}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex justify-between items-center">
              <span className="text-sm font-black text-gray-300 uppercase tracking-widest">
                Selected: <span className="text-blue-500">{selectedIds.length} / 4</span>
              </span>
              <button 
                onClick={() => setIsSelectorOpen(false)}
                className="px-10 py-4 bg-blue-600 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/30"
              >
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* A. CAREER SELECTION PANEL */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
              Decision <span className="gradient-text">Matrix</span>
            </h1>
            <p className="text-gray-300 text-xs font-black uppercase tracking-[0.4em]">Compare logically, Decide decisively.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {selectedCareers.map(career => (
              <div key={career.id} className="relative group animate-in slide-in-from-bottom duration-500">
                <div className="p-6 rounded-3xl bg-white/[0.03] border border-blue-500/30 flex items-center gap-6 min-w-[280px] backdrop-blur-xl relative">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center font-black text-blue-500 text-xl">
                    {career.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white">{career.name}</h3>
                    <p className="text-xs text-gray-300 font-black uppercase tracking-widest">{career.industry}</p>
                  </div>
                  {selectedIds.length > 2 && (
                    <button 
                      onClick={() => toggleCareer(career.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {selectedIds.length < 4 && (
              <button 
                onClick={() => setIsSelectorOpen(true)}
                className="p-6 rounded-3xl border border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all flex items-center justify-center gap-4 text-gray-300 hover:text-blue-400 group min-w-[280px]"
              >
                <div className="w-12 h-12 rounded-full border border-dashed border-gray-600 flex items-center justify-center group-hover:border-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                </div>
                <span className="text-xs font-black uppercase tracking-widest">Add Career</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* B. SIDE-BY-SIDE COMPARISON TABLE */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto overflow-x-auto custom-scrollbar">
          <div className="min-w-[900px] bg-[#080808] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="p-8 text-xs font-black uppercase tracking-widest text-gray-300 w-1/5">Dimension</th>
                  {selectedCareers.map(c => (
                    <th key={c.id} className="p-8 text-center border-l border-white/10">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-blue-500 text-xs font-black uppercase tracking-widest">{c.name}</span>
                        <span className="text-xs text-gray-400 font-black uppercase tracking-[0.2em]">{c.industry}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { label: "Education Requirement", key: "education" },
                  { label: "Core Skills", key: "skills", isTags: true },
                  { label: "Mid-Career Salary", key: "salary", isSalary: true },
                  { label: "Growth Potential", key: "growth" },
                  { label: "Work-Life Balance", key: "wlb" },
                  { label: "Stress Level", key: "stress" },
                  { label: "Learning Curve", key: "learningCurve" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="p-8 text-sm font-black uppercase text-gray-200 tracking-widest group-hover:text-white transition-colors">
                      {row.label}
                    </td>
                    {selectedCareers.map(c => (
                      <td key={c.id} className="p-8 text-center border-l border-white/10">
                        {row.isTags ? (
                          <div className="flex flex-wrap justify-center gap-1.5">
                            {c.skills.map(s => (
                              <span key={s} className="px-2 py-1 rounded-lg bg-white/5 text-sm font-black text-gray-300 uppercase tracking-widest border border-white/10">{s}</span>
                            ))}
                          </div>
                        ) : row.isSalary ? (
                          <span className="text-blue-400 font-black text-sm">{c.salary.mid}</span>
                        ) : (
                          <span className="text-gray-300 font-bold text-xs uppercase tracking-wide">{(c as any)[row.key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* C. AI MATCH SCORES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl font-black uppercase tracking-tighter">AI <span className="text-blue-500">Match Analysis</span></h2>
          <div className="h-px flex-grow bg-white/10" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedCareers.map(c => (
            <div key={c.id} className="p-8 rounded-[40px] bg-white/[0.01] border border-white/10 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                 <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 flex items-center justify-center">
                    <span className="text-xs font-black text-blue-500">{c.matchScore}%</span>
                 </div>
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 pr-12">{c.name}</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-black text-blue-500 uppercase mb-3 tracking-widest">Strengths</p>
                  <div className="flex flex-wrap gap-2">
                    {c.strengths.map(s => <span key={s} className="text-xs text-gray-300 font-bold uppercase">{s}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-red-500 uppercase mb-3 tracking-widest">Risk Areas</p>
                  <div className="flex flex-wrap gap-2">
                    {c.risks.map(r => <span key={r} className="text-xs text-gray-300 font-bold uppercase">{r}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* D. LIFESTYLE & PERSONALITY FIT */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Lifestyle <span className="text-cyan-500">Alignment</span></h2>
          <div className="h-px flex-grow bg-white/10" />
        </div>

        <div className="p-5 md:p-8 lg:p-10 rounded-3xl bg-white/[0.01] border border-white/10">
           <div className="space-y-10">
              {selectedCareers.map(c => (
                <div key={c.id} className="flex flex-col lg:flex-row items-center gap-5 md:p-8 lg:p-10">
                  <div className="lg:w-1/4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-white">{c.name}</p>
                    <p className="text-xs text-gray-300 font-black uppercase mt-1">Persona Analysis</p>
                  </div>
                  <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center group hover:border-blue-500 transition-all">
                        <p className="text-sm font-black text-gray-400 uppercase mb-1">Archetype</p>
                        <p className="text-xs font-black text-blue-400 uppercase tracking-widest">{c.personality}</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <p className="text-sm font-black text-gray-400 uppercase mb-1">Flexibility</p>
                        <p className="text-xs font-black text-cyan-400 uppercase tracking-widest">{c.wlb}</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <p className="text-sm font-black text-gray-400 uppercase mb-1">Stress</p>
                        <p className="text-xs font-black text-red-500 uppercase tracking-widest">{c.stress}</p>
                     </div>
                     <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <p className="text-sm font-black text-gray-400 uppercase mb-1">Volatility</p>
                        <p className="text-xs font-black text-gray-300 uppercase tracking-widest">{c.marketVolatility}</p>
                     </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* E. RISK & STABILITY ANALYSIS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-red-600 pl-6 mb-8 md:mb-12 lg:mb-16">Future-Proof Resilience</h2>
        <div className="grid md:grid-cols-2 gap-6 md:p-12 lg:p-16">
          {selectedCareers.map(c => (
            <div key={c.id} className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                   <h4 className="text-sm font-black uppercase tracking-widest text-white">{c.name}</h4>
                   <p className="text-xs text-gray-400 uppercase font-black tracking-widest mt-1">Automation Displacement Risk</p>
                </div>
                <span className="text-lg font-black text-red-500">{c.automationRisk}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-1500" 
                  style={{ width: `${c.automationRisk}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-300">
                <span>Industry Volatility: <span className="text-white">{c.marketVolatility}</span></span>
                <span>Role Persistence: <span className="text-white">{100 - c.automationRisk}%</span></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. FINAL RECOMMENDATION PANEL */}
      <section className="max-w-5xl mx-auto px-6 py-20 bg-gradient-to-br from-blue-600/10 to-indigo-600/5 rounded-[60px] border border-blue-500/20 text-center relative overflow-hidden mt-6 md:mt-10 lg:mt-12">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[100px]" />
        
        <div className="relative z-10 space-y-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">
            AI Soulmate Decision Engine
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Optimal <span className="gradient-text">Destiny</span> Found.
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Based on your high aptitude for <span className="text-white">Neural Logic</span> and <span className="text-white">Systems Thinking</span>, 
            the AI recommends the <span className="text-blue-500 font-black uppercase">{selectedCareers.sort((a,b) => b.matchScore - a.matchScore)[0].name}</span> pathway 
            for maximum professional ROI and personal fulfillment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => onNavigate('explorer')}
              className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-xs"
            >
              Initialize Roadmap
            </button>
            <button className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">
              Export Analysis
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
};

export default CareerComparison;
