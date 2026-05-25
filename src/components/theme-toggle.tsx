"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevents Next.js hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    // Stable placeholder skeleton to prevent cumulative layout shift
    return (
      <div className="w-10 h-10 rounded-xl bg-zinc-100/10 dark:bg-zinc-900/40 border border-zinc-200/20 dark:border-white/[0.04] backdrop-blur-xl animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative w-10 h-10 rounded-xl bg-zinc-100/45 hover:bg-zinc-200/50 border border-zinc-200/50 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/80 dark:border-white/[0.06] backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] group focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-md shadow-purple-500/5 dark:shadow-none"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Dynamic Hover Glow */}
      <span className="absolute inset-0 rounded-xl bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-300 pointer-events-none blur-sm" />

      {/* Sun Icon */}
      <svg
        className="w-5 h-5 text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform scale-100 rotate-0 opacity-100 dark:scale-0 dark:rotate-90 dark:opacity-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
        />
      </svg>

      {/* Moon Icon */}
      <svg
        className="absolute w-5 h-5 text-indigo-300 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform scale-0 -rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
