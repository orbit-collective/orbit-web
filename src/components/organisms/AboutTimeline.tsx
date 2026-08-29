import { CircleAlert, Rocket, Unlock, Users } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { TimelineItem } from "../molecules/TimelineItem"

const chapters = [
  {
    icon: CircleAlert,
    title: "The problem",
    description:
      "Every tracker we tried asked us to configure more than we wanted to maintain, before a single issue got created.",
  },
  {
    icon: Rocket,
    title: "The first version",
    description:
      "One workspace: create a project, add issues, and move them through a workflow that made sense.",
  },
  {
    icon: Users,
    title: "Built for teams",
    description:
      "Roles, dashboards and notifications, so the whole team could rely on the same source of truth.",
  },
  {
    icon: Unlock,
    title: "Open and self-hosted",
    description:
      "Released as a self-hosted tool, so every team keeps full control of their own data.",
  },
]

export function AboutTimeline() {
  return (
    <section className="border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">How Orbit came to be</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            A short path from a shared frustration to a tool we actually wanted to use.
          </p>
        </Reveal>

        <div className="mt-12">
          {chapters.map((chapter, index) => (
            <TimelineItem
              key={chapter.title}
              {...chapter}
              delay={index * 80}
              isLast={index === chapters.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
