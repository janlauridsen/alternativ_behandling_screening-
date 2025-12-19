ATONM – Alternative Treatment Orientation & Narrowing Model

Prototype v1.0

Status: Design-låst prototype
Scope: Ikke-diagnostisk, ikke-rådgivende orientering
Målgruppe: Brugere, der søger overblik over alternative behandlingsformer
Kontekst: Danmark / vestlig alternativ praksis
Sikkerhedsniveau: Høj (non-medical, non-therapeutic)

1. Formål

ATONM er en orienterings- og indsnævringsmodel, der hjælper brugere med at:

reducere et stort og uoverskueligt felt af alternative behandlingsformer

undgå tilfældige, dyre eller udmattende valg

opnå et mere reflekteret overblik

ATONM:

vælger ikke

anbefaler ikke

lover ikke effekt

erstatter ikke sundhedsfaglig hjælp

Modellen er orienterende, ikke behandlende.

2. Grundprincipper (ikke-forhandlingsbare)

ATONM opererer altid under følgende principper:

ingen diagnose

ingen medicinsk rådgivning

ingen behandlingsanbefaling

ingen effekt- eller resultatløfter

ingen udelukkelse af konventionel behandling

fuld brugerautonomi

ATONM reducerer tilfældighed, ikke ansvar.

3. Relation til eksisterende system

ATONM er ikke et selvstændigt system.

Den:

aktiveres kun efter eksplicit brugeraccept

opererer midlertidigt

returnerer derefter kontrollen til det primære orienteringssystem

Det eksisterende system:

ejer tone, etik, grænser og krisehåndtering

ATONM ejer kun sorteringslogik

4. Aktivering (etisk nøglepunkt)

ATONM må kun aktiveres, hvis brugeren eksplicit accepterer en formulering svarende til:

“Hvis du vil, kan vi prøve at skabe lidt mere overblik ved at indsnævre mulighederne.
Det er ikke en anbefaling – kun en måde at reducere tilfældighed.”

Afviser brugeren, fortsætter samtalen uden ATONM.

5. Prototype-spørgesæt (Q1–Q6)

ATONM stiller maksimalt 6 spørgsmål.
Ingen fritekst anvendes i narrowing-logikken.

Q1 – Oplevet problemkarakter

Spørgsmål
Hvordan oplever du det, du står i, overordnet?

A. Det føles mest kropsligt
B. Det føles mest mentalt eller følelsesmæssigt
C. Det er en blanding af begge
D. Det er svært at afgrænse

Mapping

problem_experience:
  A: primarily_physical
  B: primarily_mental_emotional
  C: mixed
  D: diffuse_unclear

Q2 – Tidsmæssigt mønster

Spørgsmål
Hvordan oplever du forløbet af det, du står i?

A. Knytter sig mest til en konkret situation
B. Føles mere generelt
C. Vender tilbage igen og igen
D. Har stået på i lang tid

Mapping

problem_pattern:
  A: situational
  B: general
  C: recurring
  D: long_term

Q3 – Foretrukken arbejdsform

Spørgsmål
Når du forestiller dig at opsøge en alternativ tilgang, hvad føles mest naturligt?

A. Noget, der primært arbejder gennem kroppen
B. Noget med samtale og refleksion
C. Noget mere åbent og helhedsorienteret
D. Ingen klar præference

Mapping

preferences:
  A: { body_focus: high }
  B: { talk_focus: high }
  C: { spiritual_focus: high }
  D: { body_focus: medium, talk_focus: medium, spiritual_focus: medium }

Q4 – Engagementsstil

Spørgsmål
Når du forestiller dig et forløb, hvad passer dig bedst?

A. Jeg er selv ret aktiv
B. En balance
C. Jeg bliver primært guidet
D. Ingen klar præference

Mapping

engagement_style:
  A: { self_active: high, practitioner_led: low }
  B: { self_active: medium, practitioner_led: medium }
  C: { self_active: low, practitioner_led: high }
  D: { self_active: medium, practitioner_led: medium }

Q5 – Forhold til forklaringsrammer

Spørgsmål
Hvor vigtigt er det for dig, at der findes en tydelig forklaringsramme?

A. Meget vigtigt
B. Rart, men ikke afgørende
C. Ikke så vigtigt
D. Åben for forskellige forklaringsformer

Mapping

evidence_orientation:
  A: high
  B: medium
  C: low
  D: experiential

Q6 – Praktiske begrænsninger

Spørgsmål
Er der noget, der begrænser dig mest lige nu?

A. Økonomi
B. Tid
C. Begge dele
D. Ikke umiddelbart

Mapping

constraints:
  A: { budget_sensitivity: high }
  B: { time_commitment: high }
  C: { budget_sensitivity: high, time_commitment: high }
  D: { budget_sensitivity: low, time_commitment: low }

6. Narrowing-logik (prototype)
Overordnet regel

Start med alle tilladte metoder (v1-listen)

Anvend boosts og deprioriteringer

Udvælg 2–3 metoder

Stop

Ingen iteration. Ingen feedback-loop.

Fase 1 – Kategoriboost

primarily_physical → body-regulation

primarily_mental_emotional → psyche/consciousness

mixed → begge

diffuse_unclear → tillad holistiske

Fase 2 – Præference & engagement

høj body_focus → kropslige prioriteres

høj talk_focus → dialogbaserede prioriteres

høj practitioner_led → selvstyrede deprioriteres

høj self_active → stærkt practitioner-led deprioriteres

Fase 3 – Evidenskomfort

evidence high → stærkt abstrakte metoder deprioriteres

medium → ingen ændring

experiential → alle tilladt

Fase 4 – Praktiske begrænsninger

høj budget → høj-omkostningsforløb deprioriteres

høj tid → langvarige processer deprioriteres

7. Output-kontrakt (låst)
output:
  treatments:
    - id: <treatment_id>
      reasons:
        - preference_match
        - engagement_match
        - situational_alignment


Regler

2–3 metoder max

ingen rangordning

ingen anbefaling

reasons er tags, ikke argumenter

8. Stop-regler

ATONM må ikke aktiveres eller fortsætte hvis:

brugeren udtrykker akut krise

der efterspørges diagnose eller behandling

der søges garanti eller effekt

der udtrykkes desperation (“sidste chance”)

I disse tilfælde overtager det primære orienteringssystem.

9. Afslutning og tilbagelevering

Efter narrowing:

ATONM træder tilbage

videre dialog styres af det primære system

brugeren kan fordybe sig i én metode ad gangen

ingen sammenligning eller rangordning

10. Status

Denne prototype:

reducerer tilfældighed

beskytter brugerens ressourcer

respekterer autonomi

kan forklares juridisk

kan implementeres teknisk

kan udvides med metadata senere

ATONM v1.0 er design-låst.
