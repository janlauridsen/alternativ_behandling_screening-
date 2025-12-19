"use client";

import { useState } from "react";
import { QUESTIONS } from "../atonm/questions";

export default function ATONMTester() {
  const [state, setState] = useState<any>(null);
  const [result, setResult] = useState<string[] | null>(null);

  async function send(event: any) {
    const res = await fetch("/api/atonm-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, event }),
    });
    const data = await res.json();
    setState(data.state);
    setResult(data.result ?? null);
  }

  if (!state) {
    return <button onClick={() => send({ type: "START" })}>Start ATONM</button>;
  }

  if (result) {
    return (
      <pre>
        Mulige retninger:
        {result.map(r => `\n- ${r}`)}
      </pre>
    );
  }

  const q = QUESTIONS[state.index];

  return (
    <div>
      <h3>{q.text}</h3>
      {q.options.map((o, i) => (
        <button key={i} onClick={() => send({ type: "ANSWER", value: i })}>
          {o}
        </button>
      ))}
    </div>
  );
}
