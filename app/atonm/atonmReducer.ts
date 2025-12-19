import { QUESTIONS } from "./questions";

export type ATONMState = {
  index: number;
  answers: Record<string, number>;
  done: boolean;
};

export type ATONMEvent =
  | { type: "START" }
  | { type: "ANSWER"; value: number };

export function atonmReducer(
  state: ATONMState,
  event: ATONMEvent
): ATONMState {
  if (state.done) return state;

  if (event.type === "START") {
    return { index: 0, answers: {}, done: false };
  }

  if (event.type === "ANSWER") {
    const q = QUESTIONS[state.index];
    const nextAnswers = { ...state.answers, [q.id]: event.value };

    if (state.index === QUESTIONS.length - 1) {
      return { index: state.index, answers: nextAnswers, done: true };
    }

    return {
      index: state.index + 1,
      answers: nextAnswers,
      done: false,
    };
  }

  return state;
}
