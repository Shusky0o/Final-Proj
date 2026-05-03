// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { MonthlyTimelineModal } from '../components/MonthlyTimelineModal';
import React, { useState } from 'react';

import '../app/globals.css'; 

const meta: Meta<typeof MonthlyTimelineModal> = {
  title: 'Financial/MonthlyTimelineModal',
  component: MonthlyTimelineModal,
  tags: ['autodocs'],
  parameters: {
    // 'padded' ensures the modal doesn't touch the edges of the Docs frame
    layout: 'padded', 
    docs: {
      description: {
        component: 'A modal that displays a daily audit timeline and disbursement records for a specific month.',
      },
    },
  },
  // This "Decorator" forces the modal to stay INSIDE the Storybook preview box
  decorators: [
    (Story) => (
      <div style={{ 
        transform: 'scale(1)', 
        minHeight: '600px', 
        width: '100%', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MonthlyTimelineModal>;

/**
 * Default View (Static)
 * This is what will appear as the "Primary" component in your Docs.
 */
export const Default: Story = {
  args: {
    activeMonth: "April",
    selectedYear: 2026,
    onClose: () => console.log("Close clicked"),
    getDaysInMonth: () => 30,
  },
};

/**
 * Interactive Preview
 * Use this to test the "Open Modal" button flow.
 */
export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        {!isOpen ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
          >
            Open Log
          </button>
        ) : (
          <MonthlyTimelineModal 
            {...args} 
            onClose={() => setIsOpen(false)} 
          />
        )}
      </>
    );
  },
  args: {
    activeMonth: "April",
    selectedYear: 2026,
    getDaysInMonth: () => 30,
  }
};