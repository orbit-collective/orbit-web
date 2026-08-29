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
        "flex h-7 w-7 items-center justify-center rounded-full border border-line-strong bg-canvas-hover text-ink sm:h-9 sm:w-9",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}
