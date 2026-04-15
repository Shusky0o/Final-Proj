// @ts-nocheck
import React from 'react';

export const MonthlyTimelineModal = ({ 
  activeMonth, 
  selectedYear, 
  onClose, 
  getDaysInMonth, 
  revenueData, 
  disbursementItems 
}) => {
  if (!activeMonth) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-[#1A2B47]/40 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#F8FAFC] w-full max-w-6xl h-[85vh] rounded-[3.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
        
        {/* Modal Header */}
        <div className="p-10 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-4xl font-[1000] text-[#1A2B47] uppercase tracking-tighter">
              {activeMonth} <span className="text-[#4475C4]">{selectedYear}</span>
            </h2>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1">Transaction Timeline</p>
          </div>
          <button onClick={onClose} className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center font-black text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">✕</button>
        </div>

        {/* Modal Body (Daily List) */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-4">
          {[...Array(getDaysInMonth(activeMonth))].map((_, i) => {
            const day = i + 1;
            const dailyRev = revenueData[selectedYear]?.[activeMonth]?.daily || 0;
            const dateStr = `${activeMonth} ${day}, ${selectedYear}`;
            const dailyExpenses = disbursementItems.filter(item => item.date === dateStr);
            const totalExp = dailyExpenses.reduce((s, item) => s + item.amount, 0);
            const net = dailyRev - totalExp;

            return (
              <div key={day} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-md transition-all group">
                <div className="flex items-center gap-6 w-full md:w-32 shrink-0">
                  <span className="text-4xl font-[1000] text-gray-100 group-hover:text-[#4475C4] transition-colors">
                    {day.toString().padStart(2, '0')}
                  </span>
                  <div className="h-12 w-[1px] bg-gray-100"></div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  <div>
                    <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Revenue</p>
                    <p className="text-xl font-black text-green-600">₱{dailyRev.toLocaleString()}</p>
                  </div>
                  
                  <div className="md:border-l md:border-r border-gray-50 px-2">
                    <p className="text-[10px] font-black text-gray-300 uppercase mb-1 tracking-widest">Disbursements</p>
                    <div className="flex flex-wrap gap-2">
                      {dailyExpenses.length > 0 ? dailyExpenses.map((exp, idx) => (
                        <div key={idx} className="bg-red-50 px-3 py-1 rounded-lg border border-red-100">
                          <span className="text-[10px] font-black text-red-600">₱{exp.amount}</span>
                          <span className="text-[9px] font-bold text-gray-400 ml-2 uppercase italic">{exp.description}</span>
                        </div>
                      )) : <span className="text-sm font-bold text-gray-200 italic">No expenses</span>}
                    </div>
                  </div>

                  <div className="md:text-right">
                    <p className="text-[9px] font-black text-gray-300 uppercase mb-1 tracking-widest">Net Daily</p>
                    <p className={`text-xl font-[1000] ${net < 0 ? 'text-red-500' : 'text-[#1A2B47]'}`}>
                      ₱{net.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};