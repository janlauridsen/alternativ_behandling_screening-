# ATONM v3.3 – Gennemførelsesplan

## Formål
v3.3 er en konsoliderings- og forberedelsesversion.
Ingen ny slutbrugerfunktionalitet introduceres.
Målet er et stabilt, lukket fundament for v3.4+.

Koden er sandheden. Dokumentation understøtter, men erstatter ikke kode.

---

## Overordnet strategi
- Arkitektur låses tidligt
- Arbejde sker faseopdelt
- Hver fase kan afsluttes selvstændigt
- Backlog håndteres samlet – ikke ad hoc
- Test og deploy sker samlet, når struktur er lukket

---

## Versionering
- `v3.2` = fallback / stabil reference
- `v3.3.x` = inkrementelle commits i denne branch
- Minor versions bruges til at markere fase-afslutninger

---

## Fase 0 – Arkitektur-lås (v3.3.0)
**Status:** Afsluttet

Indhold:
- Adskillelse af debug-UI og public-UI
- Flyt af domænelogik ud af UI-laget
- Samling og oprydning af dokumentation

Ingen funktionelle ændringer.

---

## Fase 1 – Kontrakter & stubs (v3.3.1)
Formål:
- Fastlåse interfaces og ansvar
- Forberede fremtidig funktionalitet uden implementering

Indhold:
- Telemetry stub (no-op)
- State-model som type/struktur
- Debug-gate (intention, ikke auth)

---

## Fase 2 – Debug & observability (v3.3.2–v3.3.3)
Formål:
- Gøre systemets indre tilstand synlig
- Understøtte test og fejlsøgning

Indhold:
- Én dialog-stream
- Synlig state (phase, answers, profile, flags)
- Ingen UX-polish

---

## Fase 3 – Edge cases & fail-safe (v3.3.4–v3.3.6)
Formål:
- Robusthed
- Etisk og juridisk sikkerhed

Indhold:
- DO NOT-regler implementeret konsekvent
- Krise- og akut-respons (DK)
- Central fallback-mekanisme

Ingen nye flows.

---

## Fase 4 – Flow-finjustering (v3.3.7–v3.3.8)
Formål:
- Afslutte ATONM-forløb rent
- Forberede stabil handoff til LLM

Indhold:
- Intake → ATONM → validation → handoff
- Bruger-validering uden gen-narrowing
- Klar afslutning af orientering

---

## Fase 5 – Oprydning & freeze (v3.3.9)
Formål:
- Lukke v3.3

Indhold:
- Fjern døde TODOs
- Konsistens mellem kode og docs
- Freeze af ATONM-kerne

---

## Bevidst udskudt
- Slutbruger-UI
- Auth
- Persistent logging
- Personalisering
- Performance-optimering

---

## Arbejdsregler
- Ét fokus ad gangen
- Ingen “bare lige”
- Out-of-scope noteres, ikke implementeres
