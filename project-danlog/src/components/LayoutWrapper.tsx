// @ts-nocheck
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DashboardHeader } from './DashboardHeader';

// --- IMPORT YOUR PAGES MANUALLY ---
import HomeContent from '../app/page'; 
import RecordsPage from '../app/records/page';
import FinancialPage from '../app/financial/page';

export const LayoutWrapper = () => {
  const pathname = usePathname();
  const [showReminders, setShowReminders] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const reminderRef = useRef(null);

  // 1. Determine Title & Content based on Route
  const renderContent = () => {
    switch (pathname) {
      case '/records':
        return {
          title: "Record Log",
          component: <RecordsPage />
        };
      case '/financial':
        return {
          title: "Financial Analysis",
          component: <FinancialPage />
        };
      default:
        return {
          title: "Welcome, Admin!",
          component: <HomeContent />
        };
    }
  };

  const { title, component } = renderContent();

  // --- Reminders Logic (Keep your existing logic here) ---
  const addReminder = async (e) => { /* ... existing code ... */ };
  const toggleReminder = (id) => { /* ... existing code ... */ };
  const deleteReminder = (id) => { /* ... existing code ... */ };

  useEffect(() => {
    async function fetchReminders() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkList`, { method: "GET" });
        const result = await res.json();
        setReminders(result);
      } catch (err) { console.error(err); }
    }
    fetchReminders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reminderRef.current && !reminderRef.current.contains(event.target)) {
        setShowReminders(false);
      }
    };
    if (showReminders) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showReminders]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader
        pageTitle={title}
        reminders={reminders}
        showReminders={showReminders}
        setShowReminders={setShowReminders}
        reminderRef={reminderRef}
        newReminder={newReminder}
        setNewReminder={setNewReminder}
        addReminder={addReminder}
        toggleReminder={toggleReminder}
        deleteReminder={deleteReminder}
      />
      
      {/* 2. RENDER THE COMPONENT DIRECTLY INSTEAD OF {children} */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {component}
      </main>
    </div>
  );
};