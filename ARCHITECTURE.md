# NOVA AI Architecture

## System Overview

NOVA AI Workflow OS is built on a **layered architecture** that separates concerns into distinct, independently scalable layers. The platform leverages Next.js 16's App Router for server-rendered React components, with a clear boundary between server and client code.

```
┌──────────────────────────────────────────────────────┐
│                    CLIENT LAYER                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │
│  │ Dashboard│ │   Chat   │ │Workflows │ │ Agents │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │
│  │Knowledge │ │  Prompt  │ │Playground│ │  Vec   │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘  │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                  SERVER LAYER                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │
│  │  RSC     │ │ API Routes│ │  Server  │ │  Taint │  │
│  │Components│ │          │ │ Actions  │ │  APIs  │  │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘  │
│              ┌──────────────────────────┐             │
│              │      Middleware           │             │
│              └──────────────────────────┘             │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                   SERVICE LAYER                       │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌────────┐ │
│  │Chat  │  │Wkflow│  │Agent │  │  KB  │  │Vector  │ │
│  │Service│  │Engine│  │Orch  │  │Service│  │Service │ │
│  └──────┘  └──────┘  └──────┘  └──────┘  └────────┘ │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                 AI PROVIDER LAYER                     │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐  │
│  │  OpenAI  │  │ Anthropic│  │   Other Providers  │  │
│  └──────────┘  └──────────┘  └────────────────────┘  │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│                   DATA LAYER                          │
│  ┌──────┐  ┌──────┐  ┌────────┐  ┌────────────────┐ │
│  │  PG  │  │Redis │  │Vector  │  │ Object Storage │ │
│  └──────┘  └──────┘  └────────┘  └────────────────┘ │
└──────────────────────────────────────────────────────┘
```

## Layer Architecture

### 1. Client Layer

The client layer consists of React Server Components (RSC) that render on the server and stream HTML to the client. Client Components are only used when interactivity is required (event handlers, state, effects).

**Key Design Decisions:**
- RSC-first — minimize client-side JavaScript
- Streaming SSR with Suspense boundaries
- Parallel data fetching at the route level
- Optimistic UI updates via Server Actions

### 2. Server Layer

The server layer handles request processing, authentication, and data orchestration.

**Components:**
- **React Server Components** — server-rendered UI with direct data access
- **API Routes** — RESTful endpoints for external integrations
- **Server Actions** — form mutations and data operations
- **Middleware** — request preprocessing, auth, redirects

### 3. Service Layer

Domain-specific services encapsulate business logic, each independently testable and deployable.

**Services:**
- **ChatService** — multi-model conversation management
- **WorkflowEngine** — DAG-based pipeline orchestration
- **AgentOrchestrator** — agent lifecycle and tool integration
- **KnowledgeBaseService** — document ingestion and retrieval
- **PromptStudioService** — template management and versioning
- **VectorSearchService** — embedding generation and similarity search

### 4. AI Provider Layer

Abstraction over AI model providers with a unified interface for streaming, non-streaming, and embedding operations.

```typescript
interface AIProvider {
  chat(params: ChatParams): Promise<ChatResponse>;
  chatStream(params: ChatParams): ReadableStream<ChatChunk>;
  embed(input: string): Promise<number[]>;
  models(): Promise<Model[]>;
}
```

### 5. Data Layer

Persistent storage with Redis caching for hot data and PostgreSQL for relational data.

## Data Flow

### Chat Request Flow

```
User Input → Client Component → Server Action → ChatService → AIProvider → Stream Response
                                                                     ↓
                                                              PostgreSQL (History)
                                                              Redis (Cache)
```

### Knowledge Retrieval Flow

```
User Query → VectorSearchService → Embedding Generation → Vector DB Similarity
                                                                ↓
                                                    Document Retrieval → Context Assembly
                                                                ↓
                                                           LLM Response
```

## Key Architecture Decisions

1. **RSC-first rendering** — Maximize server-side computation, minimize client bundle
2. **Streaming throughout** — From AI provider response to UI rendering
3. **Server Actions over API routes** — For same-origin mutations with progressive enhancement
4. **Unified AI provider interface** — Swap providers without changing application code
5. **Zod validation at boundaries** — Type-safe data flow between layers
6. **tailwind-merge + clsx** — Consistent, type-safe class composition
7. **Radix UI primitives** — Accessible, composable UI components with no styling assumptions

## Route Design

```
/                     → Dashboard (RSC with parallel data fetching)
/chat                 → Chat interface (RSC + Client Islands for streaming)
/chat/[id]            → Conversation detail (dynamic route)
/workflows            → Workflow list (RSC)
/workflows/[id]       → Workflow editor (Client Component for drag-and-drop)
/agents               → Agent list (RSC)
/agents/[id]          → Agent detail/config (RSC + Client Islands)
/knowledge            → Knowledge base index (RSC)
/knowledge/[id]       → Document detail (RSC)
/prompts              → Prompt library (RSC)
/playground           → Model playground (Client Component)
/vector-search        → Vector search interface (RSC + Client Islands)
/profile              → User profile (RSC)
/settings             → App settings (RSC)
```

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 2.0s |
| Time to Interactive | < 2.5s |
| First Input Delay | < 50ms |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse Performance | > 95 |
| Lighthouse Accessibility | > 95 |

## Error Handling Strategy

1. **React Error Boundaries** for component-level errors
2. **Server Action error returns** with typed error objects
3. **Global error boundary** for unhandled exceptions
4. **Sentry integration** for error tracking and monitoring
5. **Graceful degradation** when AI providers are unavailable
