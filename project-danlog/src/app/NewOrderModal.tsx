// @ts-nocheck
import React, { useEffect, useState } from 'react';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  mostRecentOrder?: any; // You can replace 'any' with a more specific type if you have one
  onSubmit?: (data: any) => void; // Callback to parent on successful submission
}

export type Order = {
  id: number;
  customer_name: string;
  total_weight: number;
  load: number;
  amount: number;
  status: string;
  created_at?: string;
}

export default function NewOrderModal({ isOpen, onClose, mostRecentOrder, onSubmit }: NewOrderModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [weight, setWeight] = useState('');
  const [loads, setLoads] = useState(1);
  const [amount, setAmount] = useState('');
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    async function init() {
      if (isOpen) {
        try {
          const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/latest`, { method: 'GET' });
          const data = await res2.json();
          const latestId = data?.id || 0;
          setOrderId(latestId + 1);
        } catch (err) {
          console.error("Failed to fetch latest ID", err);
        }
      }
    }
    init();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !weight || !amount || !loads) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      customer_name: customerName,
      total_weight: parseFloat(weight),
      load: parseInt(loads.toString()),
      amount: parseFloat(amount),
      status: "pending",
      id: orderId,
    };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      onSubmit?.(payload);
      onClose();
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#1A2B47]/40 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] w-full max-w-xl overflow-hidden border border-gray-100 transform transition-all animate-in zoom-in-95 duration-300">
        
        <div className="bg-white px-10 pt-10 pb-6 border-b border-gray-50 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#4475C4] rounded-full"></div>
              <h2 className="text-2xl font-black uppercase tracking-[0.15em] text-[#1A2B47]">New Order</h2>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-3">System Registry</p>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase text-[#4475C4] tracking-widest opacity-60 mb-1">Queue Ref</span>
            <div className="bg-gray-50 px-4 py-1.5 rounded-xl border border-gray-100">
              <span className="text-lg font-black text-[#1A2B47] font-mono">#{orderId}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-7">
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Customer Name</label>
            <input 
              type="text" 
              placeholder="Enter name here..." 
              autoFocus
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-gray-50/50 border-2 border-transparent p-5 rounded-2xl focus:outline-none focus:border-[#4475C4]/20 focus:bg-white transition-all text-xl font-bold text-[#1A2B47] placeholder:text-gray-200" 
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Total Weight</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.1" 
                  placeholder="0.0" 
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-gray-50/50 border-2 border-transparent p-5 rounded-2xl focus:outline-none focus:border-[#4475C4]/20 focus:bg-white transition-all text-center font-black text-xl text-[#1A2B47] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300">KG</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">No. of Loads</label>
              <div className="flex items-center bg-gray-50/50 rounded-2xl overflow-hidden border-2 border-transparent focus-within:border-[#4475C4]/20 focus-within:bg-white transition-all">
                <button 
                  type="button"
                  onClick={() => setLoads(Math.max(1, loads - 1))}
                  className="px-5 py-5 text-[#4475C4] hover:bg-gray-100 transition-colors font-black text-xl"
                >—</button>
                <input 
                  type="number" 
                  value={loads}
                  onChange={(e) => setLoads(parseInt(e.target.value) || 1)}
                  className="w-full bg-transparent text-center font-black text-xl text-[#1A2B47] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
                <button 
                  type="button"
                  onClick={() => setLoads(loads + 1)}
                  data-testid="increment-loads"
                  className="px-5 py-5 text-[#4475C4] hover:bg-gray-100 transition-colors font-black text-xl"
                >+</button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Total Billable Amount</label>
            <div className="relative bg-white border-2 border-[#4475C4] rounded-3xl p-6 flex items-center justify-between shadow-sm">
              <div className="flex flex-col">
                <p className="text-[11px] font-black text-[#4475C4] uppercase tracking-wider">Philippine Peso</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#4475C4]">₱</span>
                <input 
                  type="number"
                  placeholder="0.00" 
                  onChange={(e) => setAmount(e.target.value)}
                  /* The Tailwind arbitrary classes below remove the arrows inline */
                  className="bg-transparent text-4xl font-black outline-none w-32 text-right text-[#1A2B47] placeholder:text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all"
            >
              Discard Entry
            </button>
            <button 
              type="submit"
              className="bg-[#4475C4] text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg shadow-[#4475C4]/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}