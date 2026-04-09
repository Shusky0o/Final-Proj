// @ts-nocheck
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FinancialAnalysis() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [activePopUpMonth, setActivePopUpMonth] = useState(null);

  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: '',
    date: ''
  });

  const years = Array.from({ length: 11 }, (_, i) => (2025 + i).toString());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const CURRENT_YEAR = 2026;
  const CURRENT_MONTH_IDX = 3; 

  const isFuture = (year, monthName) => {
    const y = parseInt(year);
    if (y > CURRENT_YEAR) return true;
    if (y < CURRENT_YEAR) return false;
    const mIdx = months.indexOf(monthName);
    return mIdx > CURRENT_MONTH_IDX;
  };

  const revenueData = {
    2026: {
      January: { daily: 1280, total: 38400 },
      February: { daily: 1450, total: 40600 },
      March: { daily: 1720, total: 51600 },
      April: { daily: 1560, total: 46800 },
      May: { daily: 0, total: 0 }, June: { daily: 0, total: 0 }, July: { daily: 0, total: 0 },
      August: { daily: 0, total: 0 }, September: { daily: 0, total: 0 }, October: { daily: 0, total: 0 },
      November: { daily: 0, total: 0 }, December: { daily: 0, total: 0 },
    }
  };

  const disbursementData = {
    'January': { amount: 15000 }, 'February': { amount: 16200 }, 'March': { amount: 18900 },
    'April': { amount: 17500 }, 'May': { amount: 0 }, 'June': { amount: 0 },
    'July': { amount: 0 }, 'August': { amount: 0 }, 'September': { amount: 0 },
    'October': { amount: 0 }, 'November': { amount: 0 }, 'December': { amount: 0 },
  };

  const disbursementItems = [
    { date: 'March 1, 2026', description: '4 box of Detergent', amount: 760 },
    { date: 'March 6, 2026', description: '3 tanks of Gasoline', amount: 2861 },
    { date: 'March 19, 2026', description: '5 bags of plastics', amount: 312 },
    { date: 'March 22, 2026', description: '4 box of Detergent', amount: 760 },
    { date: 'March 31, 2026', description: '2 baskets', amount: 140 },
  ];

  const handleSaveExpense = (e) => {
    e.preventDefault();
    setShowDisbursementModal(false);
    setExpenseForm({ description: '', amount: '', date: '' });
  };

  const totalAnnualRevenue = Object.values(revenueData[selectedYear] || {}).reduce((sum, m) => sum + m.total, 0);
  const totalAnnualDisbursement = Object.keys(disbursementData).reduce((sum, month) => sum + disbursementData[month].amount, 0);

  const getDaysInMonth = (monthName) => {
    const monthIndex = months.indexOf(monthName);
    return new Date(selectedYear, monthIndex + 1, 0).getDate();
  };

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-br from-[#EAEFF9] via-[#FFFFFF] to-[#D9E2F3] flex flex-col font-sans text-black relative">
      
      {/* BACKGROUND VISUAL LAYER */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M100 100l-100 -100h200z' fill='%234475C4'/%3E%3C/svg%3E")`, backgroundSize: '150px' }}></div>

      {/* 1. HEADER (Uniform White Style) */}
      <header className="z-[100] bg-white/95 backdrop-blur-sm px-12 py-5 flex items-center justify-between w-full border-b border-gray-100 sticky top-0 shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="bg-[#4475C4] text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-[#4475C4]/30 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">DL</h1>
            </div>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-[10px] font-black tracking-[0.4em] text-[#4475C4] uppercase leading-tight opacity-70">Danlog System</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#1A2B47] tracking-tight">Financial <span className="text-[#4475C4]">Analysis</span></span>
            </div>
          </div>
        </div>

        <div className="bg-[#1A2B47] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md italic">
          MARCH 15, 2026
        </div>
      </header>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-8 relative z-10">
        
        {/* YEAR SELECTION & BACK */}
        <div className="max-w-[1700px] mx-auto w-full flex justify-between items-center">
          <div className="flex bg-white/80 backdrop-blur-md border border-white rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-4 font-black text-[#4475C4] uppercase text-[10px] tracking-widest border-r border-gray-100 flex items-center bg-gray-50/50">Fiscal Year</div>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)} 
              className="px-8 py-4 font-black text-[#1A2B47] text-lg outline-none bg-transparent cursor-pointer hover:bg-white transition-colors"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          
          <Link href="/">
            <button className="bg-white border-2 border-[#4475C4] text-[#4475C4] px-8 py-3 rounded-2xl font-[1000] uppercase tracking-widest hover:bg-[#4475C4] hover:text-white transition-all shadow-lg active:scale-95">
              ← Dashboard
            </button>
          </Link>
        </div>

        {/* TOP CARDS (ANNUAL SUMMARY) */}
        <div className="max-w-[1700px] mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white group hover:scale-[1.02] transition-transform">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors duration-500">
               <span className="text-xl font-black text-green-600 group-hover:text-white">₱</span>
            </div>
            <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Annual Revenue</p>
            <p className="text-5xl font-[1000] text-green-600 tracking-tighter">₱{totalAnnualRevenue.toLocaleString()}</p>
          </div>

          {/* Disbursement Card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white group hover:scale-[1.02] transition-transform relative overflow-hidden">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 transition-colors duration-500">
               <span className="text-xl font-black text-red-600 group-hover:text-white">₱</span>
            </div>
            <p className="text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Disbursements</p>
            <p className="text-5xl font-[1000] text-red-500 tracking-tighter mb-6">₱{totalAnnualDisbursement.toLocaleString()}</p>
            <button onClick={() => setShowDisbursementModal(true)} className="w-full bg-red-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">Log Expense</button>
          </div>

          {/* Profit Card */}
          <div className="bg-[#1A2B47] rounded-[2.5rem] p-8 shadow-2xl border border-white/10 group hover:scale-[1.02] transition-transform">
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
               <span className="text-xl font-black text-white">₱</span>
            </div>
            <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.2em] mb-1">Net Profit</p>
            <p className="text-5xl font-[1000] text-white tracking-tighter">₱{(totalAnnualRevenue - totalAnnualDisbursement).toLocaleString()}</p>
            <p className="mt-8 text-[9px] font-bold text-blue-400 uppercase italic tracking-widest">Calculated Performance</p>
          </div>
        </div>

        {/* MONTHLY BREAKDOWN TABLE */}
        <div className="max-w-[1700px] mx-auto w-full pb-20">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-[15px] font-[1000] uppercase tracking-[0.4em] text-[#4475C4]">Monthly Breakdown</h2>
            <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-2xl shadow-sm border border-white">
               <span className="text-[9px] font-black text-[#4475C4] uppercase tracking-widest">Select month to view timeline</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white overflow-hidden">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="bg-white/95 backdrop-blur-sm">
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <th className="py-7 pl-12 border-b border-gray-50 uppercase tracking-[0.2em]">Month</th>
                  <th className="py-7 text-right border-b border-gray-50">Revenue</th>
                  <th className="py-7 text-right border-b border-gray-50">Disbursement</th>
                  <th className="py-7 text-right border-b border-gray-50">Net Profit</th>
                  <th className="py-7 pr-12 text-right border-b border-gray-50">Timeline</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {months.map((month) => {
                  const rowIsFuture = isFuture(selectedYear, month);
                  const rev = revenueData[selectedYear]?.[month]?.total || 0;
                  const exp = disbursementData[month]?.amount || 0;
                  
                  return (
                    <tr 
                      key={month} 
                      onClick={() => !rowIsFuture && setActivePopUpMonth(month)}
                      className={`group transition-all ${rowIsFuture ? 'opacity-30 cursor-not-allowed bg-gray-50/20' : 'cursor-pointer hover:bg-white'}`}
                    >
                      <td className="py-6 pl-12 border-b border-gray-50/50">
                        <p className="font-[1000] text-[#1A2B47] group-hover:text-[#4475C4] transition-colors text-lg">{month}</p>
                      </td>
                      <td className="py-6 text-right border-b border-gray-50/50 font-black text-green-600">₱{rev.toLocaleString()}</td>
                      <td className="py-6 text-right border-b border-gray-50/50 font-black text-red-500">₱{exp.toLocaleString()}</td>
                      <td className="py-6 text-right border-b border-gray-50/50 font-black text-[#1A2B47]">₱{(rev - exp).toLocaleString()}</td>
                      <td className="py-6 pr-12 text-right border-b border-gray-50/50">
                        <span className="text-[9px] font-black uppercase text-gray-300 group-hover:text-[#4475C4] transition-colors tracking-widest">
                           {rowIsFuture ? 'LOCKED' : 'OPEN LOG →'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- DAILY BREAKDOWN MODAL (GLASS DESIGN) --- */}
      {activePopUpMonth && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[#1A2B47]/40 backdrop-blur-md" onClick={() => setActivePopUpMonth(null)}></div>
          <div className="relative bg-[#F8FAFC] w-full max-w-6xl h-[85vh] rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
            <div className="p-10 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-4xl font-[1000] text-[#1A2B47] uppercase tracking-tighter">{activePopUpMonth} <span className="text-[#4475C4]">{selectedYear}</span></h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1">Transaction Timeline</p>
              </div>
              <button onClick={() => setActivePopUpMonth(null)} className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-4">
              {[...Array(getDaysInMonth(activePopUpMonth))].map((_, i) => {
                const day = i + 1;
                const dailyRev = revenueData[selectedYear][activePopUpMonth]?.daily || 0;
                const dateStr = `${activePopUpMonth} ${day}, ${selectedYear}`;
                const dailyExpenses = disbursementItems.filter(item => item.date === dateStr);
                const totalExp = dailyExpenses.reduce((s, item) => s + item.amount, 0);
                const net = dailyRev - totalExp;

                return (
                  <div key={day} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-6 w-full md:w-32 shrink-0">
                      <span className="text-4xl font-[1000] text-gray-100 group-hover:text-[#4475C4] transition-colors">{day.toString().padStart(2, '0')}</span>
                      <div className="h-12 w-[1px] bg-gray-100"></div>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                      <div>
                        <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Revenue</p>
                        <p className="text-xl font-black text-green-600">₱{dailyRev.toLocaleString()}</p>
                      </div>
                      
                      <div className="md:border-l md:border-r border-gray-50 px-2">
                        <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Disbursements</p>
                        <div className="flex flex-wrap gap-2">
                          {dailyExpenses.length > 0 ? dailyExpenses.map((exp, idx) => (
                            <div key={idx} className="bg-red-50 px-3 py-1 rounded-lg border border-red-100">
                              <span className="text-[10px] font-black text-red-600">₱{exp.amount}</span>
                              <span className="text-[9px] font-bold text-gray-400 ml-2 uppercase italic">{exp.description}</span>
                            </div>
                          )) : <span className="text-[10px] font-bold text-gray-200 italic">None</span>}
                        </div>
                      </div>

                      <div className="md:text-right">
                        <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Net Daily</p>
                        <p className={`text-xl font-[1000] ${net < 0 ? 'text-red-500' : 'text-[#1A2B47]'}`}>₱{net.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* DISBURSEMENT MODAL (UPGRADED STYLE) */}
      {showDisbursementModal && (
        <div className="fixed inset-0 bg-[#1A2B47]/60 backdrop-blur-md z-[300] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3.5rem] p-12 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-white">
            <h2 className="text-4xl font-[1000] text-[#1A2B47] mb-2 uppercase tracking-tighter">Log <span className="text-red-500">Expense</span></h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Disbursement Records</p>
            
            <form onSubmit={handleSaveExpense} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-[#4475C4] ml-2 tracking-widest">Item Description</label>
                  <input required type="text" placeholder="e.g. 4 boxes of Detergent" value={expenseForm.description} onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none font-black focus:bg-white focus:ring-4 ring-blue-500/10 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-[#4475C4] ml-2 tracking-widest">Amount (₱)</label>
                  <input required type="number" placeholder="0.00" value={expenseForm.amount} onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none font-black focus:bg-white focus:ring-4 ring-blue-500/10 transition-all text-2xl text-red-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-[#4475C4] ml-2 tracking-widest">Transaction Date</label>
                  <input required type="text" placeholder="April 15, 2026" value={expenseForm.date} onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none font-black focus:bg-white focus:ring-4 ring-blue-500/10 transition-all" />
                </div>
                <div className="flex gap-4 pt-6">
                  <button type="button" onClick={() => setShowDisbursementModal(false)} className="flex-1 py-5 font-black uppercase text-xs text-gray-400 hover:text-red-500 transition-colors">Cancel</button>
                  <button type="submit" className="flex-[2] bg-[#1A2B47] text-white px-8 py-5 rounded-[1.5rem] font-black uppercase text-xs shadow-xl hover:bg-[#4475C4] active:scale-95 transition-all tracking-widest">Save Record</button>
                </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  );
}