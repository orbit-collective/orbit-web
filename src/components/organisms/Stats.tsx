import { Reveal } from "../atoms/Reveal"
import { StatItem } from "../molecules/StatItem"

const stats = [
  { value: 3, label: "Views: List, Board and Calendar" },
  { value: 100, suffix: "%", label: "Self-hosted on your own infrastructure" },
  { value: 1, label: "Workspace for planning, tracking and reporting" },
]

export function Stats() {
  return (
    <section className="border-t border-line px-6 py-16">
      <Reveal className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </Reveal>
    </section>
  )
}
