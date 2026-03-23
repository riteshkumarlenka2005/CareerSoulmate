
import React from 'react';

const CareerTree: React.FC = () => {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Grid Background Effect for the whole section */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:p-12 lg:p-16 items-center">
        {/* Left Side: Content */}
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            The Interactive <br />
            <span className="gradient-text">Career Branching Tree</span>
          </h2>
          <p className="text-gray-200 text-lg mb-6 md:mb-8 lg:mb-10 max-w-xl leading-relaxed">
            Our Career Tree visualization shows you how one skill leads to multiple potential careers. 
            Hover over nodes to see requirements, salary projections, and industry demand.
          </p>
          
          <ul className="space-y-6 mb-6 md:mb-10 lg:mb-12">
            {[
              "Dynamic node-based exploration",
              "Cross-industry skill mapping",
              "Real-time market saturation data",
              "Personalized recommendation engines"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 group">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:scale-125 transition-transform" />
                <span className="text-gray-300 font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <button className="px-8 py-4 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-blue-400 font-bold transition-all backdrop-blur-sm group flex items-center gap-2">
            Explore Full Tree
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Right Side: Visual Map Representation */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 aspect-[1.4/1] flex flex-col shadow-2xl overflow-hidden">
            {/* Inner Grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <div className="relative z-10 mb-8">
              <h3 className="text-xl font-bold">Interactive Map</h3>
              <p className="text-gray-300 text-sm">Discover paths and intersections</p>
            </div>

            {/* Tree Mockup Visualization */}
            <div className="relative flex-grow flex items-center">
              <svg className="w-full h-full" viewBox="0 0 500 300">
                {/* Connections */}
                <g className="stroke-blue-500/20 stroke-[1.5] fill-none">
                  {/* Root to Category */}
                  <path d="M50,150 C120,150 120,50 180,50" />
                  <path d="M50,150 C120,150 120,150 180,150" />
                  <path d="M50,150 C120,150 120,250 180,250" />
                  
                  {/* Category to Leaves */}
                  <path d="M190,50 C260,50 260,20 330,20" />
                  <path d="M190,50 C260,50 260,50 330,50" />
                  <path d="M190,50 C260,50 260,80 330,80" />
                  
                  <path d="M190,150 C260,150 260,130 330,130" />
                  <path d="M190,150 C260,150 260,170 330,170" />
                  
                  <path d="M190,250 C260,250 260,230 330,230" />
                  <path d="M190,250 C260,250 260,270 330,270" />
                </g>

                {/* Nodes & Labels */}
                <g className="text-xs font-medium fill-white">
                  {/* Root */}
                  <circle cx="50" cy="150" r="4" className="fill-blue-500 shadow-blue-500 shadow-lg" />
                  <text x="5" y="153" className="text-xs fill-gray-400">Your Future</text>

                  {/* Categories */}
                  <circle cx="185" cy="50" r="4" className="fill-blue-400" />
                  <text x="145" y="53" className="text-sm fill-gray-300">Technology</text>
                  
                  <circle cx="185" cy="150" r="4" className="fill-blue-400" />
                  <text x="145" y="153" className="text-sm fill-gray-300">Creative Arts</text>
                  
                  <circle cx="185" cy="250" r="4" className="fill-blue-400" />
                  <text x="155" y="253" className="text-sm fill-gray-300">Business</text>

                  {/* Leaves */}
                  <g className="fill-gray-400">
                    <circle cx="335" cy="20" r="2.5" className="fill-blue-300" />
                    <text x="345" y="23">Frontend Engineer</text>
                    
                    <circle cx="335" cy="50" r="2.5" className="fill-blue-300" />
                    <text x="345" y="53">AI Researcher</text>
                    
                    <circle cx="335" cy="80" r="2.5" className="fill-blue-300" />
                    <text x="345" y="83">Cybersecurity</text>
                    
                    <circle cx="335" cy="130" r="2.5" className="fill-blue-300" />
                    <text x="345" y="133">UI/UX Design</text>
                    
                    <circle cx="335" cy="170" r="2.5" className="fill-blue-300" />
                    <text x="345" y="173">Digital Artist</text>
                    
                    <circle cx="335" cy="230" r="2.5" className="fill-blue-300" />
                    <text x="345" y="233">Product Manager</text>
                    
                    <circle cx="335" cy="270" r="2.5" className="fill-blue-300" />
                    <text x="345" y="273">Entrepreneur</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTree;
