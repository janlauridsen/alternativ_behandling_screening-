// lib/guards/evaluate.ts
// Minimal guard evaluation – v1

export type GuardType = "crisis" | "do_not" | "terminate" | null;

export function evaluateGuards(input: string): GuardType {
  const t = input.toLowerCase();

  if (
    t.includes("selvmord") ||
    t.includes("vil dø") ||
    t.includes("kan ikke leve")
  ) return "crisis";

  if (
    t.includes("porno") ||
    t.includes("sex") ||
    t.includes("ulovlig") ||
    t.includes("narko") ||
    t.includes("våben")
  ) return "do_not";

  if (
    t.includes("religion") ||
    t.includes("politik") ||
    t.includes("lgbt") ||
    t.includes("anbefal") ||
    t.includes("hvem er den bedste")
  ) return "terminate";

  return null;
}
