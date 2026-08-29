import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
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
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors duration-150 ease-in-out hover:text-ink",
        className,
      )}
    >
      {children}
      {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
    </a>
  )
}
