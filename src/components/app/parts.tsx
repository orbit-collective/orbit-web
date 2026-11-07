import { Bug, Clock, Rocket, SignalHigh, SignalLow, SignalMedium, SquareCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"
import type { Label, Person, Priority, Status, IssueType } from "./data"

/*
 * Small pieces of Orbit's interface. The class lists are copied from the
 * real components (IssueTypeBadge, WorkflowStatusBadge, LabelBadge,
 * PriorityIcon, Avatar), so a change there is a one-line change here.
 */

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--border-color)] bg-transparent font-medium text-[var(--text-color)]"

const TYPE_ICONS: Record<IssueType["icon"], LucideIcon> = {
  Bug,
  SquareCheck,
  Rocket,
}

export function TypeBadge({ type, className }: { type: IssueType; className?: string }) {
  const Icon = TYPE_ICONS[type.icon]
  return (
    <span className={cn(pill, "px-2 py-0.5 text-xs", className)}>
      <Icon size={12} color={type.color} className="shrink-0" />
      {type.name}
    </span>
  )
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn(pill, "px-2 py-0.5 text-xs", className)}>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: status.color }} />
      {status.name}
    </span>
  )
}

export function LabelChip({ label, className }: { label: Label; className?: string }) {
  return (
    <span className={cn(pill, "shrink-0 px-1.5 text-[10px] whitespace-nowrap", className)}>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: label.color }} />
      <span className="min-w-0 truncate">{label.name}</span>
    </span>
  )
}

const PRIORITY_ICONS: Record<Priority["icon"], LucideIcon> = {
  SignalHigh,
  SignalMedium,
  SignalLow,
}

export function PriorityIcon({ priority, size = 16 }: { priority: Priority; size?: number }) {
  const Icon = PRIORITY_ICONS[priority.icon]
  return (
    <span className="inline-flex items-center">
      <Icon size={size} color={priority.color} />
    </span>
  )
}

const avatarSize = {
  sm: "w-5 h-5 text-[10px]",
  md: "w-6 h-6 text-xs",
  lg: "w-8 h-8 text-sm",
} as const

export function Avatar({ person, size = "md" }: { person: Person | null; size?: keyof typeof avatarSize }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        avatarSize[size],
      )}
    >
      <span className="font-medium text-[var(--text-color)]">{person ? person.name[0] : "?"}</span>
    </div>
  )
}

/** The "2h ago" cell of the list: a clock and a relative time. */
export function UpdatedAt({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-1">
      <Clock size={12} />
      {children}
    </div>
  )
}
