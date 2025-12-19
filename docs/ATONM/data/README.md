# ATONM – Data Layer

Denne mappe indeholder **struktureret, maskinlæsbar data**
til brug i ATONM (Alternative Treatment Orientation & Narrowing Model).

Data i denne mappe er **ikke runtime-kode** og **ikke brugerdokumentation**.
Den fungerer som et stabilt mellemled mellem:
- den normative model (ATONM-prototype)
- og teknisk implementering

---

## Overordnet princip

> **YAML-filer i denne mappe udgør den operationelle sandhed  
> for, hvordan behandlingsformer kan beskrives og sammenlignes –  
> aldrig hvad der er bedst, virker eller anbefales.**

---

## Filer

### `treatments.yaml` (obligatorisk)

Denne fil er den **primære og autoritative datakilde**.

Indeholder for hver behandlingsform:
- kategori (fx body_regulation, psyche_consciousness)
- fokusprofil (krop / sind / energi)
- interaktionsstil
- abstraktionsniveau
- typiske anvendelseskontekster
- praktiske karakteristika (tid, omkostning, afhængighed)

⚠️ Denne fil **må anvendes direkte** i ATONM’s narrowing-logik.

---

### `treatments-annotations.yaml` (valgfri)

Denne fil indeholder **supplerende, menneskeligt læsbar kontekst**:

- beskrivende noter
- evidensforbehold
- almindelige associationer
- juridiske og etiske afgrænsninger

⚠️ Denne fil **må aldrig** bruges direkte i narrowing-logik  
og må ikke indeholde:
- vægte
- scores
- anbefalinger
- prioriteringer
- effektpåstande

Formålet er forklaring og kvalitetssikring — ikke beslutning.

---

## Versionering

- Ændringer i `treatments.yaml` kan påvirke systemadfærd  
  → kræver bevidst beslutning og evt. versionssnapshot
- Ændringer i `treatments-annotations.yaml` er ikke-operationelle  
  → kan foretages mere fleksibelt

**Tommelfingerregel:**
> Ændr aldrig både model (logik) og data samtidig.

---

## Design-disciplin

- YAML = maskinel struktur og konsistens  
- Markdown = refleksion, begrundelse og forklaring  

Hvis noget ikke entydigt skal bruges i logik,
hører det **ikke hjemme** i YAML.

---

## Relation til ATONM-modellen

Denne datamappe er underlagt:

- `docs/ATONM/atonm-prototype-v1.0.md`
- `docs/ATONM/atonm-model-instructions.md`

Ved tvivl gælder altid:
- brugerautonomi
- tilbageholdenhed
- forklarbarhed
- reversibilitet

---

**Status:** Stabil (v1.x)  
**Scope:** Non-diagnostic, non-therapeutic, orientational use only
