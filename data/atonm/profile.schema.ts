// data/atonm/profile.schema.ts
// Status: Normativ · låst
// Ren type-definition for hypotetisk brugerprofil (ingen runtime-logik)

export type HypotheticalUserProfile = {
  experienceOrientation: "body" | "mind" | "mixed" | "unclear"
  situationPattern: "situational" | "recurring" | "long_term"
  participationPreference: "passive" | "active" | "mixed"
  guidancePreference: "guided" | "shared" | "self_directed"
  abstractionTolerance: "low" | "medium" | "high"
}
