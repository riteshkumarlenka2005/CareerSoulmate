
import React from 'react';

const Footer: React.FC = () => {
  const essentials = [
    { name: 'Career Explorer', path: '#' },
    { name: 'Neural Roadmap', path: '#' },
    { name: 'AI Guidance', path: '#' },
    { name: 'Skill Gap Analysis', path: '#' },
    { name: 'Scholarship Finder', path: '#' }
  ];

  const legal = [
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
    { name: 'Cookie Policy', path: '#' },
    { name: 'Security & Data', path: '#' },
    { name: 'NSQF Compliance', path: '#' }
  ];

  const socials = [
    { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
    { name: 'GitHub', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z' },
    { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { name: 'YouTube', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.08C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.42a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#010204] via-[#020617] to-[#0a1e4d] text-white pt-24 pb-12 border-t border-white/10 overflow-hidden">
      {/* Decorative Glow Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[180px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 blur-[150px] -z-10" />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#020617] to-[#1e293b] rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/10"></div>
                {/* LOGO SYMBOL: Minimal geometric tree */}
                <svg viewBox="0 0 24 24" className="relative z-10 w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21v-7" />
                  <path d="M12 14c0-2.5 3-4 6-6" />
                  <path d="M12 14c0-2.5-3-4-6-6" />
                  <path d="M12 14V7" />
                  <circle cx="18" cy="8" r="1" fill="currentColor" stroke="none" />
                  <circle cx="6" cy="8" r="1" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#f8fafc] uppercase leading-none">CareerSoulmate</span>
            </div>
            
            <p className="text-gray-200 text-sm leading-relaxed max-w-xs font-medium">
              Transforming career trajectories through proprietary neural network architectures and planetary-scale labor data.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/30 transition-all shrink-0 shadow-lg shadow-black/50">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-black text-blue-500/60 mb-1">Global HQ</p>
                  <p className="text-gray-300 text-sm font-medium">101 Neural Plaza, Silicon Corridor,<br />Innovation District, IND</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/30 transition-all shrink-0 shadow-lg shadow-black/50">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-black text-blue-500/60 mb-1">Direct Support</p>
                  <p className="text-gray-300 text-sm font-medium">destiny@careersoulmate.ai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Essentials */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.4em] text-white mb-10 border-l-4 border-blue-600 pl-4">Essentials</h4>
            <ul className="space-y-5">
              {essentials.map((item, idx) => (
                <li key={idx}>
                  <a href={item.path} className="text-gray-200 hover:text-blue-400 transition-all font-bold tracking-widest text-sm uppercase flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.4em] text-white mb-10 border-l-4 border-blue-600 pl-4">Legal & Trust</h4>
            <ul className="space-y-5">
              {legal.map((item, idx) => (
                <li key={idx}>
                  <a href={item.path} className="text-gray-200 hover:text-blue-400 transition-all font-bold tracking-widest text-sm uppercase flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Updates & Social */}
          <div className="space-y-10">
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.4em] text-white mb-8 border-l-4 border-blue-600 pl-4">Neural Feed</h4>
              <div className="bg-[#050505]/60 border border-white/10 rounded-2xl p-4 hover:border-blue-500/30 transition-all cursor-pointer group backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-black text-blue-500/80 uppercase tracking-widest">Platform Update v2.5</span>
                </div>
                <p className="text-sm text-gray-300 font-bold leading-relaxed mb-4">
                  Global salary benchmarking expanded to 45 new emerging tech sectors.
                </p>
                <span className="text-xs font-black text-blue-400 uppercase tracking-widest group-hover:underline">View Intelligence Hub →</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.4em] text-white mb-6">Network Connect</h4>
              <div className="flex flex-wrap gap-3">
                {socials.map((social, sidx) => (
                  <a 
                    key={sidx} 
                    href="#" 
                    title={social.name}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-200 hover:text-white hover:bg-blue-600 hover:border-blue-400 hover:scale-110 transition-all shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] active:scale-95"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-black text-gray-300 tracking-[0.4em] uppercase text-center md:text-left">
            © 2025 CareerSoulmate AI Systems. Global Professional Destiny Managed.
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-xs font-black text-gray-300 hover:text-white uppercase tracking-widest transition-colors">Neural Ethics</a>
            <a href="#" className="text-xs font-black text-gray-300 hover:text-white uppercase tracking-widest transition-colors">Carrier Board</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
