# UI Cloner Prompt Maker — Implementation Todo

## Phase 0: Project Setup
- [x] Initialize Next.js 16 project with App Router, TypeScript, TailwindCSS v4
- [x] Configure shadcn/ui
- [x] Set up project structure (src/app, src/components, src/lib, src/types)
- [x] Install required dependencies (zustand, clsx, tailwind-merge, lucide-react, @google/genai)
- [x] Configure tsconfig, tailwind config, and globals.css
- [x] Create .env.example with GEMINI_API_KEY

## Phase 1: Foundation
- [x] Create src/lib/utils/cn.ts (clsx + tailwind-merge)
- [x] Create src/types/promptGenerator.ts (all TypeScript interfaces)
- [x] Create src/lib/ai/outputSchema.ts (Zod schema for AI output validation)
- [x] Create src/lib/ai/promptTemplates.ts (system prompts and tool-specific templates)
- [x] Create src/lib/ai/generatePromptFromImage.ts (AI service abstraction)
- [x] Create src/lib/utils/fileToBase64.ts (client-side file conversion)
- [x] Create src/lib/utils/downloadMarkdown.ts (download helper)
- [x] Create mock response data for development

## Phase 2: Layout & Shared Components
- [x] Create src/app/layout.tsx (root layout with fonts, metadata, providers)
- [x] Create src/app/globals.css (Tailwind imports, custom styles, theme)
- [x] Create src/components/appHeader.tsx (navigation, logo)
- [x] Create src/components/appShell.tsx (page wrapper)
- [x] Create src/components/loadingState.tsx (skeleton/loading UI)
- [x] Create src/components/emptyState.tsx (empty state illustrations)

## Phase 3: Homepage
- [x] Create src/components/heroSection.tsx (hero with headline, subheadline, CTA)
- [x] Create src/components/howItWorksSection.tsx (3-step process)
- [x] Create src/components/featureGrid.tsx (what it extracts grid)
- [x] Create src/components/whoItIsForSection.tsx (target audience)
- [x] Create src/app/page.tsx (assemble homepage)

## Phase 4: Generator Page UI
- [x] Create src/app/generate/page.tsx (main generator layout)
- [x] Create src/components/uploadDropzone.tsx (drag & drop upload)
- [x] Create src/components/imagePreview.tsx (uploaded image preview with remove) — merged into uploadDropzone
- [x] Create src/components/generatorOptions.tsx (tool select, depth select, extra instruction)
- [x] Create src/components/resultTabs.tsx (tabbed results: Summary, Design Tokens, Component Rules, Full Prompt, Checklist)
- [x] Create src/components/promptActions.tsx (copy, download, regenerate buttons)

## Phase 5: State Management
- [x] Create Zustand store for generator state (image, options, result, loading, error)
- [x] Connect upload state to store
- [x] Connect options state to store
- [x] Connect result state to store

## Phase 6: API & AI Integration
- [x] Create src/app/api/generatePrompt/route.ts (POST handler)
- [x] Implement request validation
- [x] Integrate Gemini API client
- [x] Implement generatePromptFromImage with vision model
- [x] Add error handling for API failures
- [x] Add mock response fallback for missing API key in development
- [x] Connect frontend to API route

## Phase 7: Actions & Feedback
- [x] Implement copy-to-clipboard with success feedback
- [x] Implement download Markdown functionality
- [x] Implement regenerate action

## Phase 8: Polish & Responsive
- [x] Mobile-responsive generator layout (stack on mobile, side-by-side on desktop)
- [x] Loading states for upload and generation
- [x] Error states with helpful messages
- [x] Accessible labels and ARIA attributes
- [x] Smooth transitions and interactions
- [x] Empty states for result panels

## Phase 9: Quality Assurance
- [x] Run TypeScript type check (tsc --noEmit)
- [x] Run ESLint on source files
- [x] Run build (next build)
- [x] Verify copy and download actions compile
- [x] Verify responsive breakpoints compile
- [x] Final UI polish

## Phase 10: Documentation
- [x] Verify Features.md is complete
- [x] Verify todo.md is complete
- [x] Update README.md with setup and run instructions
