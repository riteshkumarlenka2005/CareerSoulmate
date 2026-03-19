
import React, { useState } from 'react';

type AdminTab = 'Users' | 'Roles' | 'Assignments' | 'Policies' | 'Audit';

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Suspended' | 'Pending' | 'Deactivated';
  institution: string;
  lastLogin: string;
}

const MOCK_USERS: PlatformUser[] = [
  { id: 'U-001', name: 'Ritesh Lenka', email: 'ritesh@careersoulmate.ai', role: 'Super Admin', status: 'Active', institution: 'Global HQ', lastLogin: '10 mins ago' },
  { id: 'U-002', name: 'Alex Johnson', email: 'alex.j@edu.in', role: 'Student', status: 'Active', institution: 'NISAT', lastLogin: '2 hours ago' },
  { id: 'U-003', name: 'Dr. Sarah Mitchell', email: 'sarah.m@counsel.ai', role: 'Counselor', status: 'Active', institution: 'School Hub', lastLogin: 'Yesterday' },
  { id: 'U-004', name: 'John Doe', email: 'j.doe@gov.in', role: 'Gov Analyst', status: 'Suspended', institution: 'Ministry of Skill', lastLogin: '3 days ago' },
  { id: 'U-005', name: 'Anya Sharma', email: 'anya@univ.edu', role: 'College Admin', status: 'Pending', institution: 'IIT Bombay', lastLogin: 'Never' }
];

const ROLES_CONFIG = [
  { role: 'Student', perms: { view: true, create: false, edit: true, delete: false, export: true, approve: false } },
  { role: 'Counselor', perms: { view: true, create: true, edit: true, delete: false, export: true, approve: true } },
  { role: 'College Admin', perms: { view: true, create: true, edit: true, delete: true, export: true, approve: true } },
  { role: 'Gov Analyst', perms: { view: true, create: false, edit: false, delete: false, export: true, approve: false } },
  { role: 'Super Admin', perms: { view: true, create: true, edit: true, delete: true, export: true, approve: true, config: true } }
];

const AdminUsersRolesPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Users');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. SUPER ADMIN HEADER */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                PLATFORM SECURITY & ACCESS ENGINE
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Users & <span className="gradient-text">Roles.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Centralized command for global identities. Orchestrate granular permissions, 
                maintain sovereign compliance, and monitor the neural integrity of the ecosystem.
              </p>
            </div>

            <div className="flex gap-4">
               <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Bulk Provisioning</button>
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl">System Lockdown</button>
            </div>
          </div>

          <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-3xl border border-white/10 w-fit">
            {(['Users', 'Roles', 'Assignments', 'Policies', 'Audit'] as AdminTab[]).map((tab) => (
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

      {/* B. USERS MANAGEMENT TAB */}
      {activeTab === 'Users' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
           <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
              <div className="relative group w-full md:w-96">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search UID, Name or Email..."
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3.5 text-xs font-black uppercase outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
                 />
                 <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div className="flex gap-4">
                 <button className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">Export User List</button>
                 <button className="px-6 py-3.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">New User +</button>
              </div>
           </div>

           <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/[0.02] border-b border-white/10">
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Identity & Email</th>
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Platform Role</th>
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Institution</th>
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {MOCK_USERS.map(user => (
                       <tr key={user.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="p-10">
                             <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center font-black text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">{user.name.charAt(0)}</div>
                                <div className="space-y-1">
                                   <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors leading-none">{user.name}</h4>
                                   <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{user.email}</p>
                                </div>
                             </div>
                          </td>
                          <td className="p-10">
                             <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">{user.role}</span>
                          </td>
                          <td className="p-10">
                             <p className="text-[11px] font-black text-gray-400 uppercase">{user.institution}</p>
                             <p className="text-[8px] text-gray-700 font-bold uppercase mt-1">Active Since 2024</p>
                          </td>
                          <td className="p-10 text-center">
                             <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                               user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                               user.status === 'Suspended' ? 'bg-rose-500/10 text-rose-500' : 
                               'bg-white/5 text-gray-500'
                             }`}>{user.status}</span>
                          </td>
                          <td className="p-10 text-center">
                             <div className="flex justify-center gap-2">
                                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10" title="Edit Access"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                                <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-rose-600 transition-all border border-white/10" title="Lock Account"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </section>
      )}

      {/* C. ROLES & PERMISSIONS TAB */}
      {activeTab === 'Roles' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           <div className="mb-20">
              <h2 className="text-3xl font-black uppercase tracking-tight">Permission <span className="text-blue-500">Matrix.</span></h2>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Granular capability definition for system roles</p>
           </div>

           <div className="overflow-x-auto rounded-[56px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-white/[0.02] border-b border-white/10">
                       <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">Platform Role</th>
                       {['View', 'Create', 'Edit', 'Delete', 'Export', 'Approve'].map(p => (
                         <th key={p} className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">{p}</th>
                       ))}
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {ROLES_CONFIG.map(r => (
                       <tr key={r.role} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="p-10"><span className="text-sm font-black uppercase text-white tracking-widest">{r.role}</span></td>
                          {Object.entries(r.perms).slice(0,6).map(([key, val]) => (
                             <td key={key} className="p-10 text-center">
                                <div className={`w-8 h-8 rounded-xl mx-auto flex items-center justify-center transition-all ${val ? 'bg-blue-600/10 text-blue-500' : 'bg-white/5 text-gray-800'}`}>
                                   {val ? '✓' : '✕'}
                                </div>
                             </td>
                          ))}
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           
           <div className="mt-12 flex justify-center">
              <button className="px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Define Custom Role</button>
           </div>
        </section>
      )}

      {/* D. AUDIT LOGS TAB */}
      {activeTab === 'Audit' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
           <div className="flex justify-between items-end mb-16">
              <div>
                 <h2 className="text-3xl font-black uppercase tracking-tight">System <span className="text-rose-500">Audit.</span></h2>
                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Immutable activity logging for all administrative events</p>
              </div>
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Download Master Log</button>
           </div>

           <div className="grid grid-cols-1 gap-4">
              {[
                { l: "Role Elevation: U-003 to 'Super Admin' (Expiring 2h)", t: "10 mins ago", i: "⚡", c: "blue" },
                { l: "Data Export: National Skill Supply Audit (U-001)", t: "1 hour ago", i: "💾", c: "emerald" },
                { l: "System Lockdown Initiated & Rescinded (Global)", t: "3 hours ago", i: "🔒", c: "rose" },
                { l: "Failed Login Attempt: 192.168.1.4 (Origin: Unknown)", t: "5 hours ago", i: "⚠️", c: "orange" }
              ].map((log, i) => (
                <div key={i} className="p-8 rounded-[40px] bg-black border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
                   <div className="flex items-center gap-10">
                      <div className={`w-12 h-12 rounded-2xl bg-${log.c}-500/10 flex items-center justify-center text-xl`}>{log.i}</div>
                      <div>
                         <p className="text-sm font-black uppercase text-white leading-tight">{log.l}</p>
                         <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest mt-1">Event_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                      </div>
                   </div>
                   <span className="text-[10px] font-black text-gray-600 uppercase">{log.t}</span>
                </div>
              ))}
           </div>
        </section>
      )}

      {/* E. ACCESS POLICIES TAB (SIMULATED) */}
      {activeTab === 'Policies' && (
        <section className="py-24 px-6 max-w-7xl mx-auto animate-in slide-in-from-right duration-500">
           <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-12">
                 <h2 className="text-3xl font-black uppercase tracking-tight text-white leading-tight">Global <br/><span className="text-blue-500">Access Policies.</span></h2>
                 <div className="grid gap-6">
                    {[
                       { t: "Student PII Visibility", d: "Only assigned Counselors can view full contact data.", i: "👤" },
                       { t: "Report Export Cycle", d: "National reports restricted to Gov Analysts every 30 days.", i: "📄" },
                       { t: "Geographic Fencing", d: "College Admins restricted to regional IP subnets.", i: "📍" }
                    ].map((p, i) => (
                      <div key={i} className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all flex gap-8 items-start group">
                         <div className="text-3xl group-hover:scale-110 transition-transform">{p.i}</div>
                         <div className="space-y-2">
                            <h4 className="text-sm font-black uppercase text-white tracking-widest">{p.t}</h4>
                            <p className="text-[11px] text-gray-500 font-bold uppercase leading-relaxed">{p.d}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full" />
                 <div className="relative p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl space-y-10">
                    <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] text-center mb-8">Platform Hardening Score</h4>
                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                       <svg className="w-full h-full rotate-[-90deg]">
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="552.92" strokeDashoffset="44" className="text-emerald-500 shadow-[0_0_20px_#10b981]" />
                       </svg>
                       <span className="absolute text-5xl font-black text-white">92%</span>
                    </div>
                    <p className="text-center text-[10px] font-black text-gray-500 uppercase tracking-widest">Compliance Level: High (Sovereign Tier)</p>
                    <button className="w-full py-5 bg-white/5 border border-white/10 rounded-3xl font-black uppercase tracking-widest text-[9px] hover:bg-blue-600 transition-all">Rotate Security Keys</button>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center bg-gradient-to-t from-blue-900/10 to-transparent">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Platform <br/><span className="gradient-text">Governance.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Total visibility is the foundation of total security. Career Soulmate 
              empowers you to orchestrate the world's most innovative professional 
              intelligence ecosystem with absolute control.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Generating Security Audit Dossier...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Full Platform Audit
             </button>
             <button onClick={() => onNavigate('home')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Global Dashboard
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
        .text-rose-500 { color: #f43f5e; }
        .bg-rose-500 { background-color: #f43f5e; }
        .bg-rose-500\/10 { background-color: rgba(244, 63, 94, 0.1); }
        .border-rose-500\/20 { border-color: rgba(244, 63, 94, 0.2); }
        .text-emerald-500 { color: #10b981; }
        .bg-emerald-500 { background-color: #10b981; }
        .bg-emerald-500\/10 { background-color: rgba(16, 185, 129, 0.1); }
        .text-orange-500 { color: #f97316; }
        .bg-orange-500 { background-color: #f97316; }
        .bg-orange-500\/10 { background-color: rgba(249, 115, 22, 0.1); }
      `}</style>
    </div>
  );
};

export default AdminUsersRolesPage;
