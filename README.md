# alternativ_behandling_screening-
Skal hjælpe brugere med t få relevant information i en form der er i rammer 


gaarsdal-assistent/
├─ README.md
├─ LICENSE
├─ .gitignore
├─ package.json
├─ vercel.json
│
├─ docs/
│  ├─ design/
│  │  ├─ design-version-1.md
│  │  ├─ tone-guide-v1.1.md
│  │  ├─ juridisk-qa.md
│  │  └─ disclaimer-v1.0.md
│  │
│  └─ methods/
│     ├─ hypnoterapi.md
│     ├─ nada.md
│     ├─ zoneterapi.md
│     └─ kinesiologi.md
│
├─ prompts/
│  └─ system-prompt-v1.js
│
├─ app/            # Next.js (App Router)
│  ├─ layout.tsx
│  ├─ page.tsx     # Landing
│  ├─ chat/
│  │  └─ page.tsx  # Simpel chat-test
│  └─ api/
│     └─ chat/
│        └─ route.ts
│
└─ components/
   ├─ ChatBox.tsx
   ├─ Message.tsx
   └─ Disclaimer.tsx
