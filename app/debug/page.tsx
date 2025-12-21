// app/debug/page.tsx
// Status: Intern debug-side · udvidet observability

"use client"

import { useState } from "react"
import StatePanel from "./components/StatePanel"
import type { ATONMState } from "../../lib/state"

export default function DebugPage() {
  const [state, setState] = useState<ATONMState | null>(null)

  async function startATONM() {
    const res = await fetch("/api/atonm-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: { type: "START" } }),
    })

    const data = await res.json()

    setState({
      phase: "atonm",
      intakeText: data.intakeText,
      answers: data.state?.answers,
      remainingTreatments: data.handoffContext?.remainingTreatments,
      profile: data.profile,
      locked: false,
    })
  }

  return (
    <main style={{ padding: "24px", fontFamily: "system-ui, sans-serif" }}>
      <h1>ATONM Debug</h1>

      <button onClick={startATONM}>Start ATONM (debug)</button>

      <h3 style={{ marginTop: "24px" }}>State snapshot</h3>
      <StatePanel state={state} />
    </main>
  )
}
