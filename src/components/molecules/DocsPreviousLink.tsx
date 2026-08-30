import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

interface DocsPreviousLinkProps {
  title: string
  href: string
}

export function DocsPreviousLink({ title, href }: DocsPreviousLinkProps) {
  return (
    <Link
      to={href}
      className="flex flex-col items-start gap-1 rounded-lg border border-line bg-surface px-5 py-3 text-left transition-colors duration-150 ease-in-out hover:border-line-strong"
    >
      <span className="text-xs font-medium text-ink-muted">Previous</span>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {title}
      </span>
    </Link>
  )
}
