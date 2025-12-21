"use client";

import { useState } from "react";
import { QUESTIONS } from "../atonm/questions";

type AnswerKey = "Q1" | "Q2" | "Q3" | "Q4" | "Q5" | "Q6";

type ATONMState = {
  index: number;
  answers: Partial<Record<AnswerKey, number>>;
  done: boolean;
};

type ApiResponse = {
  state?: ATONMState;
  remainingCount?: number;
  done?: boolean;
  result?: any;
  handoffContext?: any;
};

export default function ATONMDebug() {
  const [state, setState] = useState<ATONMState | null>(null);
  const [remainingCount, setRemainingCount] = useState<number | null>(null);
  const [finalResult, setFinalResult] = useState<any>(null);
  const [handoffContext, setHandoffContext] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function send(event: any) {
    setLoading(true);

    const res = await fetch("/api/atonm-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        state,
        event,
      }),
    });

    const data: ApiResponse = await res.json();
    setLoading(false);

    if (data.done) {
      setFinalResult(data.result);
      setHandoffContext(data.handoffContext);
      setState(null);
      return;
    }

    if (data.state) setState(data.state);
    if (typeof data.remainingCount === "number") {
      setRemainingCount(data.remainingCount);
    }
  }

  function reset() {
    setState(null);
    setRemainingCount(null);
    setFinalResult(null);
    setHandoffContext(null);
  }

  /* ---------------- RENDER ---------------- */

  return (
    <div style={{ marginTop: 24 }}>
      <h2>ATONM Debug UI</h2>

      <button onClick={reset}>Reset</button>{" "}
      <button onClick={() => send({ type: "START" })}>Start</button>

      {loading && <p>Loading…</p>}

      {/* STATE */}
      <pre style={{ background: "#f6f6f6", padding: 12, marginTop: 16 }}>
        <strong>STATE</strong>
        {"\n"}
        {JSON.stringify(state, null, 2)}
        {"\n\n"}
        <strong>Remaining</strong>: {remainingCount}
      </pre>

      {/* QUESTION */}
      {state && !state.done && (
        <div style={{ marginTop: 16 }}>
          <h3>
            {QUESTIONS[state.index]?.id}: {QUESTIONS[state.index]?.text}
          </h3>

          {QUESTIONS[state.index]?.options.map((opt, i) => (
            <button
              key={i}
              style={{ display: "block", marginBottom: 4 }}
              onClick={() => send({ type: "ANSWER", value: i })}
            >
              [{i}] {opt}
            </button>
          ))}
        </div>
      )}

      {/* FINAL */}
      {finalResult && (
        <div style={{ marginTop: 24 }}>
          <h3>FINAL RESULT</h3>
          <pre style={{ background: "#f0f0f0", padding: 12 }}>
            {JSON.stringify(finalResult, null, 2)}
          </pre>
        </div>
      )}

      {/* HANDOFF */}
      {handoffContext && (
        <div style={{ marginTop: 24 }}>
          <h3>HANDOFF CONTEXT</h3>
          <pre style={{ background: "#f0f0f0", padding: 12 }}>
            {JSON.stringify(handoffContext, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
