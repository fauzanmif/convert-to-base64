"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-card-border bg-zinc-50/50 dark:bg-[#050507]/60 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono font-medium">
        <div>
          &copy; {new Date().getFullYear()} Base64 Nexus. Built with dynamic precision.
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.9C1.83 4.8 1.5 4.966 1.35 5.275A9.002 9.002 0 0011 18.966c.29-.074.51-.293.575-.584a8.966 8.966 0 00.32-2.18 9 9 0 00-9.729-11.303z" clipRule="evenodd" />
            </svg>
            No Server Uploads
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure & Private
          </span>
        </div>
      </div>
    </footer>
  );
}
