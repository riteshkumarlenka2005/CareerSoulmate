
import React, { useState, useMemo } from 'react';

type SaTab = 'Registry' | 'Profiles' | 'Compliance' | 'Mapping' | 'Performance' | 'Audit';

interface InstitutionRecord {
  id: string;
  name: string;
  type: 'Public' | 'Private' | 'Autonomous' | 'Vocational';
  region: string;
  status: 'Active' | 'Pending' | 'Suspended';
  accreditation: string;
  enrolledCount: number;
  nepScore: number;
  adminsCount: number;
}

const MOCK_INSTITUTIONS: InstitutionRecord[] = [
  { id: 'INST-001', name: 'Indian Institute of Technology (IIT) Bombay', type: 'Public', region: 'Maharashtra', status: 'Active', accreditation: 'Eminence', enrolledCount: 11000, nepScore: 94, adminsCount: 4 },
  { id: 'INST-002', name: 'Miranda House, Delhi University', type: 'Public', region: 'Delhi', status: 'Active', accreditation: 'NAAC A++', enrolledCount: 4500, nepScore: 88, adminsCount: 3 },
  { id: 'INST-003', name: 'BITS Pilani', type: 'Autonomous', region: 'Rajasthan', status: 'Active', accreditation: 'Eminence', enrolledCount: 15000, nepScore: 92, adminsCount: 6 },
  { id: 'INST-004', name: 'Symbiosis International', type: 'Private', region: 'Maharashtra', status: 'Pending', accreditation: 'NAAC A+', enrolledCount: 22000, nepScore: 78, adminsCount: 2 },
  { id: 'INST-005', name: 'National Skill Hub', type: 'Vocational', region: 'Karnataka', status: 'Suspended', accreditation: 'NSDC L3', enrolledCount: 1200, nepScore: 45, adminsCount: 1 }
];

const AdminInstitutionsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<SaTab>('Registry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstId, setSelectedInstId] = useState<string | null>(null);

  const filteredInst = useMemo(() => {
    return MOCK_INSTITUTIONS.filter(i => 
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      i.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedInst = useMemo(() => MOCK_INSTITUTIONS.find(i => i.id === selectedInstId), [selectedInstId]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. SUPER ADMIN HEADER */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                GLOBAL INSTITUTIONAL REGISTRY
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Institutional <span className="gradient-text">Fleet.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Management of the world's most innovative academic ecosystem. Onboard new nodes, 
                verify compliance status, and orchestrate national resource allocation.
              </p>
            </div>

            <div className="flex gap-4">
               <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Export Global Audit</button>
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl">Onboard Institution +</button>
            </div>
          </div>

          <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-3xl border border-white/10 w-fit overflow-x-auto custom-scrollbar">
            {(['Registry', 'Profiles', 'Compliance', 'Mapping', 'Performance', 'Audit'] as SaTab[]).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* B. REGISTRY CONTENT */}
      {activeTab === 'Registry' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
           <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
              <div className="relative group w-full md:w-96">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search Name, Region or ID..."
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-xs font-black uppercase outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
                 />
                 <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div className="flex gap-4">
                 <button className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">Type: All</button>
                 <button className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">Status: All</button>
              </div>
           </div>

           <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/[0.02] border-b border-white/10">
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Institution & ID</th>
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Classification</th>
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Region</th>
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">NEP Ready</th>
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {filteredInst.map(inst => (
                       <tr 
                        key={inst.id} 
                        onClick={() => { setSelectedInstId(inst.id); setActiveTab('Profiles'); }}
                        className="group hover:bg-white/[0.01] transition-colors cursor-pointer"
                       >
                          <td className="p-10">
                             <div className="space-y-1">
                                <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors leading-none">{inst.name}</h4>
                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{inst.id}</p>
                             </div>
                          </td>
                          <td className="p-10">
                             <div className="space-y-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{inst.type}</span>
                                <p className="text-[8px] font-black text-blue-500 uppercase">{inst.accreditation}</p>
                             </div>
                          </td>
                          <td className="p-10">
                             <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{inst.region}</p>
                          </td>
                          <td className="p-10 text-center">
                             <div className="flex flex-col items-center gap-1">
                                <span className={`text-sm font-black ${inst.nepScore > 80 ? 'text-emerald-500' : inst.nepScore > 50 ? 'text-blue-400' : 'text-rose-500'}`}>{inst.nepScore}%</span>
                                <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                   <div className={`h-full ${inst.nepScore > 80 ? 'bg-emerald-600' : 'bg-blue-600'}`} style={{ width: `${inst.nepScore}%` }} />
                                </div>
                             </div>
                          </td>
                          <td className="p-10 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                               inst.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                               inst.status === 'Pending' ? 'bg-blue-600/10 text-blue-500' : 
                               'bg-rose-500/10 text-rose-500'
                             }`}>{inst.status}</span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>
      )}

      {/* C. INSTITUTION PROFILE VIEW */}
      {activeTab === 'Profiles' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           {!selectedInst ? (
             <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[64px] opacity-40">
                <div className="text-6xl mb-8">🏛️</div>
                <h3 className="text-2xl font-black uppercase text-gray-500">Select an Institution from Registry</h3>
                <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mt-4 max-w-sm mx-auto">Explore program alignment, capacity utilization, and user mapping per institution.</p>
                <button onClick={() => setActiveTab('Registry')} className="mt-8 px-10 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Back to Registry</button>
             </div>
           ) : (
             <div className="space-y-12">
                <div className="flex justify-between items-end">
                   <div className="space-y-4">
                      <div className="flex items-center gap-4">
                         <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Node Profile</span>
                         <span className="text-gray-600 font-black text-[10px] uppercase">Last Update: 2 Days Ago</span>
                      </div>
                      <h2 className="text-5xl font-black uppercase text-white tracking-tighter leading-none">{selectedInst.name}</h2>
                   </div>
                   <div className="flex gap-4">
                      <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:text-white transition-all">Edit Metadata</button>
                      <button className="px-6 py-3 bg-rose-600/10 border border-rose-500/20 rounded-xl text-[10px] font-black uppercase text-rose-500 hover:bg-rose-600 hover:text-white transition-all">Suspend Node</button>
                   </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                   {/* Left Col: Identity & Capacity */}
                   <div className="lg:col-span-1 space-y-8">
                      <div className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 shadow-2xl space-y-10">
                         <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Capacity Audit</h4>
                         <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                               <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Enrollment</p>
                               <p className="text-2xl font-black text-white">{selectedInst.enrolledCount.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Active Admins</p>
                               <p className="text-2xl font-black text-white">{selectedInst.adminsCount}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Faculty Mix</p>
                               <p className="text-2xl font-black text-white">312</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Specialized Labs</p>
                               <p className="text-2xl font-black text-white">12</p>
                            </div>
                         </div>
                      </div>

                      <div className="p-10 rounded-[56px] bg-purple-600/5 border border-purple-500/20 shadow-2xl">
                         <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-8">NEP Readiness</h4>
                         <div className="space-y-6">
                            {[
                              { label: 'ABC Sync', v: 100 },
                              { label: 'Multi-Exit Mapping', v: 92 },
                              { label: 'Skill-First Units', v: 64 }
                            ].map(m => (
                              <div key={m.label} className="space-y-2">
                                 <div className="flex justify-between items-end">
                                    <span className="text-[9px] font-black text-gray-500 uppercase">{m.label}</span>
                                    <span className="text-xs font-black text-white">{m.v}%</span>
                                 </div>
                                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-600" style={{ width: `${m.v}%` }} />
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Right Col: Program Analysis & Connections */}
                   <div className="lg:col-span-2 space-y-8">
                      <div className="p-12 rounded-[56px] border border-white/5 bg-[#0a0a0a] shadow-2xl relative overflow-hidden">
                         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
                         <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12">Active Programs & Outcomes</h4>
                         <div className="grid md:grid-cols-2 gap-8">
                            {[
                               { n: 'B.Tech Comp Sci', s: 'FYUP Ready', o: '94% Placement' },
                               { n: 'B.A. Multidisciplinary', s: 'Credit Ported', o: '82% Clarity' },
                               { n: 'B.Com FinTech', s: 'Industry Mapped', o: '42% Internship' },
                               { n: 'Skill Hub Alpha', s: 'Vocational', o: 'NSQF Lv 4' }
                            ].map((p, i) => (
                               <div key={i} className="p-6 rounded-[32px] bg-black border border-white/5 hover:border-blue-500/30 transition-all flex items-center justify-between group">
                                  <div className="space-y-1">
                                     <h5 className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors">{p.n}</h5>
                                     <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{p.s}</p>
                                  </div>
                                  <span className="text-[10px] font-black text-emerald-500 uppercase">{p.o}</span>
                               </div>
                            ))}
                         </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                         <div className="p-10 rounded-[56px] bg-white/[0.01] border border-white/10 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl mb-6">🤝</div>
                            <h4 className="text-lg font-black uppercase text-white mb-2">User Mapping</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed mb-8 px-6">Manage administrative access, faculty roles, and counselor assignments for this node.</p>
                            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Configure Access</button>
                         </div>
                         <div className="p-10 rounded-[56px] bg-white/[0.01] border border-white/10 flex flex-col items-center justify-center text-center">
                            <div className="text-4xl mb-6">📋</div>
                            <h4 className="text-lg font-black uppercase text-white mb-2">Audit Logs</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed mb-8 px-6">Review historical metadata changes, compliance shifts, and administrative overrides.</p>
                            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">View Node Logs</button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </section>
      )}

      {/* D. COMPLIANCE & VERIFICATION TAB */}
      {activeTab === 'Compliance' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-right duration-500">
           <div className="mb-20">
              <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Verification <span className="text-emerald-500">Protocol.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Active government & regulatory recognition monitoring</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                 { t: 'UGC/AICTE Recognition', d: 'Validating official university status and technical program charters.', i: '🏛️', status: 'Verified' },
                 { t: 'NSDC Alignment', d: 'Mapping vocational centers to National Skill Development protocols.', i: '⚙️', status: 'Verified' },
                 { t: 'Data Integrity Audit', d: 'Zero-knowledge proof verification of institutional reported data.', i: '🔐', status: 'Pending' }
              ].map((v, i) => (
                 <div key={i} className="p-10 rounded-[56px] bg-[#0a0a0a] border border-white/5 flex flex-col group hover:border-emerald-500/30 transition-all">
                    <div className="flex justify-between items-start mb-10">
                       <div className="text-4xl">{v.i}</div>
                       <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${v.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-600/10 text-blue-500 animate-pulse'}`}>{v.status}</span>
                    </div>
                    <h4 className="text-xl font-black uppercase text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors">{v.t}</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase leading-relaxed mb-12 flex-grow">{v.d}</p>
                    <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">Trigger Manual Audit</button>
                 </div>
              ))}
           </div>
        </section>
      )}

      {/* E. PERFORMANCE ANALYTICS TAB */}
      {activeTab === 'Performance' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                 <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Institutional <br/><span className="text-blue-500">Yield Benchmarking.</span></h2>
                 <p className="text-gray-400 text-lg font-medium leading-relaxed">
                    Compare individual node performance against regional and national baselines. 
                    Identify high-yield programs and underperforming infrastructure.
                 </p>
                 <div className="space-y-10">
                    {[
                       { label: 'Avg Enrollment Velocity', inst: 94, regional: 82 },
                       { label: 'Skill Outcome Index', inst: 78, regional: 72 },
                       { label: 'Placement Conversion', inst: 64, regional: 58 }
                    ].map((m, i) => (
                       <div key={i} className="space-y-4">
                          <div className="flex justify-between items-end">
                             <span className="text-xs font-black uppercase text-white tracking-widest">{m.label}</span>
                             <div className="flex gap-4">
                                <span className="text-[10px] font-black text-blue-500 uppercase">Inst: {m.inst}%</span>
                                <span className="text-[10px] font-black text-gray-600 uppercase">Reg: {m.regional}%</span>
                             </div>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                             <div className="h-full bg-blue-600 shadow-[0_0_10px_#3b82f6]" style={{ width: `${m.inst}%` }} />
                             <div className="h-full bg-white/10" style={{ width: `${m.regional}%` }} />
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
                 <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl text-center">
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12">Cluster Distribution</h4>
                    <div className="relative aspect-square max-w-[300px] mx-auto">
                       {/* Scatter plot mock with SVG */}
                       <svg viewBox="0 0 400 400" className="w-full h-full">
                          <line x1="0" y1="200" x2="400" y2="200" stroke="white" strokeWidth="0.5" className="opacity-10" />
                          <line x1="200" y1="0" x2="200" y2="400" stroke="white" strokeWidth="0.5" className="opacity-10" />
                          {[...Array(20)].map((_, i) => (
                            <circle key={i} cx={50 + Math.random() * 300} cy={50 + Math.random() * 300} r="4" className="fill-white/10" />
                          ))}
                          <circle cx="320" cy="80" r="10" className="fill-blue-500 shadow-[0_0_20px_#3b82f6] animate-pulse" />
                          <text x="340" y="85" className="fill-blue-400 text-[10px] font-black uppercase">Active Node</text>
                       </svg>
                    </div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-12">This node is performing in the Top 5% of its Peer Cluster.</p>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center bg-gradient-to-t from-blue-900/10 to-transparent">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             National <br/><span className="gradient-text">Orchestration.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Total institutional visibility is the foundation of national policy. 
              Career Soulmate empowers you to manage thousands of campuses as a 
              single, high-performing professional destiny engine.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center no-print">
             <button onClick={() => alert('Generating Global Infrastructure Roadmap...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Expansion Roadmap
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Global Overview Dashboard
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

export default AdminInstitutionsPage;
