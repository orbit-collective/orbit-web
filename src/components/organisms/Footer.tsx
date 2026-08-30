import { ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { Logo } from "../atoms/Logo"
import { NavLink } from "../molecules/NavLink"

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer">
          <NavLink href="/learn">Learn</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/download">Download</NavLink>
          <NavLink href="https://docs.orbit-dev.app" icon={ExternalLink} external>
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
