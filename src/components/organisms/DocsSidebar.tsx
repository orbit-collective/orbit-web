import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink as RouterNavLink } from "react-router-dom"
import { cn } from "../../lib/cn"
import { getLangIndex } from "../../lib/docs"
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
  const categories = getLangIndex(lang)?.categories ?? []

  const otherLangPath = (code: string) => {
    const parts = [code, activeCategory, activeSlug].filter(Boolean)
    return `/learn/${parts.join("/")}`
  }

  const navContent = (
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

      {categories.map((category) => (
        <div key={category.slug}>
          <RouterNavLink
            to={`/learn/${lang}/${category.slug}`}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              cn(
                "text-sm font-semibold transition-colors duration-150 ease-in-out",
                isActive ? "text-ink" : "text-ink-muted hover:text-ink",
              )
            }
          >
            {category.title}
          </RouterNavLink>
          <div className="mt-2 flex flex-col gap-2 border-l border-line pl-3">
            {category.guides.map((guide) => (
              <RouterNavLink
                key={guide.slug}
                to={`/learn/${lang}/${category.slug}/${guide.slug}`}
                onClick={() => setIsOpen(false)}
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
      ))}
    </nav>
  )

  return (
    <>
      <div className="hidden shrink-0 basis-64 lg:block">
        <div className="sticky top-24 max-h-[calc(100svh-7rem)] overflow-y-auto pr-2">
          {navContent}
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
          <div className="overflow-hidden">{navContent}</div>
        </div>
      </div>
    </>
  )
}
