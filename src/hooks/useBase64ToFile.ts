import { useState, useEffect } from "react";
import { decodeBase64ToBlob } from "@/utils/base64";

export const useBase64ToFile = () => {
  const [inputText, setInputText] = useState("");
  const [detectedMime, setDetectedMime] = useState("");
  const [selectedMime, setSelectedMime] = useState("image/png");
  const [selectedExt, setSelectedExt] = useState("png");
  const [customFilename, setCustomFilename] = useState("decoded_file");
  const [errorMsg, setErrorMsg] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleInputChange = (val: string) => {
    setInputText(val);
    setErrorMsg("");
    setDownloadSuccess(false);

    // Try auto-detecting base64 / Data URI headers
    // Format matches: data:image/png;base64,...
    const dataUriRegex = /^data:([^;]+);base64,([\s\S]*)$/;
    const match = val.trim().match(dataUriRegex);

    if (match) {
      const mime = match[1];
      setDetectedMime(mime);
      setSelectedMime(mime);

      // Guess extension
      const inferredExt = mime.split("/")[1] || "bin";
      setSelectedExt(inferredExt);
    } else {
      setDetectedMime("");
    }
  };

  const triggerDownload = () => {
    if (!inputText) return;
    setErrorMsg("");
    setDownloadSuccess(false);

    let rawBase64 = inputText.trim();

    // Strip Data URI header if present
    const headerIndex = rawBase64.indexOf(";base64,");
    if (headerIndex !== -1) {
      rawBase64 = rawBase64.substring(headerIndex + 8);
    }

    try {
      const mimeTypeToUse = detectedMime || selectedMime;
      const blob = decodeBase64ToBlob(rawBase64, mimeTypeToUse);
      const url = URL.createObjectURL(blob);
      setObjectUrl(url);

      const downloadName = `${customFilename || "decoded"}.${selectedExt}`;
      const a = document.createElement("a");
      a.href = url;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Decoding error.";
      setErrorMsg(message);
    }
  };

  const selectPredefinedMime = (mime: string, ext: string) => {
    setSelectedMime(mime);
    setSelectedExt(ext);
  };

  const clearDecoder = () => {
    setInputText("");
    setDetectedMime("");
    setErrorMsg("");
    setDownloadSuccess(false);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
  };

  return {
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
    objectUrl,
    handleInputChange,
    triggerDownload,
    selectPredefinedMime,
    clearDecoder,
  };
};
