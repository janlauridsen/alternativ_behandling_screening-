// File: lib/atonm/safety/SafetyGate.ts
// ATONM v3.5 – SafetyGate (Trin 5: AI-backed classification)

import { classifyWithAI } from "./aiClassifier";

export type SafetyClassification =
  | "SAFE"
  | "CRISIS"
  | "DESTRUCTIVE"
  | "SEXUAL"
  | "ILLEGAL"
  | "UNKNOWN";

export type SafetyResult = {
  classification: SafetyClassification;
  reason?: string;
};

export class SafetyGate {
  static async classify(input: string): Promise<SafetyResult> {
    if (typeof input !== "string") {
      return { classification: "UNKNOWN", reason: "non-string input" };
    }

    if (input.trim().length === 0) {
      return { classification: "UNKNOWN", reason: "empty input" };
    }

    return classifyWithAI(input);
  }
}
