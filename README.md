# UI Cloner Prompt Maker

Turn any UI screenshot into a developer-ready design prompt for AI coding tools.

## What it does

Upload a landing page, dashboard, SaaS UI, portfolio, or mobile app screenshot. The app analyzes the image using a vision AI model and generates a structured prompt that captures the visual design DNA — colors, typography, layout, components, spacing, shadows, and overall aesthetic. Copy the prompt into OpenCode, Cursor, Kimi, Claude Code, v0, Bolt, or Lovable to restyle your project.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- TailwindCSS v4
- shadcn/ui
- Zustand
- OpenAI GPT-4o (vision model)

## Getting Started

### Prerequisites

- Node.js 18.18+
- npm or yarn
- OpenAI API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. Go to the **Generate** page.
2. Upload a UI screenshot (PNG, JPG, JPEG, WEBP, max 8MB).
3. Select your target AI coding tool.
4. Choose the output depth (Quick, Detailed, or Full Implementation).
5. Add any extra instructions if needed.
6. Click **Generate Prompt**.
7. Browse the result tabs: Summary, Design Tokens, Component Rules, Full Prompt, Checklist.
8. Copy the full prompt or download it as a Markdown file.

## Development Without API Key

If `OPENAI_API_KEY` is not set, the app will return a realistic mock response in development mode so you can test the UI.

## Project Structure

```
src/
  app/
    page.tsx                 # Homepage
    generate/page.tsx        # Generator page
    api/generatePrompt/      # API route for AI generation
    layout.tsx               # Root layout
    globals.css              # Global styles
  components/
    appHeader.tsx            # Navigation header
    appShell.tsx             # Page wrapper with footer
    heroSection.tsx          # Homepage hero
    howItWorksSection.tsx    # How it works section
    featureGrid.tsx          # Features grid
    whoItIsForSection.tsx    # Target audience
    uploadDropzone.tsx       # Image upload
    generatorOptions.tsx     # Tool/depth selectors
    resultTabs.tsx           # Result display tabs
    promptActions.tsx        # Copy/download/regenerate
    loadingState.tsx         # Loading skeleton
    emptyState.tsx           # Empty state
    ui/                      # shadcn/ui components
  lib/
    ai/
      generatePromptFromImage.ts  # AI service abstraction
      promptTemplates.ts          # Prompt builders
      outputSchema.ts             # Zod schema
      mockResponse.ts             # Dev mock data
    utils/
      cn.ts                       # Tailwind merge
      fileToBase64.ts             # File helpers
      downloadMarkdown.ts         # Download/copy helpers
  store/
    generatorStore.ts          # Zustand state
  types/
    promptGenerator.ts         # TypeScript types
```

## Important Notes

- This is an **experimental MVP**. It extracts visual style, not exact code.
- It does **not** create pixel-perfect clones.
- No database, authentication, or payments are included.
- The AI provider abstraction makes it easy to swap OpenAI for another vision model later.

## License

MIT
