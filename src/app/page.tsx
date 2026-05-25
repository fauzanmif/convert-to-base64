"use client";

import { useState } from "react";
import { Tab } from "@/types";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FileToBase64Module from "@/components/modules/FileToBase64";
import TextToBase64Module from "@/components/modules/TextToBase64";
import Base64ToFileModule from "@/components/modules/Base64ToFile";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("file-to-base64");

  return (
    <div className="min-h-screen bg-background bg-accent-radial text-foreground flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-200 transition-colors duration-300">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-pulse-1 rounded-full blur-3xl pointer-events-none animate-pulse-slow transition-colors duration-300" />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-accent-pulse-2 rounded-full blur-3xl pointer-events-none animate-pulse-slow transition-colors duration-300" style={{ animationDelay: "2s" }} />

      {/* Header / Navigation */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1 bg-zinc-150/40 dark:bg-zinc-900/60 backdrop-blur-xl border border-card-border rounded-xl shadow-lg dark:shadow-2xl transition-all duration-300">
            <button
              onClick={() => setActiveTab("file-to-base64")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "file-to-base64"
                  ? "bg-white dark:bg-white/[0.06] text-zinc-900 dark:text-white shadow-sm dark:shadow-inner border border-zinc-200 dark:border-white/[0.08]"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              File to Base64
            </button>
            <button
              onClick={() => setActiveTab("text-to-base64")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "text-to-base64"
                  ? "bg-white dark:bg-white/[0.06] text-zinc-900 dark:text-white shadow-sm dark:shadow-inner border border-zinc-200 dark:border-white/[0.08]"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 7.363 16.347 1 18" />
              </svg>
              Text Encoder / Decoder
            </button>
            <button
              onClick={() => setActiveTab("base64-to-file")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "base64-to-file"
                  ? "bg-white dark:bg-white/[0.06] text-zinc-900 dark:text-white shadow-sm dark:shadow-inner border border-zinc-200 dark:border-white/[0.08]"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Base64 to File
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[500px]">
          {activeTab === "file-to-base64" && <FileToBase64Module />}
          {activeTab === "text-to-base64" && <TextToBase64Module />}
          {activeTab === "base64-to-file" && <Base64ToFileModule />}
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
