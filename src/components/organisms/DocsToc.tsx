import { useActiveHeading } from "../../hooks/useActiveHeading"
import { cn } from "../../lib/cn"
import type { DocHeading } from "../../lib/docs"

interface DocsTocProps {
  headings: DocHeading[]
  /** False while the article these headings belong to is still loading. */
  ready?: boolean
}

export function DocsToc({ headings, ready = true }: DocsTocProps) {
  const activeSlug = useActiveHeading(
    headings.map((heading) => heading.slug),
    ready,
  )

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="hidden shrink-0 basis-56 xl:block">
      <nav aria-label="On this page" className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto">
        <p className="text-sm font-medium text-ink">On this page</p>
        <ul className="mt-4 flex flex-col">
          {headings.map((heading) => (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                className={cn(
                  "block border-l py-0.5 pl-3 text-sm transition-colors duration-150 ease-in-out",
                  heading.depth === 3 && "pl-6",
                  activeSlug === heading.slug
                    ? "border-accent text-ink"
                    : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
