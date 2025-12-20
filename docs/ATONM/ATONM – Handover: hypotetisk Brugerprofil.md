ATONM – Handover: Hypotetisk Brugerprofil som Mellemtrin

Status: Designprincip
Formål: Forbedre resonans og forventningsmatch uden at ændre logik, indsnævring eller etik
Berører: Dokumentation, system prompt, output-formulering
Berører ikke: Spørgsmål, svarmuligheder, beslutningsrum, mapping-regler

1. Overordnet idé (kort)

ATONM kan med fordel indføre et internt mellemtrin, hvor brugerens svar samles til en hypotetisk brugerprofil, der:

udelukkende er baseret på brugerens egne svar

ikke er en diagnose, vurdering eller sandhed

ikke ændrer indsnævring eller udfald

kun bruges til at forme og spejle outputtet sprogligt

Dette mellemtrin gør det muligt, at svaret opleves personligt og meningsfuldt, uden at systemet bliver rådgivende eller styrende.

2. Hvad den hypotetiske brugerprofil er

Den hypotetiske brugerprofil er:

en midlertidig arbejdshypotese

udledt 1:1 af strukturerede svar

uden selvstændig beslutningskraft

Den svarer på spørgsmålet:

“Hvis vi tager brugerens svar på ordet, hvordan forstår brugeren selv sin situation og sine forventninger?”

3. Hvad profilen indeholder (tilladt indhold)

Profilen må udelukkende bestå af afledte beskrivelser af brugerens egne svar, fx:

oplevelsesdomæne
(kropsligt / mentalt / blandet / uklart)

situationskarakter
(afgrænset / generel / tilbagevendende)

foretrukken arbejdsform
(guidet / selvaktiv / kombination)

forventning til struktur
(konkret / åben / uklar)

tolerance for abstraktion
(lav / middel / høj)

⚠️ Profilen må ikke indeholde:

navngivne problemer (fx “angst”, “stress”), medmindre brugeren selv bruger ordet

årsagsforklaringer

vurdering af sværhedsgrad

forslag til behandling

4. Hvad profilen bruges til (meget vigtigt)

Den hypotetiske brugerprofil bruges kun til:

✔ Sproglig spejling i output

formulering af forklaringer

valg af tone (konkret vs. åben)

rækkefølge og framing af begrundelser

Eksempel (principielt):

“Ud fra den måde, du beskriver din udfordring på, og det du lægger vægt på i processen…”

Ikke:

“Fordi du har X, er Y bedst”

5. Hvad profilen ikke må bruges til

Profilen må aldrig:

ændre hvilke behandlingsmetoder der udvælges

vægte metoder anderledes

genåbne frasorterede muligheder

korrigere eller “forbedre” brugerens svar

fungere som skjult beslutningslag

Alle beslutninger sker før og uafhængigt af profilen.

6. Arkitektonisk placering (konceptuelt)

Den anbefalede logiske rækkefølge er:

Svar på ATONM-spørgsmål
        ↓
Indsnævring / mapping (uændret)
        ↓
Hypotetisk brugerprofil (afledt)
        ↓
Formuleret output (spejling)


Profilen ligger efter indsnævring, ikke før.

7. Hvorfor dette forslag er kompatibelt med ATONM

Dette forslag:

ændrer ikke beslutningsrum (4⁶)

ændrer ikke mapping-funktionen

introducerer ingen ny vægtning

overholder ikke-diagnostisk og ikke-rådgivende princip

understøtter brugerens autonomi

Det gør kun én ting:

Output giver bedre mening set fra brugerens egen logik.

8. Hvordan det kan beskrives i dokumentationen (forslag)

ATONM anvender en intern, midlertidig brugerprofil, som udelukkende afspejler brugerens egne svar. Profilen bruges ikke til at træffe valg, men til at formulere resultaterne på en måde, der matcher brugerens oplevelse og forventninger.

9. System-prompt-implikation (kort)

Systemet skal instrueres i:

at danne en hypotetisk profil baseret på svar

at anvende profilen kun sprogligt

aldrig at lade profilen påvirke valg eller indsnævring

10. Samlet konklusion (handover-klar)

ATONM kan med fordel arbejde med en intern hypotetisk brugerprofil

Profilen er afledt, ikke vurderende

Den ændrer ikke modellen – kun oplevelsen

Den forklarer, hvorfor svaret kan føles “rigtigt”, uden at love noget

END OF HANDOVER NOTE
