"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-32 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Experimental MVP</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Turn any UI screenshot into a{" "}
          <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            developer-ready design prompt
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Upload a landing page, dashboard, SaaS UI, portfolio, or mobile app shot.
          Get a structured AI prompt that helps OpenCode, Cursor, Kimi, Claude Code,
          v0, Bolt, or Lovable restyle your project in the same aesthetic.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/generate">
            <Button size="lg" className="h-12 gap-2 rounded-xl px-8 text-base font-semibold shadow-lg shadow-primary/20">
              Upload UI Screenshot
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Free to use. No signup required.
        </p>
      </div>
    </section>
  );
}
