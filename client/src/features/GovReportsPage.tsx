
import React, { useState } from 'react';

type ReportTab = 'Enrollment' | 'Skills' | 'Performance' | 'NEP' | 'Infrastructure' | 'Custom';

const GovReportsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('Enrollment');
  const [scope, setScope] = useState('National');
  const [isExporting, setIsExporting] = useState(false);

  const metadata = {
    id: "GOV-STRAT-2025-04",
    generated: new Date().toLocaleString(),
    sources: "NTA, NCrF, PLFS, LinkedIn Market Insights",
    version: "v4.9.0-BETA-SECURE"
  };

  const handleExport = (type: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`${activeTab} Report serialized in ${type} format. Secure download initiated.`);
    }, 1500);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. REPORT HEADER & GLOBAL CONTROLS */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808] z-40 no-print">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                STRATEGIC POLICY LEDGER
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                National <br/><span className="gradient-text">Reports.</span>
              </h1>
              <div className="flex flex-wrap gap-8 text-[10px] font-black text-gray-500 uppercase tracking-widest pt-4">
                 <div className="flex items-center gap-2"><span className="text-blue-500">SYSTEM ID:</span> {metadata.id}</div>
                 <div className="flex items-center gap-2"><span className="text-blue-500">VERSION:</span> {metadata.version}</div>
                 <div className="flex items-center gap-2"><span className="text-blue-500">SCOPE:</span> {scope}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <select 
                 value={scope} 
                 onChange={(e) => setScope(e.target.value)}
                 className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-blue-500"
               >
                  <option>National</option>
                  <option>Regional Hub: North</option>
                  <option>Regional Hub: West</option>
                  <option>State: Maharashtra</option>
               </select>
               <button onClick={() => handleExport('PDF')} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl shadow-blue-600/30">
                  Export Dossier (PDF)
               </button>
            </div>
          </div>

          <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-3xl border border-white/10 overflow-x-auto custom-scrollbar no-print">
            {(['Enrollment', 'Skills', 'Performance', 'NEP', 'Infrastructure', 'Custom'] as ReportTab[]).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* B. EXECUTIVE SUMMARY RIBBON */}
      <section className="py-12 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Aggregate Trend', value: '+4.2%', benchmark: 'YoY Growth', color: 'blue' },
             { label: 'Equity Index', value: '0.84', benchmark: 'Target 0.95', color: 'indigo' },
             { label: 'Critical Risk', value: '14', benchmark: 'Active Flags', color: 'rose' },
             { label: 'Funding Velocity', value: 'High', benchmark: 'Utilization Index', color: 'emerald' }
           ].map((stat, i) => (
             <div key={i} className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 shadow-xl">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-6">{stat.label}</p>
                <h3 className={`text-4xl font-black mb-4 text-${stat.color}-500 tracking-tighter`}>{stat.value}</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.benchmark}</p>
             </div>
           ))}
        </div>
      </section>

      {/* C. DETAILED REPORT BODY */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
         <div className="p-12 rounded-[64px] bg-[#0a0a0a] border border-white/5 shadow-2xl space-y-20">
            
            {/* Report Sub-Header */}
            <div className="flex justify-between items-end border-b border-white/5 pb-10">
               <div className="space-y-2">
                  <h2 className="text-3xl font-black uppercase tracking-tight">{activeTab} & <span className="text-blue-500">Access Audit.</span></h2>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Scope: {scope} • {metadata.generated}</p>
               </div>
               <div className="flex gap-4 no-print">
                  <button onClick={() => handleExport('EXCEL')} className="text-[9px] font-black uppercase text-gray-500 hover:text-white transition-colors">Raw Data (.csv)</button>
                  <button className="text-[9px] font-black uppercase text-gray-500 hover:text-white transition-colors">Visualization Set</button>
               </div>
            </div>

            {/* DYNAMIC CONTENT PER TAB */}
            {activeTab === 'Enrollment' && (
               <div className="space-y-16 animate-in fade-in duration-500">
                  <div className="grid lg:grid-cols-2 gap-16">
                     <div className="space-y-8">
                        <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Participation Trends</h4>
                        <div className="h-48 flex items-end gap-2 px-4 border-l border-b border-white/5 relative">
                           <div className="absolute top-0 right-4 text-[8px] font-black text-gray-700 uppercase">National GER Trace</div>
                           {[30, 45, 40, 55, 70, 65, 80, 92].map((h, i) => (
                              <div key={i} className="flex-1 bg-blue-600/20 relative group/bar">
                                 <div className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-1000" style={{ height: `${h}%` }} />
                              </div>
                           ))}
                        </div>
                        <div className="flex justify-between text-[8px] font-black uppercase text-gray-600 px-4">
                           <span>2018</span><span>2019</span><span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span><span>2025</span>
                        </div>
                     </div>
                     <div className="space-y-8">
                        <h4 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.4em] border-l-4 border-purple-600 pl-6">Demographic Parity</h4>
                        <div className="space-y-6">
                           {[
                              { label: 'Gender Gap (F:M)', val: 1.02, color: 'emerald' },
                              { label: 'Rural Access Density', val: '38%', color: 'blue' },
                              { label: 'Govt Sector Share', val: '45%', color: 'indigo' }
                           ].map((item, i) => (
                              <div key={i} className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 flex justify-between items-center group hover:border-white/20 transition-all">
                                 <span className="text-xs font-black uppercase text-gray-400 group-hover:text-white">{item.label}</span>
                                 <span className={`text-xl font-black text-${item.color}-500`}>{item.val}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'Skills' && (
               <div className="space-y-16 animate-in fade-in duration-500">
                  <div className="grid lg:grid-cols-2 gap-16">
                     <div className="space-y-10">
                        <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">Sector-wise Readiness</h4>
                        <div className="space-y-8">
                           {[
                              { label: 'IT & AI', v: 92, c: 'blue' },
                              { label: 'Healthcare', v: 74, c: 'indigo' },
                              { label: 'Manufacturing', v: 58, c: 'cyan' },
                              { label: 'Renewable Tech', v: 84, c: 'emerald' }
                           ].map((s, i) => (
                              <div key={i} className="space-y-3">
                                 <div className="flex justify-between items-end">
                                    <span className="text-xs font-black text-white uppercase">{s.label}</span>
                                    <span className="text-xs font-black text-gray-500">{s.v}% Readiness</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className={`h-full bg-${s.c}-600 transition-all duration-1000`} style={{ width: `${s.v}%` }} />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <div className="p-12 rounded-[56px] border border-white/10 bg-black/40 flex flex-col items-center justify-center text-center">
                        <div className="w-40 h-40 rounded-full border-8 border-cyan-600/20 border-t-cyan-500 flex items-center justify-center mb-10 relative">
                           <span className="text-5xl font-black">6.4</span>
                           <div className="absolute -bottom-2 px-3 py-1 bg-cyan-600 rounded-full text-[8px] font-black">AVG NSQF</div>
                        </div>
                        <h4 className="text-xl font-black uppercase mb-2">Skill Capital Baseline</h4>
                        <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed max-w-xs">
                           National average proficiency level for graduates entering the Tier-1 tech sector.
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'Performance' && (
               <div className="space-y-16 animate-in fade-in duration-500">
                  <div className="grid md:grid-cols-3 gap-8">
                     {[
                        { label: 'Retention Rate', val: '94.2%', d: 'Institutions above 90% benchmark.', i: '🏛️', c: 'blue' },
                        { label: 'Outcome Index', val: '0.82', d: 'Recruitment success conversion factor.', i: '🎯', c: 'emerald' },
                        { label: 'Infra Load', val: '88%', d: 'Average laboratory seat utilization.', i: '🔬', c: 'purple' }
                     ].map((box, i) => (
                        <div key={i} className="p-10 rounded-[56px] bg-white/[0.01] border border-white/5 text-center space-y-6">
                           <div className="text-4xl">{box.i}</div>
                           <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{box.label}</h4>
                           <h3 className={`text-4xl font-black text-${box.c}-500`}>{box.val}</h3>
                           <p className="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">{box.d}</p>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {/* D. AI INSIGHTS & FLAGS */}
            <div className="pt-20 border-t border-white/5">
               <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 shadow-2xl">💡</div>
                  <h3 className="text-xl font-black uppercase text-white">AI <span className="text-indigo-500">Synthesized Insights.</span></h3>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-10 rounded-[48px] bg-rose-600/5 border border-rose-500/20 group hover:bg-rose-600/10 transition-all">
                     <div className="flex justify-between items-center mb-6">
                        <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Active Deviation Flag</p>
                        <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                     </div>
                     <p className="text-lg font-medium text-gray-300 leading-relaxed italic">
                        "Rural enrollment in <span className="text-white">Applied AI</span> has plateaued. Current physical lab capacity in Tier-3 centers is 84% insufficient for the 2026 intake cycle."
                     </p>
                  </div>
                  <div className="p-10 rounded-[48px] bg-emerald-600/5 border border-emerald-500/20 group hover:bg-emerald-600/10 transition-all">
                     <div className="flex justify-between items-center mb-6">
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Policy Opportunity</p>
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                     </div>
                     <p className="text-lg font-medium text-gray-300 leading-relaxed italic">
                        "Institutional <span className="text-white">NEP Flexbility</span> score has risen by 18% following the ABC porting mandate. Recommend expanding the SWAYAM credit transfer cap to 50%."
                     </p>
                  </div>
               </div>
            </div>

            {/* E. EXPORT & ACCESS CONTROL */}
            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 no-print">
               <div className="flex flex-col gap-2">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Access Control Ledger</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase leading-relaxed">
                     Authorized for: Central Policy Council, Regional Commissioners. <br/>
                     <span className="text-blue-500">Watermark: sovereign-audit-layer-4</span>
                  </p>
               </div>
               <div className="flex gap-4">
                  <button onClick={() => window.print()} className="px-10 py-5 bg-white text-black rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                     Finalize National Audit
                  </button>
                  <button onClick={() => alert('Opening API Feed Configurator...')} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all">
                     Manage API Subscriptions
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Evidence <br/><span className="gradient-text">Over Opinion.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Transform national movements into structured institutional reports. 
              Career Soulmate provides the empirical foundation for the next decade of policymaking.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center no-print">
             <button onClick={() => alert('Opening Custom Query Builder...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Build Custom Policy Query
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Global Overview Terminal
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
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          main { padding-top: 0 !important; }
          .bg-[#050505], .bg-[#0a0a0a], .bg-[#080808], .bg-black { background: white !important; border-color: #eee !important; color: black !important; }
          .text-white, .text-gray-300, .text-gray-400, .text-gray-500, .text-gray-600 { color: black !important; }
          .border-white\/5, .border-white\/10 { border-color: #eee !important; }
          .shadow-2xl { box-shadow: none !important; }
          header, footer { display: none !important; }
          .gradient-text { background: none !important; -webkit-text-fill-color: black !important; color: black !important; }
        }
      `}</style>
    </div>
  );
};

export default GovReportsPage;
