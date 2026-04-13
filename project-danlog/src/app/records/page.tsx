// @ts-nocheck
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RecordsPage() {
  // 1. Move records into state so they are dynamic
  const [records, setRecords] = useState([
    { id: "#108", name: "Guilaran, Red", loads: 6, time: "10:30 AM", status: "Ready" },
    { id: "#107", name: "Sdani", loads: 1, time: "10:15 AM", status: "Ready" },
    { id: "#106", name: "Ilon Ziv", loads: 2, time: "09:45 AM", status: "In Queue" },
    { id: "#105", name: "Jaja", loads: 4, time: "09:20 AM", status: "In Queue" },
    { id: "#104", name: "Minatozaki Sana", loads: 2, time: "08:50 AM", status: "Completed" },
    { id: "#103", name: "Ahron A.", loads: 2, time: "08:30 AM", status: "Completed" },
    { id: "#102", name: "Wilhelm", loads: 3, time: "08:15 AM", status: "Completed" },
    { id: "#101", name: "Soph M.", loads: 1, time: "08:00 AM", status: "Completed" },
  ]);

  // 2. Logic to move records between columns
  const updateStatus = (id, newStatus) => {
    setRecords(prev => prev.map(record => 
      record.id === id ? { ...record, status: newStatus } : record
    ));
  };

  return (
    <main className="h-screen overflow-hidden bg-[#F0F4FA] flex flex-col font-sans text-black relative">

      {/* 1. HEADER */}
      <header className="z-[100] bg-white px-12 py-5 flex items-center justify-between w-full border-b border-gray-100 sticky top-0">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="bg-[#4475C4] text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-[#4475C4]/30 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">DL</h1>
            </div>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-[10px] font-black tracking-[0.4em] text-[#4475C4] uppercase leading-tight opacity-70">Danlog System</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#1A2B47] tracking-tight">Record <span className="text-[#4475C4]">History</span></span>
            </div>
          </div>
        </div>

        <div className="bg-[#1A2B47] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md italic">
          MARCH 15, 2026
        </div>
      </header>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-8">
        
        <div className="max-w-[1700px] mx-auto w-full flex justify-end">
          <Link href="/">
            <button className="bg-white border-2 border-[#4475C4] text-[#4475C4] px-8 py-3 rounded-2xl font-[1000] uppercase tracking-widest hover:bg-[#4475C4] hover:text-white transition-all shadow-lg active:scale-95">
              ← Dashboard
            </button>
          </Link>
        </div>
        
        <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* PENDING COLUMN */}
          <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-xl overflow-hidden border border-white flex flex-col">
            <div className="bg-[#B4C7E7] py-5 text-center">
              <h2 className="text-xl font-black uppercase italic text-[#2D4B7A] tracking-wider">Pending</h2>
            </div>
            <div className="p-6 space-y-4">
              {records.filter(r => r.status === "In Queue").map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-left-4 duration-300">
                  <div>
                    <p className="font-black text-lg">{item.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{item.id} • {item.loads} Loads</p>
                  </div>
                  <button 
                    onClick={() => updateStatus(item.id, "Ready")}
                    className="bg-[#4475C4] text-white text-[10px] font-black px-4 py-3 rounded-xl shadow-md uppercase active:scale-95 transition-all hover:bg-[#355ea3]"
                  >
                    Set Ready
                  </button>
                </div>
              ))}
              {records.filter(r => r.status === "In Queue").length === 0 && (
                <p className="text-center text-gray-300 font-bold italic py-10">No pending items</p>
              )}
            </div>
          </div>

          {/* READY COLUMN */}
          <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-xl overflow-hidden border border-white flex flex-col">
            <div className="bg-[#A9D18E] py-5 text-center">
              <h2 className="text-xl font-black uppercase italic text-[#385723] tracking-wider">Ready</h2>
            </div>
            <div className="p-6 space-y-4">
              {records.filter(r => r.status === "Ready").map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <p className="font-black text-lg">{item.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{item.id} • {item.loads} Loads</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateStatus(item.id, "In Queue")}
                      className="bg-white text-black text-[9px] font-black px-3 py-2 rounded-lg shadow-md uppercase active:scale-90 transition-all border border-gray-200 hover:bg-red-50 hover:text-red-500 hover:border-red-100"
                    >
                      back
                    </button>
                    <button 
                      onClick={() => updateStatus(item.id, "Completed")}
                      className="bg-[#6CCF9B] text-white text-[9px] font-black px-3 py-2 rounded-lg shadow-md uppercase active:scale-90 transition-all hover:bg-[#5bb88a]"
                    >
                      complete
                    </button>
                  </div>
                </div>
              ))}
              {records.filter(r => r.status === "Ready").length === 0 && (
                <p className="text-center text-gray-300 font-bold italic py-10">No items ready</p>
              )}
            </div>
          </div>

          {/* TOTAL STATS */}
          <div className="bg-white/70 backdrop-blur-md rounded-[2rem] shadow-xl p-8 flex flex-col items-center justify-center border border-white">
             <div className="w-20 h-20 bg-[#4475C4] rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 shadow-lg shadow-[#4475C4]/30">
                {records.length}
             </div>
             <p className="text-3xl font-black tracking-tighter text-[#4475C4]">TOTAL ORDERS</p>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 italic">Daily Performance</p>
          </div>
        </div>

        {/* DAILY TABLE */}
        <div className="max-w-[1700px] mx-auto w-full pb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-[#4475C4] rounded-full"></div>
              <h2 className="text-2xl font-black uppercase italic tracking-widest text-[#4475C4]">Daily Log Sheet</h2>
            </div>

            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-2xl shadow-xl border border-white">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">View History:</span>
              <input 
                type="date" 
                className="bg-transparent text-[#4475C4] font-bold outline-none cursor-pointer text-lg" 
                defaultValue="2026-03-15" 
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111827] text-white uppercase text-[11px] font-black tracking-[0.2em]">
                  <th className="px-8 py-6">Customer Name</th>
                  <th className="px-8 py-5 text-center">Order ID</th>
                  <th className="px-8 py-5 text-center">Total Loads</th>
                  <th className="px-8 py-5 text-center">Time Logged</th>
                  <th className="px-8 py-5 text-right">Final Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record, index) => (
                  <tr key={record.id} className="hover:bg-white/50 transition-colors group">
                    <td className="px-8 py-6 font-black text-lg text-gray-800">{record.name}</td>
                    <td className="px-8 py-6 text-center font-bold text-gray-400 italic">{record.id}</td>
                    <td className="px-8 py-6 text-center">
                      <span className="bg-[#4475C4]/10 text-[#4475C4] px-4 py-2 rounded-xl font-black text-sm">{record.loads}</span>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-gray-500">{record.time}</td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm transition-colors ${
                        record.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                        record.status === 'Ready' ? 'bg-green-50 text-green-500 border border-green-100' :
                        'bg-blue-100 text-[#4475C4]'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4475C4; border-radius: 10px; border: 2px solid #FFFFFF; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  );
}
