
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { getCurrentLocation, calculateDistance, getCityCoordinates, formatDistance, Coordinates } from '../utils/geolocation';
import { useI18n } from '../context/I18nContext';

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: 'Government' | 'Aided' | 'Autonomous' | 'Private';
  programs: string[];
  levels: ('UG' | 'PG' | 'Diploma' | 'PhD')[];
  facilities: string[]; // List of keywords like 'Hostel', 'Wifi', 'Gym', etc.
  mediumOfInstruction: 'English' | 'Hindi' | 'Regional' | 'Bilingual';
  admissionMode: string;
  accreditation: string;
  nirfRank: string;
  overview: string;
  eligibility: string;
  cutOffs: string;
  examsAccepted: string[];
  scholarships: { name: string; criteria: string }[];
  campusLife: string;
  image: string;
  established: string;
  studentCount: string;
  campusSize: string;
  // Geolocation coords (approximate city center)
  coordinates?: Coordinates;
}

const COLLEGES_DB: College[] = [
  {
    id: 'iit_bombay',
    name: 'Indian Institute of Technology (IIT) Bombay',
    location: 'Powai, Mumbai',
    state: 'Maharashtra',
    type: 'Government',
    programs: ['Computer Science', 'Mechanical Engineering', 'Aerospace Engineering', 'Data Science'],
    levels: ['UG', 'PG', 'PhD'],
    facilities: ['Hostel', 'Labs', 'Gym', 'Library', 'Wifi', 'Sports'],
    mediumOfInstruction: 'English',
    admissionMode: 'JEE Advanced',
    accreditation: 'Institute of Eminence',
    nirfRank: '#1 (Engineering)',
    established: '1958',
    studentCount: '11,000+',
    campusSize: '550 Acres',
    overview: 'Established in 1958, IIT Bombay is a premier engineering and research institution globally recognized for excellence in technical education and innovation.',
    eligibility: 'Pass 10+2 with PCM + Top 0.01% AIR in JEE Advanced.',
    cutOffs: 'Top 60 AIR for Computer Science.',
    examsAccepted: ['JEE Advanced', 'GATE', 'UCEED', 'CEED'],
    scholarships: [
      { name: 'MCM Scholarship', criteria: 'Merit-cum-Means for UG students' },
      { name: 'Institute Free Messing', criteria: 'Income based for SC/ST' }
    ],
    campusLife: 'Vibrant cultural fests (Mood Indigo), high-tech innovation ecosystem, and diverse student clubs.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop',
    coordinates: { latitude: 19.1334, longitude: 72.9133 } // Powai, Mumbai
  },
  {
    id: 'miranda_house',
    name: 'Miranda House, Delhi University',
    location: 'North Campus, Delhi',
    state: 'Delhi',
    type: 'Government',
    programs: ['Psychology', 'English Literature', 'Political Science', 'Physics', 'Botany'],
    levels: ['UG', 'PG'],
    facilities: ['Hostel', 'Library', 'Wifi', 'Garden', 'Auditiorium'],
    mediumOfInstruction: 'English',
    admissionMode: 'CUET UG',
    accreditation: 'NAAC A++',
    nirfRank: '#1 (Colleges)',
    established: '1948',
    studentCount: '4,500+',
    campusSize: '15 Acres',
    overview: 'Founded in 1948, Miranda House is a constituent college for women at the University of Delhi, known for pioneering humanities and science research.',
    eligibility: 'Pass 10+2 with 50% minimum aggregate + Mandatory CUET Score.',
    cutOffs: '99+ Percentile in CUET for Humanities.',
    examsAccepted: ['CUET UG', 'CUET PG'],
    scholarships: [
      { name: 'Delhi Univ Merit Grant', criteria: 'Top performers in CUET' },
      { name: 'State Minority Grant', criteria: 'Minority students from NCR' }
    ],
    campusLife: 'Intellectually stimulating environment with a focus on leadership, social activism, and global humanities.',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=2000&auto=format&fit=crop',
    coordinates: { latitude: 28.6889, longitude: 77.2099 } // North Campus, Delhi
  },
  {
    id: 'bits_pilani',
    name: 'BITS Pilani',
    location: 'Pilani',
    state: 'Rajasthan',
    type: 'Autonomous',
    programs: ['Computer Science', 'Chemical Engineering', 'B.Pharm', 'M.Sc Physics'],
    levels: ['UG', 'PG', 'PhD'],
    facilities: ['Hostel', 'Labs', 'Sports', 'Wifi', 'Innovation Hub'],
    mediumOfInstruction: 'English',
    admissionMode: 'BITSAT',
    accreditation: 'Institute of Eminence',
    nirfRank: '#18 (University)',
    established: '1964',
    studentCount: '15,000+',
    campusSize: '328 Acres',
    overview: 'BITS Pilani is a world-renowned technical university with a focus on meritocracy, entrepreneurship, and flexible academic curricula.',
    eligibility: '75% aggregate in PCM in 10+2 + BITSAT Score.',
    cutOffs: '330+ for Computer Science.',
    examsAccepted: ['BITSAT', 'GATE'],
    scholarships: [
      { name: 'Merit-cum-Means', criteria: 'Up to 80% tuition waiver based on BITSAT rank' },
      { name: 'Board Toppers Scheme', criteria: '100% scholarship for state toppers' }
    ],
    campusLife: '0% attendance policy, highly entrepreneurial culture, and world-class alumni network.',
    image: 'https://images.unsplash.com/photo-1523050853064-8bf178220267?q=80&w=2070&auto=format&fit=crop',
    coordinates: { latitude: 28.3645, longitude: 75.5870 } // Pilani, Rajasthan
  }
];

const STATES = ['All States', 'Delhi', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Tamil Nadu'];
const TYPES = ['All Types', 'Government', 'Private', 'Aided', 'Autonomous'];
const FACILITY_OPTIONS = ['All Facilities', 'Hostel', 'Wifi', 'Gym', 'Labs', 'Library', 'Sports'];
const MEDIUMS = ['All Mediums', 'English', 'Hindi', 'Regional', 'Bilingual'];

const CollegesPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedFacility, setSelectedFacility] = useState('All Facilities');
  const [selectedMedium, setSelectedMedium] = useState('All Mediums');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [sortByDistance, setSortByDistance] = useState(false);

  const { t } = useI18n();

  // Handle "Find Near Me" button click
  const handleFindNearMe = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    const result = await getCurrentLocation();

    if (result.success && result.coordinates) {
      setUserLocation(result.coordinates);
      setSortByDistance(true);
    } else {
      setLocationError(result.error || 'Could not get location');
    }

    setIsLoadingLocation(false);
  };

  // Calculate distance for each college
  const collegesWithDistance = useMemo(() => {
    return COLLEGES_DB.map(college => {
      let distance: number | null = null;

      if (userLocation && college.coordinates) {
        distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          college.coordinates.latitude,
          college.coordinates.longitude
        );
      } else if (userLocation) {
        // Fallback: try to get coords from city name
        const cityCoords = getCityCoordinates(college.location);
        if (cityCoords) {
          distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            cityCoords.latitude,
            cityCoords.longitude
          );
        }
      }

      return { ...college, distance };
    });
  }, [userLocation]);

  const filteredColleges = useMemo(() => {
    let filtered = collegesWithDistance.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.programs.some(p => p.toLowerCase().includes(search.toLowerCase()));
      const matchesState = selectedState === 'All States' ? true : c.state === selectedState;
      const matchesType = selectedType === 'All Types' ? true : c.type === selectedType;
      const matchesFacility = selectedFacility === 'All Facilities' ? true : c.facilities.includes(selectedFacility);
      const matchesMedium = selectedMedium === 'All Mediums' ? true : c.mediumOfInstruction === selectedMedium;
      return matchesSearch && matchesState && matchesType && matchesFacility && matchesMedium;
    });

    // Sort by distance if enabled
    if (sortByDistance && userLocation) {
      filtered = [...filtered].sort((a, b) => {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });
    }

    return filtered;
  }, [collegesWithDistance, search, selectedState, selectedType, selectedFacility, selectedMedium, sortByDistance, userLocation]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const CustomSelect = ({ label, options, value, onChange, id }: { label: string, options: string[], value: string, onChange: (val: string) => void, id: string }) => {
    const isOpen = activeDropdown === id;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) setActiveDropdown(null);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative w-full" ref={ref}>
        <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">{label}</p>
        <button
          onClick={() => setActiveDropdown(isOpen ? null : id)}
          className={`w-full flex items-center justify-between bg-white/5 border ${isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all backdrop-blur-md`}
        >
          <span className={value.includes('All') ? 'text-gray-500' : 'text-blue-400'}>{value}</span>
          <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
        </button>
        {isOpen && (
          <div className="absolute top-[105%] left-0 right-0 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-[200] py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
            {options.map(opt => (
              <button key={opt} onClick={() => { onChange(opt); setActiveDropdown(null); }}
                className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${value === opt ? 'text-blue-500 bg-blue-500/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">

      {/* A. COLLEGE FINDER SEARCH & FILTERS */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
            INSTITUTION DISCOVERY LAB
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            Find Your <br /><span className="gradient-text">Campus.</span>
          </h1>

          <div className="max-w-6xl mx-auto bg-white/[0.03] border border-white/10 rounded-[48px] p-10 backdrop-blur-3xl shadow-2xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Search Keywords</p>
                <div className="relative group">
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="College name or programs..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3.5 text-lg focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
                  />
                </div>
              </div>
              <CustomSelect id="state" label="Location" options={STATES} value={selectedState} onChange={setSelectedState} />
              <CustomSelect id="type" label="Ownership" options={TYPES} value={selectedType} onChange={setSelectedType} />
              <CustomSelect id="medium" label="Instruction Medium" options={MEDIUMS} value={selectedMedium} onChange={setSelectedMedium} />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <CustomSelect id="facility" label="Key Facility" options={FACILITY_OPTIONS} value={selectedFacility} onChange={setSelectedFacility} />
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch gap-4">
                <button
                  onClick={handleFindNearMe}
                  disabled={isLoadingLocation}
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:opacity-50 text-white py-3.5 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
                >
                  {isLoadingLocation ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Locating...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{t('colleges.nearMe')}</span>
                    </>
                  )}
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white py-3.5 px-8 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                  Launch Advanced Map
                </button>
              </div>
            </div>

            {/* Location Status */}
            {locationError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                <p className="text-sm text-red-400">{locationError}</p>
              </div>
            )}
            {userLocation && (
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center flex items-center justify-center gap-3">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-emerald-400">Showing colleges sorted by distance from your location</p>
                <button
                  onClick={() => { setUserLocation(null); setSortByDistance(false); }}
                  className="text-xs text-gray-400 hover:text-white underline"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* B. COLLEGE CARDS LISTING */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight">Verified <span className="text-blue-500">Institutions.</span></h2>
          <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em]">{filteredColleges.length} Elite Matches</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredColleges.map(college => (
            <div key={college.id} onClick={() => setSelectedCollege(college)}
              className="group relative flex flex-col h-full bg-[#0a0a0a] border border-white/5 rounded-[56px] overflow-hidden hover:border-blue-500/40 transition-all duration-500 cursor-pointer shadow-xl"
            >
              <div className="h-64 relative overflow-hidden">
                <img src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
                <button onClick={(e) => toggleBookmark(college.id, e)}
                  className={`absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center border border-white/20 transition-all ${bookmarks.includes(college.id) ? 'bg-blue-600 border-blue-400' : 'bg-black/40 hover:bg-blue-600'}`}
                >
                  <svg className={`w-5 h-5 ${bookmarks.includes(college.id) ? 'fill-white' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                </button>
              </div>

              <div className="p-12 flex-grow flex flex-col">
                <div className="mb-6 space-y-1">
                  <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em]">{college.type} • NIRF {college.nirfRank.split(' ')[0]}</p>
                  <h3 className="text-2xl font-black uppercase text-white leading-tight group-hover:text-blue-400 transition-colors tracking-tighter">{college.name}</h3>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-2">
                    {college.location}
                    {college.distance !== null && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {formatDistance(college.distance)}
                      </span>
                    )}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-[8px] font-black text-gray-600 uppercase mb-2 tracking-widest">Key Programs</p>
                    <div className="flex flex-wrap gap-1.5">
                      {college.programs.slice(0, 3).map(p => <span key={p} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[8px] font-black text-gray-400 uppercase">{p}</span>)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Admission</p>
                      <p className="text-[10px] font-black text-white uppercase">{college.admissionMode}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-gray-600 uppercase mb-1">Facilities</p>
                      <div className="flex gap-2 opacity-60">
                        {college.facilities.slice(0, 3).map(f => <span key={f} title={f}>{f === 'Hostel' ? '🏠' : f === 'Wifi' ? '🌐' : '🔬'}</span>)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Matches Roadmap</span>
                  <button aria-label="View college details" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7-7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C. COLLEGE DETAIL VIEW (MODAL) */}
      {selectedCollege && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedCollege(null)} />

          <div className="relative w-full max-w-7xl h-full max-h-[92vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-2xl">

            {/* Left Col: Campus Visuals & Stats */}
            <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-blue-600/[0.02]">
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Institutional Dossier</div>
                  <h2 className="text-5xl font-black uppercase text-white leading-none tracking-tighter">{selectedCollege.name}</h2>
                  <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedCollege.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-black border border-white/5 text-center">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">NIRF Rank</p>
                    <p className="text-2xl font-black text-blue-500">{selectedCollege.nirfRank.split(' ')[0]}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-black border border-white/5 text-center">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Campus Size</p>
                    <p className="text-xl font-black text-white">{selectedCollege.campusSize}</p>
                  </div>
                </div>

                <section className="space-y-6">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Core Overview</h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed italic">"{selectedCollege.overview}"</p>
                </section>

                <section className="space-y-6">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollege.facilities.map(f => <span key={f} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase text-gray-400">{f}</span>)}
                  </div>
                </section>
              </div>
            </div>

            {/* Right Col: Academic & Financial Deep-Dive */}
            <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40">
              <div className="flex justify-end mb-10">
                <button onClick={() => setSelectedCollege(null)} aria-label="Close college details" className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10">
                  <svg className="w-7 h-7 text-gray-500 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="space-y-24">
                <section className="space-y-12">
                  <div className="flex items-center gap-6">
                    <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">Programs & Cut-offs</h4>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Available Streams</p>
                      <div className="flex flex-wrap gap-3">
                        {selectedCollege.programs.map(p => <span key={p} className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-xs font-black uppercase text-white tracking-widest">{p}</span>)}
                      </div>
                    </div>
                    <div className="p-8 rounded-[40px] bg-blue-600/5 border border-blue-500/20">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Historical Thresholds</p>
                      <p className="text-2xl font-black text-white mb-2">{selectedCollege.cutOffs}</p>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Via {selectedCollege.admissionMode}</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-12">
                  <div className="flex items-center gap-6">
                    <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] whitespace-nowrap">Financial Support</h4>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    {selectedCollege.scholarships.map((s, i) => (
                      <div key={i} className="p-8 rounded-[32px] bg-emerald-900/10 border border-emerald-500/20 hover:border-emerald-500 transition-all group">
                        <h4 className="text-sm font-black uppercase text-emerald-400 mb-2">{s.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{s.criteria}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-12 p-16 rounded-[64px] bg-gradient-to-br from-indigo-900/15 via-[#080808] to-[#080808] border border-indigo-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-16 opacity-[0.05]">
                    <svg width="250" height="250" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 leading-none">Campus <span className="text-indigo-500">Life</span></h3>
                    <p className="text-gray-300 text-xl font-medium leading-relaxed tracking-tight max-w-2xl">
                      {selectedCollege.campusLife}
                    </p>
                  </div>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                  <button className="py-7 bg-blue-600 hover:bg-blue-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-[0_30px_70px_rgba(37,99,235,0.3)] transition-all active:scale-95">
                    Initiate Application Pipeline
                  </button>
                  <button className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                    Download Academic Calendar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* D. SAVE & COMPARE FLOATING BAR */}
      {bookmarks.length > 0 && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[250] animate-in slide-in-from-bottom-6 duration-500">
          <div className="bg-blue-600/95 backdrop-blur-2xl px-12 py-6 rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex items-center gap-16 border border-blue-400/30">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {bookmarks.slice(0, 3).map(id => (
                  <div key={id} className="w-14 h-14 rounded-full border-4 border-blue-600 bg-[#050505] overflow-hidden shadow-2xl relative">
                    <img src={COLLEGES_DB.find(c => c.id === id)?.image} alt="College thumbnail" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-blue-600/10" />
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                <span className="text-[12px] font-black uppercase tracking-widest text-white leading-none block">{bookmarks.length} Shortlisted</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-200 opacity-60">Ready for Alignment Analysis</span>
              </div>
            </div>
            <button onClick={() => onNavigate('comparison')}
              className="bg-white text-blue-600 px-10 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-50 transition-all active:scale-95 shadow-xl"
            >
              Sync Comparison Matrix
            </button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        input::placeholder { color: #2d3748; }
      `}</style>
    </div>
  );
};

export default CollegesPage;
