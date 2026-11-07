import { ArrowUpRight } from "lucide-react"
import { cn } from "../../lib/cn"
import { getLatestRelease } from "../../lib/release"

interface ReleaseBadgeProps {
  className?: string
}

/** "Orbit v0.13.1" linking to its release notes. Renders nothing without a known release. */
export function ReleaseBadge({ className }: ReleaseBadgeProps) {
  const release = getLatestRelease()
  if (!release) return null

  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-ink-muted transition-colors duration-150 ease-in-out hover:border-ink-muted hover:text-ink",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      Latest release {release.version}
      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
    </a>
  )
}
