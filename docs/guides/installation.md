# Installation Guide

## System Requirements

- **Node.js:** >= 18.17.0 (LTS recommended)
- **npm:** >= 9.0.0
- **RAM:** Minimum 2GB, recommended 4GB+
- **Disk:** Minimum 500MB free
- **OS:** macOS, Linux, or Windows (via WSL2)

## Standard Installation

```bash
# Clone repository
git clone https://github.com/novalabs/nova-ai-workflow.git
cd nova-ai-workflow

# Install dependencies
npm install --legacy-peer-deps

# Configure environment
cp .env.example .env.local

# Start development server
npm run dev
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Docker Installation

### Using Docker Compose (Recommended)

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f
```

### Using Docker

```bash
docker build -t nova-ai .
docker run -p 4003:4003 \
  -e DATABASE_URL=postgresql://postgres:postgres@host.docker.internal:5432/nova \
  -e OPENAI_API_KEY=sk-... \
  nova-ai
```

## Database Setup

### PostgreSQL

NOVA requires PostgreSQL 16+ with pgvector extension:

```sql
CREATE EXTENSION vector;
CREATE DATABASE nova;
```

### Redis

Redis 7+ is required for caching and session management:

```bash
docker run -d --name nova-redis -p 6379:6379 redis:7-alpine
```

## Configuration

All configuration is managed through environment variables. See [Environment Reference](../reference/configuration.md) for the complete list.

## Verification

Run the type checker and linter to verify your installation:

```bash
npm run typecheck
npm run lint
```

## Troubleshooting

### Common Issues

**"Module not found" errors:**
Run `npm install --legacy-peer-deps` to ensure all dependencies are installed.

**Port 4003 is already in use:**
Change the port in `package.json` or set the `PORT` environment variable.

**Database connection refused:**
Ensure PostgreSQL is running and `DATABASE_URL` is correctly set.

**OpenAI API errors:**
Verify `OPENAI_API_KEY` is set correctly in `.env.local`.
