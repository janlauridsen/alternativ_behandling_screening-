import FoldoutText from "./components/FoldoutText";

export default function Page() {
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>ATONM – intern test & debug</h1>

      <p style={{ maxWidth: "800px", opacity: 0.8 }}>
        Denne side anvendes udelukkende til intern test, validering og
        fejlsøgning af ATONM v3.1.  
        Fokus er korrekthed, determinisme og sammenhæng – ikke brugeroplevelse.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          alignItems: "start",
          marginTop: "32px",
        }}
      >
        {/* ATONM */}
        <FoldoutText
          title="ATONM – orientering & indsnævring"
          preview="Deterministisk, ikke-diagnostisk orienteringsmodel (v3.1)"
        >
          <p>
            ATONM anvendes her som et struktureret orienteringsmodul baseret på
            faste spørgsmål og monotonic narrowing.
          </p>
          <p>
            UI til ATONM er i øjeblikket under genopbygning med fokus på
            testbarhed og observability.
          </p>
          <p style={{ opacity: 0.7 }}>
            Runtime testes via API (<code>/api/atonm-test</code>) og
            dokumenteret output.
          </p>
        </FoldoutText>

        {/* HANDOFF / LLM */}
        <FoldoutText
          title="LLM & handoff"
          preview="Overgang fra ATONM-orientering til samtale"
        >
          <p>
            Handoff-chatten tester overgangen fra et afsluttet ATONM-forløb til
            fri samtale med bevaret kontekst.
          </p>
          <p>
            Fokus er:
          </p>
          <ul>
            <li>korrekt brug af systemprompt</li>
            <li>ingen genåbning af indsnævring</li>
            <li>ingen rådgivning eller anbefaling</li>
          </ul>
          <p style={{ opacity: 0.7 }}>
            Endpoint: <code>/api/handoff-chat</code>
          </p>
        </FoldoutText>
      </div>

      <hr style={{ margin: "48px 0", opacity: 0.3 }} />

      <section style={{ maxWidth: "800px" }}>
        <h2>Status</h2>
        <ul>
          <li>ATONM: v3.1 (locked)</li>
          <li>Model: Type A (deskriptiv)</li>
          <li>UI: intern / under opbygning</li>
          <li>Formål: funktionel validering & fail-fast</li>
        </ul>
      </section>
    </main>
  );
}
