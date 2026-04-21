// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import NewOrderModal from './NewOrderModal'; 
import { StatsPulse } from '../components/StatsPulse';
import { CommandCenter } from '../components/CommandCenter';
import { CustomerHistory } from '../components/CustomerHistory';

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchLatestOrder() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders?limit=20`
        );

        const result = await res.json();
        setCustomers(result.data);

      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    }

    fetchLatestOrder();
  }, []);

  const fetchMore = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
      url.searchParams.append("limit", "20");

      if (cursor) {
        url.searchParams.append("cursorCreatedAt", cursor.created_at);
        url.searchParams.append("cursorId", cursor.id);
      }

      const res = await fetch(url.toString());
      const result = await res.json();

      setCustomers((prev) => [...prev, ...result.data]);
      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } catch (err) {
      console.error("Failed to fetch more:", err);
    }

    setLoadingMore(false);
  };

  return (
    <main className="h-auto bg-[#F0F4FA] flex flex-col font-sans text-black relative text-sm pb-20">
      <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 w-full max-w-[1900px] mx-auto">
        <div className="md:col-span-2 lg:col-span-3"><StatsPulse /></div>
        <div className="md:col-span-2 lg:col-span-4 flex items-center justify-center">
          <CommandCenter onNewOrder={() => setIsModalOpen(true)} />
        </div>
        <div className="lg:col-span-5"><CustomerHistory customers={customers} fetchMore={fetchMore} hasMore={hasMore} /></div>
      </div>

      <NewOrderModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false) }   
      onSubmit={(data) => {
        setCustomers((prev) => [data, ...prev]);
      }} 
      />

      <style jsx>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </main>
  );
}