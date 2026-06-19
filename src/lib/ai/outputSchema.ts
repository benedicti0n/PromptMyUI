import { z } from "zod";

export const promptResultSchema = z.object({
  styleSummary: z.string().describe("A concise summary of the overall visual style and emotional design intent."),
  designTokens: z.object({
    colors: z.object({
      background: z.array(z.string()).describe("Background color hex values"),
      foreground: z.array(z.string()).describe("Foreground/text color hex values"),
      primary: z.array(z.string()).describe("Primary color hex values"),
      accent: z.array(z.string()).describe("Accent color hex values"),
      muted: z.array(z.string()).describe("Muted/neutral color hex values"),
      border: z.array(z.string()).describe("Border color hex values"),
    }),
    typography: z.object({
      fontDirection: z.string().describe("Overall typography direction (e.g., modern sans-serif, elegant serif)"),
      headingStyle: z.string().describe("Heading typography style"),
      bodyStyle: z.string().describe("Body text typography style"),
      scale: z.string().describe("Typography scale description"),
    }),
    detectedFonts: z.array(
      z.object({
        role: z.enum(["heading", "body", "mono"]).describe("Font role in the design"),
        detectedName: z.string().describe("Detected or closest matching font name"),
        category: z.string().describe("Font category: serif, sans-serif, display, mono, etc."),
        closestGoogleFont: z.string().describe("Closest Google Fonts match for the detected font"),
        googleFontsUrl: z.string().describe("Direct Google Fonts CSS @import or link URL"),
        alternatives: z.array(z.string()).describe("2-3 similar Google Fonts alternatives"),
      })
    ).describe("Detected fonts from the UI screenshot. If the exact font is unidentifiable, provide the closest match based on visual characteristics."),
    fontPairing: z.string().describe("Recommended font pairing for the design system, e.g. 'Playfair Display + Inter'"),
    visualAssets: z.array(
      z.object({
        type: z.enum(["background", "texture", "illustration", "pattern", "decoration"]).describe("Type of visual asset"),
        description: z.string().describe("Brief description of the visual asset (e.g. 'dark grainy noise overlay', '3D abstract blob shapes')"),
        location: z.string().describe("Where in the UI this asset appears (e.g. 'hero section background', 'card texture overlay')"),
        moodKeywords: z.array(z.string()).describe("3-5 descriptive keywords for mood/style (e.g. ['abstract', 'minimal', 'soft', 'gradient']"),
        searchKeywords: z.string().describe("Concise search query for stock image sites, e.g. 'minimal abstract gradient background'"),
        pinterestUrl: z.string().describe("Pinterest search URL using the search keywords"),
        unsplashQuery: z.string().describe("Unsplash search query string"),
      })
    ).describe("Visual assets detected in the UI screenshot: background images, textures, illustrations, patterns, decorative elements. Focus on the DESIGN SYSTEM level, not exact asset cloning."),
    spacing: z.string().describe("Spacing scale and rhythm description"),
    radius: z.string().describe("Border radius patterns"),
    shadows: z.string().describe("Shadow and elevation patterns"),
    effects: z.string().describe("Visual effects like blur, glass, gradients, textures"),
  }),
  componentRules: z.object({
    buttons: z.string().describe("Button styling rules"),
    cards: z.string().describe("Card styling rules"),
    navigation: z.string().describe("Navigation styling rules"),
    forms: z.string().describe("Form input styling rules"),
    badges: z.string().describe("Badge and tag styling rules"),
    sections: z.string().describe("Section container styling rules"),
  }),
  layoutRules: z.string().describe("Layout structure, grid, container width, alignment, hierarchy"),
  responsiveRules: z.string().describe("Responsive behavior rules for mobile, tablet, desktop"),
  doNotUse: z.array(z.string()).describe("Things to avoid that would break the reference style"),
  fullPrompt: z.string().describe("The complete implementation prompt for the target AI coding tool"),
  validationChecklist: z.array(z.string()).describe("Checklist items to validate the implementation"),
});

export type PromptResultOutput = z.infer<typeof promptResultSchema>;
