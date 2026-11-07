import { cn } from "../../lib/cn"
import type { DocContent } from "../../hooks/useDocContent"
import { Button } from "../atoms/Button"
import { DocsContent } from "./DocsContent"

interface DocsBodyProps {
  doc: DocContent
  lang: string
  category?: string
  eyebrow?: string
  githubUrl?: string
}

/**
 * A doc page's article, in whichever state its body is in: the article itself,
 * the previous article held back (dimmed, and inert because its links resolve
 * against the page being opened) while the new one downloads, or, if that
 * failed, a message with a way to retry instead of someone else's article.
 */
export function DocsBody({ doc, lang, category, eyebrow, githubUrl }: DocsBodyProps) {
  if (doc.failed) {
    return (
      <div role="alert" className="rounded-lg border border-line bg-surface p-6">
        <p className="text-base font-semibold text-ink">This page could not be loaded</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Check your connection and try again{githubUrl ? ", or read it on GitHub" : ""}.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm" onClick={doc.retry}>
            Try again
          </Button>
          {githubUrl ? (
            <Button size="sm" variant="secondary" href={githubUrl} external>
              View on GitHub
            </Button>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div
      aria-busy={!doc.isReady}
      inert={!doc.isReady}
      className={cn("transition-opacity duration-200", !doc.isReady && "opacity-50")}
    >
      <DocsContent
        lang={lang}
        category={category}
        eyebrow={eyebrow}
        githubUrl={githubUrl}
        content={doc.content ?? ""}
      />
    </div>
  )
}
