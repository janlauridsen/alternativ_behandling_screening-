// File: lib/atonm/safety/aiClassifier.ts
// ATONM v3.5 – AI safety classifier (enum-only, fail-fast)

import OpenAI from "openai";
import { SafetyResult, SafetyClassification } from "./SafetyGate";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = "gpt-4.1-mini";

// Ultra-stram prompt: klassifikation, intet andet
const SYSTEM_PROMPT = `
You are a safety classifier.

Classify the following text into EXACTLY ONE of these categories:

SAFE
CRISIS
DESTRUCTIVE
SEXUAL
ILLEGAL
UNKNOWN

Return ONLY the category name.
No explanation.
No punctuation.
No additional text.
`;

const VALID: SafetyClassification[] = [
  "SAFE",
  "CRISIS",
  "DESTRUCTIVE",
  "SEXUAL",
  "ILLEGAL",
  "UNKNOWN",
];

export async function classifyWithAI(
  text: string,
  timeoutMs = 3000
): Promise<SafetyResult> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const completion = await client.chat.completions.create(
      {
        model: MODEL,
        temperature: 0,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: text },
        ],
      },
      { signal: controller.signal }
    );

    const raw = completion.choices[0]?.message?.content?.trim();

    if (!raw || !VALID.includes(raw as SafetyClassification)) {
      return {
        classification: "UNKNOWN",
        reason: "invalid model output",
      };
    }

    return {
      classification: raw as SafetyClassification,
    };
  } catch (err) {
    return {
      classification: "UNKNOWN",
      reason: "ai_error_or_timeout",
    };
  } finally {
    clearTimeout(id);
  }
}
