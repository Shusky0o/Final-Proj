// @ts-nocheck
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FinancialAnalysis() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [activePopUpMonth, setActivePopUpMonth] = useState(null);

  // Form State for Log Expense
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: '',
    date: ''
  });

  // Configuration
  const years = Array.from({ length: 11 }, (_, i) => (2025 + i).toString());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Logic to handle "Future" dates (Simulating current date as April 2026)
  const CURRENT_YEAR = 2026;
  const CURRENT_MONTH_IDX = 3; // April (0-indexed)

  const isFuture = (year, monthName) => {
    const y = parseInt(year);
    if (y > CURRENT_YEAR) return true;
    if (y < CURRENT_YEAR) return false;
    const mIdx = months.indexOf(monthName);
    return mIdx > CURRENT_MONTH_IDX;
  };

  // Data Structure
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

  // Handlers
  const handleSaveExpense = (e) => {
    e.preventDefault();
    setShowDisbursementModal(false);
    setExpenseForm({ description: '', amount: '', date: '' });
  };

  // Derived Values (Annual Calculations)
  const totalAnnualRevenue = Object.values(revenueData[selectedYear] || {}).reduce((sum, m) => sum + m.total, 0);
  const totalAnnualDisbursement = Object.keys(disbursementData).reduce((sum, month) => sum + disbursementData[month].amount, 0);

  const getDaysInMonth = (monthName) => {
    const monthIndex = months.indexOf(monthName);
    return new Date(selectedYear, monthIndex + 1, 0).getDate();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EAEFF9] via-[#FFFFFF] to-[#D9E2F3] flex flex-col font-sans text-black">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#4475C4]/90 text-white px-12 py-6 flex items-center justify-between w-full shadow-2xl">
        <div className="flex items-center">
          <h1 className="text-3xl font-black italic border-r-2 border-white/30 pr-6 mr-6 tracking-tighter uppercase">DANLOG</h1>
          <span className="text-2xl font-light opacity-80">Financial <span className="font-bold italic">Dashboard</span></span>
        </div>
      </header>

      <div className="p-12 flex-1 max-w-[1600px] mx-auto w-full">
        {/* YEAR SELECTION FILTER */}
        <div className="mb-10 flex gap-4 items-center">
          <div className="flex bg-white border-2 border-[#4475C4] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-3 font-black text-[#4475C4] uppercase text-xs border-r border-[#4475C4]/20 flex items-center">Year</div>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)} 
              className="px-8 py-3 font-bold text-[#4475C4] text-lg outline-none bg-transparent cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <Link href="/" className="ml-auto">
            <button className="bg-[#4475C4] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-[#355ea3] transition-all">← Back</button>
          </Link>
        </div>

        {/* TOP CARDS (ANNUAL SUMMARY) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white flex flex-col min-h-[220px]">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6"><span className="text-lg font-black text-green-600">₱</span></div>
            <p className="text-gray-500 font-black text-[10px] uppercase opacity-60 tracking-widest">Annual Revenue ({selectedYear})</p>
            <p className="text-5xl font-black text-green-600">₱{totalAnnualRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white flex flex-col min-h-[220px]">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-6"><span className="text-lg font-black text-red-600">₱</span></div>
            <p className="text-gray-500 font-black text-[10px] uppercase opacity-60 tracking-widest">Annual Disbursement</p>
            <p className="text-5xl font-black text-red-500">₱{totalAnnualDisbursement.toLocaleString()}</p>
            <button onClick={() => setShowDisbursementModal(true)} className="mt-auto bg-red-500 text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-colors shadow-lg">Log New Expense</button>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white flex flex-col min-h-[220px]">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6"><span className="text-lg font-black text-[#4475C4]">₱</span></div>
            <p className="text-[#4475C4] font-black text-[10px] uppercase opacity-60 tracking-widest">Net Profit</p>
            <p className="text-5xl font-black text-[#4475C4]">₱{(totalAnnualRevenue - totalAnnualDisbursement).toLocaleString()}</p>
            <div className="mt-auto pt-6 border-t border-gray-100 text-center"><span className="text-[10px] font-bold text-gray-300 uppercase italic">Financial Year Performance</span></div>
          </div>
        </div>

        {/* MONTHLY BREAKDOWN TABLE */}
        <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white mb-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black uppercase italic tracking-widest text-[#4475C4]">Monthly Breakdown</h3>
            <span className="bg-[#4475C4]/10 text-[#4475C4] px-4 py-1 rounded-full text-[10px] font-black uppercase">Click Month for Daily Log</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#4475C4]/20 text-[10px] uppercase font-black text-[#4475C4]">
                  <th className="text-left py-4 px-4">Month</th>
                  <th className="text-right py-4 px-4">Revenue</th>
                  <th className="text-right py-4 px-4 text-red-500">Disbursement</th>
                  <th className="text-right py-4 px-4 text-green-600">Net Profit</th>
                  <th className="text-right py-4 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {months.map((month) => {
                  const rowIsFuture = isFuture(selectedYear, month);
                  const rev = revenueData[selectedYear]?.[month]?.total || 0;
                  const exp = disbursementData[month]?.amount || 0;
                  
                  return (
                    <tr 
                      key={month} 
                      onClick={() => !rowIsFuture && setActivePopUpMonth(month)}
                      className={`group border-b border-gray-100 transition-all ${rowIsFuture ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-[#4475C4]/5'}`}
                    >
                      <td className="py-6 px-4 font-black text-gray-700 text-lg group-hover:text-[#4475C4]">{month}</td>
                      <td className="text-right py-6 px-4 font-bold text-green-600">₱{rev.toLocaleString()}</td>
                      <td className="text-right py-6 px-4 font-bold text-red-500">₱{exp.toLocaleString()}</td>
                      <td className="text-right py-6 px-4 font-bold text-[#4475C4]">₱{(rev - exp).toLocaleString()}</td>
                      <td className="text-right py-6 px-4 italic font-black text-[10px] text-gray-300 group-hover:text-[#4475C4]">
                        {rowIsFuture ? '—' : 'VIEW TIMELINE →'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- DAILY BREAKDOWN MODAL --- */}
      {activePopUpMonth && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-12">
          <div className="absolute inset-0 bg-[#4475C4]/20 backdrop-blur-xl" onClick={() => setActivePopUpMonth(null)}></div>
          <div className="relative bg-white w-full max-w-5xl h-[90vh] sm:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
            <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter">{activePopUpMonth} <span className="text-[#4475C4]">{selectedYear} Timeline</span></h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-1">Daily Transactions Log</p>
              </div>
              <button onClick={() => setActivePopUpMonth(null)} className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-gray-400 hover:bg-red-500 hover:text-white transition-all">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 sm:p-10">
              <div className="space-y-3 pb-10">
                {[...Array(getDaysInMonth(activePopUpMonth))].map((_, i) => {
                  const day = i + 1;
                  const dailyRev = revenueData[selectedYear][activePopUpMonth]?.daily || 0;
                  const dateStr = `${activePopUpMonth} ${day}, ${selectedYear}`;
                  const dailyExpenses = disbursementItems.filter(item => item.date === dateStr);
                  const totalExp = dailyExpenses.reduce((s, item) => s + item.amount, 0);
                  const net = dailyRev - totalExp;

                  return (
                    <div key={day} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-all group">
                      <div className="flex items-center gap-4 w-full md:w-32 shrink-0">
                        <span className="text-3xl font-black text-gray-200 group-hover:text-[#4475C4] transition-colors">{day.toString().padStart(2, '0')}</span>
                        <div className="h-10 w-[2px] bg-gray-100"></div>
                        <span className="text-[15px] font-black text-gray-400 uppercase leading-none">DAY<br/>INFO</span>
                      </div>
                      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full">
                        <div className="w-full md:w-40">
                          <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Gross Revenue</p>
                          <p className="text-xl font-black text-green-600">₱{dailyRev.toLocaleString()}</p>
                        </div>
                        <div className="flex-1">
                           <p className="text-[14px] font-black text-gray-400 uppercase mb-1">Expenses</p>
                           <div className="flex flex-wrap gap-2">
                             {dailyExpenses.length > 0 ? dailyExpenses.map((exp, idx) => (
                               <div key={idx} className="bg-red-50 px-3 py-1.5 rounded-lg flex items-center gap-3 border border-red-100">
                                 <span className="text-[10px] font-bold text-gray-700">{exp.description}</span>
                                 <span className="text-[10px] font-black text-red-600">-₱{exp.amount}</span>
                               </div>
                             )) : <span className="text-[10px] font-bold text-gray-300 italic">No expenses</span>}
                           </div>
                        </div>
                        <div className="w-full md:w-40 md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8">
                          <p className="text-[9px] font-black text-gray-400 uppercase mb-1">Daily Net</p>
                          <p className={`text-xl font-black ${net < 0 ? 'text-red-500' : 'text-gray-900'}`}>₱{net.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DISBURSEMENT MODAL */}
      {showDisbursementModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-3xl font-black italic text-[#4475C4] mb-2 uppercase tracking-tighter">Log Disbursement</h2>
            <form onSubmit={handleSaveExpense} className="space-y-4 mb-8">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Description</label>
                  <input required type="text" placeholder="e.g. 4 boxes of Detergent" value={expenseForm.description} onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none font-bold focus:ring-2 ring-[#4475C4]/20 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Amount (₱)</label>
                  <input required type="number" placeholder="0.00" value={expenseForm.amount} onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none font-bold focus:ring-2 ring-[#4475C4]/20 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Date</label>
                  <input required type="text" placeholder="April 15, 2026" value={expenseForm.date} onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl border-none outline-none font-bold focus:ring-2 ring-[#4475C4]/20 transition-all" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowDisbursementModal(false)} className="flex-1 py-4 font-black uppercase text-xs text-gray-400 hover:text-red-500 transition-colors">Cancel</button>
                  <button type="submit" className="flex-[2] bg-[#4475C4] text-white px-8 py-4 rounded-xl font-black uppercase text-xs shadow-lg hover:bg-[#355ea3] active:scale-95 transition-all">Save Expense</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}