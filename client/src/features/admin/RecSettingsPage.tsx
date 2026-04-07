import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const RecSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState<Record<string, number>>({ interest: 0.35, skill: 0.25, education: 0.15, preference: 0.15, stage: 0.10 });
  const [recCount, setRecCount] = useState('15');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    ApiClient.get('/api/admin/settings').then(res => {
      const all = res.data?.settings || [];
      setSettings(all);
      const wSetting = all.find((s: any) => s.key === 'recommendation_weights');
      if (wSetting) try { setWeights(JSON.parse(wSetting.value)); } catch {}
      const cSetting = all.find((s: any) => s.key === 'recommendation_count');
      if (cSetting) setRecCount(cSetting.value);
    }).finally(() => setLoading(false));
  }, []);

  const saveWeights = async () => {
    setSaving(true); setMsg('');
    try {
      await ApiClient.put('/api/admin/settings', { key: 'recommendation_weights', value: JSON.stringify(weights), category: 'recommendations', description: 'Scoring weights for recommendation algorithm' });
      await ApiClient.put('/api/admin/settings', { key: 'recommendation_count', value: recCount, category: 'recommendations', description: 'Number of recommendations per batch' });
      setMsg('Settings saved!');
    } catch { setMsg('Failed to save'); }
    finally { setSaving(false); }
  };

  const total = (Object.values(weights) as number[]).reduce((a, b) => a + b, 0);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-black text-white uppercase tracking-wider">Recommendation Settings</h1>
      <p className="text-gray-500 text-sm">Configure the career recommendation algorithm weights</p>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-white font-bold text-sm mb-4">Scoring Weights</h3>
          <p className="text-gray-500 text-xs mb-4">Total must equal 1.00. Current: <span className={`font-bold ${Math.abs(total - 1) < 0.01 ? 'text-green-400' : 'text-red-400'}`}>{total.toFixed(2)}</span></p>
          {Object.entries(weights).map(([key, value]) => {
            const numValue = value as number;
            return (
            <div key={key} className="flex items-center gap-4 mb-3">
              <label className="text-gray-400 text-sm w-28 capitalize">{key}</label>
              <input type="range" min="0" max="0.5" step="0.05" value={numValue}
                onChange={e => setWeights(p => ({ ...p, [key]: parseFloat(e.target.value) }))}
                className="flex-grow accent-red-500" />
              <span className="text-white text-sm font-mono w-12 text-right">{numValue.toFixed(2)}</span>
            </div>
            );
          })}
        </div>

        <div>
          <h3 className="text-white font-bold text-sm mb-3">Results Count</h3>
          <input type="number" value={recCount} onChange={e => setRecCount(e.target.value)} min="5" max="50"
            className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm outline-none w-32" />
          <span className="text-gray-500 text-xs ml-3">careers per batch</span>
        </div>

        {msg && <p className={`text-sm ${msg.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>{msg}</p>}

        <button onClick={saveWeights} disabled={saving || Math.abs(total - 1) > 0.01}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
        <h3 className="text-white font-bold text-sm mb-3">Algorithm Formula</h3>
        <div className="bg-[#111] rounded-lg p-4 font-mono text-xs text-gray-400 leading-relaxed">
          <span className="text-blue-400">finalScore</span> = interest×<span className="text-white">{weights.interest}</span> + skill×<span className="text-white">{weights.skill}</span> + education×<span className="text-white">{weights.education}</span> + preference×<span className="text-white">{weights.preference}</span> + stage×<span className="text-white">{weights.stage}</span>
        </div>
      </div>
    </div>
  );
};

export default RecSettingsPage;
