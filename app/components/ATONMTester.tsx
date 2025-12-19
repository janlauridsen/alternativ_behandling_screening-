"use client";

import { useState } from "react";
import { QUESTIONS } from "../atonm/questions";

type ATONMState = {
  index: number;
  answers: Record<string, number>;
  done: boolean;
};

export default function ATONMTester() {
  const [state, setState] = useState<ATONMState | null>(null);
  const [result, setResult] = useState<string[] | null>(null);
  const [finished, setFinished] = useState(false);

  async function send(event: any) {
    // 🔒 Hvis færdig → gør intet
    if (finished) return;

    const res = await fetch("/api/atonm-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, event }),
    });

    const data = await res.json();

    if (data.done) {
      setResult(data.result ?? []);
      setFinished(true);
      return;
    }

    setState(data.state);
  }

  // Startskærm
  if (!state && !finished) {
    return (
      <button onClick={() => send({ type: "START" })}>
        Start ATONM
      </button>
    );
  }

  // Afsluttet
  if (finished) {
    return (
      <div>
        <h3>ATONM afsluttet</h3>
        <p>Mulige retninger (test):</p>
        <ul>
          {result?.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p>
          <em>Dette er ikke en anbefaling.</em>
        </p>
      </div>
    );
  }

  // Aktivt spørgsmål
  const q = QUESTIONS[state!.index];

  return (
    <div>
      <h3>{q.text}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => send({ type: "ANSWER", value: i })}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
