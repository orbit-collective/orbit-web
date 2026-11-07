import {
  Bell,
  CalendarDays,
  ChevronDown,
  CircleQuestionMark,
  Columns3,
  FolderGit2,
  LayoutDashboard,
  LayoutList,
  PanelLeftClose,
  Plus,
  RefreshCw,
  Rows3,
  Search,
  Settings,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"
import { BoardView } from "./BoardView"
import { people } from "./data"
import { motionVars } from "./motionVars"
import { Avatar } from "./parts"

/** A keyboard hint chip, like the Alt B / Alt P ones in the sidebar. */
function Kbd({ children }: { children: string }) {
  return (
    <span className="relative inline-flex items-center justify-center rounded-lg border border-solid border-transparent bg-transparent px-2 py-[2px] text-[10px] font-medium whitespace-nowrap text-[var(--text-gray-color)]">
      <kbd className="inline-flex h-5 min-w-[20px] items-center justify-center rounded border border-[var(--border-color)] bg-[var(--bg-light-color)] px-1.5 font-mono text-[9px] font-bold text-[var(--text-gray-color)] shadow-sm">
        {children}
      </kbd>
    </span>
  )
}

function NavItem({
  icon: Icon,
  label,
  shortcut,
  active,
}: {
  icon: LucideIcon
  label: string
  shortcut: string
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "mb-[2px] flex items-center justify-between rounded-md px-2.5 py-1.5",
        active ? "bg-[var(--bg-light-color)] text-[var(--text-color)]" : "text-[var(--text-gray-color)]",
      )}
    >
      <div className="flex items-center gap-2.5">
        <Icon size={16} />
        <span className="text-sm font-normal">{label}</span>
      </div>
      <Kbd>{shortcut}</Kbd>
    </div>
  )
}

const projects = [
  { name: "Orbit", dot: "bg-purple-500", active: true },
  { name: "Mobile App", dot: "bg-sky-500" },
  { name: "Marketing Site", dot: "bg-pink-500" },
  { name: "Billing", dot: "bg-green-500" },
  { name: "Data Platform", dot: "bg-orange-500" },
]

function Sidebar() {
  return (
    <aside className="flex w-[240px] shrink-0 flex-col justify-between bg-[var(--bg-color)] p-3 pr-1">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-lg">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              <img src="/orbit-app-icon.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            </div>
            <span className="truncate text-sm font-semibold text-[var(--text-color)]">Orbit</span>
          </div>
          <span className="shrink-0 rounded-md p-2 text-[var(--text-gray-color)]">
            <PanelLeftClose size={16} />
          </span>
        </div>
        <hr className="mb-3 border-t border-[var(--border-color)]" />
        <nav className="flex shrink-0 flex-col">
          <NavItem icon={LayoutDashboard} label="Dashboard" shortcut="Alt B" />
          <NavItem icon={LayoutList} label="Projects" shortcut="Alt P" />
        </nav>
        <div className="mt-5 flex min-h-0 flex-1 flex-col">
          <div className="mb-1.5 flex shrink-0 items-center justify-between rounded-md px-2.5 py-1">
            <span className="text-xs font-semibold tracking-wider text-[var(--text-gray-color)] uppercase">
              Projects
            </span>
            <span className="flex items-center gap-1.5 text-[var(--text-gray-color)]">
              <span className="text-xs font-medium">{projects.length}</span>
              <Plus size={14} />
            </span>
          </div>
          <nav className="flex min-h-0 flex-col">
            {projects.map((project) => (
              <div
                key={project.name}
                className={cn(
                  "mb-[2px] flex items-center rounded-md px-2.5 py-1.5",
                  project.active
                    ? "bg-[var(--bg-light-color)] text-[var(--text-color)]"
                    : "text-[var(--text-gray-color)]",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className={cn("h-2 w-2 rounded-full", project.dot)} />
                  <span className="text-sm font-normal">{project.name}</span>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="relative shrink-0 border-t border-solid border-[var(--bg-light-color)] pt-3">
        <div className="flex w-full items-center justify-between rounded-lg px-2 py-1.5">
          <span className="flex w-fit items-center gap-2.5 rounded-lg border border-solid border-transparent py-[2px] text-[10px] font-medium text-[var(--text-color)]">
            <Avatar person={people.jane} size="md" />
            <span className="flex min-w-0 flex-col">
              <span className="overflow-hidden text-sm font-normal text-ellipsis whitespace-nowrap text-[var(--text-gray-color)]">
                Jane Cooper
              </span>
              <span className="overflow-hidden text-[10px] font-normal text-ellipsis whitespace-nowrap text-[var(--text-gray-color)]">
                jane@orbit.dev
              </span>
            </span>
          </span>
          <ChevronDown size={16} className="text-[var(--text-gray-color)]" />
        </div>
      </div>
    </aside>
  )
}

const tabs = [
  { label: "List", icon: Rows3 },
  { label: "Board", icon: Columns3, active: true },
  { label: "Calendar", icon: CalendarDays },
]

function Header() {
  return (
    <header
      // A page section rises 16 px before the board under it.
      style={motionVars({ y: "16px" })}
      className="m-rise flex shrink-0 flex-col gap-3 border-b border-solid border-[var(--bg-light-color)] bg-[var(--bg-color-hover)] px-6 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-color-opacity)] text-[var(--accent-color)]">
            <FolderGit2 size={16} />
          </span>
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate text-base font-semibold text-[var(--text-color)]">Orbit</h1>
            <span className="truncate text-[10px] font-semibold tracking-wider text-[var(--text-muted-color)] uppercase">
              Saturday, November 7, 2026
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 text-[var(--text-gray-color)]">
          <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-solid border-[var(--bg-light-color)] bg-transparent px-3 py-1.5 text-xs font-semibold">
            <RefreshCw size={14} />
            Refresh
          </span>
          <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-[var(--accent-color)] px-3 py-1.5 text-xs font-semibold text-white">
            <Plus size={14} />
            New issue
          </span>
          <div className="mx-1 h-6 w-px shrink-0 bg-[var(--bg-light-color)]" />
          {[Search, CircleQuestionMark, Bell, Settings].map((Icon, index) => (
            <span key={index} className="flex shrink-0 items-center justify-center rounded-md p-1.5">
              <Icon size={16} />
            </span>
          ))}
        </div>
      </div>
      <nav className="flex gap-6">
        {tabs.map((tab) => (
          <span
            key={tab.label}
            className={cn(
              "flex shrink-0 items-center justify-center gap-1 py-2 text-sm whitespace-nowrap",
              tab.active ? "text-[var(--text-color)]" : "text-[var(--text-gray-color)]",
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </span>
        ))}
      </nav>
    </header>
  )
}

/** The whole app: the sidebar, a project page header with its view tabs, and the board. */
export function AppShellView() {
  return (
    <div className="flex h-full w-full overflow-hidden bg-[var(--bg-color)]">
      <Sidebar />
      <div className="m-2 flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-[var(--bg-color-hover)]">
        <Header />
        <div className="relative flex flex-1 overflow-hidden">
          <BoardView groupBy="status" className="bg-transparent" />
        </div>
      </div>
    </div>
  )
}
