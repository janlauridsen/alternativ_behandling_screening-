import { QUESTIONS } from "./questions";

export type ATONMState = {
  index: number;
  answers: Record<string, number>;
  done: boolean;
};

export type ATONMEvent =
  | { type: "START" }
  | { type: "ANSWER"; value: number };

const INITIAL_STATE: ATONMState = {
  index: 0,
  answers: {},
  done: false,
};

export function atonmReducer(
  state: ATONMState | null | undefined,
  event: ATONMEvent | null | undefined
): ATONMState {
  const current = state ?? INITIAL_STATE;

  // 🔒 Manglende event → ingen ændring
  if (!event) {
    return current;
  }

  if (current.done) {
    return current;
  }

  if (event.type === "START") {
    return INITIAL_STATE;
  }

  if (event.type === "ANSWER") {
    const q = QUESTIONS[current.index];
    const nextAnswers = { ...current.answers, [q.id]: event.value };

    if (current.index === QUESTIONS.length - 1) {
      return {
        index: current.index,
        answers: nextAnswers,
        done: true,
      };
    }

    return {
      index: current.index + 1,
      answers: nextAnswers,
      done: false,
    };
  }

  return current;
}
