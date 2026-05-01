// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { StatusTracker } from '../components/StatusTracker';
import React, { useState } from 'react';

import '../app/globals.css'; 

const meta: Meta<typeof StatusTracker> = {
  title: 'Operations/StatusTracker',
  component: StatusTracker,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="p-10 bg-[#F8FAFC] min-h-screen">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

/**
 * Functional Wrapper to simulate the real App state logic.
 * This allows you to test the "Neil Test" naming convention.
 */
const InteractiveTracker = () => {
  const [orders, setOrders] = useState([
    { id: 101, customer_name: "Neil Test #1", status: "pending" },
    { id: 102, customer_name: "Neil Test #2", status: "pending" },
    { id: 103, customer_name: "Neil Test #3", status: "ready" },
    { id: 104, customer_name: "Neil Test #4", status: "pending" },
    { id: 105, customer_name: "Neil Test #5", status: "ready" },
  ]);

  const handleUpdateStatus = (id: number, newStatus: string) => {
    if (newStatus === "completed") {
      setOrders(orders.filter(o => o.id !== id));
      console.log(`Order #${id} marked as COMPLETED (Removed from queue)`);
    } else {
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      console.log(`Order #${id} moved to: ${newStatus}`);
    }
  };

  const pending = orders.filter(o => o.status === "pending");
  const ready = orders.filter(o => o.status === "ready");

  return (
    <StatusTracker 
      pendingOrders={pending} 
      readyOrders={ready} 
      onUpdateStatus={handleUpdateStatus}
    />
  );
};

export const LiveOperationalFlow: StoryObj = {
  render: () => <InteractiveTracker />,
};

/**
 * Static state for documentation showing many "Neil Test" records
 */
export const HighCongestionState: StoryObj = {
  args: {
    pendingOrders: [
      { id: 201, customer_name: "Neil Test #6", status: "pending" },
      { id: 202, customer_name: "Neil Test #7", status: "pending" },
      { id: 203, customer_name: "Neil Test #8", status: "pending" },
      { id: 204, customer_name: "Neil Test #9", status: "pending" },
      { id: 205, customer_name: "Neil Test #10", status: "pending" },
    ],
    readyOrders: [
      { id: 206, customer_name: "Neil Test #11", status: "ready" },
      { id: 207, customer_name: "Neil Test #12", status: "ready" },
    ],
    onUpdateStatus: (id, status) => alert(`Updating ${id} to ${status}`),
  },
};