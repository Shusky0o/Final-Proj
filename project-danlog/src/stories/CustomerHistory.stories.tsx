// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { CustomerHistory } from '../components/CustomerHistory';
import '../app/globals.css'; 

const meta: Meta<typeof CustomerHistory> = {
  title: 'Dashboard/CustomerHistory',
  component: CustomerHistory,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4 bg-[#F8FAFC] min-h-screen flex justify-center overflow-x-hidden">
        {/* 
            max-w-full and w-full combined with overflow-hidden 
            ensures the parent container absolutely kills the X-axis scroll.
        */}
        <div className="w-full max-w-[1200px] flex flex-col overflow-x-hidden">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CustomerHistory>;

const mockCustomers = [
  { id: 101, customer_name: 'Neil', load: 3, status: 'Ready' },
  { id: 102, customer_name: 'Sophia', load: 1, status: 'Completed' },
  { id: 103, customer_name: 'Ilon', load: 5, status: 'Pending' },
  { id: 104, customer_name: 'Ahron', load: 2, status: 'Ready' },
  { id: 105, customer_name: 'Gian', load: 4, status: 'Completed' },
  { id: 106, customer_name: 'Lance', load: 2, status: 'Pending' },
  { id: 107, customer_name: 'Neil', load: 2, status: 'Ready' },
  { id: 108, customer_name: 'Sophia', load: 6, status: 'Pending' },
  { id: 109, customer_name: 'Gian', load: 1, status: 'Completed' },
  { id: 110, customer_name: 'Ahron', load: 3, status: 'Pending' },
  { id: 111, customer_name: 'Lance', load: 8, status: 'Ready' },
];

export const DefaultView: Story = {
  args: {
    customers: mockCustomers,
    hasMore: true,
    loadingMore: false,
    fetchMore: () => console.log('Fetching more records...'),
  },
};