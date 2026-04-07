import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../services/api';

interface Career {
  _id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  required_education: string;
  growth_outlook: string;
  difficulty_level: string;
  remote_friendly: boolean;
  beginner_friendly: boolean;
  salary_range?: { min: number; max: number; currency: string };
  work_style_tags: string[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const GROWTH_MAP: Record<string, { label: string; bars: number; color: string }> = {
  very_high: { label: 'Very High', bars: 4, color: 'text-green-400' },
  high: { label: 'High', bars: 3, color: 'text-blue-400' },
  medium: { label: 'Medium', bars: 2, color: 'text-cyan-400' },
  low: { label: 'Low', bars: 1, color: 'text-gray-400' },
};

const EDUCATION_MAP: Record<string, string> = {
  class10: 'Class 10', class12: 'Class 12', undergraduate: 'UG', postgraduate: 'PG', any: 'Any', none: 'N/A',
};

const CareerExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState<Career[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 12, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGrowth, setSelectedGrowth] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [sort, setSort] = useState('title');

  const searchTimerRef = useRef<any>(null);

  // Debounced search
  const debouncedSearch = useCallback((value: string) => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setSearch(value);
      setPagination(p => ({ ...p, page: 1 }));
    }, 400);
  }, []);

  // Load categories on mount
  useEffect(() => {
    ApiClient.get('/api/careers/categories')
      .then(res => setCategories(res.data?.categories || []))
      .catch(() => {});
  }, []);

  // Load careers when filters change
  useEffect(() => {
    loadCareers();
  }, [search, selectedCategory, selectedGrowth, selectedDifficulty, remoteOnly, beginnerOnly, sort, pagination.page]);

  const loadCareers = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      params.set('page', String(pagination.page));
      params.set('limit', '12');
      if (search) params.set('search', search);
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedGrowth) params.set('growth', selectedGrowth);
      if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
      if (remoteOnly) params.set('remote', 'true');
      if (beginnerOnly) params.set('beginner', 'true');
      if (sort) params.set('sort', sort);

      const res = await ApiClient.get(`/api/careers?${params.toString()}`);
      setCareers(res.data || []);
      if (res.pagination) {
        setPagination(res.pagination as Pagination);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCareer = async (careerId: string) => {
    try {
      setSaving(careerId);
      await ApiClient.post('/api/saved', { item_type: 'career', item_id: careerId });
    } catch {
      // silently ignore (might already be saved)
    } finally {
      setSaving(null);
    }
  };

  const formatSalary = (range?: Career['salary_range']) => {
    if (!range || (!range.min && !range.max)) return 'N/A';
    const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;
    return `${fmt(range.min)} - ${fmt(range.max)}`;
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-10 px-4 md:py-16 md:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
            Career Discovery Engine
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
            Discover Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Next Chapter</span>
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <input
                type="text"
                defaultValue=""
                onChange={e => debouncedSearch(e.target.value)}
                placeholder="Search by career, skill, or interest..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg focus:outline-none focus:border-blue-500 transition-all backdrop-blur-md"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 px-4 md:px-6 border-y border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => { setSelectedCategory(''); setPagination(p => ({ ...p, page: 1 })); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 hover:text-white'}`}>
              All Roles
            </button>
            {categories.map(cat => (
              <button key={cat} onClick={() => { setSelectedCategory(cat); setPagination(p => ({ ...p, page: 1 })); }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <button onClick={() => { setRemoteOnly(!remoteOnly); setPagination(p => ({ ...p, page: 1 })); }}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${remoteOnly ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
              Remote
            </button>
            <button onClick={() => { setBeginnerOnly(!beginnerOnly); setPagination(p => ({ ...p, page: 1 })); }}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${beginnerOnly ? 'bg-green-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
              Beginner Friendly
            </button>
            {['high', 'medium', 'low'].map(g => (
              <button key={g} onClick={() => { setSelectedGrowth(selectedGrowth === g ? '' : g); setPagination(p => ({ ...p, page: 1 })); }}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${selectedGrowth === g ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
                {g} Growth
              </button>
            ))}
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest bg-white/5 text-gray-300 border border-white/10 focus:outline-none">
              <option value="title">A-Z</option>
              <option value="salary">Salary ↓</option>
              <option value="growth">Growth ↓</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </section>

      {/* Career Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Career <span className="text-blue-500">Inventory</span></h2>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
            {pagination.total} roles found
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={loadCareers} className="text-xs font-black uppercase tracking-widest hover:text-red-300">Retry</button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-1/3 mb-4" />
                <div className="h-6 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-12 bg-white/5 rounded mb-6" />
                <div className="h-8 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : careers.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl">
            <p className="text-3xl mb-3">🔍</p>
            <p className="text-gray-400 font-black uppercase tracking-widest">No matching careers found</p>
            <p className="text-gray-500 text-xs mt-2">Try broadening your search or filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map(career => {
                const growth = GROWTH_MAP[career.growth_outlook] || GROWTH_MAP.medium;
                return (
                  <div key={career._id} className="group relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 flex flex-col">
                    {/* Top tags */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-blue-500/60 uppercase tracking-[0.2em]">{career.category}</span>
                      <div className="flex gap-1.5">
                        {career.remote_friendly && <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase rounded">Remote</span>}
                        {career.beginner_friendly && <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-black uppercase rounded">Beginner</span>}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight mb-2 group-hover:text-blue-400 transition-colors">{career.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6 flex-grow line-clamp-3">
                      {career.short_description || 'Explore this career path to learn about requirements, skills, and growth opportunities.'}
                    </p>

                    <div className="mt-auto space-y-4 pt-4 border-t border-white/10">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Salary</p>
                          <p className="text-xs font-black text-white">{formatSalary(career.salary_range)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Growth</p>
                          <div className="flex items-center gap-1">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-1 h-3 rounded-full ${i <= growth.bars ? 'bg-blue-500' : 'bg-white/10'}`} />
                              ))}
                            </div>
                            <span className={`text-[10px] font-black uppercase ${growth.color}`}>{growth.label}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Education</p>
                          <p className="text-xs font-black text-white">{EDUCATION_MAP[career.required_education] || career.required_education || 'Any'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => navigate(`/skill-gap?career=${career._id}`)}
                          className="flex-grow py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all text-gray-300 hover:text-white">
                          Skill Gap
                        </button>
                        <button onClick={() => handleSaveCareer(career._id)} disabled={saving === career._id}
                          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600/20 hover:border-blue-500/30 transition-all disabled:opacity-40">
                          <svg className="w-4 h-4 text-gray-400 hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button disabled={pagination.page <= 1} onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest disabled:opacity-30 hover:bg-white/10 transition-all">
                  Previous
                </button>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {pagination.page} / {pagination.totalPages}
                </span>
                <button disabled={pagination.page >= pagination.totalPages} onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest disabled:opacity-30 hover:bg-white/10 transition-all">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CareerExplorer;
