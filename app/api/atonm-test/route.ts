import { NextResponse } from "next/server";
import { loadTreatments, Treatment } from "./loadTreatments";

/**
 * ATONM – minimal test runtime (v1)
 * Structured orientation and narrowing.
 * Non-diagnostic, non-advisory.
 */

type Step = 1 | 2 | 3 | 4 | 5 | 6 | "done";

interface ATONMState {
  step: Step;
  answers: Record<string, string>;
}

const QUESTIONS: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
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

function narrow(
  treatments: Treatment[],
  answers: Record<string, string>
): Treatment[] {
  let result = [...treatments];

  if (answers.Q1 === "A") {
    result = result.filter((t) => t.category === "body_regulation");
  }
  if (answers.Q1 === "B") {
    result = result.filter((t) => t.category === "psyche_consciousness");
  }

  if (answers.Q3 === "A") {
    result = result.filter((t) => t.focus_profile.body >= 3);
  }
  if (answers.Q3 === "B") {
    result = result.filter((t) => t.focus_profile.mind >= 3);
  }

  if (answers.Q6 === "A" || answers.Q6 === "C") {
    result = result.filter((t) => t.cost_level !== "high");
  }

  return result.slice(0, 3);
}

export async function POST(req: Request) {
  const body = await req.json();

  const state: ATONMState = body.state ?? {
    step: 1,
    answers: {},
  };

  const rawInput: string | undefined = body.message;

  const input =
    typeof rawInput === "string"
      ? rawInput.trim().toUpperCase().charAt(0)
      : undefined;

  const isValidAnswer = input && ["A", "B", "C", "D"].includes(input);

  // Start ATONM (ingen input endnu)
  if (!rawInput && state.step === 1) {
    return NextResponse.json({
      reply: QUESTIONS[1],
      state,
      done: false,
    });
  }

  // Allerede afsluttet
  if (state.step === "done") {
    return NextResponse.json({
      reply:
        "ATONM er afsluttet.\n\n" +
        "Dette var en struktureret orienteringstest.\n" +
        "Ingen anbefaling er givet.",
      done: true,
    });
  }

  // Ugyldigt input → hjælpetekst
  if (rawInput && !isValidAnswer) {
    return NextResponse.json({
      reply:
        "Jeg kan kun bruge svar A, B, C eller D her.\n" +
        "Skriv blot bogstavet, der passer bedst.",
      state,
      done: false,
    });
  }

  // 🔑 Q1 besvaret korrekt → gå direkte til Q2
  if (state.step === 1 && isValidAnswer) {
    state.answers["Q1"] = input!;
    state.step = 2;

    return NextResponse.json({
      reply: QUESTIONS[2],
      state,
      done: false,
    });
  }

  // Gem svar på Q2–Q5
  if (
    isValidAnswer &&
    typeof state.step === "number" &&
    state.step > 1 &&
    state.step < 6
  ) {
    state.answers[`Q${state.step}`] = input!;
    state.step = (state.step + 1) as Step;

    return NextResponse.json({
      reply: QUESTIONS[state.step],
      state,
      done: false,
    });
  }

  // Q6 → afslut
  if (state.step === 6 && isValidAnswer) {
    state.answers["Q6"] = input!;

    const treatments = loadTreatments();
    const narrowed = narrow(treatments, state.answers);

    return NextResponse.json({
      reply:
        "ATONM – orientering afsluttet.\n\n" +
        "Mulige retninger (test):\n" +
        narrowed.map((t) => `- ${t.id}`).join("\n") +
        "\n\nDette er ikke en anbefaling.",
      done: true,
    });
  }

  // Fallback (burde ikke rammes)
  return NextResponse.json({
    reply: QUESTIONS[state.step],
    state,
    done: false,
  });
}
