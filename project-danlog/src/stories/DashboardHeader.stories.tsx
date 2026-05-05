// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { DashboardHeader } from '../components/DashboardHeader';
import React, { useState, useRef } from 'react';

import '../app/globals.css'; 

const meta: Meta<typeof DashboardHeader> = {
  title: 'Navigation/DashboardHeader',
  component: DashboardHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

/**
 * Interactive Wrapper to simulate the Reminders System
 */
const HeaderParent = ({ initialTitle = "Welcome, Admin!" }) => {
  const [showReminders, setShowReminders] = useState(false);
  const [newReminder, setNewReminder] = useState('');
  const [reminders, setReminders] = useState([
    { id: 1, task: "Restock Liquid Detergent", is_done: false },
    { id: 2, task: "Check Unit 04 drainage", is_done: true },
    { id: 3, task: "Daily Cash Count", is_done: false },
  ]);
  const reminderRef = useRef(null);

  const addReminder = (e) => {
    e.preventDefault();
    if (!newReminder.trim()) return;
    const item = { id: Date.now(), task: newReminder, is_done: false };
    setReminders([item, ...reminders]);
    setNewReminder('');
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, is_done: !r.is_done } : r));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[400px]">
      <DashboardHeader 
        pageTitle={initialTitle}
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
      <div className="p-12 text-slate-300 font-bold uppercase tracking-[0.5em] text-center">
        Main Dashboard Content Area
      </div>
    </div>
  );
};

export const InteractiveHeader: StoryObj = {
  render: () => <HeaderParent />,
};

export const FinancialPageHeader: StoryObj = {
  render: () => <HeaderParent initialTitle="Financial Analysis" />,
};

export const OrdersPageHeader: StoryObj = {
  render: () => <HeaderParent initialTitle="Record Log" />,
};

/**
 * Static preview of the reminder dropdown being open
 */
export const DropdownOpen: StoryObj = {
  args: {
    pageTitle: "System Overview",
    showReminders: true,
    reminders: [
      { id: 1, task: "Urgent: Machine 2 Repair", is_done: false },
      { id: 2, task: "Staff Meeting 2PM", is_done: false }
    ],
    newReminder: "",
  },
};