
import React, { useState, useMemo } from 'react';

interface TransferRequest {
  id: string;
  studentName: string;
  originInstitution: string;
  program: string;
  creditsToTransfer: number;
  status: 'Pending' | 'Approved' | 'Review Required' | 'Rejected';
  dateSubmitted: string;
  direction: 'Incoming' | 'Outgoing';
}

interface EquivalenceMap {
  id: string;
  externalCourse: string;
  externalProvider: string;
  internalEquivalent: string;
  creditsGranted: number;
  conditions: string;
  status: 'Active' | 'Audit Pending';
}

const REQUESTS_DB: TransferRequest[] = [
  { id: 'tr1', studentName: 'Rohan Gupta', originInstitution: 'DTU, Delhi', program: 'B.Tech ME', creditsToTransfer: 32, status: 'Approved', dateSubmitted: '2025-02-10', direction: 'Incoming' },
  { id: 'tr2', studentName: 'Aditi Rao', originInstitution: 'MIT Manipal', program: 'B.Sc Data Science', creditsToTransfer: 18, status: 'Pending', dateSubmitted: '2025-02-22', direction: 'Incoming' },
  { id: 'tr3', studentName: 'Siddharth M.', originInstitution: 'Self', program: 'B.Tech CS', creditsToTransfer: 40, status: 'Review Required', dateSubmitted: '2025-02-24', direction: 'Outgoing' },
];

const EQUIVALENCE_DB: EquivalenceMap[] = [
  { id: 'eq1', externalCourse: 'Algorithms & Complexity', externalProvider: 'IIT Madras (NPTEL)', internalEquivalent: 'CS201: Data Structures', creditsGranted: 4, conditions: 'Min Score 75% in Proctored Exam', status: 'Active' },
  { id: 'eq2', externalCourse: 'Principles of Management', externalProvider: 'Amity University', internalEquivalent: 'MG101: Management Basics', creditsGranted: 3, conditions: 'Syllabus Match 85%', status: 'Audit Pending' },
  { id: 'eq3', externalCourse: 'Full Stack Bootcamp', externalProvider: 'Coding Ninjas', internalEquivalent: 'CS-VA02: Web Lab', creditsGranted: 2, conditions: 'Capstone Project Required', status: 'Active' },
];

const CollegeTransfersPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'equivalence'>('overview');

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. CREDIT TRANSFER OVERVIEW (HERO) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                ACADEMIC MOBILITY INTERFACE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Credit <span className="gradient-text">Portability.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Empowering student mobility through structured credit transfers. Career Soulmate 
                automates the validation of external learning against institutional standards.
              </p>
            </div>
            
            <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-3xl border border-white/10">
              {['overview', 'requests', 'equivalence'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-3xl font-black uppercase tracking-tight">The Transfer <span className="text-blue-500">Logic.</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Student mobility is no longer a bureaucratic nightmare. We follow the 
                <span className="text-white"> National Credit Framework (NCrF)</span> to ensure 
                seamless academic continuity.
              </p>
              <div className="grid gap-6">
                {[
                  { t: "Policy Compliance", d: "Alignment with NEP 2020 multi-entry/exit mandates.", i: "⚖️" },
                  { t: "Portability Limits", d: "Max 40% credits transferable via MOOCs/External providers.", i: "🚪" },
                  { t: "ABC Integration", d: "Direct sync with the Academic Bank of Credits (ABC).", i: "🏦" }
                ].map((rule, idx) => (
                  <div key={idx} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 flex gap-8 items-start hover:border-blue-500/20 transition-all">
                    <div className="text-3xl">{rule.i}</div>
                    <div>
                       <h4 className="text-sm font-black uppercase text-white mb-2">{rule.t}</h4>
                       <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{rule.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
              <div className="relative aspect-square p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl flex items-center justify-center">
                 <div className="text-center space-y-8">
                    <div className="w-24 h-24 rounded-[32px] bg-blue-600/20 flex items-center justify-center mx-auto border border-blue-500/30">
                       <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </div>
                    <h3 className="text-2xl font-black uppercase text-white tracking-tight">Dynamic <br/> Mobility Map</h3>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest max-w-xs mx-auto">
                       Tracking {REQUESTS_DB.length} active movements between 12 mapped partner institutions.
                    </p>
                    <div className="flex justify-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                       <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse [animation-delay:0.2s]" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* REQUESTS TAB */}
      {activeTab === 'requests' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           <div className="flex justify-between items-end mb-16">
              <div>
                 <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Queue.</span></h2>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Incoming and Outgoing Pipeline</p>
              </div>
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Bulk Validate</button>
           </div>

           <div className="overflow-x-auto rounded-[40px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/[0.02] border-b border-white/10">
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Student / Program</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Direction</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Origin</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Credits</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {REQUESTS_DB.map((req) => (
                       <tr key={req.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="p-8">
                             <div className="space-y-1">
                                <h4 className="text-sm font-black uppercase text-white">{req.studentName}</h4>
                                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{req.program}</p>
                             </div>
                          </td>
                          <td className="p-8">
                             <span className={`text-[10px] font-black uppercase tracking-widest ${req.direction === 'Incoming' ? 'text-emerald-500' : 'text-blue-500'}`}>{req.direction}</span>
                          </td>
                          <td className="p-8">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{req.originInstitution}</p>
                          </td>
                          <td className="p-8 text-center"><span className="text-sm font-black text-white">{req.creditsToTransfer}</span></td>
                          <td className="p-8 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                               req.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-500' : 
                               req.status === 'Pending' ? 'bg-blue-600/10 text-blue-500' : 
                               req.status === 'Rejected' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'
                             }`}>
                               {req.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>
      )}

      {/* EQUIVALENCE TAB */}
      {activeTab === 'equivalence' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           <div className="flex justify-between items-end mb-16">
              <div>
                 <h2 className="text-3xl font-black uppercase tracking-tight">Equivalence <span className="text-blue-500">Mastery.</span></h2>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Standardized curriculum mapping</p>
              </div>
              <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">Add Equivalence Rule</button>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {EQUIVALENCE_DB.map(eq => (
                <div key={eq.id} className="group p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-2xl">
                   <div className="md:w-1/4 space-y-2">
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{eq.externalProvider}</p>
                      <h4 className="text-xl font-black uppercase text-white leading-tight">{eq.externalCourse}</h4>
                   </div>

                   <div className="flex-grow flex items-center justify-center">
                      <div className="w-12 h-px bg-white/10 relative">
                         <div className="absolute inset-0 bg-blue-500 animate-pulse blur-[10px]" />
                         <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                      </div>
                   </div>

                   <div className="md:w-1/4 space-y-2 text-right">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Internal Module</p>
                      <h4 className="text-xl font-black uppercase text-white leading-tight">{eq.internalEquivalent}</h4>
                   </div>

                   <div className="md:w-1/4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
                      <div className="flex justify-between items-center">
                         <span className="text-[9px] font-black text-gray-600 uppercase">Credits Accepted</span>
                         <span className="text-sm font-black text-emerald-500">{eq.creditsGranted} Units</span>
                      </div>
                      <p className="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">Condition: {eq.conditions}</p>
                      <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                         <span className={`text-[8px] font-black uppercase tracking-widest ${eq.status === 'Active' ? 'text-emerald-500' : 'text-orange-500'}`}>{eq.status}</span>
                         <button className="text-[8px] font-black text-blue-500 uppercase tracking-widest hover:underline">Edit Policy</button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* D. STUDENT TRANSFER JOURNEY (VISUAL) */}
      {activeTab === 'requests' && (
        <section className="py-24 px-6 bg-[#080808] border-t border-white/5 relative overflow-hidden">
           <div className="max-w-7xl mx-auto relative z-10 text-center">
              <h2 className="text-3xl font-black uppercase tracking-tight mb-20">Lifecycle <span className="text-blue-500">Automation.</span></h2>
              <div className="grid md:grid-cols-4 gap-8">
                 {[
                    { l: "Application", d: "Student initiates via ABC ID portal integration.", i: "📄" },
                    { l: "Evaluation", d: "AI compares syllabus against equivalence matrix.", i: "🔍" },
                    { l: "Approval", d: "Academic council signs off on credit weights.", i: "✅" },
                    { l: "Sync", d: "Credits deposited into Student Degree Vault.", i: "🏦" }
                 ].map((step, idx) => (
                    <div key={idx} className="relative group">
                       <div className="w-20 h-20 rounded-[32px] bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-8 text-3xl group-hover:bg-blue-600 transition-all">
                          {step.i}
                       </div>
                       <h4 className="text-sm font-black uppercase text-white mb-2 tracking-widest">{step.l}</h4>
                       <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-6">{step.d}</p>
                       {idx < 3 && (
                          <div className="absolute top-10 left-[60%] right-[-40%] h-px bg-white/5 hidden md:block" />
                       )}
                    </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Portability <br/><span className="gradient-text">Protocol.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Academic time is precious. Career Soulmate ensures every credit 
              earned elsewhere is an asset here. Zero friction, total mobility.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Rule Builder...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Build New Equivalence Rule
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Export Compliance Report
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
      `}</style>
    </div>
  );
};

export default CollegeTransfersPage;
