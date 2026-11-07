import type { LucideIcon } from "lucide-react"
import type { PointerEvent, ReactNode } from "react"
import { cn } from "../../lib/cn"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  /** Something to show under the text, such as a real Orbit screen. */
  visual?: ReactNode
  className?: string
}

/** Moves the hover glow to the pointer by writing two CSS variables, without re-rendering. */
function followPointer(event: PointerEvent<HTMLDivElement>) {
  if (event.pointerType !== "mouse") return
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  card.style.setProperty("--glow-x", `${event.clientX - rect.left}px`)
  card.style.setProperty("--glow-y", `${event.clientY - rect.top}px`)
}

export function FeatureCard({ icon: Icon, title, description, visual, className }: FeatureCardProps) {
  return (
    <div
      onPointerMove={followPointer}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface p-5 transition-colors duration-150 ease-in-out hover:border-line-strong",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 0%), rgba(255, 255, 255, 0.06), transparent 70%)",
        }}
      />
      <div className="relative mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="relative text-base font-semibold text-ink">{title}</h3>
      <p className="relative mt-1.5 text-sm leading-relaxed text-ink-muted">{description}</p>
      {visual ? <div className="relative mt-5 flex flex-1 items-end">{visual}</div> : null}
    </div>
  )
}
