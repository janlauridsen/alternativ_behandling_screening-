// lib/telemetry/index.ts
// Public API with feature-flag

import type { TelemetryEvent } from "./types";
import { sendTelemetry as noop } from "./noop";

const ENABLED = process.env.NEXT_PUBLIC_TELEMETRY_ENABLED === "true";

export function track(event: TelemetryEvent): void {
  if (!ENABLED) {
    return;
  }

  // future: swap sink here
  noop(event);
}
