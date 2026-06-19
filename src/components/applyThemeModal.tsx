"use client";

import { useState } from "react";
import { Paintbrush, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PromptResult } from "@/types/promptGenerator";
import { useThemeStore } from "@/store/themeStore";
import { applyThemeToDocument } from "@/lib/themeEngine";

interface ApplyThemeModalProps {
  result: PromptResult | null;
  onClose: () => void;
}

export function ApplyThemeModal({ result, onClose }: ApplyThemeModalProps) {
  const { addTheme } = useThemeStore();
  const [themeName, setThemeName] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  if (!result) return null;

  const handleApply = () => {
    const name = themeName.trim() || "Custom Theme";
    const theme = {
      id: `theme-${Date.now()}`,
      name,
      createdAt: Date.now(),
      designTokens: result.designTokens,
      layoutRules: result.layoutRules,
      responsiveRules: result.responsiveRules,
      componentRules: result.componentRules,
    };

    setIsApplying(true);
    addTheme(theme);
    applyThemeToDocument(theme);
    setTimeout(() => {
      setIsApplying(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Paintbrush className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Apply to App
            </h3>
            <p className="text-sm text-muted-foreground">
              Save this design as a theme and apply it instantly
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="themeName">Theme name</Label>
            <Input
              id="themeName"
              placeholder="e.g., Pastel SaaS, Dark Dashboard..."
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              className="rounded-lg"
            />
          </div>

          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Preview
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.designTokens.colors.primary.slice(0, 1).map((c) => (
                <div key={c} className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-5 w-5 rounded-md border border-border"
                    style={{ backgroundColor: c }}
                  />
                  <span className="text-xs text-muted-foreground">{c}</span>
                </div>
              ))}
              {result.designTokens.colors.background.slice(0, 1).map((c) => (
                <div key={c} className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-5 w-5 rounded-md border border-border"
                    style={{ backgroundColor: c }}
                  />
                  <span className="text-xs text-muted-foreground">{c}</span>
                </div>
              ))}
              {result.designTokens.colors.accent.slice(0, 1).map((c) => (
                <div key={c} className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-5 w-5 rounded-md border border-border"
                    style={{ backgroundColor: c }}
                  />
                  <span className="text-xs text-muted-foreground">{c}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {result.styleSummary.slice(0, 120)}
              {result.styleSummary.length > 120 ? "..." : ""}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 rounded-lg" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1 gap-2 rounded-lg"
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Applying...
              </>
            ) : (
              <>
                <Paintbrush className="h-4 w-4" />
                Apply Theme
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
