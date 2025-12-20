// app/api/atonm-test/route.ts

import { NextResponse } from "next/server";
import { narrow } from "../../atonm/narrow";
import { loadTreatments } from "./loadTreatments";
import { deriveHypotheticalUserProfile } from "../../../lib/atonm/deriveHypotheticalProfile";
import { renderHypotheticalProfileText } from "../../../lib/atonm/renderProfileText";
import { renderMethodText } from "../../../lib/atonm/renderMethodText";

/**
 * ATONM v3.1 – backend runtime
 * - Structured Q1–Q6
 * - Monotonic narrowing
 * - Deterministic profile derivation
 * - Non-advisory, template-based output
 */

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

export async function POST(req: Request) {
  const body = (await req.json()) as RequestBody;
  const { state, event, intakeText } = body;

  // ---------- INIT ----------
  if (event?.type === "START") {
    const newState: ATONMState = {
      index: 0,
      answers: {},
      done: false,
    };

    return NextResponse.json({
      state: newState,
      remainingCount: loadTreatments().length,
    });
  }

  if (!state || state.done) {
    return NextResponse.json({ done: true });
  }

  // ---------- ANSWER ----------
  if (event?.type === "ANSWER") {
    const answerKey = `Q${state.index + 1}` as AnswerKey;

    const newAnswers: ATONMState["answers"] = {
      ...state.answers,
      [answerKey]: event.value,
    };

    const nextIndex = state.index + 1;
    const treatments = loadTreatments();
    const narrowed = narrow(treatments, newAnswers);

    // ---------- FINAL ----------
    if (nextIndex >= FINAL_STEP) {
      const profile = deriveHypotheticalUserProfile(newAnswers);
      const profileText = renderHypotheticalProfileText(profile);

      const synthesis = narrowed.map((t) => {
        const methodText = renderMethodText(t.id, t);
        return {
          id: t.id,
          text: [...profileText, ...methodText].join("\n\n"),
        };
      });

      return NextResponse.json({
        done: true,
        result: synthesis,
        handoffContext: {
          intakeText,
          answers: newAnswers,
          remainingTreatments: narrowed.map((t) => t.id),
        },
      });
    }

    // ---------- CONTINUE ----------
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
