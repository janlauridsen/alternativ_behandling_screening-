import { NextResponse } from "next/server";
import { loadTreatments } from "./loadTreatments";

/**
 * ATONM – minimal test runtime (v1)
 * Purpose: Validate flow, questions, stop, and return control.
 * No YAML, no recommendations, no persistence.
 */

type Step = 1 | 2 | 3 | 4 | 5 | 6 | "done";

interface ATONMState {
  step: Step;
  answers: Record<string, string>;
}

const QUESTIONS: Record<number, string> = {
  1: `Q1 – Hvordan oplever du det, du står i, overordnet?
A. Mest kropsligt
B. Mest mentalt eller følelsesmæssigt
C. En blanding
D. Svært at afgrænse`,

  2: `Q2 – Hvordan oplever du forløbet?
A. Knyttet til en konkret situation
B. Mere generelt
C. Vender tilbage
D. Har stået på i lang tid`,

  3: `Q3 – Hvad føles mest naturligt for dig?
A. Kropsligt arbejde
B. Samtale og refleksion
C. Mere helhedsorienteret
D. Ingen klar præference`,

  4: `Q4 – Hvad passer dig bedst?
A. Jeg er selv aktiv
B. En balance
C. Jeg bliver primært guidet
D. Ingen klar præference`,

  5: `Q5 – Hvor vigtigt er en tydelig forklaringsramme?
A. Meget vigtigt
B. Rart, men ikke afgørende
C. Ikke så vigtigt
D. Åben for forskellige forklaringer`,

  6: `Q6 – Er der noget, der begrænser dig mest lige nu?
A. Økonomi
B. Tid
C. Begge dele
D. Ikke umiddelbart`,
};

export async function POST(req: Request) {
  const body = await req.json();

  const state: ATONMState = body.state ?? {
    step: 1,
    answers: {},
  };

  const input: string | undefined = body.message;

  // Hvis vi er færdige
  if (state.step === "done") {
    return NextResponse.json({
      reply:
        "ATONM er afsluttet.\n\n" +
        "Dette var en struktureret orienteringstest.\n" +
        "Ingen anbefaling er givet.",
      done: true,
    });
  }

  // Gem svar på forrige spørgsmål
  if (input && state.step !== 1) {
    state.answers[`Q${state.step - 1}`] = input.trim();
  }

  // Hvis sidste spørgsmål er besvaret → afslut
  if (state.step === 7) {
    state.step = "done";

    return NextResponse.json({
      reply:
        "ATONM – orientering afsluttet.\n\n" +
        "Eksempel på output (test):\n" +
        "- Hypnoterapi\n" +
        "- NADA\n\n" +
        "Dette er ikke en anbefaling, men et test-output.",
      state,
      done: true,
    });
  }

  // Send næste spørgsmål
  const question = QUESTIONS[state.step as number];

  const response = {
    reply: question,
    state: {
      step: (state.step as number) + 1,
      answers: state.answers,
    },
    done: false,
  };

  return NextResponse.json(response);
}
