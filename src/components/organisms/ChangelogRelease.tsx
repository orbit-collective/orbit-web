import { BookOpen, Bug, CircleDot, ExternalLink, Link2, Sparkles, Wrench, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"
import { countChanges, formatReleaseDate, releaseId } from "../../lib/changelog"
import type { Release, ReleaseSection } from "../../lib/changelog"
import { motionVars } from "../app/motionVars"
import { MotionStage } from "../app/MotionStage"
import { ChangeItem } from "../molecules/ChangeItem"

/** How many changes of a section show before the rest fold behind "Show more". */
const VISIBLE_CHANGES = 8

const KINDS: Record<string, { label: string; icon: LucideIcon }> = {
  Features: { label: "Features", icon: Sparkles },
  "Bug Fixes": { label: "Bug fixes", icon: Bug },
  "Performance Improvements": { label: "Performance", icon: Zap },
  "Miscellaneous Chores": { label: "Maintenance", icon: Wrench },
  Documentation: { label: "Documentation", icon: BookOpen },
}

function Section({ section, autoplay }: { section: ReleaseSection; autoplay?: boolean }) {
  const kind = KINDS[section.title] ?? { label: section.title, icon: CircleDot }
  const shown = section.changes.slice(0, VISIBLE_CHANGES)
  const rest = section.changes.slice(VISIBLE_CHANGES)

  return (
    // Its own stage: the heading and the first changes rise in when the section scrolls into view.
    <MotionStage className="mt-6" autoplay={autoplay} threshold={0.1}>
      <h3 className="m-rise flex items-center gap-2 text-sm font-semibold text-ink">
        <kind.icon className="h-4 w-4 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
        {kind.label}
        <span className="font-normal text-ink-muted">{section.changes.length}</span>
      </h3>
      <ul className="mt-2">
        {shown.map((change, index) => (
          <ChangeItem
            key={`${change.scope}-${change.text}-${index}`}
            change={change}
            style={motionVars({ i: index, step: "25ms", cap: 8, base: "80ms", y: "8px" })}
            className="m-rise"
          />
        ))}
      </ul>
      {rest.length > 0 ? (
        <details className="changelog-more group/more">
          <summary className="mt-1 inline-flex cursor-pointer list-none items-center gap-1 rounded-md py-1 text-sm font-medium text-ink-muted transition-colors duration-150 ease-in-out hover:text-ink [&::-webkit-details-marker]:hidden">
            <span className="group-open/more:hidden">Show {rest.length} more</span>
            <span className="hidden group-open/more:inline">Show fewer</span>
          </summary>
          <ul className="mt-1">
            {rest.map((change, index) => (
              <ChangeItem key={`${change.scope}-${change.text}-${index}`} change={change} />
            ))}
          </ul>
        </details>
      ) : null}
    </MotionStage>
  )
}

interface ChangelogReleaseProps {
  release: Release
  isLatest?: boolean
}

/** One release: its version and date on a timeline, then its changes by kind. */
export function ChangelogRelease({ release, isLatest }: ChangelogReleaseProps) {
  const id = releaseId(release.version)
  const total = countChanges(release)

  return (
    <article id={id} className="relative scroll-mt-24 border-l border-line pb-14 pl-6 last:pb-0 sm:pl-8">
      {/* The dot and the header play together, then each section plays as it is reached. */}
      <MotionStage autoplay={isLatest} threshold={0.5}>
        <span
          aria-hidden="true"
          className={cn(
            "m-pop absolute top-2.5 -left-[5px] h-2.5 w-2.5 rounded-full border",
            isLatest ? "border-accent bg-accent" : "border-line-strong bg-canvas",
          )}
        />
        <header className="m-rise group/release flex flex-wrap items-center gap-x-4 gap-y-2" style={motionVars({ base: "60ms", y: "12px" })}>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">
            <a href={`#${id}`} className="inline-flex items-center gap-2">
              v{release.version}
              <Link2
                className="h-4 w-4 text-ink-muted opacity-0 transition-opacity duration-150 ease-in-out group-hover/release:opacity-100 [@media(hover:none)]:opacity-100"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
          </h2>
          {isLatest ? (
            <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-medium text-ink">
              Latest
            </span>
          ) : null}
          <time dateTime={release.date} className="text-sm text-ink-muted">
            {formatReleaseDate(release.date)}
          </time>
          <span className="text-sm text-ink-muted">
            {total} {total === 1 ? "change" : "changes"}
          </span>
          {release.compareUrl ? (
            <a
              href={release.compareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-ink-muted transition-colors duration-150 ease-in-out hover:text-ink"
            >
              Full diff
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </header>
      </MotionStage>
      {release.sections.map((section) => (
        <Section key={section.title} section={section} autoplay={isLatest} />
      ))}
    </article>
  )
}
