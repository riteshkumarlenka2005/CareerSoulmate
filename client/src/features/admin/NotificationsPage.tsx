import React, { useState } from 'react';
import ApiClient from '../../services/api';

const NotificationsPage: React.FC = () => {
  const [form, setForm] = useState({ title: '', message: '', type: 'admin', action_url: '' });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Send notification to ALL active users?')) return;
    setSending(true); setResult('');
    try {
      const res = await ApiClient.post('/api/admin/notifications/broadcast', form);
      setResult(res.message || 'Notification sent!');
      setForm({ title: '', message: '', type: 'admin', action_url: '' });
    } catch (err: any) { setResult(err.message || 'Failed to send'); }
    finally { setSending(false); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-black text-white uppercase tracking-wider">Broadcast Notifications</h1>
      <p className="text-gray-500 text-sm">Send a notification to all active users at once</p>

      <form onSubmit={handleBroadcast} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-4">
        <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Notification title" required className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
        <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Message body" required rows={4} className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
        <div className="grid grid-cols-2 gap-4">
          <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none">
            {['admin', 'system', 'recommendation', 'assessment'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <input value={form.action_url} onChange={e => setForm(p => ({ ...p, action_url: e.target.value }))} placeholder="Action URL (optional)" className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none" />
        </div>
        {result && <p className={`text-sm ${result.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>{result}</p>}
        <button type="submit" disabled={sending}
          className="w-full px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all">
          {sending ? 'Sending...' : '📢 Send to All Users'}
        </button>
      </form>
    </div>
  );
};

export default NotificationsPage;
