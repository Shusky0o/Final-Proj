// @ts-nocheck
import React from 'react';

export const StatsPulse = () => (
  <section className="space-y-4 md:space-y-6 flex flex-col flex-wrap h-full overflow-y-auto pr-2">
    <h2 className="text-[13px] md:text-[15px] font-black uppercase tracking-[0.3em] text-gray-400 pl-2">Operational Pulse</h2>
    
    <div className="bg-[#4475C4] rounded-[3rem] p-6 md:p-8 text-white shadow-2xl shadow-[#4475C4]/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <p className="font-bold text-xs uppercase tracking-widest opacity-80 mb-1">In Queue</p>
      <div className="flex items-end gap-3">
        <span className="text-7xl font-black tracking-tighter leading-none">06</span>
        <span className="text-sm font-bold pb-2 opacity-60 italic uppercase tracking-widest">Orders</span>
      </div>
      <div className="mt-6 flex items-center gap-2 bg-black/20 backdrop-blur-md w-fit px-4 py-2 rounded-2xl border border-white/10">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-widest">Live Tracking</span>
      </div>
    </div>

    <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-white transition-all hover:scale-[1.02]">
      <p className="text-[#4475C4] font-black text-[10px] tracking-[0.2em] uppercase mb-2 opacity-50">Today's Revenue</p>
      <div className="flex items-center gap-2">
        <span className="text-3xl md:text-4xl font-black text-[#1A2B47]">₱1,260</span>
        <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-md font-black italic">+12%</span>
      </div>
    </div>

    <div className="bg-white rounded-[3rem] p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-white transition-all hover:scale-[1.02]">
      <p className="text-gray-400 font-black text-[10px] tracking-[0.2em] uppercase mb-2">Monthly Revenue</p>
      <div className="flex items-center gap-2">
        <span className="text-3xl md:text-4xl font-black text-[#1A2B47]">₱29,120</span>
        <div className="w-2 h-2 bg-[#4475C4] rounded-full opacity-20"></div>
      </div>
    </div>
  </section>
);