// @ts-nocheck
'use client';

import React, { useState } from 'react';
import NewOrderModal from './NewOrderModal'; // Import the separated modal
import Link from 'next/link';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customers = [
    { name: "Soph M.", id: "#101", loads: 1 },
    { name: "Wilhelm", id: "#102", loads: 3 },
    { name: "Ahron A.", id: "#103", loads: 2 },
    { name: "Minatozaki Sana", id: "#104", loads: 2 },
    { name: "Jaja", id: "#105", loads: 4 },
    { name: "Ilon Ziv", id: "#106", loads: 2 },
    { name: "Sdani", id: "#107", loads: 1 },
    { name: "Guilaran, Red", id: "#108", loads: 6 },
  ];

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-br from-[#EAEFF9] via-[#FFFFFF] to-[#D9E2F3] flex flex-col font-sans text-black overflow-x-hidden relative">
      
      {/* 1. GLASS-HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#4475C4]/90 text-white px-12 py-6 flex items-center justify-between w-full shadow-2xl border-b border-white/20">
        <div className="flex items-center">
          <h1 className="text-3xl font-black italic border-r-2 border-white/30 pr-6 mr-6 tracking-tighter uppercase">DANLOG</h1>
          <span className="text-2xl font-light opacity-80">Welcome, <span className="font-bold italic">Admin</span></span>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm font-bold">
          MARCH 15, 2026
        </div>
      </header>

      {/* 2. MAIN HUB */}
      <div className="p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-[1700px] mx-auto">
        
        {/* FINANCIAL PULSE */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-8 bg-[#4475C4] rounded-full"></div>
            <h2 className="text-xl font-black uppercase italic tracking-widest text-[#4475C4]">Finance</h2>
          </div>
          
          <div className="group bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white transition-all hover:shadow-2xl hover:bg-white">
            <p className="text-[#4475C4] font-black text-xs tracking-widest uppercase mb-4 opacity-60">Daily Income</p>
            <p className="text-6xl font-black text-black tracking-tighter">₱ 1,260</p>
            <div className="mt-6 flex items-center text-green-600 font-bold text-sm bg-green-50 w-fit px-3 py-1 rounded-lg">
              9 LOADS COMPLETED
            </div>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm rounded-[2rem] p-8 shadow-xl border border-white transition-all hover:shadow-2xl hover:bg-white">
            <p className="text-[#4475C4] font-black text-xs tracking-widest uppercase mb-4 opacity-60">Monthly Revenue</p>
            <p className="text-6xl font-black text-black tracking-tighter">₱ 29,120</p>
            <p className="mt-4 text-gray-400 font-bold text-sm uppercase">196 Loads Processed</p>
          </div>
        </div>

        {/* CENTER: COMMAND CENTER */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center gap-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4475C4] to-[#6CCF9B] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-72 h-72 bg-white rounded-full border-[12px] border-white shadow-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="/assets/labadi-logo.jpg" 
                alt="Labadi Laundry Logo" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white px-12 py-2 rounded-full shadow-lg border border-gray-100 w-max flex justify-center items-center z-10">
              <span className="text-[#4475C4] font-black text-[13px] tracking-[0.2em] uppercase whitespace-nowrap">
                Labadi Laundry Shop
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-[400px]">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="relative group bg-[#4475C4] text-white py-6 rounded-2xl font-black text-xl uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(68,117,196,0.3)] overflow-hidden w-full"
            >
              <span className="relative z-10">New Order</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
            <Link href="/records" className="w-full">
            <button className="bg-white text-[#4475C4] py-6 rounded-2xl font-black text-xl uppercase tracking-[0.2em] border-2 border-[#4475C4] transition-all hover:bg-[#4475C4] hover:text-white hover:scale-105 active:scale-95 shadow-lg w-full">
              Record History
            </button>
          </Link>
            <button className="bg-[#111827] text-white py-5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-black hover:scale-105 active:scale-95 shadow-xl">
              Financial Analysis & Disbursement
            </button>
          </div>
        </div>

        {/* RIGHT: LIVE DATA */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-8 bg-yellow-400 rounded-full"></div>
            <h2 className="text-xl font-black uppercase italic tracking-widest text-black">Live Ops</h2>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-300 rounded-[2rem] p-8 shadow-xl text-black">
            <p className="font-black text-xs tracking-widest uppercase mb-4 opacity-80">Pending Orders</p>
            <p className="text-8xl font-black tracking-tighter">06</p>
            <p className="mt-4 font-bold bg-white/30 w-fit px-4 py-1 rounded-full text-xs uppercase">Action Required</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden border border-white">
            <div className="bg-black py-4 px-6 text-white text-xs font-black italic uppercase tracking-widest flex justify-between">
              <span>Customer History</span>
              <span className="text-green-400 text-[10px]">LIVE</span>
            </div>
            <div className="p-4">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="pb-3 pl-2">Name</th>
                    <th className="pb-3 text-center">Order ID</th>
                    <th className="pb-3 text-right pr-2">Loads</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  {customers.map((c, i) => (
                    <tr key={c.id} className={`hover:bg-blue-50 transition-colors ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="p-3 font-black text-black border-b border-gray-100">{c.name}</td>
                      <td className="p-3 text-center font-bold text-gray-500 italic border-b border-gray-100">{c.id}</td>
                      <td className="p-3 font-black text-right text-[#4475C4] border-b border-gray-100">{c.loads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- RENDER SEPARATED MODAL --- */}
      <NewOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}