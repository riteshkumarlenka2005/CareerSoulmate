import React, { useState } from 'react';
import { API_URL } from '../services/api';

const ReportPage: React.FC = () => {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    try {
      const token = localStorage.getItem('careersoulmate-token');
      const response = await fetch(`${API_URL}/api/report/generate`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CareerSoulmate_Report_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || 'Failed to generate report');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Career Report</h1>
        <p className="text-gray-500 text-sm mt-2">Download a comprehensive PDF report of your career exploration journey</p>
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <span className="text-6xl block mb-6">📄</span>
          <h2 className="text-white font-bold text-lg mb-2">Your Personalized Career Report</h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            This PDF includes your profile summary, assessment results, top career recommendations,
            skill gap analysis, and recommended learning roadmap.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {['Profile Summary', 'Assessment Results', 'Top Recommendations', 'Skill Gap Analysis', 'Learning Roadmap', 'Career Insights'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
              <span className="text-green-400">✓</span> {item}
            </div>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-wait text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/20"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              'Download PDF Report'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
