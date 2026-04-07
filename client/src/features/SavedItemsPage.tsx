import React, { useEffect, useState } from 'react';
import ApiClient from '../services/api';

const SavedItemsPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const endpoint = filter ? `/api/saved?type=${filter}` : '/api/saved';
        const res = await ApiClient.get(endpoint);
        setItems(res.data?.items || []);
      } catch { setItems([]); }
      finally { setLoading(false); }
    };
    fetchSaved();
  }, [filter]);

  const handleRemove = async (id: string) => {
    try {
      await ApiClient.delete(`/api/saved/${id}`);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider">Saved Items</h1>
          <p className="text-gray-500 text-sm mt-1">Your bookmarked careers and resources</p>
        </div>
        <div className="flex gap-2">
          {['', 'career', 'roadmap', 'skill'].map((f) => (
            <button key={f} onClick={() => { setFilter(f); setLoading(true); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {f || 'All'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-[#0a0a0a] rounded-2xl border border-white/5">
          <span className="text-5xl block mb-4">❤️</span>
          <p className="text-gray-400 text-sm mb-2">No saved items yet</p>
          <p className="text-gray-600 text-xs">Explore careers and save them for later</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-white/10 transition-all">
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold">{item.item_type}</span>
                <h3 className="text-white font-semibold text-sm mt-1 truncate">
                  {item.item_id?.title || item.item_id?.name || 'Saved Item'}
                </h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {item.item_id?.short_description || item.item_id?.description || item.notes || ''}
                </p>
                <p className="text-gray-600 text-[10px] mt-2">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <button onClick={() => handleRemove(item._id)}
                className="text-red-400/50 hover:text-red-400 text-sm transition-colors shrink-0" title="Remove">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedItemsPage;
