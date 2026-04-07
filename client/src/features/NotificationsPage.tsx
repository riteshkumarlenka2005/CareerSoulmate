import React, { useEffect, useState } from 'react';
import ApiClient from '../services/api';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async (p = 1) => {
    try {
      const res = await ApiClient.get(`/api/notifications?page=${p}&limit=20`);
      setNotifications(res.data || []);
      setTotalPages(res.data?.totalPages || 1);
      setUnreadCount(res.data?.unreadCount || 0);
    } catch { setNotifications([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchNotifications(page); }, [page]);

  const markAsRead = async (id: string) => {
    try {
      await ApiClient.put(`/api/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch {}
  };

  const markAllAsRead = async () => {
    try {
      await ApiClient.put('/api/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch {}
  };

  const deleteNotification = async (id: string) => {
    try {
      await ApiClient.delete(`/api/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch {}
  };

  const getIcon = (type: string) => {
    const icons: Record<string, string> = {
      recommendation: '🎯', assessment: '📝', profile: '👤', admin: '📢', system: '⚙️',
    };
    return icons[type] || '🔔';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-600/10 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-blue-600/20 transition-all">
            Mark All as Read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20 bg-[#0a0a0a] rounded-2xl border border-white/5">
          <span className="text-5xl block mb-4">🔔</span>
          <p className="text-gray-400 text-sm">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div key={n._id}
              className={`bg-[#0a0a0a] border rounded-xl p-4 flex items-start gap-4 transition-all ${
                n.is_read ? 'border-white/5' : 'border-blue-500/20 bg-blue-500/[0.03]'
              }`}
            >
              <span className="text-2xl shrink-0">{getIcon(n.type)}</span>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-semibold ${n.is_read ? 'text-gray-300' : 'text-white'}`}>{n.title}</h3>
                  {!n.is_read && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                </div>
                <p className="text-gray-500 text-xs mt-1">{n.message}</p>
                <p className="text-gray-600 text-[10px] mt-2">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {!n.is_read && (
                  <button onClick={() => markAsRead(n._id)} className="text-blue-400/50 hover:text-blue-400 text-xs" title="Mark read">✓</button>
                )}
                <button onClick={() => deleteNotification(n._id)} className="text-red-400/50 hover:text-red-400 text-xs" title="Delete">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => { setPage(i + 1); setLoading(true); }}
              className={`w-8 h-8 rounded-lg text-xs font-bold ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
