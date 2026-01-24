
import React from 'react';

const AdminDashboardPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* 1. EXECUTIVE OVERVIEW (TOP STRIP) */}
      <section className="pt-28 pb-12 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
             <div className="space-y-1">
                <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none">Command <span className="text-blue-500">Center.</span></h1>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em]">National Institutional ID: IN-H621-04</p>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">System Health: Optimal</span>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
             {[
               { l: 'Total Learners', v: '4,842', c: 'indigo' },
               { l: 'Active Programs', v: '24', c: 'blue' },
               { l: 'Faculty Count', v: '312', c: 'cyan' },
               { l: 'Skill-Ready %', v: '68%', c: 'emerald' },
               { l: 'Placement Rate', v: '74%', c: 'purple' },
               { l: 'NEP Compliance', v: '92/100', c: 'blue' }
             ].map((stat, i) => (
               <div key={i} className="p-6 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all text-center">
                  <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">{stat.l}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PRIMARY METRICS (COL-8) */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* 2. STUDENT & ACADEMIC HEALTH */}
           <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-end mb-12">
                 <h3 className="text-xl font-black uppercase tracking-tight">Academic <span className="text-blue-500">Vitality.</span></h3>
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Enrollment vs Retention</span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                 <div className="space-y-4">
                    <p className="text-[8px] font-black text-gray-600 uppercase">Career Clarity Index</p>
                    <div className="text-4xl font-black text-white">8.4<span className="text-lg text-gray-600">/10</span></div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600" style={{ width: '84%' }} />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[8px] font-black text-gray-600 uppercase">Cohort Risk Count</p>
                    <div className="text-4xl font-black text-rose-500">142</div>
                    <p className="text-[8px] font-bold text-gray-500 uppercase">3% Increase from Prev Month</p>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[8px] font-black text-gray-600 uppercase">Retention Rate</p>
                    <div className="text-4xl font-black text-emerald-500">97.2%</div>
                    <p className="text-[8px] font-bold text-gray-500 uppercase">Global Benchmark: 92%</p>
                 </div>
              </div>

              {/* Simulated Enrollment Bar Chart */}
              <div className="h-40 flex items-end gap-2">
                 {[40, 55, 65, 80, 70, 95, 85, 100].map((h, i) => (
                   <div key={i} className="flex-1 bg-white/5 relative group">
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-600/40 group-hover:bg-blue-600 transition-all duration-700" style={{ height: `${h}%` }} />
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-gray-700 uppercase">S{i+1}</div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 text-center">
                 <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Aggregate Enrollment Trends Across Semesters (S1-S8)</p>
              </div>
           </div>

           {/* 4. FACULTY & INFRASTRUCTURE UTILIZATION */}
           <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl">
                 <h3 className="text-xl font-black uppercase tracking-tight mb-10 text-center">Resource <span className="text-cyan-500">Efficiency.</span></h3>
                 <div className="space-y-8">
                    {[
                      { l: 'Faculty Workload', v: 78, color: 'bg-blue-600' },
                      { l: 'Lab Utilization', v: 92, color: 'bg-cyan-600' },
                      { l: 'Room Capacity', v: 45, color: 'bg-emerald-600' }
                    ].map((res, i) => (
                      <div key={i} className="space-y-3">
                         <div className="flex justify-between items-end">
                            <span className="text-[10px] font-black text-gray-500 uppercase">{res.l}</span>
                            <span className="text-xs font-black text-white">{res.v}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${res.color} transition-all duration-1000`} style={{ width: `${res.v}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Schedule Conflicts</span>
                    <span className="text-sm font-black text-emerald-500">0.4% (Optimized)</span>
                 </div>
              </div>

              <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center group">
                 <div className="w-24 h-24 rounded-[32px] bg-blue-600/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">⚙️</div>
                 <h4 className="text-lg font-black uppercase text-white mb-4 leading-tight">AI Timetable Engine</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed max-w-[200px]">
                    Current model: v4.2 (Genetic Algorithm). Next generation scheduled for Mar 15.
                 </p>
                 <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">Re-Optimize Now</button>
              </div>
           </div>

           {/* 5. SKILLS, JOBS & OUTCOMES */}
           <div className="p-12 rounded-[64px] bg-[#080808] border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
              <div className="relative z-10">
                 <div className="flex justify-between items-end mb-12">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Outcome <span className="text-emerald-500">Dynamics.</span></h3>
                    <div className="flex items-center gap-6">
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-[8px] font-black text-gray-600 uppercase">Demand</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-[8px] font-black text-gray-600 uppercase">Supply</span>
                       </div>
                    </div>
                 </div>

                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                       {[
                          { l: 'AI/ML Specialization', d: 94, s: 62 },
                          { l: 'Digital Marketing', d: 85, s: 88 },
                          { l: 'Cyber Defense', d: 70, s: 40 }
                       ].map((skill, i) => (
                         <div key={i} className="space-y-3">
                            <div className="flex justify-between">
                               <span className="text-xs font-black uppercase text-white tracking-widest">{skill.l}</span>
                               <span className={`text-[10px] font-black uppercase ${skill.d > skill.s ? 'text-red-500' : 'text-emerald-500'}`}>{skill.d > skill.s ? `GAP: ${skill.d - skill.s}%` : 'SURPLUS'}</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                               <div className="h-full bg-blue-600/40" style={{ width: `${skill.d}%` }} />
                               <div className="h-full bg-emerald-600 shadow-[0_0_10px_#10b981]" style={{ width: `${skill.s}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       {[
                          { l: 'NSQF Avg', v: 'Lv. 6.2' },
                          { l: 'Job Offers', v: '1,412' },
                          { l: 'Internships', v: '2,840' },
                          { l: 'Fellowships', v: '12' }
                       ].map((box, i) => (
                         <div key={i} className="p-8 rounded-[40px] bg-black border border-white/5 text-center group hover:border-emerald-500/40 transition-all">
                            <p className="text-[8px] font-black text-gray-600 uppercase mb-2">{box.l}</p>
                            <p className="text-2xl font-black text-white">{box.v}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: ALERTS & ACTIONS (COL-4) */}
        <div className="lg:col-span-4 space-y-8">
           
           {/* 7. ALERTS & ACTION ITEMS */}
           <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col h-fit">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-rose-500"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">AI <span className="text-rose-500">Alerts.</span></h3>
              
              <div className="space-y-4">
                 {[
                    { t: 'Compliance Gap', d: 'B.Com Year 1 missing NEP Credit Mapping.', p: 'Critical', color: 'rose' },
                    { t: 'Faculty Overload', d: 'CS Dept average working hours at 114% limit.', p: 'High', color: 'orange' },
                    { t: 'Skill Mismatch', d: '65% cohort lag in "Cloud Native" proficiency.', p: 'Medium', color: 'blue' },
                    { t: 'Opportunity Stall', d: '3 open internships receiving zero applications.', p: 'Standard', color: 'gray' }
                 ].map((alert, i) => (
                   <div key={i} className={`p-6 rounded-3xl bg-${alert.color}-500/5 border border-${alert.color}-500/20 hover:bg-${alert.color}-500/10 transition-all cursor-pointer group`}>
                      <div className="flex justify-between items-center mb-2">
                         <span className={`text-[8px] font-black uppercase text-${alert.color}-500 tracking-widest`}>{alert.t}</span>
                         <span className="text-[7px] font-black text-white uppercase px-2 py-0.5 rounded-full bg-white/5">{alert.p}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors">{alert.d}</p>
                      <button className="mt-4 text-[8px] font-black uppercase text-blue-500 group-hover:underline">Resolve Instantly →</button>
                   </div>
                 ))}
              </div>
              <button className="mt-8 w-full py-4 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase text-gray-600 hover:text-white transition-all">Clear Resolved Items</button>
           </div>

           {/* 3. NEP 2020 COMPLIANCE WIDGET */}
           <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden h-fit">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">NEP <span className="text-purple-500">Readiness.</span></h3>
              <div className="space-y-8">
                 {[
                   { l: 'ABC Sync', v: 100 },
                   { l: 'Multi-Exit Map', v: 92 },
                   { l: 'Credit Portability', v: 78 }
                 ].map((item, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-end">
                         <span className="text-[9px] font-black text-gray-500 uppercase">{item.l}</span>
                         <span className="text-sm font-black text-white">{item.v}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-purple-600" style={{ width: `${item.v}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 space-y-3">
                 <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-500">✓</div>
                    <span className="text-[10px] font-black text-gray-400 uppercase">FYUP Core Syllabus Mapped</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-500">✓</div>
                    <span className="text-[10px] font-black text-gray-400 uppercase">NSQF Competency Audit Ready</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg bg-red-500/20 flex items-center justify-center text-[10px] text-red-500">✕</div>
                    <span className="text-[10px] font-black text-gray-400 uppercase">Interdisciplinary Lab Pending</span>
                 </div>
              </div>
           </div>

           {/* 8. QUICK ACTION PANEL */}
           <div className="p-10 rounded-[56px] bg-blue-600/5 border border-blue-500/30 shadow-2xl h-fit">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">Admin <span className="text-blue-500">Actions.</span></h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                    { l: 'Timetable', i: '📅' },
                    { l: 'Add Program', i: '➕' },
                    { l: 'Reports', i: '📄' },
                    { l: 'ABC Sync', i: '🏦' }
                 ].map((btn, i) => (
                    <button key={i} className="p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-blue-500/50 transition-all flex flex-col items-center gap-3 group">
                       <span className="text-2xl group-hover:scale-110 transition-transform">{btn.i}</span>
                       <span className="text-[8px] font-black uppercase text-gray-500 group-hover:text-white">{btn.l}</span>
                    </button>
                 ))}
              </div>
              <button className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-xl shadow-blue-600/20 transition-all active:scale-95">Upload Academic Master Data</button>
           </div>
        </div>
      </div>

      {/* 6. OPPORTUNITIES PIPELINE (FULL WIDTH BOTTOM) */}
      <section className="py-24 px-6 bg-[#080808] border-t border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Opportunity <span className="text-blue-500">Conversion.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Funnel Analysis from Exposure to Hire</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 relative">
               {[
                  { label: 'Exposed Roles', val: 1420, d: 'Total active job/internship listings', c: 'blue' },
                  { label: 'Applications', val: 4280, d: 'Total unique student submissions', c: 'cyan' },
                  { label: 'Shortlists', val: 840, d: 'Students passed to round 2', c: 'indigo' },
                  { label: 'Successes', val: 142, d: 'Verified joined professionals', c: 'emerald' }
               ].map((step, idx) => (
                  <div key={idx} className="p-10 rounded-[56px] bg-black/60 border border-white/10 flex flex-col items-center group hover:border-white/20 transition-all relative">
                     <span className="text-xs font-black text-gray-600 uppercase mb-4 tracking-[0.2em]">{step.label}</span>
                     <h3 className={`text-5xl font-black text-${step.c}-500 leading-none mb-6 tabular-nums`}>{step.val}</h3>
                     <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed text-center px-4">{step.d}</p>
                     
                     {idx < 3 && (
                        <div className="hidden lg:block absolute top-1/2 -right-2 translate-x-1/2 z-20">
                           <svg className="w-8 h-8 text-white/5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                        </div>
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
             Decision <br/><span className="gradient-text">Precision.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't manage your institution by intuition alone. Career Soulmate 
              converts every academic interaction into a data-point for institutional excellence.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Generating Executive Summary...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Semester Audit PDF
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Launch System Monitor
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
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .text-rose-500 { color: #f43f5e; }
        .text-orange-500 { color: #f97316; }
        .text-indigo-500 { color: #6366f1; }
        .text-cyan-500 { color: #06b6d4; }
        .text-emerald-500 { color: #10b981; }
        .bg-rose-500\/5 { background-color: rgba(244, 63, 94, 0.05); }
        .bg-orange-500\/5 { background-color: rgba(249, 115, 22, 0.05); }
        .border-rose-500\/20 { border-color: rgba(244, 63, 94, 0.2); }
        .border-orange-500\/20 { border-color: rgba(249, 115, 22, 0.2); }
      `}</style>
    </div>
  );
};

export default AdminDashboardPage;
