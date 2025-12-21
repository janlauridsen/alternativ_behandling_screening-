// lib/guards/respond.ts
// Guard responses – short, neutral, terminating
// Status: crisis includes children & youth (DK)

export function respond(
  type: "do_not" | "terminate" | "crisis" | "humor"
): string {
  switch (type) {
    case "humor":
      return "🙂";

    case "crisis":
      return (
        "Jeg kan ikke hjælpe med dette her.\n\n" +
        "Hvis du er i akut krise, er det vigtigt at tale med et menneske nu:\n\n" +
        "• Akut hjælp: 112\n" +
        "• Livslinien (alle aldre): 70 201 201\n" +
        "• Børn & unge – BørneTelefonen: 116 111\n" +
        "• Psykiatrisk akutmodtagelse (via regionen)\n\n" +
        "Hvis du er barn eller ung, er det helt okay at række ud – du behøver ikke stå alene."
      );

    case "do_not":
      return "Det kan jeg ikke hjælpe med.";

    case "terminate":
    default:
      return "Denne samtale kan jeg ikke fortsætte.";
  }
}
