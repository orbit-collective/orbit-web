import { ExternalLink } from "lucide-react"
import { Logo } from "../atoms/Logo"
import { NavLink } from "../molecules/NavLink"

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo />

        <nav className="flex items-center gap-6" aria-label="Footer">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#workflow">Workflow</NavLink>
          <NavLink href="#learn">Learn</NavLink>
          <NavLink href="#" icon={ExternalLink} external>
            Docs
          </NavLink>
        </nav>

        <p className="text-sm text-ink-muted">
          &copy; {new Date().getFullYear()} Adiksuu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
