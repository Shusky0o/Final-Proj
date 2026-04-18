// @ts-nocheck
import React from 'react';
import Link from 'next/link';

// Internal Icons for the Command Center
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const LogIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>;
const ChartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;

export const CommandCenter = ({ onNewOrder }) => {
  const mainButtonStyle = "z-50 relative group bg-[#4475C4] hover:bg-[#365fa1] text-white p-6 md:p-8 lg:p-5 rounded-[3rem] font-black text-lg uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-[#4475C4]/40 overflow-hidden w-full flex items-center justify-center gap-3";
  
  // Added min-h-[70px] and flex-1 to ensure both buttons are identical thickness
  const secondaryButtonStyle = "z-50 relative flex items-center justify-center gap-2 w-full min-h-[70px] p-4 bg-white border-2 border-[#4475C4] rounded-[3rem] font-black text-[11px] uppercase tracking-widest text-[#4475C4] hover:bg-[#4475C4] hover:text-white transition-all shadow-lg hover:shadow-[#4475C4]/20 whitespace-nowrap";

  return (
    <div className="w-full max-w-[420px] space-y-6 md:space-y-10">
      {/* Logo Section */}
      <div className="relative mx-auto w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4475C4] to-blue-300 rounded-full animate-spin-slow opacity-20 blur-3xl"></div>
        <div className="relative w-full h-full p-4 bg-white rounded-full shadow-2xl border-[12px] border-white overflow-hidden transition-transform hover:scale-105">
          <img src="/assets/labadi-logo.jpg" alt="Labadi" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-4 bg-[#1A2B47] px-10 py-3 rounded-2xl shadow-2xl border-4 border-white">
          <span className="text-white font-black text-xs tracking-[0.3em] uppercase italic">LABADI HUB</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 md:space-y-6">
        <button onClick={onNewOrder} className={mainButtonStyle}>
          <PlusIcon /> <span>New Order</span>
        </button>
        
        {/* Using items-stretch to force both columns to match height */}
        <div className="grid grid-cols-2 gap-4 items-stretch">
          <Link href="/records" className="flex">
            <button className={secondaryButtonStyle}>
              <LogIcon /> 
              <span>Record Log</span>
            </button>
          </Link>
          <Link href="/financial" className="flex">
            <button className={secondaryButtonStyle}>
              <ChartIcon /> 
              <span>Financial Analysis</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};