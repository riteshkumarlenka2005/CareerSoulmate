
import React, { useState, useMemo } from 'react';

interface JobRole {
  id: string;
  roleName: string;
  company: string;
  industry: string;
  description: string;
  skills: string[];
  eligibility: string;
  compensation: string;
  growth: string;
  status: 'Active' | 'Hiring Closed';
  applicants: number;
}

interface StudentMatch {
  id: string;
  name: string;
  matchPercentage: number;
  readinessScore: number;
  program: string;
  topSkills: string[];
  status: 'Applied' | 'Interviewing' | 'Offered' | 'Joined' | 'Eligible';
}

const JOBS_DB: JobRole[] = [
  {
    id: 'j1',
    roleName: 'Junior Machine Learning Engineer',
    company: 'NeuralCorp',
    industry: 'Technology',
    description: 'Developing and optimizing transformer-based architectures for global inference nodes.',
    skills: ['PyTorch', 'System Architecture', 'Python', 'MLOps'],
    eligibility: 'CGPA 8.0+ | Core AI Electives | Final Year',
    compensation: '₹18 LPA - ₹24 LPA',
    growth: 'Exponential (Tier-1 path)',
    status: 'Active',
    applicants: 142
  },
  {
    id: 'j2',
    roleName: 'Sustainable Audit Lead',
    company: 'EcoAudit Global',
    industry: 'Consulting',
    description: 'Leading ESG compliance audits for Fortune 500 manufacturing plants.',
    skills: ['ESG Standards', 'Risk Assessment', 'Policy Logic'],
    eligibility: 'MBA / B.Com Honors | Auditing Cert',
    compensation: '₹12 LPA - ₹16 LPA',
    growth: 'High Stability',
    status: 'Active',
    applicants: 56
  },
  {
    id: 'j3',
    roleName: 'Software Development Engineer (SDE-1)',
    company: 'Amazon India',
    industry: 'Technology',
    description: 'Building scalable backend microservices for high-traffic retail systems.',
    skills: ['DSA', 'Java/C++', 'Cloud Basics'],
    eligibility: 'B.Tech / B.E. | No Backlogs',
    compensation: '₹22 LPA - ₹32 LPA',
    growth: 'Accelerated Management Track',
    status: 'Active',
    applicants: 485
  }
];

const STUDENT_POOL: StudentMatch[] = [
  { id: 's1', name: 'Alex Johnson', matchPercentage: 98, readinessScore: 92, program: 'B.Tech CS', topSkills: ['PyTorch', 'Distributed Systems'], status: 'Interviewing' },
  { id: 's2', name: 'Maria Garcia', matchPercentage: 85, readinessScore: 88, program: 'B.Tech CS', topSkills: ['Python', 'System Design'], status: 'Applied' },
  { id: 's3', name: 'Sam Chen', matchPercentage: 72, readinessScore: 75, program: 'B.Tech CS', topSkills: ['Algorithms', 'Logic'], status: 'Eligible' },
  { id: 's4', name: 'Sarah Miller', matchPercentage: 94, readinessScore: 95, program: 'B.Com Hons', topSkills: ['Auditing', 'Risk Mgmt'], status: 'Offered' }
];

const CollegeJobsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roles' | 'matcher' | 'pipeline'>('dashboard');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const selectedJob = useMemo(() => JOBS_DB.find(j => j.id === selectedJobId), [selectedJobId]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. JOB OPPORTUNITIES DASHBOARD (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-black/40 z-40">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                PLACEMENT INTELLIGENCE CONSOLE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Hiring <span className="gradient-text">Engine.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Strategic placement management. Turn hiring into a data-backed certainty 
                by matching your cohort's verified skills against industry demand.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Active Roles', v: 12, c: 'blue' },
                 { l: 'Partner Orgs', v: 45, c: 'cyan' },
                 { l: 'Placed Index', v: '62%', c: 'emerald' },
                 { l: 'Offers Out', v: 84, c: 'indigo' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                    <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* TABS NAVIGATION */}
      <div className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex gap-4">
          {['dashboard', 'roles', 'matcher', 'pipeline'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* B. JOB ROLE MANAGEMENT / LISTING */}
      {activeTab === 'roles' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           <div className="flex justify-between items-end mb-16">
              <div>
                 <h2 className="text-3xl font-black uppercase tracking-tight text-white">Active <span className="text-blue-500">Opportunities.</span></h2>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Hiring Pipeline Status</p>
              </div>
              <button className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">Add Job Opening</button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {JOBS_DB.map(job => (
                <div key={job.id} onClick={() => { setSelectedJobId(job.id); setActiveTab('matcher'); }} className="group p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden shadow-2xl">
                   <div className="flex justify-between items-start mb-10">
                      <div>
                         <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">{job.company}</p>
                         <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-blue-400 transition-colors">{job.roleName}</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-gray-500">{job.industry}</span>
                   </div>
                   <p className="text-gray-400 text-sm font-medium leading-relaxed mb-10">{job.description}</p>
                   
                   <div className="space-y-4 pt-8 border-t border-white/5">
                      <div className="flex justify-between items-center">
                         <span className="text-[9px] font-black text-gray-600 uppercase">Compensation</span>
                         <span className="text-sm font-black text-white">{job.compensation}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[9px] font-black text-gray-600 uppercase">Applicants</span>
                         <span className="text-sm font-black text-blue-500">{job.applicants}</span>
                      </div>
                   </div>
                   
                   <div className="mt-8 flex flex-wrap gap-2">
                      {job.skills.map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black text-gray-500 uppercase">#{s}</span>)}
                   </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* C. AI MATCHER VIEW (THE CORE VALUE) */}
      {(activeTab === 'matcher') && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-right duration-500">
           {!selectedJob ? (
              <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[64px]">
                 <h3 className="text-2xl font-black uppercase text-gray-500 mb-4">Select a Role to Match</h3>
                 <p className="text-xs font-black text-gray-600 uppercase tracking-widest">The AI will analyze 3,000+ student profiles for compatibility.</p>
                 <button onClick={() => setActiveTab('roles')} className="mt-8 px-8 py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Go to Roles</button>
              </div>
           ) : (
              <div className="space-y-16">
                 <div className="flex flex-col lg:flex-row justify-between items-start gap-12 bg-[#080808] p-12 rounded-[64px] border border-white/5 shadow-2xl">
                    <div className="space-y-6 flex-grow">
                       <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Matching Parameters for:</h3>
                       <h2 className="text-4xl font-black uppercase text-white leading-tight">{selectedJob.roleName} @ {selectedJob.company}</h2>
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                             <p className="text-[9px] font-black text-gray-600 uppercase">Required Technical Toolkit</p>
                             <div className="flex flex-wrap gap-2">
                                {selectedJob.skills.map(s => <span key={s} className="px-4 py-2 bg-blue-600/10 border border-blue-500/30 rounded-xl text-[10px] font-black uppercase text-blue-400">{s}</span>)}
                             </div>
                          </div>
                          <div className="space-y-2">
                             <p className="text-[9px] font-black text-gray-600 uppercase">Institutional Eligibility</p>
                             <p className="text-sm font-medium text-gray-400 italic">"{selectedJob.eligibility}"</p>
                          </div>
                       </div>
                    </div>
                    <div className="p-8 rounded-[40px] bg-black border border-white/10 text-center shrink-0 min-w-[240px]">
                       <p className="text-[8px] font-black text-gray-500 uppercase mb-4">Average Batch Fit</p>
                       <h3 className="text-5xl font-black text-white">42%</h3>
                       <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-4">Gap: Neural Ops Skills</p>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">AI Recommended <span className="text-emerald-500">Candidates.</span></h3>
                    <div className="grid grid-cols-1 gap-4">
                       {STUDENT_POOL.map(student => (
                         <div key={student.id} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl">
                            <div className="flex items-center gap-8 flex-grow">
                               <div className="w-16 h-16 rounded-[24px] bg-blue-600/10 flex items-center justify-center font-black text-blue-500 text-xl border border-blue-500/20">
                                  {student.name.charAt(0)}
                               </div>
                               <div className="space-y-1">
                                  <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors">{student.name}</h4>
                                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{student.program}</p>
                               </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-right">
                               <div>
                                  <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Match Index</p>
                                  <p className={`text-xl font-black ${student.matchPercentage > 90 ? 'text-emerald-500' : 'text-blue-500'}`}>{student.matchPercentage}%</p>
                               </div>
                               <div>
                                  <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Readiness</p>
                                  <p className="text-xl font-black text-white">{student.readinessScore}%</p>
                               </div>
                               <div className="min-w-[120px]">
                                  <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Status</p>
                                  <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                    student.status === 'Offered' ? 'bg-emerald-500/20 text-emerald-500' : 
                                    student.status === 'Interviewing' ? 'bg-blue-600/20 text-blue-400' : 'bg-white/5 text-gray-600'
                                  }`}>{student.status}</span>
                               </div>
                               <button className="px-6 py-3 bg-white/5 hover:bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Invite</button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           )}
        </section>
      )}

      {/* D. PLACEMENT PROGRESS TRACKER (PIPELINE) */}
      {activeTab === 'pipeline' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-left duration-500">
           <div className="mb-20">
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Execution <span className="text-blue-500">Pipeline.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">End-to-end recruitment tracking</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Applications', count: 1242, color: 'bg-blue-600' },
                { label: 'Interviews', count: 312, color: 'bg-cyan-600' },
                { label: 'Offers Sent', count: 86, color: 'bg-emerald-600' },
                { label: 'Joins Confirmed', count: 64, color: 'bg-purple-600' }
              ].map((step, i) => (
                <div key={i} className="p-10 rounded-[48px] bg-[#0a0a0a] border border-white/5 text-center relative overflow-hidden group hover:border-blue-500/40 transition-all">
                   <div className={`absolute bottom-0 left-0 right-0 h-1 ${step.color} group-hover:h-2 transition-all`} />
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">{step.label}</p>
                   <h3 className="text-5xl font-black text-white mb-2 tabular-nums">{step.count}</h3>
                   <div className="mt-8 flex justify-center gap-1">
                      {[1,2,3,4,5].map(dot => <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (i+1) ? step.color : 'bg-white/5'}`} />)}
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-20 overflow-x-auto rounded-[40px] border border-white/5 bg-[#0a0a0a]">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/[0.02] border-b border-white/10">
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Event / Time</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">Company / Role</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Batch Vol.</th>
                       <th className="p-8 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Conversion</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {[
                      { event: 'Technical Test Round', time: 'Feb 28, 10:00 AM', company: 'NeuralCorp', role: 'ML Apprentice', vol: 142, conv: '45%' },
                      { event: 'HR Final Round', time: 'Mar 02, 02:00 PM', company: 'EcoAudit', role: 'Audit Lead', vol: 12, conv: '92%' },
                      { event: 'Mass Hiring Drive', time: 'Mar 15, Full Day', company: 'Amazon', role: 'SDE-1', vol: 485, conv: '12%' },
                    ].map((row, i) => (
                      <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                         <td className="p-8">
                            <div className="space-y-1">
                               <h4 className="text-sm font-black uppercase text-white">{row.event}</h4>
                               <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{row.time}</p>
                            </div>
                         </td>
                         <td className="p-8">
                            <div className="space-y-1">
                               <h4 className="text-sm font-black uppercase text-blue-400">{row.company}</h4>
                               <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{row.role}</p>
                            </div>
                         </td>
                         <td className="p-8 text-center"><span className="text-sm font-black text-white">{row.vol}</span></td>
                         <td className="p-8 text-center">
                            <span className="text-xs font-black text-emerald-500">{row.conv} Success</span>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>
      )}

      {/* DASHBOARD TAB (OVERVIEW) */}
      {activeTab === 'dashboard' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <h2 className="text-3xl font-black uppercase tracking-tight text-white">Efficiency <span className="text-blue-500">Analytics.</span></h2>
                 <p className="text-gray-400 text-lg font-medium leading-relaxed">
                    Career Soulmate removes the chaos from college placements. Our algorithms 
                    ensure that the <span className="text-white">right student</span> is 
                    interviewing for the <span className="text-white">right role</span>.
                 </p>
                 <div className="grid gap-6">
                    {[
                      { t: "Predictive Conversion", d: "AI estimates likelihood of offers based on historical batch performance.", i: "🔮" },
                      { t: "Automated Shortlisting", d: "Verify skills instantly against JD requirements.", i: "🤖" },
                      { t: "Fairness Protocol", d: "Ensures unbiased distribution of opportunities based on merit alone.", i: "⚖️" }
                    ].map((item, i) => (
                       <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all flex gap-8 items-start">
                          <div className="text-3xl">{item.i}</div>
                          <div>
                             <h4 className="text-sm font-black uppercase text-white mb-2">{item.t}</h4>
                             <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{item.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
                 <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12 text-center">Batch Performance Summary</h4>
                    <div className="space-y-10">
                       {[
                          { label: 'Technical Eligibility', val: 78, color: 'bg-blue-500' },
                          { label: 'Placement Rate (YTD)', val: 42, color: 'bg-emerald-500' },
                          { label: 'High-LPA Affinity', val: 56, color: 'bg-purple-500' }
                       ].map((item, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black uppercase text-white tracking-widest">{item.label}</span>
                              <span className="text-xl font-black text-white">{item.val}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color} shadow-[0_0_10px_currentColor] transition-all duration-1500`} style={{ width: `${item.val}%` }} />
                           </div>
                        </div>
                       ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 text-center">
                       <button onClick={() => setActiveTab('matcher')} className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Launch Batch Matcher Engine →</button>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Placements <br/><span className="gradient-text">Redefined.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't leave your students' future to chance. Every placement is a data-point, 
              and every hire is a success story. Career Soulmate makes hiring strategic.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => setActiveTab('matcher')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Launch AI Candidate Matcher
             </button>
             <button onClick={() => setActiveTab('pipeline')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               View Progress Pipeline
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

export default CollegeJobsPage;
