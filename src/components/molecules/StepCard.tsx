import type { LucideIcon } from "lucide-react"

interface StepCardProps {
  index: number
  icon: LucideIcon
  title: string
  description: string
}

export function StepCard({ index, icon: Icon, title, description }: StepCardProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-lg border border-line bg-surface p-8 text-center sm:p-10">
      <span className="text-sm font-medium text-ink-muted">Step {index}</span>
      <div className="mt-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-line-strong bg-canvas-hover text-ink">
        <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-ink-muted">{description}</p>
    </div>
  )
}
