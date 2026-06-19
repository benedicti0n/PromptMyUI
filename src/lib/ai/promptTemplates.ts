import { OutputDepth, TargetTool } from "@/types/promptGenerator";

export function buildSystemPrompt(depth: OutputDepth): string {
  const base = `You are an expert frontend engineer, UI/UX designer, and design system specialist. Your task is to analyze a UI screenshot and extract its visual design DNA. You must not clone the exact code or layout. Instead, you extract the styling, aesthetics, design language, layout patterns, component rules, color palette, typography direction, spacing, shadows, borders, and overall visual personality.

Analyze the uploaded image visually and extract the following:
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

You MUST return a single JSON object with EXACTLY the following structure. Do not add extra fields. Do not wrap the response in markdown code blocks. Do not include any text outside the JSON object.

{
  "styleSummary": "string - concise summary of overall visual style and emotional design intent",
  "designTokens": {
    "colors": {
      "background": ["array of hex color strings for backgrounds"],
      "foreground": ["array of hex color strings for text"],
      "primary": ["array of hex color strings for primary actions"],
      "accent": ["array of hex color strings for accents"],
      "muted": ["array of hex color strings for muted/neutral tones"],
      "border": ["array of hex color strings for borders"]
    },
    "typography": {
      "fontDirection": "string - overall typography direction (e.g. modern sans-serif, elegant serif)",
      "headingStyle": "string - heading typography style",
      "bodyStyle": "string - body text typography style",
      "scale": "string - typography scale description"
    },
    "spacing": "string - spacing scale and rhythm description",
    "radius": "string - border radius patterns",
    "shadows": "string - shadow and elevation patterns",
    "effects": "string - visual effects like blur, glass, gradients, textures"
  },
  "componentRules": {
    "buttons": "string - button styling rules",
    "cards": "string - card styling rules",
    "navigation": "string - navigation styling rules",
    "forms": "string - form input styling rules",
    "badges": "string - badge and tag styling rules",
    "sections": "string - section container styling rules"
  },
  "layoutRules": "string - layout structure, grid, container width, alignment, hierarchy",
  "responsiveRules": "string - responsive behavior rules for mobile, tablet, desktop",
  "doNotUse": ["array of strings - things that would break the reference style"],
  "fullPrompt": "string - the complete implementation prompt (you may leave this as empty string, it will be regenerated)",
  "validationChecklist": ["array of strings - checklist items to validate the implementation"]
}`;

  const depthInstructions: Record<OutputDepth, string> = {
    quickPrompt:
      "Provide a concise, high-level summary. Focus on the most important visual attributes. Keep descriptions brief but actionable.",
    detailedDesignSystem:
      "Provide a comprehensive design system breakdown. Include detailed color tokens, typography scale, spacing system, component specifications, and layout rules. Be thorough and specific.",
    fullImplementation:
      "Provide an exhaustive implementation-ready design system. Include every detail needed to replicate the visual style: exact color values, precise typography specs, spacing tokens, shadow values, border styles, component behaviors, responsive breakpoints, animation suggestions, and edge cases. Be extremely detailed.",
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
