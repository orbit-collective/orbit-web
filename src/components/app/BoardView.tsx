import { CircleCheck, CircleDashed, GitPullRequest, SignalHigh, SignalLow, SignalMedium } from "lucide-react"
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

type Group = "priority" | "status"

interface ColumnSpec {
  key: string
  title: string
  subtitle?: string
  icon: LucideIcon
  color: string
  /** Priority columns tint their header; status columns do not (see the note on Column). */
  tinted: boolean
  issues: Issue[]
}

const STATUS_COLUMNS = [
  {
    key: "todo",
    title: "To Do",
    subtitle: "Not started yet",
    icon: GitPullRequest,
    color: "#2196f3",
    names: ["Open", "To do"],
  },
  {
    key: "progress",
    title: "In Progress",
    subtitle: "Being worked on",
    icon: CircleDashed,
    color: "#8844da",
    names: ["Fixing", "In review"],
  },
  {
    key: "done",
    title: "Done",
    subtitle: "Completed",
    icon: CircleCheck,
    color: "#757575",
    names: ["Done"],
  },
]

function columnsFor(group: Group): ColumnSpec[] {
  if (group === "priority") {
    return [priorities.high, priorities.medium, priorities.low].map((priority) => ({
      key: priority.name,
      title: priority.name,
      icon: COLUMN_ICONS[priority.icon],
      color: priority.color,
      tinted: true,
      issues: issues.filter((issue) => issue.priority === priority),
    }))
  }

  return STATUS_COLUMNS.map((column) => ({
    ...column,
    tinted: false,
    issues: issues.filter((issue) => column.names.includes(issue.status.name)),
  }))
}

/** "#f44336" -> "rgba(244, 67, 54, 0.12)": Orbit tints a column with its own colour. */
function tint(hex: string, alpha: number): string {
  const value = Number.parseInt(hex.slice(1), 16)
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`
}

/** One issue card, as the board and the issue-adding step draw it. */
export function IssueCard({ issue }: { issue: Issue }) {
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

/**
 * A board column. Orbit tints the header of a priority column with its colour;
 * a status column's tint is written as an invalid colour in the app (a hex
 * suffix on a CSS variable), so the browser drops it and the header stays
 * plain. That is what people see, so that is what this draws.
 */
function Column({ column }: { column: ColumnSpec }) {
  const Icon = column.icon

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
        style={
          column.tinted
            ? { background: `linear-gradient(${tint(column.color, 0.07)} 0%, transparent 100%)` }
            : undefined
        }
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{
                color: column.color,
                backgroundColor: column.tinted ? tint(column.color, 0.12) : undefined,
              }}
            >
              <Icon size={17} />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-[13px] leading-tight font-semibold text-[var(--text-color)]">
                {column.title}
              </h3>
              {column.subtitle ? (
                <p className="truncate text-[11px] leading-tight text-[var(--text-muted-color)]">
                  {column.subtitle}
                </p>
              ) : null}
            </div>
          </div>
          <span
            className={cn(
              "relative ml-auto inline-flex shrink-0 items-center justify-center rounded-full border px-2 py-[2px] text-[10px] font-semibold whitespace-nowrap tabular-nums",
              column.tinted ? "bg-[var(--bg-light-color)]" : "bg-transparent",
            )}
            style={{ color: column.color, borderColor: tint(column.color, 0.2) }}
          >
            {column.issues.length}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-3">
        {column.issues.map((issue) => (
          <IssueCard key={issue.number} issue={issue} />
        ))}
      </div>
    </div>
  )
}

interface BoardViewProps {
  groupBy?: Group
  /** How many columns to draw, from the left. */
  columns?: number
}

/** The project's Board view, grouped by priority (Orbit's default) or by status. */
export function BoardView({ groupBy = "priority", columns = 3 }: BoardViewProps) {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--bg-color)]">
      <div className="flex items-center px-6 pt-6">
        <div className="inline-flex items-center gap-1 rounded-lg border border-[var(--border-color)] bg-[var(--surface-color)] p-1">
          {(["priority", "status"] as const).map((group) => (
            <span
              key={group}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium capitalize",
                group === groupBy
                  ? "bg-[var(--bg-light-color-hover)] text-[var(--text-color)]"
                  : "text-[var(--text-muted-color)]",
              )}
            >
              {group}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 gap-5 overflow-hidden p-6">
        {columnsFor(groupBy)
          .slice(0, columns)
          .map((column) => (
            <Column key={column.key} column={column} />
          ))}
      </div>
    </div>
  )
}
