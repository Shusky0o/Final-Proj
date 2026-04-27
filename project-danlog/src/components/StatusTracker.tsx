// @ts-nocheck
import React from 'react';

export const StatusTracker = ({ records, onUpdateStatus, pendingOrders, readyOrders }) => {
  const pending = pendingOrders;
  const ready = readyOrders;
  const total = pending.length + ready.length;

  return (
    <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* PENDING COLUMN */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col border border-slate-200 h-[600px] overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 py-5 px-8 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-[#4475C4] block"></span>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Pending Orders</h2>
          </div>
          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded">
            {pending.length} TOTAL
          </span>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 bg-white">
          {pending.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-6 bg-white rounded-lg border border-slate-100 shadow-sm transition-all hover:bg-slate-50/50 hover:border-slate-200">
              <div>
                <p className="font-bold text-xl text-slate-900 tracking-tight leading-none capitalize">
                  {item.customer_name || item.name || "No Name Found"}
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">ID: #{item.id}</p>
              </div>
              <button 
                onClick={() => onUpdateStatus(item.id, "ready")} 
                className="bg-[#4475C4] text-white text-[10px] font-black px-5 py-3 rounded-lg shadow-sm uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shrink-0 ml-4"
              >
                Set Ready
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* READY COLUMN */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col border border-slate-200 h-[600px] overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 py-5 px-8 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-500 block"></span>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Ready for Pickup</h2>
          </div>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 animate-pulse">
             LIVE
          </span>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 bg-white">
          {ready.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 p-6 bg-white rounded-lg border border-slate-100 shadow-sm transition-all hover:bg-slate-50/50 hover:border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-xl text-slate-900 tracking-tight leading-none capitalize">
                    {item.customer_name || item.name || "No Name Found"}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">ID: #{item.id}</p>
                </div>
              </div>
              
              {/* BACK BUTTON HAS ITS OWN PROMINENT ROW */}
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => onUpdateStatus(item.id, "pending")} 
                  className="bg-slate-100 text-slate-500 text-[10px] font-black py-3 rounded-lg uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all border border-slate-200 hover:border-red-200"
                >
                  Back to Pending
                </button>
                <button 
                  onClick={() => onUpdateStatus(item.id, "completed")} 
                  className="bg-emerald-500 text-white text-[10px] font-black py-3 rounded-lg shadow-sm uppercase tracking-widest hover:bg-emerald-600 transition-all"
                >
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPLACED DEAD SPACE WITH "QUEUE METRICS" TERMINAL */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col h-[600px] overflow-hidden">
        <div className="bg-slate-900 py-5 px-8 shrink-0">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Queue Metrics</h2>
        </div>
        
        <div className="flex-1 p-8 flex flex-col justify-between">
          {/* Main Counter */}
          <div className="text-center py-6 border-b border-slate-100">
            <span className="text-[10px] font-black text-[#4475C4] uppercase tracking-[0.5em] block mb-2">Total active loads</span>
            <div className="text-8xl font-[1000] text-slate-900 tracking-tighter leading-none">{total}</div>
          </div>

          {/* Breakdown Stats - Fills the middle space */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Washing/Drying</span>
              <span className="text-2xl font-black text-slate-900">{pending.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div className="bg-[#4475C4] h-full transition-all duration-500" style={{ width: `${(pending.length / (total || 1)) * 100}%` }}></div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Pickup</span>
              <span className="text-2xl font-black text-slate-900">{ready.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(ready.length / (total || 1)) * 100}%` }}></div>
            </div>
          </div>

          {/* System Badge */}
          <div className="mt-auto pt-8 flex justify-center">
             <div className="border border-slate-200 rounded-lg px-6 py-4 w-full text-center bg-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                <p className="text-xs font-bold text-slate-900">SYSTEM OPERATIONAL</p>
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 4px; }
      `}</style>
    </div>
  );
};