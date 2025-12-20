"use client";

import { useState } from "react";
import { QUESTIONS } from "../atonm/questions";
import TestBox from "./TestBox";

type ATONMState = {
  index: number;
  answers: Record<string, number>;
  done: boolean;
};

type Phase = "intake" | "atonm" | "finished" | "handoff";

export default function ATONMTester() {
  const [phase, setPhase] = useState<Phase>("intake");
  const [intakeText, setIntakeText] = useState("");

  const [state, setState] = useState<ATONMState | null>(null);
  const [remainingCount, setRemainingCount] = useState<number | null>(null);

  const [result, setResult] = useState<
    { id: string; text: string }[] | null
  >(null);

  const [handoffContext, setHandoffContext] = useState<any>(null);
  const [handoffReply, setHandoffReply] = useState<string | null>(null);

  function decideStartIndex(text: string): number {
    const t = text.toLowerCase();
    if (t.includes("fly") || t.includes("eksamen") || t.includes("præsentation")) {
      return 2; // Q3
    }
    return 0; // Q1
  }

  function resetAll() {
    setPhase("intake");
    setIntakeText("");
    setState(null);
    setRemainingCount(null);
    setResult(null);
    setHandoffContext(null);
    setHandoffReply(null);
  }

  async function send(event: any) {
    const res = await fetch("/api/atonm-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, event, intakeText }),
    });

    const data = await res.json();

    if (data.done) {
      setResult(data.result ?? []);
      setHandoffContext(data.handoffContext);
      setPhase("finished");
      return;
    }

    if (data.state) setState(data.state);
    if (typeof data.remainingCount === "number") {
      setRemainingCount(data.remainingCount);
    }
  }

  async function startHandoff() {
    setPhase("handoff");

    const res = await fetch("/api/handoff-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handoffContext }),
    });

    const data = await res.json();
    setHandoffReply(data.reply);
  }

  const RestartButton = (
    <button onClick={resetAll} style={{ marginBottom: "16px" }}>
      🔁 Start ATONM forfra
    </button>
  );

  /* ---------------- OPEN INTAKE ---------------- */

  if (phase === "intake") {
    return (
      <div>
        {RestartButton}

        <p>
          Hvis du vil, kan du kort beskrive, hvad der fylder mest for dig lige nu.
          Det bruges kun til at afgøre, hvilket afklarende spørgsmål vi starter med.
        </p>

        <textarea
          rows={3}
          value={intakeText}
          onChange={(e) => setIntakeText(e.target.value)}
          style={{ width: "100%", marginBottom: "12px" }}
        />

        <button
          onClick={() => {
            const startIndex = decideStartIndex(intakeText);
            setState({ index: startIndex, answers: {}, done: false });
            setPhase("atonm");
          }}
        >
          Fortsæt
        </button>
      </div>
    );
  }

  /* ---------------- ATONM FLOW ---------------- */

  if (phase === "atonm" && state) {
    const q = QUESTIONS[state.index];

    return (
      <div>
        {RestartButton}

        <h3>{q.text}</h3>

        {remainingCount !== null && (
          <p style={{ opacity: 0.7 }}>
            Mulige behandlingsformer tilbage: {remainingCount}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {q.options.map((o, i) => (
            <button key={i} onClick={() => send({ type: "ANSWER", value: i })}>
              {o}
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- ATONM SLUT ---------------- */

  if (phase === "finished" && result) {
    return (
      <div>
        {RestartButton}

        <h3>Overblik over mulige retninger</h3>

        <ul>
          {result.map((r) => (
            <li key={r.id} style={{ marginBottom: "16px" }}>
              <strong>{r.id}</strong>
              <div style={{ whiteSpace: "pre-line" }}>{r.text}</div>
            </li>
          ))}
        </ul>

        <p>
          <em>Dette er ikke en anbefaling.</em>
        </p>

        <button onClick={startHandoff}>Jeg vil gerne vide mere</button>
      </div>
    );
  }

  /* ---------------- HANDOFF → FRI SAMTALE ---------------- */

  if (phase === "handoff") {
    return (
      <div>
        {RestartButton}

        {handoffReply ? (
          <>
            <div style={{ whiteSpace: "pre-line", marginBottom: "16px" }}>
              {handoffReply}
            </div>

            <TestBox
              endpoint="/api/prompt-test"
              initialSystemContext={{
                source: "ATONM",
                handoffContext,
              }}
            />
          </>
        ) : (
          <p>Indlæser …</p>
        )}
      </div>
    );
  }

  return null;
}
