import { Activity, Calendar, Kanban, List, Pause, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import { cn } from "../../lib/cn"
import { ActivityView } from "../app/ActivityView"
import { AppFrame } from "../app/AppFrame"
import { BoardView } from "../app/BoardView"
import { CalendarView } from "../app/CalendarView"
import { IssueListView } from "../app/IssueListView"
import { MotionStage } from "../app/MotionStage"
import { ScaledFrame } from "../app/ScaledFrame"
import { Reveal } from "../atoms/Reveal"

/** Every view is shown in the same box, so switching tabs never moves the page. */
const FRAME = { width: 1100, height: 560 }

const views = [
  {
    id: "list",
    icon: List,
    title: "List",
    description: "Scan every issue in a dense, sortable table when you need to triage fast.",
    view: <IssueListView />,
  },
  {
    id: "board",
    icon: Kanban,
    title: "Board",
    description: "Drag issues across a kanban board and watch the workflow move in real time.",
    view: <BoardView />,
  },
  {
    id: "calendar",
    icon: Calendar,
    title: "Calendar",
    description: "Lay issues out against their dates to plan sprints and releases around deadlines.",
    view: <CalendarView />,
  },
  {
    id: "activity",
    icon: Activity,
    title: "Activity Log",
    description: "See every change to every issue in a single, filterable timeline.",
    view: (
      <div className="flex h-full justify-center bg-[var(--bg-color)] pt-4">
        <div className="w-[560px]">
          <ActivityView />
        </div>
      </div>
    ),
  },
]

export function Workflow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  // Set when someone takes control (picks a tab, or presses the pause button).
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // The tabs only advance on their own while someone can see them.
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const select = (index: number, focus = false) => {
    const next = (index + views.length) % views.length
    setActiveIndex(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  // A tab picked by hand stays put: it only auto-advances when nobody has chosen.
  const selectByUser = (index: number, focus = false) => {
    setIsPaused(true)
    select(index, focus)
  }

  const isAdvancing = isVisible && !isHovered && !isFocused && !isPaused

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight") selectByUser(index + 1, true)
    else if (event.key === "ArrowLeft") selectByUser(index - 1, true)
    else if (event.key === "Home") selectByUser(0, true)
    else if (event.key === "End") selectByUser(views.length - 1, true)
    else return
    event.preventDefault()
  }

  const active = views[activeIndex]

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="scroll-mt-16 border-t border-line px-6 py-20 md:py-28"
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        // Focus moving between controls inside the section is not leaving it.
        if (!sectionRef.current?.contains(event.relatedTarget as Node | null)) setIsFocused(false)
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Work the way your team already thinks
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            The same issues, viewed the way that fits the moment. Switch between them without
            losing your filters.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="tablist"
              aria-label="Issue views"
              className="flex flex-wrap gap-2"
              onPointerEnter={() => setIsHovered(true)}
              onPointerLeave={() => setIsHovered(false)}
            >
              {views.map((view, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={view.id}
                    ref={(node) => {
                      tabRefs.current[index] = node
                    }}
                    type="button"
                    role="tab"
                    id={`workflow-tab-${view.id}`}
                    aria-selected={isActive}
                    aria-controls="workflow-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectByUser(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={cn(
                      "relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out",
                      isActive
                        ? "border-line-strong bg-surface text-ink"
                        : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
                    )}
                  >
                    <view.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    {view.title}
                    {isActive && !isPaused ? (
                      <span
                        aria-hidden="true"
                        // A new bar mounts with each tab; when it fills, the next tab opens.
                        onAnimationEnd={() => select(activeIndex + 1)}
                        style={{ animationPlayState: isAdvancing ? "running" : "paused" }}
                        className="absolute inset-x-0 bottom-0 h-px origin-left animate-[tab-progress_7000ms_linear_forwards] bg-accent motion-reduce:hidden"
                      />
                    ) : null}
                  </button>
                )
              })}
            </div>
            {/* Automatic switching can be stopped, as moving content must be. Hidden when there is no motion. */}
            <button
              type="button"
              aria-pressed={isPaused}
              aria-label={isPaused ? "Resume automatic tab switching" : "Pause automatic tab switching"}
              onClick={() => setIsPaused((paused) => !paused)}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 ease-in-out hover:border-line-strong hover:text-ink motion-reduce:hidden"
            >
              {isPaused ? (
                <Play className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
          <p className="mt-4 min-h-12 max-w-xl text-base leading-relaxed text-ink-muted sm:min-h-6">
            {active.description}
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-6">
          <div
            role="tabpanel"
            id="workflow-panel"
            aria-labelledby={`workflow-tab-${active.id}`}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
          >
            <AppFrame>
              <ScaledFrame
                {...FRAME}
                label={`The ${active.title} view of an Orbit project`}
                initialScale={0.95}
                minScale={0.62}
                stage={false}
              >
                {views.map((view, index) => (
                  <div
                    key={view.id}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-500 ease-out",
                      index === activeIndex ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    )}
                  >
                    {/* Each view is its own stage, so it plays again every time its tab is opened. */}
                    <MotionStage className="h-full" active={index === activeIndex}>
                      {view.view}
                    </MotionStage>
                  </div>
                ))}
              </ScaledFrame>
            </AppFrame>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
