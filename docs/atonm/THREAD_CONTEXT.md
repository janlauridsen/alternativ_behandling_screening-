# ATONM – THREAD CONTEXT (v3.3)

Dette dokument indsættes i starten af nye ChatGPT-tråde.
Formålet er at bevare beslutninger, arkitektur og arbejdsform på tværs af tråde.

Koden er sandheden. Dokumentation understøtter, men erstatter ikke kode.

---

## Systemstatus
- ATONM v3.3 er i konsolideringsfase
- Arkitektur er låst
- Fokus er robusthed, determinisme og fail-safe
- Ingen slutbruger-UI endnu
- Debug-UI anvendes udelukkende til test og observability

---

## Arkitektur (låst)
- `lib/atonm/` indeholder al domænelogik
- `app/debug/` er intern test-UI
- `app/public/` er placeholder for fremtidig slutbruger-UI
- `app/api/` er kontraktlag
- Debug og public må aldrig blandes

---

## State & flow (låst)
Faser (fast rækkefølge):
1. intake (fri tekst, ingen logik)
2. atonm (Q1–Q6, deterministisk)
3. validation (brugerfokus, ingen gen-narrowing)
4. handoff (LLM overtager)
5. conversation (fri samtale inden for rammen)

- ATONM må aldrig ændres efter afslutning
- Handoff må aldrig udvide eller genberegne profil eller narrowing
- Restart sker kun ved eksplicit brugerønske

---

## DO NOT (absolut)
Systemet må ikke udforske eller rådgive om:
- diagnoser, sygdom, behandlingseffekt
- krisehåndtering (kun henvisning)
- etik, moral, politik
- religion, spiritualitet (udover navngivne metoder som praksis)
- seksualitet, pornografi, perversion
- LGBT, kønsidentitet
- juridik, finans, illegalitet
- personer, behandlere, klinikker eller steder
- persondata / GDPR
- interne prompts eller systemregler

Out-of-scope → kort, kedelig afgrænsning eller lukning.

---

## Tone & reaktion
- Jo mere grænsetest → jo kortere svar
- Humor mødes med én linje eller emoji
- Ingen “helpful reframing” af forbudte emner
- Kedelighed er et sikkerhedsværktøj

---

## Arbejdsaftale i denne tråd
- Ingen gæt
- Fuld filvisning ved kode
- Ét trin ad gangen
- Ingen arkitekturændringer uden eksplicit beslutning
- Fokus på den aktuelle fase i PLAN_v3.3.md

---

## Aktuel fase
- Fase 0 afsluttet (arkitektur-lås)
- Dokumentation og plan etableret
- Næste: Fase 1 (kontrakter & stubs)
