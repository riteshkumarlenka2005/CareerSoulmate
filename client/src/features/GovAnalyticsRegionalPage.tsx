
import React, { useState } from 'react';

type MapLayer = 'Enrollment' | 'Institutions' | 'Programs' | 'Skills';

interface RegionStats {
  name: string;
  enrollment: string;
  institutions: number;
  govtPenetration: number;
  facultyRatio: string;
  streams: { label: string; value: number; color: string }[];
  desertFlags: string[];
}

const REGION_DATA: Record<string, RegionStats> = {
  'Maharashtra': {
    name: 'Maharashtra',
    enrollment: '4.8M',
    institutions: 4120,
    govtPenetration: 38,
    facultyRatio: '1:18',
    streams: [
      { label: 'Arts', value: 30, color: 'bg-rose-500' },
      { label: 'Science', value: 35, color: 'bg-blue-500' },
      { label: 'Commerce', value: 25, color: 'bg-cyan-500' },
      { label: 'Vocational', value: 10, color: 'bg-emerald-500' }
    ],
    desertFlags: ['Zero AI Labs in District Gadchiroli', 'Infrastructure Deficit in Palghar Hub']
  },
  'Delhi': {
    name: 'Delhi NCR',
    enrollment: '1.2M',
    institutions: 850,
    govtPenetration: 52,
    facultyRatio: '1:12',
    streams: [
      { label: 'Arts', value: 40, color: 'bg-rose-500' },
      { label: 'Science', value: 25, color: 'bg-blue-500' },
      { label: 'Commerce', value: 25, color: 'bg-cyan-500' },
      { label: 'Vocational', value: 10, color: 'bg-emerald-500' }
    ],
    desertFlags: ['Skill Gap in Outer-Delhi Vocational Hub']
  },
  'Tamil Nadu': {
    name: 'Tamil Nadu',
    enrollment: '3.2M',
    institutions: 2450,
    govtPenetration: 45,
    facultyRatio: '1:15',
    streams: [
      { label: 'Arts', value: 20, color: 'bg-rose-500' },
      { label: 'Science', value: 50, color: 'bg-blue-500' },
      { label: 'Commerce', value: 15, color: 'bg-cyan-500' },
      { label: 'Vocational', value: 15, color: 'bg-emerald-500' }
    ],
    desertFlags: ['Infrastructure Aging in Tier-3 Centers']
  }
};

const GovAnalyticsRegionalPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>('Enrollment');
  const [selectedRegion, setSelectedRegion] = useState<string>('Maharashtra');

  const region = REGION_DATA[selectedRegion] || REGION_DATA['Maharashtra'];

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. NATIONAL GEOGRAPHIC EQUITY HEADER */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                GEOGRAPHIC EQUITY & PLANNING DASHBOARD
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Regional <br/><span className="gradient-text">Atlas.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Mapping institutional capacity against national human capital needs. 
                Visualizing the physical footprint of the professional destiny ecosystem.
              </p>
            </div>

            <div className="flex gap-4 no-print">
               <button onClick={() => window.print()} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all">Download State Brief</button>
               <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all shadow-xl">Target Interventions</button>
            </div>
          </div>

          <div className="flex gap-2 bg-white/[0.03] p-1.5 rounded-3xl border border-white/10 w-fit no-print">
            {(['Enrollment', 'Institutions', 'Programs', 'Skills'] as MapLayer[]).map((layer) => (
              <button 
                key={layer}
                onClick={() => setActiveLayer(layer)}
                className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeLayer === layer ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-500 hover:text-white'}`}
              >
                {layer} Density
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* B. INTERACTIVE NATIONAL MAP & DRILL-DOWN */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Visual Map Canvas */}
            <div className="lg:col-span-7 relative h-[600px] bg-[#0a0a0a] rounded-[64px] border border-white/5 p-12 overflow-hidden shadow-2xl flex items-center justify-center group">
               <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
               <div className="absolute top-10 left-10 z-20">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">National Grid Map_v4</span>
                  <p className="text-[8px] text-gray-600 font-bold uppercase mt-1 italic">Click a region to explore metrics</p>
               </div>

               {/* Abstract India SVG Map */}
               <svg viewBox="0 0 400 450" className="w-full h-full relative z-10 fill-blue-500/10 stroke-blue-500/30">
                  <path 
                    d="M180,20 L220,50 L250,150 L350,250 L300,350 L200,420 L100,350 L50,250 L100,100 Z" 
                    className={`transition-all cursor-pointer ${selectedRegion === 'Maharashtra' ? 'fill-blue-600/40 stroke-blue-400' : 'hover:fill-blue-500/20'}`}
                    onClick={() => setSelectedRegion('Maharashtra')}
                  />
                  <circle cx="200" cy="225" r="5" className="fill-blue-500 animate-ping" />
                  
                  {/* Scatter dots representing institutions */}
                  <g className="opacity-40">
                     {Object.keys(REGION_DATA).map((key, i) => (
                       <circle 
                        key={key} 
                        cx={150 + (i*40)} 
                        cy={100 + (i*60)} 
                        r="3" 
                        className={`cursor-pointer transition-all ${selectedRegion === key ? 'fill-white scale-150' : 'fill-blue-400'}`}
                        onClick={() => setSelectedRegion(key)}
                       />
                     ))}
                  </g>
               </svg>

               <div className="absolute bottom-10 right-10 flex flex-col gap-2 no-print">
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">+</button>
                  <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10">-</button>
               </div>
            </div>

            {/* Region Detail Sidebar */}
            <div className="lg:col-span-5 space-y-8 animate-in slide-in-from-right duration-500">
               <div className="p-12 rounded-[64px] bg-[#0a0a0a] border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 blur-[80px] rounded-full" />
                  
                  <div className="space-y-12">
                     <div className="space-y-4">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Region Dossier</span>
                        <h2 className="text-4xl font-black uppercase text-white tracking-tighter">{region.name}</h2>
                        <div className="flex gap-10 border-t border-white/5 pt-8">
                           <div>
                              <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Total Enrollment</p>
                              <p className="text-2xl font-black text-white">{region.enrollment}</p>
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Institutions</p>
                              <p className="text-2xl font-black text-white">{region.institutions}</p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest border-l-2 border-blue-600 pl-4">Stream Distribution</p>
                        <div className="space-y-6">
                           {region.streams.map((s, i) => (
                             <div key={i} className="space-y-2">
                                <div className="flex justify-between items-end">
                                   <span className="text-[10px] font-black uppercase text-gray-400">{s.label}</span>
                                   <span className="text-xs font-black text-white">{s.value}%</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                   <div className={`h-full ${s.color} transition-all duration-1000`} style={{ width: `${s.value}%` }} />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                        <div className="p-6 rounded-3xl bg-black border border-white/5">
                           <p className="text-[8px] font-black text-gray-600 uppercase mb-2">Govt Penetration</p>
                           <p className="text-xl font-black text-emerald-500">{region.govtPenetration}%</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-black border border-white/5">
                           <p className="text-[8px] font-black text-gray-600 uppercase mb-2">Faculty Ratio</p>
                           <p className="text-xl font-black text-blue-500">{region.facultyRatio}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* C. SUPPLY VS DEMAND ANALYSIS */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-20 text-center">
               <h2 className="text-3xl font-black uppercase tracking-tight">Supply vs <span className="text-blue-500">Market Demand.</span></h2>
               <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Correlating student interest with industrial opportunity</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
               {/* Program Availability Comparison */}
               <div className="p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12">Student Interest vs Institution Seats</h4>
                  <div className="space-y-10">
                     {[
                        { l: 'Artificial Intelligence', i: 92, s: 45, c: 'blue' },
                        { l: 'Bio-Digital Ethics', i: 68, s: 12, c: 'purple' },
                        { l: 'Traditional Humanities', i: 30, s: 85, c: 'rose' }
                     ].map((item, i) => (
                        <div key={i} className="space-y-4">
                           <div className="flex justify-between items-end">
                              <span className="text-xs font-black uppercase text-white tracking-widest">{item.l}</span>
                              <span className={`text-[9px] font-black uppercase ${item.i > item.s ? 'text-rose-500' : 'text-emerald-500'}`}>
                                 {item.i > item.s ? `Deficit: ${item.i - item.s}%` : 'Surplus'}
                              </span>
                           </div>
                           <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                              <div className="h-full bg-blue-600" style={{ width: `${item.i}%` }} title="Interest" />
                              <div className="h-full bg-white/20" style={{ width: `${item.s}%` }} title="Supply" />
                           </div>
                           <div className="flex justify-between text-[8px] font-black uppercase text-gray-600">
                              <span>User Interest Index</span>
                              <span>Physical Capacity</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Skill Gap Heatmap Integration */}
               <div className="p-12 rounded-[64px] border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl flex flex-col justify-center">
                  <div className="text-center space-y-8">
                     <div className="w-24 h-24 rounded-[32px] bg-red-600/10 border border-red-500/20 flex items-center justify-center mx-auto text-4xl">🎯</div>
                     <h3 className="text-2xl font-black uppercase text-white">Intervention <br/>Priority Zone.</h3>
                     <p className="text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                        High interest in <span className="text-white">Applied AI</span> is being bottlenecked by 
                        zero local <span className="text-white">GPU-Lab</span> infrastructure in {region.name}.
                     </p>
                     <button className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[9px] shadow-xl shadow-red-600/30">Provision Grant</button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* D. POLICY INTERVENTION INDICATORS (THE FLAGS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="mb-20">
            <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Critical <span className="text-rose-500">Flags.</span></h2>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Identified Education Deserts & Deficits</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {region.desertFlags.map((flag, i) => (
               <div key={i} className="p-10 rounded-[56px] bg-white/[0.02] border border-white/5 hover:border-rose-500/40 transition-all group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                     <div className="w-12 h-12 rounded-2xl bg-rose-600/10 flex items-center justify-center text-rose-500 text-2xl group-hover:animate-pulse">⚠️</div>
                     <span className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[8px] font-black uppercase tracking-widest">Active Deficit</span>
                  </div>
                  <h4 className="text-xl font-black uppercase text-white mb-6 leading-tight group-hover:text-rose-400 transition-colors">{flag}</h4>
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed mb-10 flex-grow">
                     Systemic lack of specialized training facilities in this cluster prevents 12,000+ potential learners from reaching NSQF Level 4 compliance.
                  </p>
                  <button className="mt-auto w-full py-4 bg-white/5 hover:bg-rose-600 border border-white/10 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all">Assign Planning Task</button>
               </div>
            ))}
            
            {/* Template for adding more */}
            <div className="p-10 rounded-[56px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40 hover:opacity-100 transition-all cursor-pointer">
               <div className="text-4xl mb-4 text-gray-500">+</div>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Scan for New Deserts</p>
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Equitable <br/><span className="gradient-text">Reach.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Policymaking is the ultimate act of mapping. Career Soulmate 
              converts millions of data points into a single lens of geographic equity.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center no-print">
             <button onClick={() => alert('Opening Infrastructure Budgeter...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Export Infrastructure Master-Plan
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
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .bg-[#050505], .bg-[#0a0a0a], .bg-[#080808], .bg-black { background: white !important; border-color: #eee !important; color: black !important; }
          .text-white, .text-gray-300, .text-gray-400, .text-gray-500, .text-gray-600 { color: black !important; }
          .border-white\/5, .border-white\/10 { border-color: #eee !important; }
          .gradient-text { background: none !important; -webkit-text-fill-color: black !important; color: black !important; }
        }
      `}</style>
    </div>
  );
};

export default GovAnalyticsRegionalPage;
