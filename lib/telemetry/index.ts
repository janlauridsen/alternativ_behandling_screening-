// lib/telemetry/index.ts

import type { TelemetryEvent } from "./types";
import { sendTelemetry as noop } from "./noop";
import { sink } from "./sink";

const ENABLED = process.env.NEXT_PUBLIC_TELEMETRY_ENABLED === "true";

export function track(event: TelemetryEvent): void {
  if (!ENABLED) return;
  sink(event);
  noop(event);
}
