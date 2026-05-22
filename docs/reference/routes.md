# Routes & Modules Reference

## Application Routes

| Route | Module | Type | Description |
|-------|--------|------|-------------|
| `/` | Dashboard | RSC | System overview, metrics, quick actions |
| `/chat` | AI Chat | RSC + Client | Multi-model conversation interface |
| `/chat/[id]` | Conversation | RSC + Client | Individual conversation view |
| `/workflows` | Workflow Engine | RSC | Workflow list and management |
| `/workflows/[id]` | Workflow Editor | Client | Visual workflow builder |
| `/agents` | Agent Management | RSC | Agent listing and configuration |
| `/agents/[id]` | Agent Detail | RSC + Client | Agent configuration and chat |
| `/knowledge` | Knowledge Base | RSC | Document library |
| `/knowledge/[id]` | Document Detail | RSC | Document viewer and management |
| `/prompts` | Prompt Studio | RSC + Client | Prompt template library |
| `/prompts/[id]` | Prompt Editor | Client | Template editing and testing |
| `/playground` | Model Playground | Client | Model testing environment |
| `/vector-search` | Vector Search | RSC + Client | Semantic search interface |
| `/profile` | User Profile | RSC | User settings and preferences |
| `/settings` | App Settings | RSC | Application configuration |

## Route Architecture

### Server Components (RSC)
Routes marked as `RSC` use React Server Components for:
- Direct database access
- Reduced client JavaScript
- Automatic streaming
- SEO optimization

### Client Components
Routes marked as `Client` require interactivity:
- Drag-and-drop (workflow editor)
- Real-time streaming (chat)
- DOM manipulation (playground)
- State management (prompt editor)

### Hybrid (RSC + Client)
Routes with both server and client components:
- Server-rendered shell with client islands
- Progressive enhancement
- Optimized loading patterns

## Layout Structure

```
Root Layout (layout.tsx)
├── AuthProvider
├── ThemeProvider
├── Navbar
└── Page Content
    ├── Dashboard Layout
    ├── Chat Layout
    ├── Workflows Layout
    ├── Agents Layout
    ├── Knowledge Layout
    ├── Prompts Layout
    ├── Playground Layout
    ├── Vector Search Layout
    ├── Profile Layout
    └── Settings Layout
```

## Middleware

Middleware handles:
- Authentication verification
- Route protection
- Rate limiting
- A/B testing assignment
- Request logging
- Security headers
