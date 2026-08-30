import { Filter, History, MessagesSquare, Users } from "lucide-react"
import { useMemo } from "react"
import { useScrollProgress } from "../../hooks/useScrollProgress"
import { cn } from "../../lib/cn"
import { DeepDivePreview } from "./DeepDivePreview"

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

function ChapterSegments({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {chapters.map((_, segmentIndex) => (
        <span
          key={segmentIndex}
          className={cn(
            "h-1 w-8 rounded-full transition-colors duration-300",
            segmentIndex <= activeIndex ? "bg-accent" : "bg-line",
          )}
        />
      ))}
    </div>
  )
}

export function DeepDive() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>()

  const activeIndex = useMemo(
    () => Math.min(chapters.length - 1, Math.floor(progress * chapters.length)),
    [progress],
  )

  return (
    <section id="deep-dive" className="scroll-mt-16 border-t border-line">
      {/* Desktop: preview pinned on one side while the matching chapter scrolls past on the other. */}
      <div
        ref={ref}
        style={{ height: `${chapters.length * CHAPTER_HEIGHT_VH}svh` }}
        className="relative hidden md:block"
      >
        <div className="mx-auto flex max-w-6xl gap-16 px-6">
          <div className="sticky top-0 flex h-svh flex-1 items-center justify-center">
            <DeepDivePreview activeIndex={activeIndex} />
          </div>

          <div className="flex-1">
            {chapters.map((chapter, index) => {
              const isActive = index === activeIndex
              return (
                <div
                  key={chapter.title}
                  style={{ height: `${CHAPTER_HEIGHT_VH}svh` }}
                  className={cn(
                    "flex flex-col justify-center transition-opacity duration-500 ease-out",
                    isActive ? "opacity-100" : "opacity-35",
                  )}
                >
                  <ChapterSegments activeIndex={index} />
                  <div className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink">
                    <chapter.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
                    {chapter.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: no pinning, each chapter gets its own static preview in normal document flow. */}
      <div className="flex flex-col gap-16 px-6 py-16 md:hidden">
        {chapters.map((chapter, index) => (
          <div key={chapter.title} className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
            <DeepDivePreview activeIndex={index} />
            <div className="mt-6">
              <ChapterSegments activeIndex={index} />
            </div>
            <div className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink">
              <chapter.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">{chapter.title}</h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ink-muted">
              {chapter.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
