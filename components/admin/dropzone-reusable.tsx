"use client";

import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  onDropRejected?: (rejectedFiles: any[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  label?: string;
}

export function UploadDropzone({
  onDrop,
  onDropRejected,
  accept = { "image/*": [] },
  maxSize = 5 * 1024 * 1024, // 5MB default
  label = "Seret file di sini atau klik untuk mengunggah",
}: UploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept,
    maxSize,
    multiple: false, // Hanya satu file per jenis
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer
        transition-colors duration-200
        ${isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-gray-400"}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-10 w-10 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">{label}</p>
      <p className="text-xs text-gray-500 mt-1">
        {Object.keys(accept).includes("image/*") ? "JPG, PNG" : "PDF, Gambar"} • Maks {Math.round(maxSize / 1024 / 1024)} MB
      </p>
    </div>
  );
}