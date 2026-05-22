# Agents API

The Agents API provides endpoints for managing specialized AI agents with custom personas, tools, and memory.

## Base URL

```
http://localhost:4003/api/agents
```

## Endpoints

### GET /api/agents

List all agents.

### POST /api/agents

Create a new agent.

**Request Body:**

```json
{
  "name": "Code Reviewer",
  "description": "Reviews code for bugs, security issues, and best practices",
  "persona": {
    "role": "Senior Software Engineer",
    "expertise": ["TypeScript", "React", "Node.js", "System Design"],
    "tone": "constructive",
    "style": "detailed"
  },
  "tools": [
    { "id": "code_analysis", "config": { "depth": "full" } },
    { "id": "security_scan", "config": { "severity": "high" } }
  ],
  "model": "claude-3-5-sonnet",
  "temperature": 0.3,
  "memory": {
    "type": "conversation",
    "maxTokens": 4000
  }
}
```

### GET /api/agents/:id

Retrieve an agent configuration.

### PUT /api/agents/:id

Update an agent.

### DELETE /api/agents/:id

Delete an agent.

### POST /api/agents/:id/chat

Send a message to an agent and receive a response.

**Request Body:**

```json
{
  "message": "Review this pull request for potential issues",
  "context": {
    "code": "function processData(input) { ... }",
    "language": "typescript",
    "repo": "user/repo",
    "pr": 42
  }
}
```

### GET /api/agents/:id/conversations

List agent conversation history.

### POST /api/agents/:id/execute-tool

Execute a specific tool on an agent's behalf.

## Built-in Tools

| Tool | Description |
|------|-------------|
| `code_analysis` | Static code analysis |
| `security_scan` | Security vulnerability scanning |
| `web_search` | Web search and information retrieval |
| `file_read` | Read files from connected repositories |
| `execute_command` | Run shell commands (sandboxed) |
| `api_call` | Make HTTP requests to external APIs |
| `vector_search` | Search knowledge base vectors |

## Memory Types

| Type | Description |
|------|-------------|
| `conversation` | Recent conversation history |
| `summary` | Compressed conversation summaries |
| `vector` | Semantic memory via embeddings |
| `hybrid` | Combination of all memory types |
