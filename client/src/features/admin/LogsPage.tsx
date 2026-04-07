import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    ApiClient.get(`/api/admin/logs?page=${page}&limit=30`).then(res => {
      setLogs(res.data || []);
      setTotalPages(res.data?.totalPages || 1);
    }).finally(() => setLoading(false));
  }, [page]);

  const actionColors: Record<string, string> = {
    create: 'bg-green-500/10 text-green-400',
    update: 'bg-blue-500/10 text-blue-400',
    delete: 'bg-red-500/10 text-red-400',
    block_user: 'bg-orange-500/10 text-orange-400',
    broadcast: 'bg-purple-500/10 text-purple-400',
    settings_change: 'bg-yellow-500/10 text-yellow-400',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-white uppercase tracking-wider">Activity Logs</h1>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : logs.length === 0 ? (
        <p className="text-gray-500 text-center py-20">No activity logs</p>
      ) : (
        <div className="space-y-2">
          {logs.map((log: any) => (
            <div key={log._id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex items-center gap-4">
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${actionColors[log.action] || 'bg-gray-500/10 text-gray-400'}`}>
                {log.action}
              </span>
              <div className="flex-grow min-w-0">
                <p className="text-white text-sm truncate">{log.description}</p>
                <p className="text-gray-600 text-xs">
                  {log.admin_user?.fullName || 'Admin'} • {log.entity_type} • {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 bg-white/5 text-gray-400 text-xs rounded-lg disabled:opacity-30">← Prev</button>
          <span className="text-gray-500 text-xs px-2 py-1.5">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 bg-white/5 text-gray-400 text-xs rounded-lg disabled:opacity-30">Next →</button>
        </div>
      )}
    </div>
  );
};

export default LogsPage;
