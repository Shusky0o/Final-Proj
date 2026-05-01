// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { StatsPulse } from '../components/StatsPulse';

import '../app/globals.css'; 

const meta: Meta<typeof StatsPulse> = {
  title: 'Dashboard/StatsPulse',
  component: StatsPulse,
  parameters: {
    // Component is a sidebar element, so we wrap it in a container 
    // to simulate its actual layout width.
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-[#F8FAFC] min-h-screen w-[400px]">
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
 * This tests the Tailwind 'animate-pulse' and gray placeholders.
 */
export const LoadingState: Story = {
  args: {
    isLoading: true,
  },
};

/**
 * State where some data might be missing or zero.
 */
export const EmptyState: Story = {
  args: {
    pendingCount: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    isLoading: false,
  },
};

/**
 * Testing high-volume numbers to check for text overflow.
 */
export const HighVolume: Story = {
    args: {
      pendingCount: 148,
      todayRevenue: 1250000.75,
      monthlyRevenue: 12450000.00,
      isLoading: false,
    },
  };