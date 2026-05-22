"use client"
import { Bot, Cpu, Zap, Clock, Activity, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { mockAgents } from "@/lib/mock-data"

const statusConfig = {
  online: { label: 'Online', color: 'success' as const },
  offline: { label: 'Offline', color: 'secondary' as const },
  training: { label: 'Training', color: 'warning' as const },
  error: { label: 'Error', color: 'destructive' as const },
}

export default function AgentsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agents</h1>
          <p className="text-sm text-muted-foreground">Manage and monitor your AI agents</p>
        </div>
        <Button variant="outline">
          <Bot className="h-4 w-4 mr-2" />
          Deploy Agent
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {mockAgents.map((agent) => (
          <Card key={agent.id} className="glass-panel hover:glow-border transition-all">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${agent.status === 'online' ? 'bg-emerald-500/10' : agent.status === 'training' ? 'bg-amber-500/10' : agent.status === 'error' ? 'bg-red-500/10' : 'bg-muted'}`}>
                    <Bot className={`h-5 w-5 ${agent.status === 'online' ? 'text-emerald-400' : agent.status === 'training' ? 'text-amber-400' : agent.status === 'error' ? 'text-red-400' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{agent.description}</p>
                  </div>
                </div>
                <Badge variant={statusConfig[agent.status].color}>{statusConfig[agent.status].label}</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {agent.capabilities.map((cap) => (
                  <Badge key={cap} variant="secondary" className="text-[10px]">{cap}</Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Cpu className="h-3 w-3" /> Model
                  </p>
                  <p className="text-sm font-medium">{agent.model}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Temp
                  </p>
                  <p className="text-sm font-medium">{agent.temperature}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Activity className="h-3 w-3" /> Requests
                  </p>
                  <p className="text-sm font-medium">{agent.totalRequests.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Avg Response
                  </p>
                  <p className="text-sm font-medium">{agent.avgResponseTime}ms</p>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Memory Usage</span>
                  <span className="text-xs text-muted-foreground">
                    {agent.memory.reduce((a, m) => a + m.items, 0).toLocaleString()} items
                  </span>
                </div>
                <Progress value={Math.min(agent.totalRequests / 1000, 100)} className="h-1.5" />
              </div>

              <div className="flex justify-end mt-3 pt-1 border-t">
                <Button variant="ghost" size="sm">
                  <Settings className="h-3 w-3 mr-1" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
