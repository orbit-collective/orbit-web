import { ExternalLink, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../atoms/Button"
import { IconButton } from "../atoms/IconButton"
import { Logo } from "../atoms/Logo"
import { NavLink } from "../molecules/NavLink"

const navItems = [
  { key: "features", href: "#features", label: "Features" },
  { key: "workflow", href: "#workflow", label: "Workflow" },
  { key: "learn", href: "#learn", label: "Learn" },
  { key: "docs", href: "#", label: "Docs", icon: ExternalLink, external: true },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.key} href={item.href} icon={item.icon} external={item.external}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="#cta" size="sm">
            Get started
          </Button>
        </div>

        <IconButton
          label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </IconButton>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-line px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
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
            <Button href="#cta" className="mt-2" onClick={() => setIsMenuOpen(false)}>
              Get started
            </Button>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
