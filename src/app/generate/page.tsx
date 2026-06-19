"use client";

import { UploadDropzone } from "@/components/uploadDropzone";
import { GeneratorOptions } from "@/components/generatorOptions";
import { ResultTabs } from "@/components/resultTabs";
import { PromptActions } from "@/components/promptActions";
import { LoadingState } from "@/components/loadingState";
import { AppShell } from "@/components/appShell";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGeneratorStore } from "@/store/generatorStore";
import { Wand2 } from "lucide-react";

export default function GeneratePage() {
  const {
    imageBase64,
    options,
    isLoading,
    error,
    setResult,
    setLoading,
    setError,
    setActiveTab,
  } = useGeneratorStore();

  const handleGenerate = async () => {
    if (!imageBase64) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setActiveTab("fullPrompt");

    try {
      const res = await fetch("/api/generatePrompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          mimeType: "image/png",
          targetTool: options.targetTool,
          outputDepth: options.outputDepth,
          extraInstruction: options.extraInstruction,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate prompt.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Generate Prompt
          </h1>
          <p className="mt-1 text-muted-foreground">
            Upload a UI screenshot, configure options, and generate a structured AI prompt.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left panel */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Upload
              </h2>
              <UploadDropzone />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Options
              </h2>
              <GeneratorOptions />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isLoading || !imageBase64}
              className="w-full gap-2 rounded-xl py-6 text-base font-semibold shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  Generate Prompt
                </>
              )}
            </Button>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Result
              </h2>
              <PromptActions />
            </div>

            {isLoading ? <LoadingState /> : <ResultTabs />}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
