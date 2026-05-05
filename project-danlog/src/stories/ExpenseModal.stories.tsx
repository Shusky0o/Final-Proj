// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { ExpenseModal } from '../components/ExpenseModal'; // Adjust path if needed
import React, { useState } from 'react';

import '../app/globals.css'; 

// Force style consistency for the Storybook iframe
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    body { background-color: #F0F4FA !important; }
    * { font-family: sans-serif; }
  `;
  document.head.appendChild(style);
}

const meta: Meta<typeof ExpenseModal> = {
  title: 'Financial/ExpenseModal',
  component: ExpenseModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

/**
 * Functional wrapper to manage form state 
 * so you can type in the inputs in Storybook.
 */
const ModalParent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [form, setForm] = useState({
    name: '',
    amount: '',
    transaction_date: new Date().toISOString().split('T')[0]
  });

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Expense Saved to Registry:", form);
    alert(`Saved: ${form.name} - ₱${form.amount}`);
    setIsOpen(false);
  };

  return (
    <div className="bg-[#F0F4FA] w-[100vw] h-[100vh] flex items-center justify-center font-sans">
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg"
      >
        + Entry
      </button>

      <ExpenseModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        form={form}
        setForm={setForm}
        onSave={handleSave}
      />
    </div>
  );
};

export const FunctionalPreview: StoryObj = {
  render: () => <ModalParent />,
};

/**
 * Static preview for documentation/testing 
 * UI layout with pre-filled data.
 */
export const FilledState: StoryObj = {
  args: {
    isOpen: true,
    form: {
      name: 'Utility Bill - April',
      amount: 4500.50,
      transaction_date: '2026-04-28'
    },
    setForm: (val) => console.log("State Update:", val),
    onClose: () => alert("Close clicked"),
    onSave: (e) => { e.preventDefault(); alert("Save clicked"); }
  },
};