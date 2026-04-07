import React, { useState, useEffect } from 'react';
import ApiClient from '../../services/api';

const DataPipelinePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'staging' | 'upload' | 'sources'>('staging');
  const [sources, setSources] = useState<any[]>([]);
  const [stagingRecords, setStagingRecords] = useState<any[]>([]);
  
  // Upload States
  const [fileContent, setFileContent] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchRecords = async () => {
    try {
      const [resStaging, resSources] = await Promise.all([
         ApiClient.get('/api/admin/data/staging'),
         ApiClient.get('/api/admin/data/sources')
      ]);
      setStagingRecords(resStaging.data || []);
      setSources(resSources.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [activeTab]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileContent(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const submitUpload = async () => {
    if (!fileContent) return setMessage('Please select a file containing JSON array data');
    setUploading(true);
    setMessage('');
    
    try {
      // In production, you would parse CSV to JSON here. Assuming valid JSON array for simplicity
      const parsedData = JSON.parse(fileContent);
      if (!Array.isArray(parsedData)) throw new Error("JSON must be an array of objects");

      const res = await ApiClient.post('/api/admin/data/staging/upload', {
        payload: parsedData,
        sourceName: sourceName || 'Direct Upload'
      });
      setMessage(res.message);
      setFileContent('');
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const processRecords = async (recordIds: string[], action: 'approve' | 'reject') => {
     try {
        await ApiClient.post('/api/admin/data/staging/process', { recordIds, action });
        fetchRecords(); // Refresh
     } catch (err) {
        console.error(err);
     }
  };

  const handleForceSync = async () => {
     try {
        const res = await ApiClient.post('/api/admin/data/force-sync');
        alert(res.message);
     } catch (err: any) {
        alert(err.message);
     }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider">Data Pipeline</h1>
          <p className="text-gray-500 text-sm">ETL ingestion and staging approval area.</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/10 pb-2">
        {['staging', 'upload', 'sources'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'upload' && (
        <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl space-y-4 max-w-xl">
          <h3 className="text-white font-bold mb-2">Manual Data Ingestion</h3>
          <p className="text-gray-400 text-xs mb-4">Upload a JSON array file mapping to Careers (title, description, category, salary_min).</p>

          <input type="text" placeholder="Source Name (e.g. O*NET March Sync)" 
            value={sourceName} onChange={e => setSourceName(e.target.value)}
            className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white text-sm" />

          <input type="file" accept=".json,.csv" onChange={handleFileUpload} 
            className="w-full bg-[#111] border border-white/10 p-3 rounded-lg text-white text-sm" />
          
          <button onClick={submitUpload} disabled={uploading}
            className="px-6 py-3 bg-blue-600 text-white text-sm font-bold uppercase tracking-wider rounded-lg w-full disabled:opacity-50">
            {uploading ? 'Processing...' : 'Upload to Staging'}
          </button>

          {message && <div className="text-sm p-4 bg-white/5 rounded text-blue-400">{message}</div>}
        </div>
      )}

      {activeTab === 'staging' && (
        <div className="space-y-4">
           {stagingRecords.filter(r => r.review_status === 'pending').map(record => (
              <div key={record._id} className="bg-[#0a0a0a] border border-white/5 p-5 rounded-xl flex justify-between items-center">
                 <div>
                    <h4 className="text-white font-bold">{record.normalized_payload.title}</h4>
                    <p className="text-gray-400 text-xs">Mapped Category: {record.normalized_payload.category}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] uppercase rounded-full">Source: {record.source_id?.name || 'Manual'}</span>
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-500 text-[10px] uppercase rounded-full">Match: {record.match_status}</span>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <button onClick={() => processRecords([record._id], 'reject')} className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded uppercase text-xs font-bold">Reject</button>
                    <button onClick={() => processRecords([record._id], 'approve')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded uppercase text-xs font-bold">Approve</button>
                 </div>
              </div>
           ))}
           {stagingRecords.filter(r => r.review_status === 'pending').length === 0 && (
             <p className="text-gray-500 text-sm">No staging records pending review.</p>
           )}
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="space-y-4">
           <div className="flex justify-end border-b border-white/10 pb-4 mb-4">
              <button onClick={handleForceSync} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 font-bold uppercase text-xs rounded-xl text-white shadow-xl">⚡ Force Sync 3rd-Party APIs</button>
           </div>
           {sources.map(source => (
              <div key={source._id} className="bg-[#0a0a0a] border border-white/5 p-4 rounded-xl flex justify-between">
                 <div>
                    <h4 className="text-white font-bold">{source.name}</h4>
                    <p className="text-gray-500 text-xs">Type: {source.type} | Frequency: {source.sync_frequency}</p>
                 </div>
                 <div className="text-right">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] uppercase rounded-full">Active</span>
                 </div>
              </div>
           ))}
        </div>
      )}

    </div>
  );
};

export default DataPipelinePage;
