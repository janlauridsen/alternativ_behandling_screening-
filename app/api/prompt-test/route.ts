import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Indlæs systemprompt (generel samtale)
const SYSTEM_PROMPT = fs.readFileSync(
  path.join(process.cwd(), "docs/runtime/system-prompt-v2.txt"),
  "utf8"
);

export async function POST(req: Request) {
  const body = await req.json();
  const { message, systemContext } = body;

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Invalid input" },
      { status: 400 }
    );
  }

  const messages: { role: "system" | "user"; content: string }[] = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
  ];

  // 👇 VIGTIGT: Bevar ATONM-kontekst efter handoff
  if (systemContext?.source === "ATONM" && systemContext.handoffContext) {
    messages.push({
      role: "system",
      content: `
The following context comes from a completed ATONM orientation.

This context summarizes what has already been explored and narrowed.

You must:
- Treat this as established context.
- Not repeat the orientation.
- Not reopen narrowing or suggest alternatives.
- Not recommend treatments.
- Build on this context conversationally and reflectively.

ATONM context:
${JSON.stringify(systemContext.handoffContext, null, 2)}
      `.trim(),
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
