// @ts-nocheck
import React from 'react';

interface DailyLogTableProps {
  records: any[]; 
  onDelete: (id: number) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DailyLogTable({ records, onDelete, onDateChange }: DailyLogTableProps) {
  function formattedTime(timestamp) {
    if (!timestamp) return "--:--";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  return (
    <div className="max-w-[1700px] mx-auto w-full pb-20 px-4 sm:px-10">
      {/* SECTION HEADER: Minimal & Industrial */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-[#4475C4] block"></span>
            DAILY TRANSACTIONS
          </h2>
          <p className="text-slate-400 font-medium text-sm ml-4 mt-1 uppercase tracking-widest">Laundry Management System</p>
      </div>

        <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-3">Filter by Date</span>
          <input 
            type="date" 
            className="bg-white text-slate-900 font-bold px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-[#4475C4]/20 transition-all cursor-pointer" 
            defaultValue={new Date().toISOString().split('T')[0]} 
            onChange={onDateChange} 
          />
      </div>
    </div>

      {/* THE TABLE: Clean, high-contrast, and spaced for 1700px */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold tracking-widest">
              <th className="px-10 py-5">Customer Info</th>
              <th className="px-6 py-5 text-center">Reference</th>
              <th className="px-6 py-5 text-center">Load Size</th>
              <th className="px-6 py-5 text-center">Log Time</th>
              <th className="px-6 py-5 text-center">Status</th>
              <th className="px-10 py-5 text-right">Options</th>
          </tr>
        </thead>
          <tbody className="divide-y divide-slate-100">
            {records.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-10 py-24 text-center">
                  <div className="text-slate-300 font-semibold tracking-wide italic uppercase text-lg">
                    Database empty for this period
                  </div>
              </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50/80 transition-all duration-150">
                  <td className="px-10 py-7">
                    <div className="flex flex-col">
                      <span className="font-bold text-xl text-slate-900 tracking-tight leading-none mb-1 capitalize">
                        {record.name || record.customer_name}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-7 text-center">
                    <span className="text-slate-400 font-bold tracking-tight">
                      #{record.id}
                    </span>
                  </td>

                  <td className="px-6 py-7 text-center">
                    <div className="inline-flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-900">{record.loads || record.load}</span>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase">Qty</span>
                    </div>
                  </td>

                  <td className="px-6 py-7 text-center">
                    <span className="font-semibold text-slate-600 text-base">{record.time || formattedTime(record.created_at)}</span>
                  </td>

                  <td className="px-6 py-7 text-center">
                    <span className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest border shadow-sm ${
                      record.status === 'Completed' ? 'bg-white text-green-600 border-green-200' : 
                      record.status === 'Ready' ? 'bg-white text-amber-500 border-amber-200' :
                      'bg-white text-[#4475C4] border-blue-200'
                }`}>
                  {record.status}
                </span>
              </td>
              
                  <td className="px-10 py-7 text-right">
                <button
                  aria-label="Delete Order"
                  onClick={() => onDelete(record.id)}
                  className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
                  </svg>
                </button>
              </td>
            </tr>
              ))
            )}
        </tbody>
      </table>
    </div>
  </div>
  );
}