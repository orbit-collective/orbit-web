import { ExternalLink, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../atoms/Button"
import { IconButton } from "../atoms/IconButton"
import { Logo } from "../atoms/Logo"
import { NavLink } from "../molecules/NavLink"
import { cn } from "../../lib/cn"

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

      <nav
        id="mobile-menu"
        aria-label="Primary"
        inert={!isMenuOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden",
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
            <Button href="#cta" className="mt-2" onClick={() => setIsMenuOpen(false)}>
              Get started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
