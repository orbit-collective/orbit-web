import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

interface MockupFrameProps {
  children: ReactNode
  className?: string
}

export function MockupFrame({ children, className }: MockupFrameProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-surface", className)}>
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
      </div>
      {children}
    </div>
  )
}
