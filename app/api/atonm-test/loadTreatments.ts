// app/api/atonm-data/loadTreatments.ts

import YAML from "yaml";
import type { Treatment } from "../../atonm/types";


// Type A v3.1 – runtime shape
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

export function loadTreatments(): Treatment[] {
  return YAML.parse(treatmentsRaw as string);
}
