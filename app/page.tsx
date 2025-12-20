import FoldoutText from "./components/FoldoutText";

export default function Page() {
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        padding: "0 16px",
      }}
    >
      <h1>Intern test</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* SYSTEMPROMPT – fri chat */}
        <FoldoutText
          title="Systemprompt – fri samtale"
          preview="Test af generel samtaleadfærd og etiske grænser."
        >
          <p>Denne test er til fri tekstbaseret dialog.</p>
          <p>
            Ingen struktur, ingen indsnævring. Bruges kun til at vurdere
            tone, afgrænsning og etik.
          </p>
        </FoldoutText>

        {/* ATONM – korrekt test */}
        <FoldoutText
          title="ATONM – orientering og indsnævring"
          preview="Struktureret test af ATONM som state-machine."
        >
          <p>
            Denne test anvender ATONM som et event-baseret
            orienteringsmodul.
          </p>
          <p>
            Ingen fri tekst. Ingen tolkning. Kun faste valg og
            deterministisk flow.
          </p>

        </FoldoutText>
      </div>
    </main>
  );
}
