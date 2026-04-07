import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const FAQsPage: React.FC = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ question: '', answer: '', category: 'general', order: 1, is_active: true });

  const fetchFAQs = async () => { try { const res = await ApiClient.get('/api/faqs'); setFaqs(res.data?.faqs || []); } catch {} finally { setLoading(false); } };
  useEffect(() => { fetchFAQs(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) await ApiClient.put(`/api/faqs/${editing._id}`, form);
      else await ApiClient.post('/api/faqs', form);
      setShowForm(false); setEditing(null); setForm({ question: '', answer: '', category: 'general', order: 1, is_active: true }); fetchFAQs();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await ApiClient.delete(`/api/faqs/${id}`); fetchFAQs();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">FAQs</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">+ Add FAQ</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-4">
          <input value={form.question} onChange={e => setForm(p => ({ ...p, question: e.target.value }))} placeholder="Question" required className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          <textarea value={form.answer} onChange={e => setForm(p => ({ ...p, answer: e.target.value }))} placeholder="Answer" required rows={3} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
          <div className="grid grid-cols-3 gap-4">
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none">
              {['general', 'assessments', 'recommendations', 'features', 'account'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} placeholder="Order" className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none" />
            <label className="flex items-center gap-2 text-gray-400 text-xs"><input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} className="accent-red-500" /> Active</label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-white/5 text-gray-400 text-xs font-bold uppercase rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {faqs.map((f: any) => (
          <div key={f._id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">{f.category}</span>
                  {!f.is_active && <span className="text-[10px] text-gray-500">• Inactive</span>}
                </div>
                <h3 className="text-white text-sm font-semibold">{f.question}</h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => { setEditing(f); setForm({ question: f.question, answer: f.answer, category: f.category, order: f.order || 1, is_active: f.is_active }); setShowForm(true); }} className="text-blue-400/50 hover:text-blue-400 text-xs">Edit</button>
                <button onClick={() => handleDelete(f._id)} className="text-red-400/50 hover:text-red-400 text-xs">Del</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;
