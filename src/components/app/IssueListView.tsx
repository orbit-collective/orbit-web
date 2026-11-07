import { ArrowDown, Plus } from "lucide-react"
import { cn } from "../../lib/cn"
import { issues } from "./data"
import type { Issue } from "./data"
import { motionVars } from "./motionVars"
import { Avatar, LabelChip, PriorityIcon, StatusBadge, TypeBadge } from "./parts"

// Orbit lets each user hide columns; the page shows the ones that matter most.
// The last one takes whatever width is left.
const columns = [
  { label: "ID", width: 70 },
  { label: "Title", width: 290 },
  { label: "Type", width: 106 },
  { label: "Status", width: 110 },
  { label: "Assignee", width: 148 },
  { label: "Priority", width: 124 },
  { label: "Labels" },
]

const th =
  "sticky top-0 z-30 group relative select-none border-b border-[var(--bg-light-color)] bg-[var(--bg-color)] px-4 py-3 text-left font-medium text-[var(--text-gray-color)]"
const cell = "px-3 py-2 border-b border-[var(--border-color)] align-middle text-[12px] font-normal"

function Row({ issue, index }: { issue: Issue; index: number }) {
  return (
    // Rows rise one after another, a little less each (the app's rowDelay, capped at 14).
    <tr style={{ height: 44, ...motionVars({ i: index, cap: 14, y: "6px" }) }} className="m-rise select-none">
      <td className="w-[48px] border-b border-[var(--border-color)] px-2 py-2 text-center align-middle text-[12px] font-normal">
        <div className="flex items-center justify-center gap-1">
          <span className="h-3.5 w-3.5 rounded border border-[var(--border-color-strong)] bg-[var(--surface-color)] opacity-0" />
        </div>
      </td>
      <td className={cn(cell, "w-[75px] font-mono text-[11px] text-[var(--text-muted-color)]")}>
        #{issue.number}
      </td>
      <td className={cn(cell, "truncate text-[var(--text-color)]")}>
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "-mx-1 truncate rounded px-1 font-medium",
              issue.closed && "text-[var(--text-muted-color)] line-through",
            )}
          >
            {issue.title}
          </span>
        </div>
      </td>
      <td className={cell}>
        <TypeBadge type={issue.type} />
      </td>
      <td className={cell}>
        <div className="inline-flex max-w-full items-center">
          <StatusBadge status={issue.status} />
        </div>
      </td>
      <td className={cn(cell, "text-[var(--text-gray-color)]")}>
        <span className="flex w-fit items-center gap-1.5 self-start rounded-lg border border-transparent px-0 py-[2px] text-[10px] font-medium whitespace-nowrap text-[var(--text-color)]">
          <Avatar person={issue.assignee} size="sm" />
          <span className="min-w-0 overflow-hidden text-sm font-normal text-ellipsis whitespace-nowrap text-[var(--text-gray-color)]">
            {issue.assignee ? issue.assignee.name : "Unassigned"}
          </span>
        </span>
      </td>
      <td className={cell}>
        <div className="flex items-center gap-1.5">
          <span className="relative inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent px-2 py-[2px] text-[10px] font-medium whitespace-nowrap text-[var(--text-gray-color)]">
            <PriorityIcon priority={issue.priority} />
          </span>
          <span className="truncate text-[var(--text-color)] capitalize">{issue.priority.name}</span>
        </div>
      </td>
      <td className={cell}>
        <div className={cn("relative flex w-full min-w-0 items-center gap-1.5", issue.closed && "opacity-40")}>
          {issue.labels.map((label) => (
            <LabelChip key={label.name} label={label} />
          ))}
        </div>
      </td>
    </tr>
  )
}

/** The project's List view: Orbit's issue table with a quick-add row on top. */
export function IssueListView() {
  return (
    <div className="flex h-full bg-[var(--bg-color)] p-4">
      <div className="flex w-full flex-1 flex-col overflow-hidden py-2">
        <div className="relative flex flex-col overflow-y-hidden rounded-xl border border-[var(--bg-light-color)] bg-[var(--bg-color)] shadow-xl">
          <table className="w-full table-fixed border-separate border-spacing-0 text-left text-xs">
            <thead>
              <tr>
                <th className="sticky top-0 z-30 w-[48px] border-b border-[var(--bg-light-color)] bg-[var(--bg-color)] px-4 py-3 text-center">
                  <span className="inline-block h-4 w-4 rounded border border-[var(--bg-light-color)] align-middle" />
                </th>
                {columns.map((column) => (
                  <th key={column.label} className={th} style={column.width ? { width: column.width } : undefined}>
                    <div className="flex items-center justify-start gap-1.5 text-left">
                      <span className="truncate">{column.label}</span>
                      <ArrowDown size={14} className="opacity-0" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="border-b border-[var(--border-color)] px-3 py-2">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted-color)]">
                    <Plus size={14} />
                    New issue
                  </span>
                </td>
              </tr>
              {issues.map((issue, index) => (
                <Row key={issue.number} issue={issue} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
