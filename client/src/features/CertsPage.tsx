
import React, { useState, useMemo } from 'react';

interface Certification {
  id: string;
  name: string;
  provider: string;
  skills: string[];
  duration: string;
  relevanceScore: number;
  nsqf: number;
  level: 'Beginner' | 'Intermediate' | 'Specialist' | 'Expert';
  learningOutcomes: string[];
  prerequisites: string[];
  careerValue: string;
  status: 'planned' | 'in-progress' | 'completed';
  verificationStatus?: 'verified' | 'pending' | 'rejected';
}

const INITIAL_CERTS: Certification[] = [
  {
    id: 'cert_01',
    name: 'AWS Certified Machine Learning Specialty',
    provider: 'Amazon Web Services',
    skills: ['MLOps', 'Cloud Architecting', 'SageMaker'],
    duration: '40 Hours',
    relevanceScore: 98,
    nsqf: 8,
    level: 'Specialist',
    learningOutcomes: ['Building scalable ML solutions', 'Data engineering for AI', 'Security in ML'],
    prerequisites: ['AWS Cloud Practitioner', 'Python Mastery'],
    careerValue: 'Mandatory for top-tier AI Engineering roles at Big Tech.',
    status: 'in-progress'
  },
  {
    id: 'cert_02',
    name: 'Neural Networks and Deep Learning',
    provider: 'DeepLearning.AI',
    skills: ['PyTorch', 'Neural Logic', 'Backpropagation'],
    duration: '25 Hours',
    relevanceScore: 94,
    nsqf: 7,
    level: 'Intermediate',
    learningOutcomes: ['Understanding neural net fundamentals', 'Vectorization', 'Python implementation'],
    prerequisites: ['Basic Python', 'Linear Algebra'],
    careerValue: 'Highly recognized by R&D labs and startup founders.',
    status: 'completed',
    verificationStatus: 'verified'
  },
  {
    id: 'cert_03',
    name: 'Certified Professional Data Auditor',
    provider: 'NAPS / MSDE',
    skills: ['Data Governance', 'Ethics', 'Compliance'],
    duration: '15 Hours',
    relevanceScore: 82,
    nsqf: 6,
    level: 'Specialist',
    learningOutcomes: ['Regulatory compliance', 'Privacy laws', 'Audit frameworks'],
    prerequisites: ['None'],
    careerValue: 'Essential for government and financial sector data roles.',
    status: 'planned'
  },
  {
    id: 'cert_04',
    name: 'Generative AI for Creative Professionals',
    provider: 'Adobe / Figma',
    skills: ['Stable Diffusion', 'Prompt Ops', 'AI Design'],
    duration: '10 Hours',
    relevanceScore: 78,
    nsqf: 5,
    level: 'Beginner',
    learningOutcomes: ['AI-aided visual design', 'Concept speed-building'],
    prerequisites: ['Graphic Design basics'],
    careerValue: 'Emerging requirement for high-end Creative Directors.',
    status: 'planned'
  }
];

const CertsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [certs, setCerts] = useState<Certification[]>(INITIAL_CERTS);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const stats = useMemo(() => ({
    total: certs.length,
    planned: certs.filter(c => c.status === 'planned').length,
    inProgress: certs.filter(c => c.status === 'in-progress').length,
    completed: certs.filter(c => c.status === 'completed').length,
    verified: certs.filter(c => c.verificationStatus === 'verified').length
  }), [certs]);

  const handleUpdateStatus = (id: string, newStatus: Certification['status']) => {
    setCerts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedCert?.id === id) {
      setSelectedCert(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. CERTIFICATION DASHBOARD (TOP) */}
      <section className="relative pt-28 pb-16 px-6 overflow-visible border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                CREDENTIAL STRATEGY HUB
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                Verified <br/><span className="gradient-text">Mastery.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Skill certificates are the proof-of-work in the future economy. 
                Build a neural portfolio that global recruiters can verify instantly.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto">
               {[
                 { label: 'Planned', val: stats.planned, color: 'text-gray-500' },
                 { label: 'In Progress', val: stats.inProgress, color: 'text-blue-500' },
                 { label: 'Completed', val: stats.completed, color: 'text-emerald-500' },
                 { label: 'Verified', val: stats.verified, color: 'text-cyan-500' }
               ].map((s, i) => (
                 <div key={i} className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 text-center min-w-[140px] group hover:border-blue-500/30 transition-all">
                    <p className="text-3xl font-black text-white mb-2">{s.val}</p>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${s.color}`}>{s.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* B. RECOMMENDED CERTIFICATIONS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tight">AI-Targeted <span className="text-blue-500">Credentials.</span></h2>
            <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.4em] mt-1">Based on AI Research Scientist Roadmap</p>
          </div>
          <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest border border-white/10 px-6 py-2.5 rounded-xl transition-all">Filter Strategy</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certs.map(cert => (
            <div 
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group relative flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[48px] overflow-hidden hover:border-blue-500/40 transition-all duration-500 cursor-pointer shadow-xl"
            >
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center font-black text-blue-500 text-xl border border-blue-500/20">
                    {cert.provider.charAt(0)}
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      cert.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      cert.status === 'in-progress' ? 'bg-blue-600/20 text-blue-400' :
                      'bg-white/5 text-gray-500'
                    }`}>
                      {cert.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-blue-400 transition-colors tracking-tighter mb-4">{cert.name}</h3>
                <p className="text-gray-500 text-xs font-black uppercase tracking-[0.3em] mb-8">{cert.provider}</p>

                <div className="grid grid-cols-2 gap-6 mb-8 pt-8 border-t border-white/5">
                   <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Impact Score</p>
                      <p className="text-xl font-black text-white">{cert.relevanceScore}%</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Standard</p>
                      <p className="text-xs font-black text-blue-400 uppercase">NSQF Level {cert.nsqf}</p>
                   </div>
                </div>

                <div className="mt-auto space-y-4">
                   <div className="flex flex-wrap gap-2">
                      {cert.skills.map(s => <span key={s} className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black text-gray-400 uppercase tracking-widest border border-white/5">#{s.replace(/\s+/g, '')}</span>)}
                   </div>
                </div>
              </div>

              {cert.verificationStatus === 'verified' && (
                <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] flex items-center justify-center text-white animate-in zoom-in duration-1000">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* C. CERTIFICATION DETAIL VIEW (MODAL) */}
      {selectedCert && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedCert(null)} />
           
           <div className="relative w-full max-w-7xl h-full max-h-[92vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)]">
              
              {/* Left Col: Outcomes & Impact */}
              <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-blue-600/[0.02]">
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Credential Blueprint</span>
                       <h2 className="text-4xl font-black uppercase text-white leading-none tracking-tighter">{selectedCert.name}</h2>
                       <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedCert.provider}</p>
                    </div>

                    {/* E. SKILL IMPACT PREVIEW */}
                    <div className="p-10 rounded-[48px] bg-black border border-white/5 space-y-8 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                       </div>
                       <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">Readiness Shift</h3>
                       <div className="space-y-8">
                          <div className="space-y-3">
                             <div className="flex justify-between items-end">
                                <span className="text-[9px] font-black text-gray-500 uppercase">Current Role Match</span>
                                <span className="text-xl font-black text-white">74%</span>
                             </div>
                             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-white/20" style={{ width: '74%' }} />
                             </div>
                          </div>
                          <div className="space-y-3">
                             <div className="flex justify-between items-end">
                                <span className="text-[9px] font-black text-blue-400 uppercase">Post-Cert Match</span>
                                <span className="text-xl font-black text-blue-400">92%</span>
                             </div>
                             <div className="h-1.5 w-full bg-blue-600/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 shadow-[0_0_15px_#3b82f6]" style={{ width: '92%' }} />
                             </div>
                          </div>
                       </div>
                       <div className="pt-6 border-t border-white/5">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                             Completing this unlocks access to <span className="text-white">Senior ML Researcher</span> pathways.
                          </p>
                       </div>
                    </div>

                    <section className="space-y-6">
                       <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Career Value</h4>
                       <p className="text-sm text-gray-400 font-medium leading-relaxed italic">"{selectedCert.careerValue}"</p>
                    </section>
                 </div>
              </div>

              {/* Right Col: Learning & Actions */}
              <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40">
                 <div className="flex justify-end mb-10">
                    <button onClick={() => setSelectedCert(null)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10 shadow-2xl">
                       <svg className="w-7 h-7 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 </div>

                 <div className="space-y-24">
                    <section className="space-y-12">
                       <div className="flex items-center gap-6">
                         <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">What you will learn</h4>
                         <div className="h-px flex-grow bg-white/10" />
                       </div>
                       <div className="grid md:grid-cols-2 gap-8">
                          {selectedCert.learningOutcomes.map((outcome, i) => (
                            <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-blue-600/5 transition-all group">
                               <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 font-black text-xs shrink-0">0{i+1}</div>
                               <span className="text-sm font-black uppercase tracking-tight text-gray-300 group-hover:text-white transition-colors">{outcome}</span>
                            </div>
                          ))}
                       </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-16">
                       <section className="space-y-10">
                          <h4 className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.5em]">Prerequisites</h4>
                          <div className="space-y-4">
                             {selectedCert.prerequisites.map(pre => (
                               <div key={pre} className="flex items-center gap-4 group/pre">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover/pre:scale-150 transition-all" />
                                  <span className="text-xs font-black uppercase text-gray-300 group-hover/pre:text-white">{pre}</span>
                               </div>
                             ))}
                          </div>
                       </section>
                       <section className="space-y-10">
                          <h4 className="text-[11px] font-black text-purple-500 uppercase tracking-[0.5em]">Standard Details</h4>
                          <div className="space-y-4">
                             <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-[10px] font-black text-gray-500 uppercase">Est. Duration</span>
                                <span className="text-[10px] font-black text-white uppercase">{selectedCert.duration}</span>
                             </div>
                             <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-[10px] font-black text-gray-500 uppercase">NSQF Mastery</span>
                                <span className="text-[10px] font-black text-white uppercase">Level {selectedCert.nsqf}</span>
                             </div>
                             <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-[10px] font-black text-gray-500 uppercase">Difficulty</span>
                                <span className="text-[10px] font-black text-white uppercase">{selectedCert.level}</span>
                             </div>
                          </div>
                       </section>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                       {selectedCert.status === 'planned' && (
                         <button onClick={() => handleUpdateStatus(selectedCert.id, 'in-progress')} className="py-7 bg-blue-600 hover:bg-blue-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_70px_rgba(37,99,235,0.3)] transition-all active:scale-95">
                            Commit to Skill Path
                         </button>
                       )}
                       {selectedCert.status === 'in-progress' && (
                         <button onClick={() => handleUpdateStatus(selectedCert.id, 'completed')} className="py-7 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_70px_rgba(16,185,129,0.3)] transition-all active:scale-95">
                            Mark as Accomplished
                         </button>
                       )}
                       {selectedCert.status === 'completed' && (
                         <button className="py-7 bg-white/5 border border-emerald-500/30 text-emerald-400 rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] cursor-default flex items-center justify-center gap-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                            Accomplishment Logged
                         </button>
                       )}
                       <button onClick={() => setIsUploading(true)} className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                          Upload for Verification
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* D. UPLOAD & VERIFY (OVERLAY) */}
      {isUploading && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsUploading(false)} />
           <div className="relative w-full max-w-2xl p-12 bg-[#080808] border border-white/10 rounded-[56px] shadow-[0_0_100px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
              <div className="text-center space-y-8">
                 <div className="w-24 h-24 rounded-[32px] bg-blue-600/10 flex items-center justify-center mx-auto border border-blue-500/20">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase text-white tracking-tighter">Submit Evidence.</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm mx-auto uppercase tracking-widest">Upload your PDF, JPG, or PNG certificate for AI and SSO validation.</p>
                 </div>
                 <div className="p-16 border-2 border-dashed border-white/10 rounded-[40px] bg-white/[0.01] hover:border-blue-500/40 transition-all cursor-pointer group">
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] group-hover:text-blue-500 transition-colors">Select Files from Portfolio</p>
                 </div>
                 <div className="flex gap-4">
                    <button onClick={() => setIsUploading(false)} className="flex-grow py-5 bg-white/5 hover:bg-white/10 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all">Cancel</button>
                    <button onClick={() => { alert('Submission queued for neural verification.'); setIsUploading(false); }} className="flex-grow py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-600/30">Verify Credential</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Immutable <br/><span className="gradient-text">Competency.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Recruiters filter by results. Ensure your profile is locked with 
              verifiable industry badges that move you to the top of the talent pool.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => onNavigate('explorer')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Match Certs to Vacancies
             </button>
             <button onClick={() => onNavigate('pathways')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               View NSQF Career Paths
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
          background-image: linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
};

export default CertsPage;
