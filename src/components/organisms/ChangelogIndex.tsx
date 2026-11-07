import { useEffect, useRef } from "react"
import { useActiveHeading } from "../../hooks/useActiveHeading"
import { cn } from "../../lib/cn"
import { formatReleaseDate, releaseId } from "../../lib/changelog"
import type { Release } from "../../lib/changelog"

/** Every row is this tall, which is how the marker knows where to go. */
const ROW_HEIGHT = 28

/** The list of versions beside the changelog. A marker glides to the one being read. */
export function ChangelogIndex({ releases }: { releases: Release[] }) {
  const ids = releases.map((release) => releaseId(release.version))
  const activeId = useActiveHeading(ids)
  const activeIndex = Math.max(0, ids.indexOf(activeId ?? ids[0]))
  const scrollerRef = useRef<HTMLElement>(null)

  // Keep the active version inside the (scrollable) list.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const top = activeIndex * ROW_HEIGHT
    const visibleTop = scroller.scrollTop
    const visibleBottom = visibleTop + scroller.clientHeight - 56
    if (top < visibleTop || top + ROW_HEIGHT > visibleBottom) {
      scroller.scrollTo({ top: Math.max(0, top - scroller.clientHeight / 3), behavior: "smooth" })
    }
  }, [activeIndex])

  return (
    <div className="hidden shrink-0 basis-44 lg:block">
      <nav
        ref={scrollerRef}
        aria-label="Releases"
        className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto pr-2"
      >
        <p className="text-sm font-medium text-ink">Releases</p>
        <ul className="relative mt-4 flex flex-col border-l border-line">
          <span
            aria-hidden="true"
            className="absolute top-0 -left-px h-7 w-0.5 bg-accent transition-transform duration-[450ms] [transition-timing-function:var(--m-spring)] motion-reduce:transition-none"
            style={{ transform: `translateY(${activeIndex * ROW_HEIGHT}px)` }}
          />
          {releases.map((release, index) => {
            const id = ids[index]
            return (
              <li key={release.version}>
                <a
                  href={`#${id}`}
                  className={cn(
                    "flex h-7 items-center justify-between gap-3 pl-3 text-sm transition-colors duration-150 ease-in-out",
                    activeIndex === index ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  <span>v{release.version}</span>
                  <span className="text-[11px] text-ink-muted">
                    {formatReleaseDate(release.date).replace(/ \d{4}$/, "")}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
