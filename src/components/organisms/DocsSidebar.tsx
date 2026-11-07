import { ChevronRight, Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { NavLink as RouterNavLink } from "react-router-dom"
import { cn } from "../../lib/cn"
import { getLangIndex, prefetchDocContent, resolveContentKey } from "../../lib/docs"
import { IconButton } from "../atoms/IconButton"

interface DocsSidebarProps {
  lang: string
  activeCategory?: string
  activeSlug?: string
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pl", label: "Polski" },
]

export function DocsSidebar({ lang, activeCategory, activeSlug }: DocsSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  // Only the category being read starts open; a reader's own choice wins until
  // they open another category, which then opens by itself again.
  const [toggled, setToggled] = useState<Record<string, boolean>>({})
  const categories = getLangIndex(lang)?.categories ?? []

  const scrollerRef = useRef<HTMLDivElement>(null)

  // Bring the page being read into view inside the (scrollable) sidebar. Done on
  // the sidebar itself, since scrollIntoView would also move the whole page.
  useEffect(() => {
    const scroller = scrollerRef.current
    const current = scroller?.querySelector<HTMLElement>('a[data-doc-nav][aria-current="page"]')
    if (!scroller || !current) return
    scroller.scrollTop = Math.max(0, current.offsetTop - scroller.clientHeight / 3)
  }, [activeCategory, activeSlug])

  const isCategoryOpen = (slug: string) => toggled[slug] ?? slug === activeCategory
  const toggleCategory = (slug: string) =>
    setToggled((current) => ({ ...current, [slug]: !isCategoryOpen(slug) }))

  const otherLangPath = (code: string) => {
    const parts = [code, activeCategory, activeSlug].filter(Boolean)
    return `/learn/${parts.join("/")}`
  }

  // Rendered twice (desktop and the mobile drawer), so ids need a per-copy prefix.
  const renderNav = (idPrefix: string) => (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      <div className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
        {LANGUAGES.map((language) => (
          <RouterNavLink
            key={language.code}
            to={otherLangPath(language.code)}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex-1 rounded-full px-3 py-1.5 text-center text-sm font-medium transition-colors duration-200 ease-in-out",
                isActive ? "bg-accent text-accent-ink" : "text-ink-muted hover:text-ink",
              )
            }
          >
            {language.label}
          </RouterNavLink>
        ))}
      </div>

      <RouterNavLink
        to={`/learn/${lang}`}
        data-doc-nav
        end
        onClick={() => setIsOpen(false)}
        className={({ isActive }) =>
          cn(
            "text-sm font-medium transition-colors duration-150 ease-in-out",
            isActive ? "text-ink" : "text-ink-muted hover:text-ink",
          )
        }
      >
        Overview
      </RouterNavLink>

      {categories.map((category) => {
        const open = isCategoryOpen(category.slug)
        const panelId = `${idPrefix}-${category.slug}`

        return (
          <div key={category.slug}>
            <div className="flex items-center justify-between gap-2">
              <RouterNavLink
                to={`/learn/${lang}/${category.slug}`}
                data-doc-nav
                onClick={() => setIsOpen(false)}
                onPointerEnter={() => prefetchDocContent(resolveContentKey(lang, category.slug))}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-semibold transition-colors duration-150 ease-in-out",
                    isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                  )
                }
              >
                {category.title}
              </RouterNavLink>
              {category.guides.length > 0 ? (
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  aria-label={`${open ? "Collapse" : "Expand"} ${category.title}`}
                  onClick={() => toggleCategory(category.slug)}
                  className="-mr-1 inline-flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded text-ink-muted transition-colors duration-150 ease-in-out hover:bg-surface hover:text-ink"
                >
                  <ChevronRight
                    className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-90")}
                    aria-hidden="true"
                  />
                </button>
              ) : null}
            </div>
            <div
              id={panelId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="mt-2 flex flex-col gap-2 border-l border-line pl-3">
                  {category.guides.map((guide) => (
                    <RouterNavLink
                      key={guide.slug}
                      to={`/learn/${lang}/${category.slug}/${guide.slug}`}
                      data-doc-nav
                      onClick={() => setIsOpen(false)}
                      onPointerEnter={() =>
                        prefetchDocContent(resolveContentKey(lang, category.slug, guide.slug))
                      }
                      className={({ isActive }) =>
                        cn(
                          "text-sm transition-colors duration-150 ease-in-out",
                          isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                        )
                      }
                    >
                      {guide.title}
                    </RouterNavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </nav>
  )

  return (
    <>
      <div className="hidden shrink-0 basis-64 lg:block">
        <div ref={scrollerRef} className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto pr-2">
          {renderNav("docs-nav-desktop")}
        </div>
      </div>

      <div className="lg:hidden">
        <IconButton
          label={isOpen ? "Close documentation menu" : "Open documentation menu"}
          aria-expanded={isOpen}
          aria-controls="docs-mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </IconButton>

        <div
          id="docs-mobile-menu"
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out",
            isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">{renderNav("docs-nav-mobile")}</div>
        </div>
      </div>
    </>
  )
}
