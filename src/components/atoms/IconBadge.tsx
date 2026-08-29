import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"

interface IconBadgeProps {
  icon: LucideIcon
  className?: string
}

export function IconBadge({ icon: Icon, className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-canvas-hover text-ink",
        className,
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}
