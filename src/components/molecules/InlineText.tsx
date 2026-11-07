import type { ReactNode } from "react"

const TOKEN = /(`[^`]+`|\[[^\]]+\]\([^)]+\))/g

/** The little markdown a changelog line can hold: `code` and [links](url). Everything else is text. */
export function InlineText({ children }: { children: string }) {
  const parts: ReactNode[] = children.split(TOKEN).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded border border-line bg-surface px-1 py-px font-mono text-[0.85em] text-ink">
          {part.slice(1, -1)}
        </code>
      )
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      return (
        <a
          key={index}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink underline decoration-line-strong underline-offset-2 hover:decoration-ink-muted"
        >
          {link[1]}
        </a>
      )
    }

    return part
  })

  return <>{parts}</>
}
