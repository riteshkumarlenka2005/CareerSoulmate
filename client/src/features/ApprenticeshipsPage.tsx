
import React, { useState, useMemo } from 'react';

interface Opportunity {
  id: string;
  role: string;
  company: string;
  industry: string;
  location: string;
  duration: string;
  stipend: string;
  nsqf: number;
  skills: string[];
  description: string;
  image: string;
  isVerified: boolean;
}

interface EnrolledApprenticeship {
  id: string;
  role: string;
  company: string;
  status: 'Applied' | 'Active' | 'Completed';
  progress: number;
  mentorFeedback: string;
  mentorName: string;
  skillsGained: string[];
}

const OPPORTUNITIES_DB: Opportunity[] = [
  {
    id: 'opp_01',
    role: 'Precision CNC Apprentice',
    company: 'Tata Advanced Systems',
    industry: 'Manufacturing',
    location: 'Pune, Maharashtra',
    duration: '12 Months',
    stipend: '₹18,000 - ₹22,000 / month',
    nsqf: 4,
    skills: ['G-Code', 'CAD/CAM', 'Industrial Safety'],
    description: 'Hands-on training in aerospace precision parts manufacturing using multi-axis CNC machinery.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop',
    isVerified: true
  },
  {
    id: 'opp_02',
    role: 'Solar Grid Technician',
    company: 'Adani Renewables',
    industry: 'Energy',
    location: 'Mundra, Gujarat',
    duration: '18 Months',
    stipend: '₹15,000 - ₹20,000 / month',
    nsqf: 3,
    skills: ['PV Installation', 'Grid Sync', 'Diagnostics'],
    description: 'Learn installation and maintenance of utility-scale solar arrays in the world\'s largest renewable park.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop',
    isVerified: true
  },
  {
    id: 'opp_03',
    role: 'EV Powertrain Trainee',
    company: 'Ola Electric',
    industry: 'Automotive',
    location: 'Hosur, TN',
    duration: '24 Months',
    stipend: '₹20,000 - ₹25,000 / month',
    nsqf: 5,
    skills: ['BMS Testing', 'Battery Assembly', 'Motor Control'],
    description: 'Deep dive into the future of urban mobility. Work on assembly lines of cutting-edge electric scooters.',
    image: 'https://images.unsplash.com/photo-1619641782822-7512529267aa?q=80&w=2070&auto=format&fit=crop',
    isVerified: true
  },
  {
    id: 'opp_04',
    role: 'Network Operations (NAPS)',
    company: 'Jio Platforms',
    industry: 'Technology',
    location: 'Navi Mumbai',
    duration: '12 Months',
    stipend: '₹16,500 / month',
    nsqf: 4,
    skills: ['5G Architecture', 'Server Mgmt', 'Linux'],
    description: 'Assigned to the NAPS portal. Gain experience in managing country-scale digital infrastructure.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2020&auto=format&fit=crop',
    isVerified: true
  }
];

const MY_TRACKER: EnrolledApprenticeship[] = [
  {
    id: 'en_01',
    role: 'Junior UI/UX Apprentice',
    company: 'Zomato Design Lab',
    status: 'Active',
    progress: 65,
    mentorName: 'Arjun K.',
    mentorFeedback: 'Excellent grasp of spatial hierarchy. Needs to focus more on accessibility standards in Week 12.',
    skillsGained: ['Figma Mastery', 'User Research', 'Prototyping']
  },
  {
    id: 'en_02',
    role: 'Data Analyst Trainee',
    company: 'Reliance Industries',
    status: 'Applied',
    progress: 0,
    mentorName: 'Pending Allocation',
    mentorFeedback: 'Application under review by HR. Technical round cleared.',
    skillsGained: []
  }
];

const ApprenticeshipsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [filterIndustry, setFilterIndustry] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOpp = useMemo(() => {
    return OPPORTUNITIES_DB.filter(opp => {
      const matchesIndustry = filterIndustry === 'All' || opp.industry === filterIndustry;
      const matchesSearch = opp.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            opp.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesIndustry && matchesSearch;
    });
  }, [filterIndustry, searchQuery]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. APPRENTICESHIP OVERVIEW */}
      <section className="relative pt-28 pb-20 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                EXPERIENTIAL LEARNING GATEWAY
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                Learn + <br/><span className="gradient-text">Earn.</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                Apprenticeships are the "Missing Link" between education and employment. 
                Move beyond the classroom and build <span className="text-white">real experience</span> 
                while receiving a guaranteed stipend.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-black uppercase text-blue-500 mb-2 tracking-widest">Hands-On Mastery</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed font-bold uppercase">80% of your time is spent on the actual work floor solving real industrial problems.</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-sm font-black uppercase text-emerald-500 mb-2 tracking-widest">Verified Income</h4>
                  <p className="text-gray-500 text-[11px] leading-relaxed font-bold uppercase">Legally mandated stipends ensure you are compensated fairly for your training period.</p>
                </div>
              </div>
            </div>

            {/* B. APPRENTICESHIP TRACKER (PERSONALIZED) */}
            <div className="lg:w-1/2 w-full">
               <div className="p-10 rounded-[64px] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-xl font-black uppercase tracking-widest text-white">My Active Stints</h3>
                     <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Tracker_v1.2</span>
                  </div>

                  <div className="space-y-6">
                     {MY_TRACKER.map(item => (
                       <div key={item.id} className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-4 hover:border-blue-500/30 transition-all group">
                          <div className="flex justify-between items-start">
                             <div>
                                <h4 className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors">{item.role}</h4>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">{item.company}</p>
                             </div>
                             <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                               item.status === 'Active' ? 'bg-blue-600/20 text-blue-400' : 'bg-white/5 text-gray-500'
                             }`}>
                               {item.status}
                             </span>
                          </div>

                          {item.status === 'Active' && (
                            <div className="space-y-3">
                               <div className="flex justify-between items-end">
                                  <span className="text-[9px] font-black text-gray-600 uppercase">Training Progress</span>
                                  <span className="text-[11px] font-black text-white">{item.progress}%</span>
                               </div>
                               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6]" style={{ width: `${item.progress}%` }} />
                               </div>
                               <div className="mt-4 p-4 rounded-2xl bg-blue-600/5 border border-blue-500/10">
                                  <p className="text-[8px] font-black text-blue-400 uppercase mb-2 tracking-widest">Feedback from {item.mentorName}</p>
                                  <p className="text-[11px] text-gray-300 font-medium italic leading-relaxed">"{item.mentorFeedback}"</p>
                               </div>
                            </div>
                          )}

                          {item.status === 'Applied' && (
                             <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.mentorFeedback}</p>
                             </div>
                          )}
                       </div>
                     ))}
                  </div>

                  <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                     View All Applications
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. PERSONALIZED MATCHES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <div>
              <h2 className="text-4xl font-black uppercase tracking-tight">Personalized <span className="text-blue-500">Matches.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Based on your Skill Profile & NSQF level</p>
           </div>
           
           <div className="flex gap-4 w-full md:w-auto">
              <div className="relative group flex-grow">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search roles or companies..."
                   className="w-full bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-xs font-black uppercase outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
                 />
              </div>
              <select 
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-[10px] font-black uppercase outline-none focus:border-blue-500 text-gray-400"
              >
                 <option value="All">All Industries</option>
                 <option value="Manufacturing">Manufacturing</option>
                 <option value="Energy">Energy</option>
                 <option value="Automotive">Automotive</option>
                 <option value="Technology">Technology</option>
              </select>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
           {filteredOpp.map(opp => (
             <div key={opp.id} className="group flex flex-col md:flex-row bg-[#0a0a0a] border border-white/5 rounded-[48px] overflow-hidden hover:border-blue-500/40 transition-all duration-500 shadow-xl">
                <div className="md:w-[40%] h-64 md:h-auto relative overflow-hidden shrink-0">
                  <img src={opp.image} alt={opp.role} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden md:block" />
                  <div className="absolute top-6 left-6">
                     <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl">MATCHED 98%</span>
                  </div>
                </div>

                <div className="md:w-[60%] p-12 flex flex-col">
                   <div className="mb-6 space-y-1">
                     <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{opp.company}</p>
                     <h3 className="text-2xl font-black uppercase text-white tracking-tighter leading-tight">{opp.role}</h3>
                   </div>

                   <div className="grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-white/5">
                      <div>
                         <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Stipend</p>
                         <p className="text-[11px] font-black text-emerald-400">{opp.stipend}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Level</p>
                         <span className="text-[11px] font-black text-white uppercase">NSQF {opp.nsqf}</span>
                      </div>
                      <div>
                         <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Duration</p>
                         <p className="text-[11px] font-black text-white uppercase">{opp.duration}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Location</p>
                         <p className="text-[10px] font-black text-white uppercase line-clamp-1">{opp.location}</p>
                      </div>
                   </div>

                   <div className="mt-auto space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {opp.skills.map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold text-gray-400 uppercase tracking-widest">#{s.replace(/\s+/g, '')}</span>)}
                      </div>
                      <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95">Initiate Contract</button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* D. CAREER TRANSITION INSIGHT */}
      <section className="py-32 px-6 bg-[#080808] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="space-y-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">The Ultimate <br/><span className="text-blue-500">Upgrade.</span></h2>
                <p className="text-gray-400 text-xl font-medium leading-relaxed">
                   Completing a Level-4 apprenticeship doesn't just give you experience—it 
                   officially <span className="text-white">re-grades</span> your professional profile 
                   for high-tier full-time roles.
                </p>
                
                <div className="space-y-8">
                   {[
                      { from: 'Apprentice (Lv 4)', to: 'Associate Specialist (Lv 6)', color: 'blue' },
                      { from: '₹20k Stipend', to: '₹65k+ Base Salary', color: 'emerald' },
                      { from: 'Manual Guidance', to: 'Autonomous Execution', color: 'purple' }
                   ].map((item, i) => (
                      <div key={i} className="flex items-center gap-8 group">
                         <div className="flex-1 text-right">
                            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{item.from}</span>
                         </div>
                         <div className="w-12 h-px bg-white/10 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] group-hover:scale-150 transition-all" />
                         </div>
                         <div className="flex-1">
                            <span className={`text-sm font-black text-${item.color}-500 uppercase tracking-widest`}>{item.to}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="relative">
                <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="relative p-12 rounded-[60px] bg-white/[0.02] border border-white/10 overflow-hidden shadow-2xl">
                   <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-8">Unlocked Careers Post-Stint</h4>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Sr. Manufacturing Lead', 'Quality Assurance Head', 'Automation Architect', 'Operations Director'].map(job => (
                        <div key={job} className="p-6 rounded-[32px] bg-black/60 border border-white/5 hover:border-blue-500/40 transition-all group">
                           <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">✓</div>
                           <h5 className="text-xs font-black uppercase text-white tracking-tight leading-tight">{job}</h5>
                           <p className="text-[8px] text-gray-500 font-bold uppercase mt-2">Salary Premium: +45%</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* E. SAFETY & TRUST SIGNALS */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-4xl font-black uppercase tracking-tight mb-20">Guaranteed <span className="text-emerald-500">Security.</span></h2>
           <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-6">
                 <div className="w-20 h-20 rounded-[32px] bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-3xl">⚖️</div>
                 <h4 className="text-xs font-black uppercase text-white tracking-widest">NAPS Aligned</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">
                    Every contract is registered on the official National Apprenticeship 
                    Promotion Scheme portal.
                 </p>
              </div>
              <div className="space-y-6">
                 <div className="w-20 h-20 rounded-[32px] bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mx-auto text-3xl">🏛️</div>
                 <h4 className="text-xs font-black uppercase text-white tracking-widest">Govt Certified</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">
                    Completion certificates are co-signed by the Sector Skill Council 
                    and MSDE (India).
                 </p>
              </div>
              <div className="space-y-6">
                 <div className="w-20 h-20 rounded-[32px] bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mx-auto text-3xl">🔐</div>
                 <h4 className="text-xs font-black uppercase text-white tracking-widest">Legal Guard</h4>
                 <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">
                    Automated stipend tracking and zero-tolerance grievance 
                    redressal systems.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Experience is the <br/><span className="gradient-text">New Degree.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Recruiters don't hire students; they hire professionals. 
              Start your transition today and build a verifiable proof-of-work portfolio.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Opening Career Matcher...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Match My Skills to Stints
             </button>
             <button onClick={() => onNavigate('explorer')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               View High-Growth Careers
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        input::placeholder { color: #2d3748; }
        .text-emerald-500 { color: #10b981; }
        .bg-emerald-600\/20 { background-color: rgba(16, 185, 129, 0.2); }
      `}</style>
    </div>
  );
};

export default ApprenticeshipsPage;
