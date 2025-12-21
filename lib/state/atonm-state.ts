// lib/state/atonm-state.ts
// Status: Global state-kontrakt · types only

import type { HypotheticalUserProfile } from "../atonm/profile.schema"

export type ATONMPhase =
  | "idle"
  | "intake"
  | "atonm"
  | "validation"
  | "handoff"
  | "conversation"
  | "terminated"

export type ATONMState = {
  phase: ATONMPhase

  // Intake
  intakeText?: string

  // ATONM
  answers?: Record<string, string>
  remainingTreatments?: string[]

  // Derived
  profile?: HypotheticalUserProfile

  // Control flags
  locked?: boolean
  outOfScope?: boolean
  terminatedReason?: string
}

