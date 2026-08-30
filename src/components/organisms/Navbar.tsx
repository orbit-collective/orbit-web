import { ExternalLink, Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../atoms/Button"
import { IconButton } from "../atoms/IconButton"
import { Logo } from "../atoms/Logo"
import { NavLink } from "../molecules/NavLink"
import { cn } from "../../lib/cn"

const navItems = [
  { key: "learn", href: "/learn", label: "Learn" },
  { key: "about", href: "/about", label: "About" },
  { key: "docs", href: "https://orbit-dev.app", label: "Docs", icon: ExternalLink, external: true },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.key} href={item.href} icon={item.icon} external={item.external}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
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
            <Button href="/download" className="mt-2" onClick={() => setIsMenuOpen(false)}>
              Download
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
