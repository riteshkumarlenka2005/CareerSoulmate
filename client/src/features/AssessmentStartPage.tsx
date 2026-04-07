import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../services/api';

interface Assessment {
  _id: string;
  title: string;
  description: string;
  type: string;
  estimated_time_minutes: number;
  is_active: boolean;
}

interface Attempt {
  _id: string;
  assessment: { _id: string; title: string; type: string };
  status: string;
  scores_by_category: Record<string, number>;
  total_score: number;
  completed_at: string;
}

const TYPE_ICONS: Record<string, string> = {
  interest: '🧭',
  aptitude: '🧩',
  personality: '🪞',
  skills: '🛠️',
  preference: '⚙️',
  background: '📋',
};

const TYPE_COLORS: Record<string, string> = {
  interest: 'purple',
  aptitude: 'blue',
  personality: 'indigo',
  skills: 'emerald',
  preference: 'cyan',
  background: 'orange',
};

const AssessmentStartPage: React.FC = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [assessRes, attemptsRes] = await Promise.all([
        ApiClient.get('/api/assessments'),
        ApiClient.get('/api/assessments/attempts'),
      ]);
      setAssessments(assessRes.data?.assessments || []);
      setAttempts(attemptsRes.data?.attempts || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load assessments');
    } finally {
      setLoading(false);
    }
  };

  const getAttemptForAssessment = (assessmentId: string) => {
    return attempts.find(
      (a) =>
        (typeof a.assessment === 'object' ? a.assessment._id : a.assessment) === assessmentId &&
        a.status === 'completed'
    );
  };

  const completedCount = assessments.filter((a) => getAttemptForAssessment(a._id)).length;
  const totalCount = assessments.length;
  const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleStartAssessment = (assessmentId: string) => {
    navigate(`/assessment/${assessmentId}`);
  };

  if (loading) {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="text-sm font-black uppercase tracking-widest text-gray-400">Loading Assessments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-20 animate-in fade-in duration-700 font-sans">
      {/* Hero */}
      <section className="relative pt-12 pb-8 px-4 md:pt-20 md:pb-12 md:px-6 overflow-visible">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">
                MULTI-DIMENSIONAL ASSESSMENT
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                Discover Your <br /><span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Full Profile.</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed max-w-xl">
                Complete all assessments to unlock precise career recommendations. Each one measures a different dimension of your professional potential.
              </p>
            </div>

            {/* Progress Card */}
            <div className="w-full lg:w-80 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
              <p className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-3">Overall Progress</p>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-4xl font-black text-white leading-none">{overallProgress}%</h3>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {completedCount}/{totalCount} Complete
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              {completedCount === totalCount && totalCount > 0 ? (
                <button
                  onClick={() => navigate('/recommendations')}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  View Recommendations →
                </button>
              ) : (
                <p className="text-xs text-gray-400 font-medium">Complete all to unlock AI recommendations</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Error state */}
      {error && (
        <div className="max-w-5xl mx-auto px-4 md:px-6 mb-8">
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center justify-between">
            <span>{error}</span>
            <button onClick={loadData} className="text-xs font-black uppercase tracking-widest hover:text-red-300">Retry</button>
          </div>
        </div>
      )}

      {/* Assessment Cards */}
      <section className="px-4 md:px-6 max-w-5xl mx-auto">
        {assessments.length === 0 && !error ? (
          <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
            <p className="text-2xl mb-2">📋</p>
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No assessments available yet</p>
            <p className="text-gray-500 text-xs mt-2">Ask your admin to create assessment questions first.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessments.map((assessment, idx) => {
              const attempt = getAttemptForAssessment(assessment._id);
              const isCompleted = !!attempt;
              const color = TYPE_COLORS[assessment.type] || 'blue';
              const icon = TYPE_ICONS[assessment.type] || '📝';

              return (
                <div
                  key={assessment._id}
                  className={`group relative p-6 md:p-8 rounded-2xl bg-white/[0.04] border transition-all duration-500 flex flex-col ${
                    isCompleted
                      ? 'border-green-500/30 hover:border-green-500/50'
                      : 'border-white/10 hover:border-blue-500/40'
                  }`}
                >
                  {/* Glow */}
                  <div className={`absolute -top-5 -right-10 w-32 h-32 blur-[80px] opacity-10 bg-${color}-500 group-hover:opacity-25 transition-all`} />

                  <div className="relative z-10 flex-grow flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-3xl">{icon}</div>
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-xs font-black uppercase tracking-widest text-green-400">
                            ✓ Done
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-black uppercase tracking-widest text-gray-400">
                            {assessment.estimated_time_minutes || '~10'} min
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title + Description */}
                    <h3 className="text-xl font-black uppercase text-white mb-2 tracking-tight">{assessment.title}</h3>
                    <p className="text-gray-300 text-sm font-medium leading-relaxed mb-6 flex-grow">
                      {assessment.description || `Measure your ${assessment.type} profile to inform career recommendations.`}
                    </p>

                    {/* Score (if completed) */}
                    {isCompleted && attempt && (
                      <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Score</span>
                          <span className="text-lg font-black text-white">{Math.round(attempt.total_score || 0)}%</span>
                        </div>
                        {attempt.scores_by_category && Object.keys(attempt.scores_by_category).length > 0 && (
                          <div className="mt-3 space-y-2">
                            {Object.entries(attempt.scores_by_category).slice(0, 3).map(([cat, score]) => (
                              <div key={cat} className="flex items-center gap-3">
                                <span className="text-xs text-gray-400 uppercase tracking-wider w-24 truncate">{cat}</span>
                                <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-600" style={{ width: `${Math.min(100, Number(score))}%` }} />
                                </div>
                                <span className="text-xs font-black text-gray-300 w-8 text-right">{Math.round(Number(score))}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-black text-gray-500 uppercase tracking-widest">
                        {assessment.type} Assessment
                      </span>
                      <button
                        onClick={() => handleStartAssessment(assessment._id)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          isCompleted
                            ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                        }`}
                      >
                        {isCompleted ? 'Retake' : 'Start'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {completedCount > 0 && (
          <div className="mt-12 p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
              Ready for <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Insights?</span>
            </h3>
            <p className="text-gray-300 text-sm font-medium mb-6 max-w-lg mx-auto">
              Your assessment data feeds directly into our AI recommendation engine. The more you complete, the more accurate your career matches become.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/recommendations')} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
                Generate Recommendations
              </button>
              <button onClick={() => navigate('/skill-gap')} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                Analyze Skill Gaps
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AssessmentStartPage;
