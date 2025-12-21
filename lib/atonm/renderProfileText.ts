// lib/atonm/renderProfileText.ts
// Status: Ren render-funktion · ingen beslutningslogik

import type { HypotheticalUserProfile } from "./profile.schema";

export function renderHypotheticalProfileText(
  profile: HypotheticalUserProfile
): string[] {
  const lines: string[] = [];

  lines.push(
    `Din måde at opleve situationer på beskrives her som primært ${profile.experienceOrientation}.`
  );

  lines.push(
    `Forløb opleves oftest som ${profile.situationPattern.replace("_", " ")}.`
  );

  lines.push(
    `Du foretrækker typisk en ${profile.participationPreference} rolle i processen.`
  );

  lines.push(
    `Guidance-niveauet hælder mod ${profile.guidancePreference.replace("_", " ")}.`
  );

  lines.push(
    `Din tolerance for forklaringsrammer er vurderet som ${profile.abstractionTolerance}.`
  );

  return lines;
}
