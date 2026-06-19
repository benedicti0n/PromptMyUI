import OpenAI from "openai";
import { OutputDepth, TargetTool } from "@/types/promptGenerator";
import { promptResultSchema, PromptResultOutput } from "./outputSchema";
import { buildSystemPrompt, buildUserPrompt, formatFullPrompt } from "./promptTemplates";

export interface GeneratePromptInput {
  imageBase64: string;
  mimeType: string;
  targetTool: TargetTool;
  outputDepth: OutputDepth;
  extraInstruction: string;
}

function stripMarkdownCodeBlocks(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith("```")) {
    const lines = trimmed.split("\n");
    if (lines[0].startsWith("```")) {
      lines.shift();
    }
    if (lines[lines.length - 1].trim() === "```") {
      lines.pop();
    }
    return lines.join("\n").trim();
  }
  return trimmed;
}

// OpenAI structured output schema - forces exact field names
const structuredOutputSchema = {
  name: "design_system_analysis",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      styleSummary: { type: "string" },
      designTokens: {
        type: "object",
        additionalProperties: false,
        properties: {
          colors: {
            type: "object",
            additionalProperties: false,
            properties: {
              background: { type: "array", items: { type: "string" } },
              foreground: { type: "array", items: { type: "string" } },
              primary: { type: "array", items: { type: "string" } },
              accent: { type: "array", items: { type: "string" } },
              muted: { type: "array", items: { type: "string" } },
              border: { type: "array", items: { type: "string" } },
            },
            required: ["background", "foreground", "primary", "accent", "muted", "border"],
          },
          typography: {
            type: "object",
            additionalProperties: false,
            properties: {
              fontDirection: { type: "string" },
              headingStyle: { type: "string" },
              bodyStyle: { type: "string" },
              scale: { type: "string" },
            },
            required: ["fontDirection", "headingStyle", "bodyStyle", "scale"],
          },
          detectedFonts: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                role: { type: "string", enum: ["heading", "body", "mono"] },
                detectedName: { type: "string" },
                category: { type: "string" },
                closestGoogleFont: { type: "string" },
                googleFontsUrl: { type: "string" },
                alternatives: { type: "array", items: { type: "string" } },
              },
              required: ["role", "detectedName", "category", "closestGoogleFont", "googleFontsUrl", "alternatives"],
            },
          },
          fontPairing: { type: "string" },
          visualAssets: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                type: { type: "string", enum: ["background", "texture", "illustration", "pattern", "decoration"] },
                description: { type: "string" },
                location: { type: "string" },
                moodKeywords: { type: "array", items: { type: "string" } },
                searchKeywords: { type: "string" },
                pinterestUrl: { type: "string" },
                unsplashQuery: { type: "string" },
              },
              required: ["type", "description", "location", "moodKeywords", "searchKeywords", "pinterestUrl", "unsplashQuery"],
            },
          },
          spacing: { type: "string" },
          radius: { type: "string" },
          shadows: { type: "string" },
          effects: { type: "string" },
        },
        required: ["colors", "typography", "detectedFonts", "fontPairing", "visualAssets", "spacing", "radius", "shadows", "effects"],
      },
      componentRules: {
        type: "object",
        additionalProperties: false,
        properties: {
          buttons: { type: "string" },
          cards: { type: "string" },
          navigation: { type: "string" },
          forms: { type: "string" },
          badges: { type: "string" },
          sections: { type: "string" },
        },
        required: ["buttons", "cards", "navigation", "forms", "badges", "sections"],
      },
      layoutRules: { type: "string" },
      responsiveRules: { type: "string" },
      doNotUse: { type: "array", items: { type: "string" } },
      fullPrompt: { type: "string" },
      validationChecklist: { type: "array", items: { type: "string" } },
    },
    required: [
      "styleSummary",
      "designTokens",
      "componentRules",
      "layoutRules",
      "responsiveRules",
      "doNotUse",
      "fullPrompt",
      "validationChecklist",
    ],
  },
} as const;

export async function generatePromptFromImage(
  input: GeneratePromptInput
): Promise<PromptResultOutput> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured. Please set it in your environment variables.");
  }

  const openai = new OpenAI({ apiKey });

  const systemPrompt = buildSystemPrompt(input.outputDepth);
  const userPrompt = buildUserPrompt(
    input.outputDepth,
    input.targetTool,
    input.extraInstruction
  );

  const dataUrl = `data:${input.mimeType};base64,${input.imageBase64}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: [
          { type: "text", text: userPrompt },
          {
            type: "image_url",
            image_url: {
              url: dataUrl,
              detail: "high",
            },
          },
        ],
      },
    ],
    max_tokens: 6000,
    temperature: 0.7,
    response_format: {
      type: "json_schema",
      json_schema: structuredOutputSchema,
    },
  });

  const message = response.choices[0]?.message;
  if (!message || message.refusal) {
    throw new Error(message?.refusal || "Empty response from AI model.");
  }

  const text = message.content;
  if (!text) {
    throw new Error("Empty response from AI model.");
  }

  const cleanedText = stripMarkdownCodeBlocks(text);

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleanedText);
  } catch {
    console.error("Failed to parse AI response as JSON. Raw response:", text);
    throw new Error(
      "The AI returned an invalid JSON response. Please try again."
    );
  }

  try {
    const validated = promptResultSchema.parse(parsed);

    // Override the AI-generated fullPrompt with our formatted version for consistency
    validated.fullPrompt = formatFullPrompt(validated, input.targetTool);

    return validated;
  } catch {
    console.error(
      "AI response failed schema validation. Parsed response:",
      JSON.stringify(parsed, null, 2)
    );
    throw new Error(
      "The AI response did not match the expected structure. Please try again."
    );
  }
}
