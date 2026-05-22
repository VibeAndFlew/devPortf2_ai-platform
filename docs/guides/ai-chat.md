# AI Chat Guide

The AI Chat interface provides a multi-model conversation experience with streaming responses, context management, and message history.

## Features

### Multi-Model Support
Switch between models mid-conversation:
- GPT-4o, GPT-4, GPT-3.5 Turbo (OpenAI)
- Claude 3.5 Sonnet, Claude 3 Opus (Anthropic)
- Custom models via OpenRouter

### Streaming Responses
Responses are streamed in real-time with:
- Token-by-token display
- Markdown rendering
- Code syntax highlighting
- LaTeX math rendering

### Conversation Management
- Create and name conversations
- Search conversation history
- Export conversations (JSON, Markdown, PDF)
- Delete or archive conversations

### Message Actions
- Copy message content
- Edit and resend messages
- Regenerate responses
- Fork conversations from any point
- Rate responses (thumbs up/down)

### Context Management
- Automatic context window management
- Manual context trimming
- System prompt customization per conversation
- File and image attachment support

## Interface

The chat interface consists of:
1. **Conversation sidebar** — list of conversations with search
2. **Message area** — streaming conversation display
3. **Input area** — message composition with model selector
4. **Settings panel** — model parameters and system prompt

## Tips

- Use clear, specific prompts for better responses
- Attach relevant context documents for RAG-enhanced responses
- Adjust temperature for creativity vs. precision trade-offs
- Use system prompts to set behavior and constraints
