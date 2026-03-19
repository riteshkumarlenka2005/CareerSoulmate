
import React, { useState, useMemo } from 'react';

type ReportType = 'Academic' | 'Outcomes' | 'NEP' | 'Operations' | 'Skills' | 'Custom';

interface MetricBox {
  label: string;
  value: string | number;
  benchmark: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

const AdminReportsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeReport, setActiveReport] = useState<ReportType>('Academic');
  const [period, setPeriod] = useState('Current Academic Session');
  const [isExporting, setIsExporting] = useState(false);

  const metadata = {
    institution: 'National Institute of Strategic Arts & Tech (NISAT)',
    period: period,
    generatedBy: 'Admin_Master_01',
    version: 'v4.8.2-SECURE',
    timestamp: new Date().toLocaleString()
  };

  const kpis: Record<ReportType, MetricBox[]> = {
    Academic: [
      { label: 'Syllabus Coverage', value: '78%', benchmark: 'Target 85%', trend: 'up', color: 'blue' },
      { label: 'Avg Faculty Load', value: '14.2h', benchmark: 'Limit 18h', trend: 'stable', color: 'cyan' },
      { label: 'Elective Fill Rate', value: '92%', benchmark: 'Prev 88%', trend: 'up', color: 'emerald' },
      { label: 'Credit Compliance', value: '100%', benchmark: 'NCrF Standard', trend: 'stable', color: 'purple' }
    ],
    Outcomes: [
      { label: 'Retention Rate', value: '97.4%', benchmark: 'Nat. Avg 91%', trend: 'up', color: 'emerald' },
      { label: 'Career Clarity', value: '8.2/10', benchmark: 'Goal 8.5', trend: 'up', color: 'blue' },
      { label: 'Placement Rate', value: '64%', benchmark: 'YTD Target 70%', trend: 'down', color: 'rose' },
      { label: 'Avg LPA (Sim)', value: '₹14.2', benchmark: 'Prev ₹12.8', trend: 'up', color: 'cyan' }
    ],
    NEP: [
      { label: 'Multi-Exit Users', value: '124', benchmark: 'Cohort 4,820', trend: 'up', color: 'purple' },
      { label: 'Interdisciplinary Cr', value: '18%', benchmark: 'Goal 20%', trend: 'up', color: 'indigo' },
      { label: 'Vocational Sync', value: '84%', benchmark: 'Min 60%', trend: 'stable', color: 'emerald' },
      { label: 'ABC Sync Rate', value: '100%', benchmark: 'Real-time', trend: 'stable', color: 'blue' }
    ],
    Operations: [
      { label: 'Timetable Conflict', value: '0.4%', benchmark: 'Max 1.0%', trend: 'down', color: 'emerald' },
      { label: 'Lab Utilization', value: '92%', benchmark: 'Optimum 85%', trend: 'up', color: 'orange' },
      { label: 'Room Congestion', value: '42%', benchmark: 'Limit 70%', trend: 'stable', color: 'cyan' },
      { label: 'Seat Yield', value: '88%', benchmark: 'Target 90%', trend: 'up', color: 'blue' }
    ],
    Skills: [
      { label: 'NSQF Avg Level', value: '6.4', benchmark: 'Entry 4.0', trend: 'up', color: 'cyan' },
      { label: 'Skill Demand Gap', value: '14%', benchmark: 'Prev 22%', trend: 'down', color: 'emerald' },
      { label: 'Internship Participation', value: '72%', benchmark: 'Cohort Avg', trend: 'up', color: 'blue' },
      { label: 'Industry Partners', value: '45', benchmark: 'Goal 50', trend: 'up', color: 'indigo' }
    ],
    Custom: []
  };

  const handleExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Report serialized in ${format} format. Secure download initiated.`);
    }, 1500);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. REPORT METADATA & HEADER */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808] z-40 no-print">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                INSTITUTIONAL PERFORMANCE LEDGER
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Reports & <span className="gradient-text">Audits.</span>
              </h1>
              <div className="flex flex-wrap gap-8 text-[10px] font-black text-gray-500 uppercase tracking-widest pt-4">
                 <div className="flex items-center gap-2"><span className="text-blue-500">ID:</span> {metadata.institution}</div>
                 <div className="flex items-center gap-2"><span className="text-blue-500">PERIOD:</span> {metadata.period}</div>
                 <div className="flex items-center gap-2"><span className="text-blue-500">STAMP:</span> {metadata.timestamp}</div>
              </div>
            </div>

            <div className="flex gap-4">
               <button onClick={() => handleExport('PDF')} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Export PDF</button>
               <button onClick={() => handleExport('EXCEL')} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Excel</button>
               <button onClick={() => handleExport('API')} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl shadow-blue-600/30">API Share</button>
            </div>
          </div>

          <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-3xl border border-white/10 overflow-x-auto custom-scrollbar no-print">
            {Object.keys(kpis).map((type) => (
              <button 
                key={type}
                onClick={() => setActiveReport(type as ReportType)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeReport === type ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
              >
                {type} Reports
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRINT-ONLY HEADER */}
      <div className="hidden print:block p-12 text-black text-center border-b-2 border-black mb-12">
         <h1 className="text-3xl font-black uppercase mb-2">OFFICIAL INSTITUTIONAL REPORT</h1>
         <p className="text-sm font-bold uppercase">{metadata.institution}</p>
         <p className="text-xs mt-4">Generated on: {metadata.timestamp} | {metadata.version}</p>
      </div>

      {/* B. KEY METRICS SUMMARY (KPI RIBBON) */}
      <section className="py-12 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {kpis[activeReport].map((stat, i) => (
             <div key={i} className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group shadow-xl">
                <div className="flex justify-between items-start mb-6">
                   <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                   <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : stat.trend === 'down' ? 'bg-rose-500/10 text-rose-500' : 'bg-white/5 text-gray-500'}`}>
                      {stat.trend === 'up' ? '▲ Trend' : stat.trend === 'down' ? '▼ Trend' : '• Stable'}
                   </span>
                </div>
                <h3 className={`text-4xl font-black mb-4 text-${stat.color}-500 tracking-tighter leading-none`}>{stat.value}</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.benchmark}</p>
             </div>
           ))}
        </div>
      </section>

      {/* C. DETAILED CONTENT AREA */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
         <div className="p-12 rounded-[64px] bg-[#0a0a0a] border border-white/5 shadow-2xl space-y-16">
            
            {activeReport === 'Academic' && (
               <div className="space-y-12 animate-in fade-in duration-500">
                  <div className="flex justify-between items-end">
                     <h2 className="text-2xl font-black uppercase tracking-tight">Faculty <span className="text-blue-500">Workload Balance.</span></h2>
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Aggregate View: All Depts</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                     {[
                       { d: 'School of Engineering', v: 72, l: 'Optimal Load' },
                       { d: 'Commerce & Management', v: 94, l: 'Near Capacity' },
                       { d: 'Liberal Arts Division', v: 45, l: 'Under Utilized' }
                     ].map((item, i) => (
                       <div key={i} className="space-y-4">
                          <div className="flex justify-between items-end">
                             <span className="text-[11px] font-black uppercase text-gray-400">{item.d}</span>
                             <span className="text-sm font-black text-white">{item.v}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className={`h-full transition-all duration-1000 ${item.v > 90 ? 'bg-rose-600' : 'bg-blue-600'}`} style={{ width: `${item.v}%` }} />
                          </div>
                          <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{item.l}</p>
                       </div>
                     ))}
                  </div>

                  <div className="pt-16 border-t border-white/5">
                     <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10">Course Coverage Report</h4>
                     <div className="overflow-x-auto rounded-3xl border border-white/5">
                        <table className="w-full text-left border-collapse">
                           <thead>
                              <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                                 <th className="p-6">Course Code</th>
                                 <th className="p-6">Module Name</th>
                                 <th className="p-6">Instructor</th>
                                 <th className="p-6">Completion %</th>
                                 <th className="p-6">Status</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-white/5">
                              {[
                                { c: 'CS302', n: 'Neural Architectures', i: 'Dr. Ritesh Lenka', p: 84, s: 'On Track' },
                                { c: 'MG105', n: 'FinTech Compliance', i: 'Prof. M. Mishra', p: 42, s: 'Behind' },
                                { c: 'DS101', n: 'Visual Arts Foundations', i: 'L. Mishra', p: 100, s: 'Complete' }
                              ].map(row => (
                                <tr key={row.c} className="hover:bg-white/[0.01] transition-colors">
                                   <td className="p-6 text-[10px] font-black text-blue-500 uppercase">{row.c}</td>
                                   <td className="p-6 text-[11px] font-black uppercase text-white">{row.n}</td>
                                   <td className="p-6 text-[10px] font-bold text-gray-500 uppercase">{row.i}</td>
                                   <td className="p-6">
                                      <div className="flex items-center gap-3">
                                         <span className="text-xs font-black tabular-nums">{row.p}%</span>
                                         <div className="h-1 flex-grow bg-white/5 rounded-full overflow-hidden max-w-[80px]">
                                            <div className="h-full bg-blue-600" style={{ width: `${row.p}%` }} />
                                         </div>
                                      </div>
                                   </td>
                                   <td className="p-6">
                                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${row.s === 'Behind' ? 'bg-rose-500/10 text-rose-500' : row.s === 'Complete' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-600/10 text-blue-500'}`}>{row.s}</span>
                                   </td>
                                </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            )}

            {activeReport === 'Outcomes' && (
               <div className="space-y-16 animate-in slide-in-from-right duration-500">
                  <div className="grid lg:grid-cols-2 gap-16">
                     <div className="space-y-10">
                        <h3 className="text-2xl font-black uppercase tracking-tight">Placement <span className="text-blue-500">Funnel.</span></h3>
                        <div className="space-y-2">
                           {[
                              { l: 'Total Batch Eligible', v: 4820, c: 'bg-blue-600/20' },
                              { l: 'Verified Portfolio Lock', v: 3140, c: 'bg-blue-600/40' },
                              { l: 'Interview Cleared', v: 1240, c: 'bg-blue-600/60' },
                              { l: 'Offer Received', v: 412, c: 'bg-blue-600/80' }
                           ].map((step, i) => (
                             <div key={i} className="flex items-center gap-6 group">
                                <div className={`h-14 rounded-2xl flex items-center justify-between px-10 transition-all group-hover:scale-[1.02] ${step.c}`} style={{ width: `${100 - (i * 10)}%` }}>
                                   <span className="text-[10px] font-black uppercase text-white">{step.l}</span>
                                   <span className="text-xl font-black text-white">{step.v}</span>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="p-12 rounded-[56px] bg-[#080808] border border-white/5 flex flex-col items-center justify-center text-center">
                        <div className="w-40 h-40 rounded-full border-8 border-indigo-600/20 border-t-indigo-500 flex items-center justify-center mb-8 relative">
                           <span className="text-5xl font-black text-white">8.2</span>
                           <div className="absolute -bottom-2 px-3 py-1 bg-indigo-600 rounded-full text-[8px] font-black">STABLE</div>
                        </div>
                        <h4 className="text-xl font-black uppercase text-white mb-2">Clarity Benchmark</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed max-w-xs">
                           Average student certainty index across 42 career domains. Current batch is 12% above national clarity baseline.
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {activeReport === 'NEP' && (
               <div className="space-y-16 animate-in fade-in duration-500">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                     <div className="space-y-12">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight">National Credit <br/><span className="text-purple-500">Framework Sync.</span></h3>
                        <div className="space-y-6">
                           {[
                              { t: 'Multi-Exit Map Ready', d: '92% of programs verified for Year 1-3 exit awards.', i: '✓' },
                              { t: 'Vocational Unit Parity', d: 'NSQF competency standards mapped to 85% of Lab modules.', i: '✓' },
                              { t: 'ABC Integration Pulse', d: 'Institutional API heartbeat: 100% Active.', i: '✓' }
                           ].map((item, i) => (
                             <div key={i} className="flex gap-6 items-start group">
                                <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-500 border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">{item.i}</div>
                                <div className="space-y-1">
                                   <h5 className="text-sm font-black uppercase text-white tracking-widest">{item.t}</h5>
                                   <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="p-12 rounded-[56px] border border-white/5 bg-black/40 shadow-2xl">
                        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10">Interdisciplinary Credit Mix</h4>
                        <div className="relative aspect-square max-w-[280px] mx-auto">
                           {/* Simplified CSS Circle Graph Mock */}
                           <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg]">
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="15" />
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="15" strokeDasharray="188.5" strokeDashoffset="50" />
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#a855f7" strokeWidth="15" strokeDasharray="188.5" strokeDashoffset="150" />
                           </svg>
                           <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                              <span className="text-3xl font-black text-white">18%</span>
                              <span className="text-[7px] font-black text-gray-500 uppercase">Non-Core</span>
                           </div>
                        </div>
                        <div className="mt-10 grid grid-cols-2 gap-4">
                           <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-500" /><span className="text-[9px] font-black text-gray-500 uppercase">Major Core</span></div>
                           <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-500" /><span className="text-[9px] font-black text-gray-500 uppercase">Multi-Discip.</span></div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* D. AI INSIGHTS & FLAGS (AUTO-GENERATED) */}
            <div className="pt-20 border-t border-white/5">
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 shadow-2xl">💡</div>
                  <h3 className="text-xl font-black uppercase text-white">AI <span className="text-blue-500">Synthesized Insights.</span></h3>
               </div>
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[40px] bg-rose-600/5 border border-rose-500/20 group hover:bg-rose-600/10 transition-all">
                     <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-4">Anomaly Detected</p>
                     <p className="text-sm font-medium text-gray-300 leading-relaxed italic">
                        "Current semester <span className="text-white">faculty workload</span> in the School of Engineering is 14% above safe capacity. Potential burnout risk flagged for 12 senior researchers."
                     </p>
                  </div>
                  <div className="p-8 rounded-[40px] bg-emerald-600/5 border border-emerald-500/20 group hover:bg-emerald-600/10 transition-all">
                     <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-4">Opportunity Window</p>
                     <p className="text-sm font-medium text-gray-300 leading-relaxed italic">
                        "Student interest in <span className="text-white">FinTech</span> has spiked by 65%. 
                        Recommending introduction of a 4-credit 'Digital Finance' elective basket for the next cycle."
                     </p>
                  </div>
               </div>
            </div>

            {/* E. EXPORT & ACCESS CONTROL */}
            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 no-print">
               <div className="flex flex-col gap-2">
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Access Control Ledger</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase leading-relaxed">
                     Authorized for: Executive Council, Dept. Heads. <br/>
                     <span className="text-blue-500">Watermark: nisat-master-01-audit</span>
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="px-10 py-5 bg-white text-black rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl">
                     Download Comprehensive PDF
                  </button>
                  <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all">
                     View Access History
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center no-print">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Performance <br/><span className="gradient-text">Visible.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Accountability through data mastery. Career Soulmate convertsinstitutional 
              movements into a single, verifiable ledger of excellence.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Custom Report Builder...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Build Custom Report
             </button>
             <button onClick={() => onNavigate('admin-dashboard')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to Live Console
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
          .gradient-text { -webkit-text-fill-color: black !important; background: none !important; color: black !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminReportsPage;
