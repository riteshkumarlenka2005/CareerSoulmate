
import React, { useState, useMemo } from 'react';

type Proficiency = 'None' | 'Beginner' | 'Intermediate' | 'Advanced';

interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Soft' | 'Digital' | 'Vocational';
  description: string;
}

const MASTER_SKILLS: SkillItem[] = [
  // Technical
  { id: 'python', name: 'Python Programming', category: 'Technical', description: 'Logic scripting, data structures, and standard library usage.' },
  { id: 'math', name: 'Advanced Mathematics', category: 'Technical', description: 'Calculus, Linear Algebra, and Probability.' },
  { id: 'ds', name: 'Data Structures', category: 'Technical', description: 'Array, Trees, Graphs and algorithmic optimization.' },
  // Soft
  { id: 'comm', name: 'Public Speaking', category: 'Soft', description: 'Articulating complex ideas to large audiences clearly.' },
  { id: 'lead', name: 'Team Leadership', category: 'Soft', description: 'Managing dynamics and driving team goals effectively.' },
  { id: 'crit', name: 'Critical Thinking', category: 'Soft', description: 'Objective analysis of issues to form reasoned judgments.' },
  // Digital
  { id: 'cloud', name: 'Cloud Computing', category: 'Digital', description: 'Experience with AWS, Azure or GCP environments.' },
  { id: 'cyber', name: 'Cyber Security', category: 'Digital', description: 'Understanding threat vectors and network protection.' },
  { id: 'design', name: 'UI/UX Design', category: 'Digital', description: 'Visual hierarchy and interactive user experience flows.' },
  // Vocational
  { id: 'cnc', name: 'CNC Operations', category: 'Vocational', description: 'Operating precision manufacturing machinery via G-Code.' },
  { id: 'ev', name: 'EV Battery Tech', category: 'Vocational', description: 'Assembling and testing lithium-ion propulsion systems.' },
  { id: 'solar', name: 'Solar PV Install', category: 'Vocational', description: 'Setup and maintenance of grid-scale solar arrays.' },
];

const TARGET_ROLE_NEEDS = {
  'AI Research Scientist': [
    { id: 'python', required: 'Advanced' },
    { id: 'math', required: 'Advanced' },
    { id: 'ds', required: 'Intermediate' },
    { id: 'lead', required: 'Intermediate' },
    { id: 'cloud', required: 'Intermediate' }
  ]
};

const SkillsAssessmentPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<SkillItem['category']>('Technical');
  const [userRatings, setUserRatings] = useState<Record<string, Proficiency>>({});
  const [view, setView] = useState<'assess' | 'results'>('assess');

  const handleRate = (id: string, level: Proficiency) => {
    setUserRatings(prev => ({ ...prev, [id]: level }));
  };

  const currentSkillsCount = Object.values(userRatings).filter(v => v !== 'None').length;

  const gapAnalysis = useMemo(() => {
    const target = 'AI Research Scientist';
    const needs = TARGET_ROLE_NEEDS[target];
    
    return needs.map(need => {
      const userLevel = userRatings[need.id] || 'None';
      const levelsOrder: Proficiency[] = ['None', 'Beginner', 'Intermediate', 'Advanced'];
      const userIdx = levelsOrder.indexOf(userLevel);
      const reqIdx = levelsOrder.indexOf(need.required as Proficiency);
      const isMet = userIdx >= reqIdx;
      const skillName = MASTER_SKILLS.find(s => s.id === need.id)?.name || need.id;

      return {
        name: skillName,
        userLevel,
        requiredLevel: need.required,
        isMet,
        gap: Math.max(0, reqIdx - userIdx)
      };
    });
  }, [userRatings]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. SKILLS INTRO SECTION */}
      {view === 'assess' && (
        <>
          <section className="relative pt-28 pb-16 px-6 overflow-visible border-b border-white/10">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 blur-[180px] rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black tracking-widest uppercase mb-10">
                CAPABILITY BASELINE ENGINE
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
                What Can You <br/><span className="gradient-text">Do Today?</span>
              </h1>
              <p className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed mb-12">
                Honesty is the catalyst for growth. Declare your current proficiency across 
                key domains to build a verifiable baseline of your professional value.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
                 <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
                    <h4 className="text-sm font-black uppercase text-emerald-500 mb-4 tracking-widest">Growth First</h4>
                    <p className="text-gray-200 text-sm leading-relaxed">It's okay to be a beginner. The system uses your 'Beginner' tags to recommend the most efficient bridge-courses to 'Intermediate'.</p>
                 </div>
                 <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
                    <h4 className="text-sm font-black uppercase text-blue-500 mb-4 tracking-widest">Evidence Counts</h4>
                    <p className="text-gray-200 text-sm leading-relaxed">Advanced ratings require proof later. For now, mark what you feel confident using in a real-world scenario.</p>
                 </div>
              </div>
            </div>
          </section>

          {/* B. SKILL CATEGORIES & C. PROFICIENCY RATING */}
          <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
               <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10">
                  {(['Technical', 'Soft', 'Digital', 'Vocational'] as const).map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-gray-300 hover:text-white'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
               <div className="text-right">
                  <p className="text-xs font-black text-gray-300 uppercase tracking-[0.4em]">Skills Tagged: {currentSkillsCount}</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {MASTER_SKILLS.filter(s => s.category === activeCategory).map(skill => (
                 <div key={skill.id} className="group p-10 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-full relative">
                    <h3 className="text-2xl font-black uppercase text-white mb-2 leading-tight tracking-tight">{skill.name}</h3>
                    <p className="text-gray-300 text-xs font-medium leading-relaxed mb-10">{skill.description}</p>
                    
                    <div className="mt-auto space-y-4">
                       <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Self-Rating</p>
                       <div className="grid grid-cols-4 gap-1">
                          {(['None', 'Beginner', 'Intermediate', 'Advanced'] as Proficiency[]).map(level => (
                            <button
                              key={level}
                              onClick={() => handleRate(skill.id, level)}
                              className={`py-2.5 rounded-lg text-sm font-black uppercase tracking-tighter border transition-all ${userRatings[skill.id] === level ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:text-gray-300'}`}
                            >
                              {level}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            <div className="mt-24 flex justify-center">
               <button 
                 onClick={() => setView('results')}
                 className="px-12 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-emerald-600/40 uppercase tracking-[0.2em] text-xs active:scale-95"
               >
                 Generate Gap Snapshot
               </button>
            </div>
          </section>
        </>
      )}

      {/* D. SKILL GAP SNAPSHOT (RESULTS) */}
      {view === 'results' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in zoom-in duration-700">
           <div className="text-center mb-24 space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black tracking-widest uppercase">
                ANALYSIS COMPLETE
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                Your Skill <br/><span className="gradient-text">Equilibrium.</span>
              </h1>
              <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                We've mapped your current toolkit against your target career as an 
                <span className="text-white"> AI Research Scientist</span>.
              </p>
           </div>

           <div className="grid lg:grid-cols-2 gap-20 items-start mb-32">
              <div className="space-y-12">
                 <div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-10">Primary <span className="text-emerald-500">Alignment.</span></h3>
                    <div className="space-y-10">
                       {gapAnalysis.map((item) => (
                         <div key={item.name} className="space-y-4 group">
                            <div className="flex justify-between items-end">
                               <div className="flex items-center gap-3">
                                  <div className={`w-1.5 h-1.5 rounded-full ${item.isMet ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                  <span className="text-sm font-black uppercase tracking-widest text-white">{item.name}</span>
                               </div>
                               <div className="text-right">
                                  <span className="text-xs font-black uppercase tracking-widest text-gray-300 block">Required: {item.requiredLevel}</span>
                                  <span className={`text-xs font-black uppercase tracking-widest ${item.isMet ? 'text-emerald-500' : 'text-orange-500'}`}>Current: {item.userLevel}</span>
                               </div>
                            </div>
                            <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                               {/* Background bar (Required) */}
                               <div className="absolute inset-0 bg-blue-600/10 opacity-40" style={{ width: item.requiredLevel === 'Advanced' ? '100%' : item.requiredLevel === 'Intermediate' ? '66%' : '33%' }} />
                               {/* User bar */}
                               <div 
                                 className={`h-full transition-all duration-1500 ${item.isMet ? 'bg-emerald-600 shadow-[0_0_10px_#10b981]' : 'bg-orange-600 shadow-[0_0_10px_#f97316]'}`} 
                                 style={{ width: item.userLevel === 'Advanced' ? '100%' : item.userLevel === 'Intermediate' ? '66%' : item.userLevel === 'Beginner' ? '33%' : '0%' }} 
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-emerald-600/5 blur-[120px]" />
                 <div className="relative p-12 rounded-3xl border border-white/10 bg-[#080808] backdrop-blur-3xl shadow-2xl overflow-hidden">
                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-[0.4em] mb-10">AI Competency Verdict</h4>
                    <div className="space-y-10">
                       <div className="flex items-center gap-8">
                          <div className="w-20 h-20 rounded-[28px] bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-3xl">🎯</div>
                          <div>
                             <h4 className="text-xl font-black uppercase text-white tracking-tight">Technical Ready</h4>
                             <p className="text-xs text-gray-300 font-bold uppercase tracking-widest mt-1">Status: Partially Qualified</p>
                          </div>
                       </div>
                       <p className="text-gray-200 text-base leading-relaxed font-medium">
                          "Your mathematical foundation is strong, but your Python syntax is 
                          at a 'Beginner' level. To meet AI Research Scientist standards, we 
                          recommend a focused 2-month sprint in 'Neural Frameworks' to close 
                          the gap by 34%."
                       </p>
                       <div className="pt-10 border-t border-white/10">
                          <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Urgent Upgrades Recommended</p>
                          <div className="flex flex-wrap gap-2">
                             {['PyTorch Syntax', 'MLOps Basics', 'Prompt Engineering'].map(v => (
                               <span key={v} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase text-emerald-400 tracking-widest">{v}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="p-16 rounded-3xl border border-white/10 bg-white/[0.01] text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Skill <span className="text-blue-500">Redemption.</span></h3>
              <p className="text-gray-300 text-lg font-medium leading-relaxed mb-12">
                This baseline is dynamic. As you complete projects and courses, update 
                your ratings to see your Gap Snapshot evolve into a Readiness Report.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <button onClick={() => onNavigate('ai-recs')} className="px-12 py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-emerald-600/40 uppercase tracking-[0.2em] text-xs">View Recommended Courses</button>
                 <button onClick={() => setView('assess')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-xs">Update Skill Profile</button>
              </div>
           </div>
        </section>
      )}

      <style>{`
        .bg-blue-600\/10 { background-color: rgba(37, 99, 235, 0.1); }
        .text-orange-500 { color: #f97316; }
        .bg-orange-500 { background-color: #f97316; }
        .bg-orange-600 { background-color: #ea580c; }
        .shadow-\[0_0_10px_#f97316\] { box-shadow: 0 0 10px #f97316; }
      `}</style>
    </div>
  );
};

export default SkillsAssessmentPage;
