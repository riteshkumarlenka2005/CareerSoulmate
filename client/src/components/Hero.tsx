
import React from 'react';
import { UserRole } from './Header';

interface HeroProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Hero: React.FC<HeroProps> = ({ role, setRole }) => {
  const roles: UserRole[] = [
    'guest', 
    'user'
  ];

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Role Switcher Vertical Sidebar - Only in Hero */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-3">
        <div className="h-20 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent mx-auto mb-4" />
        <p className="text-xs font-black text-gray-300 uppercase tracking-[0.3em] vertical-text mb-6 [writing-mode:vertical-lr] rotate-180">
          Select Identity
        </p>
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`group relative flex items-center gap-4 transition-all duration-300 ${
              role === r ? 'text-white' : 'text-gray-300 hover:text-gray-300'
            }`}
          >
            <span className={`text-xs font-black uppercase tracking-widest text-right min-w-[120px] transition-all duration-300 ${
              role === r ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}>
              {r.replace('_', ' ')}
            </span>
            <div className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ${
              role === r 
                ? 'bg-blue-500 border-blue-400 scale-125 shadow-[0_0_15px_rgba(59,130,246,0.8)]' 
                : 'bg-transparent border-white/20'
            }`} />
          </button>
        ))}
        <div className="h-20 w-px bg-gradient-to-t from-transparent via-blue-500/50 to-transparent mx-auto mt-4" />
      </div>

      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`,
            backgroundPosition: 'center'
          }}
        />
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pl-20 lg:pl-40">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            The Future of Global Recruitment
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight uppercase">
            Map Your <br />
            <span className="gradient-text">Destiny</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
            Harnessing planetary-scale data and neural AI to map your unique talent to the most innovative roles across the globe. Professional, precise, and personally tailored.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 group uppercase tracking-widest text-xs">
              Start Global Search
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-sm uppercase tracking-widest text-xs">
              View Opportunities
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-gray-200 text-sm">
            <div className="flex -space-x-2">
              {[10, 11, 12, 13].map(i => (
                <img key={i} src={`https://picsum.photos/seed/soulmate-${i}/64/64`} className="w-8 h-8 rounded-full border-2 border-[#050505]" alt="Professional User" />
              ))}
            </div>
            <p className="uppercase text-xs font-bold tracking-widest">Trusted by <span className="text-blue-400">50,000+</span> professionals worldwide</p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 right-[15%] w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-[10%] w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
    </section>
  );
};

export default Hero;
