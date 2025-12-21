// app/api/atonm-test/loadTreatments.ts
// Loader Type A-metodedata (YAML) til runtime

import fs from "fs";
import path from "path";
import YAML from "yaml";
import type { Treatment } from "../../../lib/atonm/types";

export function loadTreatments(): Treatment[] {
  const filePath = path.join(
    process.cwd(),
    "app/api/atonm-data/type-a-methods.yaml"
  );

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = YAML.parse(raw);

  return Object.entries(parsed).map(([id, data]) => ({
    id,
    ...(data as Omit<Treatment, "id">),
  }));
}
