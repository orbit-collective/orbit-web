import { Calendar, Kanban, List, Activity } from "lucide-react"
import { useScrollSteps } from "../../hooks/useScrollSteps"
import { cn } from "../../lib/cn"
import { Reveal } from "../atoms/Reveal"

const views = [
  {
    icon: List,
    title: "List",
    description: "Scan every issue in a dense, sortable table when you need to triage fast.",
  },
  {
    icon: Kanban,
    title: "Board",
    description: "Drag issues across a kanban board and watch the workflow move in real time.",
  },
  {
    icon: Calendar,
    title: "Calendar",
    description: "Lay issues out against their dates to plan sprints and releases around deadlines.",
  },
  {
    icon: Activity,
    title: "Activity Log",
    description: "See every change to every issue in a single, filterable timeline.",
  }
]

export function Workflow() {
  const { ref, activeIndex } = useScrollSteps<HTMLDivElement>(views.length)

  return (
    <section id="workflow" className="scroll-mt-16 border-t border-line">
      <div ref={ref} style={{ height: `${views.length * 100}svh` }} className="relative">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden px-6">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight text-ink">
                Work the way your team already thinks
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
                The same issues, viewed the way that fits the moment. Switch between them without
                losing your filters.
              </p>

              <ul className="mt-10 flex flex-col gap-1">
                {views.map((view, index) => (
                  <li key={view.title} className="flex items-center gap-3 py-2">
                    <span
                      className={cn(
                        "h-px w-8 shrink-0 transition-colors duration-300",
                        index === activeIndex ? "bg-accent" : "bg-line-strong",
                      )}
                    />
                    <span
                      className={cn(
                        "text-base font-medium transition-colors duration-300",
                        index === activeIndex ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {view.title}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="relative h-64 sm:h-72">
              {views.map((view, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={view.title}
                    aria-hidden={!isActive}
                    inert={!isActive}
                    className={cn(
                      "absolute inset-0 rounded-lg border border-line bg-surface p-6 transition-all duration-500 ease-out sm:p-8",
                      isActive ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    )}
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-line text-ink">
                      <view.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-ink">{view.title}</h3>
                    <p className="mt-2 max-w-sm text-base leading-relaxed text-ink-muted">
                      {view.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
