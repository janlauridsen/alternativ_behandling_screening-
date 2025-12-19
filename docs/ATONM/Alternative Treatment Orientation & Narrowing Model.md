DOCUMENT

Title: Alternative Treatment Orientation & Narrowing Model (ATONM)
Version: 1.0
Purpose: Non-diagnostic orientation and decision-narrowing for alternative treatment exploration via chatbot
Audience: AI systems / LLM agents
Scope: Denmark / Western alternative treatment context
Safety level: High (non-medical, non-advisory)

1. Core Intent

This model enables a chatbot to:

Help users navigate alternative treatment options

Narrow a large option space to 2–3 relevant modalities

Base narrowing on:

user-reported experience

preferences

constraints

Avoid:

diagnosis

treatment advice

promises of effect

Reduce:

random choice

wasted effort

wasted money

The model is orientational, not therapeutic.

2. Hard Constraints (Non-negotiable)
hard_constraints:
  - no_diagnosis
  - no_medical_advice
  - no_treatment_recommendation
  - no_effect_promises
  - no_outcome_prediction
  - no_exclusion_of_conventional_care
  - user_autonomy_preserved


All chatbot outputs must remain within navigation and clarification.

3. Domain Ontology (Entities)
3.1 Treatment Categories
treatment_categories:
  body_regulation:
    description: "Primarily physical or nervous-system oriented methods"
  psyche_consciousness:
    description: "Primarily cognitive, emotional or awareness-based methods"
  energy_holistic:
    description: "Holistic, energetic, interpretive or spiritual methods"
  lifestyle:
    description: "Behavioral, nutritional or habit-based approaches"

3.2 Treatment Modalities (Canonical List)
treatments:
  - acupuncture_classic
  - nada
  - reflexology
  - craniosacral
  - massage
  - osteopathy

  - hypnotherapy
  - mindfulness_guided
  - talk_inspired_methods
  - coaching

  - kinesiology
  - healing
  - reiki
  - chakra_balancing
  - clairvoyance_guidance

  - nutrition_guidance
  - supplements
  - detox
  - breathwork


Each treatment must be associated with:

exactly one category

metadata (see section 5)

4. User Model (Session-based, Non-clinical)
user_profile:
  problem_experience:
    enum:
      - primarily_physical
      - primarily_mental_emotional
      - mixed
      - diffuse_unclear

  problem_pattern:
    enum:
      - situational
      - general
      - recurring
      - long_term

  intensity:
    enum:
      - mild
      - moderate
      - significant

  preferences:
    body_focus: [low, medium, high]
    talk_focus: [low, medium, high]
    spiritual_focus: [low, medium, high]
    evidence_orientation: [low, medium, high]

  engagement_style:
    self_active: [low, medium, high]
    practitioner_led: [low, medium, high]

  constraints:
    budget_sensitivity: [low, medium, high]
    time_commitment: [low, medium, high]
    skepticism_level: [low, medium, high]


All values are self-reported, subjective, non-diagnostic.

5. Treatment Metadata (AI-operational)

Each treatment modality has the following machine-usable metadata:

treatment_metadata:
  focus_profile:
    body: 0-4
    mind: 0-4
    energy_spiritual: 0-4
    lifestyle_behavior: 0-4

  interaction_style:
    passive: 0-4
    active: 0-4
    dialog_based: 0-4

  abstraction_level:
    concrete: 0-4
    interpretive: 0-4

  practitioner_dependency: [low, medium, high]

  typical_use_case:
    enum:
      - situational
      - general_support
      - exploratory
      - existential

  evidence_orientation:
    enum:
      - high
      - medium
      - low
      - experiential

  cost_level: [low, medium, high]

6. Questioning Strategy (Critical)
6.1 Allowed Question Types
question_types:
  - orientation
  - preference_clarification
  - exclusion
  - narrowing
  - confirmation

6.2 Disallowed Question Types
disallowed_questions:
  - diagnostic
  - symptom_checklist
  - medical_history
  - treatment_outcome
  - success_probability

6.3 Question Design Rules

Each question must:

reduce the search space

map directly to user_profile fields

Questions must be:

neutral

non-leading

non-therapeutic

Typical format:

multiple choice (A/B/C/D)

optional short clarification

7. Narrowing Logic (Decision Engine)
7.1 Phase 1 – Category Weighting
category_boost_rules:
  - if problem_experience == primarily_physical:
      boost: body_regulation
  - if problem_experience == primarily_mental_emotional:
      boost: psyche_consciousness
  - if problem_experience == diffuse_unclear:
      boost: energy_holistic

7.2 Phase 2 – Preference Matching
preference_weights:
  body_focus: high
  talk_focus: medium
  spiritual_focus: medium
  practitioner_led: high


Treatments misaligned with strong preferences are deprioritized.

7.3 Phase 3 – Constraint Filtering
constraint_rules:
  - if skepticism_level == high:
      exclude:
        - clairvoyance_guidance
        - chakra_balancing
  - if time_commitment == low:
      deprioritize:
        - long_process_methods
  - if budget_sensitivity == high:
      deprioritize:
        - high_cost_methods

7.4 Phase 4 – Situational Fit

Situational problems boost:

hypnotherapy

NADA

focused body regulation

General problems boost:

mindfulness

lifestyle methods

8. Output Specification
8.1 Primary Output
final_output:
  treatments:
    - id: <treatment_id>
      reasons:
        - preference_match
        - common_use_case_alignment
        - practitioner_led_match


Limit output to 2–3 treatments max.

8.2 Mandatory Disclaimer (Machine-enforced)
disclaimer:
  text: >
    This overview does not constitute medical advice,
    diagnosis or a recommendation of treatment.
    It is intended solely to support orientation
    and informed exploration.

9. Optional Second Phase (Deepening, Still Non-Therapeutic)

Allowed topics:

session format

practitioner role

typical experience

time structure

Disallowed:

treatment plans

guarantees

effectiveness claims

10. Reference Simulation (Validated Use Case)

Input pattern:
Situational anxiety (fear of flying), practitioner-led, evidence-oriented, cognitive trigger.

Output pattern:

Hypnotherapy (primary orientation)

NADA / body regulation (secondary option)

This simulation has been validated conversationally.

11. Intended Extensions (Non-breaking)
extensions:
  - regional_availability
  - practitioner_credential_level
  - integration_with_RAG
  - multilingual_support

END OF DOCUMENT
