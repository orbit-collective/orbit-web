import { Activity, Bell, LayoutDashboard, ListChecks, Shield, Users } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { FeatureCard } from "../molecules/FeatureCard"

const features = [
  {
    icon: ListChecks,
    title: "Issue tracking",
    description:
      "Create issues, set status, priority, labels, assignees and dates, then move them through a workflow that fits your team.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards",
    description:
      "See how every project is progressing at a glance, with analytics built from the issues your team is already tracking.",
  },
  {
    icon: Users,
    title: "Project roles",
    description:
      "Grant project scoped permissions so every teammate sees exactly the projects and actions relevant to them.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Get notified when an issue moves, a comment lands, or a project you follow changes state.",
  },
  {
    icon: Activity,
    title: "Activity log",
    description:
      "Every change is recorded, so you can trace the full history of an issue or a project at any time.",
  },
  {
    icon: Shield,
    title: "Saved filters",
    description:
      "Save the filters your team checks every day and get back to them in one click, across list, board or calendar.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">
            Everything your team needs to move work forward
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            One workspace for planning, tracking, and reporting on the work that matters, without
            switching between five different tools.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 80}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
