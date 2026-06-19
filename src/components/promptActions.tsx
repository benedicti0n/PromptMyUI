"use client";

import { useState } from "react";
import { Copy, Download, RefreshCw, Check, Paintbrush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeneratorStore } from "@/store/generatorStore";
import { copyToClipboard, downloadMarkdown } from "@/lib/utils/downloadMarkdown";
import { ApplyThemeModal } from "./applyThemeModal";

export function PromptActions() {
  const { result, setResult, setLoading, setError, imageBase64, options } = useGeneratorStore();
  const [copied, setCopied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleCopy = async () => {
    if (!result?.fullPrompt) return;
    const success = await copyToClipboard(result.fullPrompt);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result?.fullPrompt) return;
    downloadMarkdown(result.fullPrompt, "ui-cloner-prompt");
  };

  const handleRegenerate = async () => {
    if (!imageBase64) return;

    setLoading(true);
    setError(null);
    setResult(null);

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

  if (!result) return null;

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy prompt"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Download .md
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRegenerate}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Regenerate
        </Button>
        <Button
          size="sm"
          onClick={() => setShowApplyModal(true)}
          className="gap-2"
        >
          <Paintbrush className="h-4 w-4" />
          Apply to App
        </Button>
      </div>

      {showApplyModal && (
        <ApplyThemeModal
          result={result}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </>
  );
}
