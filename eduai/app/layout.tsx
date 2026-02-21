"use client"
import Header from "@/components/Header";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { useState } from "react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f1115] to-[#0a0a0a] text-white">
          <Header onToggleSidebar={() => setCollapsed(!collapsed)} />

          <div className="flex">
            <Sidebar collapsed={collapsed} />

            <main className="flex-1 p-6 transition-all duration-300">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
