import { Bug, Palette, Sparkle } from "lucide-react"
import { cn } from "../../lib/cn"
import { MockIssueCard } from "../molecules/MockIssueCard"

interface HowItWorksPreviewProps {
  activeIndex: number
}

const listRows = [
  { icon: Sparkle, width: "78%" },
  { icon: Bug, width: "55%" },
  { icon: Palette, width: "68%" },
]

const boardColumns = [
  { title: "Backlog", cards: [{ icon: Palette, label: "Design", lineWidth: "80%" }] },
  {
    title: "In Progress",
    cards: [
      { icon: Sparkle, label: "Feature", lineWidth: "60%" },
      { icon: Bug, label: "Bug", lineWidth: "70%" },
    ],
  },
  { title: "Done", cards: [{ icon: Sparkle, label: "Feature", lineWidth: "50%" }] },
]

const dashboardStats = [
  { value: "12", label: "Closed" },
  { value: "3", label: "Active" },
  { value: "98%", label: "On time" },
]

const chartBars = [40, 70, 55, 90, 65]

function panelClasses(isActive: boolean) {
  return cn(
    "absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out",
    isActive ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
  )
}

export function HowItWorksPreview({ activeIndex }: HowItWorksPreviewProps) {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl border border-line bg-surface sm:max-w-lg">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
      </div>

      <div className="relative h-64 sm:h-72">
        <div aria-hidden={activeIndex !== 0} className={panelClasses(activeIndex === 0)}>
          <div className="flex flex-col items-center gap-4 px-6">
            <div className="flex w-full max-w-xs items-center gap-3 rounded-md border border-line-strong bg-canvas-hover px-4 py-3">
              <span className="h-3 w-3 shrink-0 rounded-full bg-accent" />
              <span className="h-2 w-28 rounded-full bg-line-strong" />
            </div>
            <div className="flex w-full max-w-xs items-center gap-3 rounded-md border border-line px-4 py-3">
              <span className="h-2 w-20 rounded-full bg-line" />
            </div>
            <span className="mt-2 inline-flex items-center rounded-md bg-accent px-4 py-2 text-xs font-medium text-accent-ink">
              Create project
            </span>
          </div>
        </div>

        <div aria-hidden={activeIndex !== 1} className={panelClasses(activeIndex === 1)}>
          <div className="flex flex-col gap-2.5 px-6">
            {listRows.map((row, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 rounded-md border border-line bg-canvas-hover px-3 py-2.5 transition-all duration-500 ease-out",
                  activeIndex === 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
                style={{ transitionDelay: activeIndex === 1 ? `${index * 120}ms` : "0ms" }}
              >
                <row.icon className="h-3.5 w-3.5 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
                <span className="h-2 rounded-full bg-line-strong" style={{ width: row.width }} />
                <span className="ml-auto h-5 w-5 shrink-0 rounded-full border border-line-strong" />
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden={activeIndex !== 2} className={panelClasses(activeIndex === 2)}>
          <div className="grid grid-cols-3 gap-3 px-4">
            {boardColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-2 text-[11px] font-medium text-ink-muted">{column.title}</p>
                <div className="flex flex-col gap-2">
                  {column.cards.map((card) => (
                    <MockIssueCard key={`${column.title}-${card.label}`} {...card} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden={activeIndex !== 3} className={panelClasses(activeIndex === 3)}>
          <div className="flex flex-col gap-6 px-6">
            <div className="grid grid-cols-3 gap-3">
              {dashboardStats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-line bg-canvas-hover p-3 text-center">
                  <p className="text-lg font-semibold text-ink">{stat.value}</p>
                  <p className="mt-1 text-[11px] text-ink-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="flex h-16 items-end gap-2">
              {chartBars.map((height, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-1 rounded-t-sm bg-line-strong transition-all duration-700 ease-out",
                    activeIndex === 3 ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    height: activeIndex === 3 ? `${height}%` : "0%",
                    transitionDelay: activeIndex === 3 ? `${index * 80}ms` : "0ms",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
