// app/api/atonm-test/route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { narrow } from "../../../lib/atonm/narrow";
import { loadTreatments } from "./loadTreatments";
import { QUESTIONS } from "../../../lib/atonm/questions";
import { deriveHypotheticalUserProfile } from "../../../lib/atonm/deriveHypotheticalProfile";
import { renderHypotheticalProfileText } from "../../../lib/atonm/renderProfileText";
import { renderMethodText } from "../../../lib/atonm/renderMethodText";

type AnswerKey = "Q1" | "Q2" | "Q3" | "Q4" | "Q5" | "Q6";

type ATONMState = {
  index: number;
  answers: Partial<Record<AnswerKey, number>>;
  done: boolean;
};

type RequestBody = {
  state?: ATONMState;
  event?: { type: "START" } | { type: "ANSWER"; value: number };
  intakeText?: string;
};

const FINAL_STEP = 6;

function mapAnswersToOptionStrings(
  answers: Partial<Record<AnswerKey, number>>
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const q of QUESTIONS) {
    const idx = answers[q.id as AnswerKey];
    if (typeof idx === "number" && q.options[idx]) {
      result[q.id] = q.options[idx];
    }
  }
  return result;
}

export async function POST(req: Request) {
  const body = (await req.json()) as RequestBody;
  const { state, event, intakeText } = body;

  if (event?.type === "START") {
    return NextResponse.json({
      state: { index: 0, answers: {}, done: false },
      remainingCount: loadTreatments().length,
    });
  }

  if (!state) return NextResponse.json({ done: true });

  if (event?.type === "ANSWER") {
    const key = `Q${state.index + 1}` as AnswerKey;
    const newAnswers = { ...state.answers, [key]: event.value };

    const nextIndex = state.index + 1;
    const treatments = loadTreatments();
    const narrowed = narrow(treatments, newAnswers);

    if (nextIndex >= FINAL_STEP) {
      const labeled = mapAnswersToOptionStrings(newAnswers);
      const profile = deriveHypotheticalUserProfile(labeled);

      return NextResponse.json({
        done: true,
        profileText: renderHypotheticalProfileText(profile, intakeText),
        methods: narrowed.map((t) => ({
          id: t.id,
          text: renderMethodText(t.id, t).join("\n\n"),
        })),
        handoffContext: {
          intakeText,
          answers: labeled,
          remainingTreatments: narrowed.map((t) => t.id),
        },
      });
    }

    return NextResponse.json({
      state: { index: nextIndex, answers: newAnswers, done: false },
      remainingCount: narrowed.length,
    });
  }

  return NextResponse.json({ done: true });
}
