# Workflow Builder Guide

The Workflow Engine provides a visual drag-and-drop interface for creating AI-powered pipelines.

## Key Concepts

### Nodes
Each node represents a step in your workflow:
- **Input Nodes** — Data sources (API, webhook, file, database)
- **Process Nodes** — Transformations, AI calls, conditions
- **Output Nodes** — Destinations (database, API, email, file)

### Edges
Edges define the flow between nodes:
- Sequential connections
- Conditional branching (if/else, switch)
- Parallel execution forks
- Error handling paths

### Execution
Workflows can be executed:
- **Manual** — On-demand via the UI or API
- **Scheduled** — Cron-based scheduling
- **Triggered** — Webhook or event-driven
- **Chained** — As sub-workflow from another workflow

## Building a Workflow

1. **Create** a new workflow from the `/workflows` page
2. **Add nodes** by dragging from the node palette
3. **Connect nodes** by dragging between ports
4. **Configure nodes** by clicking on them
5. **Test** the workflow with sample data
6. **Schedule or trigger** the workflow

## Node Configuration

### AI Node
Configure the AI model call:
- Model selection
- Prompt template with variable injection (`{{variable}}`)
- Temperature and max tokens
- Output parsing instructions

### Condition Node
Configure branching logic:
- Field comparison (equals, greater than, contains)
- Regex matching
- AI-powered classification
- Multiple output paths

### Transform Node
Configure data transformation:
- JavaScript/Python expression
- JSONata query
- Template rendering
- Data mapping

## Debugging

- **Execution logs** — Per-node execution details
- **Variable inspector** — View data flowing between nodes
- **Dry run mode** — Test without side effects
- **Step-through execution** — Execute one node at a time
