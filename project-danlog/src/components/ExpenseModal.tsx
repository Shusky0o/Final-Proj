// @ts-nocheck
import React from 'react';

export const ExpenseModal = ({ isOpen, onClose, form, setForm, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop matching NewOrderModal */}
      <div 
        className="absolute inset-0 bg-[#1A2B47]/40 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] w-full max-w-xl overflow-hidden border border-gray-100 transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="bg-white px-10 pt-10 pb-6 border-b border-gray-50 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
              <h2 className="text-2xl font-black uppercase tracking-[0.15em] text-[#1A2B47]">Log Expense</h2>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-3">System Registry</p>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase text-red-500 tracking-widest opacity-60 mb-1">Status</span>
            <div className="bg-red-50 px-4 py-1.5 rounded-xl border border-red-100">
              <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Disbursement</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSave} className="p-10 space-y-7">
          
          {/* Item Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Item Description</label>
            <input 
              required 
              type="text" 
              placeholder="e.g. 4 boxes of Detergent" 
              value={form.name} 
              onChange={(e) => setForm({...form, name: e.target.value})} 
              autoFocus
              className="w-full bg-gray-50/50 border-2 border-transparent p-5 rounded-2xl focus:outline-none focus:border-red-500/20 focus:bg-white transition-all text-xl font-bold text-[#1A2B47] placeholder:text-gray-200" 
            />
          </div>

          {/* Transaction Date */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Transaction Date</label>
            <input 
              required 
              type="date" 
              value={form.transaction_date} 
              onChange={(e) => setForm({...form, transaction_date: e.target.value})} 
              className="w-full bg-gray-50/50 border-2 border-transparent p-5 rounded-2xl focus:outline-none focus:border-red-500/20 focus:bg-white transition-all font-bold text-[#1A2B47]" 
            />
          </div>

          {/* Amount Box - Matching the Blue Billable box style but in Red */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Total Expense Amount</label>
            <div className="relative bg-white border-2 border-red-500 rounded-3xl p-6 flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <p className="text-[11px] font-black text-red-500 uppercase tracking-wider">Philippine Peso</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-red-500">₱</span>
                <input 
                  required
                  type="number"
                  placeholder="0.00" 
                  value={form.amount}
                  onChange={(e) => setForm({...form, amount: parseFloat(e.target.value) || 0})}
                  className="bg-transparent text-4xl font-black outline-none w-32 text-right text-[#1A2B47] placeholder:text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-all"
            >
              Discard Entry
            </button>
            <button 
              type="submit" 
              className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-slate-900/30 hover:bg-red-600 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};