// app/atonm/narrow.ts
// Status: Active · Heuristikfri · Ikke-rangerende

import type { Treatment } from "../../lib/atonm/types";

type AnswerKey = "Q1" | "Q2" | "Q3" | "Q4" | "Q5" | "Q6";

export function narrow(
  treatments: Treatment[],
  answers: Partial<Record<AnswerKey, number>>
): Treatment[] {
  let result = [...treatments];

  // Q1 – kropsligt vs mentalt fokus
  if (answers.Q1 === 0) {
    result = result.filter(
      (t) => t.experienceOrientation === "body"
    );
  }

  if (answers.Q1 === 1) {
    result = result.filter(
      (t) => t.experienceOrientation === "mind"
    );
  }

  // Q6 – økonomiske begrænsninger
  if (answers.Q6 === 0 || answers.Q6 === 2) {
    result = result.filter(
      (t) => t.practitionerDependency !== "high"
    );
  }

  return result;
}
