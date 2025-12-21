// app/page.tsx
// Public landing page – ATONM v3.3
// Status: Statisk · ingen logik · ingen API-kald

export default function Page() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "80px auto",
        padding: "0 16px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>ATONM</h1>

      <p style={{ maxWidth: "700px", opacity: 0.8 }}>
        ATONM er et eksperimentelt, ikke-diagnostisk orienteringssystem.
        <br />
        Denne installation er i øjeblikket konfigureret til intern test og
        validering.
      </p>

      <hr style={{ margin: "32px 0", opacity: 0.3 }} />

      <section>
        <h2>Status</h2>
        <ul>
          <li>Version: v3.3 (frozen)</li>
          <li>Formål: Arkitektur- og flowvalidering</li>
          <li>Offentlig brugerflade: endnu ikke aktiv</li>
        </ul>
      </section>

      <section style={{ marginTop: "32px" }}>
        <p style={{ opacity: 0.7 }}>
          Hvis du er udvikler eller tester, findes der en intern debug-grænseflade.
        </p>
        <p>
          <code>/debug</code>
        </p>
      </section>
    </main>
  );
}
