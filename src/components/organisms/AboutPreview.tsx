import { Bug, Palette, Sparkle } from "lucide-react"
import { Reveal } from "../atoms/Reveal"
import { MockIssueCard } from "../molecules/MockIssueCard"

const columns = [
  {
    title: "Backlog",
    count: 4,
    cards: [
      { icon: Palette, label: "Design", lineWidth: "85%" },
      { icon: Sparkle, label: "Feature", lineWidth: "65%" },
    ],
  },
  {
    title: "In Progress",
    count: 2,
    cards: [
      { icon: Bug, label: "Bug", lineWidth: "75%" },
      { icon: Sparkle, label: "Feature", lineWidth: "55%" },
    ],
  },
  {
    title: "Done",
    count: 6,
    cards: [{ icon: Palette, label: "Design", lineWidth: "70%" }],
  },
]

export function AboutPreview() {
  return (
    <section className="border-t border-line px-6 py-20 md:py-28">
      <Reveal className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-none">
          <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:p-6">
            {columns.map((column) => (
              <div key={column.title}>
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-sm font-medium text-ink">{column.title}</span>
                  <span className="text-xs text-ink-muted">{column.count}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {column.cards.map((card) => (
                    <MockIssueCard key={`${column.title}-${card.label}-${card.lineWidth}`} {...card} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
