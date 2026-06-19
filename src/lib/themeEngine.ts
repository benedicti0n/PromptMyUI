import { Theme } from "@/types/theme";

export const OG_UI_THEME: Theme = {
  id: "og-ui",
  name: "OG-UI",
  isBuiltIn: true,
  createdAt: 0,
  designTokens: {
    colors: {
      background: ["#FAFAFB"],
      foreground: ["#1A1A2E"],
      primary: ["#7C6AFA"],
      accent: ["#EDE9FE"],
      muted: ["#F4F4F7"],
      border: ["#E8E6F0"],
    },
    typography: {
      fontDirection: "Modern geometric sans-serif",
      headingStyle: "Bold, large sizes with tight line-height",
      bodyStyle: "Regular weight with comfortable line-height",
      scale: "Base 16px, headings 3xl-5xl, body base-lg",
    },
    spacing: "Base unit 4px. Section padding 80-120px. Card padding 24-32px.",
    radius: "Cards 16-24px, buttons 12-16px, inputs 10-12px",
    shadows: "Soft diffused shadows with primary color at low opacity",
    effects: "Subtle gradient backgrounds, soft glassmorphism on cards",
  },
  layoutRules: "Single-column centered layout with max-width container. Generous whitespace.",
  responsiveRules: "Mobile-first. Grid columns reduce 3-2-1. Touch-friendly targets.",
  componentRules: {
    buttons: "Primary: solid purple, white text, rounded-xl. Secondary: outlined purple.",
    cards: "White background, rounded-2xl, soft shadow, generous padding.",
    navigation: "Minimal top navbar, transparent or blurred background.",
    forms: "Light gray background inputs, rounded-lg, purple focus ring.",
    badges: "Small pill-shaped tags with pastel backgrounds.",
    sections: "Alternating light and gradient backgrounds. Centered content.",
  },
};

export const CORPORATE_CORAL_THEME: Theme = {
  id: "corporate-coral",
  name: "Corporate Coral",
  isBuiltIn: true,
  createdAt: 0,
  designTokens: {
    colors: {
      background: ["#FFFFFF", "#F4F4F4"],
      foreground: ["#000000", "#333333"],
      primary: ["#FF7F50"],
      accent: ["#FFA07A", "#FF6347"],
      muted: ["#A9A9A9", "#D3D3D3"],
      border: ["#E0E0E0"],
    },
    typography: {
      fontDirection: "Modern sans-serif with serif headings",
      headingStyle: "Bold serif with large sizes",
      bodyStyle: "Light sans-serif, medium size",
      scale: "Responsive scale, large headings with medium body text",
    },
    spacing: "Consistent spacing scale with ample white space, using multiples of 8px",
    radius: "Border radius of 8px for cards and buttons",
    shadows: "Subtle shadow for elevation effect on cards and buttons",
    effects: "Soft gradient backgrounds with slight blurring for depth",
  },
  layoutRules: "Grid layout with a clear hierarchy, centered content, full-width sections with safe margins",
  responsiveRules: "Responsive design with adjustments for mobile and tablet, maintaining readability and spacing",
  componentRules: {
    buttons: "Rounded corners, primary color fill with white text, medium padding",
    cards: "Rounded corners, light shadow, consistent padding, clear separation",
    navigation: "Horizontal layout, right-aligned, clear text links with hover effects",
    forms: "Rounded input fields, subtle borders, clear label text",
    badges: "Small rounded, accent colors, bold text",
    sections: "Centered content with clear visual hierarchy, ample spacing",
  },
};

export const MODERN_TEAL_THEME: Theme = {
  id: "modern-teal",
  name: "Modern Teal",
  isBuiltIn: true,
  createdAt: 0,
  designTokens: {
    colors: {
      background: ["#FFFFFF", "#F4F4F4"],
      foreground: ["#000000", "#333333"],
      primary: ["#00BFA5"],
      accent: ["#FF6F61", "#FFAB40"],
      muted: ["#A9A9A9", "#D3D3D3"],
      border: ["#E0E0E0"],
    },
    typography: {
      fontDirection: "Clean modern sans-serif with elegant serif headings",
      headingStyle: "Bold, large serif fonts with decorative elements",
      bodyStyle: "Sans-serif, medium weight, with generous line spacing",
      scale: "Varied scale with large headings and smaller body text",
    },
    spacing: "Generous spacing with clear hierarchy, using both padding and margins effectively",
    radius: "Rounded corners on buttons and cards, creating a friendly appearance",
    shadows: "Subtle shadows to create depth and separation between elements",
    effects: "Minimalist effects with a focus on clarity and user interaction",
  },
  layoutRules: "Grid layout with a central hero section, supporting a balanced and organized structure",
  responsiveRules: "Adapts to smaller screens by stacking elements vertically and adjusting font sizes for readability",
  componentRules: {
    buttons: "Rounded corners with gradient background, clear hover states",
    cards: "Minimalist with subtle shadows and rounded corners to highlight content",
    navigation: "Top navigation with clear, spaced links and a highlighted active state",
    forms: "Clean input fields with distinct labels and error feedback",
    badges: "Colorful badges with rounded edges for categorization",
    sections: "Clearly divided with ample white space and visual hierarchy",
  },
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6 && clean.length !== 3) return null;
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
}

function adjustColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const clamp = (v: number) => Math.max(0, Math.min(255, v + amount));
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(clamp(rgb.r))}${toHex(clamp(rgb.g))}${toHex(clamp(rgb.b))}`;
}

function extractRadius(radiusStr: string): string {
  const match = radiusStr.match(/(\d+)(?:-\d+)?\s*px/i);
  if (match) {
    return `${match[1]}px`;
  }
  const remMatch = radiusStr.match(/(\d+\.?\d*)\s*rem/i);
  if (remMatch) {
    return `${remMatch[1]}rem`;
  }
  return "0.5rem";
}

function extractFontFamilies(typography: Theme["designTokens"]["typography"]): {
  heading: string;
  body: string;
} {
  const dir = typography.fontDirection.toLowerCase();
  const heading = typography.headingStyle.toLowerCase();
  const body = typography.bodyStyle.toLowerCase();

  const hasSerifHeading = heading.includes("serif") || dir.includes("serif");
  const hasSansBody = body.includes("sans") || dir.includes("sans");

  return {
    heading: hasSerifHeading
      ? "'Georgia', 'Times New Roman', 'Playfair Display', serif"
      : "var(--font-geist-sans), 'Inter', 'Helvetica Neue', sans-serif",
    body: hasSansBody || !hasSerifHeading
      ? "var(--font-geist-sans), 'Inter', 'Helvetica Neue', sans-serif"
      : "'Georgia', 'Times New Roman', serif",
  };
}

function extractNavAlignment(layoutRules: string, componentRules: Theme["componentRules"]): string {
  const nav = componentRules.navigation.toLowerCase();
  const layout = layoutRules.toLowerCase();
  if (nav.includes("right") || nav.includes("right-aligned")) return "right";
  if (nav.includes("center")) return "center";
  if (layout.includes("right-aligned")) return "right";
  return "left";
}

function extractSpacingScale(spacingStr: string): string {
  const match = spacingStr.match(/multiples? of\s+(\d+)px/i);
  if (match) return `${match[1]}px`;
  const match2 = spacingStr.match(/(\d+)px\s*base/i);
  if (match2) return `${match2[1]}px`;
  return "4px";
}

export function themeToCssVariables(theme: Theme): Record<string, string> {
  const c = theme.designTokens.colors;
  const bg = c.background[0] || "#FAFAFB";
  const fg = c.foreground[0] || "#1A1A2E";
  const primary = c.primary[0] || "#7C6AFA";
  const accent = c.accent[0] || "#EDE9FE";
  const muted = c.muted[0] || "#F4F4F7";
  const border = c.border[0] || "#E8E6F0";

  const primaryFg = isLightColor(primary) ? "#0F0F1A" : "#FFFFFF";
  const accentFg = isLightColor(accent) ? "#1A1A2E" : "#FFFFFF";
  const mutedFg = isLightColor(muted)
    ? adjustColor(fg, 40)
    : adjustColor(fg, -40);

  const card = c.background[1] || (isLightColor(bg) ? "#FFFFFF" : adjustColor(bg, 20));
  const cardFg = fg;
  const popover = card;
  const popoverFg = fg;
  const secondary = accent;
  const secondaryFg = accentFg;
  const destructive = "#EF4444";
  const input = border;
  const ring = primary;
  const radius = extractRadius(theme.designTokens.radius);

  const fonts = extractFontFamilies(theme.designTokens.typography);
  const navAlign = extractNavAlignment(theme.layoutRules, theme.componentRules);
  const spacingUnit = extractSpacingScale(theme.designTokens.spacing);

  return {
    "--background": bg,
    "--foreground": fg,
    "--card": card,
    "--card-foreground": cardFg,
    "--popover": popover,
    "--popover-foreground": popoverFg,
    "--primary": primary,
    "--primary-foreground": primaryFg,
    "--secondary": secondary,
    "--secondary-foreground": secondaryFg,
    "--muted": muted,
    "--muted-foreground": mutedFg,
    "--accent": accent,
    "--accent-foreground": accentFg,
    "--destructive": destructive,
    "--border": border,
    "--input": input,
    "--ring": ring,
    "--radius": radius,
    "--font-heading": fonts.heading,
    "--font-body": fonts.body,
    "--spacing-unit": spacingUnit,
    "--nav-align": navAlign,
  };
}

export function applyThemeToDocument(theme: Theme): void {
  const vars = themeToCssVariables(theme);
  const root = document.documentElement;
  const body = document.body;

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  // Set data attributes for layout rules
  const navAlign = vars["--nav-align"] || "left";
  body.setAttribute("data-nav-align", navAlign);

  const headingFont = vars["--font-heading"] || "";
  if (headingFont.includes("serif")) {
    body.setAttribute("data-heading-serif", "true");
  } else {
    body.removeAttribute("data-heading-serif");
  }
}

export function clearThemeFromDocument(): void {
  const root = document.documentElement;
  const body = document.body;
  const ogVars = themeToCssVariables(OG_UI_THEME);
  Object.keys(ogVars).forEach((key) => {
    root.style.removeProperty(key);
  });
  body.removeAttribute("data-nav-align");
  body.removeAttribute("data-heading-serif");
}
