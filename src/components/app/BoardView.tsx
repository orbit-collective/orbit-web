import { SignalHigh, SignalLow, SignalMedium } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"
import { issues, priorities } from "./data"
import type { Issue, Priority } from "./data"
import { Avatar, LabelChip, StatusBadge } from "./parts"

const COLUMN_ICONS: Record<Priority["icon"], LucideIcon> = {
  SignalHigh,
  SignalMedium,
  SignalLow,
}

/** "#f44336" -> "rgba(244, 67, 54, 0.12)": Orbit tints a column with its own colour. */
function tint(hex: string, alpha: number): string {
  const value = Number.parseInt(hex.slice(1), 16)
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`
}

function Card({ issue }: { issue: Issue }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-light-color)] p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-sm"
            style={{ backgroundColor: issue.priority.color }}
          />
          <span className="truncate text-[11px] font-semibold text-[var(--text-muted-color)]">
            {issue.assignee ? issue.assignee.name : "Unassigned"}
          </span>
        </div>
        <span className="shrink-0 font-mono text-[10px] font-medium text-[var(--text-muted-color)]">
          #{issue.number}
        </span>
      </div>
      <h4
        className={cn(
          "line-clamp-2 text-[13px] leading-snug font-medium text-[var(--text-color)]",
          issue.closed && "text-[var(--text-muted-color)] line-through",
        )}
      >
        {issue.title}
      </h4>
      <div className="relative flex items-center gap-1.5">
        {issue.labels.map((label) => (
          <LabelChip key={label.name} label={label} className="text-[9px] py-0.5" />
        ))}
      </div>
      <div className="mt-0.5 flex items-center justify-between gap-2 border-t border-[var(--border-color)] pt-2.5">
        <StatusBadge status={issue.status} />
        <Avatar person={issue.assignee} size="sm" />
      </div>
    </div>
  )
}

function Column({ priority }: { priority: Priority }) {
  const Icon = COLUMN_ICONS[priority.icon]
  const cards = issues.filter((issue) => issue.priority === priority)

  return (
    <div
      className="flex w-[336px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-color-hover)",
        boxShadow: "rgba(0, 0, 0, 0.5) 0px 4px 10px -6px",
      }}
    >
      <div
        className="flex items-center gap-3 border-b border-[var(--border-color)] px-4 py-3.5"
        style={{ background: `linear-gradient(${tint(priority.color, 0.07)} 0%, transparent 100%)` }}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ color: priority.color, backgroundColor: tint(priority.color, 0.12) }}
            >
              <Icon size={17} />
            </div>
            <h3 className="truncate text-[13px] leading-tight font-semibold text-[var(--text-color)]">
              {priority.name}
            </h3>
          </div>
          <span
            className="relative ml-auto inline-flex shrink-0 items-center justify-center rounded-full border bg-[var(--bg-light-color)] px-2 py-[2px] text-[10px] font-semibold whitespace-nowrap tabular-nums"
            style={{ color: priority.color, borderColor: tint(priority.color, 0.2) }}
          >
            {cards.length}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        {cards.map((issue) => (
          <Card key={issue.number} issue={issue} />
        ))}
      </div>
    </div>
  )
}

/** The project's Board view, grouped by priority like Orbit's default. */
export function BoardView() {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--bg-color)]">
      <div className="flex items-center px-6 pt-6">
        <div className="inline-flex items-center gap-1 rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-1">
          <span className="rounded-md bg-[var(--bg-light-color-hover)] px-3 py-1 text-xs font-medium text-[var(--text-color)]">
            Priority
          </span>
          <span className="rounded-md px-3 py-1 text-xs font-medium text-[var(--text-muted-color)]">
            Status
          </span>
        </div>
      </div>
      <div className="flex flex-1 gap-5 overflow-hidden p-6">
        <Column priority={priorities.high} />
        <Column priority={priorities.medium} />
        <Column priority={priorities.low} />
      </div>
    </div>
  )
}
