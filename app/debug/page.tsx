// app/debug/page.tsx
// Debug entry – gated (v3.4)
// Status: intern · adgang styret via env-flag · telemetry ved afvisning

"use client";

import ATONMDebug from "./components/ATONMDebug";
import { isDebugEnabled } from "../../lib/debug/gate";
import { track } from "../../lib/telemetry";

export default function DebugPage() {
  if (!isDebugEnabled()) {
    // Telemetry: debug access blocked
    track({
      name: "guard_triggered",
      timestamp: Date.now(),
      context: {
        version: "3.4",
        source: "debug",
      },
      payload: {
        guard: "terminate",
      },
    });

    return (
      <main
        style={{
          padding: 32,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1>Not available</h1>
        <p>This interface is not enabled.</p>
      </main>
    );
  }

  return <ATONMDebug />;
}
