"use client";

import { ImageIcon } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        <ImageIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="mt-4 text-base font-medium text-foreground">
        No image uploaded yet
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload a UI screenshot to get started.
      </p>
    </div>
  );
}
