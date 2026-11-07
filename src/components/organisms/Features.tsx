import { Bell, Command, GitBranch, LayoutDashboard, ListChecks, Radio, Tag, Workflow } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { FeatureCard } from "../molecules/FeatureCard"

const features = [
  {
    icon: ListChecks,
    title: "Issue tracking",
    description:
      "Create issues, set status, priority, assignees and dates, then move them through a workflow that fits your team. Edit them right in the list.",
  },
  {
    icon: Radio,
    title: "Live updates",
    description:
      "Changes from your teammates appear without a refresh, along with who else is looking at an issue and when someone is editing it.",
  },
  {
    icon: Command,
    title: "Command palette",
    description:
      "Press Ctrl or \u2318 + K to jump to any issue, project or person, or change an issue's status, labels and assignee from the keyboard.",
  },
  {
    icon: GitBranch,
    title: "GitHub",
    description:
      "Create a branch or pull request from an issue and follow its CI and review status right next to it.",
  },
  {
    icon: Workflow,
    title: "Automation",
    description:
      "Build \u201cwhen this happens, do that\u201d rules for each project, such as moving an issue to Done when its pull request merges.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboards",
    description:
      "See how every project is progressing at a glance, with analytics built from the issues your team is already tracking.",
  },
  {
    icon: Tag,
    title: "Labels & priorities",
    description:
      "Tag issues with labels and give each project its own priority scale, with your own names, colors and order.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Get notified when an issue moves, a comment lands or someone mentions you, and keep your inbox tidy with filters and bulk actions.",
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
            <Reveal key={feature.title} delay={(index % 4) * 80}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
