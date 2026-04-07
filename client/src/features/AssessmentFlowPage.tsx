import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApiClient from '../services/api';

interface Question {
  _id: string;
  question_text: string;
  question_type: 'single_choice' | 'multiple_choice' | 'scale' | 'yes_no';
  category: string;
  subcategory?: string;
  options: { label: string; value: string; score: number }[];
  explanation?: string;
  order_no: number;
}

interface AssessmentData {
  _id: string;
  title: string;
  description: string;
  type: string;
  estimated_time_minutes: number;
}

const AssessmentFlowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [view, setView] = useState<'loading' | 'intro' | 'questions' | 'submitting' | 'results' | 'error'>('loading');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [results, setResults] = useState<any>(null);

  // Timer
  useEffect(() => {
    let interval: any;
    if (view === 'questions') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view]);

  // Load assessment data
  useEffect(() => {
    if (!id) return;
    loadAssessment();
  }, [id]);

  const loadAssessment = async () => {
    try {
      setView('loading');
      const res = await ApiClient.get(`/api/assessments/${id}`);
      setAssessment(res.data.assessment);
      setQuestions(res.data.questions || []);
      setView('intro');
    } catch (err: any) {
      setError(err.message || 'Failed to load assessment');
      setView('error');
    }
  };

  const startAssessment = async () => {
    try {
      setView('loading');
      const res = await ApiClient.post(`/api/assessments/${id}/start`);
      setAttemptId(res.data.attempt?._id || res.data._id || res.data.attemptId);
      setCurrentIdx(0);
      setAnswers({});
      setTimer(0);
      setView('questions');
    } catch (err: any) {
      setError(err.message || 'Failed to start assessment');
      setView('error');
    }
  };

  const handleAnswer = useCallback((questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const goNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const submitAssessment = async () => {
    if (!attemptId) return;
    try {
      setView('submitting');
      const answersArray = Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value,
      }));
      const res = await ApiClient.post(`/api/assessments/attempts/${attemptId}/submit`, { answers: answersArray });
      setResults(res.data.attempt || res.data);
      setView('results');
    } catch (err: any) {
      setError(err.message || 'Failed to submit assessment');
      setView('error');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const progress = questions.length > 0 ? ((currentIdx + 1) / questions.length) * 100 : 0;

  // Loading
  if (view === 'loading' || view === 'submitting') {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="text-sm font-black uppercase tracking-widest text-gray-400">
            {view === 'submitting' ? 'Analyzing Your Responses' : 'Loading Assessment'}
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (view === 'error') {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <p className="text-4xl">⚠️</p>
          <h2 className="text-2xl font-black uppercase tracking-tight">Something went wrong</h2>
          <p className="text-gray-400 text-sm">{error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('/assessment/start')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
              Back
            </button>
            <button onClick={loadAssessment} className="px-6 py-3 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Intro
  if (view === 'intro' && assessment) {
    return (
      <div className="bg-[#050505] text-white min-h-screen pb-20 animate-in fade-in duration-700 font-sans">
        <section className="relative pt-20 pb-10 px-4 md:pt-28 md:pb-16 md:px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[180px] rounded-full" />
          </div>
          <div className="max-w-2xl mx-auto relative z-10 text-center space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black tracking-widest uppercase">
              {assessment.type} Assessment
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              {assessment.title}
            </h1>
            <p className="text-gray-300 text-lg font-medium leading-relaxed">
              {assessment.description || `This assessment will help identify your ${assessment.type} profile for better career matching.`}
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <p className="text-2xl font-black text-white">{questions.length}</p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Questions</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <p className="text-2xl font-black text-white">{assessment.estimated_time_minutes || '~10'}</p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Minutes</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                <p className="text-2xl font-black text-white">AI</p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">Scored</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={startAssessment}
                className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-2xl shadow-blue-600/30 uppercase tracking-[0.2em] text-xs"
              >
                Begin Assessment
              </button>
              <button
                onClick={() => navigate('/assessment/start')}
                className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black transition-all uppercase tracking-[0.2em] text-xs"
              >
                Go Back
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Questions
  if (view === 'questions' && currentQuestion) {
    const isAnswered = !!answers[currentQuestion._id];

    return (
      <div className="bg-[#050505] text-white min-h-screen pb-20 font-sans">
        {/* Top bar */}
        <div className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
            <div>
              <p className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">{assessment?.title}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                Question {currentIdx + 1} of {questions.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Time</p>
              <p className="text-lg font-black tabular-nums text-white">{formatTime(timer)}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 w-full bg-white/5">
            <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <section className="max-w-3xl mx-auto px-4 pt-12 pb-8">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-8">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-black uppercase tracking-widest text-gray-400">
              {currentQuestion.category}
            </span>
            {currentQuestion.subcategory && (
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-black uppercase tracking-widest text-gray-500">
                {currentQuestion.subcategory}
              </span>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase text-white leading-tight tracking-tight mb-10">
            {currentQuestion.question_text}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = answers[currentQuestion._id] === opt.value;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(currentQuestion._id, opt.value)}
                  className={`w-full p-5 md:p-6 rounded-2xl border transition-all duration-300 text-left group flex items-center gap-5 ${
                    isSelected
                      ? 'bg-blue-600/10 border-blue-500/50 ring-1 ring-blue-500/30'
                      : 'bg-white/[0.03] border-white/10 hover:border-blue-500/30 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white/5 border border-white/10 text-gray-400 group-hover:text-white group-hover:border-blue-500/30'
                  }`}>
                    {isSelected ? '✓' : String.fromCharCode(65 + i)}
                  </div>
                  <span className={`text-sm font-medium leading-relaxed transition-colors ${
                    isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation hint */}
          {currentQuestion.explanation && isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-blue-300/70 leading-relaxed animate-in fade-in duration-500">
              💡 {currentQuestion.explanation}
            </div>
          )}
        </section>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-t border-white/5 z-40">
          <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={goPrev}
              disabled={currentIdx === 0}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIdx
                      ? 'bg-blue-500 w-4'
                      : answers[questions[i]._id]
                      ? 'bg-green-500/60'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {currentIdx === questions.length - 1 ? (
              <button
                onClick={submitAssessment}
                disabled={!allAnswered}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-green-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit ({answeredCount}/{questions.length})
              </button>
            ) : (
              <button
                onClick={goNext}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results
  if (view === 'results' && results) {
    const scoresByCategory = results.scores_by_category || {};
    const totalScore = results.total_score || 0;
    const categories = Object.entries(scoresByCategory) as [string, number][];

    return (
      <div className="bg-[#050505] text-white min-h-screen pb-20 animate-in fade-in duration-700 font-sans">
        <section className="pt-16 pb-10 px-4 md:pt-24 md:pb-16 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black tracking-widest uppercase">
              ASSESSMENT COMPLETE
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Results.</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium max-w-xl mx-auto">
              Completed in {formatTime(timer)}. Here's your breakdown across all dimensions.
            </p>
          </div>
        </section>

        <section className="px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Score breakdown */}
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black uppercase tracking-tight">Score Breakdown</h3>
                  <div className="text-right">
                    <p className="text-3xl font-black text-white">{Math.round(totalScore)}%</p>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Overall</p>
                  </div>
                </div>
                <div className="space-y-5">
                  {categories.map(([cat, score]) => (
                    <div key={cat} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-black uppercase tracking-widest text-white">{cat}</span>
                        <span className="text-xs font-black text-gray-400">{Math.round(Number(score))}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            Number(score) >= 70 ? 'bg-green-500' : Number(score) >= 40 ? 'bg-blue-600' : 'bg-orange-500'
                          }`}
                          style={{ width: `${Math.min(100, Number(score))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-sm text-gray-500">Detailed breakdown will appear after processing.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-6">What's Next?</h3>
              <div className="space-y-4">
                <button onClick={() => navigate('/assessment/start')} className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all text-left group">
                  <h4 className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors">Take More Assessments</h4>
                  <p className="text-xs text-gray-400 mt-1">Complete all assessment types for better accuracy</p>
                </button>
                <button onClick={() => navigate('/recommendations')} className="w-full p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 transition-all text-left group">
                  <h4 className="text-sm font-black uppercase text-blue-400">Generate Recommendations</h4>
                  <p className="text-xs text-gray-400 mt-1">See AI-powered career matches based on your profile</p>
                </button>
                <button onClick={() => navigate('/skill-gap')} className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-all text-left group">
                  <h4 className="text-sm font-black uppercase text-white group-hover:text-blue-400 transition-colors">Analyze Skill Gaps</h4>
                  <p className="text-xs text-gray-400 mt-1">Compare your skills to target careers</p>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
};

export default AssessmentFlowPage;
