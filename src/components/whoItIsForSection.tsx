"use client";

import { Rocket, Code, Brain, PenTool, Building2 } from "lucide-react";

const audiences = [
  {
    icon: Rocket,
    title: "Indie hackers",
    description: "Quickly match the aesthetic of successful products without hiring a designer.",
  },
  {
    icon: Code,
    title: "Frontend developers",
    description: "Get structured design specs to implement pixel-perfect-feeling UIs faster.",
  },
  {
    icon: Brain,
    title: "AI app builders",
    description: "Feed rich design context into your AI coding tool for better styled output.",
  },
  {
    icon: PenTool,
    title: "Designers using AI tools",
    description: "Bridge the gap between reference inspiration and AI-generated implementation.",
  },
  {
    icon: Building2,
    title: "SaaS builders",
    description: "Maintain visual consistency across your product with extracted design tokens.",
  },
];

export function WhoItIsForSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Who it is for
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Built for modern product builders
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                <audience.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {audience.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {audience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
