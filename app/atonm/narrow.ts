// app/atonm/narrow.ts
// ATONM v3.1 – monotonic narrowing
// Status: Active · Heuristikfri · Ikke-rangerende

import type { Treatment } from "./types";

export function narrow(
  treatments: Treatment[],
  answers: Record<string, number>
): Treatment[] {
  let result = [...treatments];

  // Q1 – oplevelsesorientering
  if (answers.Q1 === 0) {
    result = result.filter((t) => t.experienceOrientation === "body");
  }
  if (answers.Q1 === 1) {
    result = result.filter((t) => t.experienceOrientation === "mind");
  }

  // Q2 – situationsmønster
  if (answers.Q2 === 0) {
    result = result.filter((t) => t.temporalStructure === "bounded");
  }
  if (answers.Q2 === 2 || answers.Q2 === 3) {
    result = result.filter((t) => t.temporalStructure !== "bounded");
  }

  // Q3 – arbejdsform (adskilt fra Q1)
  if (answers.Q3 === 0) {
    result = result.filter(
      (t) =>
        t.experienceOrientation === "body" ||
        t.interactionForm === "active"
    );
  }
  if (answers.Q3 === 1) {
    result = result.filter(
      (t) =>
        t.experienceOrientation === "mind" ||
        t.interactionForm === "dialog"
    );
  }

  // Q4 – deltagelsesform
  if (answers.Q4 === 0) {
    result = result.filter((t) => t.interactionForm === "active");
  }
  if (answers.Q4 === 2) {
    result = result.filter((t) => t.guidanceLevel === "practitioner_led");
  }

  // Q5 – forklaringsramme
  if (answers.Q5 === 0) {
    result = result.filter((t) => t.abstractionLevel !== "concrete");
  }
  if (answers.Q5 === 2) {
    result = result.filter((t) => t.abstractionLevel === "concrete");
  }

  // Q6 – bevidst ingen filtrering i v3.1

  return result;
}
