import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type Tab = 'apprenticeships' | 'scholarships' | 'certifications' | 'exams' | 'admissions' | 'jobs' | 'companies' | 'employees';

interface Opportunity {
  id: string; title: string; provider: string; type: string;
  deadline?: string; amount?: string; duration?: string;
  eligibility: string; description: string; tags: string[];
  url?: string;
}

const APPRENTICESHIPS: Opportunity[] = [
  { id: 'a1', title: 'Google AI Residency', provider: 'Google', type: 'Research', duration: '12 Months', eligibility: 'B.Tech/M.Tech CS with ML experience', description: 'Full-time AI research with Google Brain team.', tags: ['AI', 'Research', 'Stipend'] },
  { id: 'a2', title: 'Tata Advanced Systems Apprentice', provider: 'Tata', type: 'Engineering', duration: '18 Months', eligibility: 'Diploma/B.Tech Mechanical/Electrical', description: 'Hands-on training in defense and aerospace systems.', tags: ['Defense', 'Mechanical', 'Paid'] },
  { id: 'a3', title: 'NAPS Digital Marketing Trainee', provider: 'NAPS', type: 'Digital', duration: '6 Months', eligibility: 'Class 12 passed', description: 'National apprenticeship in digital marketing fundamentals.', tags: ['Marketing', 'Government', 'NAPS'] },
];

const SCHOLARSHIPS: Opportunity[] = [
  { id: 's1', title: 'INSPIRE Scholarship', provider: 'DST India', type: 'Merit', amount: '₹80,000/year', eligibility: 'Top 1% in Class 12 Board Exams', description: 'Innovation in Science Pursuit for Inspired Research.', tags: ['Science', 'National', 'Merit'] },
  { id: 's2', title: 'Pratibha Kiran Scholarship', provider: 'MP Govt', type: 'Need-based', amount: '₹40,000/year', eligibility: 'Female UG students from BPL families', description: 'Support talented women from economically weaker sections.', tags: ['Women', 'State', 'Need-based'] },
  { id: 's3', title: 'AICTE PG Scholarship', provider: 'AICTE', type: 'Merit', amount: '₹12,400/month', eligibility: 'GATE qualified M.Tech students', description: 'Monthly stipend for postgraduate technical education.', tags: ['PG', 'GATE', 'Technical'] },
];

const CERTIFICATIONS: Opportunity[] = [
  { id: 'c1', title: 'AWS Solutions Architect', provider: 'Amazon', type: 'Cloud', duration: '3-6 Months prep', eligibility: 'Basic cloud knowledge', description: 'Industry-leading cloud architecture certification.', tags: ['Cloud', 'AWS', 'Professional'] },
  { id: 'c2', title: 'Google Data Analytics', provider: 'Google', type: 'Data', duration: '6 Months', eligibility: 'No prerequisites', description: 'Professional certificate in data analytics fundamentals.', tags: ['Data', 'Beginner', 'Google'] },
  { id: 'c3', title: 'PMP Certification', provider: 'PMI', type: 'Management', duration: '2-3 Months prep', eligibility: '36 months project experience', description: 'Project Management Professional — global gold standard.', tags: ['PM', 'Leadership', 'Global'] },
];

const EXAMS: Opportunity[] = [
  { id: 'e1', title: 'JEE Main 2025', provider: 'NTA', type: 'Engineering', deadline: 'Jan & Apr 2025', eligibility: 'Class 12 with PCM', description: 'National entrance for IITs, NITs, and central institutions.', tags: ['Engineering', 'National', 'UG'] },
  { id: 'e2', title: 'NEET UG 2025', provider: 'NTA', type: 'Medical', deadline: 'May 2025', eligibility: 'Class 12 with PCB', description: 'National entrance for MBBS, BDS, and medical colleges.', tags: ['Medical', 'National', 'UG'] },
  { id: 'e3', title: 'GATE 2025', provider: 'IISc/IITs', type: 'PG Engineering', deadline: 'Feb 2025', eligibility: 'B.Tech / B.E. final year or graduated', description: 'Gateway to M.Tech in IITs and PSU recruitment.', tags: ['PG', 'Engineering', 'PSU'] },
];

const ADMISSIONS: Opportunity[] = [
  { id: 'ad1', title: 'IIT Bombay B.Tech', provider: 'IIT Bombay', type: 'UG', deadline: 'Jun 2025 (via JoSAA)', eligibility: 'JEE Advanced qualified', description: 'Premier engineering institution — CS, EE, Mechanical, and more.', tags: ['IIT', 'Engineering', 'Premium'] },
  { id: 'ad2', title: 'AIIMS Delhi MBBS', provider: 'AIIMS', type: 'UG', deadline: 'Jul 2025 (via NEET)', eligibility: 'NEET UG qualified', description: "India's top medical institution — fully funded education.", tags: ['Medical', 'National', 'Funded'] },
  { id: 'ad3', title: 'IIM Ahmedabad MBA', provider: 'IIM-A', type: 'PG', deadline: 'Jan 2025 (via CAT)', eligibility: "Bachelor's degree + CAT score", description: 'Flagship MBA program with global recognition.', tags: ['MBA', 'Management', 'Premium'] },
];

const ALL_DATA: Record<Tab, { data: Opportunity[]; color: string; label: string }> = {
  apprenticeships: { data: APPRENTICESHIPS, color: 'blue', label: 'Apprenticeships' },
  scholarships: { data: SCHOLARSHIPS, color: 'emerald', label: 'Scholarships' },
  certifications: { data: CERTIFICATIONS, color: 'cyan', label: 'Certifications' },
  exams: { data: EXAMS, color: 'orange', label: 'Competitive Exams' },
  admissions: { data: ADMISSIONS, color: 'purple', label: 'Admissions' },
  jobs: { data: [], color: 'pink', label: 'Real-Time Jobs' },
  companies: { data: [], color: 'yellow', label: 'Companies' },
  employees: { data: [], color: 'green', label: 'Professionals' },
};

const OpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const onNavigate = (page: string) => navigate(page === 'explorer' ? '/career-explorer' : page === 'ai-recs' ? '/recommendations' : `/${page}`);
  const [activeTab, setActiveTab] = useState<Tab>('apprenticeships');
  const [search, setSearch] = useState('');
  
  const [realTimeJobs, setRealTimeJobs] = useState<Opportunity[]>([]);
  const [realTimeCompanies, setRealTimeCompanies] = useState<Opportunity[]>([]);
  const [realTimeEmployees, setRealTimeEmployees] = useState<Opportunity[]>([]);
  const [loadingRealTime, setLoadingRealTime] = useState(false);

  const current = activeTab === 'jobs'
    ? { data: realTimeJobs, color: 'pink', label: 'Real-Time Jobs' }
    : activeTab === 'companies'
    ? { data: realTimeCompanies, color: 'yellow', label: 'Companies' }
    : activeTab === 'employees'
    ? { data: realTimeEmployees, color: 'green', label: 'Professionals' }
    : ALL_DATA[activeTab];

  // Fetch real-time tabs
  React.useEffect(() => {
    if (activeTab === 'jobs' || activeTab === 'companies' || activeTab === 'employees') {
      const fetchData = async () => {
        setLoadingRealTime(true);
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const queryParam = encodeURIComponent(search || (activeTab === 'jobs' ? 'software' : activeTab === 'companies' ? 'tech' : 'engineer'));
          
          if (activeTab === 'jobs') {
              const res = await fetch(`${API_URL}/api/jobs?limit=21&q=${queryParam}`);
              if (res.ok) {
                const data = await res.json();
                const fetched = (data.data || []).map((job: any) => ({
                  id: `job-${job.id}`,
                  title: job.job_title || 'Unknown Role',
                  provider: job.company || 'Unknown Company',
                  type: job.remote ? 'Remote' : (job.hybrid ? 'Hybrid' : 'On-site'),
                  deadline: job.date_posted,
                  amount: job.salary_string || (job.min_annual_salary_usd ? `$${job.min_annual_salary_usd}` : undefined),
                  duration: job.employment_statuses?.[0] || 'Full-time',
                  eligibility: job.seniority || 'Any',
                  description: job.description ? job.description.substring(0, 150) + '...' : 'No Description',
                  tags: [...(job.keyword_slugs || []).slice(0, 2), job.country].filter(Boolean),
                  url: job.url
                }));
                setRealTimeJobs(fetched);
              }
          } else if (activeTab === 'companies') {
              const res = await fetch(`${API_URL}/api/companies/search?limit=21&q=${queryParam}`);
              if (res.ok) {
                const data = await res.json();
                const fetched = (data.data || []).map((comp: any) => ({
                  id: `comp-${comp.id}`,
                  title: comp.name || 'Unknown Company',
                  provider: comp.industry || 'Various',
                  type: comp.type || 'Company',
                  eligibility: comp.size || 'Any size',
                  description: comp.description ? comp.description.substring(0, 150) + '...' : 'No Description',
                  tags: [comp.country, comp.founded_year].filter(Boolean).map(String),
                  url: comp.website
                }));
                setRealTimeCompanies(fetched);
              }
          } else if (activeTab === 'employees') {
              const res = await fetch(`${API_URL}/api/employees/search?limit=21&q=${queryParam}`);
              if (res.ok) {
                const data = await res.json();
                const fetched = (data.data || []).map((emp: any) => ({
                  id: `emp-${emp.id}`,
                  title: emp.title || 'Professional',
                  provider: emp.company || 'Independent',
                  type: emp.seniority || 'Professional',
                  duration: emp.experience_years ? `${emp.experience_years} years` : 'N/A',
                  eligibility: emp.location || 'Global',
                  description: emp.summary ? emp.summary.substring(0, 150) + '...' : 'No summary provided',
                  tags: [...(emp.skills || [])].slice(0, 3).filter(Boolean),
                  url: emp.linkedin_url
                }));
                setRealTimeEmployees(fetched);
              }
          }
        } catch (err) {
          console.error(`Failed to fetch ${activeTab}`, err);
        } finally {
          setLoadingRealTime(false);
        }
      };

      const timeoutId = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [search, activeTab]);

  const filtered = useMemo(() =>
    current.data.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.provider.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    ), [search, activeTab, current.data]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 md:pb-32 lg:pb-40 animate-in fade-in duration-700 font-sans">
      {/* HERO */}
      <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6 border-b border-white/10">
        <div className="absolute inset-0 z-0"><div className="absolute top-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px] bg-blue-600/5 blur-[180px] rounded-full" /></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">OPPORTUNITY COMMAND CENTER</div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6 md:mb-8 lg:mb-10">
            Your <br/><span className="gradient-text">Opportunities.</span>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg font-medium leading-relaxed mb-6 md:mb-10 lg:mb-12">
            Apprenticeships, scholarships, certifications, exams, and admissions — everything you need to advance, in one place.
          </p>

          {/* TABS */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 md:mb-10 lg:mb-12">
            {(Object.keys(ALL_DATA) as Tab[]).map(key => (
              <button key={key} onClick={() => { setActiveTab(key); setSearch(''); }}
                className={`px-6 py-3 rounded-2xl font-black uppercase tracking-[0.12em] text-xs transition-all border ${
                  activeTab === key ? 'bg-blue-600 border-blue-400 text-white shadow-xl' : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                }`}
              >{ALL_DATA[key].label}<span className="ml-2 text-xs opacity-60">
                 {key === 'jobs' 
                   ? (loadingRealTime && activeTab === key ? '...' : realTimeJobs.length) 
                   : key === 'companies'
                   ? (loadingRealTime && activeTab === key ? '...' : realTimeCompanies.length)
                   : key === 'employees'
                   ? (loadingRealTime && activeTab === key ? '...' : realTimeEmployees.length)
                   : ALL_DATA[key].data.length}
               </span></button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="max-w-3xl mx-auto">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${current.label.toLowerCase()}...`}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-10 px-4 md:py-20 md:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl font-black uppercase tracking-tight">{current.label} <span className="text-blue-500">Hub.</span></h2>
          <p className="text-xs font-black text-gray-300 uppercase tracking-widest">{filtered.length} Results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:p-8 lg:p-10">
          {filtered.map(item => (
            <div key={item.id} className="group flex flex-col bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 p-5 md:p-8 lg:p-10">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">{item.provider} • {item.type}</span>
                  {item.deadline && <span className="px-3 py-1 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full text-sm font-black uppercase">{item.deadline}</span>}
                </div>
                <h3 className="text-xl font-black uppercase text-white leading-tight group-hover:text-blue-400 transition-colors tracking-tighter">{item.title}</h3>
              </div>
              <p className="text-gray-200 text-sm font-medium leading-relaxed mb-6">{item.description}</p>

              <div className="space-y-4 mt-auto">
                {(item.amount || item.duration) && (
                  <div className="grid grid-cols-2 gap-4">
                    {item.amount && <div><p className="text-sm font-black text-gray-400 uppercase mb-1">Amount</p><p className="text-xs font-black text-emerald-400">{item.amount}</p></div>}
                    {item.duration && <div><p className="text-sm font-black text-gray-400 uppercase mb-1">Duration</p><p className="text-xs font-black text-white">{item.duration}</p></div>}
                  </div>
                )}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm font-black text-gray-400 uppercase mb-2">Eligibility</p>
                  <p className="text-xs font-black text-gray-200 uppercase">{item.eligibility}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map(t => <span key={t} className="px-3 py-1 bg-white/5 rounded-lg text-sm font-black text-gray-300 uppercase tracking-widest leading-none truncate">#{t}</span>)}
                </div>
                {item.url && (
                  <div className="pt-4">
                    <a href={item.url} target="_blank" rel="noreferrer" className="inline-block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-black uppercase tracking-widest transition-colors">Apply Now</a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OpportunitiesPage;
