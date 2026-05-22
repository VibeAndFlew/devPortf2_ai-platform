"use client"
import { useState } from "react"
import { Plus, Search, Tag, Hash, User, Clock, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { mockPrompts } from "@/lib/mock-data"

export default function PromptsPage() {
  const [search, setSearch] = useState("")

  const filtered = mockPrompts.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search))
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Prompt Studio</h1>
          <p className="text-sm text-muted-foreground">Craft, version, and manage prompts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Prompt
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search prompts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Models</SelectItem>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="claude-4">Claude 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((prompt) => (
          <Card key={prompt.id} className="glass-panel hover:glow-border transition-all group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {prompt.name}
                    <Badge variant="secondary" className="text-[10px]">v{prompt.version}</Badge>
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="info" className="text-[10px]">{prompt.model}</Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 mb-3">
                <pre className="text-xs font-mono whitespace-pre-wrap line-clamp-4 text-muted-foreground">
                  {prompt.content}
                </pre>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <ZapIcon className="h-3 w-3" />
                  {prompt.temperature}
                </span>
                <span className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  {prompt.maxTokens}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {prompt.author.split('@')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {prompt.updatedAt}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {prompt.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                ))}
                {prompt.variables.map((v) => (
                  <Badge key={v} variant="outline" className="text-[10px] text-primary border-primary/30">
                    {'{{'}{v}{'}}'}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
