import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { cn } from "../../lib/cn"

interface NavLinkProps {
  href: string
  children: ReactNode
  icon?: LucideIcon
  external?: boolean
  className?: string
  onClick?: () => void
}

export function NavLink({ href, children, icon: Icon, external, className, onClick }: NavLinkProps) {
  const classes = cn(
    "inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors duration-150 ease-in-out hover:text-ink",
    className,
  )

  if (external) {
    return (
      <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      </a>
    )
  }

  return (
    <Link to={href} onClick={onClick} className={classes}>
      {children}
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
    </Link>
  )
}
