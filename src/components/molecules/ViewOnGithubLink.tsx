import { ExternalLink } from "lucide-react"

interface ViewOnGithubLinkProps {
  href: string
}

export function ViewOnGithubLink({ href }: ViewOnGithubLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs font-medium text-ink-muted no-underline transition-colors duration-150 ease-in-out hover:text-ink"
    >
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      View on GitHub
    </a>
  )
}
