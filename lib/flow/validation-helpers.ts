// lib/flow/validation-helpers.ts
// Status: Ren mapping · ingen beslutningslogik

import type {
  ValidationInput,
  ValidationOutcome,
} from "./validation-contract"

export function mapValidationToOutcome(
  input: ValidationInput
): ValidationOutcome {
  if (input.decision === "restart") {
    return {
      proceed: false,
      restart: true,
    }
  }

  if (input.decision === "adjust_preference") {
    return {
      proceed: true,
      restart: false,
      llmPremise: {
        userNote: input.userNote,
      },
    }
  }

  // confirm
  return {
    proceed: true,
    restart: false,
  }
}
