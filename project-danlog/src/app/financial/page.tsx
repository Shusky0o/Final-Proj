// @ts-nocheck
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FinancialAnalysis() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);

  // Sample Revenue Data - Daily/Monthly
  const revenueData = {
    2026: {
      January: { daily: 1280, total: 38400, loads: 32 },
      February: { daily: 1450, total: 40600, loads: 34 },
      March: { daily: 1720, total: 51600, loads: 43 },
      April: { daily: 1560, total: 46800, loads: 39 },
      May: { daily: 1680, total: 50400, loads: 42 },
      June: { daily: 1890, total: 56700, loads: 47 },
      July: { daily: 2100, total: 63000, loads: 52 },
      August: { daily: 1950, total: 58500, loads: 48 },
      September: { daily: 1720, total: 51600, loads: 43 },
      October: { daily: 1840, total: 55200, loads: 46 },
      November: { daily: 2050, total: 61500, loads: 51 },
      December: { daily: 2200, total: 66000, loads: 55 },
    }
  };

  const disbursementData = {
    'January': { amount: 15000, items: 8 },
    'February': { amount: 16200, items: 9 },
    'March': { amount: 18900, items: 10 },
    'April': { amount: 17500, items: 9 },
    'May': { amount: 19200, items: 11 },
    'June': { amount: 21500, items: 12 },
    'July': { amount: 23800, items: 13 },
    'August': { amount: 22100, items: 12 },
    'September': { amount: 19500, items: 10 },
    'October': { amount: 20900, items: 11 },
    'November': { amount: 23200, items: 13 },
    'December': { amount: 24900, items: 14 },
  };

  const disbursementItems = [
    { date: 'March 1, 2026', description: '4 box of Detergent', amount: 760 },
    { date: 'March 6, 2026', description: '3 tanks of Gasoline', amount: 2861 },
    { date: 'March 19, 2026', description: '5 bags of plastics and masking tape', amount: 312 },
    { date: 'March 22, 2026', description: '4 box of Detergent', amount: 760 },
    { date: 'March 31, 2026', description: '2 baskets', amount: 140 },
  ];

  const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const allMonthsData = Object.values(revenueData[selectedYear]);
  const totalAnnualRevenue = allMonthsData.reduce((sum, month) => sum + month.total, 0);
  const totalAnnualDisbursement = Object.values(disbursementData).reduce((sum, month) => sum + month.amount, 0);

  const currentMonthRevenue = selectedMonth === 'All' ? 
    { daily: (totalAnnualRevenue / 365).toFixed(0), total: totalAnnualRevenue, loads: allMonthsData.reduce((sum, m) => sum + m.loads, 0) } :
    revenueData[selectedYear][selectedMonth];

  const currentMonthDisbursement = selectedMonth === 'All' ? totalAnnualDisbursement : disbursementData[selectedMonth]?.amount || 0;
  const currentMonthNetRevenue = currentMonthRevenue.total - currentMonthDisbursement;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EAEFF9] via-[#FFFFFF] to-[#D9E2F3] flex flex-col font-sans text-black">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#4475C4]/90 text-white px-12 py-6 flex items-center justify-between w-full shadow-2xl border-b border-white/20">
        <div className="flex items-center">
          <h1 className="text-3xl font-black italic border-r-2 border-white/30 pr-6 mr-6 tracking-tighter uppercase">DANLOG</h1>
          <span className="text-2xl font-light opacity-80">Financial Analysis & <span className="font-bold italic">Disbursement</span></span>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm font-bold uppercase">
          MARCH 15, 2026
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="p-12 flex-1">
        {/* FILTERS */}
        <div className="mb-10 flex gap-8 items-center">
          <div className="flex flex-col gap-2">
            <label className="text-[#4475C4] font-black text-xs uppercase tracking-widest">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border-2 border-[#4475C4] rounded-xl px-6 py-3 font-bold text-[#4475C4] cursor-pointer hover:bg-[#4475C4]/10 transition-all uppercase"
            >
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#4475C4] font-black text-xs uppercase tracking-widest">Month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white border-2 border-[#4475C4] rounded-xl px-6 py-3 font-bold text-[#4475C4] cursor-pointer hover:bg-[#4475C4]/10 transition-all uppercase"
            >
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>
          </div>

          <Link href="/" className="ml-auto">
            <button className="bg-[#4475C4] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-[#3A5FA5] transition-all shadow-lg hover:shadow-xl">
              ← Back
            </button>
          </Link>
        </div>

        {/* THREE-COLUMN LAYOUT - ALIGNED HEIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* REVENUE */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-8 bg-[#4475C4] rounded-full"></div>
              <h2 className="text-xl font-black uppercase italic tracking-widest text-[#4475C4]">Revenue</h2>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white flex-1 min-h-[300px] flex flex-col justify-between">
              <div>
                <p className="text-[#4475C4] font-black text-xs tracking-widest uppercase mb-4 opacity-60">Daily Average</p>
                <p className="text-5xl font-black text-black tracking-tighter">₱ {parseInt(currentMonthRevenue.daily).toLocaleString()}</p>
              </div>
              <div className="mt-auto pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-bold uppercase text-[10px]">Total {selectedMonth === 'All' ? 'Annual' : selectedMonth}</span>
                  <span className="text-black font-black text-lg">₱ {currentMonthRevenue.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* DISBURSEMENT */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-8 bg-red-500 rounded-full"></div>
              <h2 className="text-xl font-black uppercase italic tracking-widest text-red-500">Disbursement</h2>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white flex-1 min-h-[300px] flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-black text-red-600">₱</span>
                </div>
                <p className="text-red-600 font-black text-xs tracking-widest uppercase mb-4 opacity-60">Total Disbursement</p>
                <p className="text-4xl font-black text-black tracking-tighter">₱ {currentMonthDisbursement.toLocaleString()}</p>
              </div>
              <button
                onClick={() => setShowDisbursementModal(true)}
                className="w-full mt-8 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:shadow-lg active:scale-[0.98] transition-all"
              >
                View Details
              </button>
            </div>
          </div>

          {/* NET REVENUE */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-8 bg-green-500 rounded-full"></div>
              <h2 className="text-xl font-black uppercase italic tracking-widest text-green-600">Net Revenue</h2>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white flex-1 min-h-[300px] flex flex-col justify-between">
              <div>
                <p className="text-green-600 font-black text-xs tracking-widest uppercase mb-4 opacity-60">Profit</p>
                <p className="text-5xl font-black tracking-tighter text-green-600">₱ {currentMonthNetRevenue.toLocaleString()}</p>
              </div>
              <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-center">
                 <span className="text-[10px] font-bold text-gray-300 uppercase italic">Financial Summary Generated</span>
              </div>
            </div>
          </div>
        </div>

        {/* MONTHLY BREAKDOWN TABLE */}
        <div className="bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white">
          <h3 className="text-xl font-black uppercase italic tracking-widest text-[#4475C4] mb-8">Monthly Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#4475C4]/20">
                  <th className="text-left py-4 px-4 font-black text-[#4475C4] uppercase text-xs tracking-widest">Month</th>
                  <th className="text-right py-4 px-4 font-black text-[#4475C4] uppercase text-xs tracking-widest">Revenue</th>
                  <th className="text-right py-4 px-4 font-black text-red-600 uppercase text-xs tracking-widest">Disbursement</th>
                  <th className="text-right py-4 px-4 font-black text-green-600 uppercase text-xs tracking-widest">Net Profit</th>
                </tr>
              </thead>
              <tbody>
                {months.filter(m => m !== 'All').map((month) => (
                  <tr key={month} className="border-b border-gray-200 hover:bg-[#4475C4]/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-gray-800">{month}</td>
                    <td className="text-right py-4 px-4 font-bold text-[#4475C4]">₱ {revenueData[selectedYear][month].total.toLocaleString()}</td>
                    <td className="text-right py-4 px-4 font-bold text-red-600">₱ {disbursementData[month].amount.toLocaleString()}</td>
                    <td className="text-right py-4 px-4 font-bold text-green-600">₱ {(revenueData[selectedYear][month].total - disbursementData[month].amount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DISBURSEMENT MODAL */}
      {showDisbursementModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[90vh]">
            <div className="bg-[#4475C4] p-6 text-white flex items-center gap-4">
              <button onClick={() => setShowDisbursementModal(false)} className="text-2xl font-bold">←</button>
              <h2 className="text-xl font-bold tracking-tight">Disbursement Information</h2>
            </div>

            <div className="p-8 overflow-y-auto">
              <div className="flex flex-col items-center mb-8">
                <div className="w-20 h-20 bg-[#B91C1C] rounded-full flex items-center justify-center shadow-lg mb-4">
                  <span className="text-3xl font-black text-white">-₱</span>
                </div>
                <h3 className="text-5xl font-black text-black tracking-tighter">₱ -{currentMonthDisbursement.toLocaleString()}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Total Disbursement</p>
              </div>

              <div className="space-y-4 border-b border-gray-100 pb-8 mb-8">
                <div className="flex flex-col gap-1">
                  <label className="text-md font-black text-black">Item/Supply Name</label>
                  <input type="text" placeholder='e.g., "5L Gasoline"' className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 italic text-gray-400 outline-none focus:border-[#4475C4]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-md font-black text-black">Amount</label>
                  <input type="text" placeholder='Enter amount (e.g., 140)' className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 italic text-gray-400 outline-none focus:border-[#4475C4]" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setShowDisbursementModal(false)} className="px-8 py-2 rounded-full border-2 border-gray-300 font-black text-black uppercase text-xs">Cancel</button>
                  <button className="px-8 py-2 rounded-full bg-[#4475C4] text-white font-black uppercase text-xs shadow-md">Log Expense</button>
                </div>
              </div>

              <div className="space-y-3">
                {disbursementItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl">
                    <span className="text-[11px] font-bold text-gray-400 w-24">{item.date}</span>
                    <span className="flex-1 text-center font-bold text-gray-700 text-sm px-2">{item.description}</span>
                    <span className="text-md font-black text-red-600 w-24 text-right">-₱{item.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}