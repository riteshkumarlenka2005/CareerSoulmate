import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    ApiClient.get('/api/admin/settings').then(res => setSettings(res.data?.settings || [])).finally(() => setLoading(false));
  }, []);

  const handleSave = async (key: string, value: string, description: string, category: string) => {
    setSaving(true);
    try {
      await ApiClient.put('/api/admin/settings', { key, value, description, category });
      setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
      setEditKey('');
    } catch {} finally { setSaving(false); }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  // Group by category
  const grouped: Record<string, any[]> = {};
  for (const s of settings) {
    const cat = s.category || 'general';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-black text-white uppercase tracking-wider">System Settings</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
          <h3 className="text-red-400 text-xs uppercase tracking-wider font-black mb-4">{category}</h3>
          <div className="space-y-3">
            {items.map((s: any) => (
              <div key={s.key} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/[0.02]">
                <div className="min-w-0 flex-grow">
                  <p className="text-white text-sm font-medium">{s.key}</p>
                  <p className="text-gray-600 text-xs">{s.description}</p>
                </div>
                {editKey === s.key ? (
                  <div className="flex gap-2">
                    <input value={editValue} onChange={e => setEditValue(e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs outline-none w-48" />
                    <button onClick={() => handleSave(s.key, editValue, s.description, s.category)} disabled={saving} className="text-green-400 text-xs font-bold">Save</button>
                    <button onClick={() => setEditKey('')} className="text-gray-400 text-xs">Cancel</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-xs font-mono max-w-48 truncate">{s.value}</span>
                    <button onClick={() => { setEditKey(s.key); setEditValue(s.value); }} className="text-blue-400/50 hover:text-blue-400 text-xs">Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;
