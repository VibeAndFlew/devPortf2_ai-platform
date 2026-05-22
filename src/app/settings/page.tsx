"use client"
import { useState } from "react"
import { Settings, Key, Cpu, CreditCard, Users, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const settingsTabs = [
  { value: "general", label: "General", icon: Settings },
  { value: "api-keys", label: "API Keys", icon: Key },
  { value: "models", label: "Models", icon: Cpu },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "team", label: "Team", icon: Users },
]

export default function SettingsPage() {
  const [showKey, setShowKey] = useState(false)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your platform configuration</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="w-full justify-start h-auto p-1 gap-1 bg-transparent border-b rounded-none">
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none rounded-lg px-4 py-2"
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-4">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-sm">Profile Settings</CardTitle>
              <CardDescription className="text-xs">Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Full Name</Label>
                  <Input defaultValue="Vibhanshu Buldeo" className="h-9" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Email</Label>
                  <Input defaultValue="v.buldeo@nova-ai.io" className="h-9" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-sm">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Always enabled for this platform</p>
                </div>
                <Switch defaultChecked disabled />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Stream Responses</p>
                  <p className="text-xs text-muted-foreground">Show AI responses as they generate</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Auto-save Prompts</p>
                  <p className="text-xs text-muted-foreground">Automatically save prompt edits</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="mt-6 space-y-4">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-sm">API Keys</CardTitle>
              <CardDescription className="text-xs">Manage your API keys for external access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Production', 'Staging', 'Development'].map((env) => (
                <div key={env} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm font-medium">{env} Key</p>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs text-muted-foreground">
                        {showKey ? `nv-${env.toLowerCase()}-${'x'.repeat(40)}` : `nv-${env.toLowerCase()}-${'x'.repeat(40)}`}
                      </code>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowKey(!showKey)}>
                      {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs">Rotate</Button>
                  </div>
                </div>
              ))}
              <Button size="sm" className="mt-2">
                <Key className="h-4 w-4 mr-2" />
                Generate New Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="mt-6 space-y-4">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-sm">Model Configuration</CardTitle>
              <CardDescription className="text-xs">Configure available AI models</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'GPT-4', provider: 'OpenAI', status: 'Active', latency: '1.2s' },
                { name: 'Claude 4', provider: 'Anthropic', status: 'Active', latency: '1.8s' },
                { name: 'NOVA Pro', provider: 'Nova AI', status: 'Active', latency: '0.9s' },
                { name: 'NOVA Lite', provider: 'Nova AI', status: 'Beta', latency: '0.5s' },
              ].map((model) => (
                <div key={model.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{model.name}</p>
                      <p className="text-xs text-muted-foreground">{model.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{model.latency}</span>
                    <Badge variant={model.status === 'Active' ? 'success' : 'warning'}>{model.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-4">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-sm">Billing Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-primary">$249</p>
                  <p className="text-xs text-muted-foreground">Monthly Spend</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold text-emerald-400">1.4M</p>
                  <p className="text-xs text-muted-foreground">Tokens Used</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 text-center">
                  <p className="text-2xl font-bold">Pro</p>
                  <p className="text-xs text-muted-foreground">Current Plan</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6 space-y-4">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle className="text-sm">Team Members</CardTitle>
              <CardDescription className="text-xs">Manage team access and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Vibhanshu Buldeo', email: 'v.buldeo@nova-ai.io', role: 'CEO & Founder' },
                { name: 'Anika Sharma', email: 'anika@nova-ai.io', role: 'Editor' },
                { name: 'Marcus Rivera', email: 'marcus@nova-ai.io', role: 'Viewer' },
              ].map((member) => (
                <div key={member.email} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{member.role}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Badge({ variant, className, children }: { variant: 'success' | 'warning' | 'secondary' | 'default'; className?: string; children: React.ReactNode }) {
  const colors = {
    success: 'bg-emerald-500/20 text-emerald-400',
    warning: 'bg-amber-500/20 text-amber-400',
    secondary: 'bg-secondary text-secondary-foreground',
    default: 'bg-primary text-primary-foreground',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[variant]} ${className || ''}`}>
      {children}
    </span>
  )
}
