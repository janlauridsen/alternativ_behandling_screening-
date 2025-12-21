// File: lib/atonm/safety/SafetyGate.ts
// ATONM v3.5 – SafetyGate (Trin 4: strict pre-checks, no AI yet)

export type SafetyClassification =
  | "SAFE"
  | "CRISIS"
  | "DESTRUCTIVE"
  | "SEXUAL"
  | "ILLEGAL"
  | "UNKNOWN"

export type SafetyResult = {
  classification: SafetyClassification
  reason?: string // internal only, never exposed, never used for branching
}

export class SafetyGate {
  /**
   * Central safety classifier.
   *
   * Trin 4 behavior:
   * - Non-string → UNKNOWN
   * - Empty / whitespace-only → UNKNOWN
   * - No AI yet (SAFE by default otherwise)
   */
  static classify(input: string): SafetyResult {
    // Non-string input
    if (typeof input !== "string") {
      return {
        classification: "UNKNOWN",
        reason: "non-string input"
      }
    }

    // Empty or whitespace-only input
    if (input.trim().length === 0) {
      return {
        classification: "UNKNOWN",
        reason: "empty or whitespace input"
      }
    }

    // NOTE:
    // AI-based classification will be introduced in Trin 5.
    // Until then, all valid strings are considered SAFE.

    return {
      classification: "SAFE"
    }
  }
}
