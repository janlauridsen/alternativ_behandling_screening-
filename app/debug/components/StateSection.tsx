// app/debug/components/StateSection.tsx
// Status: Read-only debug · præsentation

"use client"

type Props = {
  title: string
  data: unknown
}

export default function StateSection({ title, data }: Props) {
  return (
    <section style={{ marginBottom: "16px" }}>
      <h4 style={{ marginBottom: "6px" }}>{title}</h4>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: "10px",
          borderRadius: "6px",
          fontSize: "12px",
          overflowX: "auto",
        }}
      >
        {data === undefined ? "(undefined)" : JSON.stringify(data, null, 2)}
      </pre>
    </section>
  )
}
