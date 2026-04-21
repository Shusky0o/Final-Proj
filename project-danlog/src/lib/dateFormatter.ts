// src/lib/dateFormatter.ts

const months: Record<string, number> = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12,
};

export function getMonthNumber(monthName: string) {
  return months[monthName.toLowerCase()] ?? null;
}

export function formatDate(): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  };
  
  // This will give you "Tuesday, April 21, 2026"
  const dateStr = new Date().toLocaleDateString('en-US', options);
  
  // .toUpperCase() makes it "TUESDAY, APRIL 21, 2026"
  return dateStr.toUpperCase();
}