import fs from "fs";
import path from "path";
import YAML from "yaml";

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
  const filePath = path.join(
    process.cwd(),
    "app",
    "api",
    "atonm-data",
    "treatments.yaml"
  );

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = YAML.parse(raw);

  if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null) {
    throw new Error("Expected treatments.yaml to be an object map");
  }

  return Object.entries(parsed).map(([id, value]) => ({
    id,
    ...(value as Omit<Treatment, "id">),
  }));
}
