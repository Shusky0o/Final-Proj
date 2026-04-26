// @ts-nocheck
import React from 'react';

export const FinancialSummary = ({ revenue, disbursement, onLogExpense, isLoading }) => {

  if (isLoading) {
    return (
      <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        
        {/* Card 1 */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white">
          <div className="w-14 h-14 bg-gray-200 rounded-2xl mb-6"></div>
          <div className="h-3 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-10 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Card 2 */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white">
          <div className="w-14 h-14 bg-gray-200 rounded-2xl mb-6"></div>
          <div className="h-3 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-10 w-40 bg-gray-200 rounded mb-6"></div>
          <div className="h-10 w-full bg-gray-200 rounded-2xl"></div>
        </div>

        {/* Card 3 */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white">
          <div className="w-14 h-14 bg-gray-200 rounded-2xl mb-6"></div>
          <div className="h-3 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-10 w-40 bg-gray-200 rounded"></div>
        </div>

      </div>
    );
  }
  
  return (
  <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white group hover:scale-[1.02] transition-transform">
      <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-500">
        <span className="text-xl font-black text-green-600 group-hover:text-white">₱</span>
      </div>
      <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Annual Revenue</p>
      <p className="text-5xl font-[1000] text-green-600 tracking-tighter">₱{revenue.toLocaleString()}</p>
    </div>

    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white group hover:scale-[1.02] transition-transform relative overflow-hidden">
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 transition-colors duration-500">
        <span className="text-xl font-black text-red-600 group-hover:text-white">₱</span>
      </div>
      <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Disbursements</p>
      <p className="text-5xl font-[1000] text-red-500 tracking-tighter mb-6">₱{disbursement.toLocaleString()}</p>
      <button onClick={onLogExpense} className="w-full bg-red-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">Log Expense</button>
    </div>

    <div className="bg-[#1A2B47] rounded-[2.5rem] p-8 shadow-2xl border border-white/10 group hover:scale-[1.02] transition-transform">
      <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-xl font-black text-white">₱</span>
      </div>
      <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Net Profit</p>
      <p className="text-5xl font-[1000] text-white tracking-tighter">₱{(revenue - disbursement).toLocaleString()}</p>
      <p className="mt-8 text-[9px] font-bold text-blue-400 uppercase italic tracking-widest">Calculated Performance</p>
    </div>
  </div>
);}