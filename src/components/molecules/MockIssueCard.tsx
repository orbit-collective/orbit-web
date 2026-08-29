import type { LucideIcon } from "lucide-react"

interface MockIssueCardProps {
  icon: LucideIcon
  label: string
  lineWidth: string
}

export function MockIssueCard({ icon: Icon, label, lineWidth }: MockIssueCardProps) {
  return (
    <div className="rounded-md border border-line bg-canvas-hover p-3">
      <span className="inline-flex items-center gap-1 rounded-full border border-line-strong px-2 py-0.5 text-[11px] font-medium text-ink-muted">
        <Icon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
        {label}
      </span>
      <div className="mt-3 h-2 rounded-full bg-line-strong" style={{ width: lineWidth }} />
      <div className="mt-2 flex items-center justify-between">
        <div className="h-2 w-10 rounded-full bg-line" />
        <div className="h-5 w-5 rounded-full border border-line-strong bg-canvas" />
      </div>
    </div>
  )
}
