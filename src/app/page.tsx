"use client"
import { Sparkles, Workflow, Bot, Library, FileText, Gauge, Zap, ArrowUp, ArrowDown, MessageSquare, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { kpiData, mockWorkflows, mockAgents, mockChatMessages, mockKnowledge } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="glass-panel rounded-xl p-4 flex items-center gap-3 glow-border">
        <Sparkles className="h-5 w-5 text-primary shrink-0" />
        <Input
          placeholder="Ask anything..."
          className="border-0 bg-transparent text-base placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button size="sm" className="shrink-0">
          <Zap className="h-4 w-4 mr-1" />
          Search
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <KPICard icon={Workflow} label="Active Workflows" value={kpiData.activeWorkflows} trend={null} />
        <KPICard icon={Bot} label="Online Agents" value={kpiData.onlineAgents} trend={null} />
        <KPICard icon={Library} label="Knowledge Items" value={kpiData.knowledgeItems} trend={null} />
        <KPICard icon={FileText} label="Total Prompts" value={kpiData.totalPrompts} trend={null} />
        <KPICard icon={Gauge} label="Avg Response" value={`${kpiData.avgResponseTime}s`} trend={kpiData.responseTimeTrend} down />
        <KPICard icon={Zap} label="Tokens Today" value="1.45M" trend={kpiData.tokensTrend} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-1 glass-panel">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Recent Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockChatMessages.filter(m => m.role === 'user').slice(0, 5).map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary/50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{msg.content}</p>
                  <p className="text-xs text-muted-foreground">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                </div>
                <Badge variant="info" className="text-[10px]">{msg.model}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-1 glass-panel">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Workflow className="h-4 w-4 text-primary" />
              Active Workflows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockWorkflows.filter(w => w.status === 'active').slice(0, 4).map((wf) => (
              <div key={wf.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm truncate">{wf.name}</p>
                    <p className="text-xs text-muted-foreground">{wf.steps} steps · {wf.lastRun}</p>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 shrink-0">{wf.successRate}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-1 glass-panel">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockAgents.slice(0, 5).map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`relative flex h-2 w-2 ${agent.status === 'online' ? 'text-emerald-500' : agent.status === 'training' ? 'text-amber-500' : agent.status === 'error' ? 'text-red-500' : 'text-muted-foreground'}`}>
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75 ${agent.status !== 'online' ? 'hidden' : ''}`} />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                  </span>
                  <div>
                    <p className="text-sm">{agent.name}</p>
                    <p className="text-xs text-muted-foreground">{agent.totalRequests.toLocaleString()} requests</p>
                  </div>
                </div>
                <Badge variant={agent.status === 'online' ? 'success' : agent.status === 'training' ? 'warning' : agent.status === 'error' ? 'destructive' : 'secondary'} className="text-[10px]">
                  {agent.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Library className="h-4 w-4 text-primary" />
            Knowledge Base Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-2xl font-bold text-primary">{mockKnowledge.length}</p>
              <p className="text-xs text-muted-foreground">Total Items</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-2xl font-bold text-emerald-400">{mockKnowledge.filter(k => k.status === 'indexed').length}</p>
              <p className="text-xs text-muted-foreground">Indexed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-2xl font-bold text-amber-400">{mockKnowledge.filter(k => k.status === 'processing').length}</p>
              <p className="text-xs text-muted-foreground">Processing</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-2xl font-bold text-red-400">{mockKnowledge.filter(k => k.status === 'failed').length}</p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function KPICard({ icon: Icon, label, value, trend, down }: { icon: React.ElementType; label: string; value: string | number; trend: string | null; down?: boolean }) {
  return (
    <Card className="glass-panel">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-4 w-4 text-primary/60" />
          {trend && (
            <div className={`flex items-center gap-1 text-xs ${down ? 'text-emerald-400' : 'text-amber-400'}`}>
              {down ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
              {trend}
            </div>
          )}
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </CardContent>
    </Card>
  )
}
