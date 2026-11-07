import { useActiveHeading } from "../../hooks/useActiveHeading"
import { cn } from "../../lib/cn"
import { formatReleaseDate, releaseId } from "../../lib/changelog"
import type { Release } from "../../lib/changelog"

/** The list of versions beside the changelog, following the one being read. */
export function ChangelogIndex({ releases }: { releases: Release[] }) {
  const activeId = useActiveHeading(releases.map((release) => releaseId(release.version)))

  return (
    <div className="hidden shrink-0 basis-44 lg:block">
      <nav aria-label="Releases" className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto pr-2">
        <p className="text-sm font-medium text-ink">Releases</p>
        <ul className="mt-4 flex flex-col">
          {releases.map((release) => {
            const id = releaseId(release.version)
            return (
              <li key={release.version}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "flex items-baseline justify-between gap-3 border-l py-1 pl-3 text-sm transition-colors duration-150 ease-in-out",
                    activeId === id
                      ? "border-accent text-ink"
                      : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
                  )}
                >
                  <span>v{release.version}</span>
                  <span className="text-[11px] text-ink-muted">{formatReleaseDate(release.date).replace(/ \d{4}$/, "")}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
