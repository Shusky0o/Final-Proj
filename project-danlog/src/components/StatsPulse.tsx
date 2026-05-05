// @ts-nocheck
import React from 'react';

interface StatsPulseProps {
  pendingCount?: number;
  todayRevenue?: number;
  monthlyRevenue?: number;
  isLoading?: boolean; // Added an explicit loading prop for better control
}

export const StatsPulse = ({ pendingCount, todayRevenue, monthlyRevenue, isLoading }: StatsPulseProps) => {
  // Determine loading state based on prop or missing data
  const isPendingLoading = isLoading || pendingCount === undefined;
  const isRevenueLoading = isLoading || todayRevenue === undefined;
  const isAverageLoading = isLoading || monthlyRevenue === undefined;

  return (
    <section className="space-y-4 md:space-y-6 flex flex-col flex-wrap h-full overflow-y-auto pr-2">
      <h2 className="text-[13px] md:text-[15px] font-black uppercase tracking-[0.3em] text-gray-400 pl-2">
        Operational Pulse
      </h2>

      {/* Main Stats Card */}
      <div className={`rounded-[3rem] p-6 md:p-8 shadow-2xl relative overflow-hidden transition-colors duration-500 ${
        isPendingLoading ? 'bg-gray-200 animate-pulse' : 'bg-[#4475C4] text-white shadow-[#4475C4]/40'
      }`}>
        {!isPendingLoading && <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>}
        
        <p className={`font-bold text-xs uppercase tracking-widest mb-1 ${isPendingLoading ? 'bg-gray-300 h-3 w-20 rounded' : 'opacity-80'}`}>
          {isPendingLoading ? '' : 'In Queue'}
        </p>
        
        <div className="flex items-end gap-3 mt-2">
          {isPendingLoading ? (
            <div className="h-16 w-24 bg-gray-300 rounded-2xl"></div>
          ) : (
            <>
              <span className="text-7xl font-black tracking-tighter leading-none">{pendingCount}</span>
              <span className="text-sm font-bold pb-2 opacity-60 italic uppercase tracking-widest">Orders</span>
            </>
          )}
        </div>

        <div className={`mt-6 flex items-center gap-2 w-fit px-4 py-2 rounded-2xl border ${
          isPendingLoading ? 'bg-gray-300 border-transparent' : 'bg-black/20 backdrop-blur-md border-white/10'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isPendingLoading ? 'bg-gray-400' : 'bg-green-400 animate-pulse'}`}></div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${isPendingLoading ? 'text-transparent' : ''}`}>
            Live Tracking
          </span>
        </div>
      </div>

      {/* Today's Revenue Card */}
      <div className={`rounded-[3rem] p-6 md:p-8 shadow-xl border transition-all ${
        isRevenueLoading 
          ? 'bg-gray-100 border-gray-100 animate-pulse' 
          : 'bg-white shadow-gray-200/50 border-white hover:scale-[1.02]'
      }`}>
        <p className={`font-black text-[10px] tracking-[0.2em] uppercase mb-2 ${
          isRevenueLoading ? 'bg-gray-200 h-3 w-32 rounded' : 'text-[#4475C4] opacity-50'
        }`}>
          {isRevenueLoading ? '' : "Today's Revenue"}
        </p>
        <div className="flex items-center gap-2">
          {isRevenueLoading ? (
            <div className="h-10 w-48 bg-gray-200 rounded-xl"></div>
          ) : (
            <>
              <span className="text-3xl md:text-4xl font-black text-[#1A2B47]">
                ₱{todayRevenue?.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Monthly Average Card */}
      <div className={`rounded-[3rem] p-6 md:p-8 shadow-xl border transition-all ${
        isAverageLoading 
          ? 'bg-gray-100 border-gray-100 animate-pulse' 
          : 'bg-white shadow-gray-200/50 border-white hover:scale-[1.02]'
      }`}>
        <p className={`font-black text-[10px] tracking-[0.2em] uppercase mb-2 ${
          isAverageLoading ? 'bg-gray-200 h-3 w-32 rounded' : 'text-gray-400'
        }`}>
          {isAverageLoading ? '' : 'Monthly Average'}
        </p>
        <div className="flex items-center gap-2">
          {isAverageLoading ? (
            <div className="h-10 w-48 bg-gray-200 rounded-xl"></div>
          ) : (
            <>
              <span className="text-3xl md:text-4xl font-black text-[#1A2B47]">
                ₱{monthlyRevenue?.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </span>
              <div className="w-2 h-2 bg-[#4475C4] rounded-full opacity-20"></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};