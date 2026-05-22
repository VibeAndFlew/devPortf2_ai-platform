"use client"
import { useState } from "react"
import { Search, FileText, Code, BookOpen, Database, CheckCircle2, Clock, AlertCircle, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { mockKnowledge } from "@/lib/mock-data"
import type { KnowledgeItem } from "@/lib/mock-data"

const typeIcons = {
  document: FileText,
  code: Code,
  article: BookOpen,
  dataset: Database,
}

const statusConfig = {
  indexed: { label: 'Indexed', color: 'success' as const, icon: CheckCircle2 },
  processing: { label: 'Processing', color: 'warning' as const, icon: Clock },
  failed: { label: 'Failed', color: 'destructive' as const, icon: AlertCircle },
}

export default function KnowledgePage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = mockKnowledge.filter(k => {
    if (typeFilter !== "all" && k.type !== typeFilter) return false
    if (search && !k.title.toLowerCase().includes(search.toLowerCase()) && !k.content.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        <p className="text-sm text-muted-foreground">Indexed documents, code, and datasets</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search knowledge base..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={setTypeFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="article">Articles</TabsTrigger>
          <TabsTrigger value="dataset">Datasets</TabsTrigger>
        </TabsList>

        <TabsContent value={typeFilter} className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <Card className="glass-panel">
              <CardContent className="p-8 text-center text-muted-foreground">
                No items found
              </CardContent>
            </Card>
          ) : (
            filtered.map((item) => {
              const Icon = typeIcons[item.type]
              const status = statusConfig[item.status]
              return (
                <Card key={item.id} className="glass-panel hover:glow-border transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="p-2 rounded-lg bg-muted shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.content}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span>{item.source}</span>
                            <span>{item.chunks} chunks</span>
                            <span>{item.size}</span>
                            <span>{item.embeddings}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={status.color} className="text-[10px] flex items-center gap-1">
                          <status.icon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                      <span className="ml-auto text-[10px] text-muted-foreground">{item.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
