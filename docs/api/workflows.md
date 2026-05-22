# Workflows API

The Workflows API provides endpoints for creating, managing, and executing AI workflow pipelines.

## Base URL

```
http://localhost:4003/api/workflows
```

## Endpoints

### GET /api/workflows

List all workflows with optional filtering.

**Query Parameters:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `status` | `string` | No | — | Filter by status (active, paused, draft) |
| `limit` | `number` | No | `20` | Results per page |
| `offset` | `number` | No | `0` | Pagination offset |

### POST /api/workflows

Create a new workflow.

**Request Body:**

```json
{
  "name": "Data Processing Pipeline",
  "description": "Process and analyze incoming data",
  "nodes": [
    {
      "id": "node_1",
      "type": "input",
      "label": "Data Source",
      "config": {
        "source": "api",
        "endpoint": "https://api.example.com/data"
      }
    },
    {
      "id": "node_2",
      "type": "transform",
      "label": "Clean Data",
      "config": {
        "operations": ["deduplicate", "normalize"]
      }
    },
    {
      "id": "node_3",
      "type": "ai",
      "label": "Analyze with GPT",
      "config": {
        "model": "gpt-4o",
        "prompt": "Analyze the following data and extract key insights: {{data}}"
      }
    },
    {
      "id": "node_4",
      "type": "output",
      "label": "Save Results",
      "config": {
        "destination": "database",
        "collection": "analysis_results"
      }
    }
  ],
  "edges": [
    { "from": "node_1", "to": "node_2" },
    { "from": "node_2", "to": "node_3" },
    { "from": "node_3", "to": "node_4" }
  ],
  "schedule": {
    "type": "cron",
    "expression": "0 */6 * * *"
  }
}
```

### GET /api/workflows/:id

Retrieve a workflow by ID with full node and edge details.

### PUT /api/workflows/:id

Update an existing workflow.

### DELETE /api/workflows/:id

Delete a workflow and its execution history.

### POST /api/workflows/:id/execute

Trigger execution of a workflow.

### GET /api/workflows/:id/executions

List execution history for a workflow.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Execution ID |
| `status` | `string` | running, completed, failed, cancelled |
| `startedAt` | `string` | ISO timestamp |
| `completedAt` | `string` | ISO timestamp |
| `duration` | `number` | Execution time in ms |
| `nodeResults` | `object` | Per-node execution results |

## Node Types

| Type | Description |
|------|-------------|
| `input` | Data source (API, database, file, webhook) |
| `transform` | Data transformation (filter, map, reduce) |
| `ai` | AI model call with prompt template |
| `condition` | Conditional branching |
| `parallel` | Parallel execution fork |
| `output` | Data destination (database, API, file) |
| `subworkflow` | Nested workflow execution |
| `delay` | Timed delay between nodes |

## Error Handling

Workflows support automatic retry with configurable:
- Maximum retry attempts
- Backoff strategy (linear, exponential, fixed)
- Error output handling for conditional paths

## Rate Limiting

- **Standard tier:** 10 concurrent executions
- **Pro tier:** 50 concurrent executions
- **Enterprise:** Custom limits
