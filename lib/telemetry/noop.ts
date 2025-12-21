// lib/telemetry/noop.ts
// No-op sink – safe default

import type { TelemetryEvent } from "./types";

export function sendTelemetry(_event: TelemetryEvent): void {
  // intentionally empty
}
