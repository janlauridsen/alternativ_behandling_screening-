// lib/debug/gate.ts
// Debug access gate – v1

export function isDebugEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DEBUG_ENABLED === "true";
}
