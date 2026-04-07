import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const ReportsPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiClient.get('/api/admin/dashboard').then(res => setStats(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  const s = stats?.stats || {};
  const growth = stats?.userGrowth || [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-white uppercase tracking-wider">Reports & Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: s.totalUsers },
          { label: 'Active Users', value: s.activeUsers },
          { label: 'Assessments Done', value: s.completedAssessments },
          { label: 'Chat Messages', value: s.chatMessages },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 text-center">
            <p className="text-white text-3xl font-black">{stat.value || 0}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* User growth chart (simple bar) */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">User Growth (Last 7 Days)</h3>
        {growth.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No growth data available</p>
        ) : (
          <div className="flex items-end gap-2 h-40">
            {growth.map((day: any) => {
              const maxCount = Math.max(...growth.map((g: any) => g.count), 1);
              const pct = (day.count / maxCount) * 100;
              return (
                <div key={day._id} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-white text-xs font-bold">{day.count}</span>
                  <div className="w-full bg-red-500/20 rounded-t-lg relative" style={{ height: `${Math.max(pct, 5)}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg" />
                  </div>
                  <span className="text-gray-600 text-[9px]">{day._id?.slice(5)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Top careers */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Most Recommended Careers</h3>
        <div className="space-y-3">
          {(stats?.topCareers || []).map((c: any, i: number) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-white text-lg font-black w-6 text-right">{i + 1}</span>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm">{c.title}</span>
                  <span className="text-gray-500 text-xs">{c.count} recommendations</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: `${(c.count / (stats?.topCareers?.[0]?.count || 1)) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
