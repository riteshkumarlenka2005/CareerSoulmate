import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiClient.get('/api/admin/dashboard').then(res => setData(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  const stats = data?.stats || {};
  const statCards = [
    { label: 'Total Users', value: stats.totalUsers || 0, icon: '👥', color: 'blue' },
    { label: 'Active Users', value: stats.activeUsers || 0, icon: '✅', color: 'green' },
    { label: 'New This Month', value: stats.newUsersThisMonth || 0, icon: '📈', color: 'cyan' },
    { label: 'Assessments Done', value: stats.completedAssessments || 0, icon: '📝', color: 'purple' },
    { label: 'Published Careers', value: stats.totalCareers || 0, icon: '💼', color: 'orange' },
    { label: 'Active Roadmaps', value: stats.totalRoadmaps || 0, icon: '🗺️', color: 'pink' },
    { label: 'Chat Messages', value: stats.chatMessages || 0, icon: '💬', color: 'indigo' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Platform overview and analytics</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-white text-2xl font-black">{s.value}</span>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent registrations */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Recent Registrations</h3>
          <div className="space-y-2">
            {(data?.recentRegistrations || []).map((u: any) => (
              <div key={u._id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                <div><p className="text-white text-sm">{u.fullName}</p><p className="text-gray-500 text-xs">{u.email}</p></div>
                <span className="text-gray-600 text-xs">{new Date(u.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top recommended careers */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Top Recommended Careers</h3>
          <div className="space-y-2">
            {(data?.topCareers || []).map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                <div><p className="text-white text-sm">{c.title}</p><p className="text-gray-500 text-xs">{c.category}</p></div>
                <span className="text-blue-400 font-bold text-sm">{c.count}x</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity logs */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-6">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Recent Activity</h3>
        <div className="space-y-2">
          {(data?.recentLogs || []).map((log: any) => (
            <div key={log._id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <div className="min-w-0">
                <p className="text-white text-sm truncate">{log.description}</p>
                <p className="text-gray-500 text-xs">{log.admin_user?.fullName || 'Admin'} • {log.action}</p>
              </div>
              <span className="text-gray-600 text-xs shrink-0">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
