# Knowledge Base Guide

The Knowledge Base provides document indexing and retrieval for RAG (Retrieval-Augmented Generation).

## Adding Documents

### Supported Formats

| Format | Extension | Notes |
|--------|-----------|-------|
| Markdown | `.md` | With frontmatter support |
| PDF | `.pdf` | Text extraction |
| Plain Text | `.txt` | UTF-8 encoded |
| Code | `.ts, .js, .py` | Language-aware chunking |
| HTML | `.html, .htm` | Content extraction |
| JSON | `.json` | Structured data indexing |
| CSV | `.csv` | Tabular data |

### Ingestion Methods

1. **Upload** — Drag and drop files
2. **URL** — Provide a URL for web scraping
3. **API** — Programmatic ingestion
4. **GitHub** — Import from repositories
5. **Sync** — Scheduled synchronization

## Document Processing

### Chunking
Documents are split into chunks for efficient retrieval:

| Strategy | Best For |
|----------|----------|
| Fixed-size | Simple documents |
| Semantic | Natural language text |
| Recursive | Mixed content |
| Code-aware | Source code files |

### Embedding
Each chunk is embedded using a configured embedding model and stored in the vector database for semantic search.

## Retrieval

### Search Modes
- **Vector Search** — Semantic similarity
- **Keyword Search** — Exact match and fuzzy search
- **Hybrid Search** — Combined with re-ranking

### Context Assembly
Retrieved chunks are assembled into context for the LLM with:
- Relevance scoring
- Deduplication
- Token budget management
- Citation tracking

## Best Practices

1. **Organize documents** with clear titles and tags
2. **Use descriptive metadata** for filtering
3. **Monitor chunk quality** — review and adjust chunking
4. **Test retrieval** with sample queries
5. **Update regularly** — keep knowledge current
6. **Remove outdated** documents to maintain relevance
