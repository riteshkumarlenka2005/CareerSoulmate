
import React, { useState, useMemo } from 'react';

interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  daysLeft: number;
  eligibility: 'Eligible' | 'Partially Eligible' | 'Not Eligible';
  statusReason: string;
  requiredDocs: { name: string; status: 'Uploaded' | 'Missing' }[];
  category: string;
  type: string;
}

const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 's1',
    name: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    amount: '₹2,00,000 / Year',
    deadline: 'March 15, 2025',
    daysLeft: 12,
    eligibility: 'Eligible',
    statusReason: 'Matches your PCM stream and family income bracket.',
    requiredDocs: [
      { name: 'Class 10 Marksheet', status: 'Uploaded' },
      { name: 'Family Income Certificate', status: 'Missing' },
      { name: 'Passport Size Photo', status: 'Uploaded' }
    ],
    category: 'Merit-cum-Means',
    type: 'Private'
  },
  {
    id: 's2',
    name: 'Post-Matric Scholarship (SC/ST/OBC)',
    provider: 'National Scholarship Portal (NSP)',
    amount: 'Full Fee Reimbursement',
    deadline: 'March 31, 2025',
    daysLeft: 28,
    eligibility: 'Partially Eligible',
    statusReason: 'Requires valid Caste Certificate verification.',
    requiredDocs: [
      { name: 'Caste Certificate', status: 'Missing' },
      { name: 'Bank Passbook Copy', status: 'Uploaded' },
      { name: 'Fee Receipt', status: 'Uploaded' }
    ],
    category: 'Government',
    type: 'Central'
  },
  {
    id: 's3',
    name: 'Adobe Women in Technology Scholarship',
    provider: 'Adobe Systems',
    amount: '$15,000 + Internship',
    deadline: 'April 10, 2025',
    daysLeft: 38,
    eligibility: 'Eligible',
    statusReason: 'Your target goal (Neural Architect) aligns with STEM criteria.',
    requiredDocs: [
      { name: 'Academic Transcript', status: 'Uploaded' },
      { name: 'Letter of Recommendation', status: 'Missing' },
      { name: 'Statement of Purpose', status: 'Missing' }
    ],
    category: 'STEM Specialization',
    type: 'Corporate'
  },
  {
    id: 's4',
    name: 'HDFC Badhte Kadam Scholarship',
    provider: 'HDFC Bank',
    amount: '₹75,000',
    deadline: 'February 28, 2025',
    daysLeft: 2,
    eligibility: 'Eligible',
    statusReason: 'Direct match for undergraduate students with 60%+ marks.',
    requiredDocs: [
      { name: 'Previous Year Marksheet', status: 'Uploaded' },
      { name: 'Identity Proof (Aadhar)', status: 'Uploaded' }
    ],
    category: 'General',
    type: 'Private'
  }
];

const ScholarshipsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const stats = useMemo(() => {
    return {
      active: SCHOLARSHIPS_DATA.length,
      closingSoon: SCHOLARSHIPS_DATA.filter(s => s.daysLeft <= 15).length,
      eligible: SCHOLARSHIPS_DATA.filter(s => s.eligibility === 'Eligible').length
    };
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. SCHOLARSHIP DEADLINE DASHBOARD (TOP) */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-16">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                FINANCIAL PROTECTION PROTOCOL
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                Opportunity <br/><span className="gradient-text">Atlas.</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed">
                Strategic financial safeguarding for your academic journey. We track windows, verify eligibility, and manage your documentation vault.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto">
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                  <p className="text-3xl font-black text-white mb-2">{stats.active}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-blue-500">Active Grants</p>
               </div>
               <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-red-500/30 transition-all">
                  <p className="text-3xl font-black text-red-500 mb-2">{stats.closingSoon}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Closing Soon</p>
               </div>
               <div className="p-8 rounded-[32px] bg-emerald-600/5 border border-emerald-500/20 text-center group hover:border-emerald-500 transition-all">
                  <p className="text-3xl font-black text-emerald-500 mb-2">{stats.eligible}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Perfect Fits</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. SCHOLARSHIP DEADLINE CARDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">Active <span className="text-blue-500">Grants.</span></h2>
            <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.4em]">Sorted by Urgency & Priority</p>
          </div>
          <div className="flex gap-4">
             <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest border border-white/10 px-6 py-2.5 rounded-xl transition-all">Download Guide</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {SCHOLARSHIPS_DATA.map(s => (
            <div 
              key={s.id}
              onClick={() => setSelectedScholarship(s)}
              className="group relative p-10 rounded-[48px] bg-white/[0.01] border border-white/5 hover:border-blue-500/40 transition-all duration-500 flex flex-col md:flex-row items-center gap-10 cursor-pointer shadow-xl overflow-hidden"
            >
              <div className="md:w-32 shrink-0 flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-black border border-white/5 group-hover:border-blue-500/30 transition-all">
                 <p className="text-3xl font-black text-white">{s.daysLeft}</p>
                 <p className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Days Left</p>
              </div>

              <div className="flex-grow space-y-4">
                 <div className="flex flex-wrap gap-3 items-center">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      s.eligibility === 'Eligible' ? 'bg-emerald-500/20 text-emerald-400' : 
                      s.eligibility === 'Partially Eligible' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {s.eligibility}
                    </span>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{s.category}</span>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black uppercase text-white group-hover:text-blue-400 transition-colors tracking-tight">{s.name}</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.provider}</p>
                 </div>
                 <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div>
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Grant Value</p>
                       <p className="text-sm font-black text-white">{s.amount}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Deadline</p>
                       <p className="text-[10px] font-black text-gray-400 uppercase">{s.deadline}</p>
                    </div>
                 </div>
              </div>

              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all shrink-0">
                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7-7" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C. ELIGIBILITY & DOCUMENT CHECKLIST MODAL */}
      {selectedScholarship && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedScholarship(null)} />
           
           <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              
              {/* Left Column: Logic & Status */}
              <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-blue-600/[0.02]">
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Grant Blueprint</span>
                       <h2 className="text-4xl font-black uppercase text-white leading-none tracking-tighter">{selectedScholarship.name}</h2>
                       <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedScholarship.provider}</p>
                    </div>

                    <div className={`p-10 rounded-[48px] bg-black border space-y-6 relative overflow-hidden ${
                      selectedScholarship.eligibility === 'Eligible' ? 'border-emerald-500/20' : 'border-orange-500/20'
                    }`}>
                       <h3 className={`text-xs font-black uppercase tracking-[0.4em] ${
                         selectedScholarship.eligibility === 'Eligible' ? 'text-emerald-500' : 'text-orange-500'
                       }`}>Eligibility Verdict</h3>
                       <div className="space-y-2">
                          <p className="text-2xl font-black text-white">{selectedScholarship.eligibility}</p>
                          <p className="text-sm text-gray-400 font-medium leading-relaxed italic">"{selectedScholarship.statusReason}"</p>
                       </div>
                       <div className="pt-6 border-t border-white/5">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase">
                             <span className="text-gray-500">Confidence Score</span>
                             <span className="text-emerald-400">92%</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Financial Impact</h4>
                       <div className="space-y-4">
                          <div className="flex justify-between border-b border-white/5 pb-3">
                             <span className="text-[10px] font-black text-gray-500 uppercase">Est. Support</span>
                             <span className="text-[10px] font-black text-white uppercase">{selectedScholarship.amount}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-3">
                             <span className="text-[10px] font-black text-gray-500 uppercase">Urgency</span>
                             <span className="text-[10px] font-black text-red-500 uppercase">{selectedScholarship.daysLeft} Days to go</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right Column: Document Tracker */}
              <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40">
                 <div className="flex justify-end mb-10">
                    <button onClick={() => setSelectedScholarship(null)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10 shadow-2xl">
                       <svg className="w-7 h-7 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 </div>

                 <div className="space-y-20">
                    {/* D. DOCUMENT CHECKLIST TRACKER */}
                    <section className="space-y-12">
                       <div className="flex items-center gap-6">
                         <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">Document Readiness Vault</h4>
                         <div className="h-px flex-grow bg-white/10" />
                       </div>
                       
                       <div className="grid grid-cols-1 gap-4">
                          {selectedScholarship.requiredDocs.map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-8 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-blue-500/20 transition-all">
                               <div className="flex items-center gap-8">
                                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                                    doc.status === 'Uploaded' ? 'bg-emerald-600/10 text-emerald-400' : 'bg-red-600/10 text-red-400'
                                  }`}>
                                     {doc.status === 'Uploaded' ? (
                                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                     ) : (
                                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                                     )}
                                  </div>
                                  <div>
                                     <h4 className="text-sm font-black uppercase text-white">{doc.name}</h4>
                                     <p className={`text-[9px] font-black uppercase tracking-widest mt-1 ${doc.status === 'Uploaded' ? 'text-emerald-500' : 'text-red-500'}`}>Status: {doc.status}</p>
                                  </div>
                               </div>
                               {doc.status === 'Missing' && (
                                 <button className="px-6 py-3 bg-white/5 hover:bg-blue-600 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all border border-white/10">Upload Now</button>
                               )}
                            </div>
                          ))}
                       </div>
                    </section>

                    <div className="p-12 rounded-[56px] bg-gradient-to-br from-emerald-600/10 to-transparent border border-emerald-500/20 relative overflow-hidden">
                       <h4 className="text-2xl font-black uppercase text-white mb-4">Strategic Action Required</h4>
                       <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-xl">
                         "To secure this grant, your <span className="text-white">Family Income Certificate</span> must be issued within the last 6 months. Please visit your local Tehsildar or E-District portal immediately."
                       </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       <button className="py-7 bg-blue-600 hover:bg-blue-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_70px_rgba(37,99,235,0.3)] transition-all active:scale-95">
                          Initiate Application Logic
                       </button>
                       <button className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                          Sync Document Vault
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Funding Your <br/><span className="gradient-text">Ambition.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Don't let finances dictate your destination. Career Soulmate 
              orchestrates your funding so you can focus on mastering your skills.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('colleges')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Browse Partner Institutions
             </button>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Filter by My Profile
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
      `}</style>
    </div>
  );
};

export default ScholarshipsPage;
