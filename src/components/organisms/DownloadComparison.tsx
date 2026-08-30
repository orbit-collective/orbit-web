import { Check, Minus } from "lucide-react"
import { cn } from "../../lib/cn"
import { Reveal } from "../atoms/Reveal"

const rows = [
  { label: "Pricing", orbit: "Free & open source", other: "Per-seat license" },
  { label: "Hosting", orbit: "Your own infrastructure", other: "Vendor cloud only" },
  { label: "Setup", orbit: "Running in minutes", other: "Admin config & procurement" },
  { label: "Your data", orbit: "Stays on your servers", other: "Stored with the vendor" },
]

export function DownloadComparison() {
  return (
    <section className="border-t border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Built to feel lighter</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            No bloated admin panel and no per-seat invoice, just the tracker, running where you
            already work.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 overflow-hidden rounded-xl border border-line">
          <div className="hidden grid-cols-3 border-b border-line bg-surface text-sm font-medium sm:grid">
            <div className="px-5 py-3 text-ink-muted">&nbsp;</div>
            <div className="px-5 py-3 text-ink">Orbit</div>
            <div className="px-5 py-3 text-ink-muted">Typical SaaS tracker</div>
          </div>

          {rows.map((row, index) => (
            <div
              key={row.label}
              className={cn(
                "grid grid-cols-1 gap-2 px-5 py-4 text-sm sm:grid-cols-3 sm:items-center sm:gap-0 sm:py-0",
                index !== rows.length - 1 && "border-b border-line",
              )}
            >
              <div className="font-medium text-ink-muted sm:py-4">{row.label}</div>
              <div className="flex items-center gap-2 text-ink sm:py-4">
                <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {row.orbit}
              </div>
              <div className="flex items-center gap-2 text-ink-muted sm:py-4">
                <Minus className="h-4 w-4 shrink-0" aria-hidden="true" />
                {row.other}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
