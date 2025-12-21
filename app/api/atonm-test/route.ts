// app/api/atonm-test/route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { narrow } from "../../atonm/narrow";
import { loadTreatments } from "./loadTreatments";
import { QUESTIONS } from "../../atonm/questions";
import { deriveHypotheticalUserProfile } from "../../../lib/atonm/deriveHypotheticalProfile";
import { renderHypotheticalProfileText } from "../../../lib/atonm/renderProfileText";
import { renderMethodText } from "../../../lib/atonm/renderMethodText";

type AnswerKey = "Q1" | "Q2" | "Q3" | "Q4" | "Q5" | "Q6";

type ATONMState = {
  index: number;
  answers: Partial<Record<AnswerKey, number>>;
  done: boolean;
};

type StartEvent = { type: "START" };
type AnswerEvent = { type: "ANSWER"; value: number };

type RequestBody = {
  state?: ATONMState;
  event?: StartEvent | AnswerEvent;
  intakeText?: string;
};

const FINAL_STEP = 6;

function mapAnswersToOptionStrings(
  answers: Partial<Record<AnswerKey, number>>
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const q of QUESTIONS) {
    const idx = answers[q.id as AnswerKey];
    if (typeof idx === "number" && q.options[idx] !== undefined) {
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

  if (!state || state.done) {
    return NextResponse.json({ done: true });
  }

  if (event?.type === "ANSWER") {
    const answerKey = `Q${state.index + 1}` as AnswerKey;

    const newAnswers = {
      ...state.answers,
      [answerKey]: event.value,
    };

    const nextIndex = state.index + 1;
    const treatments = loadTreatments();
    const narrowed = narrow(treatments, newAnswers);

    if (nextIndex >= FINAL_STEP) {
      const labeledAnswers = mapAnswersToOptionStrings(newAnswers);

      const profile = deriveHypotheticalUserProfile(labeledAnswers);
      const profileText = renderHypotheticalProfileText(profile);

      const methods = narrowed.map((t) => ({
        id: t.id,
        text: renderMethodText(t.id, t).join("\n\n"),
      }));

      return NextResponse.json({
        done: true,
        profileText,
        methods,
        handoffContext: {
          intakeText,
          answers: labeledAnswers,
          remainingTreatments: narrowed.map((t) => t.id),
        },
      });
    }

    return NextResponse.json({
      state: {
        index: nextIndex,
        answers: newAnswers,
        done: false,
      },
      remainingCount: narrowed.length,
    });
  }

  return NextResponse.json({ done: true });
}
