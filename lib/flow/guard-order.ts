// lib/flow/guard-order.ts
// Status: Normativ rækkefølge · dokumenteret autoritet

export const GUARD_ORDER = [
  "crisis",
  "do_not",
  "terminate",
  "llm_handoff",
] as const

export type GuardStage = typeof GUARD_ORDER[number]
