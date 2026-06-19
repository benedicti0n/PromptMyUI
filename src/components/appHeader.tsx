"use client";

import Link from "next/link";
import { Wand2, Palette } from "lucide-react";
import { ThemeSwitcher } from "./themeSwitcher";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent-foreground">
            <Wand2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            UI Cloner
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden items-center gap-4 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="/generate"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Generate
            </Link>
            <Link
              href="/themes"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Palette className="h-3.5 w-3.5" />
              Themes
            </Link>
          </nav>

          <div className="h-6 w-px bg-border hidden md:block" />

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Link
              href="/generate"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 hidden sm:inline-flex"
            >
              Generate
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
