
import React, { useState, useMemo } from 'react';

interface Room {
  id: string;
  name: string;
  type: 'Lecture' | 'Seminar' | 'Smart' | 'Lab';
  capacity: number;
  status: 'Available' | 'Occupied' | 'Maintenance';
  equipment: string[];
  accessibility: string[];
  utilization: number; // percentage
  wing: string;
  floor: number;
}

const ROOMS_DB: Room[] = [
  {
    id: 'R101',
    name: 'Main Lecture Hall',
    type: 'Lecture',
    capacity: 120,
    status: 'Occupied',
    equipment: ['Projector', 'P.A. System', 'Recording Hub'],
    accessibility: ['Ramp Access', 'Braille Signage'],
    utilization: 88,
    wing: 'East Wing',
    floor: 1
  },
  {
    id: 'S202',
    name: 'Digital Innovation Lab',
    type: 'Smart',
    capacity: 45,
    status: 'Available',
    equipment: ['Interactive Board', 'VR Stations', 'High-speed Fiber'],
    accessibility: ['Elevator Access'],
    utilization: 42,
    wing: 'Innovation Block',
    floor: 2
  },
  {
    id: 'B304',
    name: 'Neural Research Hub',
    type: 'Lab',
    capacity: 30,
    status: 'Maintenance',
    equipment: ['GPU Cluster', 'Bio-sensors', 'Clean Room'],
    accessibility: ['Restricted Access', 'Safety Bay'],
    utilization: 65,
    wing: 'Science Block',
    floor: 3
  },
  {
    id: 'C102',
    name: 'Executive Seminar Room',
    type: 'Seminar',
    capacity: 60,
    status: 'Available',
    equipment: ['Video Conferencing', 'Dual Displays', 'Table Mics'],
    accessibility: ['Wide Doors'],
    utilization: 24,
    wing: 'East Wing',
    floor: 1
  }
];

const AdminInfraRoomsPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRooms = useMemo(() => {
    return ROOMS_DB.filter(r => {
      const matchesSearch = r.id.toLowerCase().includes(searchQuery.toLowerCase()) || r.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'All Types' || r.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const selectedRoom = useMemo(() => ROOMS_DB.find(r => r.id === selectedRoomId), [selectedRoomId]);

  const stats = {
    total: ROOMS_DB.length,
    smart: ROOMS_DB.filter(r => r.type === 'Smart').length,
    avgUtil: 72,
    peakHours: '10 AM - 1 PM'
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen pb-40 animate-in fade-in duration-700 font-sans overflow-x-hidden">
      
      {/* A. HEADER & DIRECTORY OVERVIEW */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 bg-[#080808] z-40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <div className="space-y-6 flex-grow">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-widest uppercase">
                SPATIAL RESOURCE MANAGER
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                Room <span className="gradient-text">Inventory.</span>
              </h1>
              <p className="text-gray-400 max-w-2xl text-lg font-medium leading-relaxed">
                Total control over institutional teaching spaces. Live registry of occupancy, 
                equipment status, and accessibility compliance.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
               {[
                 { l: 'Total Rooms', v: stats.total, c: 'blue' },
                 { l: 'Smart Ready', v: stats.smart, c: 'cyan' },
                 { l: 'Avg Utilization', v: `${stats.avgUtil}%`, c: 'purple' },
                 { l: 'Peak Load', v: stats.peakHours, c: 'rose' }
               ].map((stat, i) => (
                 <div key={i} className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                    <p className={`text-2xl font-black mb-1 text-${stat.c}-500`}>{stat.v}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-500">{stat.l}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS BAR */}
      <section className="sticky top-20 z-[45] bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
           <div className="relative group w-full md:w-96">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Room ID or Name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-xs font-black uppercase outline-none focus:border-blue-500 transition-all placeholder:text-gray-700"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>

           <div className="flex gap-4 w-full md:w-auto">
              {['All Types', 'Lecture', 'Seminar', 'Smart', 'Lab'].map(type => (
                <button 
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterType === type ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'}`}
                >
                  {type}
                </button>
              ))}
           </div>
           
           <div className="flex-grow flex justify-end">
              <button className="px-6 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Add Room +</button>
           </div>
        </div>
      </section>

      {/* B. ROOM DIRECTORY TABLE */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="overflow-x-auto rounded-[48px] border border-white/5 bg-[#0a0a0a] shadow-2xl">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white/[0.02] border-b border-white/10">
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest">ID & Name</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Type</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Capacity</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Location</th>
                     <th className="p-10 text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredRooms.map(room => (
                     <tr 
                      key={room.id} 
                      onClick={() => setSelectedRoomId(room.id)}
                      className="group hover:bg-white/[0.01] transition-colors cursor-pointer"
                     >
                        <td className="p-10">
                           <div className="space-y-1">
                              <h4 className="text-lg font-black uppercase text-white group-hover:text-blue-400 transition-colors leading-none">{room.name}</h4>
                              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">{room.id}</p>
                           </div>
                        </td>
                        <td className="p-10 text-center">
                           <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black uppercase text-gray-400">{room.type}</span>
                        </td>
                        <td className="p-10 text-center">
                           <span className="text-sm font-black text-white">{room.capacity} Seats</span>
                        </td>
                        <td className="p-10 text-center">
                           <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{room.wing}</p>
                           <p className="text-[8px] font-bold text-gray-700 uppercase">Floor {room.floor}</p>
                        </td>
                        <td className="p-10 text-center">
                           <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                             room.status === 'Available' ? 'bg-emerald-500/10 text-emerald-500' : 
                             room.status === 'Occupied' ? 'bg-blue-600/10 text-blue-500' : 'bg-rose-500/10 text-rose-500'
                           }`}>
                              {room.status}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* C. ROOM DETAIL VIEW (MODAL) */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-12 overflow-hidden">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setSelectedRoomId(null)} />
           
           <div className="relative w-full max-w-7xl h-full max-h-[92vh] bg-[#050505] border border-white/10 rounded-[64px] overflow-hidden animate-in zoom-in duration-500 flex flex-col md:flex-row shadow-2xl">
              
              {/* Left Col: Specs & Assets */}
              <div className="md:w-1/3 p-16 border-r border-white/5 overflow-y-auto custom-scrollbar flex flex-col bg-blue-600/[0.02]">
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <span className="px-3 py-1 bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded">Spatial Node Dossier</span>
                       <h2 className="text-4xl font-black uppercase text-white leading-none tracking-tighter">{selectedRoom.name}</h2>
                       <p className="text-gray-500 text-xs font-black uppercase tracking-[0.4em]">{selectedRoom.id} • {selectedRoom.wing}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="p-8 rounded-[40px] bg-black border border-white/5 text-center">
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Max Capacity</p>
                          <p className="text-2xl font-black text-white">{selectedRoom.capacity}</p>
                       </div>
                       <div className="p-8 rounded-[40px] bg-black border border-white/5 text-center">
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Floor</p>
                          <p className="text-2xl font-black text-white">{selectedRoom.floor}</p>
                       </div>
                    </div>

                    <section className="space-y-6">
                       <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-6">Equipment Audit</h4>
                       <div className="flex flex-wrap gap-2">
                          {selectedRoom.equipment.map(item => <span key={item} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase text-gray-400">✓ {item}</span>)}
                       </div>
                    </section>

                    <section className="space-y-6">
                       <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] border-l-4 border-purple-600 pl-6">Accessibility</h4>
                       <div className="flex flex-wrap gap-2">
                          {selectedRoom.accessibility.map(item => <span key={item} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase text-gray-400"># {item}</span>)}
                       </div>
                    </section>
                 </div>
              </div>

              {/* Right Col: Availability & Analytics */}
              <div className="flex-grow p-16 overflow-y-auto custom-scrollbar flex flex-col pb-40">
                 <div className="flex justify-end mb-10">
                    <button onClick={() => setSelectedRoomId(null)} className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10">
                       <svg className="w-7 h-7 text-gray-500 group-hover:text-white transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 </div>

                 <div className="space-y-24">
                    <section className="space-y-12">
                       <div className="flex items-center gap-6">
                         <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] whitespace-nowrap">Weekly Utilization Profile</h4>
                         <div className="h-px flex-grow bg-white/10" />
                       </div>
                       
                       <div className="grid md:grid-cols-2 gap-12">
                          <div className="p-10 rounded-[56px] bg-white/[0.02] border border-white/5 flex flex-col justify-center items-center text-center">
                             <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                                <svg className="w-full h-full rotate-[-90deg]">
                                   <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                   <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.42" strokeDashoffset={364.42 - (364.42 * selectedRoom.utilization / 100)} className="text-blue-500 shadow-[0_0_15px_#3b82f6]" />
                                </svg>
                                <span className="absolute text-2xl font-black text-white">{selectedRoom.utilization}%</span>
                             </div>
                             <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Average Weekly Load</p>
                          </div>
                          
                          <div className="space-y-6">
                             <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Availability Heatmap</h5>
                             <div className="grid grid-cols-4 gap-3">
                                {[
                                  { t: '09:00', s: 'Busy' }, { t: '10:00', s: 'Busy' }, { t: '11:00', s: 'Free' }, { t: '12:00', s: 'Free' },
                                  { t: '01:00', s: 'Free' }, { t: '02:00', s: 'Busy' }, { t: '03:00', s: 'Busy' }, { t: '04:00', s: 'Free' }
                                ].map((slot, idx) => (
                                  <div key={idx} className={`p-4 rounded-xl border text-center transition-all ${slot.s === 'Free' ? 'bg-emerald-600/10 border-emerald-500/40 text-emerald-400' : 'bg-red-600/10 border-red-500/40 text-red-400'}`}>
                                     <p className="text-[8px] font-black uppercase mb-1">{slot.t}</p>
                                     <p className="text-[7px] font-bold uppercase">{slot.s}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </section>

                    <section className="space-y-12 p-16 rounded-[64px] bg-gradient-to-br from-blue-900/15 via-[#080808] to-[#080808] border border-blue-500/20 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-16 opacity-[0.05]">
                          <svg width="250" height="250" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                       </div>
                       <div className="relative z-10">
                          <h3 className="text-2xl font-black uppercase text-white mb-4">Space-Time <span className="text-blue-500">Efficiency.</span></h3>
                          <p className="text-sm text-gray-300 font-medium leading-relaxed tracking-tight max-w-2xl">
                            "This room is currently optimized for Morning High-Density Lectures. 
                            AI scheduling suggests <span className="text-emerald-500">22% open bandwidth</span> in the afternoon 
                            window, ideal for interdisciplinary workshops."
                          </p>
                       </div>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 border-t border-white/5">
                       <button className="py-7 bg-blue-600 hover:bg-blue-500 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl transition-all active:scale-95">
                          Request Asset Upgrade
                       </button>
                       <button className="py-7 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[40px] font-black uppercase tracking-[0.2em] text-[12px] transition-all">
                          Export Usage Log
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* D. USAGE ANALYTICS (BOTTOM) */}
      <section className="py-24 px-6 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-20">Resource <span className="text-blue-500">Yield.</span></h2>
            <div className="grid md:grid-cols-3 gap-12">
               {[
                 { label: 'Weekly Seat Yield', val: '84%', d: 'Total seats used vs total capacity.', c: 'blue' },
                 { label: 'Energy Load Efficiency', val: '92%', d: 'Occupancy-based power optimization index.', c: 'emerald' },
                 { label: 'Underused Spaces', val: '12', d: 'Rooms with < 20% weekly utilization.', c: 'rose' }
               ].map((item, i) => (
                 <div key={i} className="p-10 rounded-[56px] bg-black/60 border border-white/10 flex flex-col items-center group hover:border-white/20 transition-all">
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em] mb-6">{item.label}</p>
                    <span className={`text-4xl font-black text-${item.c}-500 mb-4`}>{item.val}</span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed px-6">{item.d}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CALL-TO-ACTION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-12 leading-[0.9] tracking-tighter">
             Optimized <br/><span className="gradient-text">Physicality.</span>
           </h2>
           <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
              Every square foot is an academic asset. Career Soulmate ensures 
              your infrastructure is deployed with maximum efficiency for student success.
           </p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button onClick={() => alert('Launching Infrastructure Audit...')} className="px-12 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[24px] font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-[0.2em] text-[10px]">
               Audit All Facilities
             </button>
             <button onClick={() => onNavigate('admin-dashboard')} className="px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-[24px] font-black transition-all backdrop-blur-md uppercase tracking-[0.2em] text-[10px]">
               Back to Dashboard
             </button>
           </div>
        </div>
      </section>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
        .grid-pattern {
          background-image: linear-gradient(to right, #3b82f6 1px, transparent 1px),
                            linear-gradient(to bottom, #3b82f6 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .text-rose-500 { color: #f43f5e; }
        .bg-rose-500\/10 { background-color: rgba(244, 63, 94, 0.1); }
      `}</style>
    </div>
  );
};

export default AdminInfraRoomsPage;
