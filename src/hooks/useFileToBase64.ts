import { useState, useRef } from "react";
import { ExportFormat } from "../types";
import { getFormattedOutput } from "../utils/base64";

export const useFileToBase64 = () => {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("raw");
  const [copiedFormat, setCopiedFormat] = useState<ExportFormat | null>(null);
  const [isCopiedAsText, setIsCopiedAsText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (selectedFile: File) => {
    setIsLoading(true);
    setFile(selectedFile);
    setMimeType(selectedFile.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const resultString = e.target.result as string;
        // The result is in data uri format, e.g. "data:image/png;base64,iVBORw..."
        const rawB64 = resultString.split(",")[1] || "";
        setBase64(rawB64);
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      alert("Error reading file");
      setIsLoading(false);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearAll = () => {
    setFile(null);
    setBase64("");
    setMimeType("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formattedOutput = getFormattedOutput(base64, mimeType, exportFormat, file?.name);

  const copyToClipboard = async () => {
    if (!formattedOutput) return;
    try {
      await navigator.clipboard.writeText(formattedOutput);
      setCopiedFormat(exportFormat);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const downloadAsTextFile = () => {
    if (!base64) return;
    const blob = new Blob([formattedOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file ? file.name.split(".")[0] : "base64"}_encoded_${exportFormat}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsCopiedAsText(true);
    setTimeout(() => setIsCopiedAsText(false), 2000);
  };

  return {
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
  };
};
