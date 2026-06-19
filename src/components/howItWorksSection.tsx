"use client";

import { Upload, Dna, Copy } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload a UI reference",
    description:
      "Drop any screenshot — landing page, dashboard, mobile app, or SaaS interface. PNG, JPG, JPEG, or WEBP up to 8MB.",
  },
  {
    icon: Dna,
    title: "Extract the design DNA",
    description:
      "Our AI vision model analyzes colors, typography, layout, spacing, shadows, and visual personality.",
  },
  {
    icon: Copy,
    title: "Copy the prompt into your AI coding tool",
    description:
      "Get a structured prompt tailored for OpenCode, Cursor, Kimi, Claude Code, v0, Bolt, or Lovable.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Three simple steps to capture any visual style
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute top-6 right-6 text-5xl font-extrabold text-muted/50">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
