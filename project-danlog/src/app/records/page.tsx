//@ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusTracker } from '../../components/StatusTracker';
import { DailyLogTable } from '../../components/DailyLogTable';
import { DeleteModal } from '../../components/DeleteModal'; 
import { fetchRecordLogs, deleteOrder } from '../../services/laundryService';
import { getOrderbyStatus } from '@/src/services/oderService';
import { get } from 'http';
import { Order } from '../NewOrderModal';

export default function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [dailyLogRecords, setDailyLogRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const pendingOrders = orders.filter(o => o.status === "Pending");
  const readyOrders = orders.filter(o => o.status === "Ready");

  useEffect(() => {
    const fetchAllOrders = async () => {
      const getOrderbyStatus = async (status: string) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/status-summary?status=${status}`);
          const data = await response.json();
          // Add the status to each order object so we can filter them later
          return data.data.map((order: any) => ({ ...order, status }));
        } catch (error) {
          console.error(`Error fetching ${status} orders:`, error);
          return [];
        }
      };

      // Fetch both in parallel
      const [pending, ready] = await Promise.all([
        getOrderbyStatus("pending"),
        getOrderbyStatus("ready")
      ]);

      // Capitalize status for consistency with button clicks
      const capitalizedPending = pending.map(o => ({ ...o, status: "Pending" }));
      const capitalizedReady = ready.map(o => ({ ...o, status: "Ready" }));

      setOrders([...capitalizedPending, ...capitalizedReady]);
    };

    fetchAllOrders();
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/by-date?date=${currentDate}`);
      const data = await res.json();
      setDailyLogRecords(data.data || []);
    } catch (error) {
      console.error('Error fetching dated records:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      // Normalize ID to number
      const numericId = Number(id);

      // Ensure status is lowercase for API
      const apiStatus = newStatus.toLowerCase();

      // Update the API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: numericId, status: apiStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      if (newStatus === "Completed") {
        // Remove from both order tracking lists
        setOrders(prev => prev.filter(order => order.id !== numericId));
        setDailyLogRecords(prev => prev.filter(record => record.id !== numericId));
      } else {
        // Update status in BOTH state arrays to keep them in sync
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === numericId
              ? { ...order, status: newStatus }
              : order
          )
        );

        setDailyLogRecords(prevRecords =>
          prevRecords.map(record =>
            record.id === numericId
              ? { ...record, status: newStatus }
              : record
          )
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    }
  };

  const openDeleteModal = (id) => { setSelectedOrderId(id); setIsModalOpen(true); };
  const confirmDelete = async () => {
    if (!selectedOrderId) return;
    const success = await deleteOrder(selectedOrderId);
    if (success) {
      // Update both state arrays to ensure immediate UI reflection
      setOrders(prev => prev.filter(r => r.id !== selectedOrderId));
      setDailyLogRecords(prev => prev.filter(r => r.id !== selectedOrderId));
      setIsModalOpen(false); 
    }
  };

  async function handleDateChange(e) {
    const selectedDate = e.target.value; 

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/by-date?date=${selectedDate}`);
      const data = await res.json();
      // Replace the table content entirely with the new date's data
      setDailyLogRecords(data.data || []);
    } catch (error) {
      console.error('Error fetching dated records:', error);
    }
  }

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
          <StatusTracker records={orders} onUpdateStatus={updateStatus} pendingOrders={pendingOrders} readyOrders={readyOrders} />
          <DailyLogTable records={dailyLogRecords} onDelete={openDeleteModal} onDateChange={handleDateChange}/>
        </>
      )}

      <DeleteModal isOpen={isModalOpen} orderId={selectedOrderId} onClose={() => {setIsModalOpen(false);}} onConfirm={confirmDelete} />
    </main>
  );
}