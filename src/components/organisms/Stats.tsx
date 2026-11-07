import docsNav from "../../generated/docs-nav.json"
import { Reveal } from "../atoms/Reveal"
import { StatItem } from "../molecules/StatItem"

// Counted from the documentation fetched at build time, so it never goes stale.
const guideCount = docsNav.reduce((total, category) => total + category.guideCount, 0)

const stats = [
  { value: 4, label: "Views: List, Board, Calendar and Activity" },
  { value: 100, suffix: "%", label: "Self-hosted on your own infrastructure" },
  { value: guideCount, label: "Step-by-step guides, in English and Polish" },
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
