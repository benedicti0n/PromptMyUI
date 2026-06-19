# UI Cloner Prompt Maker — Features

## MVP Features (v1.0)

### Core Flow
1. **Homepage** — Product explanation with hero, how-it-works, feature grid, and target audience sections.
2. **Image Upload** — Accept PNG, JPG, JPEG, WEBP. Max 8MB. Preview with remove/replace. File type and size validation.
3. **Generator Options** — Select target AI coding tool (OpenCode, Cursor, Kimi, Claude Code, v0, Bolt, Lovable, Generic) and output depth (Quick Prompt, Detailed Design System Prompt, Full Implementation Prompt). Optional extra instruction text input.
4. **AI Vision Analysis** — Send screenshot to Gemini vision model. Extract visual design DNA.
5. **Structured Output** — Return JSON with style summary, design tokens, component rules, layout rules, responsive rules, do-not-use list, full prompt, and validation checklist.
6. **Result Tabs** — Summary, Design Tokens, Component Rules, Full Prompt, Checklist.
7. **Copy & Download** — Copy full prompt to clipboard. Download as Markdown file.
8. **Regenerate** — Re-run analysis with same or modified options.
9. **Error Handling** — Graceful handling of missing API key, network errors, invalid images, and AI failures.
10. **Responsive Design** — Works on mobile, tablet, and desktop.

### AI Generation
- Analyze UI screenshots visually (no OCR).
- Extract: product category, visual style, emotional intent, color palette (approx hex), typography, layout, hero/header patterns, cards, buttons, navbar, border radius, shadows, gradients, decorative elements, spacing, responsive assumptions, unique signatures.
- Generate tool-specific prompts tailored to the selected target tool.
- Mock response available for development without API key.

### Technical
- Next.js 16 App Router
- React 19 + TypeScript
- TailwindCSS v4
- shadcn/ui components
- Zustand (if state management needed)
- Server Actions / API Routes for AI generation
- Environment variable for API key
- Clean abstraction for swappable AI providers
- camelCase naming convention throughout

---

## Future Features (Post-MVP)

### Enhancements
- **Batch upload** — Analyze multiple screenshots at once.
- **History** — Save previous generations (requires database).
- **Favorites** — Bookmark favorite prompts.
- **Prompt comparison** — Side-by-side compare two generated prompts.
- **Custom templates** — Save and reuse custom prompt templates.
- **Export formats** — JSON, PDF, Notion export.
- **Component extraction** — Identify specific UI components by bounding box.
- **Design system export** — Generate Tailwind config, CSS variables, or theme objects.
- **Live preview** — Generate a live HTML/CSS preview of the extracted style.
- **URL input** — Enter a website URL instead of uploading a screenshot.

### Monetization Ideas
- **Free tier** — 5 generations per day, basic depth only.
- **Pro tier** — Unlimited generations, all depths, history, custom templates, batch upload.
- **Team tier** — Shared workspace, collaboration, brand library.
- **API access** — Direct API for integration into design tools.

---

## Non-Goals (Explicitly Out of Scope)

- **Exact pixel-perfect cloning** — We extract style DNA, not clone code.
- **Code generation** — We generate prompts, not actual component code.
- **OCR / text extraction** — Vision analysis only, no text reading.
- **Authentication** — No login for MVP.
- **Database** — No persistence for MVP.
- **Payments** — No billing for MVP.
- **Real-time collaboration** — No multiplayer features.
- **Mobile app** — Web-only for MVP.
- **Browser extension** — Not for MVP.
