
import React from 'react';

const CollegeMap: React.FC = () => {
  return (
    <section className="py-24 bg-[#080808] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 lg:gap-20 items-center">
        
        {/* Left Side: Visual Map Mockup */}
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative aspect-square bg-[#050505] rounded-3xl border border-white/10 p-8 overflow-hidden shadow-2xl flex items-center justify-center">
             {/* Simplified Abstract SVG Map Representation */}
             <svg viewBox="0 0 400 450" className="w-full h-full fill-blue-500/20 stroke-blue-500/40">
                <path d="M180,20 L220,50 L250,150 L350,250 L300,350 L200,420 L100,350 L50,250 L100,100 Z" className="hover:fill-blue-500/40 transition-all cursor-pointer" />
                <circle cx="200" cy="225" r="5" className="fill-white animate-ping" />
                <circle cx="200" cy="225" r="3" className="fill-blue-400" />
                
                <g className="opacity-40">
                   <circle cx="150" cy="100" r="2" fill="white" />
                   <circle cx="250" cy="180" r="2" fill="white" />
                   <circle cx="180" cy="300" r="2" fill="white" />
                   <circle cx="280" cy="320" r="2" fill="white" />
                </g>
             </svg>
             
             {/* Hover Card Overlay */}
             <div className="absolute top-5 md:p-8 lg:p-10 right-10 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl max-w-[150px] animate-in slide-in-from-right-2">
                <p className="text-xs font-black text-blue-500 uppercase mb-1">State Focus</p>
                <p className="text-white font-bold text-xs mb-2">Maharashtra</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm font-black uppercase text-gray-300">
                    <span>Institutes</span>
                    <span className="text-white">412</span>
                  </div>
                  <div className="flex justify-between text-sm font-black uppercase text-gray-300">
                    <span>Scholarships</span>
                    <span className="text-white">12</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">Government <br /><span className="text-blue-500">Colleges</span> & Funding</h2>
          <p className="text-gray-200 text-lg mb-6 md:mb-8 lg:mb-10 leading-relaxed font-medium">
            Discover thousands of accredited government institutions you didn't know existed. We automate the search for scholarships and aid based on your region and category.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mb-6 md:mb-8 lg:mb-10">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.04]">
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-1">State Level Aid</h5>
              <p className="text-gray-300 text-xs font-bold uppercase leading-tight">Unified scholarship portal integration</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.04]">
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-1">Central Schemes</h5>
              <p className="text-gray-300 text-xs font-bold uppercase leading-tight">Direct mapping to NSP & specialized grants</p>
            </div>
          </div>

          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all">
            Launch Interactive Map
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollegeMap;
