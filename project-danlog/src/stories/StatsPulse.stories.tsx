// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { StatsPulse } from '../components/StatsPulse';

import '../app/globals.css'; 

const meta: Meta<typeof StatsPulse> = {
  title: 'Dashboard/StatsPulse',
  component: StatsPulse,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      /* Increased width and added overflow protection to prevent the "cut off" look */
      <div className="p-8 bg-[#F8FAFC] border border-slate-200 rounded-xl w-full max-w-[450px] min-h-[400px] overflow-hidden shadow-sm">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatsPulse>;

/**
 * Normal operating state with data populated.
 */
export const LiveRegistry: Story = {
  args: {
    pendingCount: 12,
    todayRevenue: 45820.50,
    monthlyRevenue: 850300.00,
    isLoading: false,
  },
};

/**
 * Skeleton state used while fetching data from the API.
 */
export const LoadingState: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * State where data is zero.
 */
export const EmptyState: Story = {
  args: {
    pendingCount: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    isLoading: false,
  },
};