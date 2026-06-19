"use client";

import { Palette, Type, LayoutGrid, Component, Space, Sparkles } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Colors",
    description: "Extracts background, foreground, primary, accent, muted, and border color palettes with approximate hex values.",
  },
  {
    icon: Type,
    title: "Typography",
    description: "Identifies font direction, heading and body styles, scale, weights, and line-height patterns.",
  },
  {
    icon: LayoutGrid,
    title: "Layout",
    description: "Analyzes grid systems, container widths, alignment, visual hierarchy, and section structures.",
  },
  {
    icon: Component,
    title: "Components",
    description: "Breaks down buttons, cards, navigation, forms, badges, and section styling rules.",
  },
  {
    icon: Space,
    title: "Spacing",
    description: "Detects padding, margin, gap patterns, and overall spacing rhythm and scale.",
  },
  {
    icon: Sparkles,
    title: "Shadows and effects",
    description: "Captures elevation, blur, gradients, glassmorphism, borders, and decorative elements.",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What it extracts
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Comprehensive visual design DNA from any screenshot
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
