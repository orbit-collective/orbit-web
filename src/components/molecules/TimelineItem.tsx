import type { LucideIcon } from "lucide-react"
import { Reveal } from "../atoms/Reveal"

interface TimelineItemProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
  isLast?: boolean
}

export function TimelineItem({ icon: Icon, title, description, delay = 0, isLast }: TimelineItemProps) {
  return (
    <Reveal delay={delay} className="relative flex gap-5 pb-10 last:pb-0">
      {!isLast ? (
        <span className="absolute left-[19px] top-10 h-[calc(100%-1.5rem)] w-px bg-line" />
      ) : null}
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-canvas-hover text-ink">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="pt-1.5">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-1.5 max-w-md text-base leading-relaxed text-ink-muted">{description}</p>
      </div>
    </Reveal>
  )
}
