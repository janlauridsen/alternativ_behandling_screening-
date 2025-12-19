# alternativ_behandling_screening-
Skal hjælpe brugere med t få relevant information i en form der er i rammer 

# Gaarsdal Assistent

Gaarsdal Assistent er et eksperimentelt webprojekt, der tilbyder nøgtern, lægmandsvenlig information om udvalgte former for alternativ behandling.

Projektet er designet som et **orienteringsrum** – ikke et behandlingsrum – og har til formål at hjælpe nysgerrige og tvivlende brugere med at skabe overblik, begrebsafklaring og refleksion uden at blive påvirket i deres valg.

---

## Formål

- Give rolig og forståelig information om udvalgte alternative behandlingsformer  
- Understøtte refleksion uden at rådgive eller anbefale  
- Undgå håbspres, garantier og skjult påvirkning  
- Afprøve, hvordan en AI kan fungere ansvarligt i et sårbart domæne  

Projektet er **bevidst tilbageholdende** i både tone og funktionalitet.

---

## Hvad dette projekt er

- Et informations- og dialogværktøj  
- En test af etisk, juridisk og sproglig afgrænsning  
- En minimal teknisk implementation med fokus på læring  

## Hvad dette projekt ikke er

- Ikke behandling  
- Ikke rådgivning  
- Ikke markedsføring  
- Ikke erstatning for sundhedsfaglig, psykologisk eller medicinsk hjælp  

---

## Metoder inden for projektets ramme

Projektet forholder sig kun til følgende former for alternativ behandling:

- Hypnoterapi  
- NADA  
- Zoneterapi  
- Kinesiologi  
- Kropsterapeutiske tilgange  
- Mindfulness-baserede praksisser  
- Healing  

Andre metoder ligger uden for projektets ramme og håndteres ikke.

---

## Designprincipper

Projektet er bygget op omkring følgende principper:

- **Nøgternhed frem for overbevisning**  
- **Variation frem for løfter**  
- **Transparens frem for autoritet**  
- **Afgrænsning frem for eskalering**  
- **Menneskelig tone uden terapeutisk rolle**  

Alle principper er dokumenteret i `/docs/design`.

---

## Juridisk og etisk afgrænsning

Indholdet i dette projekt er udelukkende informativt.

Der gives:
- ingen garantier
- ingen vurderinger af egnethed
- ingen anbefalinger
- ingen behandlingspåstande

Alternative behandlingsformer omtales som mulige supplementer og erstatter ikke sundhedsfaglig udredning eller behandling.

Se `/docs/design/juridisk-qa.md` og `/docs/design/disclaimer-v1.0.md` for detaljer.

---

## Teknisk setup

- Framework: **Next.js (App Router)**
- Deployment: **Vercel**
- Fokus: minimal funktionalitet, hurtig læring

Projektet indeholder:
- En simpel landing page  
- En chat-test til observation (ikke produkt)  

Der anvendes ingen personlig profilering og ingen vedvarende samtalehukommelse.

---

## Status

**Design version 1 – lukket**

- Metodedokumenter færdige  
- Tone guide fastlagt  
- Juridisk QA gennemført  
- Klar til observation og læring  

Videreudvikling sker kun på baggrund af reel friktion og observation.

---

## Licens

Dette projekt er stillet til rådighed under en åben licens.  
Indhold og design må ikke anvendes til behandlings- eller markedsføringsformål uden selvstændig vurdering og ansvar.

---

## Kontakt

Projektet vedligeholdes som et fagligt og eksperimentelt arbejde.  
Der ydes ikke individuel support eller rådgivning via dette repository.



gaarsdal-assistent/
├─ README.md
├─ LICENSE
├─ .gitignore
├─ package.json
├─ vercel.json
│
├─ docs/
│  ├─ design/
│  │  ├─ design-version-1.md
│  │  ├─ tone-guide-v1.1.md
│  │  ├─ juridisk-qa.md
│  │  └─ disclaimer-v1.0.md
│  │
│  └─ methods/
│     ├─ hypnoterapi.md
│     ├─ nada.md
│     ├─ zoneterapi.md
│     └─ kinesiologi.md
│
├─ prompts/
│  └─ system-prompt-v1.js
│
├─ app/            # Next.js (App Router)
│  ├─ layout.tsx
│  ├─ page.tsx     # Landing
│  ├─ chat/
│  │  └─ page.tsx  # Simpel chat-test
│  └─ api/
│     └─ chat/
│        └─ route.ts
│
└─ components/
   ├─ ChatBox.tsx
   ├─ Message.tsx
   └─ Disclaimer.tsx
