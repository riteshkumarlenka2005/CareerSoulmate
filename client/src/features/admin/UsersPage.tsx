import React, { useEffect, useState } from 'react';
import ApiClient from '../../services/api';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.set('search', search);
      const res = await ApiClient.get(`/api/admin/users?${params}`);
      setUsers(res.data || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, [page]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setPage(1); fetchUsers(); };

  const updateStatus = async (id: string, status: string) => {
    try {
      await ApiClient.put(`/api/admin/users/${id}/status`, { status });
      fetchUsers();
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">User Management</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            className="bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white text-sm outline-none focus:border-red-500/50 w-64" />
          <button type="submit" className="px-4 py-2 bg-red-600 text-white text-xs font-bold uppercase rounded-lg">Search</button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead><tr className="border-b border-white/5">
              <th className="text-left text-gray-500 text-xs uppercase tracking-wider font-bold p-4">User</th>
              <th className="text-left text-gray-500 text-xs uppercase tracking-wider font-bold p-4">Role</th>
              <th className="text-left text-gray-500 text-xs uppercase tracking-wider font-bold p-4">Status</th>
              <th className="text-left text-gray-500 text-xs uppercase tracking-wider font-bold p-4">Joined</th>
              <th className="text-right text-gray-500 text-xs uppercase tracking-wider font-bold p-4">Actions</th>
            </tr></thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u._id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <p className="text-white font-medium">{u.fullName}</p>
                    <p className="text-gray-500 text-xs">{u.email}</p>
                  </td>
                  <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded ${u.role === 'admin' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>{u.role}</span></td>
                  <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded ${u.account_status === 'active' ? 'bg-green-500/10 text-green-400' : u.account_status === 'blocked' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>{u.account_status || 'active'}</span></td>
                  <td className="p-4 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      {u.account_status !== 'blocked' ? (
                        <button onClick={() => updateStatus(u._id, 'blocked')} className="text-red-400/50 hover:text-red-400 text-xs px-2 py-1">Block</button>
                      ) : (
                        <button onClick={() => updateStatus(u._id, 'active')} className="text-green-400/50 hover:text-green-400 text-xs px-2 py-1">Activate</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-bold ${page === i + 1 ? 'bg-red-600 text-white' : 'bg-white/5 text-gray-400'}`}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
