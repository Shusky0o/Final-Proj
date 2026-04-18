// @ts-nocheck
import React from 'react';
import Link from 'next/link';
import { useEffect, useRef } from "react";

export function CustomerHistory({ customers, fetchMore, hasMore }) {
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!bottomRef.current || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Observer fired", entries[0].isIntersecting);
        if (entries[0].isIntersecting && hasMore) {
          console.log("Fetching more...");
          fetchMore();
        }
      },
      {
        root: scrollRef.current, // ✅ correct scroll container
        threshold: 0, // smoother trigger
      }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [hasMore, fetchMore]);

  return(
  <div className="flex flex-col h-[calc(100vh-10rem)]">
    <div className="flex items-center justify-between mb-6 px-4">
      <h2 className="text-[15px] font-[1000] uppercase tracking-[0.4em] text-[#4475C4] leading-none">Customer History</h2>
      <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full text-green-600">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-[10px] font-black uppercase">System Online</span>
      </div>
    </div>

    <div className="bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white flex flex-col flex-1 overflow-hidden">
      <div ref={scrollRef} className="overflow-y-auto flex-1">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-20">
            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="py-6 pl-10 border-b border-gray-50">Customer</th>
              <th className="py-6 text-center border-b border-gray-50">ID</th>
              <th className="py-6 text-center border-b border-gray-50">Loads</th>
              <th className="py-6 pr-10 text-right border-b border-gray-50">Status</th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {customers?.map((c) => (
              <tr key={c.id} className="group hover:bg-white transition-all">
                <td className="py-5 pl-10 border-b border-gray-50/50 font-black text-[#1A2B47]">{c.customer_name}</td>
                <td className="py-5 text-center border-b border-gray-50/50 font-bold text-gray-300 italic">#{c.id}</td>
                <td className="py-5 text-center border-b border-gray-50/50">
                  <span className="bg-gray-50 text-gray-500 px-3 py-1 rounded-lg font-black text-[11px]">{c.load}</span>
                </td>
                <td className="py-5 pr-10 text-right border-b border-gray-50/50">
                <span className={`inline-flex items-center gap-1.5 text-[15px] font-black uppercase px-4 py-1.5 rounded-full shadow-sm ${ c.status === 'Ready' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-[#4475C4] border border-blue-100 animate-pulse' }`}> 
                    {c.status === 'Ready' && <div className="w-1 h-1 bg-green-600 rounded-full animate-ping"></div>} 
                    {c.status} 
                </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={bottomRef} className="h-20 flex items-center justify-center">
          {hasMore ? "Loading..." : "No more data"}
        </div>
      </div>
      <div className="p-8 bg-gray-50/30 border-t border-gray-100 flex justify-between items-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Global Activity Monitor</p>
        <Link href="/records" className="text-[10px] font-black text-[#4475C4] uppercase tracking-widest hover:underline">Full Command Log</Link>
      </div>
    </div>
  </div>
  )
};