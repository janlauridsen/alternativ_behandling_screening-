"use client";

import { useState } from "react";

export default function PromptTest() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    setLoading(true);
    setReply("");

    const res = await fetch("/api/prompt-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setReply(data.reply || "Ingen respons");
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 720, margin: "4rem auto", padding: "1rem" }}>
      <h1>Systemprompt – intern test</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={6}
        style={{ width: "100%", marginBottom: "1rem" }}
        placeholder="Skriv frit. Ingen data gemmes."
      />

      <button onClick={send} disabled={loading}>
        {loading ? "Tænker…" : "Send"}
      </button>

      {reply && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <strong>Respons:</strong>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}
