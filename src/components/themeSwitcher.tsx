"use client";

import { useState } from "react";
import { Shuffle, ChevronDown, Paintbrush } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { themes, activeThemeId, setActiveTheme, shuffleTheme } = useThemeStore();
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);
    shuffleTheme();
    setTimeout(() => setIsShuffling(false), 400);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={activeThemeId} onValueChange={(value) => value && setActiveTheme(value)}>
        <SelectTrigger className="h-9 w-[160px] gap-1 rounded-lg border-border bg-background/80 text-sm backdrop-blur-sm">
          <Paintbrush className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <SelectValue placeholder="Select theme" />
          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme) => (
            <SelectItem key={theme.id} value={theme.id}>
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: theme.designTokens.colors.primary[0],
                  }}
                />
                {theme.name}
                {theme.isBuiltIn && (
                  <span className="text-xs text-muted-foreground">(built-in)</span>
                )}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-lg"
        onClick={handleShuffle}
        title="Shuffle theme"
      >
        <Shuffle
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            isShuffling ? "rotate-180" : ""
          }`}
        />
      </Button>
    </div>
  );
}
