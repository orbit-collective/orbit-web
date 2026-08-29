import { ArrowRightLeft, ClipboardList, FolderPlus, Rocket } from "lucide-react"
import { useScrollProgress } from "../../hooks/useScrollProgress"
import { Reveal } from "../atoms/Reveal"
import { StepCard } from "../molecules/StepCard"

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
  const { ref, progress } = useScrollProgress<HTMLDivElement>()
  const trackTranslate = progress * (steps.length - 1) * -100

  return (
    <section id="how-it-works" className="scroll-mt-16 border-t border-line">
      <div ref={ref} style={{ height: `${steps.length * 80}svh` }} className="relative">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-6 py-16">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">How it works</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              From an empty workspace to a shipped release, in four steps.
            </p>
          </Reveal>

          <div className="mx-auto w-full max-w-2xl overflow-hidden">
            <div
              className="flex"
              style={{ transform: `translateX(${trackTranslate}%)` }}
            >
              {steps.map((step, index) => (
                <div key={step.title} className="w-full shrink-0 px-2">
                  <StepCard index={index + 1} {...step} />
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 h-px w-full max-w-2xl bg-line">
            <div className="h-px bg-accent" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  )
}
