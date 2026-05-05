// @ts-nocheck
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FinancialSummary } from '../../components/FinancialSummary';
import { ExpenseModal } from '../../components/ExpenseModal';
import { MonthlyTimelineModal } from '../../components/MonthlyTimelineModal';

export default function FinancialAnalysis() {
  // 1. STATE MANAGEMENT
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [activePopUpMonth, setActivePopUpMonth] = useState(null);
  const [expenseForm, setExpenseForm] = useState({
    name: '',
    amount: '',
    transaction_date: ''
  });
  const [disbursementData, setDisbursementData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 2. CONSTANTS
  const years = Array.from({ length: 11 }, (_, i) => (2025 + i).toString());
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const CURRENT_YEAR = 2026;
  const CURRENT_MONTH_IDX = 3; // April

  // 3. LOGIC HELPERS
  const isFuture = (year, monthName) => {
    const y = parseInt(year);
    if (y > CURRENT_YEAR) return true;
    if (y < CURRENT_YEAR) return false;
    const mIdx = months.indexOf(monthName);
    return mIdx > CURRENT_MONTH_IDX;
  };

  const transformData = (apiData: any) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const result: Record<string, { amount: number }> = {};
    apiData.monthly.forEach((item: any) => {
      const monthName = monthNames[item.month - 1];
      result[monthName] = { amount: item.total };
    });
    return result;
  };

  const handleSaveExpense = async (e) => {
    e.preventDefault();
    setShowDisbursementModal(false);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disbursement`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(expenseForm)});
    setExpenseForm({ name: '', amount: '', transaction_date: '' });
  };

  const getDaysInMonth = (monthName) => {
    const monthIndex = months.indexOf(monthName);
    return new Date(selectedYear, monthIndex + 1, 0).getDate();
  };

  const totalAnnualRevenue = Object.values(revenueData).reduce((sum, month) => sum + month.amount, 0);
  const totalAnnualDisbursement = Object.values(disbursementData).reduce((sum, month) => sum + month.amount, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disbursement/total/year?year=${selectedYear}`);
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/total/year?year=${selectedYear}`);
        const data = await res.json();
        const data2 = await res2.json();
        setDisbursementData(transformData(data));
        setRevenueData(transformData(data2));
        setIsLoading(false);
      } catch (error) { console.error("Error fetching data:", error); }
    }
    fetchData();
  }, [selectedYear]);

  return (
    <main className="h-auto bg-gradient-to-br from-[#EAEFF9] via-[#FFFFFF] to-[#D9E2F3] flex flex-col font-sans text-black relative">
      
      {/* HEADER SECTION (Left untouched as requested) */}
      <div className="p-12 custom-scrollbar space-y-8 relative z-10">
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

        <FinancialSummary 
          revenue={totalAnnualRevenue} 
          disbursement={totalAnnualDisbursement} 
          onLogExpense={() => setShowDisbursementModal(true)}
          isLoading={isLoading}
        />

        {/* UPGRADED MONTHLY BREAKDOWN SECTION */}
        <div className="max-w-[1700px] mx-auto w-full pb-20">
          <div className="flex items-center gap-3 mb-8 px-4">
            <div className="w-1.5 h-5 bg-[#4475C4]"></div>
            <h2 className="text-[13px] font-[1000] uppercase tracking-[0.4em] text-slate-800">Monthly Performance Ledger</h2>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="py-6 pl-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Reporting Period</th>
                  <th className="py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Gross Revenue</th>
                  <th className="py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Disbursements</th>
                  <th className="py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Net Profit</th>
                  <th className="py-6 pr-10 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {months.map((month) => {
                  const rowIsFuture = isFuture(selectedYear, month);
                  const rev = revenueData[month]?.amount || 0;
                  const exp = disbursementData[month]?.amount || 0;
                  const net = rev - exp;
                  
                  return (
                    <tr 
                      key={month} 
                      onClick={() => !rowIsFuture && setActivePopUpMonth(month)}
                      className={`group transition-all ${
                        rowIsFuture 
                        ? 'opacity-30 cursor-not-allowed bg-slate-50/10' 
                        : 'cursor-pointer hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-6 pl-10">
                        <div className="flex items-center gap-4">
                          <div className={`w-1 h-5 rounded-full transition-all ${rowIsFuture ? 'bg-slate-200' : 'bg-slate-100 group-hover:bg-[#4475C4]'}`}></div>
                          <span className="font-black text-slate-900 uppercase tracking-tighter text-lg">{month}</span>
                        </div>
                      </td>
                      <td className="py-6 text-right font-black text-emerald-600">₱{rev.toLocaleString()}</td>
                      <td className="py-6 text-right font-black text-red-500">₱{exp.toLocaleString()}</td>
                      <td className={`py-6 text-right font-black ${net >= 0 ? 'text-slate-900' : 'text-red-700'}`}>
                        ₱{net.toLocaleString()}
                      </td>
                      <td className="py-6 pr-10 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <span className="text-[10px] font-black uppercase text-slate-300 group-hover:text-[#4475C4] tracking-[0.2em] transition-colors">
                             {rowIsFuture ? 'Locked' : 'Open Log'}
                          </span>
                          {!rowIsFuture && (
                            <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#4475C4] group-hover:text-white transition-all">
                              <span className="text-xs">→</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ExpenseModal 
        isOpen={showDisbursementModal} 
        onClose={() => setShowDisbursementModal(false)}
        form={expenseForm}
        setForm={setExpenseForm}
        onSave={handleSaveExpense}
      />

      <MonthlyTimelineModal 
        activeMonth={activePopUpMonth}
        selectedYear={selectedYear}
        onClose={() => setActivePopUpMonth(null)}
        getDaysInMonth={getDaysInMonth}
        revenueData={revenueData}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  );
}