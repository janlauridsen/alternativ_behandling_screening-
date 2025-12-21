// lib/flow/validation-contract.ts
// Status: Valideringskontrakt · ingen runtime-logik

export type ValidationDecision =
  | "confirm"
  | "adjust_preference"
  | "restart"

export type ValidationInput = {
  decision: ValidationDecision

  /**
   * Fri tekst. Bruges kun som præmis for LLM.
   * Må ikke trigge gen-narrowing eller profil-ændring.
   */
  userNote?: string
}

export type ValidationOutcome = {
  proceed: boolean
  restart: boolean

  /**
   * Præmis til LLM (hvis proceed === true)
   */
  llmPremise?: {
    userNote?: string
  }
}
