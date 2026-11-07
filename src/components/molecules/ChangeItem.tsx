import type { CSSProperties } from "react"
import { cn } from "../../lib/cn"
import type { Change } from "../../lib/changelog"
import { InlineText } from "./InlineText"

/** One line of a release: the area it touches, what changed, and the commit it came from. */
export function ChangeItem({
  change,
  className,
  style,
}: {
  change: Change
  className?: string
  style?: CSSProperties
}) {
  return (
    <li style={style} className={cn("-mx-2 flex gap-3 rounded-md px-2 py-1.5 text-sm leading-relaxed transition-colors duration-150 ease-in-out hover:bg-surface", className)}>
      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-line-strong" aria-hidden="true" />
      <span className="min-w-0 text-ink-muted">
        {change.scope ? (
          <span className="mr-2 inline-block rounded-md border border-line bg-surface px-1.5 py-px align-baseline font-mono text-[11px] text-ink-muted">
            {change.scope}
          </span>
        ) : null}
        <span className="text-ink">
          <InlineText>{change.text}</InlineText>
        </span>
        {change.commits.map((commit) => (
          <a
            key={commit.hash}
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 font-mono text-[11px] text-ink-muted transition-colors duration-150 ease-in-out hover:text-ink"
          >
            {commit.hash}
          </a>
        ))}
      </span>
    </li>
  )
}
