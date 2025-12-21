// lib/atonm/deriveHypotheticalProfile.ts
// Status: Deterministisk afledning · ingen sideeffekter

import type { HypotheticalUserProfile } from "./profile.schema";

// Forventet input: map fra spørgsmål-id til valgt option (string)
export type AtonmAnswers = {
  [questionId: string]: string;
};

export function deriveHypotheticalUserProfile(
  answers: AtonmAnswers
): HypotheticalUserProfile {
  const q1 = answers["Q1"];
  const q2 = answers["Q2"];
  const q3 = answers["Q3"];
  const q4 = answers["Q4"];
  const q5 = answers["Q5"];

  const experienceOrientation: HypotheticalUserProfile["experienceOrientation"] =
    q1 === "Mest kropsligt"
      ? "body"
      : q1 === "Mest mentalt"
      ? "mind"
      : q1 === "En blanding"
      ? "mixed"
      : "unclear";

  const situationPattern: HypotheticalUserProfile["situationPattern"] =
    q2 === "Knyttet til en situation"
      ? "situational"
      : q2 === "Vender tilbage"
      ? "recurring"
      : q2 === "Har stået på i lang tid"
      ? "long_term"
      : "situational";

  const participationPreference: HypotheticalUserProfile["participationPreference"] =
    q4 === "Jeg er selv aktiv"
      ? "active"
      : q4 === "Jeg bliver guidet"
      ? "passive"
      : "mixed";

  const guidancePreference: HypotheticalUserProfile["guidancePreference"] =
    q4 === "Jeg bliver guidet"
      ? "guided"
      : q4 === "Jeg er selv aktiv"
      ? "self_directed"
      : "shared";

  const abstractionTolerance: HypotheticalUserProfile["abstractionTolerance"] =
    q5 === "Meget vigtig"
      ? "high"
      : q5 === "Ikke vigtig"
      ? "low"
      : "medium";

  return {
    experienceOrientation,
    situationPattern,
    participationPreference,
    guidancePreference,
    abstractionTolerance,
  };
}
