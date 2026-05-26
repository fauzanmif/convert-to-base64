"use client";

import React from "react";
import { COMMON_MIME_TYPES } from "@/utils/constants";
import { useBase64ToFile } from "@/hooks/useBase64ToFile";

export default function Base64ToFile() {
  const {
    inputText,
    detectedMime,
    selectedMime,
    setSelectedMime,
    selectedExt,
    setSelectedExt,
    customFilename,
    setCustomFilename,
    errorMsg,
    downloadSuccess,
    handleInputChange,
    triggerDownload,
    selectPredefinedMime,
    clearDecoder,
  } = useBase64ToFile();

  // Render a visual preview if it parses successfully
  const getInlinePreview = () => {
    if (!inputText) return null;
    let base64Only = inputText.trim();
    const headerIndex = base64Only.indexOf(";base64,");
    if (headerIndex !== -1) {
      base64Only = base64Only.substring(headerIndex + 8);
    }

    const mimeToUse = detectedMime || selectedMime;
    if (!mimeToUse.startsWith("image/") && mimeToUse !== "image/svg+xml") return null;

    try {
      // Small verification to check if atob crashes on it
      atob(base64Only.substring(0, 100).replace(/\s+/g, ""));
      const previewDataUri = `data:${mimeToUse};base64,${base64Only}`;

      return (
        <div className="rounded-xl border border-card-border bg-zinc-100/50 dark:bg-zinc-950 p-4 flex flex-col items-center justify-center gap-2 transition-colors duration-300">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono border-b border-card-border w-full pb-1 mb-2 text-center">
            Decoded Image Preview
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewDataUri}
            className="max-h-[140px] max-w-full object-contain rounded bg-zinc-200 dark:bg-zinc-900 border border-card-border"
            alt="Decoded File Preview"
          />
        </div>
      );
    } catch {
      return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
      {/* Input panel (Left) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-card-border flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-card-border pb-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 font-mono uppercase tracking-wider">
                Paste Base64 or Data URI
              </h3>
              <p className="text-[10px] text-zinc-500 mt-0.5 font-sans">
                Supports pure base64 strings or `data:*/*;base64,...` formats
              </p>
            </div>
            {inputText && (
              <button
                onClick={clearDecoder}
                className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-650 dark:text-red-400 text-xs border border-red-200 dark:border-red-500/20 transition-all cursor-pointer font-sans"
              >
                Clear
              </button>
            )}
          </div>

          {/* Code textarea - remains styled dark for proper editor aesthetics */}
          <textarea
            value={inputText}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste base64 code here (e.g. data:image/png;base64,iVBORw... or raw string)"
            className="w-full h-56 bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:border-amber-500/40 shadow-inner"
          />

          {detectedMime && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono">
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                Auto-detected: <strong>{detectedMime}</strong>
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl flex items-start gap-2.5 text-xs text-red-650 dark:text-red-400 font-mono">
              <svg className="w-4 h-4 mt-0.5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="font-semibold">Decoding failed</p>
                <p className="opacity-90 text-[10px] mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Settings/Download panel (Right) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Settings block */}
        <div className="glass-panel rounded-2xl p-6 border border-card-border flex flex-col gap-4">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5 border-b border-card-border pb-3">
            <svg className="w-4 h-4 text-amber-500 dark:text-[#FFD255]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Decoder Configurations
          </h3>

          {/* Filename Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Filename Prefix</label>
            <input
              type="text"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value.replace(/[^a-zA-Z0-9_\-]/g, ""))}
              placeholder="Filename prefix"
              className="bg-zinc-100 dark:bg-zinc-950 border border-card-border rounded-xl px-4 py-2 text-xs font-mono text-zinc-800 dark:text-zinc-350 focus:outline-none focus:border-amber-500/40"
            />
          </div>

          {/* MIME Select (Enabled only if NOT detected via data uri) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
              Target File Type {detectedMime ? "(Overridden by Auto-Detect)" : ""}
            </label>
            <div className={`grid grid-cols-3 gap-2 ${detectedMime ? "opacity-30 pointer-events-none" : ""}`}>
              {COMMON_MIME_TYPES.map((t) => (
                <button
                  key={t.mime}
                  onClick={() => selectPredefinedMime(t.mime, t.ext)}
                  className={`p-2 rounded-xl border text-[10px] text-center font-mono font-semibold transition-all cursor-pointer ${
                    selectedMime === t.mime
                      ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-[#FFD255]"
                      : "bg-zinc-100 dark:bg-zinc-950 border-card-border text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  <span className="block truncate">{t.label.split(" ")[0]}</span>
                  <span className="block opacity-55 text-[8px] mt-0.5">.{t.ext}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom mime parameters if advanced */}
          {!detectedMime && (
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Mime Type</span>
                <input
                  type="text"
                  value={selectedMime}
                  onChange={(e) => setSelectedMime(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-950 border border-card-border rounded-lg px-3 py-1.5 text-[10px] font-mono text-zinc-700 dark:text-zinc-450"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">Extension</span>
                <input
                  type="text"
                  value={selectedExt}
                  onChange={(e) => setSelectedExt(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-950 border border-card-border rounded-lg px-3 py-1.5 text-[10px] font-mono text-zinc-700 dark:text-zinc-450"
                />
              </div>
            </div>
          )}

          {/* Inline Preview if applicable */}
          {getInlinePreview()}

          {/* Download Button */}
          <button
            onClick={triggerDownload}
            disabled={!inputText}
            className={`w-full py-3 mt-2 rounded-xl text-xs font-bold font-mono tracking-wide uppercase transition-all duration-300 shadow-md cursor-pointer ${
              inputText
                ? "bg-[#FFD255] hover:bg-[#ffe082] text-zinc-900 active:scale-[0.985] shadow-amber-500/10 hover:shadow-amber-500/20"
                : "bg-zinc-100 dark:bg-zinc-900 border border-card-border text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
            }`}
          >
            {downloadSuccess ? (
              <span className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <svg
                  className="w-4 h-4 text-emerald-500 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                File Downloaded Successfully!
              </span>
            ) : (
              "Reconstruct & Download File"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
