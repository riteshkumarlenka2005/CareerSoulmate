
import React, { useState, useMemo, useRef, useEffect } from 'react';

interface InternshipOpportunity {
  id: string;
  role: string;
  company: string;
  industry: string;
  slots: number;
  eligibility: string;
  skills: string[];
  status: 'Open' | 'Closed' | 'Interviewing';
}

interface StudentIntern {
  id: string;
  name: string;
  program: string;
  company: string;
  role: string;
  duration: string;
  status: 'Enrolled' | 'Applying' | 'Completed';
  skillUplift: number;
  ppoLikelihood: number;
}

const OPPORTUNITIES_DB: InternshipOpportunity[] = [
  { id: 'o1', role: 'Machine Learning Trainee', company: 'NVIDIA', industry: 'Tech', slots: 5, eligibility: 'CGPA 8.5+ | Python Mastery', skills: ['CUDA', 'PyTorch', 'C++'], status: 'Open' },
  { id: 'o2', role: 'Financial Operations Intern', company: 'Goldman Sachs', industry: 'Finance', slots: 10, eligibility: 'B.Com/BBA Final Year', skills: ['Excel', 'Risk Modeling', 'Valuation'], status: 'Interviewing' },
  { id: 'o3', role: 'EV Systems Intern', company: 'Tesla India', industry: 'Automotive', slots: 3, eligibility: 'Mech/Elec Specialization', skills: ['BMS', 'AutoCAD', 'Simulation'], status: 'Open' },
];

const STUDENT_INTERNS: StudentIntern[] = [
  { id: 's1', name: 'Rahul Sharma', program: 'B.Tech CS', company: 'Google', role: 'Backend Intern', duration: '6 Months', status: 'Enrolled', skillUplift: 45, ppoLikelihood: 85 },
  { id: 's2', name: 'Priya Verma', program: 'B.Com Hons', company: 'HDFC Bank', role: 'Credit Analyst', duration: '3 Months', status: 'Completed', skillUplift: 30, ppoLikelihood: 92 },
  { id: 's3', name: 'Aman Singh', program: 'B.Tech Mech', company: 'Tata Motors', role: 'Production Intern', duration: '4 Months', status: 'Enrolled', skillUplift: 25, ppoLikelihood: 40 },
];

const CollegeInternshipsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const CustomSelect = ({ label, options, value, onChange, id }: { label: string, options: string[], value: string, onChange: (val: string) => void, id: string }) => {
    const isOpen = activeDropdown === id;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) setActiveDropdown(null);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative w-full z-50" ref={ref}>
        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">{label}</p>
        <button
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className={`w-full flex items-center justify-between bg-white/5 border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/10'} rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md hover:bg-white/[0.08]`}
        >
          <span className="text-blue-400">{value}</span>
          <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isOpen && (
          <div className="absolute top-[105%] left-0 right-0 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-[200] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
            {options.map(opt => (
              <button key={opt} onClick={() => { onChange(opt); setActiveDropdown(null); }}
                className={`w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${value === opt ? 'text-blue-500 bg-blue-500/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. INTERNSHIP OVERVIEW DASHBOARD */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                EXPERIENCE PIPELINE MANAGER
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Work <span className="gradient-text">Integration.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Transforming simple work stints into high-value academic credits. 
                Manage institutional partnerships and track real-time student growth during internships.
              </p>
              <div className="max-w-xs">
                <CustomSelect id="dept" label="Filter Cohort" options={['All Departments', 'Computer Science', 'Management', 'Commerce']} value={selectedDept} onChange={setSelectedDept} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { label: 'Total Interns', val: 124, icon: '🎓', color: 'blue' },
                 { label: 'Pending Slots', val: 32, icon: '⏳', color: 'orange' },
                 { label: 'Partner Orgs', val: 45, icon: '🏛️', color: 'cyan' },
                 { label: 'PPO Probability', val: '68%', icon: '🚀', color: 'emerald' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center flex flex-col items-center">
                    <span className="text-2xl mb-4">{stat.icon}</span>
                    <p className="text-2xl font-black text-white mb-1">{stat.val}</p>
                    <p className={`text-[8px] font-black uppercase tracking-widest text-${stat.color}-500`}>{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. INTERNSHIP OPPORTUNITY MANAGEMENT */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Partner <span className="text-blue-500">Board.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Manage and deploy new opportunities</p>
          </div>
          <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
             Add Opportunity
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OPPORTUNITIES_DB.map(opp => (
            <div key={opp.id} className="group p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all duration-500 flex flex-col relative overflow-hidden">
               <div className="flex justify-between items-start mb-10">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{opp.company}</p>
                     <h3 className="text-xl font-black uppercase text-white tracking-tight leading-tight">{opp.role}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    opp.status === 'Open' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-orange-500/20 text-orange-500'
                  }`}>{opp.status}</span>
               </div>

               <div className="space-y-6 mb-10">
                  <div>
                    <p className="text-[8px] font-black text-gray-600 uppercase mb-2">Target Skills</p>
                    <div className="flex flex-wrap gap-2">
                       {opp.skills.map(s => <span key={s} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[8px] font-bold text-gray-400 uppercase">{s}</span>)}
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Availability</p>
                    <p className="text-xs font-black text-white">{opp.slots} Positions Remaining</p>
                  </div>
               </div>

               <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest truncate max-w-[150px]">{opp.eligibility}</span>
                  <button className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all border border-white/10 group-hover:border-blue-500">
                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                  </button>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* C. STUDENT INTERNSHIP TRACKER */}
      <section className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Enrollments.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Real-time student performance monitoring</p>
          </div>
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Export Tracker</button>
        </div>

        <div className="overflow-x-auto rounded-[40px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className="bg-white/[0.02] border-b border-white/10">
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Student / Program</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Partner / Role</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Skill Uplift</th>
                    <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">PPO Index</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 {STUDENT_INTERNS.map((intern) => (
                    <tr key={intern.id} className="group hover:bg-white/[0.01] transition-colors">
                       <td className="p-8">
                          <div className="space-y-1">
                             <h4 className="text-sm font-black uppercase text-white">{intern.name}</h4>
                             <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{intern.program}</p>
                          </div>
                       </td>
                       <td className="p-8">
                          <div className="space-y-1">
                             <h4 className="text-sm font-black uppercase text-blue-400">{intern.company}</h4>
                             <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{intern.role} • {intern.duration}</p>
                          </div>
                       </td>
                       <td className="p-8 text-center">
                          <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            intern.status === 'Enrolled' ? 'bg-blue-600/10 text-blue-500' : 
                            intern.status === 'Completed' ? 'bg-emerald-600/10 text-emerald-500' : 'bg-white/5 text-gray-500'
                          }`}>
                            {intern.status}
                          </span>
                       </td>
                       <td className="p-8">
                          <div className="flex flex-col items-center gap-2">
                             <span className="text-xs font-black text-white">+{intern.skillUplift}%</span>
                             <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500" style={{ width: `${intern.skillUplift}%` }} />
                             </div>
                          </div>
                       </td>
                       <td className="p-8 text-center">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500 transition-all ${intern.ppoLikelihood > 80 ? 'text-emerald-500' : 'text-blue-500'}`}>
                             <span className="text-xs font-black">{intern.ppoLikelihood}%</span>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </section>

      {/* D. INTERNSHIP → JOB CONVERSION INSIGHT */}
      <section className="py-32 px-6 bg-[#080808] border-y border-white/5 z-10 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Outcome <br/><span className="text-blue-500">Validation.</span></h2>
               <p className="text-gray-400 text-xl font-medium leading-relaxed">
                  We bridge the final gap. By measuring employer feedback and technical growth 
                  during internships, we predict and facilitate full-time conversion rates 
                  for the entire batch.
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-4 group hover:border-blue-500/40 transition-all">
                     <div className="text-2xl">📈</div>
                     <h4 className="text-xs font-black uppercase text-white tracking-widest">Skill Drift Analysis</h4>
                     <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">Identifying how students adapt to industry tools in the first 90 days.</p>
                  </div>
                  <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-4 group hover:border-emerald-500/40 transition-all">
                     <div className="text-2xl">💼</div>
                     <h4 className="text-xs font-black uppercase text-white tracking-widest">PPO Forecasting</h4>
                     <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">Pre-Placement Offer probabilities calculated using neural performance data.</p>
                  </div>
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
               <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/60 backdrop-blur-3xl shadow-2xl">
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12 text-center">Batch Placement Readiness</h4>
                  <div className="space-y-10">
                     {[
                        { label: 'Technical Maturity', val: 74, color: 'bg-blue-500' },
                        { label: 'Workplace Ethics', val: 92, color: 'bg-emerald-500' },
                        { label: 'Problem Velocity', val: 58, color: 'bg-purple-500' }
                     ].map((item, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black uppercase text-white tracking-widest">{item.label}</span>
                              <span className="text-lg font-black text-white">{item.val}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color} shadow-[0_0_10px_currentColor] transition-all duration-1500`} style={{ width: `${item.val}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="mt-12 pt-8 border-t border-white/5 text-center">
                     <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Aggregate Feedback from 22 Partner Orgs</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Beyond <br/><span className="gradient-text">Requirements.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Internships are the laboratory of career reality. Career Soulmate 
              ensures every hour spent on the job floor is an investment in 
              permanent employability.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Opening Partnership Portal...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Invite New Industry Partner
             </button>
             <button onClick={() => onNavigate('readiness')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               View Readiness Matrix
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

export default CollegeInternshipsPage;
