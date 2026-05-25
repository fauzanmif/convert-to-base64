import { ExportFormat } from "../types";

/**
 * Safe Unicode Text Encoder
 * Handles emojis and non-latin characters properly
 */
export const safeEncode = (str: string): string => {
  if (!str) return "";
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return "Encoding Error: Invalid character set";
  }
};

/**
 * Safe Unicode Text Decoder
 * Decodes base64 string back into standard UTF-8 string
 */
export const safeDecode = (b64: string): string => {
  if (!b64) return "";
  const cleanB64 = b64.replace(/\s+/g, ""); // Strip whitespace
  try {
    return decodeURIComponent(escape(atob(cleanB64)));
  } catch {
    throw new Error("Invalid Base64 sequence detected");
  }
};

/**
 * Decodes a raw base64 string into a binary Blob
 */
export const decodeBase64ToBlob = (b64Data: string, type: string): Blob => {
  try {
    const byteCharacters = atob(b64Data.trim().replace(/\s+/g, ""));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: type });
  } catch {
    throw new Error("Base64 decoding failed. Make sure the input string is valid base64.");
  }
};

/**
 * Helper to get base64 formatted output string based on the export format
 */
export const getFormattedOutput = (
  base64: string,
  mimeType: string,
  format: ExportFormat,
  fileName?: string
): string => {
  if (!base64) return "";
  const dataUri = `data:${mimeType || "application/octet-stream"};base64,${base64}`;
  switch (format) {
    case "raw":
      return base64;
    case "data-uri":
      return dataUri;
    case "html":
      if (mimeType.startsWith("image/")) {
        return `<img src="${dataUri}" alt="${fileName || "Converted base64"}" />`;
      }
      return `<iframe src="${dataUri}" width="100%" height="500px"></iframe>`;
    case "css":
      return `background-image: url("${dataUri}");`;
    case "javascript":
      return `const base64Data = "${dataUri}";\n// Use in React: <img src={base64Data} />`;
    default:
      return base64;
  }
};
