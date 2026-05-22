# NOVA AI Design System

## Theme

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#0f0a1a` | Primary background |
| `--foreground` | `#e8e0f0` | Primary text |
| `--card` | `#1a1228` | Card backgrounds |
| `--card-foreground` | `#e8e0f0` | Card text |
| `--popover` | `#1a1228` | Popover backgrounds |
| `--popover-foreground` | `#e8e0f0` | Popover text |
| `--primary` | `#7c3aed` | Primary actions, links |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--secondary` | `#2d1b4e` | Secondary surfaces |
| `--secondary-foreground` | `#c4b5e3` | Text on secondary |
| `--muted` | `#1f1530` | Muted backgrounds |
| `--muted-foreground` | `#9a8ab0` | Muted text |
| `--accent` | `#7c3aed` | Accent elements |
| `--accent-foreground` | `#ffffff` | Text on accent |
| `--destructive` | `#dc2626` | Destructive actions |
| `--destructive-foreground` | `#ffffff` | Text on destructive |
| `--border` | `#2a1a40` | Borders, dividers |
| `--input` | `#2a1a40` | Input borders |
| `--ring` | `#7c3aed` | Focus rings |
| `--radius` | `0.75rem` | Border radius |

### Typography

| Style | Font Size | Weight | Line Height |
|-------|-----------|--------|-------------|
| **h1** | 3rem (48px) | 700 | 1.2 |
| **h2** | 2.25rem (36px) | 700 | 1.25 |
| **h3** | 1.5rem (24px) | 600 | 1.3 |
| **h4** | 1.25rem (20px) | 600 | 1.35 |
| **body** | 1rem (16px) | 400 | 1.6 |
| **body-sm** | 0.875rem (14px) | 400 | 1.5 |
| **caption** | 0.75rem (12px) | 400 | 1.4 |
| **code** | 0.875rem (14px) | 400 | 1.6 |

### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-1` | 0.25rem (4px) |
| `--space-2` | 0.5rem (8px) |
| `--space-3` | 0.75rem (12px) |
| `--space-4` | 1rem (16px) |
| `--space-5` | 1.25rem (20px) |
| `--space-6` | 1.5rem (24px) |
| `--space-8` | 2rem (32px) |
| `--space-10` | 2.5rem (40px) |
| `--space-12` | 3rem (48px) |
| `--space-16` | 4rem (64px) |

## Glass Morphism

The signature visual effect of NOVA AI. Applied via a utility class or component wrapper.

```css
.glass-panel {
  background: rgba(26, 18, 40, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(124, 58, 237, 0.15);
  border-radius: 0.75rem;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(124, 58, 237, 0.1);
}
```

### Variants

- **Light**: Higher opacity, subtle blur — for modals and popovers
- **Standard**: Default glass panel — for cards and sidebars
- **Deep**: Lower opacity, stronger blur — for background overlays

## Component Design Patterns

### Button Variants

| Variant | Background | Hover | Usage |
|---------|-----------|-------|-------|
| `default` | `--primary` | +10% brightness | Primary calls to action |
| `secondary` | `--secondary` | +5% brightness | Secondary actions |
| `outline` | Transparent | `--accent` border | Tertiary actions |
| `ghost` | Transparent | `--muted` | Toolbar actions |
| `destructive` | `--destructive` | +10% brightness | Delete, remove |

### Card Pattern

```tsx
<Card className="glass-panel">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

### Input Pattern

```tsx
<div className="relative">
  <Input
    className="
      bg-[#1a1228]/60 border-[#2a1a40]
      focus:border-[#7c3aed] focus:ring-[#7c3aed]/20
      placeholder:text-[#9a8ab0] text-[#e8e0f0]
      rounded-xl
    "
    placeholder="Search..."
  />
</div>
```

## Animation Specifications

### Duration Tokens

| Token | Duration | Usage |
|-------|----------|-------|
| `--duration-fast` | 150ms | Hover, active states |
| `--duration-normal` | 300ms | Standard transitions |
| `--duration-slow` | 500ms | Panel animations |
| `--duration-enter` | 400ms | Mount animations |

### Easing Tokens

| Token | Easing | Usage |
|-------|--------|-------|
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | Exit animations |
| `--ease-in` | cubic-bezie(0.4, 0, 1, 1) | Enter animations |
| `--ease-spring` | spring( stiffness: 300, damping: 30 ) | Natural movement |

### Common Animations

```tsx
// Page transition
motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}

// Hover lift
motion.div
  whileHover={{ y: -2 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}

// Stagger children
motion.div
  variants={{
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }}
```

## Accessibility

- All interactive elements must be keyboard navigable
- Color contrast ratios must meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Focus indicators must be visible (default ring style)
- ARIA labels on icon-only buttons
- Reduced motion support via `prefers-reduced-motion`
- Semantic HTML structure with proper heading hierarchy

## Icon Usage

Icons from **Lucide React** with consistent sizing:

| Context | Size |
|---------|------|
| Inline text | 16px |
| Button with label | 18px |
| Icon-only button | 20px |
| Navigation | 22px |
| Hero/Feature | 24px+ |

## Responsive Breakpoints

| Breakpoint | Min Width | Target |
|------------|-----------|--------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |
