
import React from 'react';

const TrustSection: React.FC = () => {
  const partners = [
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'ISRO', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg' },
    { name: 'IIT Madras', logo: 'https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg' },
    { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Tata', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
  ];

  // Triplicate the list to ensure there's enough content for a seamless loop on any screen size
  const displayPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-24 bg-gradient-to-b from-[#050505] to-[#0a0a1a] overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="flex items-center justify-center gap-10">
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-white/10"></div>
          <h3 className="text-xs md:text-sm font-bold tracking-[0.5em] text-cyan-400/60 uppercase whitespace-nowrap">
            AUTHORIZED & TRUSTED BY
          </h3>
          <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-white/10"></div>
        </div>
      </div>

      <div className="relative group">
        {/* Edge Gradient Masks for a high-end feel */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0a0a1a] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-fast whitespace-nowrap gap-24 md:gap-48 items-center py-6">
            {displayPartners.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center min-w-[120px] transition-all duration-700 opacity-30 grayscale brightness-[3] contrast-0 hover:opacity-100 hover:grayscale-0 hover:brightness-100 hover:contrast-100 cursor-pointer"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-6 md:h-8 w-auto object-contain pointer-events-none" 
                  onError={(e) => {
                    // Fallback for missing logos
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-fast {
          display: flex;
          animation: marquee-scroll 50s linear infinite;
        }
        .group:hover .animate-marquee-fast {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-marquee-fast {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustSection;
