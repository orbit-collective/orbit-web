import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-surface p-5 transition-colors duration-150 ease-in-out hover:border-line-strong",
        className,
      )}
    >
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{description}</p>
    </div>
  )
}
