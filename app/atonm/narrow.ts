// app/atonm/narrow.ts
// ATONM v3.1 – monotonic narrowing
// Status: Active · Heuristikfri · Ikke-rangerende

import type { Treatment } from "./types";


export function narrow(
  treatments: Treatment[],
  answers: Record<string, number>
): Treatment[] {
  let result = [...treatments];

  // Q1 – oplevelsesorientering (kropsligt / mentalt / blandet / uklart)
  if (answers.Q1 === 0) {
    // Mest kropsligt
    result = result.filter((t) => t.experienceOrientation === "body");
  }

  if (answers.Q1 === 1) {
    // Mest mentalt
    result = result.filter((t) => t.experienceOrientation === "mind");
  }

  // Q2 – situationsmønster (situational / recurring / long_term)
  if (answers.Q2 === 0) {
    // Knyttet til en situation
    result = result.filter((t) => t.temporalStructure === "bounded");
  }

  if (answers.Q2 === 2 || answers.Q2 === 3) {
    // Vender tilbage / har stået på i lang tid
    result = result.filter((t) => t.temporalStructure !== "bounded");
  }

  // Q3 – arbejdsform (kropsligt / samtale / helhedsorienteret / ingen præference)
  if (answers.Q3 === 0) {
    // Kropsligt arbejde
    result = result.filter((t) => t.experienceOrientation === "body");
  }

  if (answers.Q3 === 1) {
    // Samtale / refleksion
    result = result.filter((t) => t.experienceOrientation === "mind");
  }

  // Q4 – deltagelsesform (aktiv / balance / guidet / ingen præference)
  if (answers.Q4 === 0) {
    // Jeg er selv aktiv
    result = result.filter((t) => t.interactionForm === "active");
  }

  if (answers.Q4 === 2) {
    // Jeg bliver guidet
    result = result.filter((t) => t.guidanceLevel === "practitioner_led");
  }

  // Q5 – forklaringsramme / abstraktion
  if (answers.Q5 === 0) {
    // Meget vigtig forklaringsramme
    result = result.filter((t) => t.abstractionLevel !== "concrete");
  }

  if (answers.Q5 === 2) {
    // Ikke vigtig
    result = result.filter((t) => t.abstractionLevel === "concrete");
  }

  // Q6 – begrænsninger
  // Bevidst ingen filtrering i v3.1
  // (økonomi/tid må ikke påvirke metodeudvalg)

  return result;
}
