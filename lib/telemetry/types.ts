// lib/telemetry/types.ts
// Telemetry v1 – types only (no side effects)

export type TelemetryEventName =
  | "flow_started"
  | "atonm_completed"
  | "validation_adjusted"
  | "handoff_started"
  | "guard_triggered";

export type TelemetryContext = {
  version: string;          // e.g. "3.4"
  source: "public" | "debug";
};

export type TelemetryEvent<T = unknown> = {
  name: TelemetryEventName;
  timestamp: number;
  context: TelemetryContext;
  payload?: T;              // NEVER free text
};
