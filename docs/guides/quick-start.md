# Quick Start Guide

Get NOVA AI Workflow OS up and running in under 5 minutes.

## Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0
- Git

## Step 1: Clone & Install

```bash
git clone https://github.com/novalabs/nova-ai-workflow.git
cd nova-ai-workflow
npm install --legacy-peer-deps
```

## Step 2: Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your AI provider API keys:

```env
OPENAI_API_KEY=sk-your-key-here
```

## Step 3: Start Development Server

```bash
npm run dev
```

Open [http://localhost:4003](http://localhost:4003) in your browser.

## Step 4: Try It Out

1. **Chat** — Navigate to `/chat` and send a message
2. **Workflows** — Go to `/workflows` and create a simple pipeline
3. **Knowledge** — Upload a document at `/knowledge`
4. **Playground** — Test different models at `/playground`

## What's Next?

- Explore the full [API Reference](../api/chat.md)
- Learn about [Workflow Builder](workflows.md)
- Configure [AI Agents](agents.md)
- Set up your [Knowledge Base](knowledge.md)
