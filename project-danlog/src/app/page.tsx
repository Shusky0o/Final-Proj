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
  const [reminders, setReminders] = useState([
    { id: 1, text: "Check detergent stock", completed: false },
    { id: 2, text: "Call maintenance for Dryer B", completed: true }
  ]);
  const [newReminder, setNewReminder] = useState("");
  const reminderRef = useRef(null);

  // Reminders Logic
  const addReminder = (e) => {
    e.preventDefault();
    if (!newReminder.trim()) return;
    setReminders([...reminders, { id: Date.now(), text: newReminder, completed: false }]);
    setNewReminder("");
  };
  const toggleReminder = (id) => setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  const deleteReminder = (id) => setReminders(reminders.filter(r => r.id !== id));

  const customers = [
    { name: "Soph M.", id: "#101", loads: 1, status: "Ready" },
    { name: "Wilhelm", id: "#102", loads: 3, status: "Ready" },
    { name: "Ahron A.", id: "#103", loads: 2, status: "Ready" },
    { name: "Minatozaki Sana", id: "#104", loads: 2, status: "Ready" },
    { name: "Jaja", id: "#105", loads: 4, status: "Pending" },
    { name: "Ilon Ziv", id: "#106", loads: 2, status: "Pending" },
    { name: "Sdani", id: "#107", loads: 1, status: "Pending" },
    { name: "Guilaran, Red", id: "#108", loads: 6, status: "Pending" },
  ];

  return (
    <main className="h-screen overflow-hidden bg-[#F0F4FA] flex flex-col font-sans text-black relative text-sm">
      <DashboardHeader 
        reminders={reminders} showReminders={showReminders} setShowReminders={setShowReminders}
        reminderRef={reminderRef} newReminder={newReminder} setNewReminder={setNewReminder}
        addReminder={addReminder} toggleReminder={toggleReminder} deleteReminder={deleteReminder}
      />

      <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-[1900px] mx-auto flex-1 overflow-hidden">
        <div className="lg:col-span-3"><StatsPulse /></div>
        <div className="lg:col-span-4 flex items-center justify-center">
          <CommandCenter onNewOrder={() => setIsModalOpen(true)} />
        </div>
        <div className="lg:col-span-5"><CustomerHistory customers={customers} /></div>
      </div>

      <NewOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </main>
  );
}