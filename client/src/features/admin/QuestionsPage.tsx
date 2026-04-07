import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const QuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAssessment, setFilterAssessment] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ assessment: '', question_text: '', question_type: 'scale', category: '', weight: 1, options: '[]' });

  useEffect(() => {
    Promise.all([
      ApiClient.get('/api/admin/assessments'),
      ApiClient.get(`/api/admin/assessments/questions${filterAssessment ? `?assessmentId=${filterAssessment}` : ''}`),
    ]).then(([aRes, qRes]) => {
      setAssessments(aRes.data?.assessments || []);
      setQuestions(qRes.data?.questions || []);
    }).finally(() => setLoading(false));
  }, [filterAssessment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...form, options: JSON.parse(form.options || '[]') };
      if (editing) await ApiClient.put(`/api/admin/assessments/questions/${editing._id}`, data);
      else await ApiClient.post('/api/admin/assessments/questions', data);
      setShowForm(false); setEditing(null);
      const res = await ApiClient.get(`/api/admin/assessments/questions${filterAssessment ? `?assessmentId=${filterAssessment}` : ''}`);
      setQuestions(res.data?.questions || []);
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    await ApiClient.delete(`/api/admin/assessments/questions/${id}`);
    setQuestions(prev => prev.filter(q => q._id !== id));
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Questions</h1>
        <div className="flex gap-2">
          <select value={filterAssessment} onChange={e => { setFilterAssessment(e.target.value); setLoading(true); }}
            className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-xs outline-none">
            <option value="">All assessments</option>
            {assessments.map((a: any) => <option key={a._id} value={a._id}>{a.title}</option>)}
          </select>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm({ assessment: assessments[0]?._id || '', question_text: '', question_type: 'scale', category: '', weight: 1, options: JSON.stringify([{label:'Strongly Disagree',value:'1',score:1},{label:'Disagree',value:'2',score:2},{label:'Neutral',value:'3',score:3},{label:'Agree',value:'4',score:4},{label:'Strongly Agree',value:'5',score:5}]) }); }}
            className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">+ Add</button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={form.assessment} onChange={e => setForm(p => ({ ...p, assessment: e.target.value }))} required className="bg-[#111] border border-white/10 rounded-lg px-3 py-3 text-white text-sm outline-none">
              <option value="">Select assessment</option>
              {assessments.map((a: any) => <option key={a._id} value={a._id}>{a.title}</option>)}
            </select>
            <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="Category" className="bg-[#111] border border-white/10 rounded-lg px-3 py-3 text-white text-sm outline-none" />
            <select value={form.question_type} onChange={e => setForm(p => ({ ...p, question_type: e.target.value }))} className="bg-[#111] border border-white/10 rounded-lg px-3 py-3 text-white text-sm outline-none">
              {['scale', 'single_choice', 'multiple_choice', 'text'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <textarea value={form.question_text} onChange={e => setForm(p => ({ ...p, question_text: e.target.value }))} placeholder="Question text" required rows={2} className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-3 text-white text-sm outline-none" />
          <textarea value={form.options} onChange={e => setForm(p => ({ ...p, options: e.target.value }))} placeholder="Options JSON array" rows={3} className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-3 text-white text-xs font-mono outline-none" />
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 bg-white/5 text-gray-400 text-xs font-bold uppercase rounded-lg">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {questions.length === 0 ? <p className="text-gray-500 text-sm text-center py-10">No questions found</p> :
          questions.map((q: any) => (
            <div key={q._id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-white text-sm">{q.question_text}</p>
                <p className="text-gray-500 text-xs mt-1">{q.assessment?.title || ''} • {q.category} • {q.question_type}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setEditing(q); setForm({ assessment: q.assessment?._id || q.assessment, question_text: q.question_text, question_type: q.question_type, category: q.category || '', weight: q.weight || 1, options: JSON.stringify(q.options || []) }); setShowForm(true); }} className="text-blue-400/50 hover:text-blue-400 text-xs">Edit</button>
                <button onClick={() => handleDelete(q._id)} className="text-red-400/50 hover:text-red-400 text-xs">Del</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
