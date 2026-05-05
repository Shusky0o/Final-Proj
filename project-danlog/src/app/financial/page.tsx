// @ts-nocheck
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { FinancialSummary } from '../../components/FinancialSummary';
import { ExpenseModal } from '../../components/ExpenseModal';
import { MonthlyTimelineModal } from '../../components/MonthlyTimelineModal';

export default function FinancialAnalysis() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [activePopUpMonth, setActivePopUpMonth] = useState(null);
  const [expenseForm, setExpenseForm] = useState({ name: '', amount: '', transaction_date: '' });
  const [disbursementData, setDisbursementData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      body: JSON.stringify(expenseForm)
    });
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

  const chartData = months.map(m => ({
    name: m.substring(0, 3).toUpperCase(),
    revenue: revenueData[m]?.amount || 0,
    expense: disbursementData[m]?.amount || 0
  }));

  return (
    <main className="min-h-screen bg-[#F0F4FA] flex flex-col font-sans text-slate-900 relative">
      
      {/* HEADER: FISCAL YEAR (LEFT) & DASHBOARD BUTTON (RIGHT) */}
      <div className="p-12 space-y-8 relative z-10">
        <div className="max-w-[1700px] mx-auto w-full flex justify-between items-center">
          
          {/* Fiscal Year Selector (Back to Left) */}
          <div className="flex bg-white border-2 border-white rounded-2xl overflow-hidden shadow-lg">
            <div className="px-6 py-3 font-black text-[#4475C4] uppercase text-[10px] tracking-widest border-r border-slate-50 flex items-center bg-slate-50/50">
              Fiscal Year
            </div>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)} 
              className="px-8 py-3 font-black text-[#1A2B47] text-lg outline-none bg-transparent cursor-pointer hover:bg-slate-50 transition-colors"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          {/* Dashboard Button (Kept on Right) */}
          <Link href="/">
            <button className="bg-white border-2 border-[#4475C4] text-[#4475C4] px-8 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-[#4475C4] hover:text-white transition-all shadow-lg active:scale-95">
              ← Dashboard
            </button>
          </Link>
        </div>

        {/* FINANCIAL SUMMARY CARDS */}
        <FinancialSummary 
          revenue={totalAnnualRevenue} 
          disbursement={totalAnnualDisbursement} 
          onLogExpense={() => setShowDisbursementModal(true)}
          isLoading={isLoading}
        />

        {/* DATA VISUALIZATION CHART */}
        <div className="max-w-[1700px] mx-auto w-full">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-[14px] font-[1000] uppercase tracking-[0.5em] text-slate-900">Annual Performance Analytics</h2>
                <div className="w-12 h-1 bg-[#4475C4] mt-2"></div>
              </div>
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#4475C4] rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Revenue</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Expense</span>
                </div>
              </div>
            </div>

            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} 
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 900 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '16px' }}
                  />
                  <Bar dataKey="revenue" fill="#4475C4" radius={[6, 6, 0, 0]} barSize={24} />
                  <Bar dataKey="expense" fill="#EF4444" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* MONTHLY PERFORMANCE GRID */}
        <div className="max-w-[1700px] mx-auto w-full pb-32">
          <div className="flex items-center gap-4 mb-10 px-4">
             <h2 className="text-[14px] font-[1000] uppercase tracking-[0.4em] text-slate-900">Audit Ledger Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {months.map((month, idx) => {
              const rowIsFuture = isFuture(selectedYear, month);
              const rev = revenueData[month]?.amount || 0;
              const exp = disbursementData[month]?.amount || 0;
              const net = rev - exp;
              const profitMargin = rev > 0 ? ((net / rev) * 100).toFixed(0) : 0;
              
              return (
                <div 
                  key={month}
                  onClick={() => !rowIsFuture && setActivePopUpMonth(month)}
                  className={`relative bg-white rounded-3xl border-2 transition-all duration-300 group overflow-hidden ${
                    rowIsFuture 
                    ? 'opacity-40 cursor-not-allowed grayscale border-slate-100' 
                    : 'cursor-pointer border-transparent hover:border-[#4475C4] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1'
                  }`}
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <p className="text-[9px] font-black text-[#4475C4] uppercase tracking-widest mb-1">Period {(idx + 1).toString().padStart(2, '0')}</p>
                        <h3 className="text-2xl font-[1000] text-slate-900 uppercase tracking-tighter leading-none">{month}</h3>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${rowIsFuture ? 'bg-slate-200' : 'bg-emerald-500 animate-pulse'}`}></div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inflow</span>
                        <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">₱{rev.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Outflow</span>
                        <span className="text-sm font-black text-red-500 uppercase tracking-tighter">₱{exp.toLocaleString()}</span>
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex justify-between items-end">
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Net Profit</span>
                        <span className={`text-xl font-[1000] tracking-tighter ${net >= 0 ? 'text-[#4475C4]' : 'text-red-700'}`}>
                          ₱{net.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full transition-all duration-1000 ${net >= 0 ? 'bg-[#4475C4]' : 'bg-red-500'}`}
                         style={{ width: `${Math.min(Math.max(Math.abs(profitMargin), 5), 100)}%` }}
                       />
                    </div>
                    <div className="flex justify-between mt-2">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency</span>
                       <span className="text-[9px] font-black text-slate-900 uppercase">{profitMargin}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
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