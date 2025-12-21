// app/components/ATONMDebug.tsx

"use client";

import { useState } from "react";
import { QUESTIONS } from "../atonm/questions";

type AnswerKey = "Q1" | "Q2" | "Q3" | "Q4" | "Q5" | "Q6";

type ATONMState = {
  index: number;
  answers: Partial<Record<AnswerKey, number>>;
  done: boolean;
};

export default function ATONMDebug() {
  const [intakeText, setIntakeText] = useState("");
  const [state, setState] = useState<ATONMState | null>(null);
  const [remainingCount, setRemainingCount] = useState<number | null>(null);
  const [profileText, setProfileText] = useState<string[] | null>(null);
  const [methods, setMethods] = useState<any[] | null>(null);
  const [handoffContext, setHandoffContext] = useState<any>(null);

  async function send(event: any) {
    const res = await fetch("/api/atonm-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, event, intakeText }),
    });

    const data = await res.json();

    if (data.done) {
      setProfileText(data.profileText);
      setMethods(data.methods);
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
    setIntakeText("");
    setState(null);
    setRemainingCount(null);
    setProfileText(null);
    setMethods(null);
    setHandoffContext(null);
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h3>ATONM Debug UI</h3>

      {!state && !profileText && (
        <div>
          <p>
            Før vi starter, kan du – hvis du vil – kort beskrive, hvad der fylder
            mest for dig lige nu.
          </p>
          <textarea
            rows={3}
            value={intakeText}
            onChange={(e) => setIntakeText(e.target.value)}
            placeholder="Skriv frit her (valgfrit)"
            style={{ width: "100%", marginBottom: 8 }}
          />
        </div>
      )}

      <button onClick={reset}>Reset</button>{" "}
      <button onClick={() => send({ type: "START" })}>Start</button>

      <pre style={{ background: "#f6f6f6", padding: 12, marginTop: 16 }}>
        <strong>STATE</strong>
        {"\n"}
        {JSON.stringify(state, null, 2)}
        {"\n\n"}
        <strong>Remaining</strong>: {remainingCount}
      </pre>

      {state && (
        <div>
          <h4>
            {QUESTIONS[state.index].id}: {QUESTIONS[state.index].text}
          </h4>
          {QUESTIONS[state.index].options.map((opt, i) => (
            <button key={i} onClick={() => send({ type: "ANSWER", value: i })}>
              [{i}] {opt}
            </button>
          ))}
        </div>
      )}

      {profileText && (
        <div style={{ marginTop: 24 }}>
          <h4>PROFILE</h4>
          {profileText.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      )}

      {methods && (
        <div style={{ marginTop: 24 }}>
          <h4>METHODS</h4>
          {methods.map((m) => (
            <div key={m.id} style={{ marginBottom: 16 }}>
              <strong>{m.id}</strong>
              <pre>{m.text}</pre>
            </div>
          ))}
        </div>
      )}

      {handoffContext && (
        <pre style={{ background: "#f0f0f0", padding: 12 }}>
          {JSON.stringify(handoffContext, null, 2)}
        </pre>
      )}
    </div>
  );
}
