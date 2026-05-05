// @ts-nocheck
import React from 'react';
import { formatDate } from '../lib/dateFormatter';

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

export const DashboardHeader = ({ 
  pageTitle = "Welcome, Admin!",
  reminders, 
  showReminders, 
  setShowReminders, 
  reminderRef, 
  newReminder, 
  setNewReminder, 
  addReminder, 
  toggleReminder, 
  deleteReminder 
}) => {
  return (
    <header className="z-[100] bg-white px-12 py-5 flex items-center justify-between w-full border-b border-gray-100 sticky top-0">
      <div className="flex items-center gap-6">
        {/* DL Logo Container */}
        <div className="bg-[#4475C4] text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-[#4475C4]/30 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">DL</h1>
        </div>
        
        {/* System & Page Title */}
        <div className="flex flex-col">
          <h1 className="text-[10px] font-black tracking-[0.4em] text-[#4475C4] uppercase leading-tight opacity-70">Danlog System</h1>
          <div className="flex items-center gap-2">
             <span className="text-2xl font-black text-[#1A2B47] tracking-tight">{pageTitle}</span>
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Action Items Container (Right Side) */}
      <div className="flex items-center gap-6">
        {/* Reminders Dropdown */}
        <div ref={reminderRef} className="relative">
          <button 
            onClick={() => setShowReminders(!showReminders)}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${showReminders ? 'bg-[#4475C4] text-white shadow-lg' : 'hover:bg-gray-100 text-gray-500'}`}
          >
            <span className="font-bold text-sm uppercase tracking-widest">Reminders</span>
            {reminders.filter(r => !r.is_done).length > 0 && (
              <span className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 ${showReminders ? 'bg-white text-[#4475C4]' : 'bg-red-500 text-white'}`}>
                {reminders.filter(r => !r.is_done).length}
              </span>
            )}
          </button>
          
          {showReminders && (
            <div className="absolute top-full mt-4 right-0 w-80 bg-white rounded-[2rem] shadow-2xl p-6 border border-gray-100 z-[110]">
              <h3 className="font-black uppercase text-[#4475C4] mb-4 text-xs tracking-[0.2em]">Admin Checklist</h3>
              <form onSubmit={addReminder} className="mb-4 flex gap-2">
                <input 
                  type="text" 
                  value={newReminder} 
                  onChange={(e) => setNewReminder(e.target.value)} 
                  placeholder="New task..." 
                  className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm outline-none border border-gray-100" 
                />
                <button type="submit" className="bg-[#4475C4] text-white w-10 h-10 rounded-xl font-bold">+</button>
              </form>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {reminders.map((r, index) => (
                  <div key={`${r.id}-${index}`} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={r.is_done} onChange={() => toggleReminder(r.id)} className="w-5 h-5 accent-[#4475C4]" />
                      <span className={`text-sm font-bold ${r.is_done ? 'line-through text-gray-300' : 'text-gray-700'}`}>{r.task}</span>
                    </div>
                    <button onClick={() => deleteReminder(r.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Date Box - Day Name Only */}
        <div className="bg-[#1A2B47] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md bold">
          {formatDate()}
        </div>
      </div>
    </header>
  );
};