import {
  Bell,
  Command,
  Filter,
  GitBranch,
  LayoutDashboard,
  ListChecks,
  Radio,
  ShieldCheck,
  Tag,
  Workflow,
} from "lucide-react"
import { cn } from "../../lib/cn"
import { CommandPaletteView } from "../app/CommandPaletteView"
import { LiveIssueView } from "../app/LiveIssueView"
import { ScaledFrame } from "../app/ScaledFrame"
import { LIVE_SIZE, PALETTE_SIZE } from "../app/sizes"
import { Reveal } from "../atoms/Reveal"
import { FeatureCard } from "../molecules/FeatureCard"
import type { ReactNode } from "react"

/** A real Orbit screen inside a card, never wider than it is in the app. */
function Screen({ label, size, children }: { label: string; size: { width: number; height: number }; children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-lg" style={{ maxWidth: size.width }}>
      <ScaledFrame {...size} label={label} initialScale={0.8} minScale={0.55}>
        {children}
      </ScaledFrame>
    </div>
  )
}

// The two with a screen are the wide tiles of the first row; the other eight
// fill two rows of four.
const features = [
  {
    icon: Radio,
    title: "Live updates",
    description:
      "Changes from your teammates appear without a refresh, along with who else is looking at an issue and when someone is editing it.",
    className: "lg:col-span-2",
    visual: (
      <Screen label="An issue page with teammates viewing it and a warning that two people are editing" size={LIVE_SIZE}>
        <LiveIssueView />
      </Screen>
    ),
  },
  {
    icon: Command,
    title: "Command palette",
    description:
      "Press Ctrl or \u2318 + K to jump to any issue, project or person, or change an issue's status, labels and assignee from the keyboard.",
    className: "lg:col-span-2",
    visual: (
      <Screen label="The command palette searching for issues" size={PALETTE_SIZE}>
        <CommandPaletteView />
      </Screen>
    ),
  },
  {
    icon: ListChecks,
    title: "Issue tracking",
    description:
      "Create issues, set status, priority, assignees and dates, then move them through a workflow that fits your team. Edit them right in the list.",
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
  {
    icon: ShieldCheck,
    title: "Roles & permissions",
    description:
      "Give every project its own roles, from Owner to Viewer or your own custom ones, with fine-grained control over who can do what.",
  },
  {
    icon: Filter,
    title: "Saved filters",
    description:
      "Save the filters your team checks every day and get back to them in one click, in the list, the board or the calendar.",
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
          {features.map(({ className, ...feature }, index) => (
            <Reveal key={feature.title} delay={(index % 4) * 80} className={cn("min-w-0", className)}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
