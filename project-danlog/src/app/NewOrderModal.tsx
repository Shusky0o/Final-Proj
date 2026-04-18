// @ts-nocheck
import { stat } from 'fs';
import React, { use, useEffect } from 'react';
import { useState } from 'react';
import { sendMessage } from '../lib/client';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  mostRecentOrder: number;
  onSubmit?: (data: {
    customer_name: string;
    total_weight: number;
    load: number;
    amount: number;
    id: number;
  }) => void;
}

export default function NewOrderModal({ isOpen, onClose, mostRecentOrder, onSubmit }: NewOrderModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [weight, setWeight] = useState('');
  const [loads, setLoads] = useState(1);
  const [amount, setAmount] = useState('');
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    async function init() {
      //const res: any = await sendMessage("getNextOrderId");
      if (true) {
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/latest`,{method: 'GET'});
        const data = await res2.json();

        const latestId = data?.id || 0;
        setOrderId(latestId + 1);
        return;
      }
      //setOrderId(res.data);
    }

    if (isOpen) {
      init();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
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

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 👇 SEND UP TO PARENT
    onSubmit?.(payload);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Card */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white transform transition-all animate-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="bg-[#4475C4] p-8 text-white">
          <h2 className="text-3xl font-black Arial uppercase tracking-tighter">New Order Entry</h2>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest mt-1">Input customer details below</p>
        </div>

        <div className="p-10 space-y-6">
          {/* Customer Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Customer Name</label>
            <input 
              type="text" 
              placeholder="Enter customer name..." 
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-[#4475C4] transition-all text-black" 
            />
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Weight (kg)</label>
              <input 
                type="number" 
                step="0.1" 
                placeholder="0.0" 
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-[#4475C4] transition-all text-black" 
              />
            </div>
            
            {/* NO. OF LOADS WITH ARROWS */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">No. of Loads</label>
              <input 
                type="number" 
                min="1" 
                defaultValue="1"
                onChange={(e) => setLoads(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-[#4475C4] transition-all text-black font-bold" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Amount (₱)</label>
              <input 
                type="number"
                placeholder="140.00" 
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:outline-none focus:border-[#4475C4] transition-all text-black" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Order ID</label>
              <input 
                type="text" 
                value={orderId} 
                disabled 
                className="w-full bg-gray-100 border-2 border-dashed border-gray-200 p-4 rounded-2xl font-mono font-bold text-center text-gray-500 cursor-not-allowed" 
              />
            </div>
          </div>

          {/* Modal Buttons */}
          <div className="flex gap-4 pt-6">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-black uppercase text-xs tracking-widest text-gray-400 hover:bg-gray-50 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              onClick={handleSubmit}
              className="flex-[2] py-4 bg-[#4475C4] text-white rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Enter Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}