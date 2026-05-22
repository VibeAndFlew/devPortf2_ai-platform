# Chat API

The Chat API provides endpoints for multi-model AI conversations with streaming support.

## Base URL

```
http://localhost:4003/api/chat
```

## Endpoints

### POST /api/chat

Send a message to the AI and receive a response.

**Request Body:**

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful AI assistant."
    },
    {
      "role": "user",
      "content": "What is the capital of France?"
    }
  ],
  "model": "gpt-4o",
  "temperature": 0.7,
  "maxTokens": 2048,
  "stream": true
}
```

**Parameters:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `messages` | `Message[]` | Yes | — | Array of conversation messages |
| `model` | `string` | No | `gpt-4o` | Model identifier |
| `temperature` | `number` | No | `0.7` | Sampling temperature (0-2) |
| `maxTokens` | `number` | No | `2048` | Maximum tokens to generate |
| `stream` | `boolean` | No | `true` | Enable streaming response |
| `topP` | `number` | No | `0.95` | Nucleus sampling parameter |
| `frequencyPenalty` | `number` | No | `0` | Frequency penalty (-2 to 2) |
| `presencePenalty` | `number` | No | `0` | Presence penalty (-2 to 2) |

**Response (non-streaming):**

```json
{
  "id": "chat_abc123",
  "message": {
    "role": "assistant",
    "content": "The capital of France is Paris."
  },
  "usage": {
    "promptTokens": 24,
    "completionTokens": 8,
    "totalTokens": 32
  },
  "model": "gpt-4o",
  "latencyMs": 842
}
```

**Response (streaming):**

Server-Sent Events (SSE) stream with `text/event-stream` content type:

```
data: {"type":"chunk","content":"The"}

data: {"type":"chunk","content":" capital"}

data: {"type":"chunk","content":" of"}

data: {"type":"done","usage":{"promptTokens":24,"completionTokens":8,"totalTokens":32}}
```

### GET /api/chat/conversations

Retrieve conversation history.

**Query Parameters:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `limit` | `number` | No | `50` | Number of conversations |
| `offset` | `number` | No | `0` | Pagination offset |

### GET /api/chat/conversations/:id

Retrieve a specific conversation with full message history.

### DELETE /api/chat/conversations/:id

Delete a conversation and its messages.

## Error Codes

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Malformed request body |
| `MODEL_NOT_FOUND` | Specified model is not available |
| `RATE_LIMITED` | Too many requests |
| `PROVIDER_ERROR` | AI provider returned an error |
| `CONTEXT_TOO_LONG` | Message exceeds context window |

## Rate Limiting

- **Standard tier:** 60 requests per minute
- **Pro tier:** 300 requests per minute
- **Enterprise:** Custom limits

## Examples

### cURL

```bash
curl -X POST http://localhost:4003/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello!"}],
    "model": "gpt-4o",
    "stream": false
  }'
```

### TypeScript (Client)

```typescript
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [{ role: "user", content: "Hello!" }],
    stream: true,
  }),
});

const reader = response.body!.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const text = decoder.decode(value);
  // Process SSE chunks
}
```
