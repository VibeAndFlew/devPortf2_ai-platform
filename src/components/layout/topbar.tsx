"use client"
import { Sparkles, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Topbar() {
  return (
    <header className="fixed left-56 right-0 top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 backdrop-blur-xl px-4">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-400">NOVA AI Online</span>
        </div>
      </div>

      <div className="flex-1" />

      <Button size="sm" className="gap-1.5">
        <Plus className="h-4 w-4" />
        New Chat
      </Button>

      <Select defaultValue="gpt-4">
        <SelectTrigger className="w-36 h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt-4">GPT-4</SelectItem>
          <SelectItem value="claude-4">Claude 4</SelectItem>
          <SelectItem value="nova-pro">NOVA Pro</SelectItem>
          <SelectItem value="nova-lite">NOVA Lite</SelectItem>
        </SelectContent>
      </Select>

      <Avatar className="h-8 w-8 cursor-pointer">
        <AvatarFallback className="bg-primary/20 text-primary text-xs">U</AvatarFallback>
      </Avatar>
    </header>
  )
}
