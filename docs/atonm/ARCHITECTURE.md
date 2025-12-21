## Arkitekturprincipper (låst)

- ATONM er deterministisk
- Ingen LLM bruges før handoff
- Ingen heuristik eller scoring
- Ingen automatisk udfyldning af svar
- Ingen rådgivning eller prioritering

Lag:
- UI → event-baseret
- API → state machine
- lib/atonm → ren logik & rendering
- data → normative YAML-filer
