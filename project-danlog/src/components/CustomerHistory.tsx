// @ts-nocheck
import React from 'react';
import Link from 'next/link';
import { useEffect, useRef } from "react";

export function CustomerHistory({ customers, fetchMore, hasMore, loadingMore }) {
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!bottomRef.current || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          fetchMore();
        }
      },
      {
        root: scrollRef.current,
        threshold: 0,
      }
    );

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasMore, fetchMore]);

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5 px-2">
        <h2 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#4475C4] leading-none">
          Customer History
        </h2>
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Live Status</span>
        </div>
      </div>

      {/* CONTAINER */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl flex flex-col flex-1 overflow-hidden">
        <div ref={scrollRef} className="overflow-y-auto flex-1">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-20">
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                <th className="py-4 pl-8 border-b border-slate-200">Customer Name</th>
                <th className="py-4 text-center border-b border-slate-200">Reference</th>
                <th className="py-4 text-center border-b border-slate-200">Loads</th>
                <th className="py-4 pr-8 text-right border-b border-slate-200">Status</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {customers?.map((c) => (
                <tr key={c.id} className="group hover:bg-slate-50/50 transition-colors">
                  {/* Name */}
                  <td className="py-5 pl-8">
                    <span className="font-bold text-xl text-slate-900 tracking-tight capitalize">
                      {c.customer_name}
                    </span>
                  </td>
                  
                  {/* ID - Clean text, no box */}
                  <td className="py-5 text-center">
                    <span className="text-slate-400 font-bold text-base tracking-tighter">
                      #{c.id}
                    </span>
                  </td>

                  {/* Loads - BOX REMOVED, clean typography only */}
                  <td className="py-5 text-center">
                    <span className="text-slate-900 font-black text-2xl tracking-tight">
                      {c.load}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-5 pr-8 text-right">
                    <div className="flex justify-end">
                      {c.status === 'Ready' ? (
                        <span className="relative flex">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-md border-2 border-emerald-500 opacity-40"></span>
                          <span className="badge-ready relative px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm bg-emerald-50 text-emerald-600 border border-emerald-200">
                            {c.status}
                          </span>
                        </span>
                      ) : c.status === 'Completed' ? (
                        <span className="badge-completed px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest">
                          {c.status}
                        </span>
                      ) : (
                        <span className="badge-pending animate-pulse px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">
                          {c.status}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Observer Target */}
          <div ref={bottomRef} className="py-10 flex flex-col items-center justify-center gap-2">
            {loadingMore ? (
              <div className="w-5 h-5 border-2 border-slate-200 border-t-[#4475C4] rounded-full animate-spin"></div>
            ) : hasMore ? null : (
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">End of Records</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-200 flex justify-between items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Data Sync Active</p>
          <Link 
            href="/records" 
            className="text-[10px] font-black text-[#4475C4] uppercase tracking-widest hover:text-blue-700 transition-colors"
          >
            Full Log View →
          </Link>
        </div>
      </div>
    </div>
  );
}