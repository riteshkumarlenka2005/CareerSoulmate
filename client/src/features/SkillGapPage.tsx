import React, { useState, useEffect } from 'react';
import ApiClient from '../services/api';

const SkillGapPage: React.FC = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCareers, setLoadingCareers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [careersRes, historyRes] = await Promise.all([
          ApiClient.get('/api/careers'),
          ApiClient.get('/api/skill-gap/history'),
        ]);
        setCareers(careersRes.data?.careers || []);
        setHistory(historyRes.data?.reports || []);
      } catch {}
      finally { setLoadingCareers(false); }
    };
    fetchData();
  }, []);

  const handleAnalyze = async () => {
    if (!selectedCareer) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await ApiClient.post('/api/skill-gap/analyze', { careerId: selectedCareer });
      setResult(res.data);
      // Refresh history
      const historyRes = await ApiClient.get('/api/skill-gap/history');
      setHistory(historyRes.data?.reports || []);
    } catch {}
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Skill Gap Analysis</h1>
        <p className="text-gray-500 text-sm mt-1">Compare your skills against career requirements</p>
      </div>

      {/* Career selector */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 space-y-4">
        <label className="text-gray-400 text-xs uppercase tracking-wider font-bold block">Select a target career</label>
        {loadingCareers ? (
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        ) : (
          <div className="flex gap-3">
            <select value={selectedCareer} onChange={(e) => setSelectedCareer(e.target.value)}
              className="flex-grow bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500/50">
              <option value="">Choose a career...</option>
              {careers.map((c: any) => (
                <option key={c._id} value={c._id}>{c.title} — {c.category}</option>
              ))}
            </select>
            <button onClick={handleAnalyze} disabled={!selectedCareer || loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all whitespace-nowrap">
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold">Analysis Results</h2>
            <span className="text-2xl font-black text-blue-400">{result.overall_readiness || result.readiness_score || 0}%</span>
          </div>

          {/* Overall readiness bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Overall Readiness</span>
              <span className="text-white font-bold">{result.overall_readiness || result.readiness_score || 0}%</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-700"
                style={{ width: `${result.overall_readiness || result.readiness_score || 0}%` }} />
            </div>
          </div>

          {/* Skills breakdown */}
          {(result.skill_gaps || result.skills || []).length > 0 && (
            <div className="space-y-3">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold">Skills Breakdown</h3>
              {(result.skill_gaps || result.skills || []).map((skill: any, i: number) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        skill.status === 'met' ? 'bg-green-500/10 text-green-400' :
                        skill.status === 'partial' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {skill.status || 'gap'}
                      </span>
                      <span className="text-white text-sm">{skill.skill_name || skill.name}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{skill.importance_level || skill.importance}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      skill.status === 'met' ? 'bg-green-500' :
                      skill.status === 'partial' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} style={{ width: `${skill.user_level_pct || (skill.status === 'met' ? 100 : skill.status === 'partial' ? 50 : 10)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations */}
          {(result.recommendations || []).length > 0 && (
            <div className="space-y-2">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold">Action Plan</h3>
              {result.recommendations.map((rec: string, i: number) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="text-blue-400 mt-0.5">→</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">Previous Analyses</h3>
          <div className="space-y-2">
            {history.map((report: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div>
                  <p className="text-white text-sm">{report.career?.title || 'Career Analysis'}</p>
                  <p className="text-gray-500 text-xs">{new Date(report.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="text-blue-400 font-bold text-sm">{report.overall_readiness || 0}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapPage;
