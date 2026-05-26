"use client";

import React from "react";
import { useTextToBase64 } from "@/hooks/useTextToBase64";

export default function TextToBase64() {
  const {
    sourceText,
    encodedText,
    isEncodeDirection,
    errorMsg,
    isCopiedSource,
    isCopiedOutput,
    isRotating,
    handleSourceChange,
    handleSwap,
    clearAllText,
    copyToClipboardText,
  } = useTextToBase64();

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Swap Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-150/40 dark:bg-zinc-900/30 border border-card-border p-4 rounded-2xl backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-amber-600 dark:text-[#FFD255]">
            {isEncodeDirection ? "Text ➔ Base64" : "Base64 ➔ Text"}
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">Real-time Unicode (UTF-8) translation sandboxed</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearAllText}
            disabled={!sourceText && !encodedText}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            Clear Fields
          </button>
        </div>
      </div>

      {/* Grid of Double Text Areas */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
        {/* Input Panel */}
        <div className="md:col-span-5 glass-panel rounded-2xl p-5 border border-card-border flex flex-col gap-3 h-[380px]">
          <div className="flex items-center justify-between border-b border-card-border pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {isEncodeDirection ? "Plain Text Input" : "Base64 String Input"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{sourceText.length.toLocaleString()} characters</span>
              <button
                onClick={() => copyToClipboardText(sourceText, true)}
                disabled={!sourceText}
                className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 disabled:opacity-20 transition-all cursor-pointer"
                title="Copy input text"
              >
                {isCopiedSource ? (
                  <svg
                    className="w-3.5 h-3.5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => handleSourceChange(e.target.value)}
            placeholder={isEncodeDirection ? "Enter UTF-8 text or emojis here..." : "Paste your base64 string to decode..."}
            className="flex-1 w-full bg-transparent border-0 resize-none font-mono text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
          />
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center">
          <button
            onClick={handleSwap}
            type="button"
            className={`w-12 h-12 rounded-full border border-card-border bg-white dark:bg-zinc-900/80 hover:bg-zinc-150 dark:hover:bg-zinc-800 flex items-center justify-center text-amber-600 dark:text-[#FFD255] shadow-lg dark:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_-5px_rgba(255,210,85,0.25)] hover:border-amber-500/30 ${
              isRotating ? "rotate-[180deg]" : ""
            }`}
            title="Swap Conversion Direction"
          >
            <svg className="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        {/* Output Panel */}
        <div className="md:col-span-5 glass-panel rounded-2xl p-5 border border-card-border flex flex-col gap-3 h-[380px] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-card-border pb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {isEncodeDirection ? "Base64 Output" : "Plain Text Output"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">{encodedText.length.toLocaleString()} characters</span>
              <button
                onClick={() => copyToClipboardText(encodedText, false)}
                disabled={!encodedText}
                className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 disabled:opacity-20 transition-all cursor-pointer"
                title="Copy output text"
              >
                {isCopiedOutput ? (
                  <svg
                    className="w-3.5 h-3.5 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {errorMsg ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-red-600 dark:text-red-400 font-mono bg-red-500/5 border border-red-500/20 rounded-xl">
              <svg className="w-8 h-8 text-red-500/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-xs font-semibold">{errorMsg}</p>
              <p className="text-[10px] text-red-500/70 dark:text-red-500/50 mt-1.5 leading-relaxed">
                Ensure you entered correct Base64 structures without invalid special characters or incomplete byte configurations.
              </p>
            </div>
          ) : (
            <textarea
              readOnly
              value={encodedText}
              placeholder={
                isEncodeDirection ? "Base64 string output will display here..." : "Decoded original text will display here..."
              }
              className="flex-1 w-full bg-transparent border-0 resize-none font-mono text-sm text-zinc-700 dark:text-zinc-400 focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
            />
          )}
        </div>
      </div>
    </div>
  );
}
