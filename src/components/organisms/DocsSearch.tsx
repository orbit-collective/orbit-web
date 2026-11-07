import { CornerDownLeft, FileText, Hash, Search } from "lucide-react"
import { useEffect, useId, useMemo, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "../../lib/cn"
import { prefetchDocContent, resolveContentKey } from "../../lib/docs"
import { searchDocs } from "../../lib/docsSearch"

interface DocsSearchProps {
  onClose: () => void
}

/** The language of the docs being read, or English anywhere else on the site. */
function langFromPath(pathname: string): string {
  return pathname.match(/^\/learn\/([a-z]{2})(?:\/|$)/)?.[1] ?? "en"
}

function contentKeyForHref(href: string): string | undefined {
  const [path] = href.split("#")
  const [, , lang, category, slug] = path.split("/")
  return resolveContentKey(lang, category, slug)
}

export function DocsSearch({ onClose }: DocsSearchProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listboxId = useId()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)

  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const results = useMemo(() => searchDocs(lang, query), [lang, query])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    dialog.showModal()
    document.documentElement.style.overflow = "hidden"

    return () => {
      document.documentElement.style.overflow = ""
      if (dialog.open) dialog.close()
    }
  }, [])

  useEffect(() => {
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  const open = (index: number) => {
    const result = results[index]
    if (!result) return
    prefetchDocContent(contentKeyForHref(result.href))
    navigate(result.href)
    onClose()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, results.length - 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === "Enter") {
      event.preventDefault()
      open(activeIndex)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the documentation"
      onClose={onClose}
      onClick={(event) => {
        // The backdrop is part of the dialog element; the content never is the target.
        if (event.target === dialogRef.current) onClose()
      }}
      className="animate-dialog-in m-auto mt-[12vh] w-[min(40rem,92vw)] overflow-hidden rounded-2xl border border-line-strong bg-canvas-deep p-0 text-ink shadow-2xl shadow-black/50 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="h-4 w-4 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden="true" />
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={listboxId}
          aria-activedescendant={results[activeIndex] ? `${listboxId}-${activeIndex}` : undefined}
          aria-autocomplete="list"
          aria-label="Search the documentation"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          placeholder={lang === "pl" ? "Szukaj w dokumentacji" : "Search the documentation"}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0)
          }}
          onKeyDown={handleKeyDown}
          className="h-14 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
        />
        <kbd className="rounded border border-line-strong px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">
          Esc
        </kbd>
      </div>

      {results.length > 0 ? (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Results"
          className="max-h-[50vh] overflow-y-auto p-2"
        >
          {results.map((result, index) => {
            const Icon = result.kind === "page" ? FileText : Hash
            const isActive = index === activeIndex

            return (
              <li
                key={result.id}
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={isActive}
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => open(index)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5",
                  isActive ? "bg-surface" : "",
                )}
              >
                <Icon
                  className={cn("h-4 w-4 shrink-0", isActive ? "text-ink" : "text-ink-muted")}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink">{result.title}</span>
                  {result.context ? (
                    <span className="block truncate text-xs text-ink-muted">{result.context}</span>
                  ) : null}
                </span>
                {isActive ? (
                  <CornerDownLeft
                    className="h-3.5 w-3.5 shrink-0 text-ink-muted"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="px-4 py-10 text-center text-sm text-ink-muted">
          {lang === "pl" ? "Brak wyników dla" : "No results for"}{" "}
          <span className="font-medium text-ink">&ldquo;{query}&rdquo;</span>
        </p>
      )}

      <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-ink-muted">
        <span>
          <kbd className="font-medium text-ink">↑↓</kbd> navigate
        </span>
        <span>
          <kbd className="font-medium text-ink">↵</kbd> open
        </span>
        <span className="ml-auto">{lang === "pl" ? "Dokumentacja po polsku" : "English documentation"}</span>
      </div>
    </dialog>
  )
}
