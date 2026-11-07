import { ArrowRightLeft, ClipboardList, FolderPlus, Rocket } from "lucide-react"
import { useScrollSteps } from "../../hooks/useScrollSteps"
import { cn } from "../../lib/cn"
import { Reveal } from "../atoms/Reveal"
import { HowItWorksPreview } from "./HowItWorksPreview"

const steps = [
  {
    icon: FolderPlus,
    title: "Create a project",
    description: "Spin up a project with a name and a color your team will recognize instantly.",
  },
  {
    icon: ClipboardList,
    title: "Add your issues",
    description: "Capture the work with a status, a priority, labels, and the right assignee.",
  },
  {
    icon: ArrowRightLeft,
    title: "Track the workflow",
    description: "Move issues across the stages your team defined, from a list, a board, or a calendar.",
  },
  {
    icon: Rocket,
    title: "Ship and review",
    description: "Close the loop with the dashboard and a full activity log of what changed.",
  },
]

export function HowItWorks() {
  const { ref, activeIndex } = useScrollSteps<HTMLDivElement>(steps.length)

  const activeStep = steps[activeIndex]

  return (
    <section id="how-it-works" className="scroll-mt-16 border-t border-line">
      <div ref={ref} style={{ height: `${steps.length * 80}svh` }} className="relative">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden px-6">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Reveal>
                <h2 className="text-3xl font-semibold tracking-tight text-ink">How it works</h2>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
                  From an empty workspace to a shipped release, in four steps.
                </p>
              </Reveal>

              <Reveal delay={100} className="mt-10 flex flex-col gap-1">
                {steps.map((step, index) => {
                  const isActive = index === activeIndex
                  return (
                    <div key={step.title} className="flex items-center gap-3 py-2">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors duration-300",
                          isActive
                            ? "border-accent bg-accent text-accent-ink"
                            : "border-line-strong text-ink-muted",
                        )}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={cn(
                          "text-base font-medium transition-colors duration-300",
                          isActive ? "text-ink" : "text-ink-muted",
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                  )
                })}
              </Reveal>

              <p className="mt-6 min-h-12 max-w-sm text-base leading-relaxed text-ink-muted">
                {activeStep.description}
              </p>
            </div>

            <HowItWorksPreview activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  )
}
