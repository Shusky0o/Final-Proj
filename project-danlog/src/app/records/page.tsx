// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusTracker } from '../../components/StatusTracker';
import { DailyLogTable } from '../../components/DailyLogTable';
import { DeleteModal } from '../../components/DeleteModal'; 
import { fetchRecordLogs, deleteOrder } from '../../services/laundryService';

export default function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for Custom Delete Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Load data from Render backend on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRecordLogs();
      setRecords(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Opens the custom modal and tracks which ID to delete
  const openDeleteModal = (id) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
  };

  // Logic to call the API and update the UI list
  const confirmDelete = async () => {
    if (!selectedOrderId) return;
    
    const success = await deleteOrder(selectedOrderId);
    if (success) {
      // Instantly remove from the table
      setRecords(prev => prev.filter(r => r.id !== selectedOrderId));
      setIsModalOpen(false); 
    } else {
      alert("Backend Error: Could not delete from database.");
    }
  };

  const updateStatus = (id, newStatus) => {
    setRecords(prev => prev.map(record => 
      record.id === id ? { ...record, status: newStatus } : record
    ));
  };

  return (
    <main className="h-auto bg-[#F0F4FA] flex flex-col font-sans text-black relative">
      <div className="p-12 custom-scrollbar space-y-8">
        
        {/* RESTORED: Dashboard Navigation Button */}
        <div className="max-w-[1700px] mx-auto w-full flex justify-end">
          <Link href="/">
            <button className="bg-white border-2 border-[#4475C4] text-[#4475C4] px-8 py-3 rounded-2xl font-[1000] uppercase tracking-widest hover:bg-[#4475C4] hover:text-white transition-all shadow-lg active:scale-95">
              ← Dashboard
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-center font-black animate-pulse uppercase tracking-[0.2em] text-[#4475C4]">
              Synchronizing with Database...
            </p>
          </div>
        ) : (
          <>
            <StatusTracker records={records} onUpdateStatus={updateStatus} />
            <DailyLogTable records={records} onDelete={openDeleteModal} />
          </>
        )}
      </div>

      {/* CUSTOM DELETE MODAL */}
      <DeleteModal 
        isOpen={isModalOpen} 
        orderId={selectedOrderId}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: #4475C4; 
          border-radius: 10px; 
          border: 2px solid #FFFFFF; 
        }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  );
}