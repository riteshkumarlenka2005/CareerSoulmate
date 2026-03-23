
import React, { useState } from 'react';

interface Career {
  id: string;
  name: string;
  industry: string;
  description: string;
  growth: 'Low' | 'Medium' | 'High';
  salaryRange: string;
  skillIntensity: 'Beginner' | 'Intermediate' | 'Specialist' | 'Expert';
  level: 'Entry' | 'Advanced';
  trending?: boolean;
  emerging?: boolean;
}

const CAREERS: Career[] = [
  { id: '1', name: 'Neural Architect', industry: 'Emerging AI', description: 'Designs complex synthetic brain-inspired computing layers.', growth: 'High', salaryRange: '$140k - $220k', skillIntensity: 'Expert', level: 'Advanced', trending: true },
  { id: '2', name: 'Prompt Engineer', industry: 'Technology', description: 'Optimizing linguistic structures for large language model output.', growth: 'High', salaryRange: '$80k - $150k', skillIntensity: 'Intermediate', level: 'Entry', emerging: true },
  { id: '3', name: 'Bio-Digital Ethics Officer', industry: 'Healthcare', description: 'Regulates the intersection of genetic engineering and digital sovereignty.', growth: 'Medium', salaryRange: '$110k - $180k', skillIntensity: 'Specialist', level: 'Advanced' },
  { id: '4', name: 'Virtual Workspace Designer', industry: 'Creative', description: 'Architects spatial experiences for remote corporate meta-offices.', growth: 'High', salaryRange: '$90k - $160k', skillIntensity: 'Specialist', level: 'Entry', emerging: true },
  { id: '5', name: 'Sustainability Auditor', industry: 'Business', description: 'Evaluates corporate ecological impact against international standards.', growth: 'Medium', salaryRange: '$75k - $130k', skillIntensity: 'Intermediate', level: 'Entry' },
  { id: '6', name: 'Quantum Data Cryptographer', industry: 'Research', description: 'Securing information against quantum-level decryption attacks.', growth: 'High', salaryRange: '$130k - $210k', skillIntensity: 'Expert', level: 'Advanced', trending: true },
  { id: '7', name: 'Digital Identity Warden', industry: 'Government', description: 'Protects citizen identity integrity in decentralized governance systems.', growth: 'Medium', salaryRange: '$95k - $145k', skillIntensity: 'Specialist', level: 'Advanced' },
  { id: '8', name: 'Haptic UI Designer', industry: 'Creative', description: 'Designing tactile feedback systems for non-visual digital interfaces.', growth: 'High', salaryRange: '$100k - $170k', skillIntensity: 'Specialist', level: 'Entry', emerging: true },
];

const CATEGORIES = ["Technology", "Healthcare", "Business", "Creative", "Research", "Government", "Emerging AI"];

interface CareerExplorerProps {
  onNavigate: (page: 'home' | 'about' | 'explorer') => void;
}

const CareerExplorer: React.FC<CareerExplorerProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredCareers = CAREERS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.industry.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? c.industry === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* A. EXPLORER HERO SECTION */}
      <section className="relative py-10 px-4 md:py-20 md:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
            Market Discovery Engine
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
            Discover Your <span className="gradient-text">Next Chapter</span>
          </h1>
          
          <div className="max-w-full px-2 md:max-w-4xl md:px-0 mx-auto space-y-4">
            <div className="relative group">
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by career, skill, or interest..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-blue-500 transition-all backdrop-blur-md"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-300 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {["Remote", "Field Work", "Research", "Corporate", "Freelance"].map(filter => (
                <button key={filter} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all">
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* C. CAREER CATEGORIES / DOMAINS */}
      <section className="py-12 px-6 border-y border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-gray-200">Domains</h2>
            <div className="h-px flex-grow bg-white/10" />
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-200 hover:text-white'}`}
            >
              All Roles
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-200 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-4 gap-5 md:p-8 lg:p-12">
        {/* LEFT COLUMN: FILTERS & TRENDING */}
        <aside className="lg:col-span-1 space-y-12">
          {/* D. TRENDING & EMERGING CAREERS */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 border-l-2 border-blue-500 pl-4">Trending Now</h3>
            <div className="space-y-4">
              {CAREERS.filter(c => c.trending || c.emerging).map(c => (
                <div key={c.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-black px-2 py-0.5 rounded ${c.trending ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'} uppercase tracking-widest`}>
                      {c.trending ? 'Trending' : 'Emerging'}
                    </span>
                    <div className="w-10 h-4 bg-white/5 rounded relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500/20 translate-x-[-20%] skew-x-12 animate-pulse" />
                    </div>
                  </div>
                  <h4 className="text-xs font-black text-white group-hover:text-blue-400 transition-colors uppercase">{c.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* E. SKILL-BASED DISCOVERY */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-cyan-500 border-l-2 border-cyan-500 pl-4">Skill Discovery</h3>
            <p className="text-xs text-gray-300 font-bold uppercase tracking-widest leading-relaxed">Select your toolkit to see matching destinies.</p>
            <div className="flex flex-wrap gap-2">
              {["Python", "Logic", "Ethics", "3D Modeling", "Leadership", "Math", "Legal", "Writing"].map(skill => (
                <button 
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${selectedSkills.includes(skill) ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-300 hover:text-white'}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* B. CAREER CARDS GRID (MAIN AREA) */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6 md:mb-10 lg:mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Market <span className="text-blue-500">Inventory</span></h2>
            <div className="flex gap-4">
              <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Showing {filteredCareers.length} roles</span>
            </div>
          </div>

          {/* F. ENTRY-LEVEL vs ADVANCED SPLIT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCareers.map((career) => (
              <div key={career.id} className="group relative p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                <div className="absolute top-0 right-0 p-6">
                  <span className={`text-xs font-black uppercase tracking-widest ${career.level === 'Entry' ? 'text-green-500' : 'text-purple-500'}`}>
                    {career.level} Level
                  </span>
                </div>
                
                <div className="mb-6">
                  <p className="text-xs font-black text-blue-500/60 uppercase tracking-[0.2em] mb-2">{career.industry}</p>
                  <h3 className="text-2xl font-black text-white group-hover:text-white transition-colors uppercase tracking-tight leading-none mb-4">{career.name}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed font-medium min-h-[3rem]">
                    {career.description}
                  </p>
                </div>

                <div className="mt-auto space-y-4 pt-4 md:pt-6 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Avg Salary</p>
                      <p className="text-white text-xs font-black uppercase">{career.salaryRange}</p>
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Growth</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1,2,3].map(i => (
                            <div key={i} className={`w-1 h-3 rounded-full ${i <= (career.growth === 'High' ? 3 : career.growth === 'Medium' ? 2 : 1) ? 'bg-blue-500' : 'bg-white/10'}`} />
                          ))}
                        </div>
                        <span className="text-xs font-black text-blue-400 uppercase">{career.growth}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Intensity</p>
                      <p className="text-xs font-black uppercase text-gray-300">{career.skillIntensity}</p>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCareers.length === 0 && (
            <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl">
              <p className="text-gray-300 font-black uppercase tracking-widest">No matching destinies found. Try broadening your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerExplorer;
