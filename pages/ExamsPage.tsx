
import React, { useState, useMemo } from 'react';

interface Exam {
  id: string;
  name: string;
  purpose: 'UG' | 'PG' | 'Job' | 'Research';
  regStart: string;
  regEnd: string;
  examDate: string;
  resultDate: string;
  priority: 'Critical' | 'High' | 'Medium';
  readiness: number; // 0-100
  intensity: 'Low' | 'Moderate' | 'High' | 'Intense';
  description: string;
}

const EXAMS_DB: Exam[] = [
  {
    id: 'jee_adv_2025',
    name: 'JEE Advanced 2025',
    purpose: 'UG',
    regStart: 'April 27, 2025',
    regEnd: 'May 07, 2025',
    examDate: 'May 25, 2025',
    resultDate: 'June 08, 2025',
    priority: 'Critical',
    readiness: 65,
    intensity: 'Intense',
    description: 'Entrance for Indian Institutes of Technology (IITs). Requires extreme logical rigour.'
  },
  {
    id: 'cuet_ug_2025',
    name: 'CUET UG 2025',
    purpose: 'UG',
    regStart: 'Feb 27, 2025',
    regEnd: 'March 26, 2025',
    examDate: 'May 15 - May 31, 2025',
    resultDate: 'June 30, 2025',
    priority: 'High',
    readiness: 82,
    intensity: 'Moderate',
    description: 'Common University Entrance Test for Central Universities across India.'
  },
  {
    id: 'gate_2026',
    name: 'GATE 2026',
    purpose: 'PG',
    regStart: 'Aug 30, 2025',
    regEnd: 'Sept 30, 2025',
    examDate: 'Feb 01, 2026',
    resultDate: 'March 15, 2026',
    priority: 'Medium',
    readiness: 15,
    intensity: 'Low',
    description: 'Graduate Aptitude Test in Engineering for PG admission and PSU recruitment.'
  },
  {
    id: 'bitsat_2025',
    name: 'BITSAT 2025',
    purpose: 'UG',
    regStart: 'Jan 15, 2025',
    regEnd: 'April 11, 2025',
    examDate: 'May 20 - May 24, 2025',
    resultDate: 'June 01, 2025',
    priority: 'High',
    readiness: 70,
    intensity: 'High',
    description: 'Computer-based admission test for integrated first-degree programs at BITS campuses.'
  }
];

const ExamsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [filter, setFilter] = useState<'All' | 'UG' | 'PG' | 'Job'>('All');

  const filteredExams = useMemo(() => {
    return EXAMS_DB.filter(e => filter === 'All' || e.purpose === filter);
  }, [filter]);

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const getDaysLeft = (dateStr: string) => {
    const examDate = new Date(dateStr.split(' - ')[0]); // Handle ranges
    const now = new Date();
    const diff = examDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. EXAM CALENDAR OVERVIEW (HERO) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-16">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase">
                EXAM SYNCHRONIZATION HUB
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                Strategic <br/><span className="gradient-text">Milestones.</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">
                Your preparation, synchronized with the institutional pulse. Monitor windows, track readiness, and stay ahead of critical deadlines.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              {[
                { label: 'Upcoming Exams', val: EXAMS_DB.length, color: 'text-indigo-500' },
                { label: 'Reg Windows Open', val: 2, color: 'text-emerald-500' },
              ].map((s, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center min-w-[160px]">
                   <p className="text-4xl font-black text-white mb-2">{s.val}</p>
                   <p className={`text-[10px] font-black uppercase tracking-widest ${s.color}`}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5 w-fit">
            {['All', 'UG', 'PG', 'Job'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                {f} {f !== 'All' ? 'Track' : 'Exams'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* B. EXAM DEADLINE CARDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredExams.map(exam => {
            const daysLeft = getDaysLeft(exam.examDate);
            return (
              <div key={exam.id} className="group relative p-10 rounded-[48px] bg-white/[0.01] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex flex-col gap-8 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                  <h4 className="text-[120px] font-black text-white leading-none">0{EXAMS_DB.indexOf(exam) + 1}</h4>
                </div>

                <div className="relative z-10 flex justify-between items-start">
                   <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                          exam.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-indigo-500/20 text-indigo-400'
                        }`}>
                          {exam.priority} Priority
                        </span>
                        <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{exam.purpose} Entrance</span>
                      </div>
                      <h3 className="text-3xl font-black uppercase text-white tracking-tighter leading-tight group-hover:text-indigo-400 transition-colors">{exam.name}</h3>
                   </div>
                   <button 
                     onClick={() => toggleAlert(exam.id)}
                     className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border ${alerts.includes(exam.id) ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/40' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-indigo-500'}`}
                   >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                   </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative z-10 py-8 border-y border-white/5">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Registration</p>
                      <p className="text-[10px] font-black text-white uppercase">{exam.regStart} — {exam.regEnd}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Exam Date</p>
                      <p className="text-[10px] font-black text-indigo-400 uppercase">{exam.examDate}</p>
                   </div>
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Results</p>
                      <p className="text-[10px] font-black text-white uppercase">{exam.resultDate}</p>
                   </div>
                </div>

                {/* C. PREPARATION READINESS INDICATOR */}
                <div className="relative z-10 space-y-6">
                   <div className="flex justify-between items-end">
                      <div className="space-y-1">
                         <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Readiness Index</p>
                         <p className="text-xs font-black text-white uppercase">{exam.readiness}% Complete</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Recommended Intensity</p>
                         <span className={`text-[10px] font-black uppercase tracking-widest ${
                           exam.intensity === 'Intense' ? 'text-red-500' : exam.intensity === 'High' ? 'text-orange-400' : 'text-emerald-500'
                         }`}>{exam.intensity} Sprint</span>
                      </div>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 shadow-[0_0_10px_#6366f1] transition-all duration-1500 ease-out" 
                        style={{ width: `${exam.readiness}%` }}
                      />
                   </div>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                   <p className="text-[11px] font-medium text-gray-400 leading-relaxed italic max-w-xs">
                     "{exam.description}"
                   </p>
                   <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="text-center px-6 border-r border-white/5 shrink-0">
                         <p className="text-2xl font-black text-white tabular-nums">{daysLeft}</p>
                         <p className="text-[8px] font-black text-gray-500 uppercase">Days Left</p>
                      </div>
                      <button className="flex-grow sm:flex-grow-0 px-8 py-4 bg-white/5 hover:bg-indigo-600 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                        Study Plan
                      </button>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* D. EXAM ALERTS & REMINDERS PANEL */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full" />
         </div>

         <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Smart <br/><span className="text-indigo-500">Reminders.</span></h2>
               <p className="text-gray-400 text-xl font-medium leading-relaxed">
                  Never lose track of a registration window again. Our AI notifies you 
                  based on institutional changes and prep-gap warnings.
               </p>
               
               <div className="space-y-6">
                  {[
                    { t: "Neural Countdown", d: "Dynamic widget showing exactly how many 'Active Study Hours' remain.", i: "⏳" },
                    { t: "Pattern Alerts", d: "Get notified when historical cut-offs or exam patterns are updated.", i: "📡" },
                    { t: "Multi-Platform Sync", d: "Push notifications via WhatsApp, Email, and System Alerts.", i: "📱" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 items-start group">
                       <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-indigo-600 transition-all shrink-0">
                          {item.i}
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-sm font-black uppercase text-white tracking-widest">{item.t}</h4>
                          <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-indigo-600/5 blur-[100px] rounded-full" />
               <div className="relative p-12 rounded-[64px] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl">
                  <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-10">Active Notification Queue</h3>
                  <div className="space-y-4">
                     {alerts.length > 0 ? (
                       alerts.map(id => {
                         const exam = EXAMS_DB.find(e => e.id === id);
                         return (
                           <div key={id} className="p-6 rounded-[32px] bg-black/40 border border-indigo-500/30 flex justify-between items-center group animate-in slide-in-from-right duration-300">
                              <div className="flex gap-6 items-center">
                                 <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 text-xs font-black">!</div>
                                 <div>
                                    <h4 className="text-xs font-black uppercase text-white">{exam?.name}</h4>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Alert Active: Countdown Mode</p>
                                 </div>
                              </div>
                              <button onClick={() => toggleAlert(id)} className="text-[8px] font-black text-gray-600 uppercase hover:text-red-500 transition-colors">Silence</button>
                           </div>
                         );
                       })
                     ) : (
                       <div className="text-center py-10 space-y-4">
                          <p className="text-xs font-black text-gray-600 uppercase tracking-widest">No Active Alerts</p>
                          <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tight leading-relaxed max-w-[200px] mx-auto">Click the bell icon on any exam card to initialize neural tracking.</p>
                       </div>
                     )}
                  </div>
                  <div className="mt-10 pt-8 border-t border-white/5 flex justify-center">
                     <button className="px-10 py-4 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">Configure Global Preferences</button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Ready for the <br/><span className="gradient-text">Challenge?</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't leave your entry to chance. Synchronize your learning path with the 
              official assessment cycles of the nation.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('roadmap')} className="px-12 py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-indigo-600/40 uppercase tracking-[0.2em] text-[10px]">
               View Readiness in Roadmap
             </button>
             <button onClick={() => onNavigate('admissions')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Explore Admission Deadlines
             </button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default ExamsPage;
