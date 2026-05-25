export type Tab = "file-to-base64" | "text-to-base64" | "base64-to-file";

export type ExportFormat = "raw" | "data-uri" | "html" | "css" | "javascript";

export interface CommonMimeType {
  label: string;
  mime: string;
  ext: string;
}
