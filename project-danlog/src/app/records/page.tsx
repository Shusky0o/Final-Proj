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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetchRecordLogs();
      
      // DEBUG: CHECK YOUR BROWSER CONSOLE (F12)
      console.log("RAW DATA FROM API:", response);

      // Handle both { data: [] } and naked [ ] responses
      const rawRecords = Array.isArray(response) ? response : response.data || [];
      
      // Filter out completed and set state
      setRecords(rawRecords.filter(r => r.status !== "completed"));
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const numericId = Number(id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: numericId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed update");

      if (newStatus === "completed") {
        setRecords(prev => prev.filter(r => r.id !== numericId));
      } else {
        setRecords(prev => prev.map(r => 
          r.id === numericId ? { ...r, status: newStatus } : r
        ));
      }
    } catch (err) {
      alert("Error updating status.");
    }
  };

  const openDeleteModal = (id) => { setSelectedOrderId(id); setIsModalOpen(true); };
  const confirmDelete = async () => {
    if (!selectedOrderId) return;
    const success = await deleteOrder(selectedOrderId);
    if (success) {
      setRecords(prev => prev.filter(r => r.id !== selectedOrderId));
      setIsModalOpen(false); 
    }
  };

  return (
    <main className="h-auto bg-[#F0F4FA] p-12 space-y-8 min-h-screen">
      <div className="max-w-[1700px] mx-auto w-full flex justify-end">
        <Link href="/">
          <button className="bg-white border-2 border-[#4475C4] text-[#4475C4] px-8 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-[#4475C4] hover:text-white transition-all shadow-lg active:scale-95">
            ← Dashboard
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 font-black text-[#4475C4] animate-pulse">LOADING...</div>
      ) : (
        <>
          <StatusTracker records={records} onUpdateStatus={updateStatus} />
          <DailyLogTable records={records} onDelete={openDeleteModal} />
        </>
      )}

      <DeleteModal isOpen={isModalOpen} orderId={selectedOrderId} onClose={() => setIsModalOpen(false)} onConfirm={confirmDelete} />
    </main>
  );
}