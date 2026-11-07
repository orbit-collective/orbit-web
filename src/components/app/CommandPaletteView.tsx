import { Bug, Search, SquareCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"

function Key({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return (
    <span className="relative inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent px-2 py-[2px] text-[10px] font-medium whitespace-nowrap text-[var(--text-gray-color)]">
      <kbd
        className={cn(
          "inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-[var(--border-color)] px-1.5 font-mono text-[9px] font-bold text-[var(--text-gray-color)] shadow-sm",
          tone === "light" ? "bg-[var(--bg-light-color)]" : "bg-[var(--bg-color)]",
        )}
      >
        {children}
      </kbd>
    </span>
  )
}

function Hint({ keys, label }: { keys: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <Key>{keys}</Key>
      {label}
    </span>
  )
}

interface Result {
  icon: LucideIcon
  number: number
  title: string
  project: string
}

const results: Result[] = [
  { icon: SquareCheck, number: 13, title: "Add keyboard shortcuts to the issue board", project: "Orbit" },
  { icon: Bug, number: 14, title: "Board column drag handle is not reachable by keyboard", project: "Orbit" },
]

/** The command palette (Ctrl/Cmd+K) after typing "#keyboard" to search issues. */
export function CommandPaletteView() {
  return (
    <div className="flex h-full items-start justify-center bg-[var(--bg-color)]">
      <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-color)] shadow-2xl">
        <div className="flex h-[52px] items-center gap-3 border-b border-[var(--border-color)] px-4">
          <Search size={16} className="shrink-0 text-[var(--text-gray-color)]" />
          <span className="min-w-0 flex-1 text-[15px] text-[var(--text-color)]">#keyboard</span>
        </div>
        <div className="p-1.5">
          <div className="mb-1 last:mb-0">
            <div className="px-3 pt-2 pb-1 text-[10px] font-bold tracking-[0.1em] text-[var(--text-gray-color)] uppercase">
              Issues
            </div>
            {results.map((result, index) => (
              <div
                key={result.number}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-lg px-3",
                  index === 0 && "bg-[var(--bg-light-color-hover)]",
                )}
              >
                <result.icon size={16} className="shrink-0 text-[var(--text-gray-color)]" />
                <span className="shrink-0 font-mono text-[12px] text-[var(--text-gray-color)]">
                  #{result.number}
                </span>
                <span className="min-w-0 truncate text-[14px] text-[var(--text-color)]">{result.title}</span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-[var(--text-gray-color)]">
                  {result.project}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-5 border-t border-[var(--border-color)] bg-[var(--bg-dark-color)] px-4 py-2.5 text-[10px] text-[var(--text-gray-color)]">
          <Hint keys="↑↓" label="navigate" />
          <Hint keys="↵" label="open" />
          <Hint keys="ESC" label="close" />
          <span className="ml-auto flex items-center gap-3">
            <Hint keys=">" label="commands" />
            <Hint keys="#" label="issues" />
            <Hint keys="@" label="people" />
          </span>
        </div>
      </div>
    </div>
  )
}
