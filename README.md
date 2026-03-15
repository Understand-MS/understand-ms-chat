# Understand MS Chat

An open chat interface designed to help people understand Multiple Sclerosis (MS). Built as a static web application hosted on Azure Static Web Apps, with AI responses powered by Azure AI services.

## Description

Understand MS Chat provides an accessible, conversational interface where users can ask questions about Multiple Sclerosis — symptoms, diagnosis, treatment, lifestyle, and more. The app is intentionally non-medical and includes a disclaimer encouraging users to consult healthcare professionals for personal medical advice.

Key features:
- Chat interface with suggested questions to get started
- Message history with timestamps and thumbs up/down feedback
- Responsive design (mobile + desktop)
- Light and dark mode support
- Sidebar with navigation: Chat, Previous Questions, About MS

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    AZURE STATIC WEB APP                         │
│                   (understand-ms-chat)                          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  React SPA (Vite + TS)                  │   │
│  │                                                         │   │
│  │  ┌─────────────┐   ┌──────────────────────────────┐    │   │
│  │  │ ChatSidebar │   │         Index Page           │    │   │
│  │  │─────────────│   │──────────────────────────────│    │   │
│  │  │ • Chat tab  │   │ ┌──────────────────────────┐ │    │   │
│  │  │ • Prev Qs   │   │ │      ChatHeader          │ │    │   │
│  │  │ • About MS  │   │ └──────────────────────────┘ │    │   │
│  │  └─────────────┘   │ ┌──────────────────────────┐ │    │   │
│  │                    │ │    DisclaimerBanner       │ │    │   │
│  │  ┌─────────────┐   │ └──────────────────────────┘ │    │   │
│  │  │  Providers  │   │ ┌──────────────────────────┐ │    │   │
│  │  │─────────────│   │ │  SuggestedQuestions /    │ │    │   │
│  │  │ • QueryCl.  │   │ │    ChatMessage[]         │ │    │   │
│  │  │ • Router    │   │ │  + TypingIndicator       │ │    │   │
│  │  │ • Tooltip   │   │ └──────────────────────────┘ │    │   │
│  │  │ • Toaster   │   │ ┌──────────────────────────┐ │    │   │
│  │  └─────────────┘   │ │       ChatInput          │ │    │   │
│  │                    │ └──────────────────────────┘ │    │   │
│  │                    └──────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                 [Static files: dist/ → CDN]                     │
└──────────────────────────────┼──────────────────────────────────┘
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     AZURE AI BACKEND                            │
│                                                                 │
│   Azure OpenAI / Azure AI Foundry                               │
│   ┌─────────────────────┐   ┌─────────────────────────────┐   │
│   │  AI Chat Endpoint   │   │   Knowledge Base / RAG      │   │
│   │  (GPT-4 / custom)   │◄──│   (MS-specific content)     │   │
│   └─────────────────────┘   └─────────────────────────────┘   │
│                                                                 │
│   Optional: Azure API Management (auth, rate limiting)          │
└─────────────────────────────────────────────────────────────────┘
```

### Layer Summary

| Layer | Technology | Notes |
|---|---|---|
| Hosting | Azure Static Web Apps | Serves the compiled `dist/` output |
| Frontend | React 18 + TypeScript + Vite | SPA, no SSR required |
| Styling | Tailwind CSS + shadcn/ui | Custom MS-branded color theme |
| State | React `useState` + TanStack React Query | Query client ready for API integration |
| AI Backend | Azure OpenAI / AI Foundry | Currently mocked — replace in `Index.tsx` |

---

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **UI components:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **Server state:** TanStack React Query
- **Animations:** Framer Motion
- **Testing:** Vitest + Playwright

---

## Getting Started

```bash
npm install
npm run dev        # Start dev server at http://localhost:8080
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm test           # Run unit tests
```

---

## Azure AI Integration

To connect the app to an Azure AI backend, set the following environment variable and update the `handleSendMessage` function in `src/pages/Index.tsx`:

```env
VITE_AZURE_AI_ENDPOINT=https://<your-resource>.openai.azure.com/...
```

Replace the mock `setTimeout` block with a `fetch` (or `useMutation` via React Query) call to the endpoint above.

---

## Disclaimer

This tool provides informational support only and does not replace professional medical advice. Always consult a qualified healthcare provider for personal medical decisions.
