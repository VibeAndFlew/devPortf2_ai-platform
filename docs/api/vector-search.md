# Vector Search API

The Vector Search API provides semantic similarity search across indexed documents using embeddings.

## Base URL

```
http://localhost:4003/api/vector-search
```

## Endpoints

### POST /api/vector-search

Execute a vector similarity search.

**Request Body:**

```json
{
  "query": "How do I configure rate limiting?",
  "limit": 20,
  "threshold": 0.75,
  "includeMetadata": true,
  "filters": {
    "source": "docs",
    "tags": {
      "$in": ["configuration", "security"]
    }
  }
}
```

### POST /api/vector-search/hybrid

Execute a hybrid search combining vector similarity with keyword matching.

**Request Body:**

```json
{
  "query": "authentication flow",
  "limit": 20,
  "vectorWeight": 0.7,
  "keywordWeight": 0.3,
  "reranker": "cross-encoder"
}
```

### POST /api/vector-search/embed

Generate an embedding vector for text.

**Request Body:**

```json
{
  "text": "Text to embed...",
  "model": "text-embedding-3-small"
}
```

### GET /api/vector-search/collections

List available vector collections.

### POST /api/vector-search/collections

Create a new vector collection.

### DELETE /api/vector-search/collections/:id

Delete a vector collection and all its embeddings.

## Vector Stores

| Store | Description |
|-------|-------------|
| `pgvector` | PostgreSQL vector extension (built-in) |
| `pinecone` | Managed vector database |
| `weaviate` | Open-source vector database |
| `milvus` | Scalable vector database |

## Distance Metrics

| Metric | Description |
|--------|-------------|
| `cosine` | Cosine similarity (default) |
| `euclidean` | Euclidean distance |
| `dot` | Dot product similarity |
