"use client";

import { useCallback } from "react";
import { Upload, X } from "lucide-react";
import { useGeneratorStore } from "@/store/generatorStore";
import { fileToBase64, getMimeType, validateImageFile } from "@/lib/utils/fileToBase64";

export function UploadDropzone() {
  const { imageBase64, setImage, setError } = useGeneratorStore();

  const handleFile = useCallback(
    async (file: File) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || "Invalid file");
        return;
      }

      try {
        const base64 = await fileToBase64(file);
        const mimeType = getMimeType(file);
        setImage(base64, mimeType);
        setError(null);
      } catch {
        setError("Failed to read the image file.");
      }
    },
    [setImage, setError]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const clearImage = useCallback(() => {
    setImage(null, null);
  }, [setImage]);

  if (imageBase64) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/*;base64,${imageBase64}`}
          alt="Uploaded UI screenshot"
          className="h-auto w-full object-contain"
        />
        <button
          onClick={clearImage}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-destructive hover:text-white"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center transition-colors hover:border-primary/50 hover:bg-primary/[0.02] sm:p-12"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <Upload className="h-7 w-7 text-primary" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">
        Upload a UI screenshot
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Drag and drop or click to browse
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        PNG, JPG, JPEG, WEBP up to 8MB
      </p>
      <label className="mt-4">
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={onInputChange}
          className="sr-only"
        />
        <span className="inline-flex cursor-pointer items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          Choose file
        </span>
      </label>
    </div>
  );
}
