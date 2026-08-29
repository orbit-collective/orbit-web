import { Filter, History, MessagesSquare, Users } from "lucide-react"
import { useMemo } from "react"
import { useScrollProgress } from "../../hooks/useScrollProgress"
import { cn } from "../../lib/cn"

const chapters = [
  {
    icon: Users,
    title: "Project roles",
    description:
      "Grant project scoped permissions so every teammate sees exactly the projects and actions relevant to them, nothing more.",
  },
  {
    icon: Filter,
    title: "Saved filters",
    description:
      "Save the filters your team checks every day and get back to them in one click, across list, board or calendar.",
  },
  {
    icon: History,
    title: "Activity log",
    description:
      "Every change is recorded, so you can trace the full history of an issue or a project at any time.",
  },
  {
    icon: MessagesSquare,
    title: "Integrations",
    description:
      "Connect Orbit to Discord and get notified the moment an issue moves, without leaving the conversation.",
  },
]

const CHAPTER_HEIGHT_VH = 80

export function DeepDive() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>()

  const activeIndex = useMemo(
    () => Math.min(chapters.length - 1, Math.floor(progress * chapters.length)),
    [progress],
  )

  return (
    <section id="deep-dive" className="scroll-mt-16 border-t border-line">
      <div
        ref={ref}
        style={{ height: `${chapters.length * CHAPTER_HEIGHT_VH}svh` }}
        className="relative"
      >
        <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-2 md:gap-16">
          <div className="sticky top-0 flex h-svh items-center justify-center">
            <div className="relative flex h-56 w-56 shrink-0 items-center justify-center rounded-full border border-line-strong bg-canvas-hover sm:h-64 sm:w-64">
              {chapters.map((chapter, index) => {
                const isActive = index === activeIndex
                return (
                  <div
                    key={chapter.title}
                    aria-hidden={!isActive}
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-500 ease-out",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <chapter.icon className="h-9 w-9 text-ink" strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-sm font-medium text-ink-muted">{chapter.title}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            {chapters.map((chapter, index) => (
              <div
                key={chapter.title}
                style={{ height: `${CHAPTER_HEIGHT_VH}svh` }}
                className={cn(
                  "flex flex-col justify-center transition-opacity duration-500 ease-out",
                  index === activeIndex ? "opacity-100" : "opacity-35",
                )}
              >
                <span className="text-sm font-medium text-ink-muted">
                  0{index + 1} / 0{chapters.length}
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
                  {chapter.title}
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
                  {chapter.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
