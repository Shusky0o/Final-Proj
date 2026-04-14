// @ts-nocheck
import React from 'react';

export const DailyLogTable = ({ records }) => (
  <div className="max-w-[1700px] mx-auto w-full pb-20">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-[#4475C4] rounded-full"></div>
        <h2 className="text-2xl font-black uppercase italic tracking-widest text-[#4475C4]">Daily Log Sheet</h2>
      </div>
      <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-2xl shadow-xl border border-white">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">View History:</span>
        <input type="date" className="bg-transparent text-[#4475C4] font-bold outline-none cursor-pointer text-lg" defaultValue="2026-03-15" />
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
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-white/50 transition-colors group">
              <td className="px-8 py-6 font-black text-lg text-gray-800">{record.name}</td>
              <td className="px-8 py-6 text-center font-bold text-gray-400 italic">{record.id}</td>
              <td className="px-8 py-6 text-center">
                <span className="bg-[#4475C4]/10 text-[#4475C4] px-4 py-2 rounded-xl font-black text-sm">{record.loads}</span>
              </td>
              <td className="px-8 py-6 text-center font-bold text-gray-500">{record.time}</td>
              <td className="px-8 py-6 text-right">
                <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${
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
);