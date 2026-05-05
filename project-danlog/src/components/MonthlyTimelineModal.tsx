// @ts-nocheck
import React from 'react';
import { useEffect, useState } from 'react';
import { getMonthNumber } from '../lib/dateFormatter';

export const MonthlyTimelineModal = ({ 
  activeMonth, 
  selectedYear, 
  onClose, 
  getDaysInMonth, 
  revenueData
}) => {
  const [disbursementItems, setDisbursementItems] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeMonth) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disbursement/month?month=${getMonthNumber(activeMonth)}&year=${selectedYear}`);
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/daily-orders?month=${getMonthNumber(activeMonth)}&year=${selectedYear}`);

        const data = await res.json();
        const data2 = await res2.json();

        const formatted = formatDisbursements(data);

        setApiData(data2);
        setDisbursementItems(formatted);
      }
      catch (error) {
        console.error("Error fetching disbursement data:", error);
      }
    };

    fetchData();
  }, [activeMonth]);

  if (!activeMonth) return null;

  const formatDisbursements = (data: any[]) => {
    return data.map(item => {
      const dateObj = new Date(item.transaction_date);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      return {
        date: formattedDate,
        description: item.name,
        amount: item.amount,
      };
    });
  };

  const daysInMonth = getDaysInMonth(activeMonth);
  const dailyTotalsMap = {};
  for (let d = 1; d <= daysInMonth; d++) {
    dailyTotalsMap[d] = 0;
  }

  apiData?.data?.forEach((item) => {
    const day = new Date(item.day).getDate();
    dailyTotalsMap[day] = Number(item.total);
  });

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-[#1A2B47]/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#F8FAFC] w-full max-w-6xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
        
        {/* THEMED HEADER - Industrial Style */}
        <div className="p-12 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="w-2.5 h-16 bg-[#4475C4]"></div>
            <div>
              <h2 className="text-5xl font-[1000] text-[#1A2B47] uppercase tracking-tighter leading-none">
                {activeMonth} <span className="text-[#4475C4]">{selectedYear}</span>
              </h2>
              <p className="text-[12px] font-black text-[#4475C4] uppercase tracking-[0.5em] mt-2">Daily Audit Ledger</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="group flex items-center gap-4 bg-slate-50 border border-slate-200 px-8 py-4 rounded-2xl hover:bg-red-500 hover:border-red-500 transition-all shadow-sm"
          >
            <span className="text-[12px] font-black text-[#1A2B47] group-hover:text-white uppercase tracking-widest transition-colors">Close Record</span>
            <span className="text-2xl font-bold text-[#4475C4] group-hover:text-white transition-colors">✕</span>
          </button>
        </div>

        {/* BODY - No Gray Text */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-6">
          {[...Array(getDaysInMonth(activeMonth))].map((_, i) => {
            const day = i + 1;
            const dailyRev = dailyTotalsMap[day];
            const dateStr = `${activeMonth} ${day}, ${selectedYear}`;
            const dailyExpenses = disbursementItems.filter(item => item.date === dateStr);
            const totalExp = dailyExpenses.reduce((s, item) => s + item.amount, 0);
            const net = dailyRev - totalExp;

            return (
              <div key={day} className="bg-white rounded-[1.5rem] p-10 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-12 transition-all group">
                
                {/* Date Side - Theme Blue */}
                <div className="flex items-center gap-8 w-full md:w-44 shrink-0">
                  <span className="text-6xl font-[1000] text-[#4475C4]">
                    {day.toString().padStart(2, '0')}
                  </span>
                  <div className="h-16 w-[3px] bg-[#4475C4]/20"></div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                  {/* Revenue Column */}
                  <div>
                    <p className="text-[12px] font-black text-[#1A2B47] uppercase mb-3 tracking-widest">Inflow Revenue</p>
                    <p className="text-3xl font-[1000] text-emerald-600">₱{dailyRev.toLocaleString()}</p>
                  </div>
                  
                  {/* Disbursements Column - Red Theme Kept */}
                  <div className="md:border-l md:border-r border-slate-100 px-6">
                    <p className="text-[12px] font-black text-[#1A2B47] uppercase mb-3 tracking-widest">Disbursements</p>
                    <div className="flex flex-wrap gap-2">
                      {dailyExpenses.length > 0 ? dailyExpenses.map((exp, idx) => (
                        <div key={idx} className="bg-red-50 px-4 py-2 rounded-xl border border-red-100 flex items-center gap-3 group hover:bg-red-100 transition-colors">
                          <div className="flex flex-col">
                            <span className="text-[14px] font-black text-red-600 tracking-tighter">₱{exp.amount.toLocaleString()}</span>
                            <span className="text-[10px] font-black text-[#1A2B47] uppercase tracking-widest">{exp.description}</span>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedExpenseId(exp.description);
                              setShowModal(true);
                            }}
                            className="p-1 text-slate-300 hover:text-red-500 transition-colors shrink-0"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
                            </svg>
                          </button>
                        </div>
                      )) : <span className="text-[12px] font-black text-[#4475C4] uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">No Outbound Record</span>}
                    </div>
                  </div>

                  {/* Net Column */}
                  <div className="md:text-right">
                    <p className="text-[12px] font-black text-[#1A2B47] uppercase mb-3 tracking-widest">Daily Position</p>
                    <p className={`text-4xl font-[1000] ${net < 0 ? 'text-red-500' : 'text-[#1A2B47]'}`}>
                      ₱{net.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* STATIC DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-[#1A2B47]/40 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-white w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-black text-[#1A2B47] mb-2 uppercase tracking-tight">
                Delete Disbursement
              </h3>
              <p className="text-gray-500 font-black mb-8 uppercase tracking-widest">
                Are you sure you want to delete <span className="text-[#4475C4]">{selectedExpenseId}</span>? This action cannot be undone.
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-black uppercase tracking-widest bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4475C4; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #F1F5F9; }
      `}</style>
    </div>
  );
};