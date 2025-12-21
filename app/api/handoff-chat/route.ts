// app/api/handoff-chat/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

import { evaluateGuards } from "../../../lib/atonm/guards/evaluate";
import { respond } from "../../../lib/atonm/guards/respond";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = fs.readFileSync(
  path.join(process.cwd(), "docs/atonm/runtime/system-prompt-v2.txt"),
  "utf8"
);

const HANDOFF_INSTRUCTION = `
You are continuing a conversation after an ATONM orientation.

The user has completed a structured, non-diagnostic narrowing and descriptive orientation.

You must:
- Summarize the orientation outcome in neutral, descriptive language.
- Refer to remaining approaches only as different forms or frames of engagement.
- Avoid recommendations, prioritization, or suitability claims.
- Do not ask diagnostic or follow-up narrowing questions.
- Do not promise outcomes or imply effectiveness.
- End with a single, open-ended question inviting reflection or curiosity.

This handoff is explanatory and exploratory, not advisory.
`;

export async function POST(req: Request) {
  const body = await req.json();
  const { message, handoffContext } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  // ---------- INPUT GUARDS (v3.5) ----------
  const guard = await evaluateGuards(message);

  if (guard) {
    return NextResponse.json({
      reply: respond(guard),
    });
  }

  // ---------- LLM ----------
  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.4,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "system", content: HANDOFF_INSTRUCTION },
      {
        role: "user",
        content: `Context from ATONM orientation:\n${JSON.stringify(
          handoffContext,
          null,
          2
        )}`,
      },
    ],
  });

  // ---------- OUTPUT SAFETY (v3.5) ----------
  const reply = completion.choices[0].message.content ?? "";

  const outputGuard = await evaluateGuards(reply);

  if (outputGuard) {
    return NextResponse.json({
      reply: respond(outputGuard),
    });
  }

  return NextResponse.json({ reply });
}
