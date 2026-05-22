"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, LayoutDashboard, MessageSquare, Workflow, Bot, Library, FileText, Play, Search, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/chat", label: "AI Chat", icon: MessageSquare },
  { href: "/workflows", label: "Workflows", icon: Workflow },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/knowledge", label: "Knowledge Base", icon: Library },
  { href: "/prompts", label: "Prompt Studio", icon: FileText },
  { href: "/playground", label: "Playground", icon: Play },
  { href: "/vector-search", label: "Vector Search", icon: Search },
]

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/profile", label: "Profile", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-56 flex-col border-r bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-lg font-bold text-transparent">
          NOVA
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
              {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-3 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm shadow-primary/5"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
