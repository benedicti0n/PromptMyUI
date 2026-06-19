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
    // Remove first line (```json or ```)
    if (lines[0].startsWith("```")) {
      lines.shift();
    }
    // Remove last line if it's ```
    if (lines[lines.length - 1].trim() === "```") {
      lines.pop();
    }
    return lines.join("\n").trim();
  }
  return trimmed;
}

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
    response_format: { type: "json_object" },
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
