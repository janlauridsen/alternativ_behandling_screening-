import FoldoutText from "./components/FoldoutText";
import TestBox from "./components/TestBox";

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
      <h1>Intern prompt-test</h1>

      {/* Lokal CSS – kun til denne side */}
      <style>{`
        .test-grid {
          display: block;
        }

        @media (min-width: 1100px) {
          .test-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            align-items: start;
          }
        }
      `}</style>

      <div className="test-grid">
        {/* SYSTEMPROMPT */}
        <FoldoutText
          title="Systemprompt – fri samtale"
          preview="Test af generel samtaleadfærd og etiske grænser."
        >
          <p>
            Test af den primære systemprompt uden strukturering eller
            indsnævring.
          </p>

          <p>
            Systemet giver generel information, undgår rådgivning og holder sig
            inden for definerede etiske og juridiske rammer.
          </p>

          <TestBox endpoint="/api/prompt-test" />
        </FoldoutText>

        {/* ATONM */}
        <FoldoutText
          title="ATONM – orientering og indsnævring"
          preview="Test af ATONM-modellen isoleret fra fri samtale."
        >
          <p>
            Test af ATONM som selvstændigt orienteringsmodul med fast
            spørgestruktur.
          </p>

          <p>
            Modellen reducerer mulighedsrum uden at anbefale, rangere eller
            forudsige effekt.
          </p>

          <TestBox endpoint="/api/atonm-test" />
        </FoldoutText>
      </div>
    </main>
  );
}
