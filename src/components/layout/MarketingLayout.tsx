import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
