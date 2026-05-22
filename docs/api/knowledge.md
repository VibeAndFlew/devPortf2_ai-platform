# Knowledge Base API

The Knowledge Base API provides endpoints for document ingestion, indexing, and retrieval for RAG (Retrieval-Augmented Generation).

## Base URL

```
http://localhost:4003/api/knowledge
```

## Endpoints

### GET /api/knowledge

List all documents in the knowledge base.

### POST /api/knowledge

Ingest a new document.

**Request Body:**

```json
{
  "title": "System Architecture Guide",
  "content": "Full document content...",
  "source": "upload",
  "type": "markdown",
  "metadata": {
    "author": "Engineering Team",
    "version": "2.1",
    "tags": ["architecture", "system-design", "reference"]
  },
  "chunking": {
    "strategy": "semantic",
    "maxChunkSize": 1000,
    "overlap": 200
  }
}
```

**Supported source types:**

| Source | Description |
|--------|-------------|
| `upload` | Direct file upload |
| `url` | Web page scraping |
| `api` | API data ingestion |
| `github` | GitHub repository import |
| `notion` | Notion workspace import |

### GET /api/knowledge/:id

Retrieve a document with its chunks and metadata.

### DELETE /api/knowledge/:id

Delete a document and its embeddings.

### POST /api/knowledge/search

Search the knowledge base using hybrid search.

**Request Body:**

```json
{
  "query": "How does the authentication system work?",
  "mode": "hybrid",
  "limit": 10,
  "minScore": 0.7,
  "filters": {
    "tags": ["security", "authentication"]
  }
}
```

**Search modes:**

| Mode | Description |
|------|-------------|
| `vector` | Pure semantic similarity search |
| `keyword` | Traditional keyword/full-text search |
| `hybrid` | Combined vector + keyword with re-ranking |

### POST /api/knowledge/:id/reindex

Re-index a document's embeddings.

### GET /api/knowledge/stats

Get knowledge base statistics (document count, chunk count, storage usage).

## Chunking Strategies

| Strategy | Description |
|----------|-------------|
| `fixed` | Fixed-size chunks with overlap |
| `semantic` | Semantic boundary detection |
| `recursive` | Recursive character splitting |
| `code` | Code-aware chunking (preserves functions) |

## Embedding Models

| Model | Dimensions | Provider |
|-------|-----------|----------|
| `text-embedding-3-small` | 1536 | OpenAI |
| `text-embedding-3-large` | 3072 | OpenAI |
| `embed-multilingual-v3` | 1024 | Cohere |
