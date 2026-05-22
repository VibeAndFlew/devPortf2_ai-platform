"use client"
import { useState } from "react"
import { Send, Bot, User, Settings2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { ChatMessage } from "@/lib/mock-data"

export default function PlaygroundPage() {
  const [model, setModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant.")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

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
      const aiMsg: ChatMessage = {
        id: `m${Date.now()}`,
        role: "assistant",
        content: `This is a simulated response using **${model}**.\n\nTemperature: ${temperature}\nMax Tokens: ${maxTokens}\n\nYour message was:\n> ${input}`,
        timestamp: new Date().toISOString(),
        model,
        tokens: Math.floor(Math.random() * 500) + 50,
        latency: Math.floor(Math.random() * 2000) + 300,
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="w-72 border-r p-4 space-y-4 flex flex-col shrink-0">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Parameters</h2>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="claude-4">Claude 4</SelectItem>
              <SelectItem value="nova-pro">NOVA Pro</SelectItem>
              <SelectItem value="nova-lite">NOVA Lite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Temperature: {temperature}</Label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Max Tokens</Label>
          <Input
            type="number"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
            className="h-9 text-xs"
          />
        </div>

        <Separator />

        <div className="space-y-2 flex-1">
          <Label className="text-xs text-muted-foreground">System Prompt</Label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full flex-1 min-h-[120px] rounded-md border border-input bg-transparent p-3 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="max-w-2xl mx-auto py-6 px-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <Bot className="h-12 w-12 text-primary/30 mb-4" />
                  <h3 className="text-lg font-medium mb-1">Playground Ready</h3>
                  <p className="text-sm text-muted-foreground">Configure parameters and send a message to test</p>
                </div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'glass-panel rounded-bl-md'}`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-3 mt-1.5 px-1">
                        <span className="text-[10px] text-muted-foreground">{msg.model}</span>
                        <span className="text-[10px] text-muted-foreground">{msg.tokens} tokens</span>
                        <span className="text-[10px] text-muted-foreground">{msg.latency}ms</span>
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
          </ScrollArea>
        </div>

        <div className="border-t p-4">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Test your prompt..."
                className="pr-10 bg-muted/30"
              />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
