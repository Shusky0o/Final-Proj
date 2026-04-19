// @ts-nocheck
import React from 'react';

export const ExpenseModal = ({ isOpen, onClose, form, setForm, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1A2B47]/60 backdrop-blur-md z-[300] flex items-center justify-center p-4">
      <div className="bg-white rounded-[3.5rem] p-12 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 border border-white">
        <h2 className="text-4xl font-[1000] text-[#1A2B47] mb-2 uppercase tracking-tighter">Log <span className="text-black-500">Expense</span></h2>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Disbursement Records</p>
        
        <form onSubmit={onSave} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[#4475C4] ml-2 tracking-widest">Item Description</label>
              <input required type="text" placeholder="e.g. 4 boxes of Detergent" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none font-black focus:bg-white focus:ring-4 ring-blue-500/10 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[#4475C4] ml-2 tracking-widest">Amount (₱)</label>
              <input required type="number" placeholder="0.00" value={form.amount} onChange={(e) => setForm({...form, amount: parseFloat(e.target.value) || 0})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none font-black focus:bg-white focus:ring-4 ring-blue-500/10 transition-all text-2xl text-red-500" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[#4475C4] ml-2 tracking-widest">Transaction Date</label>
              <input required type="date" placeholder="April 15, 2026" value={form.transaction_date} onChange={(e) => setForm({...form, transaction_date: e.target.value})} className="w-full p-5 bg-gray-50 rounded-2xl border border-gray-100 outline-none font-black focus:bg-white focus:ring-4 ring-blue-500/10 transition-all" />
            </div>
            <div className="flex gap-4 pt-6">
              <button type="button" onClick={onClose} className="flex-1 py-5 font-black uppercase text-xs text-gray-400 hover:text-red-500 transition-colors">Cancel</button>
              <button type="submit" className="flex-[2] bg-[#1A2B47] text-white px-8 py-5 rounded-[1.5rem] font-black uppercase text-xs shadow-xl hover:bg-[#4475C4] active:scale-95 transition-all tracking-widest">Save Record</button>
            </div>
        </form>
      </div>
    </div>
  );
};