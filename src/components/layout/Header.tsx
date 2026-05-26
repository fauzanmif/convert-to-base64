"use client";

import React from "react";
import ThemeToggle from "../theme-toggle";

export default function Header() {
  return (
    <header className="relative w-full max-w-7xl mx-auto px-4 pt-8 pb-4 flex items-center justify-between border-b border-card-border">
      <div className="flex items-center gap-3">
        {/* Premium Brand Badge */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-zinc-300 via-zinc-400 to-zinc-500 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-500 p-[1.5px] shadow-sm">
          <div className="w-full h-full bg-zinc-50 dark:bg-black rounded-[10px] flex items-center justify-center font-black text-xs text-zinc-700 dark:text-[#FFD255]">
            B64
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-700 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
            Base64 <span className="text-amber-500 dark:text-[#FFD255] font-bold">Converter</span>
          </h1>
          <p className="text-[9px] text-muted-text uppercase tracking-widest font-mono font-bold mt-0.5">Secure Client-Side Converter</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Premium Sandbox Status Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-zinc-150/40 dark:bg-zinc-900/30 border border-card-border px-3.5 py-2 rounded-xl backdrop-blur-md">
          <div className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">
            100% Local Sandbox
          </span>
        </div>

        {/* Premium Theme Switcher */}
        <ThemeToggle />
      </div>
    </header>
  );
}
