// @ts-nocheck
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RecordsHeader } from '../../components/RecordsHeader';
import { StatusTracker } from '../../components/StatusTracker';
import { DailyLogTable } from '../../components/DailyLogTable';

export default function RecordsPage() {
  const [records, setRecords] = useState([
    { id: "#108", name: "Guilaran, Red", loads: 6, time: "10:30 AM", status: "Ready" },
    { id: "#107", name: "Sdani", loads: 1, time: "10:15 AM", status: "Ready" },
    { id: "#106", name: "Ilon Ziv", loads: 2, time: "09:45 AM", status: "In Queue" },
    { id: "#105", name: "Jaja", loads: 4, time: "09:20 AM", status: "In Queue" },
    { id: "#104", name: "Minatozaki Sana", loads: 2, time: "08:50 AM", status: "Completed" },
    { id: "#103", name: "Ahron A.", loads: 2, time: "08:30 AM", status: "Completed" },
    { id: "#102", name: "Wilhelm", loads: 3, time: "08:15 AM", status: "Completed" },
    { id: "#101", name: "Soph M.", loads: 1, time: "08:00 AM", status: "Completed" },
  ]);

  const updateStatus = (id, newStatus) => {
    setRecords(prev => prev.map(record => 
      record.id === id ? { ...record, status: newStatus } : record
    ));
  };

  return (
    <main className="h-screen overflow-hidden bg-[#F0F4FA] flex flex-col font-sans text-black relative">
      <RecordsHeader />

      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar space-y-8">
        <div className="max-w-[1700px] mx-auto w-full flex justify-end">
          <Link href="/">
            <button className="bg-white border-2 border-[#4475C4] text-[#4475C4] px-8 py-3 rounded-2xl font-[1000] uppercase tracking-widest hover:bg-[#4475C4] hover:text-white transition-all shadow-lg active:scale-95">
              ← Dashboard
            </button>
          </Link>
        </div>

        <StatusTracker records={records} onUpdateStatus={updateStatus} />
        <DailyLogTable records={records} />
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4475C4; border-radius: 10px; border: 2px solid #FFFFFF; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  );
}