import { ExternalLink, Menu, X } from "lucide-react"
import { Suspense, lazy, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../atoms/Button"
import { IconButton } from "../atoms/IconButton"
import { Logo } from "../atoms/Logo"
import { NavLink } from "../molecules/NavLink"
import { SearchButton } from "../molecules/SearchButton"
import { cn } from "../../lib/cn"
import { LearnMegaMenu } from "./LearnMegaMenu"

const navItems = [
  { key: "learn", href: "/learn", label: "Learn" },
  { key: "about", href: "/about", label: "About" },
  { key: "docs", href: "https://docs.orbit-dev.app", label: "Docs", icon: ExternalLink, external: true },
]

// The search code and the docs index only load once someone searches.
const loadDocsSearch = () => import("./DocsSearch")
const DocsSearch = lazy(() => loadDocsSearch().then((module) => ({ default: module.DocsSearch })))

function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  )
}

const secondaryNavItems = navItems.filter((item) => item.key !== "learn")

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"
      const isSlash = event.key === "/" && !event.metaKey && !event.ctrlKey && !isTypingTarget(event.target)

      if (isShortcut || isSlash) {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <LearnMegaMenu />
          {secondaryNavItems.map((item) => (
            <NavLink key={item.key} href={item.href} icon={item.icon} external={item.external}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <SearchButton onClick={() => setIsSearchOpen(true)} onWarm={loadDocsSearch} />
          <Button href="/download" size="sm">
            Download
          </Button>
        </div>

        <IconButton
          label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="lg:hidden cursor-pointer"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </IconButton>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Primary"
        inert={!isMenuOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "grid-rows-[1fr] border-t border-line" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                href={item.href}
                icon={item.icon}
                external={item.external}
                onClick={() => setIsMenuOpen(false)}
                className="text-base"
              >
                {item.label}
              </NavLink>
            ))}
            <SearchButton
              className="self-start"
              onWarm={loadDocsSearch}
              onClick={() => {
                setIsMenuOpen(false)
                setIsSearchOpen(true)
              }}
            />
            <Button href="/download" className="mt-2" onClick={() => setIsMenuOpen(false)}>
              Download
            </Button>
          </div>
        </div>
      </nav>

      {isSearchOpen ? (
        <Suspense fallback={null}>
          <DocsSearch onClose={() => setIsSearchOpen(false)} />
        </Suspense>
      ) : null}
    </header>
  )
}
