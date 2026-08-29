import { Calendar, Kanban, List } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { FeatureCard } from "../molecules/FeatureCard"

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
]

export function Workflow() {
  return (
    <section id="workflow" className="border-t border-line px-6 py-20 md:py-28">
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

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {views.map((view, index) => (
            <Reveal key={view.title} delay={index * 80}>
              <FeatureCard {...view} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
