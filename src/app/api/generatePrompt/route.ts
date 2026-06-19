import { NextRequest, NextResponse } from "next/server";
import { generatePromptFromImage } from "@/lib/ai/generatePromptFromImage";
import { getMockResponse } from "@/lib/ai/mockResponse";
import { formatFullPrompt } from "@/lib/ai/promptTemplates";
import { promptResultSchema } from "@/lib/ai/outputSchema";
import { TargetTool, OutputDepth } from "@/types/promptGenerator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64, mimeType, targetTool, outputDepth, extraInstruction } = body;

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid imageBase64 field." },
        { status: 400 }
      );
    }

    if (!mimeType || typeof mimeType !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid mimeType field." },
        { status: 400 }
      );
    }

    const validTools: TargetTool[] = [
      "openCode",
      "cursor",
      "kimi",
      "claudeCode",
      "v0",
      "bolt",
      "lovable",
      "generic",
    ];
    if (!validTools.includes(targetTool)) {
      return NextResponse.json(
        { error: "Invalid targetTool." },
        { status: 400 }
      );
    }

    const validDepths: OutputDepth[] = [
      "quickPrompt",
      "detailedDesignSystem",
      "fullImplementation",
    ];
    if (!validDepths.includes(outputDepth)) {
      return NextResponse.json(
        { error: "Invalid outputDepth." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // In development, return mock data so the UI can be tested
      if (process.env.NODE_ENV === "development") {
        const mock = getMockResponse();
        mock.fullPrompt = formatFullPrompt(mock, targetTool);
        return NextResponse.json(mock, { status: 200 });
      }

      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured. Please set it in your environment variables." },
        { status: 503 }
      );
    }

    const result = await generatePromptFromImage({
      imageBase64,
      mimeType,
      targetTool,
      outputDepth,
      extraInstruction: extraInstruction || "",
    });

    const validated = promptResultSchema.parse(result);
    return NextResponse.json(validated, { status: 200 });
  } catch (error) {
    console.error("Generate prompt error:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
