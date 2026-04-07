import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const SkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', category: 'technical', description: '' });
  const [filterCat, setFilterCat] = useState('');

  const fetchSkills = async () => {
    try { const res = await ApiClient.get(`/api/admin/skills${filterCat ? `?category=${filterCat}` : ''}`); setSkills(res.data?.skills || []); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchSkills(); }, [filterCat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) await ApiClient.put(`/api/admin/skills/${editing._id}`, form);
      else await ApiClient.post('/api/admin/skills', form);
      setShowForm(false); setEditing(null); setForm({ name: '', category: 'technical', description: '' }); fetchSkills();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await ApiClient.delete(`/api/admin/skills/${id}`); fetchSkills();
  };

  const categories = ['technical', 'soft_skill', 'tool', 'domain'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Skills Library</h1>
        <div className="flex gap-2">
          <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setLoading(true); }} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: '', category: 'technical', description: '' }); }} className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">+ Add Skill</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Skill name" required className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description" className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-white/5 text-gray-400 text-xs font-bold uppercase rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((s: any) => (
            <div key={s._id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-all">
              <div className="min-w-0">
                <h3 className="text-white text-sm font-medium">{s.name}</h3>
                <p className="text-gray-500 text-xs">{s.category} {s.description ? `• ${s.description}` : ''}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => { setEditing(s); setForm({ name: s.name, category: s.category, description: s.description || '' }); setShowForm(true); }} className="text-blue-400/50 hover:text-blue-400 text-xs px-1">Edit</button>
                <button onClick={() => handleDelete(s._id)} className="text-red-400/50 hover:text-red-400 text-xs px-1">Del</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsPage;
