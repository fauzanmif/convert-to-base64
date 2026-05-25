import { useState } from "react";
import { safeEncode, safeDecode } from "@/utils/base64";

export const useTextToBase64 = () => {
  const [sourceText, setSourceText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [isEncodeDirection, setIsEncodeDirection] = useState(true); // true = raw->b64, false = b64->raw
  const [errorMsg, setErrorMsg] = useState("");
  const [isCopiedSource, setIsCopiedSource] = useState(false);
  const [isCopiedOutput, setIsCopiedOutput] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleSourceChange = (val: string) => {
    setSourceText(val);
    setErrorMsg("");
    if (isEncodeDirection) {
      setEncodedText(safeEncode(val));
    } else {
      if (!val) {
        setEncodedText("");
        return;
      }
      try {
        setEncodedText(safeDecode(val));
      } catch (err: unknown) {
        setEncodedText("");
        const message = err instanceof Error ? err.message : "Invalid Base64 sequence detected";
        setErrorMsg(message);
      }
    }
  };

  const handleSwap = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);

    const tempSource = sourceText;
    const tempEncoded = encodedText;

    setSourceText(tempEncoded);
    setEncodedText(tempSource);
    setIsEncodeDirection(!isEncodeDirection);
    setErrorMsg("");
  };

  const clearAllText = () => {
    setSourceText("");
    setEncodedText("");
    setErrorMsg("");
  };

  const copyToClipboardText = async (text: string, isSource: boolean) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (isSource) {
        setIsCopiedSource(true);
        setTimeout(() => setIsCopiedSource(false), 2000);
      } else {
        setIsCopiedOutput(true);
        setTimeout(() => setIsCopiedOutput(false), 2000);
      }
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  return {
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
  };
};
