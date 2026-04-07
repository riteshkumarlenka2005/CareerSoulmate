import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const AssessmentsPage: React.FC = () => {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: '', type: 'interest', description: '', estimated_time_minutes: 15, is_active: true });

  const fetchAssessments = async () => {
    try { const res = await ApiClient.get('/api/admin/assessments'); setAssessments(res.data?.assessments || []); } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchAssessments(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) { await ApiClient.put(`/api/admin/assessments/${editing._id}`, form); }
      else { await ApiClient.post('/api/admin/assessments', form); }
      setShowForm(false); setEditing(null); setForm({ title: '', type: 'interest', description: '', estimated_time_minutes: 15, is_active: true });
      fetchAssessments();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this assessment?')) return;
    try { await ApiClient.delete(`/api/admin/assessments/${id}`); fetchAssessments(); } catch {}
  };

  const startEdit = (a: any) => {
    setEditing(a); setForm({ title: a.title, type: a.type, description: a.description || '', estimated_time_minutes: a.estimated_time_minutes || 15, is_active: a.is_active }); setShowForm(true);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Assessments</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ title: '', type: 'interest', description: '', estimated_time_minutes: 15, is_active: true }); }}
          className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg">+ New Assessment</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Title" required className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none">
              {['interest', 'aptitude', 'personality', 'skills', 'preference', 'background'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description" rows={3} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-6 py-2 bg-white/5 text-gray-400 text-xs font-bold uppercase rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {assessments.map((a: any) => (
          <div key={a._id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-white font-semibold text-sm">{a.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${a.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{a.is_active ? 'Active' : 'Inactive'}</span>
              </div>
              <p className="text-gray-500 text-xs">Type: {a.type} • {a.total_questions || 0} questions • ~{a.estimated_time_minutes || 0} min</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(a)} className="text-blue-400/50 hover:text-blue-400 text-xs px-2 py-1">Edit</button>
              <button onClick={() => handleDelete(a._id)} className="text-red-400/50 hover:text-red-400 text-xs px-2 py-1">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentsPage;
