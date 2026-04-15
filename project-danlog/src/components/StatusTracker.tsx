// @ts-nocheck
import React from 'react';

export const StatusTracker = ({ records, onUpdateStatus }) => {
  const pending = records.filter(r => r.status === "In Queue");
  const ready = records.filter(r => r.status === "Ready");

  return (
    <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* PENDING COLUMN */}
      <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-xl overflow-hidden border border-white flex flex-col">
        <div className="bg-[#B4C7E7] py-5 text-center">
          <h2 className="text-xl font-black uppercase italic text-[#2D4B7A] tracking-wider">Pending</h2>
        </div>
        <div className="p-6 space-y-4">
          {pending.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-left-4 duration-300">
              <div>
                <p className="font-black text-lg">{item.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{item.id} • {item.loads} Loads</p>
              </div>
              <button onClick={() => onUpdateStatus(item.id, "Ready")} className="bg-[#4475C4] text-white text-[10px] font-black px-4 py-3 rounded-xl shadow-md uppercase active:scale-95 transition-all hover:bg-[#355ea3]">Set Ready</button>
            </div>
          ))}
          {pending.length === 0 && <p className="text-center text-gray-300 font-bold italic py-10">No pending items</p>}
        </div>
      </div>

      {/* READY COLUMN */}
      <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-xl overflow-hidden border border-white flex flex-col">
        <div className="bg-[#A9D18E] py-5 text-center">
          <h2 className="text-xl font-black uppercase italic text-[#385723] tracking-wider">Ready</h2>
        </div>
        <div className="p-6 space-y-4">
          {ready.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <p className="font-black text-lg">{item.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{item.id} • {item.loads} Loads</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onUpdateStatus(item.id, "In Queue")} className="bg-white text-black text-[9px] font-black px-3 py-2 rounded-lg border border-gray-200 uppercase active:scale-90 transition-all hover:bg-red-50 hover:text-red-500">back</button>
                <button onClick={() => onUpdateStatus(item.id, "Completed")} className="bg-[#6CCF9B] text-white text-[9px] font-black px-3 py-2 rounded-lg shadow-md uppercase active:scale-90 transition-all hover:bg-[#5bb88a]">complete</button>
              </div>
            </div>
          ))}
          {ready.length === 0 && <p className="text-center text-gray-300 font-bold italic py-10">No items ready</p>}
        </div>
      </div>

      {/* TOTAL STATS */}
      <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-xl p-8 flex flex-col items-center justify-center border border-white">
          <div className="w-20 h-20 bg-[#4475C4] rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 shadow-lg shadow-[#4475C4]/30">{records.length}</div>
          <p className="text-3xl font-black tracking-tighter text-[#4475C4]">TOTAL ORDERS</p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 italic">Daily Performance</p>
      </div>
    </div>
  );
};