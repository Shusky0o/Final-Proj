// @ts-nocheck
import React from 'react';

export const StatusTracker = ({ records, onUpdateStatus }) => {
  const pending = records.filter(r => r.status === "pending");
  const ready = records.filter(r => r.status === "ready");

  return (
    <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* PENDING COLUMN */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col border border-gray-100 h-[600px]">
        <div className="bg-[#B4C7E7] py-6 text-center shrink-0">
          <h2 className="text-xl font-black uppercase italic text-[#2D4B7A] tracking-widest">Pending</h2>
        </div>
        
        {/* SCROLLABLE AREA */}
        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 bg-gray-50/30">
          {pending.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div>
                <p className="font-black text-xl text-[#1A2B47] leading-tight">
                  {item.customer_name || item.name || "No Name Found"}
                </p>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">ID: {item.id}</p>
              </div>
              <button 
                onClick={() => onUpdateStatus(item.id, "ready")} 
                className="bg-[#4475C4] text-white text-[10px] font-black px-6 py-3 rounded-xl shadow-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shrink-0 ml-4"
              >
                Set Ready
              </button>
            </div>
          ))}
          {pending.length === 0 && (
            <div className="h-full flex items-center justify-center">
               <p className="text-gray-300 font-bold italic">No pending loads</p>
            </div>
          )}
        </div>
      </div>

      {/* READY COLUMN */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col border border-gray-100 h-[600px]">
        <div className="bg-[#A9D18E] py-6 text-center shrink-0">
          <h2 className="text-xl font-black uppercase italic text-[#385723] tracking-widest">Ready</h2>
        </div>
        
        {/* SCROLLABLE AREA */}
        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 bg-gray-50/30">
          {ready.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-6 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div>
                <p className="font-black text-xl text-[#1A2B47] leading-tight">
                  {item.customer_name || item.name || "No Name Found"}
                </p>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">ID: {item.id}</p>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <button 
                  onClick={() => onUpdateStatus(item.id, "pending")} 
                  className="bg-gray-100 text-gray-400 text-[9px] font-black px-4 py-2.5 rounded-lg uppercase hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  back
                </button>
                <button 
                  onClick={() => onUpdateStatus(item.id, "completed")} 
                  className="bg-[#6CCF9B] text-white text-[9px] font-black px-4 py-2.5 rounded-lg shadow-md uppercase hover:bg-[#5bb88a] transition-all"
                >
                  complete
                </button>
              </div>
            </div>
          ))}
          {ready.length === 0 && (
            <div className="h-full flex items-center justify-center">
               <p className="text-gray-300 font-bold italic">No loads ready</p>
            </div>
          )}
        </div>
      </div>

      {/* TOTAL STATS (Doesn't need scroll) */}
      <div className="bg-white rounded-[2.5rem] shadow-xl p-10 flex flex-col items-center justify-center border border-gray-100 h-[600px]">
          <div className="w-32 h-32 bg-[#4475C4] rounded-full flex items-center justify-center text-white text-5xl font-black mb-6 shadow-2xl border-4 border-white">
            {records.length}
          </div>
          <p className="text-3xl font-black text-[#1A2B47] uppercase italic tracking-tighter">Total Active</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mt-4">Laundromat Dashboard</p>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
};