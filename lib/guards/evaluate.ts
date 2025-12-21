// File: lib/atonm/guards/evaluate.ts
// Minimal guard evaluation – v1.1 (tone support)

import { SafetyGate } from "../safety/SafetyGate";

export type GuardType =
  | "crisis"
  | "do_not"
  | "terminate"
  | "humor"
  | null;

export function evaluateGuards(input: string): GuardType {
  // --- ATONM v3.5 ---
  // SafetyGate is called, but result is intentionally ignored in Trin 2.
  // This guarantees zero behavior change while wiring is validated.
  SafetyGate.classify(input);
  // --- end v3.5 wiring ---

  const t = input.toLowerCase();

  // Krise
  if (
    t.includes("selvmord") ||
    t.includes("vil dø") ||
    t.includes("kan ikke leve")
  ) return "crisis";

  // Humor / test
  if (
    t.includes("lol") ||
    t.includes("haha") ||
    t.includes("bare for sjov") ||
    t.includes("test") ||
    t.includes("😉") ||
    t.includes("😂")
  ) return "humor";

  // Do-not
  if (
    t.includes("porno") ||
    t.includes("sex") ||
    t.includes("ulovlig") ||
    t.includes("narko") ||
    t.includes("våben")
  ) return "do_not";

  // Terminate
  if (
    t.includes("religion") ||
    t.includes("politik") ||
    t.includes("lgbt") ||
    t.includes("anbefal") ||
    t.includes("hvem er den bedste")
  ) return "terminate";

  return null;
}
