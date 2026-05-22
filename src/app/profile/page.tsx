"use client"
import { User, Activity, Zap, Clock, Bot, FileText, MessageSquare, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { kpiData, mockChatMessages, mockWorkflows, mockPrompts } from "@/lib/mock-data"

export default function ProfilePage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <Card className="glass-panel">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">VB</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Vibhanshu Buldeo</h1>
              <p className="text-sm text-muted-foreground">v.buldeo@nova-ai.io</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">CEO & Founder</Badge>
                <Badge variant="info">Enterprise Plan</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Joined Mar 2026
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 text-center">
          <MessageSquare className="h-5 w-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">{mockChatMessages.filter(m => m.role === 'user').length}</p>
          <p className="text-xs text-muted-foreground">Conversations</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <Bot className="h-5 w-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">{kpiData.onlineAgents}</p>
          <p className="text-xs text-muted-foreground">Agents Used</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <FileText className="h-5 w-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">{mockPrompts.length}</p>
          <p className="text-xs text-muted-foreground">Prompts Created</p>
        </div>
        <div className="glass-panel rounded-xl p-4 text-center">
          <Zap className="h-5 w-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">{kpiData.tokensToday.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Tokens</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="glass-panel">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              API Usage (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-32">
              {[180, 240, 190, 310, 260, 220, 280].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-primary/40 to-primary transition-all hover:from-primary/60 hover:to-primary"
                    style={{ height: `${(val / 310) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Avg: 240K tokens/day</span>
              <span>Total: 1.68M tokens</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { action: 'Created workflow', item: 'Content Summarization Pipeline', time: '2 hours ago', type: 'workflow' },
              { action: 'Ran prompt', item: 'Code Review Prompt v3', time: '3 hours ago', type: 'prompt' },
              { action: 'Deployed agent', item: 'Code Assistant', time: '5 hours ago', type: 'agent' },
              { action: 'Updated knowledge', item: 'GPT-4 Technical Report', time: '1 day ago', type: 'knowledge' },
              { action: 'Generated API key', item: 'Staging Key', time: '2 days ago', type: 'settings' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div className={`h-2 w-2 rounded-full ${i < 2 ? 'bg-emerald-500' : 'bg-muted-foreground/50'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="text-muted-foreground">{activity.action}</span>
                    {' '}
                    <span className="font-medium">{activity.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" />
            Model Usage Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { model: 'GPT-4', percentage: 45, tokens: '652K', color: 'bg-primary' },
            { model: 'Claude 4', percentage: 30, tokens: '435K', color: 'bg-accent' },
            { model: 'NOVA Ultra', percentage: 18, tokens: '261K', color: 'bg-emerald-500' },
            { model: 'NOVA Pro', percentage: 7, tokens: '101K', color: 'bg-amber-500' },
          ].map((m) => (
            <div key={m.model}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{m.model}</span>
                <span className="text-xs text-muted-foreground">{m.tokens} ({m.percentage}%)</span>
              </div>
              <Progress value={m.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
