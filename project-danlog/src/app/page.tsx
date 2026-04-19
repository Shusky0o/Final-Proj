// @ts-nocheck
'use client';

import React, { useState, useRef, useEffect } from 'react';
import NewOrderModal from './NewOrderModal'; 
import { DashboardHeader } from '../components/DashboardHeader';
import { StatsPulse } from '../components/StatsPulse';
import { CommandCenter } from '../components/CommandCenter';
import { CustomerHistory } from '../components/CustomerHistory';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const reminderRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Reminders Logic
  const addReminder = async (e) => {
    e.preventDefault();
    if (!newReminder.trim()) return;
    setReminders([...reminders, { id: Date.now(), task: newReminder, is_done: false }]);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkList`, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({task: newReminder, is_done: false}),
      })
    }
    catch (err) {
      console.error("Failed to add reminder:", err);
    }

    setNewReminder("");
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, is_done: !r.is_done } : r))
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkList`, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({is_done: !reminders.find(r => r.id === id).is_done, id})});
    }
    catch (err) {
      console.error("Failed to update reminder:", err);
    }
  };

  const deleteReminder = (id) => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkList`, 
        { method: "DELETE" ,
         headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({id})
      });
    }
    catch (err) {
      console.error("Failed to delete reminder:", err);
    }
    setReminders(reminders.filter(r => r.id !== id))
  
  };

  useEffect(() => {
    async function fetchLatestOrder() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders?limit=20`
        );

        const res2 = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkList`, {method: "GET"}
        );

        const result = await res.json();
        const result2 = await res2.json();

        setReminders(result2);
        setCustomers(result.data);

      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    }

    fetchLatestOrder();
  }, []);

  const fetchMore = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
      url.searchParams.append("limit", "20");

      if (cursor) {
        url.searchParams.append("cursorCreatedAt", cursor.created_at);
        url.searchParams.append("cursorId", cursor.id);
      }

      const res = await fetch(url.toString());
      const result = await res.json();

      setCustomers((prev) => [...prev, ...result.data]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error("Failed to fetch more:", err);
    }

    setLoadingMore(false);
  };

  return (
    <main className="min-h-screen overflow-y-auto bg-[#F0F4FA] flex flex-col font-sans text-black relative text-sm pb-20">
      <DashboardHeader 
        reminders={reminders} showReminders={showReminders} setShowReminders={setShowReminders}
        reminderRef={reminderRef} newReminder={newReminder} setNewReminder={setNewReminder}
        addReminder={addReminder} toggleReminder={toggleReminder} deleteReminder={deleteReminder}
      />

      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 w-full max-w-[1900px] mx-auto">
        <div className="md:col-span-2 lg:col-span-3"><StatsPulse /></div>
        <div className="md:col-span-2 lg:col-span-4 flex items-center justify-center">
          <CommandCenter onNewOrder={() => setIsModalOpen(true)} />
        </div>
        <div className="lg:col-span-5"><CustomerHistory customers={customers} fetchMore={fetchMore} hasMore={hasMore} /></div>
      </div>

      <NewOrderModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false) }   
      onSubmit={(data) => {
        setCustomers((prev) => [data, ...prev]);
      }} 
      />

      <style jsx>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </main>
  );
}