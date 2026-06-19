"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { applyThemeToDocument } from "@/lib/themeEngine";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { themes, activeThemeId } = useThemeStore();

  useEffect(() => {
    const activeTheme = themes.find((t) => t.id === activeThemeId);
    if (activeTheme) {
      applyThemeToDocument(activeTheme);
    }
  }, [themes, activeThemeId]);

  return <>{children}</>;
}
