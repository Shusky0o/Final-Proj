// @ts-nocheck
'use client';

import React, { useState, useEffect, useRef } from 'react';
import NewOrderModal from './NewOrderModal'; 
import Link from 'next/link';

// Simple Icons
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const LogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [reminders, setReminders] = useState([
    { id: 1, text: "Check detergent stock", completed: false },
    { id: 2, text: "Call maintenance for Dryer B", completed: true }
  ]);
  const [newReminder, setNewReminder] = useState("");

  const reminderRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (reminderRef.current && !reminderRef.current.contains(event.target)) {
        setShowReminders(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [reminderRef]);

  const addReminder = (e) => {
    e.preventDefault();
    if (!newReminder.trim()) return;
    setReminders([...reminders, { id: Date.now(), text: newReminder, completed: false }]);
    setNewReminder("");
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const customers = [
    { name: "Soph M.", id: "#101", loads: 1, status: "Ready" },
    { name: "Wilhelm", id: "#102", loads: 3, status: "Ready" },
    { name: "Ahron A.", id: "#103", loads: 2, status: "Ready" },
    { name: "Minatozaki Sana", id: "#104", loads: 2, status: "Ready" },
    { name: "Jaja", id: "#105", loads: 4, status: "Pending" },
    { name: "Ilon Ziv", id: "#106", loads: 2, status: "Pending" },
    { name: "Sdani", id: "#107", loads: 1, status: "Pending" },
    { name: "Guilaran, Red", id: "#108", loads: 6, status: "Pending" },
  ];

  const mainButtonStyle = "relative group bg-[#4475C4] hover:bg-[#365fa1] text-white py-5 rounded-2xl font-black text-lg uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-[#4475C4]/40 overflow-hidden w-full flex items-center justify-center gap-3";
  const secondaryButtonStyle = "flex items-center justify-center gap-2 w-full py-5 bg-white border-2 border-[#4475C4] rounded-2xl font-black text-[11px] uppercase tracking-widest text-[#4475C4] hover:bg-[#4475C4] hover:text-white transition-all shadow-lg hover:shadow-[#4475C4]/20";

  return (
    <main className="h-screen overflow-hidden bg-[#F0F4FA] flex flex-col font-sans text-black relative text-sm">
      
      {/* 1. HEADER - REDESIGNED */}
      <header className="z-[100] bg-white px-12 py-5 flex items-center justify-between w-full border-b border-gray-100 sticky top-0">
        <div className="flex items-center gap-6">
          <div className="bg-[#4475C4] text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-[#4475C4]/30 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">DL</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[10px] font-black tracking-[0.4em] text-[#4475C4] uppercase leading-tight opacity-70">Danlog System</h1>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-black text-[#1A2B47] tracking-tight">Welcome, <span className="text-[#4475C4]">Admin!</span></span>
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-1"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div ref={reminderRef} className="relative">
            <button 
              onClick={() => setShowReminders(!showReminders)}
              className={`relative px-5 py-2.5 rounded-xl transition-all group flex items-center gap-2 ${showReminders ? 'bg-[#4475C4] text-white shadow-lg' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <span className="font-bold text-sm uppercase tracking-widest">Reminders</span>
              {reminders.filter(r => !r.completed).length > 0 && (
                <span className={`text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 ${showReminders ? 'bg-white text-[#4475C4] border-[#4475C4]' : 'bg-red-500 text-white border-white'}`}>
                  {reminders.filter(r => !r.completed).length}
                </span>
              )}
            </button>
            
            {showReminders && (
              <div className="absolute top-full mt-4 left-0 translate-x-12 w-80 bg-white rounded-[2rem] shadow-2xl p-6 text-black border border-gray-100 z-[110]">
                <h3 className="font-black uppercase italic text-[#4475C4] mb-4 text-xs tracking-[0.2em]">Admin Checklist</h3>
                <form onSubmit={addReminder} className="mb-4 flex gap-2">
                  <input 
                    type="text" value={newReminder}
                    onChange={(e) => setNewReminder(e.target.value)}
                    placeholder="New task..."
                    className="flex-1 bg-gray-50 rounded-xl px-4 py-2 text-sm outline-none border border-gray-100"
                  />
                  <button type="submit" className="bg-[#4475C4] text-white w-10 h-10 rounded-xl font-bold">+</button>
                </form>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {reminders.map(reminder => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50/50 rounded-2xl transition-all border border-transparent active:border-[#4475C4]/20 mb-2">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={reminder.completed} 
                          onChange={() => toggleReminder(reminder.id)} 
                          className="w-5 h-5 accent-[#4475C4] cursor-pointer" 
                        />
                        <span className={`text-sm font-bold transition-all ${reminder.completed ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                          {reminder.text}
                        </span>
                      </div>
                      <button 
                        onClick={() => deleteReminder(reminder.id)} 
                        className="p-2 text-red-500 bg-red-50 hover:bg-red-100 active:scale-90 rounded-lg transition-all"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-[#1A2B47] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md">March 15, 2026</div>
        </div>
      </header>

      {/* 2. DASHBOARD BODY */}
      <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 w-full max-w-[1900px] mx-auto flex-1 overflow-hidden">
        
        {/* LEFT: THE PULSE - SEPARATED CARDS */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          <section className="space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 pl-2">Operational Pulse</h2>
            
            <div className="bg-[#4475C4] rounded-[2.5rem] p-8 text-white shadow-2xl shadow-[#4475C4]/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <p className="font-bold text-xs uppercase tracking-widest opacity-80 mb-1">In Queue</p>
              <div className="flex items-end gap-3">
                <span className="text-7xl font-black tracking-tighter leading-none">06</span>
                <span className="text-sm font-bold pb-2 opacity-60 italic uppercase tracking-widest">Orders</span>
              </div>
              <div className="mt-6 flex items-center gap-2 bg-black/20 backdrop-blur-md w-fit px-4 py-2 rounded-2xl border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">Live Tracking</span>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-white">
              <p className="text-[#4475C4] font-black text-[10px] tracking-[0.2em] uppercase mb-2 opacity-50">Today's Revenue</p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black text-[#1A2B47]">₱1,260</span>
                <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-md font-black italic">+12%</span>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-white">
              <p className="text-gray-400 font-black text-[10px] tracking-[0.2em] uppercase mb-2">Monthly Average</p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black text-[#1A2B47]">₱29,120</span>
                <div className="w-2 h-2 bg-[#4475C4] rounded-full opacity-20"></div>
              </div>
            </div>
          </section>
        </div>

        {/* CENTER: COMMAND CENTER */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-[420px] space-y-10">
            <div className="relative mx-auto w-72 h-72 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4475C4] to-blue-300 rounded-full animate-spin-slow opacity-20 blur-3xl"></div>
              <div className="relative w-full h-full p-4 bg-white rounded-full shadow-2xl border-[12px] border-white overflow-hidden transition-transform hover:scale-105">
                <img src="/assets/labadi-logo.jpg" alt="Labadi" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 bg-[#1A2B47] px-10 py-3 rounded-2xl shadow-2xl border-4 border-white">
                <span className="text-white font-black text-xs tracking-[0.3em] uppercase italic">LABADI HUB</span>
              </div>
            </div>

            <div className="space-y-4">
              <button onClick={() => setIsModalOpen(true)} className={mainButtonStyle}>
                <PlusIcon /> <span>New Order</span>
              </button>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/records" className="w-full">
                  <button className={secondaryButtonStyle}><LogIcon /> Record Log</button>
                </Link>
                <Link href="/financial" className="w-full">
                  <button className={secondaryButtonStyle}><ChartIcon /> Analytics</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: LIVE STATUS */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 px-4">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Live Status</h2>
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full text-green-600">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black uppercase">System Online</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-white flex flex-col flex-1 overflow-hidden">
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20">
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="py-6 pl-10 border-b border-gray-50 uppercase tracking-[0.2em]">Customer</th>
                    <th className="py-6 text-center border-b border-gray-50">ID</th>
                    <th className="py-6 text-center border-b border-gray-50">Loads</th>
                    <th className="py-6 pr-10 text-right border-b border-gray-50">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {customers.map((c) => (
                    <tr key={c.id} className="group hover:bg-white transition-all">
                      <td className="py-5 pl-10 border-b border-gray-50/50">
                        <p className="font-black text-[#1A2B47] group-hover:text-[#4475C4] transition-colors">{c.name}</p>
                      </td>
                      <td className="py-5 text-center border-b border-gray-50/50 font-bold text-gray-300 italic">{c.id}</td>
                      <td className="py-5 text-center border-b border-gray-50/50">
                        <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-lg font-black text-[11px] border border-gray-100">{c.loads}</span>
                      </td>
                      <td className="py-5 pr-10 text-right border-b border-gray-50/50">
                        <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase px-4 py-1.5 rounded-full shadow-sm ${
                          c.status === 'Ready' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-[#4475C4] border border-blue-100 animate-pulse'
                        }`}>
                          {c.status === 'Ready' && <div className="w-1 h-1 bg-green-600 rounded-full animate-ping"></div>}
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-gray-50/30 border-t border-gray-100 flex justify-between items-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Global Activity Monitor</p>
              <Link href="/records" className="text-[10px] font-black text-[#4475C4] uppercase tracking-widest hover:underline">Full Command Log</Link>
            </div>
          </div>
        </div>
      </div>

      <NewOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4475C4; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </main>
  );
}