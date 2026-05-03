// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { MonthlyTimelineModal } from '../components/MonthlyTimelineModal';
import React, { useState } from 'react';

import '../app/globals.css'; 

const meta: Meta<typeof MonthlyTimelineModal> = {
  title: 'Financial/MonthlyTimelineModal',
  component: MonthlyTimelineModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

/**
 * MOCK DATA
 * We simulate the API responses here so the UI fills up in Storybook
 */
const mockApiData = {
  data: [
    { day: '2026-04-01', total: 15000 },
    { day: '2026-04-02', total: 22000 },
    { day: '2026-04-05', total: 18500 },
  ]
};

const mockDisbursements = [
  { id: 1, name: "Laundry Soap Restock", amount: 2500, transaction_date: "April 1, 2026" },
  { id: 2, name: "Electricity Bill", amount: 8000, transaction_date: "April 2, 2026" },
  { id: 3, name: "Staff Lunch", amount: 500, transaction_date: "April 2, 2026" },
];

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Helper function mock
  const getDaysInMonth = (month) => 30; 

  if (!isOpen) return (
    <div className="p-20 flex justify-center">
        <button 
            onClick={() => setIsOpen(true)}
            className="bg-[#4475C4] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl"
        >
            Open April 2026 Audit
        </button>
    </div>
  );

  return (
    <MonthlyTimelineModal 
      activeMonth="April"
      selectedYear={2026}
      onClose={() => setIsOpen(false)}
      getDaysInMonth={getDaysInMonth}
      // Note: In a real Storybook setup, we would use MSW (Mock Service Worker)
      // to intercept the fetch calls inside the component.
    />
  );
};

export const AuditView: StoryObj = {
  render: () => <ModalWrapper />,
};

/**
 * Static State Preview
 * Use this to verify the "No Outbound Record" vs the Red Pill labels
 */
export const LayoutTest: StoryObj = {
  args: {
    activeMonth: "January",
    selectedYear: 2026,
    onClose: () => alert("Modal Closed"),
    getDaysInMonth: () => 31,
  },
};