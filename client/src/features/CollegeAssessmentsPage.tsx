
import React, { useState, useMemo } from 'react';

const CollegeAssessmentsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'manage' | 'analytics'>('overview');

  const stats = [
    { label: 'Total Conducted', val: '142', icon: '📝' },
    { label: 'Students Assessed', val: '3,842', icon: '🎓' },
    { label: 'Avg Achievement', val: '74%', icon: '📈' },
    { label: 'Trend Growth', val: '+12%', icon: '🚀' },
  ];

  const assessmentTypes = [
    { 
      title: 'Aptitude', 
      desc: 'Cognitive baseline measuring logic and numerical ability.', 
      focus: ['Pattern Match', 'Logical Flow'], 
      relevance: 'Predicts technical success in Engineering/Finance.' 
    },
    { 
      title: 'Interest', 
      desc: 'RIASEC alignment and career domain inclination.', 
      focus: ['RIASEC Sync', 'Goal Setting'], 
      relevance: 'Reduces dropout rates by ensuring natural alignment.' 
    },
    { 
      title: 'Personality', 
      desc: 'Non-judgmental work style and leadership tendency probe.', 
      focus: ['Collaboration', 'Stress Resilience'], 
      relevance: 'Critical for soft-skill placement matching.' 
    },
    { 
      title: 'Skills', 
      desc: 'Technical proficiency mapped to NSQF Level 1-10.', 
      focus: ['Python', 'Cloud', 'Design'], 
      relevance: 'Direct linkage to recruiter job descriptions.' 
    },
  ];

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* 1. ASSESSMENT OVERVIEW DASHBOARD */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                DIAGNOSTIC INTELLIGENCE TERMINAL
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Assess <br /><span className="gradient-text">Capability.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Centralized evaluation ecosystem. Manage diagnostic flows and convert raw 
                student performance into actionable institutional growth data.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {stats.map((s, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center flex flex-col items-center">
                    <span className="text-2xl mb-4">{s.icon}</span>
                    <p className="text-2xl font-black text-white mb-1">{s.val}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{s.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <div className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex gap-4">
          {['overview', 'manage', 'analytics'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. ASSESSMENT TYPES SECTION */}
      {activeTab === 'overview' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
          <div className="mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight">The Four <span className="text-blue-500">Pillars.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Core evaluation categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {assessmentTypes.map((type, i) => (
              <div key={i} className="p-12 rounded-[56px] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <h4 className="text-[120px] font-black text-white leading-none">0{i+1}</h4>
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl font-black uppercase text-white group-hover:text-blue-400 transition-colors">{type.title}</h3>
                    <button className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                  <p className="text-gray-400 text-lg font-medium leading-relaxed">{type.desc}</p>
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-3">Key Focus</p>
                      <div className="flex flex-wrap gap-2">
                        {type.focus.map(f => <span key={f} className="px-3 py-1 bg-white/5 rounded text-[8px] font-black text-gray-500 uppercase">{f}</span>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-3">Outcome Value</p>
                      <p className="text-[10px] font-black text-white uppercase leading-relaxed">{type.relevance}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. ASSESSMENT CREATION & MANAGEMENT */}
      {activeTab === 'manage' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-right duration-500">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-2">
              <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Inventory.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Design and deploy new assessments</p>
            </div>
            <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
               Create New Evaluation
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { name: 'Year 3 Engineering Skills Sprint', type: 'Skill', bank: 'Technical_v4', students: 412, status: 'Active' },
              { name: 'Pre-Placement Aptitude Probe', type: 'Aptitude', bank: 'Logic_Standard', students: 850, status: 'Scheduled' },
              { name: 'Liberal Arts Interest Audit', type: 'Interest', bank: 'RIASEC_Detailed', students: 120, status: 'Completed' },
            ].map((a, i) => (
              <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="flex items-center gap-8 flex-grow">
                   <div className="w-16 h-16 rounded-[24px] bg-blue-600/10 flex items-center justify-center text-blue-500 font-black text-xl">
                      {a.type.charAt(0)}
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors">{a.name}</h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{a.type} Assessment • Bank: {a.bank}</p>
                   </div>
                </div>
                <div className="flex items-center gap-12 text-center md:text-right">
                   <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Target</p>
                      <p className="text-xs font-black text-white">{a.students} Students</p>
                   </div>
                   <div className="min-w-[100px]">
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Status</p>
                      <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        a.status === 'Active' ? 'bg-emerald-500/20 text-emerald-500' : 
                        a.status === 'Scheduled' ? 'bg-blue-600/20 text-blue-400' : 'bg-white/5 text-gray-600'
                      }`}>{a.status}</span>
                   </div>
                   <button className="text-[9px] font-black text-blue-500 uppercase tracking-widest hover:underline">Manage Settings</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. COHORT PERFORMANCE ANALYTICS */}
      {activeTab === 'analytics' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-left duration-500">
           <div className="mb-20 text-center">
              <h2 className="text-3xl font-black uppercase tracking-tight">Intelligence <span className="text-blue-500">Dashboard.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Cohort-level performance metrics</p>
           </div>

           <div className="grid lg:grid-cols-2 gap-12">
              <div className="p-12 rounded-[56px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                 <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12">Score Distribution</h4>
                 <div className="space-y-10">
                    {[
                       { label: 'Excellence (90%+)', val: 12, color: 'bg-emerald-500' },
                       { label: 'Proficient (70-90%)', val: 42, color: 'bg-blue-500' },
                       { label: 'Developing (40-70%)', val: 38, color: 'bg-orange-500' },
                       { label: 'Emergent (<40%)', val: 8, color: 'bg-red-500' }
                    ].map((item, i) => (
                       <div key={i} className="space-y-4">
                          <div className="flex justify-between items-end">
                             <span className="text-xs font-black uppercase text-white tracking-widest">{item.label}</span>
                             <span className="text-xl font-black text-white">{item.val}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className={`h-full ${item.color} transition-all duration-1500`} style={{ width: `${item.val}%` }} />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="p-12 rounded-[56px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center text-center">
                 <div className="w-40 h-40 rounded-full border-4 border-white/5 flex items-center justify-center mb-10 relative">
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-r-transparent animate-spin-slow" />
                    <p className="text-4xl font-black text-white">B+</p>
                 </div>
                 <h4 className="text-xl font-black uppercase text-white mb-4">Batch Grade Index</h4>
                 <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed max-w-xs">
                    This cohort is performing 15% above the national average for "Computational Logic" in Year 3.
                 </p>
                 <button className="mt-8 text-[10px] font-black text-blue-500 uppercase tracking-widest border border-blue-500/20 px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all">Download Dept Wise Report</button>
              </div>
           </div>
        </section>
      )}

      {/* 5. GAP & READINESS LINKAGE (THE BRIDGE) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <h2 className="text-3xl font-black uppercase tracking-tight mb-20">Intelligence <span className="text-blue-500">Orchestration.</span></h2>
           <div className="grid md:grid-cols-4 gap-12 relative">
              {/* Connection Arrows (Desktop Only) */}
              <div className="absolute top-1/2 left-[15%] right-[15%] h-px bg-white/10 hidden md:block" />

              {[
                 { t: 'Assessments', d: 'Raw Diagnostic Data', icon: '🎯', action: () => setActiveTab('overview') },
                 { t: 'Skill Gaps', d: 'Identified Weaknesses', icon: '🧩', action: () => onNavigate('gaps') },
                 { t: 'Readiness', d: 'Employability Score', icon: '🚀', action: () => onNavigate('readiness') },
                 { t: 'Internships', d: 'Applied Experience', icon: '🤝', action: () => onNavigate('internships') }
              ].map((step, idx) => (
                 <div key={idx} onClick={step.action} className="relative group cursor-pointer">
                    <div className="w-20 h-20 rounded-[32px] bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-8 text-3xl group-hover:bg-blue-600 transition-all duration-500 shadow-xl group-hover:shadow-blue-600/30">
                       {step.icon}
                    </div>
                    <h4 className="text-sm font-black uppercase text-white mb-2 tracking-widest group-hover:text-blue-400 transition-colors">{step.t}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-6">{step.d}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. IMPROVEMENT & INTERVENTION SUGGESTIONS */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
         <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase text-white">AI Intervention <span className="text-blue-500">Directives.</span></h3>
            <div className="space-y-4">
               {[
                  'Mandatory Workshop: "Neural Logic & Transformers" for 142 students in Dept-A.',
                  'Open Mentorship Slots: Link 45 students with high interest in "FinTech" to Industry Partners.',
                  'Bridge Module Update: Suggesting 20% syllabus shift towards "Strategic Soft Skills".'
               ].map((msg, i) => (
                  <div key={i} className="p-8 rounded-[32px] bg-blue-600/5 border border-blue-500/10 flex items-center gap-8 group hover:border-blue-500/40 transition-all text-left">
                     <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">💡</div>
                     <p className="text-sm font-medium text-gray-300 leading-relaxed uppercase tracking-tight">{msg}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. ETHICS & FAIRNESS SECTION */}
      <section className="py-24 px-6 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto p-16 rounded-[64px] border border-white/10 bg-white/[0.01] relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7v1l10 5 10-5V7L12 2zM2 12v1l10 5 10-5v-1l-10 5-10-5zm0 5v1l10 5 10-5v-1l-10 5-10-5z"/></svg>
           </div>
           <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-6">
                 <h3 className="text-3xl font-black uppercase text-white tracking-tighter">Ethics & <span className="text-emerald-500">Fairness.</span></h3>
                 <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Diagnostic Nature</h5>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed uppercase">
                       Assessments on Soulmate are strictly diagnostic. We do not use labels like 
                       "Weak" or "Fail". We identify current proficiency and map the path forward.
                    </p>
                 </div>
                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-white uppercase tracking-widest">Data Sovereignty</h5>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed uppercase">
                       Student response data is encrypted and handled with extreme privacy. 
                       Results are used only for guidance and institutional planning.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Insight over <br/><span className="gradient-text">Testing.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Assessments are not barriers; they are benchmarks. Career Soulmate 
              gives your institution the precision needed to guide every student 
              towards their optimal professional destiny.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Opening Template Library...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Browse Evaluation Templates
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Institutional Dashboard
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #3b82f6 1px, transparent 1px),
                            linear-gradient(to bottom, #3b82f6 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CollegeAssessmentsPage;
