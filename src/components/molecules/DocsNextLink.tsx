import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface DocsNextLinkProps {
  title: string
  href: string
}

export function DocsNextLink({ title, href }: DocsNextLinkProps) {
  return (
    <Link
      to={href}
      className="flex flex-col items-end gap-1 rounded-lg border border-line bg-surface px-5 py-3 text-right transition-colors duration-150 ease-in-out hover:border-line-strong"
    >
      <span className="text-xs font-medium text-ink-muted">Next</span>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
        {title}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  )
}
