# Configuration Reference

## Environment Variables

### Application

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_APP_URL` | Yes | — | Public URL of the application |
| `NEXT_PUBLIC_API_URL` | Yes | — | Backend API URL |
| `NEXT_PUBLIC_AI_MODEL` | No | `gpt-4o` | Default AI model |

### Authentication

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `AUTH_SECRET` | Yes | — | Secret for JWT/session encryption |
| `AUTH_GITHUB_ID` | No | — | GitHub OAuth client ID |
| `AUTH_GITHUB_SECRET` | No | — | GitHub OAuth client secret |

### Database

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `DATABASE_POOL_MIN` | No | `2` | Minimum pool connections |
| `DATABASE_POOL_MAX` | No | `10` | Maximum pool connections |

### Cache & Queue

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REDIS_URL` | Yes | — | Redis connection string |
| `REDIS_TOKEN` | No | — | Redis authentication token |

### AI Providers

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes* | — | OpenAI API key |
| `ANTHROPIC_API_KEY` | No | — | Anthropic API key |
| `OPENROUTER_API_KEY` | No | — | OpenRouter API key |

*\*At least one AI provider key is required.*

### Features

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | No | `true` | Enable analytics tracking |
| `NEXT_PUBLIC_ENABLE_CRISP` | No | `false` | Enable Crisp chat support |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | — | PostHog analytics key |

## next.config.ts Options

| Option | Value | Description |
|--------|-------|-------------|
| `compress` | `true` | Enable compression |
| `reactStrictMode` | `true` | Strict mode for development |
| `poweredByHeader` | `false` | Remove X-Powered-By header |
| `generateEtags` | `true` | Enable ETag generation |

## Vercel Configuration

See `vercel.json` for:
- Build and install commands
- Security headers
- Redirect rules
- Environment variables
- Deployment regions
