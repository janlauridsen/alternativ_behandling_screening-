# ATONM v3.1 – ChatGPT arbejdsramme (stabil base)

Du assisterer på projektet **ATONM v3.1**.

## Status (læses først)
- Arkitektur- og kodeoprydning er afsluttet
- Systemet har en stabil, fungerende base
- Fokus er nu: validering, fejlsøgning, sproglig præcision og mindre justeringer
- **Koden er den primære sandhed**
- Dokumentation kan midlertidigt afvige under finjustering

---

## Overordnet formål
ATONM er en deterministisk, ikke-diagnostisk orienteringsmodel.
Systemet indsnævrer og beskriver mulige behandlingsretninger uden
rådgivning, prioritering eller anbefaling.

Systemet består af:
- en lukket, deterministisk kerne (ATONM)
- en efterfølgende sproglig fase (LLM handoff)

v3.1 betragtes som **funktionelt låst**.

---

## Grundregel (vigtigst)
**Koden har forrang over dokumentation.**

Hvis der er uoverensstemmelse mellem:
- kode
- dokumentation
- beskrivelser i tråden  

→ **koden gælder**.

Hvis noget er uklart:
- spørg efter konkret filindhold
- spørg efter sti eller folderstruktur  
**gæt ikke.**

---

## Låste principper (må ikke foreslås ændret)
- ATONM er deterministisk
- Ingen LLM bruges i ATONM-kernen
- Ingen heuristik, scoring eller ranking
- Ingen automatisk besvarelse af spørgsmål
- Ingen rådgivning, anbefaling eller outcome claims
- Intake-tekst bruges kun til sproglig spejling, aldrig beslutning

---

## Arkitektur (fast)
- `app/` → routing, UI, API handlers
- `lib/atonm/` → ren domænelogik og rendering
- `data/` / `app/api/atonm-data/` → normative YAML-data
- Types ligger i `lib/atonm/types.ts`

Ingen `lib → app` afhængigheder er tilladt.

---

## Arbejdsform i tråden
- Vær **kort, direkte og operationel**
- Giv **fulde filer**, ikke uddrag
- Én ændring eller ét problem ad gangen
- Vælg den oplagte løsning, hvis der er to
- Spørg før strukturændringer
- Forklar kun, når der bliver spurgt

---

## Hvad der er i scope (nu)
- Fejlsøgning
- Validering af flow og output
- Sproglig præcision og konsistens
- Små, kontrollerede justeringer
- Forberedelse og notering til v3.2 (uden implementering)

## Hvad der ikke er i scope
- Ny arkitektur
- Ny model
- Empirisk validering
- Brugerrettet UX
- Automatiseret fortolkning
- Produkt- eller behandlingsrådgivning

---

## Dokumentation
Dokumentation findes i:
- docs/atonm/README.md
- docs/atonm/ARCHITECTURE.md
- docs/atonm/DATA.md
- docs/atonm/FLOW.md
- docs/atonm/STATUS.md

Bemærk:
- Dokumentation kan være midlertidigt forældet
- Brug den som kontekst, ikke som sandhed
- Prioritér altid faktisk kodeadfærd

---

## Målsætning for tråden
At arbejde effektivt videre på en stabil kodebase,
uden arkitekturdrift, uden gentagelser,
og med respekt for de låste beslutninger i ATONM v3.1.
