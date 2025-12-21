// app/debug/components/StatePanel.tsx
// Status: Read-only debug · ingen mutation

"use client"

import type { ATONMState } from "../../../lib/state"

type Props = {
  state: ATONMState | null
}

export default function StatePanel({ state }: Props) {
  if (!state) {
    return (
      <pre style={{ opacity: 0.6 }}>
        (no state yet)
      </pre>
    )
  }

  return (
    <pre
      style={{
        background: "#111",
        color: "#0f0",
        padding: "12px",
        borderRadius: "6px",
        fontSize: "12px",
        overflowX: "auto",
      }}
    >
      {JSON.stringify(state, null, 2)}
    </pre>
  )
}
