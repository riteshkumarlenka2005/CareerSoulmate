
import React, { useState, useMemo } from 'react';

interface AdmissionDeadline {
  id: string;
  name: string;
  institution: string;
  program: string;
  type: 'Application Start' | 'Last Date' | 'Counselling Round' | 'Seat Allotment';
  date: string;
  priority: 'Critical' | 'High' | 'Medium';
  level: 'UG' | 'PG' | 'Diploma';
  location: string;
  careerGoal: string;
}

interface ApplicationStatus {
  id: string;
  collegeName: string;
  program: string;
  status: 'Not Started' | 'Applied' | 'Shortlisted' | 'Admitted';
  lastUpdated: string;
}

const DEADLINES_DB: AdmissionDeadline[] = [
  {
    id: 'd1',
    name: 'CUET UG 2025 Registration',
    institution: 'National Testing Agency',
    program: 'Multiple Degree Programs',
    type: 'Last Date',
    date: 'March 26, 2025',
    priority: 'Critical',
    level: 'UG',
    location: 'National',
    careerGoal: 'AI Research Scientist'
  },
  {
    id: 'd2',
    name: 'IIT Bombay Direct Application',
    institution: 'IIT Bombay',
    program: 'B.Tech Computer Science',
    type: 'Application Start',
    date: 'April 15, 2025',
    priority: 'High',
    level: 'UG',
    location: 'Mumbai, MH',
    careerGoal: 'Neural Architect'
  },
  {
    id: 'd3',
    name: 'BITSAT Session 1 Slot Booking',
    institution: 'BITS Pilani',
    program: 'Integrated First Degree',
    type: 'Counselling Round',
    date: 'May 10, 2025',
    priority: 'High',
    level: 'UG',
    location: 'Pilani, RJ',
    careerGoal: 'Software Engineer'
  },
  {
    id: 'd4',
    name: 'JEE Advanced Exam Registration',
    institution: 'IIT Kanpur (Organizing)',
    program: 'B.Tech/B.S.',
    type: 'Last Date',
    date: 'April 30, 2025',
    priority: 'Critical',
    level: 'UG',
    location: 'National',
    careerGoal: 'Neural Architect'
  },
  {
    id: 'd5',
    name: 'St. Stephen\'s Interview Schedule',
    institution: 'Delhi University',
    program: 'B.Sc (Hons) Mathematics',
    type: 'Counselling Round',
    date: 'June 12, 2025',
    priority: 'Medium',
    level: 'UG',
    location: 'Delhi',
    careerGoal: 'AI Research Scientist'
  }
];

const MY_APPLICATIONS: ApplicationStatus[] = [
  { id: 'ap1', collegeName: 'IIT Bombay', program: 'B.Tech CS', status: 'Applied', lastUpdated: '2 days ago' },
  { id: 'ap2', collegeName: 'Miranda House', program: 'B.Sc Psychology', status: 'Shortlisted', lastUpdated: '5 hours ago' },
  { id: 'ap3', collegeName: 'BITS Pilani', program: 'B.E. Electronics', status: 'Not Started', lastUpdated: '1 week ago' }
];

const AdmissionsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');
  const [filterGoal, setFilterGoal] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  const filteredDeadlines = useMemo(() => {
    return DEADLINES_DB.filter(d => {
      const goalMatch = filterGoal === 'All' || d.careerGoal === filterGoal;
      const levelMatch = filterLevel === 'All' || d.level === filterLevel;
      const locationMatch = filterLocation === 'All' || d.location.includes(filterLocation);
      return goalMatch && levelMatch && locationMatch;
    });
  }, [filterGoal, filterLevel, filterLocation]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. ADMISSIONS TIMELINE DASHBOARD (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-16">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                ACADEMIC SESSION 2025-26
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                Deadline <br/><span className="gradient-text">Protocol.</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">
                Strategic orchestration of your admission milestones. We monitor the next 60 days of high-priority windows tailored to your roadmap.
              </p>
            </div>

            <div className="flex gap-4 p-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-xl">
              <button 
                onClick={() => setViewMode('timeline')}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'timeline' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                Timeline View
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'calendar' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                Calendar Mode
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-all">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Critical Phase</p>
                <h4 className="text-3xl font-black text-white mb-2">March - May</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Registration Peak Window</p>
             </div>
             <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-all">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Upcoming Next 30 Days</p>
                <h4 className="text-3xl font-black text-white mb-2">12 Deadlines</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">3 Marked as 'Priority_01'</p>
             </div>
             <div className="p-8 rounded-[40px] bg-blue-600/5 border border-blue-500/20 group hover:border-blue-500/40 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 animate-pulse" />
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Sync Status</p>
                <h4 className="text-3xl font-black text-white mb-2">Real-Time</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">NTA & State Portals Linked</p>
             </div>
          </div>
        </div>
      </section>

      {/* C. PERSONALIZED FILTERING */}
      <section className="py-12 px-6 border-b border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end">
           <div className="flex-grow space-y-4">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Personalized Intelligence Filters</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <select 
                   value={filterGoal}
                   onChange={(e) => setFilterGoal(e.target.value)}
                   className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-[10px] font-black uppercase outline-none focus:border-blue-500 text-blue-400"
                 >
                    <option value="All">All Career Goals</option>
                    <option value="AI Research Scientist">AI Research Scientist</option>
                    <option value="Neural Architect">Neural Architect</option>
                    <option value="Software Engineer">Software Engineer</option>
                 </select>
                 <select 
                   value={filterLevel}
                   onChange={(e) => setFilterLevel(e.target.value)}
                   className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-[10px] font-black uppercase outline-none focus:border-blue-500 text-blue-400"
                 >
                    <option value="All">All Degree Levels</option>
                    <option value="UG">Undergraduate (UG)</option>
                    <option value="PG">Postgraduate (PG)</option>
                    <option value="Diploma">Diploma</option>
                 </select>
                 <select 
                   value={filterLocation}
                   onChange={(e) => setFilterLocation(e.target.value)}
                   className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-[10px] font-black uppercase outline-none focus:border-blue-500 text-blue-400"
                 >
                    <option value="All">All Regions</option>
                    <option value="National">National (Central)</option>
                    <option value="Mumbai">Maharashtra</option>
                    <option value="Delhi">Delhi NCR</option>
                 </select>
              </div>
           </div>
           <button 
             onClick={() => { setFilterGoal('All'); setFilterLevel('All'); setFilterLocation('All'); }}
             className="px-8 py-4 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest border border-white/10 rounded-xl transition-all"
           >
             Reset Logic
           </button>
        </div>
      </section>

      {/* B. ADMISSION DEADLINE CARDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Windows.</span></h2>
            <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.4em]">Sorted by Proximity & Priority</p>
          </div>
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{filteredDeadlines.length} Milestones Found</span>
        </div>

        {viewMode === 'timeline' ? (
          <div className="space-y-6">
            {filteredDeadlines.map((deadline, idx) => (
              <div key={deadline.id} className="group relative p-10 rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all duration-500 flex flex-col lg:flex-row items-center gap-12 shadow-xl overflow-hidden">
                {/* Visual Connector Logic for Timeline feel */}
                <div className="absolute left-10 top-0 bottom-0 w-px bg-white/5 group-hover:bg-blue-500/20 hidden lg:block" />
                
                <div className="lg:w-48 shrink-0 relative z-10 flex flex-col items-center lg:items-end text-center lg:text-right">
                   <p className="text-2xl font-black text-white tabular-nums">{deadline.date.split(',')[0].split(' ')[1]}</p>
                   <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{deadline.date.split(',')[0].split(' ')[0]}</p>
                   <p className="text-[8px] text-gray-600 font-bold uppercase mt-1">Countdown: 14 Days</p>
                </div>

                <div className="relative w-16 h-16 rounded-[20px] bg-black border border-white/10 flex flex-col items-center justify-center shrink-0 z-10 shadow-2xl group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
                   <div className={`w-3 h-3 rounded-full ${deadline.priority === 'Critical' ? 'bg-red-500 animate-pulse' : deadline.priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                </div>

                <div className="flex-grow space-y-4 relative z-10">
                   <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase text-gray-400 tracking-widest">{deadline.type}</span>
                      <h3 className="text-2xl font-black uppercase text-white group-hover:text-blue-400 transition-colors tracking-tighter">{deadline.name}</h3>
                   </div>
                   <div className="flex flex-wrap gap-8">
                      <div>
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Institution</p>
                         <p className="text-xs font-black text-gray-200 uppercase">{deadline.institution}</p>
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Target</p>
                         <p className="text-xs font-black text-gray-200 uppercase">{deadline.program}</p>
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Aligns With</p>
                         <p className="text-xs font-black text-blue-400 uppercase">{deadline.careerGoal}</p>
                      </div>
                   </div>
                </div>

                <div className="shrink-0 flex gap-4 relative z-10">
                   <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all">Start Application</button>
                   <button className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group/save">
                      <svg className="w-6 h-6 text-gray-500 group-hover/save:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-[64px]">
             <h3 className="text-2xl font-black uppercase text-gray-500 mb-4">Visual Calendar Engine</h3>
             <p className="text-xs font-black text-gray-600 uppercase tracking-widest max-w-sm mx-auto">Neural calendar generation is active. Connect your Google/Outlook calendar to sync these milestones.</p>
             <button className="mt-8 px-10 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">Connect Calendar</button>
          </div>
        )}
      </section>

      {/* D. ADMISSION STATUS TRACKER */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
           <div className="mb-20">
              <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-emerald-500">Pipeline Tracker.</span></h2>
              <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.4em] mt-2">Personal Execution Dashboard</p>
           </div>

           <div className="grid lg:grid-cols-2 gap-20">
              <div className="space-y-4">
                 {MY_APPLICATIONS.map(app => (
                   <div key={app.id} className="p-8 rounded-[40px] bg-black border border-white/5 hover:border-emerald-500/30 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                      <div className="space-y-1">
                         <h4 className="text-xl font-black uppercase text-white group-hover:text-emerald-400 transition-colors">{app.collegeName}</h4>
                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{app.program}</p>
                         <p className="text-[8px] text-gray-700 font-black uppercase mt-4">Last update: {app.lastUpdated}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                         <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                           app.status === 'Admitted' ? 'bg-emerald-500 text-white' : 
                           app.status === 'Shortlisted' ? 'bg-blue-600 text-white' : 
                           app.status === 'Applied' ? 'bg-white/10 text-gray-300' : 
                           'bg-white/5 text-gray-600'
                         }`}>
                           {app.status}
                         </span>
                         <button className="text-[9px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Update Stage →</button>
                      </div>
                   </div>
                 ))}
                 
                 <button className="w-full py-6 rounded-[32px] border border-dashed border-white/10 text-[10px] font-black uppercase text-gray-500 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                    Link New Application
                 </button>
              </div>

              <div className="flex flex-col justify-center">
                 <div className="p-12 rounded-[64px] bg-gradient-to-br from-emerald-600/10 to-transparent border border-emerald-500/20 relative shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.05]">
                       <svg width="150" height="150" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                    </div>
                    <div className="relative z-10 space-y-10">
                       <h3 className="text-3xl font-black uppercase text-white leading-tight tracking-tighter">Your Readiness <br/><span className="text-emerald-500">Summary.</span></h3>
                       <div className="space-y-6">
                          <div className="flex justify-between items-end">
                             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Document Completeness</span>
                             <span className="text-sm font-black text-white">88%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-600 shadow-[0_0_10px_#10b981]" style={{ width: '88%' }} />
                          </div>
                          <div className="flex justify-between items-end">
                             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Application Momentum</span>
                             <span className="text-sm font-black text-white">Steady</span>
                          </div>
                       </div>
                       <p className="text-sm text-gray-400 font-medium leading-relaxed">
                          "You have 2 critical deadlines in the next 14 days. We recommend 
                          finalizing your <span className="text-white">Caste Certificate</span> scan 
                          immediately for the CUET submission."
                       </p>
                       <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-emerald-600/30">
                          Secure Portfolio Vault
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Execution is <br/><span className="gradient-text">Destiny.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Plans are for dreamers. Deadlines are for achievers. Career Soulmate 
              keeps you synchronized with the institutional pulse of the nation.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('colleges')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Match College to Roadmap
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Configure Neural Alerts
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        select { -webkit-appearance: none; -moz-appearance: none; appearance: none; cursor: pointer; }
        .grid-pattern {
          background-image: linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default AdmissionsPage;
