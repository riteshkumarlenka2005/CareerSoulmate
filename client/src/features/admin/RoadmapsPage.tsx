import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const RoadmapsPage: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ career: '', title: '', description: '', estimated_duration: '', is_active: true });
  const [careers, setCareers] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      ApiClient.get('/api/admin/roadmaps'),
      ApiClient.get('/api/admin/careers'),
    ]).then(([rRes, cRes]) => {
      setRoadmaps(rRes.data?.roadmaps || []);
      setCareers(cRes.data || []);
    }).finally(() => setLoading(false));
  }, []);

  const fetchRoadmaps = async () => { const res = await ApiClient.get('/api/admin/roadmaps'); setRoadmaps(res.data?.roadmaps || []); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) await ApiClient.put(`/api/admin/roadmaps/${editing._id}`, form);
      else await ApiClient.post('/api/admin/roadmaps', form);
      setShowForm(false); setEditing(null); fetchRoadmaps();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete roadmap and all its steps?')) return;
    await ApiClient.delete(`/api/admin/roadmaps/${id}`); fetchRoadmaps();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Roadmaps</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ career: '', title: '', description: '', estimated_duration: '', is_active: true }); }}
          className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">+ New Roadmap</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={form.career} onChange={e => setForm(p => ({ ...p, career: e.target.value }))} required className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none">
              <option value="">Select career</option>
              {careers.map((c: any) => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Roadmap Title" required className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          </div>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description" rows={2} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          <input value={form.estimated_duration} onChange={e => setForm(p => ({ ...p, estimated_duration: e.target.value }))} placeholder="Estimated duration (e.g. 6-9 months)" className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-white/5 text-gray-400 text-xs font-bold uppercase rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {roadmaps.map((r: any) => (
          <div key={r._id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 flex items-center justify-between hover:border-white/10 transition-all">
            <div>
              <h3 className="text-white font-semibold text-sm">{r.title}</h3>
              <p className="text-gray-500 text-xs mt-1">{r.career?.title || 'No career'} • {r.estimated_duration || 'N/A'} • {r.is_active ? '✅ Active' : '⏸️ Inactive'}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(r); setForm({ career: r.career?._id || r.career, title: r.title, description: r.description || '', estimated_duration: r.estimated_duration || '', is_active: r.is_active }); setShowForm(true); }} className="text-blue-400/50 hover:text-blue-400 text-xs">Edit</button>
              <button onClick={() => handleDelete(r._id)} className="text-red-400/50 hover:text-red-400 text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapsPage;
