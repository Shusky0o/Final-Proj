// @ts-nocheck
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "../components/LayoutWrapper"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Danlog System",
  description: "Dashboard and Records Management",
};

// Removed the { children } prop and the TypeScript type for it
export default function RootLayout() {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* LayoutWrapper now controls the Header and chooses which Page to show */}
        <LayoutWrapper />
      </body>
    </html>
  );
}