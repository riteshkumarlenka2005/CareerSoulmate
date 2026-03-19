
import React, { useState, useMemo } from 'react';

interface ExportLog {
  id: string;
  reportType: string;
  format: string;
  recipient: string;
  timestamp: string;
  status: 'Verified' | 'Pending' | 'Archived';
}

const CounselorExportPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [reportType, setReportType] = useState('Full Developmental Dossier');
  const [format, setFormat] = useState('PDF (Institutional)');
  const [period, setPeriod] = useState('Last 30 Days');
  const [detailLevel, setDetailLevel] = useState('Full Comprehensive');
  const [isExporting, setIsExporting] = useState(false);

  const auditLog: ExportLog[] = [
    { id: 'EXP-102', reportType: 'Skill Gap Audit', format: 'Excel', recipient: 'Dept. Head (CS)', timestamp: '2 hours ago', status: 'Verified' },
    { id: 'EXP-101', reportType: 'Risk Intervention Log', format: 'PDF', recipient: 'Parent (L-9821)', timestamp: 'Yesterday', status: 'Archived' },
    { id: 'EXP-099', reportType: 'Placement Readiness', format: 'CSV', recipient: 'ERP System Push', timestamp: '2 days ago', status: 'Verified' }
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Report configuration serialized. Download commencing...');
    }, 2000);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. EXPORT CONFIGURATION HERO */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                SECURE COMPLIANCE TERMINAL
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Export <span className="gradient-text">Intelligence.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Controlled sharing for institutional compliance. Configure structured 
                reports for stakeholders, parents, and administrative audits with full data sovereignty.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-indigo-500/30 transition-all">
                  <p className="text-2xl font-black text-white mb-1">142</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Total Exports</p>
               </div>
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-emerald-500/30 transition-all">
                  <p className="text-2xl font-black text-emerald-500 mb-1">100%</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">GDPR Compliant</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. CONFIGURATION PANEL */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Settings Col */}
          <div className="lg:col-span-2 space-y-12">
             <div className="space-y-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white border-l-4 border-indigo-600 pl-6">Report Parameters</h3>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Report Topology</label>
                      <select 
                        value={reportType} 
                        onChange={(e) => setReportType(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-black uppercase tracking-widest outline-none focus:border-indigo-500 transition-all text-white"
                      >
                         <option>Full Developmental Dossier</option>
                         <option>Career Alignment Map</option>
                         <option>Skill Readiness Audit</option>
                         <option>Risk & Intervention Log</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Time Horizon</label>
                      <select 
                        value={period} 
                        onChange={(e) => setPeriod(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-black uppercase tracking-widest outline-none focus:border-indigo-500 transition-all text-white"
                      >
                         <option>Last 30 Days</option>
                         <option>Current Semester</option>
                         <option>Academic Year 2024-25</option>
                         <option>Lifetime (Archival)</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Detail Resolution</label>
                      <select 
                        value={detailLevel} 
                        onChange={(e) => setDetailLevel(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-black uppercase tracking-widest outline-none focus:border-indigo-500 transition-all text-white"
                      >
                         <option>Full Comprehensive</option>
                         <option>Executive Summary</option>
                         <option>Raw Data Export</option>
                      </select>
                   </div>
                   <div className="space-y-3 flex flex-col justify-end">
                      <button className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">Select Learners (Batch)</button>
                   </div>
                </div>
             </div>

             <div className="space-y-8 pt-12 border-t border-white/5">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white border-l-4 border-emerald-600 pl-6">Output Channel</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {[
                      { label: 'PDF (Print)', icon: '📄', id: 'PDF (Institutional)' },
                      { label: 'Excel (Sheet)', icon: '📊', id: 'Excel' },
                      { label: 'CSV (System)', icon: '💾', id: 'CSV' },
                      { label: 'API Push', icon: '📡', id: 'API' }
                   ].map((f) => (
                      <button 
                        key={f.id}
                        onClick={() => setFormat(f.id)}
                        className={`p-6 rounded-[32px] border transition-all flex flex-col items-center gap-3 ${format === f.id ? 'bg-emerald-600/10 border-emerald-500 shadow-2xl' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                      >
                         <span className="text-2xl">{f.icon}</span>
                         <span className="text-[9px] font-black uppercase tracking-widest text-white">{f.label}</span>
                      </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Action Col */}
          <div className="lg:col-span-1">
             <div className="sticky top-32 p-12 rounded-[64px] bg-[#0a0a0a] border border-white/10 shadow-2xl space-y-10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full" />
                
                <div className="relative z-10 space-y-6">
                   <h4 className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-8">Metadata Verification</h4>
                   <div className="space-y-4">
                      <div className="flex justify-between border-b border-white/5 pb-3">
                         <span className="text-[9px] font-black text-gray-500 uppercase">Branding</span>
                         <span className="text-[9px] font-black text-white uppercase">Institutional Active</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                         <span className="text-[9px] font-black text-gray-500 uppercase">Version</span>
                         <span className="text-[9px] font-black text-white uppercase">v4.2.1-SECURE</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                         <span className="text-[9px] font-black text-gray-500 uppercase">Signature</span>
                         <span className="text-[9px] font-black text-emerald-500 uppercase">Verified Digital</span>
                      </div>
                   </div>

                   <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Confidentiality Notice</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed italic">
                         "This document contains protected intellectual and personal data. Authorized distribution only."
                      </p>
                   </div>

                   <button 
                     onClick={handleExport}
                     disabled={isExporting}
                     className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] transition-all shadow-2xl relative overflow-hidden ${isExporting ? 'bg-gray-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'}`}
                   >
                      <span className="relative z-10">{isExporting ? 'Generating...' : 'Finalize & Export'}</span>
                      {isExporting && (
                         <div className="absolute inset-0 bg-blue-500/20 animate-pulse" />
                      )}
                   </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* C. AUDIT LOG & HISTORY */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="flex justify-between items-end mb-16">
              <div className="space-y-2">
                 <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Access <br/><span className="text-blue-500">Audit Log.</span></h2>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Non-repudiation tracking for all data movements</p>
              </div>
              <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest">Clear Archived Logs</button>
           </div>

           <div className="overflow-x-auto rounded-[40px] border border-white/5 bg-black/40">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Transaction ID</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Report Subject</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Recipient / Target</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Time</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {auditLog.map((log) => (
                       <tr key={log.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="p-8"><span className="text-xs font-black text-gray-600 group-hover:text-blue-500 transition-colors uppercase">{log.id}</span></td>
                          <td className="p-8">
                             <div className="space-y-1">
                                <h4 className="text-sm font-black uppercase text-white">{log.reportType}</h4>
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Format: {log.format}</p>
                             </div>
                          </td>
                          <td className="p-8">
                             <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{log.recipient}</p>
                          </td>
                          <td className="p-8"><span className="text-[10px] font-black text-gray-500 uppercase">{log.timestamp}</span></td>
                          <td className="p-8 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                               log.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/5 text-gray-600'
                             }`}>{log.status}</span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Share with <br/><span className="gradient-text">Integrity.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Exporting data is a responsibility, not just a feature. Career Soulmate 
              ensures your professional insights are shared securely and professionally.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Archival Manager...')} className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Manage Local Archives
             </button>
             <button onClick={() => onNavigate('counselor-report')} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-[10px]">
               Back to Progress Reports
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(99, 102, 241, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(99, 102, 241, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #6366f1 1px, transparent 1px),
                            linear-gradient(to bottom, #6366f1 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default CounselorExportPage;
