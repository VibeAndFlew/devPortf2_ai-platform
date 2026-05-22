"use client"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles, ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockChatMessages } from "@/lib/mock-data"
import type { ChatMessage } from "@/lib/mock-data"

const suggestions = [
  "What is the architecture of GPT-4?",
  "Explain RAG in simple terms",
  "Write a Python function to merge sorted arrays",
  "Compare fine-tuning vs prompt engineering",
  "Design a vector search system",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages.slice(0, 4))
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [model, setModel] = useState("gpt-4")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: ChatMessage = {
      id: `m${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
      model,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const responses = mockChatMessages.filter(m => m.role === 'assistant')
      const reply = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { ...reply, id: `m${Date.now()}` }])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div className="flex-1 overflow-hidden" ref={scrollRef}>
        <ScrollArea className="h-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 p-8">
              <div className="p-4 rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">Welcome to NOVA AI</h2>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                Ask anything — code, research, analysis, or creative work.
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-lg w-full">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setInput(s); handleSend() }}
                    className="glass-panel rounded-lg p-3 text-left text-sm hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-6 px-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'glass-panel rounded-bl-md'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-3 mt-1.5 px-1">
                        <span className="text-[10px] text-muted-foreground">{msg.model}</span>
                        {msg.tokens && <span className="text-[10px] text-muted-foreground">{msg.tokens} tokens</span>}
                        {msg.latency && <span className="text-[10px] text-muted-foreground">{msg.latency}ms</span>}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="flex items-center gap-1">
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                            {msg.sources.map((s, i) => (
                              <span key={i} className="text-[10px] text-primary underline cursor-pointer">{s.title}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="glass-panel rounded-2xl rounded-bl-md px-4 py-3">
                    <span className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>

      <div className="border-t p-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-28 h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude-4">Claude 4</SelectItem>
              <SelectItem value="nova-pro">NOVA Pro</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="pr-10 bg-muted/30 border-input/50"
            />
            <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleSend} disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
