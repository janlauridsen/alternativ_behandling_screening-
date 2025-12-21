# ATONM – Hypothetical User Profile

**Status:** Normativ · låst

Dette dokument fastlægger den **hypotetiske brugerprofil**, som afledes efter afsluttet ATONM-indsnævring. Profilen er et sprogligt og analytisk hjælpeobjekt og må ikke anvendes til prioritering, filtrering eller anbefaling.

---

## Formål

Den hypotetiske brugerprofil har til formål at:

* spejle brugerens egne svar på en ikke-konkluderende måde
* give et fælles referencepunkt for efterfølgende forklarende tekst
* understøtte refleksion uden at guide valg

Profilen beskriver **hvordan brugeren oplever sin situation**, ikke hvem brugeren er, og ikke hvad der bør gøres.

---

## Afgrænsning

Profilen er:

* situationsbestemt
* midlertidig (gælder kun den aktuelle session)
* deterministisk afledt af ATONM-svar

Profilen er **ikke**:

* en diagnose
* en vurdering
* en anbefaling
* en brugeridentitet

Profilen må ikke gemmes eller genbruges på tværs af sessioner.

---

## Struktur (låst)

```ts
HypotheticalUserProfile {
  experienceOrientation: "body" | "mind" | "mixed" | "unclear"
  situationPattern: "situational" | "recurring" | "long_term"
  participationPreference: "passive" | "active" | "mixed"
  guidancePreference: "guided" | "shared" | "self_directed"
  abstractionTolerance: "low" | "medium" | "high"
}
```

Strukturen må ikke udvides eller reduceres uden eksplicit versionsbeslutning.

---

## Feltdefinitioner

### experienceOrientation

Hvor brugeren primært oplever sit fokus i den aktuelle situation.

* body: kropsligt oplevet fokus
* mind: mentalt/indre oplevet fokus
* mixed: både kropsligt og mentalt
* unclear: ingen tydelig orientering

---

### situationPattern

Hvordan situationen opleves tidsligt.

* situational: enkeltstående eller akut situation
* recurring: gentagende eller tilbagevendende
* long_term: længerevarende eller vedvarende

---

### participationPreference

Hvordan brugeren foretrækker at deltage i en proces.

* passive: modtagende deltagelse
* active: aktiv, selvudførende deltagelse
* mixed: kombination eller skift

---

### guidancePreference

Hvordan brugeren forholder sig til styring og ansvar.

* guided: ønsker tydelig guidning
* shared: delt ansvar mellem bruger og udøver
* self_directed: foretrækker selvstyring

---

### abstractionTolerance

Hvor fortolkende eller abstrakt en ramme opleves som acceptabel.

* low: foretrækker konkret og jordnær ramme
* medium: accepterer både konkret og fortolkende
* high: åben for fortolkende eller abstrakt ramme

---

## Afledningsprincipper

* Hvert felt afledes fra ét eller to ATONM-spørgsmål
* Hvert felt tildeles præcis én værdi
* Der anvendes ingen vægtning, summering eller sandsynlighed
* Samme svar giver altid samme profil

Afledningen er mekanisk og uden fortolkning på tværs af felter.

---

## Forhold til Type A-kendetegn

Den hypotetiske brugerprofil er **bevidst underbestemt** i forhold til Type A-kendetegnene for metoder.

* Profilen spejler brugerens oplevelse
* Type A beskriver metodernes form
* Der findes ingen direkte 1:1-kobling mellem profilfelter og Type A-felter

Dette er et bevidst designvalg for at undgå implicit match-logik.

---

## Anvendelsesregler (bindende)

Profilen må:

* præsenteres sprogligt som hypotetisk spejling
* anvendes i forklarende tekst før eller efter metodebeskrivelser

Profilen må ikke:

* bruges til filtrering eller rangordning
* kobles direkte til metodevalg
* indgå i anbefalende formuleringer

---

## Status og ændringer

Dette dokument er **låst**.

Ændringer kræver:

* eksplicit versionsbeslutning
* opdatering af dokumentation
* vurdering af etiske konsekvenser

Dette dokument udgør den normative reference for den hypotetiske brugerprofil i ATONM.
