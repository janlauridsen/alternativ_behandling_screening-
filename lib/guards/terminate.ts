// lib/guards/terminate.ts
// Status: Central termination · hard stop

export type TerminationReason =
  | "repeated_out_of_scope"
  | "policy_violation"
  | "crisis_escalation"
  | "system_safety"
  | "unknown"

export type TerminationResult = {
  terminated: true
  reason: TerminationReason
  reply: string
}

const TERMINATION_REPLY =
  "Samtalen kan ikke fortsættes her."

export function terminate(
  reason: TerminationReason = "unknown"
): TerminationResult {
  return {
    terminated: true,
    reason,
    reply: TERMINATION_REPLY,
  }
}
