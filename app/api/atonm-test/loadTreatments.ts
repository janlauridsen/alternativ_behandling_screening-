import YAML from "yaml";

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

// treatmentsRaw skal være en YAML-string (importeret eller defineret)
import treatmentsRaw from "./treatments.yaml";

export function loadTreatments(): Treatment[] {
  const parsed = YAML.parse(treatmentsRaw);

  if (!Array.isArray(parsed)) {
    throw new Error("Expected treatments YAML to be an array");
  }

  return parsed as Treatment[];
}
