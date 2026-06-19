"use client";

import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-base font-medium text-foreground">
        Analyzing your UI screenshot...
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Extracting colors, typography, layout, and visual personality.
      </p>
    </div>
  );
}
