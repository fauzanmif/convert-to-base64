"use client";

import React from "react";
import { ExportFormat } from "@/types";
import { useFileToBase64 } from "@/hooks/useFileToBase64";

export default function FileToBase64() {
  const {
    file,
    base64,
    mimeType,
    isDragging,
    exportFormat,
    setExportFormat,
    copiedFormat,
    isCopiedAsText,
    isLoading,
    fileInputRef,
    formattedOutput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    triggerFileInput,
    clearAll,
    copyToClipboard,
    downloadAsTextFile,
  } = useFileToBase64();

  // Preview renderer
  const renderPreview = () => {
    if (!file || !base64) return null;
    const dataUri = `data:${mimeType || "application/octet-stream"};base64,${base64}`;

    if (mimeType.startsWith("image/")) {
      return (
        <div className="relative group rounded-lg overflow-hidden border border-card-border bg-zinc-100/50 dark:bg-zinc-950 flex items-center justify-center p-4 min-h-[220px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUri}
            alt="File Preview"
            className="max-h-[300px] object-contain rounded shadow-md dark:shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      );
    }

    if (mimeType === "image/svg+xml") {
      return (
        <div className="relative group rounded-lg overflow-hidden border border-card-border bg-zinc-100/50 dark:bg-zinc-950 flex items-center justify-center p-4 min-h-[220px]">
          <iframe src={dataUri} className="max-h-[300px] max-w-full rounded bg-white p-2" title="SVG Preview" />
        </div>
      );
    }

    if (mimeType.startsWith("text/")) {
      let textSnippet = "";
      try {
        textSnippet = decodeURIComponent(escape(atob(base64))).substring(0, 500);
        if (textSnippet.length >= 500) textSnippet += "... [truncated]";
      } catch {
        textSnippet = "Binary text content (unable to parse as UTF-8 directly).";
      }

      return (
        <div className="rounded-lg border border-card-border bg-zinc-100/50 dark:bg-zinc-950 p-4 font-mono text-xs text-zinc-800 dark:text-zinc-300 overflow-auto max-h-[300px] whitespace-pre-wrap text-left transition-colors duration-300">
          <div className="text-[10px] text-zinc-500 mb-2 border-b border-card-border pb-1 uppercase tracking-wider">
            Text File Preview
          </div>
          {textSnippet}
        </div>
      );
    }

    // Default Fallback file icon
    return (
      <div className="rounded-lg border border-card-border bg-zinc-100/40 dark:bg-zinc-950/60 p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[220px] transition-colors duration-300">
        <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-900 border border-card-border flex items-center justify-center text-zinc-500 dark:text-zinc-400 shadow-md">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-850 dark:text-zinc-300 max-w-[240px] truncate">{file.name}</p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-0.5">{mimeType || "Binary Stream"}</p>
        </div>
      </div>
    );
  };

  // Size Analytics calculations
  const originalSizeInBytes = file ? file.size : 0;
  const base64Length = base64.length;
  const sizeOverheadPercentage =
    originalSizeInBytes > 0 ? Math.round(((base64Length - originalSizeInBytes) / originalSizeInBytes) * 100) : 33;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Input Section */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* File Drop Panel */}
        <div
          suppressHydrationWarning
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`glass-panel rounded-2xl p-10 text-center flex flex-col items-center justify-center border border-dashed transition-all duration-300 cursor-pointer min-h-[300px] select-none ${
            isDragging
              ? "border-purple-500 bg-purple-500/[0.04] glow-border-purple scale-[1.01]"
              : "border-card-border hover:bg-zinc-150/40 dark:hover:bg-white/[0.01]"
          }`}
          onClick={triggerFileInput}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

          {isLoading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Processing file secure sandbox...</p>
            </div>
          ) : file ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-inner">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="max-w-md">
                <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200 truncate">{file.name}</p>
                <p className="text-xs text-zinc-500 mt-1 font-mono">
                  {(file.size / 1024).toFixed(2)} KB &bull; {mimeType || "unknown type"}
                </p>
              </div>
              <div className="flex gap-2.5 mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-zinc-200 dark:border-white/[0.06] text-zinc-700 dark:text-zinc-200 transition-colors"
                >
                  Change File
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAll();
                  }}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-200 dark:border-red-500/20 text-red-650 dark:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-card-border flex items-center justify-center text-zinc-500 dark:text-zinc-400 shadow-inner transition-transform duration-300 group-hover:scale-105">
                <svg className="w-6 h-6 text-purple-650 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200">Drag & drop your file here</p>
                <p className="text-xs text-zinc-500 mt-1">or click to browse from your device</p>
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-650 font-mono mt-3 uppercase tracking-wider border border-card-border px-2.5 py-0.5 rounded bg-zinc-100/50 dark:bg-zinc-950">
                Any File Type &bull; Max 25MB recommended
              </div>
            </div>
          )}
        </div>

        {/* Exporter Block */}
        {base64 && (
          <div className="glass-panel rounded-2xl p-6 border border-card-border flex flex-col gap-4 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-card-border pb-4">
              <div className="flex flex-wrap gap-1 bg-zinc-150/50 dark:bg-zinc-950/60 p-1 rounded-lg border border-card-border">
                {(["raw", "data-uri", "html", "css", "javascript"] as ExportFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setExportFormat(fmt)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono capitalize transition-all cursor-pointer ${
                      exportFormat === fmt
                        ? "bg-purple-600 text-white shadow-inner font-semibold"
                        : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    {fmt === "raw" ? "Raw String" : fmt === "data-uri" ? "Data URI" : fmt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-700 dark:text-purple-300 transition-colors cursor-pointer"
                >
                  {copiedFormat === exportFormat ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-emerald-500 font-mono">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={downloadAsTextFile}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/[0.08] text-zinc-750 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  {isCopiedAsText ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-emerald-400">Downloaded</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span>Save .txt</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Faux Code Block viewport */}
            <div className="relative group">
              <div className="absolute top-2.5 right-2.5 text-[9px] font-mono text-zinc-500 select-none pointer-events-none uppercase tracking-wider bg-zinc-900 dark:bg-zinc-800 border border-card-border px-1.5 py-0.5 rounded">
                {exportFormat} output
              </div>
              <textarea
                readOnly
                value={formattedOutput}
                className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 focus:outline-none focus:border-purple-500/40 select-all resize-none shadow-inner"
              />
            </div>
          </div>
        )}
      </div>

      {/* Right Details/Preview Sidebar */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Dynamic Preview Drawer */}
        <div className="glass-panel rounded-2xl p-6 border border-card-border flex flex-col gap-4">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-purple-650 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            Live Preview Sandbox
          </h3>

          {file ? (
            renderPreview()
          ) : (
            <div className="rounded-lg border border-card-border border-dashed p-10 flex flex-col items-center justify-center gap-2 text-center text-zinc-400 dark:text-zinc-650 min-h-[220px]">
              <svg
                className="w-8 h-8 opacity-40 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs font-mono uppercase tracking-widest font-bold">No active file to preview</p>
            </div>
          )}
        </div>

        {/* Analytics Card */}
        <div className="glass-panel rounded-2xl p-6 border border-card-border flex flex-col gap-4 relative overflow-hidden">
          <h3 className="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-300 flex items-center gap-1.5 border-b border-card-border pb-3">
            <svg className="w-4 h-4 text-purple-650 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
              />
            </svg>
            MIME & Storage Analysis
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-100/50 dark:bg-zinc-950/40 border border-card-border p-3.5 rounded-xl">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block font-mono font-bold">Original Bytes</span>
              <span className="text-lg font-bold font-mono tracking-tight text-zinc-850 dark:text-zinc-200 mt-1 block">
                {file ? originalSizeInBytes.toLocaleString() : "0"}
              </span>
            </div>
            <div className="bg-zinc-100/50 dark:bg-zinc-950/40 border border-card-border p-3.5 rounded-xl">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block font-mono font-bold">Base64 Length</span>
              <span className="text-lg font-bold font-mono tracking-tight text-purple-650 dark:text-purple-400 mt-1 block">
                {base64 ? base64Length.toLocaleString() : "0"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 mt-1 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
            <div className="flex items-center justify-between border-b border-card-border pb-1.5">
              <span>Overhead Premium</span>
              <span className={base64 ? "text-pink-600 dark:text-pink-400 font-bold" : "text-zinc-400 dark:text-zinc-600"}>
                {base64 ? `+${sizeOverheadPercentage}%` : "0%"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-card-border pb-1.5">
              <span>Estimated Raw Size</span>
              <span className="text-zinc-800 dark:text-zinc-300 font-bold">{base64 ? `${(base64Length / 1024).toFixed(2)} KB` : "0.00 KB"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Transfer Compression</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Enabled (Deflate-safe)</span>
            </div>
          </div>

          <div className="bg-zinc-100/50 dark:bg-zinc-950/60 border border-card-border p-3.5 rounded-xl text-[10px] text-zinc-500 dark:text-zinc-500 leading-relaxed font-mono mt-1 transition-colors duration-300">
            <span className="text-zinc-700 dark:text-zinc-400 font-bold block mb-0.5">Why does the size increase?</span>
            Base64 uses 4 characters to represent every 3 bytes of binary data. This creates an structural overhead of
            approximately 33%, excluding header definitions.
          </div>
        </div>
      </div>
    </div>
  );
}
