
import React, { useState, useMemo } from 'react';

interface ConflictItem {
  id: string;
  type: 'Student Clash' | 'Faculty Overlap' | 'Room Conflict' | 'Credit Violation';
  severity: 'Critical' | 'Warning' | 'Info';
  subject: string;
  affected: string;
  timestamp: string;
  explanation: string;
  violatedConstraint: string;
  suggestions: { id: string; action: string; impact: string }[];
}

const CONFLICTS_DB: ConflictItem[] = [
  {
    id: 'CF-101',
    type: 'Faculty Overlap',
    severity: 'Critical',
    subject: 'Neural Architectures (S6)',
    affected: 'Prof. Ritesh Lenka',
    timestamp: '10:00 AM - 11:30 AM',
    explanation: 'Faculty assigned to two synchronous sessions across disparate departments.',
    violatedConstraint: 'Faculty Continuity Rule (Max 1 location/slot)',
    suggestions: [
      { id: 's1', action: 'Swap Prof. Lenka with Asst. Prof. Mishra (Reserve)', impact: 'Resolves instantly; 0 student shift.' },
      { id: 's2', action: 'Move S6 Neural to 02:00 PM slot', impact: 'Resolves overlap; requires 40 students to shift.' }
    ]
  },
  {
    id: 'CF-102',
    type: 'Room Conflict',
    severity: 'Critical',
    subject: 'Algorithms Lab (Batch B)',
    affected: 'Lab 402 (Capacity: 30)',
    timestamp: '11:30 AM - 01:30 PM',
    explanation: 'Batch size (42 students) exceeds designated lab physical capacity.',
    violatedConstraint: 'Room Capacity Safety Threshold (90% Max)',
    suggestions: [
      { id: 's3', action: 'Relocate to Main Auditorium (Swayam Mode)', impact: 'Accommodates all; 15% reduction in hands-on depth.' },
      { id: 's4', action: 'Split Batch B into B1 & B2', impact: 'Ensures quality; requires 2 additional faculty hours.' }
    ]
  },
  {
    id: 'CF-103',
    type: 'Student Clash',
    severity: 'Warning',
    subject: 'Interdisciplinary Minor: Philosophy',
    affected: 'B.Tech CS Cohort (12 Students)',
    timestamp: '09:00 AM - 10:00 AM',
    explanation: 'NEP 2020 multi-disciplinary elective overlaps with Core Data Structures.',
    violatedConstraint: 'Inter-Departmental Synchronicity',
    suggestions: [
      { id: 's5', action: 'Switch Philosophy to Hybrid (Recorded)', impact: 'Removes clash; students earn credits via ABC portal.' },
      { id: 's6', action: 'Shift DS Core for affected students only', impact: 'Logistically complex; 100% attendance.' }
    ]
  }
];

const AdminTimetableConflictsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedConflictId, setSelectedConflictId] = useState<string | null>(CONFLICTS_DB[0].id);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const activeConflicts = useMemo(() => 
    CONFLICTS_DB.filter(c => !resolvedIds.includes(c.id))
  , [resolvedIds]);

  const selectedConflict = useMemo(() => 
    CONFLICTS_DB.find(c => c.id === selectedConflictId)
  , [selectedConflictId]);

  const handleResolve = (id: string) => {
    setResolvedIds(prev => [...prev, id]);
    setSelectedConflictId(null);
  };

  const stats = {
    total: CONFLICTS_DB.length,
    resolved: resolvedIds.length,
    critical: activeConflicts.filter(c => c.severity === 'Critical').length
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. CONFLICT DASHBOARD HERO */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-rose-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black tracking-widest uppercase">
                CONSTRAINT VIOLATION MONITOR
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Conflict <span className="gradient-text">Resolution.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Schedule transparency for institutional trust. Identify clashes, 
                understand the underlying logic, and deploy AI-assisted fixes instantly.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-rose-500/30 transition-all">
                  <p className="text-3xl font-black text-rose-500 mb-1">{stats.critical}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Critical</p>
               </div>
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-emerald-500/30 transition-all">
                  <p className="text-3xl font-black text-emerald-500 mb-1">{stats.resolved}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Resolved</p>
               </div>
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-indigo-500/30 transition-all">
                  <p className="text-3xl font-black text-white mb-1">{stats.total}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">Detected</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. CONFLICT MANAGEMENT WORKSPACE */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
           
           {/* Conflict List Sidebar */}
           <div className="lg:col-span-4 space-y-6">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10">Active Violations</h3>
              {activeConflicts.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-[40px] opacity-40">
                   <p className="text-sm font-black uppercase text-gray-500">Zero Conflicts</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {activeConflicts.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedConflictId(c.id)}
                      className={`relative p-6 rounded-3xl border transition-all duration-300 text-left group overflow-hidden ${selectedConflictId === c.id ? 'bg-rose-600/10 border-rose-500/50 shadow-2xl' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500 bg-rose-500 ${selectedConflictId === c.id ? 'opacity-100' : 'opacity-20'}`} />
                      <div className="flex justify-between items-start mb-2">
                         <span className={`text-[10px] font-black uppercase tracking-widest ${c.severity === 'Critical' ? 'text-rose-500' : 'text-orange-500'}`}>{c.type}</span>
                         <span className="text-[8px] font-black text-gray-700 uppercase">{c.id}</span>
                      </div>
                      <h4 className="text-sm font-black uppercase text-white group-hover:text-rose-400 transition-colors">{c.subject}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mt-2">{c.affected}</p>
                    </button>
                  ))}
                </div>
              )}
           </div>

           {/* Conflict Detail & Resolution View */}
           <div className="lg:col-span-8">
              {selectedConflict ? (
                <div className="space-y-8 animate-in zoom-in duration-500">
                   <div className="p-12 rounded-[64px] border border-white/10 bg-[#0a0a0a] shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-5">
                         <svg width="200" height="200" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                      </div>

                      <div className="relative z-10 space-y-12">
                         <div className="flex justify-between items-start">
                            <div className="space-y-4">
                               <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${selectedConflict.severity === 'Critical' ? 'bg-rose-500 text-white animate-pulse' : 'bg-orange-500 text-white'}`}>
                                  {selectedConflict.severity} Violation
                               </span>
                               <h2 className="text-4xl font-black uppercase text-white tracking-tighter leading-tight">{selectedConflict.subject}</h2>
                               <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{selectedConflict.affected} • {selectedConflict.timestamp}</p>
                            </div>
                         </div>

                         <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                            <div className="space-y-4">
                               <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">The Explanation</h4>
                               <p className="text-gray-300 text-lg font-medium leading-relaxed italic border-l-4 border-rose-500/40 pl-8">
                                  "{selectedConflict.explanation}"
                               </p>
                            </div>
                            <div className="space-y-4">
                               <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em]">Constraint Violated</h4>
                               <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                  <p className="text-xs font-black text-white uppercase tracking-tight">{selectedConflict.violatedConstraint}</p>
                                  <p className="text-[9px] text-gray-600 font-bold uppercase mt-2">Rule v4.2 Internal Logic</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* C. AI RESOLUTION SUGGESTIONS */}
                   <div className="space-y-6">
                      <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] ml-6">AI Assisted Resolutions</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                         {selectedConflict.suggestions.map((s) => (
                           <div key={s.id} className="p-10 rounded-[56px] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all group flex flex-col h-full">
                              <div className="flex justify-between items-start mb-6">
                                 <div className="w-10 h-10 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-500 text-xl">💡</div>
                                 <span className="text-[8px] font-black text-gray-600 uppercase">Suggestion {s.id}</span>
                              </div>
                              <h4 className="text-lg font-black uppercase text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight">{s.action}</h4>
                              <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed mb-10 flex-grow">Impact: {s.impact}</p>
                              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
                                 <button className="py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">Modify</button>
                                 <button 
                                   onClick={() => handleResolve(selectedConflict.id)}
                                   className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20"
                                 >
                                    Accept
                                 </button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[64px] text-center p-20 opacity-30">
                   <div className="text-6xl mb-8">🛠️</div>
                   <h3 className="text-2xl font-black uppercase text-gray-500">Select Conflict to Debug</h3>
                   <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-4 max-w-sm mx-auto">Analyze scheduling inconsistencies and deploy systemic fixes through the transparency engine.</p>
                </div>
              )}
           </div>
        </div>
      </section>

      {/* C. SYSTEM TRUST INDICATORS (BOTTOM) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-20">Platform <span className="text-blue-500">Integrity Audit.</span></h2>
            <div className="grid md:grid-cols-4 gap-8">
               {[
                 { label: 'Auto-Resolved', val: '84%', d: 'Conflicts handled by heuristic defaults.', c: 'emerald' },
                 { label: 'Human Overrides', val: '12', d: 'Manual adjustments to AI suggestions.', c: 'blue' },
                 { label: 'Logic Consistency', val: '99.9%', d: 'Mathematical schedule proofing.', c: 'indigo' },
                 { label: 'Waitlist Impact', val: '0', d: 'Students dropped due to clashes.', c: 'purple' }
               ].map((item, i) => (
                 <div key={i} className="p-10 rounded-[56px] bg-black/60 border border-white/10 flex flex-col items-center group hover:border-white/20 transition-all">
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-6">{item.label}</p>
                    <span className={`text-4xl font-black text-${item.c}-500 mb-4`}>{item.val}</span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-6">{item.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Total <br/><span className="gradient-text">Visibility.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              No black-box scheduling. Every timetable choice is made visible, 
              explainable, and human-verified. Build your institution on the foundation of data trust.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Generating Conflict Audit Report...')} className="px-12 py-6 bg-rose-600 hover:bg-rose-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-rose-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Conflict Audit PDF
             </button>
             <button onClick={() => onNavigate('admin-timetable-generate')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to Active Timetable
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(244, 63, 94, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(244, 63, 94, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #f43f5e 1px, transparent 1px),
                            linear-gradient(to bottom, #f43f5e 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .text-rose-500 { color: #f43f5e; }
        .text-orange-500 { color: #f97316; }
        .text-emerald-500 { color: #10b981; }
        .text-indigo-500 { color: #6366f1; }
        .bg-rose-500 { background-color: #f43f5e; }
        .bg-emerald-600 { background-color: #059669; }
      `}</style>
    </div>
  );
};

export default AdminTimetableConflictsPage;
