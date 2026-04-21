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
  const [disbursementItems, setDisbursementItems] = useState([]);
  const [disbursementData, setDisbursementData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 2. CONSTANTS & DATA
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

  // const revenueData = {
  //   2026: {
  //     January: { daily: 1280, total: 38400 },
  //     February: { daily: 1450, total: 40600 },
  //     March: { daily: 1720, total: 51600 },
  //     April: { daily: 1560, total: 46800 },
  //     May: { daily: 0, total: 0 }, June: { daily: 0, total: 0 }, July: { daily: 0, total: 0 },
  //     August: { daily: 0, total: 0 }, September: { daily: 0, total: 0 }, October: { daily: 0, total: 0 },
  //     November: { daily: 0, total: 0 }, December: { daily: 0, total: 0 },
  //   }
  // };

  const transformData = (apiData: any) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disbursement`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(expenseForm)});
    setExpenseForm({ name: '', amount: '', transaction_date: '' });
  };

  const getDaysInMonth = (monthName) => {
    const monthIndex = months.indexOf(monthName);
    return new Date(selectedYear, monthIndex + 1, 0).getDate();
  };

  // 4. CALCULATIONS
  const totalAnnualRevenue = Object.values(revenueData).reduce((sum, month) => sum + month.amount, 0);


  const totalAnnualDisbursement = Object.keys(disbursementData).reduce((sum, month) => sum + disbursementData[month].amount, 0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disbursement/total/year?year=${selectedYear}`);
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/total/year?year=${selectedYear}`);
        const data = await res.json();
        const data2 = await res2.json();

        const transformed = transformData(data);
        const transformedRev = transformData(data2);

        setDisbursementData(transformed);
        setRevenueData(transformedRev);
        setIsLoading(false);

      }
      catch (error) {console.error("Error fetching disbursement data:", error);}
    }
    fetchData();

  }, [selectedYear]);

  return (
    <main className="h-auto bg-gradient-to-br from-[#EAEFF9] via-[#FFFFFF] to-[#D9E2F3] flex flex-col font-sans text-black relative">
      
      {/* BACKGROUND VISUAL LAYER */}
    <div 
        className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M100 100l-100 -100h200z' fill='%234475C4'/%3E%3C/svg%3E")`, 
          backgroundSize: '150px' 
        }}
      ></div>
      {/* CONTENT */}
      <div className="p-12 custom-scrollbar space-y-8 relative z-10">
        
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

        {/* SUMMARY CARDS (Component) */}
        <FinancialSummary 
          revenue={totalAnnualRevenue} 
          disbursement={totalAnnualDisbursement} 
          onLogExpense={() => setShowDisbursementModal(true)}
          isLoading={isLoading}
        />

        {/* MONTHLY BREAKDOWN TABLE */}
        <div className="max-w-[1700px] mx-auto w-full pb-20">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-[15px] font-[1000] uppercase tracking-[0.4em] text-[#4475C4]">Monthly Breakdown</h2>
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
                  const rev = revenueData[month]?.amount || 0;
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

      {/* MODALS */}
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