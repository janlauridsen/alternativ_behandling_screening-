// app/api/prompt-test/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = fs.readFileSync(
  path.join(process.cwd(), "docs/atonm/runtime/system-prompt-v2.txt"),
  "utf8"
);


// ATONM handoff-kontekst (v3.1 – konsistent med handoff-chat)
const ATONM_CONTEXT_INSTRUCTION = `
The following context comes from a completed ATONM orientation.

This context represents an orientational summary and remaining descriptive frames.

You must:
- Treat this context as established background.
- Do not repeat or rephrase the ATONM orientation.
- Do not reopen narrowing or suggest alternatives.
- Do not recommend, prioritize, or assess suitability.
- Continue the conversation in a reflective, exploratory manner.

This is not a treatment discussion.
`;

export async function POST(req: Request) {
  const body = await req.json();
  const { message, systemContext } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const messages: { role: "system" | "user"; content: string }[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
  ];

  // Bevar ATONM-kontekst efter handoff (v3.1)
  if (systemContext?.source === "ATONM" && systemContext.handoffContext) {
    messages.push({
      role: "system",
      content:
        ATONM_CONTEXT_INSTRUCTION +
        `\nATONM context:\n${JSON.stringify(
          systemContext.handoffContext,
          null,
          2
        )}`,
    });
  }

  // Brugerens aktuelle input
  messages.push({
    role: "user",
    content: message,
  });

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages,
    temperature: 0.4,
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}

