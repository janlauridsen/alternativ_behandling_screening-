"use client";

import { useState } from "react";

export default function FoldoutText({
  title,
  preview,
  children,
}: {
  title: string;
  preview: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "16px" }}>
      <h3 style={{ margin: "0 0 4px 0" }}>{title}</h3>
      <p style={{ margin: "0 0 8px 0", color: "#555" }}>{preview}</p>

      <button onClick={() => setOpen(!open)}>
        {open ? "Skjul" : "Vis mere"}
      </button>

      {open && (
        <div style={{ marginTop: "12px", color: "#333" }}>
          {children}
        </div>
      )}
    </div>
  );
}
