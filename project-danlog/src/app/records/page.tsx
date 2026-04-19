// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RecordsHeader } from '../../components/RecordsHeader';
import { StatusTracker } from '../../components/StatusTracker';
import { DailyLogTable } from '../../components/DailyLogTable';
import { fetchRecordLogs } from '../../services/laundryService';

export default function RecordsPage() {
  const [records, setRecords] = useState([]); // empty sa start
  const [loading, setLoading] = useState(true);

  // runs when the page opens on your tablet
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRecordLogs();
      setRecords(data);
      setLoading(false);
    };
    loadData();
  }, []);

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

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-[#4475C4] font-black animate-pulse uppercase tracking-[0.2em]">
              Synchronizing with Database...
            </p>
          </div>
        ) : (
          <>
            <StatusTracker records={records} onUpdateStatus={updateStatus} />
            <DailyLogTable records={records} />
          </>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4475C4; border-radius: 10px; border: 2px solid #FFFFFF; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </main>
  );
}