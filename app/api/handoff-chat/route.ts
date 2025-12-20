import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Indlæs eksisterende systemprompt
const SYSTEM_PROMPT = fs.readFileSync(
  path.join(process.cwd(), "docs/runtime/system-prompt-v2.txt"),
  "utf8"
);

// Handoff-instruktion (kort, normativ)
const HANDOFF_INSTRUCTION = `
You are continuing a conversation after an ATONM orientation.

The user has completed a structured, non-diagnostic narrowing process.

You must:
- Start by briefly summarizing the orientation in neutral language.
- Mention remaining approaches descriptively, without recommending or prioritizing.
- Do not reopen narrowing or ask diagnostic questions.
- Do not give advice or promise outcomes.
- End with one open-ended question asking what the user would like to explore further.

This is an orientation handoff, not a treatment discussion.
`;

export async function POST(req: Request) {
  const body = await req.json();
  const { handoffContext } = body;

  if (!handoffContext) {
    return NextResponse.json(
      { error: "Missing handoffContext" },
      { status: 400 }
    );
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "system",
        content: HANDOFF_INSTRUCTION,
      },
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

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}
