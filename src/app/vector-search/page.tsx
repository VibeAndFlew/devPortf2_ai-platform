"use client"
import { useState } from "react"
import { Search, SlidersHorizontal, Clock, Database, FileText, BookOpen, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SearchResult {
  id: string
  title: string
  content: string
  type: string
  relevance: number
  source: string
  lastUpdated: string
}

const mockResults: SearchResult[] = [
  { id: 'r1', title: 'GPT-4 Technical Report', content: 'Full technical report detailing GPT-4 architecture, capabilities, and safety evaluations', type: 'document', relevance: 0.97, source: 'arxiv.org', lastUpdated: '2026-05-20' },
  { id: 'r2', title: 'Vector Search Implementation Guide', content: 'Step-by-step guide to implementing vector search with HNSW indexes and hybrid ranking', type: 'article', relevance: 0.94, source: 'pinecone.io', lastUpdated: '2026-05-19' },
  { id: 'r3', title: 'Transformer from Scratch - PyTorch', content: 'PyTorch implementation of a transformer model with multi-head attention', type: 'code', relevance: 0.89, source: 'github.com', lastUpdated: '2026-05-17' },
  { id: 'r4', title: 'RAG System Design Patterns', content: 'Architecture patterns for building production RAG systems with routing and caching', type: 'article', relevance: 0.85, source: 'medium.com', lastUpdated: '2026-05-15' },
  { id: 'r5', title: 'Fine-tuning LLMs with LoRA', content: 'Practical guide to parameter-efficient fine-tuning using Low-Rank Adaptation', type: 'article', relevance: 0.82, source: 'huggingface.co', lastUpdated: '2026-05-13' },
  { id: 'r6', title: 'Python AsyncIO Best Practices', content: 'Guide to writing efficient async Python code with asyncio and aiohttp', type: 'document', relevance: 0.78, source: 'docs.python.org', lastUpdated: '2026-05-14' },
]

const typeIcons: Record<string, React.ElementType> = {
  document: FileText,
  article: BookOpen,
  code: Database,
}

export default function VectorSearchPage() {
  const [query, setQuery] = useState("")
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    if (query.trim()) setSearched(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Vector Search</h1>
        <p className="text-sm text-muted-foreground">Semantic search across your knowledge base</p>
      </div>

      <div className="glass-panel rounded-xl p-6 glow-border">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">Semantic Search</label>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search using natural language..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-9 h-10"
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-32 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
              <SelectItem value="code">Code</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {searched && (
          <p className="text-xs text-muted-foreground">
            6 results · 0.42s
          </p>
        )}
      </div>

      {!searched ? (
        <Card className="glass-panel">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Enter a query to search across your knowledge base</p>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[calc(100vh-24rem)]">
          <div className="space-y-3">
            {mockResults.map((result) => {
              const Icon = typeIcons[result.type] || FileText
              return (
                <Card key={result.id} className="glass-panel hover:glow-border transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-sm">{result.title}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{result.content}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="flex items-center gap-1">
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: result.relevance > 0.9 ? '#22c55e' : result.relevance > 0.8 ? '#eab308' : '#7c7c9a' }}
                              />
                              <span className="text-xs font-medium">{Math.round(result.relevance * 100)}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                          <Badge variant="secondary" className="text-[10px]">{result.type}</Badge>
                          <span className="flex items-center gap-1">
                            <ExternalLink className="h-3 w-3" />
                            {result.source}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {result.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <div className="h-1.5 rounded-full bg-primary/20 flex-1" style={{ width: 60 }}>
                          <div className="h-full rounded-full bg-primary" style={{ width: `${result.relevance * 100}%` }} />
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
