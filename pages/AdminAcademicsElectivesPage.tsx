
import React, { useState, useMemo } from 'react';

interface ElectiveBasket {
  id: string;
  name: string;
  disciplines: string[];
  capacity: number;
  enrolled: number;
  waitlist: number;
  courses: number;
  status: 'Open' | 'Closed' | 'Audit';
}

interface DemandMetric {
  courseName: string;
  demand: number; // percentage
  slotsAvailable: number;
  trend: 'up' | 'down' | 'stable';
}

const BASKETS_DB: ElectiveBasket[] = [
  {
    id: 'eb1',
    name: 'Emerging Tech for Humanities',
    disciplines: ['Arts', 'Psychology', 'Design'],
    capacity: 200,
    enrolled: 184,
    waitlist: 15,
    courses: 4,
    status: 'Open'
  },
  {
    id: 'eb2',
    name: 'Advanced Neural Applications',
    disciplines: ['Tech', 'Science'],
    capacity: 80,
    enrolled: 80,
    waitlist: 42,
    courses: 3,
    status: 'Closed'
  },
  {
    id: 'eb3',
    name: 'Strategic Leadership & Policy',
    disciplines: ['Management', 'Commerce', 'Tech'],
    capacity: 150,
    enrolled: 110,
    waitlist: 0,
    courses: 5,
    status: 'Open'
  }
];

const DEMAND_METRICS: DemandMetric[] = [
  { courseName: 'AI Ethics in Practice', demand: 95, slotsAvailable: 5, trend: 'up' },
  { courseName: 'Behavioral Economics', demand: 78, slotsAvailable: 22, trend: 'stable' },
  { courseName: 'Blockchain for Social Good', demand: 42, slotsAvailable: 58, trend: 'down' },
  { courseName: 'Human Centered Design', demand: 88, slotsAvailable: 12, trend: 'up' }
];

const AdminAcademicsElectivesPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedBasketId, setSelectedBasketId] = useState<string | null>(null);

  const stats = {
    totalBaskets: BASKETS_DB.length,
    activeChoices: 12,
    totalApplications: 4820,
    conflictRisk: 'Low (0.8%)'
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. HEADER & BASKET MANAGEMENT */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                NEP CHOICE ARCHITECTURE ENGINE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Elective <span className="gradient-text">Orchestration.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Design interdisciplinary pathways. Define elective baskets, manage student 
                preferences, and analyze the operational ripple effect on institutional resources.
              </p>
            </div>

            <div className="flex gap-4">
               <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                 Define Global Rules
               </button>
               <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl shadow-blue-600/30 active:scale-95">
                 New Elective Basket +
               </button>
            </div>
          </div>

          {/* Basket Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BASKETS_DB.map(basket => (
              <div key={basket.id} className="p-10 rounded-[56px] bg-black border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                 </div>
                 <div className="flex justify-between items-start mb-10 relative z-10">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${basket.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>{basket.status}</span>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{basket.courses} Modules</p>
                 </div>
                 <h3 className="text-xl font-black uppercase text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">{basket.name}</h3>
                 <div className="flex flex-wrap gap-2 mb-10">
                    {basket.disciplines.map(d => <span key={d} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[7px] font-black uppercase text-gray-500">#{d}</span>)}
                 </div>
                 
                 <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-end">
                       <span className="text-[9px] font-black text-gray-600 uppercase">Enrollment Fill</span>
                       <span className="text-xs font-black text-white">{Math.round((basket.enrolled/basket.capacity)*100)}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${(basket.enrolled/basket.capacity)*100}%` }} />
                    </div>
                    {basket.waitlist > 0 && (
                      <p className="text-[8px] font-black text-orange-500 uppercase tracking-widest">Waitlist: {basket.waitlist} Students</p>
                    )}
                 </div>
                 <button className="mt-10 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Manage Basket</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B. STUDENT DEMAND ANALYTICS */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Demand Feed */}
        <div className="lg:col-span-7 space-y-12">
           <div className="flex justify-between items-end">
              <h2 className="text-3xl font-black uppercase tracking-tight">Demand <span className="text-blue-500">Intelligence.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Real-time preference tracking</p>
           </div>
           
           <div className="space-y-4">
              {DEMAND_METRICS.map((item, i) => (
                <div key={i} className="p-8 rounded-[40px] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/20 transition-all flex items-center justify-between group">
                   <div className="flex items-center gap-8 flex-grow">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-blue-600 transition-all">
                         {item.trend === 'up' ? '🔥' : item.trend === 'down' ? '📉' : '📊'}
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors">{item.courseName}</h4>
                         <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{item.slotsAvailable} Slots remaining</p>
                      </div>
                   </div>
                   <div className="text-right shrink-0">
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-2">Demand Level</p>
                      <div className="flex items-center gap-4">
                         <span className={`text-xl font-black ${item.demand > 80 ? 'text-red-500' : 'text-emerald-500'}`}>{item.demand}%</span>
                         <div className={`w-2 h-2 rounded-full ${item.trend === 'up' ? 'bg-red-500 animate-ping' : 'bg-gray-700'}`} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* C. TIMETABLE IMPACT PREVIEW (SIDEBAR) */}
        <div className="lg:col-span-5">
           <div className="sticky top-32 p-12 rounded-[64px] bg-[#0a0a0a] border border-white/10 shadow-2xl space-y-10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 blur-[80px] rounded-full" />
              <h3 className="text-xl font-black uppercase tracking-tight text-white border-l-4 border-indigo-600 pl-6">Resource <span className="text-indigo-500">Impact.</span></h3>
              <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed">
                 AI prediction of operational load based on current elective choices.
              </p>

              <div className="space-y-8">
                 {[
                    { label: 'Additional Faculty Req', val: 6, unit: 'Heads', c: 'blue' },
                    { label: 'Lab Seat Shortfall', val: 12, unit: 'Seats', c: 'cyan' },
                    { label: 'Schedule Conflict Risk', val: 0.8, unit: '%', c: 'emerald' },
                    { label: 'Waitlist Resolution Rate', val: 92, unit: '%', c: 'purple' }
                 ].map((metric, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{metric.label}</span>
                          <span className="text-sm font-black text-white">{metric.val}{metric.unit}</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full bg-${metric.c}-600 transition-all duration-1500`} style={{ width: `${Math.min(100, metric.val * 10)}%` }} />
                       </div>
                    </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                 <div className="p-6 rounded-3xl bg-blue-600/5 border border-blue-500/20 text-center">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Automated Fix Suggested</p>
                    <p className="text-[10px] text-gray-300 font-bold uppercase leading-relaxed">
                       "Splitting 'AI Ethics' into 2 parallel batches in Room 402/404 resolves 95% of waitlist pressure."
                    </p>
                 </div>
                 <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-xl transition-all active:scale-95">
                    Deploy AI Resolution
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* D. CHOICE FLOW ARCHITECTURE (BOTTOM VISUAL) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-20">Choice <span className="text-blue-500">Pipeline.</span></h2>
            <div className="grid md:grid-cols-4 gap-8 relative">
               {[
                  { label: "Discovery", d: "Students explore career-mapped electives.", i: "🔎" },
                  { label: "Preference", d: "Neural ranking of top 5 desired modules.", i: "⭐️" },
                  { label: "Optimization", d: "AI balances demand vs physical capacity.", i: "⚖️" },
                  { label: "Enrollment", d: "Verified credit mapping into ABC ID.", i: "✅" }
               ].map((step, idx) => (
                  <div key={idx} className="relative group">
                     <div className="w-20 h-20 rounded-[32px] bg-white/[0.02] border border-white/10 flex items-center justify-center mx-auto mb-8 text-3xl group-hover:bg-blue-600 transition-all duration-500">
                        {step.i}
                     </div>
                     <h4 className="text-sm font-black uppercase text-white mb-2 tracking-widest">{step.label}</h4>
                     <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-6">{step.d}</p>
                     {idx < 3 && (
                        <div className="hidden lg:block absolute top-10 left-[60%] right-[-40%] h-px bg-white/5" />
                     )}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Choice without <br/><span className="gradient-text">Chaos.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              NEP 2020 demands flexibility. Career Soulmate provides the engineering 
              required to deliver total choice while maintaining institutional order.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Choice Portal for Students...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Launch Choice Portal
             </button>
             <button onClick={() => onNavigate('admin-dashboard')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Return to Dashboard
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
        .text-blue-600 { color: #2563eb; }
        .text-cyan-600 { color: #0891b2; }
        .text-emerald-600 { color: #059669; }
        .text-purple-600 { color: #9333ea; }
        .bg-blue-600 { background-color: #2563eb; }
        .bg-cyan-600 { background-color: #0891b2; }
        .bg-emerald-600 { background-color: #059669; }
        .bg-purple-600 { background-color: #9333ea; }
      `}</style>
    </div>
  );
};

export default AdminAcademicsElectivesPage;
