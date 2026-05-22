# Vector Search Guide

Vector Search enables semantic similarity search across your knowledge base using embeddings.

## How It Works

1. **Text is embedded** — converted to a vector of numbers representing meaning
2. **Vectors are indexed** — stored in a vector database for efficient search
3. **Query is embedded** — your search query is converted using the same model
4. **Similarity search** — the database finds nearest neighbors by cosine distance
5. **Results are ranked** — sorted by relevance score

## Search Modes

### Vector Search (Pure Semantic)
Best for understanding the _meaning_ behind queries:
- "How do I configure authentication?" → finds authentication docs
- Handles synonyms and related concepts
- Language-agnostic (works across languages)

### Keyword Search (Traditional)
Best for exact term matching:
- "rate_limit_configuration" → finds that exact term
- Supports fuzzy matching and wildcards
- Good for code snippets and identifiers

### Hybrid Search (Recommended)
Combines both approaches with re-ranking:
- Uses a cross-encoder to re-rank top results
- Best overall relevance
- Configurable weight between vector and keyword

## Configuration

### Embedding Models

| Model | Dimensions | Quality | Speed |
|-------|-----------|---------|-------|
| text-embedding-3-small | 1536 | Good | Fast |
| text-embedding-3-large | 3072 | Best | Moderate |

### Search Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `limit` | 20 | Max results to return |
| `threshold` | 0.7 | Minimum similarity score |
| `reranker` | cross-encoder | Re-ranking model |
| `vectorWeight` | 0.7 | Vector search weight (hybrid mode) |

## Filters

Refine search results with metadata filters:

```json
{
  "query": "deployment guide",
  "filters": {
    "source": "docs",
    "tags": { "$in": ["production", "kubernetes"] },
    "date": { "$gte": "2026-01-01" }
  }
}
```

## Best Practices

1. **Use specific queries** for better results
2. **Apply filters** to narrow search scope
3. **Adjust threshold** based on precision needs
4. **Use hybrid mode** for production deployments
5. **Monitor search quality** with feedback collection
6. **Re-index after** large document updates
