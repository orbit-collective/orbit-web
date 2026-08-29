import { Bell, LayoutDashboard, ListChecks, Tag } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { FeatureCard } from "../molecules/FeatureCard"

const features = [
  {
    icon: ListChecks,
    title: "Issue tracking",
    description:
      "Create issues, set status, priority, assignees and dates, then move them through a workflow that fits your team.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards",
    description:
      "See how every project is progressing at a glance, with analytics built from the issues your team is already tracking.",
  },
  {
    icon: Tag,
    title: "Labels & priority",
    description:
      "Tag every issue with the labels and priority that matter to your team, so nothing important gets lost in the noise.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Get notified when an issue moves, a comment lands, or a project you follow changes state.",
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-line px-6 py-20 md:py-28">
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
