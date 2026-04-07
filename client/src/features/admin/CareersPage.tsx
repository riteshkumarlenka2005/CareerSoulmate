import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const CareersPage: React.FC = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: '', category: '', short_description: '', full_description: '', required_education: 'any', difficulty_level: 'intermediate', growth_outlook: 'medium', remote_friendly: false, beginner_friendly: false, published: true });

  const fetchCareers = async () => {
    try { const res = await ApiClient.get('/api/admin/careers'); setCareers(res.data || []); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchCareers(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) await ApiClient.put(`/api/admin/careers/${editing._id}`, form);
      else await ApiClient.post('/api/admin/careers', form);
      setShowForm(false); setEditing(null); fetchCareers();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this career?')) return;
    try { await ApiClient.delete(`/api/admin/careers/${id}`); fetchCareers(); } catch {}
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Careers</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: '', category: '', short_description: '', full_description: '', required_education: 'any', difficulty_level: 'intermediate', growth_outlook: 'medium', remote_friendly: false, beginner_friendly: false, published: true }); }}
          className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg">+ New Career</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Career Title" required className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
            <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="Category (e.g. Technology)" className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          </div>
          <input value={form.short_description} onChange={e => setForm(p => ({ ...p, short_description: e.target.value }))} placeholder="Short description" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          <textarea value={form.full_description} onChange={e => setForm(p => ({ ...p, full_description: e.target.value }))} placeholder="Full description" rows={3} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <select value={form.difficulty_level} onChange={e => setForm(p => ({ ...p, difficulty_level: e.target.value }))} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none">
              {['beginner', 'intermediate', 'advanced'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
            <select value={form.growth_outlook} onChange={e => setForm(p => ({ ...p, growth_outlook: e.target.value }))} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none">
              {['low', 'medium', 'high', 'very_high'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
            <label className="flex items-center gap-2 text-gray-400 text-xs"><input type="checkbox" checked={form.remote_friendly} onChange={e => setForm(p => ({ ...p, remote_friendly: e.target.checked }))} className="accent-red-500" /> Remote Friendly</label>
            <label className="flex items-center gap-2 text-gray-400 text-xs"><input type="checkbox" checked={form.beginner_friendly} onChange={e => setForm(p => ({ ...p, beginner_friendly: e.target.checked }))} className="accent-red-500" /> Beginner Friendly</label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-white/5 text-gray-400 text-xs font-bold uppercase rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {careers.map((c: any) => (
          <div key={c._id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-white font-semibold text-sm">{c.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{c.category} • {c.difficulty_level} • {c.growth_outlook} growth</p>
                <p className="text-gray-600 text-xs mt-1 line-clamp-2">{c.short_description}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => { setEditing(c); setForm({ title: c.title, category: c.category || '', short_description: c.short_description || '', full_description: c.full_description || '', required_education: c.required_education || 'any', difficulty_level: c.difficulty_level || 'intermediate', growth_outlook: c.growth_outlook || 'medium', remote_friendly: c.remote_friendly || false, beginner_friendly: c.beginner_friendly || false, published: c.published !== false }); setShowForm(true); }} className="text-blue-400/50 hover:text-blue-400 text-xs px-1">Edit</button>
                <button onClick={() => handleDelete(c._id)} className="text-red-400/50 hover:text-red-400 text-xs px-1">Del</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareersPage;
