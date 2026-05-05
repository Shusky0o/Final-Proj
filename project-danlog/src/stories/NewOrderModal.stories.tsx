// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import NewOrderModal from '../app/NewOrderModal'; // Adjust path if needed
import React, { useState } from 'react';

import '../app/globals.css'; 

// Force a style refresh for the iframe
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    body { background-color: #F0F4FA !important; }
    * { font-family: sans-serif; }
  `;
  document.head.appendChild(style);
}
const meta: Meta<typeof NewOrderModal> = {
  title: 'Components/NewOrderModal',
  component: NewOrderModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

// This wrapper makes the "Confirm" and "Discard" buttons actually work in Storybook
const ModalParent = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="bg-[#F0F4FA] w-[100vw] h-[100vh] flex items-center justify-center font-sans">
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[#4475C4] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest"
      >
        + New Order
      </button>

      <NewOrderModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onSubmit={(data) => {
          console.log("Form Submitted to Backend:", data);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const FunctionalPreview: StoryObj = {
  render: () => <ModalParent />,
};

// Static state for documentation
export const OpenState: StoryObj = {
  args: {
    isOpen: true,
    onClose: () => alert("Close clicked"),
    orderId: 1001,
  },
};