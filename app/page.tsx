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

        {/* ATONM – orientering (UI midlertidigt fjernet) */}
        <FoldoutText
          title="ATONM – orientering og indsnævring"
          preview="Struktureret orienteringsmodel (UI midlertidigt deaktiveret)."
        >
          <p>
            ATONM anvendes som et deterministisk, ikke-diagnostisk
            orienteringsmodul.
          </p>
          <p>
            Selve brugerinterfacet er midlertidigt fjernet i v3.1 som led
            i arkitektonisk konsolidering.
          </p>
        </FoldoutText>
      </div>
    </main>
  );
}
