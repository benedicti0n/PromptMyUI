import { OutputDepth, TargetTool } from "@/types/promptGenerator";

export function buildSystemPrompt(depth: OutputDepth): string {
  const base = `You are an expert frontend engineer, UI/UX designer, and design system specialist. Your task is to analyze a UI screenshot and extract its visual design DNA. You must not clone the exact code or layout. Instead, you extract the styling, aesthetics, design language, layout patterns, component rules, color palette, typography direction, spacing, shadows, borders, and overall visual personality.

Analyze the uploaded image visually and extract the following:

## Core Design Tokens
- Product category (SaaS, e-commerce, portfolio, dashboard, etc.)
- Overall visual style (minimal, brutalist, glassmorphism, neumorphism, corporate, playful, etc.)
- Emotional design intent (trustworthy, energetic, calm, luxurious, friendly, etc.)
- Color palette with approximate hex values
- Typography style (serif, sans-serif, display, mono, weights, sizes)
- Layout structure (grid, flex, container width, alignment, hierarchy)
- Hero/header patterns
- Card patterns
- Button styles
- Navbar style
- Border radius patterns
- Shadows/elevation
- Gradients/backgrounds
- Decorative elements
- Spacing scale
- Responsive assumptions
- Unique visual signatures
- Things to avoid

## Typography Detection (IMPORTANT)
Look closely at the fonts used in the screenshot. Try to identify:
- The heading font (if recognizable: Inter, Playfair Display, Roboto, Helvetica, etc.)
- The body font
- Any monospace font used for code/data

If you CANNOT identify the exact font name, provide your best guess based on visual characteristics AND suggest the closest Google Fonts match. Include:
- detectedName: your best guess or "Unknown Sans-Serif"
- closestGoogleFont: a real Google Fonts name that matches the visual style
- googleFontsUrl: a working Google Fonts @import URL
- alternatives: 2-3 similar Google Fonts options
- category: serif, sans-serif, display, mono

## Visual Assets Detection (IMPORTANT)
Scan the screenshot for visual assets that are part of the design system:
- Background images (hero photos, section backgrounds)
- Textures (grain, noise, paper, fabric, glass)
- Patterns (geometric, organic, dots, lines, grids)
- Illustrations (3D icons, hand-drawn elements, abstract shapes)
- Decorative elements (gradients, blobs, waves, shapes)

For each detected asset, provide:
- A clear description of the asset's style (NOT the exact image, but the design system equivalent)
- Where it appears in the UI
- Mood keywords (3-5 words describing the aesthetic)
- A concise search query string for finding similar assets on stock photo sites
- A Pinterest search URL: https://www.pinterest.com/search/pins/?q=URL_ENCODED_QUERY
- An Unsplash search query string

Focus on the DESIGN SYSTEM level — describe the TYPE of asset and its aesthetic qualities, not the specific file. The goal is to help someone find SIMILAR assets that match the same design language.

You MUST return a single JSON object with EXACTLY the following structure. Do not add extra fields. Do not wrap the response in markdown code blocks. Do not include any text outside the JSON object.`;

  const depthInstructions: Record<OutputDepth, string> = {
    quickPrompt:
      "Provide a concise, high-level summary. Focus on the most important visual attributes. Keep descriptions brief but actionable. Include 1-2 detected fonts and 1-2 visual assets.",
    detailedDesignSystem:
      "Provide a comprehensive design system breakdown. Include detailed color tokens, typography scale, spacing system, component specifications, and layout rules. Detect 2-3 fonts and 3-4 visual assets with detailed descriptions.",
    fullImplementation:
      "Provide an exhaustive implementation-ready design system. Include every detail needed to replicate the visual style: exact color values, precise typography specs, spacing tokens, shadow values, border styles, component behaviors, responsive breakpoints, animation suggestions, and edge cases. Detect ALL identifiable fonts and visual assets with maximum detail.",
  };

  return `${base}\n\nOutput depth instruction: ${depthInstructions[depth]}`;
}

export function buildUserPrompt(
  depth: OutputDepth,
  targetTool: TargetTool,
  extraInstruction: string
): string {
  const toolContext: Record<TargetTool, string> = {
    openCode:
      "The final prompt should be optimized for OpenCode, an AI coding assistant. Use clear, structured instructions with file paths and implementation steps.",
    cursor:
      "The final prompt should be optimized for Cursor, an AI-powered IDE. Use .cursorrules-style instructions and mention specific files to modify.",
    kimi:
      "The final prompt should be optimized for Kimi, an AI assistant. Use natural language with clear sections and examples.",
    claudeCode:
      "The final prompt should be optimized for Claude Code, an AI coding assistant. Use detailed, conversational instructions with explicit implementation steps.",
    v0:
      "The final prompt should be optimized for v0.dev. Use component-based descriptions and mention shadcn/ui primitives where applicable.",
    bolt:
      "The final prompt should be optimized for Bolt.new. Use stack-specific instructions and mention the framework setup.",
    lovable:
      "The final prompt should be optimized for Lovable.dev. Use design-token-heavy descriptions with clear visual specifications.",
    generic:
      "The final prompt should be tool-agnostic and work with any AI coding assistant. Use universal design system language.",
  };

  let prompt = `Analyze this UI screenshot and generate a structured design system prompt. Return ONLY the JSON object described in your instructions. No markdown, no extra text.\n\nTarget tool context: ${toolContext[targetTool]}\n\nOutput depth: ${depth}`;

  if (extraInstruction.trim()) {
    prompt += `\n\nAdditional instruction: ${extraInstruction.trim()}`;
  }

  return prompt;
}

export function formatFullPrompt(
  result: {
    styleSummary: string;
    designTokens: {
      colors: {
        background: string[];
        foreground: string[];
        primary: string[];
        accent: string[];
        muted: string[];
        border: string[];
      };
      typography: {
        fontDirection: string;
        headingStyle: string;
        bodyStyle: string;
        scale: string;
      };
      detectedFonts: {
        role: string;
        detectedName: string;
        category: string;
        closestGoogleFont: string;
        googleFontsUrl: string;
        alternatives: string[];
      }[];
      fontPairing: string;
      visualAssets: {
        type: string;
        description: string;
        location: string;
        moodKeywords: string[];
        searchKeywords: string;
        pinterestUrl: string;
        unsplashQuery: string;
      }[];
      spacing: string;
      radius: string;
      shadows: string;
      effects: string;
    };
    componentRules: {
      buttons: string;
      cards: string;
      navigation: string;
      forms: string;
      badges: string;
      sections: string;
    };
    layoutRules: string;
    responsiveRules: string;
    doNotUse: string[];
    validationChecklist: string[];
  },
  targetTool: TargetTool
): string {
  const toolName =
    {
      openCode: "OpenCode",
      cursor: "Cursor",
      kimi: "Kimi",
      claudeCode: "Claude Code",
      v0: "v0",
      bolt: "Bolt",
      lovable: "Lovable",
      generic: "your AI coding tool",
    }[targetTool] || "your AI coding tool";

  const fontsSection = result.designTokens.detectedFonts.length > 0
    ? `\n\n## Typography\n\n**Font Pairing:** ${result.designTokens.fontPairing}\n\n${result.designTokens.detectedFonts.map((f) => `### ${f.role === "heading" ? "Heading" : f.role === "body" ? "Body" : "Monospace"} Font\n- Detected: ${f.detectedName}\n- Category: ${f.category}\n- Closest Google Font: ${f.closestGoogleFont}\n- Import: \`${f.googleFontsUrl}\`\n- Alternatives: ${f.alternatives.join(", ")}`).join("\n\n")}`
    : "";

  const assetsSection = result.designTokens.visualAssets.length > 0
    ? `\n\n## Visual Assets\n\n${result.designTokens.visualAssets.map((a, i) => `${i + 1}. **${a.type}** — ${a.description}\n   - Location: ${a.location}\n   - Mood: ${a.moodKeywords.join(", ")}\n   - Search: "${a.searchKeywords}"`).join("\n\n")}`
    : "";

  return `# Role

You are an expert frontend engineer, UI/UX designer, and design system specialist. Your task is to restyle an existing app using the visual language extracted from the uploaded reference image.

# Target Style Summary

${result.styleSummary}

# Design Philosophy

${result.designTokens.effects}

# Color System

- Background: ${result.designTokens.colors.background.join(", ")}
- Foreground: ${result.designTokens.colors.foreground.join(", ")}
- Primary: ${result.designTokens.colors.primary.join(", ")}
- Accent: ${result.designTokens.colors.accent.join(", ")}
- Muted: ${result.designTokens.colors.muted.join(", ")}
- Border: ${result.designTokens.colors.border.join(", ")}

# Typography System

- Direction: ${result.designTokens.typography.fontDirection}
- Headings: ${result.designTokens.typography.headingStyle}
- Body: ${result.designTokens.typography.bodyStyle}
- Scale: ${result.designTokens.typography.scale}
${fontsSection}
${assetsSection}

# Layout System

${result.layoutRules}

# Component Rules

## Buttons
${result.componentRules.buttons}

## Cards
${result.componentRules.cards}

## Navigation
${result.componentRules.navigation}

## Forms
${result.componentRules.forms}

## Badges
${result.componentRules.badges}

## Sections
${result.componentRules.sections}

# Effects and Visual Details

- Spacing: ${result.designTokens.spacing}
- Border Radius: ${result.designTokens.radius}
- Shadows: ${result.designTokens.shadows}
- Effects: ${result.designTokens.effects}

# Responsive Rules

${result.responsiveRules}

# Implementation Instructions

- Preserve existing app functionality.
- Do not rewrite business logic unless necessary.
- Centralize design tokens.
- Prefer reusable components.
- Avoid one-off styling.
- Match the existing project's tech stack and folder conventions.
- Make changes incrementally and test after each major step.
- Use ${toolName} conventions and best practices.

# Do Not Use

${result.doNotUse.map((item) => `- ${item}`).join("\n")}

# Validation Checklist

${result.validationChecklist.map((item) => `- [ ] ${item}`).join("\n")}

# Final Task

Revamp the existing project using this visual style while preserving functionality and improving consistency.
`;
}
