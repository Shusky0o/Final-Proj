// @ts-nocheck
import React from 'react';
import Link from 'next/link';

export const RecordsHeader = () => (
  <header className="z-[100] bg-white px-12 py-5 flex items-center justify-between w-full border-b border-gray-100 sticky top-0">
    <div className="flex items-center gap-6">
      <Link href="/">
        <div className="bg-[#4475C4] text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-[#4475C4]/30 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none">DL</h1>
        </div>
      </Link>
      <div className="flex flex-col">
        <h1 className="text-[10px] font-black tracking-[0.4em] text-[#4475C4] uppercase leading-tight opacity-70">Danlog System</h1>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#1A2B47] tracking-tight">Record <span className="text-[#4475C4]">Log</span></span>
        </div>
      </div>
    </div>
    <div className="bg-[#1A2B47] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md italic">
      MARCH 15, 2026
    </div>
  </header>
);