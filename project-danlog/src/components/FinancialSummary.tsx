// @ts-nocheck
import React from 'react';

export const FinancialSummary = ({ revenue, disbursement, onLogExpense, isLoading }) => {
  if (isLoading) {
    return (
      <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 h-[320px]"></div>
        ))}
      </div>
    );
  }

  const netProfit = revenue - disbursement;

  // Common header class to ensure identical height and alignment
  const headerClass = "h-[72px] px-8 flex justify-between items-center shrink-0 border-b border-slate-200";

  return (
    <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* COLUMN 1: REVENUE */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col border border-slate-200 h-[320px] overflow-hidden">
        <div className={`bg-slate-50 ${headerClass}`}>
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-500 block"></span>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Gross Revenue</h2>
          </div>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100 uppercase">
            Total Inflow
          </span>
        </div>
        
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-300 w-10">₱</span>
            <span className="text-6xl font-[1000] text-slate-900 tracking-tighter leading-none">
              {revenue.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-6 ml-10">Fiscal Year to Date</p>
        </div>
      </div>

      {/* COLUMN 2: DISBURSEMENTS */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col border border-slate-200 h-[320px] overflow-hidden">
        <div className={`bg-slate-50 ${headerClass}`}>
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-red-500 block"></span>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Disbursements</h2>
          </div>
          
          <button 
            onClick={onLogExpense}
            className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 pr-3 rounded-md hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all group"
          >
            <div className="w-5 h-5 bg-slate-900 text-white rounded flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 group-hover:text-red-600">Entry</span>
          </button>
        </div>
        
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-300 w-10">₱</span>
            <span className="text-6xl font-[1000] text-red-600 tracking-tighter leading-none">
              {disbursement.toLocaleString()}
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-6 ml-10">Outbound Expenses</p>
        </div>
      </div>

      {/* COLUMN 3: NET PROFIT */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-200 flex flex-col h-[320px] overflow-hidden">
        {/* Changed bg-slate-900 to match height and border logic of the other two */}
        <div className={`bg-slate-900 !border-slate-800 ${headerClass}`}>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Financial Performance</h2>
          <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Live Audit</span>
              <div className={`w-2 h-2 rounded-full ${netProfit >= 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
          </div>
        </div>
        
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-slate-100 pb-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-slate-300 w-10">₱</span>
              <span className="text-5xl font-[1000] text-slate-900 tracking-tighter leading-none">
                {netProfit.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-50 px-2 py-1 rounded border border-slate-100">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Net</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest px-1">
              <span className="text-slate-400">Profitability Ratio</span>
              <span className={netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                {revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-1000 ${netProfit >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`} 
                 style={{ width: `${Math.min(Math.max((Math.abs(netProfit) / (revenue || 1)) * 100, 0), 100)}%` }}
               ></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};