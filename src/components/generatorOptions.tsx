"use client";

import { useGeneratorStore } from "@/store/generatorStore";
import { TargetTool, OutputDepth } from "@/types/promptGenerator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const targetTools: { value: TargetTool; label: string }[] = [
  { value: "openCode", label: "OpenCode" },
  { value: "cursor", label: "Cursor" },
  { value: "kimi", label: "Kimi" },
  { value: "claudeCode", label: "Claude Code" },
  { value: "v0", label: "v0" },
  { value: "bolt", label: "Bolt" },
  { value: "lovable", label: "Lovable" },
  { value: "generic", label: "Generic" },
];

const outputDepths: { value: OutputDepth; label: string }[] = [
  { value: "quickPrompt", label: "Quick Prompt" },
  { value: "detailedDesignSystem", label: "Detailed Design System Prompt" },
  { value: "fullImplementation", label: "Full Implementation Prompt" },
];

export function GeneratorOptions() {
  const { options, setOptions } = useGeneratorStore();

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="targetTool">Target AI coding tool</Label>
        <Select
          value={options.targetTool}
          onValueChange={(value) =>
            setOptions({ targetTool: value as TargetTool })
          }
        >
          <SelectTrigger id="targetTool" className="w-full">
            <SelectValue placeholder="Select a tool" />
          </SelectTrigger>
          <SelectContent>
            {targetTools.map((tool) => (
              <SelectItem key={tool.value} value={tool.value}>
                {tool.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="outputDepth">Output depth</Label>
        <Select
          value={options.outputDepth}
          onValueChange={(value) =>
            setOptions({ outputDepth: value as OutputDepth })
          }
        >
          <SelectTrigger id="outputDepth" className="w-full">
            <SelectValue placeholder="Select depth" />
          </SelectTrigger>
          <SelectContent>
            {outputDepths.map((depth) => (
              <SelectItem key={depth.value} value={depth.value}>
                {depth.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="extraInstruction">Extra instruction (optional)</Label>
        <Textarea
          id="extraInstruction"
          placeholder="Make the output TailwindCSS and shadcn/ui friendly."
          value={options.extraInstruction}
          onChange={(e) => setOptions({ extraInstruction: e.target.value })}
          className="min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
}
