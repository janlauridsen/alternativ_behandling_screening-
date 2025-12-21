// app/atonm/types.ts
// ATONM v3.1 – Type A (metodeprofil)

export type Treatment = {
  id: string;
  experienceOrientation: "body" | "mind" | "mixed" | "abstract";
  interactionForm: "passive" | "active" | "mixed" | "dialog";
  guidanceLevel: "practitioner_led" | "shared" | "self_directed";
  abstractionLevel: "concrete" | "mixed" | "interpretive";
  structuringDegree: "fixed" | "semi_structured" | "open";
  practitionerDependency: "low" | "medium" | "high";
  temporalStructure: "bounded" | "recurring" | "ongoing";
  physicalContact: "none" | "light" | "direct";
};
