import { PromptResultOutput } from "./outputSchema";

export function getMockResponse(): PromptResultOutput {
  return {
    styleSummary:
      "A soft pastel SaaS UI with a clean, modern aesthetic. The design emphasizes trust and calm through rounded corners, generous whitespace, and a muted purple-blue gradient accent palette. It feels premium yet approachable, ideal for productivity or wellness applications.",
    designTokens: {
      colors: {
        background: ["#F8F7FC", "#FFFFFF", "#F0EEF8"],
        foreground: ["#1E1B2E", "#4A4458", "#6E6680"],
        primary: ["#7C6AFA", "#9B8DFD", "#5E4EE0"],
        accent: ["#C4B5FD", "#A78BFA", "#EDE9FE"],
        muted: ["#E2E0E8", "#D1CFDB", "#B8B5C4"],
        border: ["#E8E6F0", "#DDDCE8", "#D0CFE0"],
      },
      typography: {
        fontDirection:
          "Modern geometric sans-serif (e.g., Inter, Geist, or Manrope). Clean, highly legible, with generous letter-spacing for headings.",
        headingStyle:
          "Bold to extra-bold weights (700-800). Large sizes with tight line-height. Subtle gradient or solid dark text.",
        bodyStyle:
          "Regular weight (400-500). Comfortable line-height (1.6-1.7). Muted gray-purple tone for secondary text.",
        scale:
          "Base 16px. Headings: 3xl-5xl (30-48px). Body: base-lg (16-18px). Small: sm (14px).",
      },
      spacing:
        "Generous padding and gaps. Section padding: 80-120px vertical. Card padding: 24-32px. Component gaps: 16-24px. Base unit: 4px.",
      radius:
        "Large rounded corners. Cards: 16-24px. Buttons: 12-16px. Inputs: 10-12px. Badges: 999px (full pill).",
      shadows:
        "Soft, diffused shadows. Cards: 0 4px 24px rgba(124, 106, 250, 0.08). Buttons: 0 2px 8px rgba(124, 106, 250, 0.12). Minimal elevation changes.",
      effects:
        "Subtle gradient backgrounds (purple to blue). Soft glassmorphism on cards (backdrop-blur, semi-transparent white). Decorative blurred circles/blobs in background. No harsh borders.",
    },
    componentRules: {
      buttons:
        "Primary: solid purple gradient, white text, rounded-xl, medium padding (14px 28px), soft shadow. Secondary: outlined with purple border, purple text, transparent background. Ghost: no background, purple text, subtle hover fill.",
      cards:
        "White or semi-transparent background, rounded-2xl, soft shadow, generous padding. May include subtle gradient border or glow. Clean top icon or image area.",
      navigation:
        "Minimal top navbar, transparent or blurred background. Logo left, nav links center, CTA right. Links are muted until hover. Mobile: hamburger with slide-out drawer.",
      forms:
        "Inputs have light gray background, rounded-lg, subtle border on focus (purple ring). Labels are small and muted. Placeholder text is lighter. Error states use soft red with light background.",
      badges:
        "Small pill-shaped tags. Light pastel background matching category color. Small font, medium weight. Used for categories, status, or features.",
      sections:
        "Alternating light and gradient backgrounds. Centered content with max-width container (1200-1400px). Generous vertical padding. Clear visual hierarchy with headings, subtext, and CTAs.",
    },
    layoutRules:
      "Single-column centered layout with a max-width container. Hero section is full-width with centered content. Feature grids use 2-3 column layouts on desktop, stacking on mobile. Asymmetric spacing creates visual interest.",
    responsiveRules:
      "Mobile-first approach. Hero text scales down. Cards stack vertically. Navigation collapses to hamburger. Grid columns reduce: 3 -> 2 -> 1. Touch-friendly tap targets (min 44px).",
    doNotUse: [
      "Harsh black borders or high-contrast outlines",
      "Sharp 90-degree corners on interactive elements",
      "Neon or saturated colors",
      "Dense, cramped layouts",
      "Drop shadows with high opacity or dark colors",
      "Multiple different border-radius values in the same component group",
    ],
    fullPrompt: "", // Will be populated by formatter
    validationChecklist: [
      "All interactive elements have consistent border-radius (12-16px)",
      "Color palette uses only the defined purple-blue spectrum",
      "Typography uses a single font family throughout",
      "Shadows are soft and use the primary color at low opacity",
      "Spacing follows the 4px base unit system",
      "Mobile layout stacks all grid elements vertically",
      "No harsh borders or high-contrast outlines",
    ],
  };
}
