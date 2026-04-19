// @ts-nocheck
import React from 'react';

export function DeleteModal({ isOpen, onClose, onConfirm, orderId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1A2B47]/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-white w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
        <div className="p-10 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
            </svg>
          </div>
          
          <h3 className="text-2xl font-black text-[#1A2B47] mb-2 uppercase tracking-tight">
            Delete Order
          </h3>
          <p className="text-gray-500 font-medium mb-8">
            Are you sure you want to delete <span className="text-[#4475C4] font-black">{orderId}</span>? This action cannot be undone.
          </p>

          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-6 py-4 rounded-2xl font-black uppercase tracking-widest bg-red-500 text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-95"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}