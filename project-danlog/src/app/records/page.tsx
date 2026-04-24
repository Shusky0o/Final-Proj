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
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const pendingOrders = orders.filter(o => o.status === "pending");
  const readyOrders = orders.filter(o => o.status === "ready");

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

      setOrders([...pending, ...ready]);
    };

    fetchAllOrders();
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    // try {
    //   const response = await fetchRecordLogs();
      
    //   // DEBUG: CHECK YOUR BROWSER CONSOLE (F12)
    //   console.log("RAW DATA FROM API:", response);

    //   // Handle both { data: [] } and naked [ ] responses
    //   const rawRecords = Array.isArray(response) ? response : response.data || [];
      
    //   // Filter out completed and set state
    //   setRecords(rawRecords.filter(r => r.status !== "completed"));
    // } catch (err) {
    //   console.error("Load error:", err);
    // } finally {
    //   setLoading(false);
    // }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/by-date?date=${new Date().toISOString().split('T')[0]}`);
      const data = await res.json();
      setOrders([...orders, ...data.data]);
    } catch (error) {
      console.error('Error fetching dated records:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      // 1. Ensure ID is a number if your API expects it
      const numericId = Number(id);
      const formattedId = `#${numericId}`; // For matching the ID format in your state

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: numericId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed update");

      // 2. Update the single source of truth (orders state)
      setOrders(prevOrders => {
        if (newStatus === "completed") {
          // If completed, remove it from the tracking list entirely
          return prevOrders.filter(o => o.id === formattedId || o.id === numericId ? false : true);
        }

        // Otherwise, just flip the status string
        return prevOrders.map(order => 
          (order.id === formattedId || order.id === numericId)
            ? { ...order, status: newStatus }
            : order
        );
      });

      // Optional: If you still use a 'records' state for a master table elsewhere
      setRecords(prev => prev.filter(r => r.id !== numericId));

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
      setOrders(prev => prev.filter(r => r.id !== selectedOrderId));
      setIsModalOpen(false); 
    }
  };

  async function handleDateChange(e) {
    const selectedDate = e.target.value; 

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/by-date?date=${selectedDate}`);
      const data = await res.json();
      const newItems = data.data || [];

      setOrders(prev => {
        // 1. Create a Map of existing orders by ID
        const existingIds = new Set(prev.map(o => o.id));
        
        // 2. Only add items that aren't already in the list
        const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));
        
        return [...prev, ...uniqueNewItems];
      });
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
          <DailyLogTable records={orders} onDelete={openDeleteModal} onDateChange={handleDateChange}/>
        </>
      )}

      <DeleteModal isOpen={isModalOpen} orderId={selectedOrderId} onClose={() => {setIsModalOpen(false);}} onConfirm={confirmDelete} />
    </main>
  );
}