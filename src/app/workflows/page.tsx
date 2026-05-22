"use client"
import { useState } from "react"
import { Plus, Play, Pause, AlertCircle, Clock, CheckCircle2, Activity, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockWorkflows } from "@/lib/mock-data"
import type { Workflow } from "@/lib/mock-data"

const statusConfig = {
  active: { label: 'Active', color: 'success' as const, icon: CheckCircle2 },
  draft: { label: 'Draft', color: 'secondary' as const, icon: FileIcon },
  paused: { label: 'Paused', color: 'warning' as const, icon: Pause },
  error: { label: 'Error', color: 'destructive' as const, icon: AlertCircle },
}

export default function WorkflowsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = mockWorkflows.filter(w => {
    if (statusFilter !== "all" && w.status !== statusFilter) return false
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-sm text-muted-foreground">Automate and orchestrate AI pipelines</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Input
          placeholder="Search workflows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="NLP">NLP</SelectItem>
            <SelectItem value="Data Processing">Data Processing</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Content">Content</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((wf) => (
          <Card key={wf.id} className="glass-panel hover:glow-border transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${wf.status === 'active' ? 'bg-emerald-500/10' : wf.status === 'error' ? 'bg-red-500/10' : 'bg-muted'}`}>
                    <Activity className={`h-4 w-4 ${wf.status === 'active' ? 'text-emerald-400' : wf.status === 'error' ? 'text-red-400' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{wf.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{wf.description}</p>
                  </div>
                </div>
                <Badge variant={statusConfig[wf.status].color}>{statusConfig[wf.status].label}</Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {wf.steps} steps
                </span>
                <span className="flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  {wf.lastRun}
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  {wf.successRate}% success
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex gap-1.5">
                  {wf.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{wf.avgLatency}ms avg</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-panel">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Run History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-xs">
                  <th className="text-left py-3 px-2">Workflow</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Duration</th>
                  <th className="text-left py-3 px-2">Tokens</th>
                  <th className="text-left py-3 px-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {mockWorkflows.slice(0, 5).map((wf) => (
                  <tr key={wf.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2 font-medium">{wf.name}</td>
                    <td className="py-3 px-2">
                      <Badge variant={statusConfig[wf.status].color} className="text-[10px]">{statusConfig[wf.status].label}</Badge>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{wf.avgLatency}ms</td>
                    <td className="py-3 px-2 text-muted-foreground">{(wf.steps * 500).toLocaleString()}</td>
                    <td className="py-3 px-2 text-muted-foreground">{wf.lastRun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}
